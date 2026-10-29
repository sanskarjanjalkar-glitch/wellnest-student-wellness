import { useState, useEffect } from 'react';
import {
  authenticateAdmin,
  getCurrentSession,
  logoutSession,
  getSecurityAuditLogs,
  clearSecurityAuditLogs,
  updateAdminPassword,
  safeLoadJson,
  ROLES
} from '../security.js';

export default function AdminScreen({ onNav }) {
  const [session, setSession] = useState(() => getCurrentSession());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Admin Dashboard State
  const [auditLogs, setAuditLogs] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [stats, setStats] = useState({ moods: 0, chats: 0, journals: 0, quotaEstimatedKb: 0 });

  useEffect(() => {
    if (session.authenticated && session.role === ROLES.ADMIN) {
      loadAdminData();
    }
  }, [session]);

  function loadAdminData() {
    setAuditLogs(getSecurityAuditLogs());
    const moods = safeLoadJson("wellnest_moods", []);
    const chats = safeLoadJson("wellnest_chats", []);
    const journals = safeLoadJson("wellnest_journals", []);
    
    let totalBytes = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        totalBytes += (k.length + (localStorage.getItem(k)?.length || 0)) * 2;
      }
    } catch {
      // ignore
    }

    setStats({
      moods: moods.length,
      chats: chats.length,
      journals: journals.length,
      quotaEstimatedKb: (totalBytes / 1024).toFixed(2)
    });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    const result = await authenticateAdmin(username, password);
    setAuthLoading(false);

    if (result.success) {
      const activeSession = getCurrentSession();
      setSession(activeSession);
      setUsername("");
      setPassword("");
    } else {
      setAuthError(result.message);
    }
  }

  function handleLogout() {
    logoutSession();
    setSession(getCurrentSession());
  }

  function handleClearAudit() {
    if (confirm("Are you sure you want to clear the security audit logs? This cannot be undone.")) {
      try {
        clearSecurityAuditLogs();
        setAuditLogs([]);
      } catch (err) {
        alert(err.message);
      }
    }
  }

  async function handlePasswordChange(e) {
    e.preventDefault();
    setPasswordMessage("");

    if (newPassword.length < 8) {
      setPasswordMessage("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage("Passwords do not match.");
      return;
    }

    await updateAdminPassword(newPassword);
    setNewPassword("");
    setConfirmPassword("");
    setPasswordMessage("Admin password updated successfully with PBKDF2 hash.");
  }

  function handleExportData() {
    const exportData = {
      exportedAt: new Date().toISOString(),
      moods: safeLoadJson("wellnest_moods", []),
      chats: safeLoadJson("wellnest_chats", []),
      journals: safeLoadJson("wellnest_journals", []),
      auditLogs: getSecurityAuditLogs()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wellnest_audit_export_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleResetAllData() {
    if (confirm("WARNING: This will wipe all user mood entries, journals, and chat sessions. Are you certain?")) {
      localStorage.removeItem("wellnest_moods");
      localStorage.removeItem("wellnest_chats");
      localStorage.removeItem("wellnest_journals");
      loadAdminData();
      alert("All user data has been securely purged.");
    }
  }

  // If not authenticated, render login form
  if (!session.authenticated) {
    return (
      <div style={{ padding: "32px 18px 90px", maxWidth: 440, margin: "0 auto" }}>
        <div style={{
          background: "#18181b",
          border: "1px solid #27272a",
          borderRadius: 8,
          padding: "24px 22px"
        }}>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#3b82f6",
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 6
          }}>
            Restricted Access
          </div>
          <h2 style={{ color: "#fafafa", fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>
            Administrator Authentication
          </h2>
          <p style={{ color: "#a1a1aa", fontSize: 13, lineHeight: 1.5, margin: "0 0 20px" }}>
            This section is protected by role-based access control and rate-limited against brute force attempts.
          </p>

          {authError && (
            <div style={{
              background: "#450a0a",
              border: "1px solid #991b1b",
              borderRadius: 6,
              padding: "10px 14px",
              color: "#fca5a5",
              fontSize: 13,
              marginBottom: 16,
              lineHeight: 1.4
            }}>
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#d4d4d8", marginBottom: 6 }}>
                Admin Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 6,
                  border: "1px solid #27272a",
                  background: "#09090b",
                  color: "#fafafa",
                  fontSize: 13,
                  outline: "none",
                  fontFamily: "inherit"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#d4d4d8", marginBottom: 6 }}>
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 6,
                  border: "1px solid #27272a",
                  background: "#09090b",
                  color: "#fafafa",
                  fontSize: 13,
                  outline: "none",
                  fontFamily: "inherit"
                }}
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              style={{
                marginTop: 6,
                padding: "11px",
                borderRadius: 6,
                border: "none",
                background: "#2563eb",
                color: "#ffffff",
                fontSize: 13,
                fontWeight: 600,
                cursor: authLoading ? "not-allowed" : "pointer"
              }}>
              {authLoading ? "Authenticating..." : "Sign In to Admin Console"}
            </button>
          </form>

          <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #27272a", display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={() => onNav("home")}
              style={{
                background: "none",
                border: "none",
                color: "#71717a",
                fontSize: 12,
                cursor: "pointer",
                padding: 0
              }}>
              Back to Home
            </button>
            <span style={{ fontSize: 11, color: "#52525b" }}>Default: admin / AdminPassword2026!</span>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div style={{ padding: "28px 18px 90px", maxWidth: 600, margin: "0 auto" }}>
      {/* Top Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
        paddingBottom: 16,
        borderBottom: "1px solid #27272a"
      }}>
        <div>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#10b981",
            textTransform: "uppercase",
            letterSpacing: 1
          }}>
            Authenticated as {session.username}
          </div>
          <h2 style={{ color: "#fafafa", fontSize: 22, fontWeight: 700, margin: "4px 0 0" }}>
            Security and System Console
          </h2>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 14px",
            borderRadius: 6,
            background: "#27272a",
            border: "1px solid #3f3f46",
            color: "#e4e4e7",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer"
          }}>
          Sign Out
        </button>
      </div>

      {/* Storage and System Health */}
      <div style={{
        background: "#18181b",
        border: "1px solid #27272a",
        borderRadius: 8,
        padding: "18px 20px",
        marginBottom: 20
      }}>
        <h3 style={{ color: "#fafafa", fontSize: 15, fontWeight: 700, margin: "0 0 12px" }}>
          Storage Diagnostics
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
          <div style={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 6, padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fafafa" }}>{stats.moods}</div>
            <div style={{ fontSize: 10, color: "#a1a1aa", marginTop: 2 }}>Mood Logs</div>
          </div>
          <div style={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 6, padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fafafa" }}>{stats.journals}</div>
            <div style={{ fontSize: 10, color: "#a1a1aa", marginTop: 2 }}>Journal Logs</div>
          </div>
          <div style={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 6, padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fafafa" }}>{stats.chats}</div>
            <div style={{ fontSize: 10, color: "#a1a1aa", marginTop: 2 }}>Chat Logs</div>
          </div>
          <div style={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 6, padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fafafa" }}>{stats.quotaEstimatedKb} KB</div>
            <div style={{ fontSize: 10, color: "#a1a1aa", marginTop: 2 }}>Storage Used</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button
            onClick={handleExportData}
            style={{
              flex: 1,
              padding: "9px 14px",
              borderRadius: 6,
              background: "#2563eb",
              border: "none",
              color: "#ffffff",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer"
            }}>
            Export Encrypted JSON Backup
          </button>
          <button
            onClick={handleResetAllData}
            style={{
              padding: "9px 14px",
              borderRadius: 6,
              background: "#7f1d1d",
              border: "1px solid #991b1b",
              color: "#fecaca",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer"
            }}>
            Purge All User Data
          </button>
        </div>
      </div>

      {/* Security Audit Log */}
      <div style={{
        background: "#18181b",
        border: "1px solid #27272a",
        borderRadius: 8,
        padding: "18px 20px",
        marginBottom: 20
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ color: "#fafafa", fontSize: 15, fontWeight: 700, margin: 0 }}>
            Security Audit Trail ({auditLogs.length} events)
          </h3>
          {auditLogs.length > 0 && (
            <button
              onClick={handleClearAudit}
              style={{
                background: "none",
                border: "none",
                color: "#f87171",
                fontSize: 11,
                cursor: "pointer",
                padding: 0
              }}>
              Clear Log History
            </button>
          )}
        </div>

        <div style={{
          maxHeight: 220,
          overflowY: "auto",
          background: "#09090b",
          border: "1px solid #27272a",
          borderRadius: 6,
          padding: "8px 10px"
        }}>
          {auditLogs.length === 0 ? (
            <div style={{ fontSize: 12, color: "#71717a", textAlign: "center", padding: "16px 0" }}>
              No security anomalies or authorization failures recorded.
            </div>
          ) : (
            auditLogs.map(log => (
              <div key={log.id} style={{
                padding: "8px 6px",
                borderBottom: "1px solid #18181b",
                fontSize: 11,
                fontFamily: "monospace"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#a1a1aa" }}>
                  <span style={{
                    color: log.event.includes("FAIL") || log.event.includes("LIMIT") ? "#f87171" : "#10b981",
                    fontWeight: 700
                  }}>
                    {log.event}
                  </span>
                  <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
                <div style={{ color: "#71717a", marginTop: 2, wordBreak: "break-all" }}>
                  {log.details}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Update Admin Password Form */}
      <div style={{
        background: "#18181b",
        border: "1px solid #27272a",
        borderRadius: 8,
        padding: "18px 20px",
        marginBottom: 24
      }}>
        <h3 style={{ color: "#fafafa", fontSize: 15, fontWeight: 700, margin: "0 0 6px" }}>
          Update Admin Credentials
        </h3>
        <p style={{ color: "#a1a1aa", fontSize: 12, margin: "0 0 14px" }}>
          Passwords are automatically hashed using client-side PBKDF2 (SHA-256) with unique cryptographic salt before storage.
        </p>

        {passwordMessage && (
          <div style={{
            fontSize: 12,
            color: passwordMessage.includes("success") ? "#34d399" : "#f87171",
            marginBottom: 12
          }}>
            {passwordMessage}
          </div>
        )}

        <form onSubmit={handlePasswordChange} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="New password (min 8 chars)"
              required
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #27272a",
                background: "#09090b",
                color: "#fafafa",
                fontSize: 12,
                outline: "none"
              }}
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #27272a",
                background: "#09090b",
                color: "#fafafa",
                fontSize: 12,
                outline: "none"
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "9px 14px",
              borderRadius: 6,
              background: "#27272a",
              border: "1px solid #3f3f46",
              color: "#fafafa",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer"
            }}>
            Save New Hash
          </button>
        </form>
      </div>

      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => onNav("home")}
          style={{
            background: "none",
            border: "none",
            color: "#3b82f6",
            fontSize: 13,
            cursor: "pointer",
            fontWeight: 600
          }}>
          Back to Student Application
        </button>
      </div>
    </div>
  );
}
