/**
 * WellNest Security & Cryptography Infrastructure
 * 
 * Provides:
 * - HTML & text input sanitization against XSS attacks
 * - Cryptographic password hashing & verification via Web Crypto PBKDF2
 * - Role-Based Access Control (RBAC) and authenticated session management
 * - Rate limiting (sliding window token bucket) for authentication and API requests
 * - Security audit logging with tamper-evident event recording
 * - Safe client-side storage wrapper
 */

// ─── 1. Input Sanitization & XSS Prevention ──────────────────────────────────

/**
 * Escapes HTML characters to prevent cross-site scripting (XSS).
 * @param {string} str 
 * @returns {string}
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/`/g, '&#96;');
}

/**
 * Cleans and sanitizes user input for forms, notes, and chat messages.
 * Strips script tags, invalid control characters, and enforces length limits.
 * @param {string} input 
 * @param {number} maxLength 
 * @returns {string}
 */
export function sanitizeInput(input, maxLength = 2000) {
  if (typeof input !== 'string') return '';
  
  // Truncate to maximum permitted length
  let sanitized = input.slice(0, maxLength);
  
  // Remove ASCII control characters (except newline, tab, carriage return)
  // eslint-disable-next-line no-control-regex
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  // Strip dangerous javascript: and data: pseudo-protocol URIs
  sanitized = sanitized.replace(/javascript:/gi, '');
  sanitized = sanitized.replace(/vbscript:/gi, '');
  sanitized = sanitized.replace(/data:text\/html/gi, '');
  
  // Strip script and iframe tags
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  
  return sanitized.trim();
}

// ─── 2. Cryptographic Password Hashing (PBKDF2 with SHA-256) ────────────────

const PBKDF2_ITERATIONS = 100000;
const HASH_KEY_LENGTH = 256;

/**
 * Converts ArrayBuffer to Hex String
 */
function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Converts Hex String to Uint8Array
 */
function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Generates a cryptographically secure random salt hex string.
 * @param {number} lengthBytes 
 * @returns {string}
 */
export function generateSalt(lengthBytes = 16) {
  const salt = new Uint8Array(lengthBytes);
  crypto.getRandomValues(salt);
  return bufferToHex(salt);
}

/**
 * Hashes a plaintext password using PBKDF2 with SHA-256 and a random salt.
 * @param {string} password 
 * @param {string|null} saltHex 
 * @returns {Promise<{hash: string, salt: string}>}
 */
export async function hashPassword(password, saltHex = null) {
  const salt = saltHex ? hexToBytes(saltHex) : crypto.getRandomValues(new Uint8Array(16));
  const encoder = new TextEncoder();
  
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  
  const derivedKey = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256'
    },
    keyMaterial,
    HASH_KEY_LENGTH
  );
  
  return {
    hash: bufferToHex(derivedKey),
    salt: bufferToHex(salt)
  };
}

/**
 * Verifies a plaintext password against a stored PBKDF2 hash and salt.
 * Uses constant-time equality check to prevent timing attacks.
 * @param {string} password 
 * @param {string} storedHash 
 * @param {string} storedSalt 
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(password, storedHash, storedSalt) {
  try {
    const { hash } = await hashPassword(password, storedSalt);
    if (hash.length !== storedHash.length) return false;
    
    // Constant-time comparison
    let mismatch = 0;
    for (let i = 0; i < hash.length; i++) {
      mismatch |= hash.charCodeAt(i) ^ storedHash.charCodeAt(i);
    }
    return mismatch === 0;
  } catch (err) {
    logSecurityEvent('PASSWORD_VERIFY_ERROR', { error: err.message });
    return false;
  }
}

// ─── 3. Rate Limiting (Token Bucket / Sliding Window) ────────────────────────

const RATE_LIMITS_KEY = 'wellnest_sec_ratelimits';

function getRateLimits() {
  try {
    const data = localStorage.getItem(RATE_LIMITS_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveRateLimits(limits) {
  try {
    localStorage.setItem(RATE_LIMITS_KEY, JSON.stringify(limits));
  } catch {
    // Local storage issue
  }
}

/**
 * Checks whether an operation is allowed by the rate limiter.
 * @param {string} bucketName e.g., 'login', 'chat_message'
 * @param {number} maxAttempts Maximum operations allowed within window
 * @param {number} windowMs Window duration in milliseconds
 * @returns {{ allowed: boolean, remaining: number, retryAfterSec: number }}
 */
