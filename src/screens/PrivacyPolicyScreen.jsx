export default function PrivacyPolicyScreen({ onNav }) {
  return (
    <div style={{ padding: "32px 18px 90px", maxWidth: 640, margin: "0 auto", color: "#e4e4e7" }}>
      <button
        onClick={() => onNav("home")}
        style={{
          background: "none",
          border: "none",
          color: "#3b82f6",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          padding: 0,
          marginBottom: 18,
          display: "inline-flex",
          alignItems: "center",
          gap: 6
        }}>
        &larr; Back to Dashboard
      </button>

      <div style={{
        background: "#18181b",
        border: "1px solid #27272a",
        borderRadius: 8,
        padding: "28px 24px"
      }}>
        <div style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#3b82f6",
          letterSpacing: 1,
          textTransform: "uppercase",
          marginBottom: 8
        }}>
          Legal Documentation
        </div>
        <h1 style={{ color: "#fafafa", fontSize: 24, fontWeight: 800, margin: "0 0 8px" }}>
          Privacy Policy
        </h1>
        <div style={{ fontSize: 12, color: "#71717a", marginBottom: 24 }}>
          Effective Date: October 2026 | Application Version 1.0.0
        </div>

        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fafafa", marginBottom: 8 }}>
            1. Core Principle: Zero Remote Telemetry
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "#a1a1aa", margin: 0 }}>
            WellNest is built around a local-first, zero-telemetry architecture. The platform does not deploy third-party trackers, analytics beacons, behavioral fingerprinting scripts, or cross-site tracking cookies. Your psychological check-in history, mood logs, and personal journal reflections never leave your individual web browser.
          </p>
        </section>

        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fafafa", marginBottom: 8 }}>
            2. Local Browser Storage
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "#a1a1aa", margin: 0 }}>
            All user-generated records (including daily check-in ratings, study tags, vent notes, and chat transcripts) are saved exclusively within the browser's standard Web Storage API (localStorage) on your personal device. Clearing your browser cache or activating private browsing partitions will isolate or purge these records according to your personal system settings.
          </p>
        </section>

        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fafafa", marginBottom: 8 }}>
            3. Optional Remote Model Providers
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "#a1a1aa", margin: 0 }}>
            WellNest operates by default with a local deterministic peer-assistance algorithm that requires zero network transmission. If an individual user voluntarily provides their own external API key (such as Google Gemini or Groq), API calls are dispatched strictly and directly from the client browser to the designated provider's HTTPS endpoint. No intermediary proxy intercepts or records your queries.
          </p>
        </section>

        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fafafa", marginBottom: 8 }}>
            4. User Autonomy and Data Deletion
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "#a1a1aa", margin: 0 }}>
            You maintain absolute sovereignty over your records. You may export a complete, machine-readable JSON archive of your data or permanently wipe all stored history at any time using the Reset controls in the application or through the Administrator Console.
          </p>
        </section>

        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fafafa", marginBottom: 8 }}>
            5. Security Standards
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "#a1a1aa", margin: 0 }}>
            All form inputs are sanitized to protect against Cross-Site Scripting (XSS). Administrative routes require cryptographic verification via PBKDF2 (SHA-256) password hashing with salted derivations, accompanied by automatic sliding-window rate limiting to prevent unauthorized enumeration.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fafafa", marginBottom: 8 }}>
            6. Institutional Inquiries
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "#a1a1aa", margin: 0 }}>
            For academic verification or technical inquiries regarding data integrity and security audit parameters, review the open-source repository documentation or access the local system console.
          </p>
        </section>
      </div>
    </div>
  );
}
