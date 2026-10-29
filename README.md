# WellNest: Student Mental Wellness Platform

WellNest is a privacy-first web application engineered to detect early indicators of academic stress and provide structured self-regulation tools for students.

---

## System Overview

Academic environments often place sustained pressure on students, leading to cumulative burnout and acute anxiety. WellNest provides a confidential, client-side toolkit designed to monitor stress trajectories and intervene before academic fatigue compounds.

---

## Core Capabilities

1. **Early Stress Detection Radar**:
   - Detects patterns when two or more consecutive check-ins record low energy levels.
   - Prompts proactive self-regulation interventions including structured breathing and study consultation.

2. **Daily Academic Check-in**:
   - Five-point quantitative scale with context tagging (Exams, Coursework, Sleep Deficit, Procrastination).
   - Instant client-side feedback summarizing cognitive pacing.

3. **Study Companion**:
   - Pragmatic advice tailored for university and school workloads.
   - Structured guidance on active recall, task decomposition, sleep scheduling, and exam preparation.

4. **Guided Breathing Protocol**:
   - Visual rhythmic pacing for Box Breathing (pre-exam regulation), 4-7-8 Calm (pre-sleep relaxation), and Quick Focus.

5. **Private Venting Workspace**:
   - Encrypted local text area for externalizing acute academic frustration.
   - Generates constructive cognitive reframing notes.

6. **Seven-Day Energy Rhythm**:
   - Longitudinal bar visualization displaying daily score distributions.
   - Automated weekly summary synthesizing trends across study and rest periods.

7. **Emergency Helplines**:
   - Immediate access to national crisis resources (988 Lifeline, Crisis Text Line 741741, Tele-MANAS 14416, UK 111).

8. **Restricted Administrator Console**:
   - Protected by role-based access control (RBAC).
   - Password authentication utilizing Web Crypto PBKDF2 (SHA-256) with unique cryptographic salts.
   - Sliding-window rate limiting to mitigate credential brute forcing.
   - System storage diagnostics and security audit event logs.

---

## Security Architecture

- **Content Security Policy (CSP)**: Strict headers disallowing unauthorized external scripts, framing, or objects.
- **Input Sanitization**: Multi-layer sanitization against Cross-Site Scripting (XSS) on all form submissions.
- **Client-Side PBKDF2 Hashing**: 100,000 iterations of SHA-256 with 16-byte random salts.
- **Rate Limiting**: Sliding window token bucket applied to administrative authentication and chat endpoints.
- **Zero Remote Telemetry**: All mood ratings, journal entries, and chats remain strictly isolated within browser Web Storage.
- **Production Hardening**: Source maps disabled, console debugging dropped in production builds.

---

## Running Locally

```bash
# Clone the repository
git clone https://github.com/sanskarjanjalkar-glitch/wellnest-student-wellness.git

# Enter directory
cd wellnest-student-wellness

# Install dependencies
npm install

# Run development server
npm run dev

# Compile hardened production build
npm run build
```

---

## Technology Stack

- **Framework**: React 19
- **Build Engine**: Vite 8
- **Security**: Web Crypto API (SubtleCrypto PBKDF2 / SHA-256)
- **Data Layer**: Client-Side Isolated Storage
- **Design System**: Slate/Zinc Dark Palette

---

## Legal and Disclaimers

- See `PrivacyPolicyScreen` for full data retention and telemetry disclosures.
- See `TermsScreen` for non-clinical educational disclaimers and emergency helpline protocols.
- License: MIT License.