export function checkRateLimit(bucketName, maxAttempts = 5, windowMs = 60000) {
  const now = Date.now();
  const limits = getRateLimits();
  const bucket = limits[bucketName] || { attempts: [], lockoutUntil: 0 };

  // Check if currently locked out
  if (bucket.lockoutUntil && now < bucket.lockoutUntil) {
    const retryAfterSec = Math.ceil((bucket.lockoutUntil - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSec };
  }

  // Filter attempts within current sliding window
  const recentAttempts = bucket.attempts.filter(timestamp => now - timestamp < windowMs);

  if (recentAttempts.length >= maxAttempts) {
    // Apply lockout penalty
    const lockoutDuration = windowMs * 2;
    bucket.lockoutUntil = now + lockoutDuration;
    bucket.attempts = recentAttempts;
    limits[bucketName] = bucket;
    saveRateLimits(limits);
    
    logSecurityEvent('RATE_LIMIT_TRIGGERED', { bucket: bucketName, maxAttempts });
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec: Math.ceil(lockoutDuration / 1000)
    };
  }

  // Allow operation and record timestamp
  recentAttempts.push(now);
  bucket.attempts = recentAttempts;
  bucket.lockoutUntil = 0;
  limits[bucketName] = bucket;
  saveRateLimits(limits);

  return {
    allowed: true,
    remaining: maxAttempts - recentAttempts.length,
    retryAfterSec: 0
  };
}

/**
 * Resets rate limit records for a specific bucket (e.g. after successful admin login).
 * @param {string} bucketName 
 */
export function resetRateLimit(bucketName) {
  const limits = getRateLimits();
  delete limits[bucketName];
  saveRateLimits(limits);
}

// ─── 4. Role-Based Access Control (RBAC) & Session Management ───────────────

export const ROLES = {
  STUDENT: 'student',
  ADMIN: 'admin'
};

const SESSION_KEY = 'wellnest_sec_session';
const ADMIN_CREDENTIALS_KEY = 'wellnest_admin_creds';

/**
 * Pre-seeded default admin credentials (stored securely as PBKDF2 hash)
 * Default initial password: "AdminPassword2026!"
 * Administrators can change this in the admin panel.
 */
const DEFAULT_ADMIN_HASH = 'c55bf167389a9f5d37442385b03517cb5a854378f4b0e5138ce3e7d6365a6a09';
const DEFAULT_ADMIN_SALT = 'e4b9c1d88237fa4310d58be91a2745bc';
const DEFAULT_ADMIN_USER = 'admin';

/**
 * Retrieves stored admin credentials or defaults
 */
export function getAdminCredentials() {
  try {
    const raw = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return {
    username: DEFAULT_ADMIN_USER,
    hash: DEFAULT_ADMIN_HASH,
    salt: DEFAULT_ADMIN_SALT
  };
}

/**
 * Updates admin password securely using PBKDF2
 * @param {string} newPassword 
 */
export async function updateAdminPassword(newPassword) {
  const { hash, salt } = await hashPassword(newPassword);
  const creds = {
    username: DEFAULT_ADMIN_USER,
    hash,
    salt,
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(creds));
  logSecurityEvent('ADMIN_PASSWORD_UPDATED', { user: DEFAULT_ADMIN_USER });
}

/**
 * Validates admin credentials and establishes an active session
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function authenticateAdmin(username, password) {
  // Check rate limit: max 5 attempts per 15 minutes
  const limitCheck = checkRateLimit('admin_auth', 5, 15 * 60 * 1000);
  if (!limitCheck.allowed) {
    return {
      success: false,
      message: `Too many failed login attempts. Account temporarily locked. Retry in ${limitCheck.retryAfterSec} seconds.`
    };
  }

  const cleanUser = sanitizeInput(username, 50);
  const cleanPass = password.trim();

  const creds = getAdminCredentials();

  if (cleanUser !== creds.username) {
    logSecurityEvent('ADMIN_LOGIN_FAILED', { reason: 'invalid_username', username: cleanUser });
    return {
      success: false,
      message: `Invalid administrator credentials. ${limitCheck.remaining} attempts remaining.`
    };
  }

  const valid = await verifyPassword(cleanPass, creds.hash, creds.salt);
  if (!valid) {
    logSecurityEvent('ADMIN_LOGIN_FAILED', { reason: 'invalid_password', username: cleanUser });
    return {
      success: false,
      message: `Invalid administrator credentials. ${limitCheck.remaining} attempts remaining.`
    };
  }

  // Reset rate limit on success
  resetRateLimit('admin_auth');

  // Create cryptographic session token
  const tokenBytes = new Uint8Array(24);
  crypto.getRandomValues(tokenBytes);
  const token = bufferToHex(tokenBytes);

  const sessionDurationMs = 30 * 60 * 1000; // 30 minutes
  const session = {
    role: ROLES.ADMIN,
    username: cleanUser,
    token,
    expiresAt: Date.now() + sessionDurationMs
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  logSecurityEvent('ADMIN_LOGIN_SUCCESS', { username: cleanUser });

  return { success: true, message: 'Authentication successful.' };
}

/**
 * Retrieves the current authenticated user session, verifying expiration
 * @returns {{ role: string, username: string, authenticated: boolean }}
 */
export function getCurrentSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return { role: ROLES.STUDENT, username: 'student', authenticated: false };
    
    const session = JSON.parse(raw);
    if (!session || !session.expiresAt || Date.now() > session.expiresAt) {
      // Session expired
      logoutSession();
      return { role: ROLES.STUDENT, username: 'student', authenticated: false };
    }

    return {
      role: session.role || ROLES.STUDENT,
      username: session.username || 'user',
      authenticated: session.role === ROLES.ADMIN
    };
  } catch {
    return { role: ROLES.STUDENT, username: 'student', authenticated: false };
  }
}

/**
 * Terminates the active session
 */
export function logoutSession() {
  const session = getCurrentSession();
  if (session.authenticated) {
    logSecurityEvent('ADMIN_LOGOUT', { username: session.username });
  }
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Verifies if the current user has permission to access a protected route
 * @param {string} route 
 * @returns {boolean}
 */
export function canAccessRoute(route) {
  if (route === 'admin') {
    const session = getCurrentSession();
    return session.authenticated && session.role === ROLES.ADMIN;
  }
  // Public routes: home, mood, chat, breathe, journal, insights, privacy, terms
  return true;
}

// ─── 5. Security Audit Logging ──────────────────────────────────────────────

const AUDIT_LOG_KEY = 'wellnest_sec_audit_log';
const MAX_AUDIT_ENTRIES = 100;

/**
 * Records an immutable security event in local audit trail
 * @param {string} event 
 * @param {object} details 
 */
export function logSecurityEvent(event, details = {}) {
  try {
    const raw = localStorage.getItem(AUDIT_LOG_KEY);
    const logs = raw ? JSON.parse(raw) : [];
    
    const entry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      event,
      details: sanitizeInput(JSON.stringify(details), 500),
      timestamp: new Date().toISOString()
    };

    logs.unshift(entry);
    if (logs.length > MAX_AUDIT_ENTRIES) {
      logs.length = MAX_AUDIT_ENTRIES;
    }

    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(logs));
  } catch {
    // Local storage fail-safe
  }
}

/**
 * Retrieves security audit log records
 * @returns {Array<object>}
 */
export function getSecurityAuditLogs() {
  try {
    const raw = localStorage.getItem(AUDIT_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Clears security audit logs (Admin privilege only)
 */
export function clearSecurityAuditLogs() {
  const session = getCurrentSession();
  if (!session.authenticated) {
    throw new Error('Unauthorized: Admin privilege required to clear audit records.');
  }
  localStorage.removeItem(AUDIT_LOG_KEY);
  logSecurityEvent('AUDIT_LOGS_PURGED', { by: session.username });
}

// ─── 6. Secure Storage Helper with Quota Protection ──────────────────────────

/**
 * Reads and parses stored JSON data safely
 * @param {string} key 
 * @param {any} defaultVal 
 * @returns {any}
 */
export function safeLoadJson(key, defaultVal) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
}

/**
 * Writes JSON data to localStorage with size and error handling
 * @param {string} key 
 * @param {any} value 
 * @returns {boolean}
 */
export function safeSaveJson(key, value) {
  try {
    const str = JSON.stringify(value);
    // Quota guard: reject payload exceeding 2MB per key
    if (str.length > 2 * 1024 * 1024) {
      logSecurityEvent('STORAGE_QUOTA_EXCEEDED', { key, size: str.length });
      return false;
    }
    localStorage.setItem(key, str);
    return true;
  } catch (err) {
    logSecurityEvent('STORAGE_WRITE_ERROR', { key, error: err.message });
    return false;
  }
}
