export default function TermsScreen({ onNav }) {
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
          Terms and Conditions
        </h1>
        <div style={{ fontSize: 12, color: "#71717a", marginBottom: 24 }}>
          Effective Date: October 2026 | Application Version 1.0.0
        </div>

        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fafafa", marginBottom: 8 }}>
            1. Non-Clinical Educational Disclaimer
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "#a1a1aa", margin: 0 }}>
            WellNest is an academic software project designed to provide self-reflection prompts, study habit techniques, and structured relaxation exercises. WellNest is not a licensed medical provider, psychiatric treatment facility, clinical diagnosis tool, or emergency suicide response service. Use of this application does not establish a doctor-patient relationship.
          </p>
        </section>

        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#f87171", marginBottom: 8 }}>
            2. Emergency and Crisis Resources
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "#fca5a5", margin: "0 0 10px" }}>
            If you are experiencing severe psychological distress, thoughts of self-harm, or an acute mental health crisis, immediately contact emergency services or a national crisis helpline:
          </p>
          <ul style={{ fontSize: 13, lineHeight: 1.6, color: "#fecaca", paddingLeft: 20, margin: 0 }}>
            <li>United States and Canada: Dial or text 988 (Suicide and Crisis Lifeline, 24/7, free and confidential).</li>
            <li>United States Crisis Text Line: Text HOME to 741741 to connect with a crisis counselor.</li>
            <li>India: Dial 14416 (Tele-MANAS National Mental Health Helpline, 24/7).</li>
            <li>United Kingdom: Dial 111 (NHS Mental Health Services).</li>
            <li>International: Contact your local municipal emergency number or university counseling center.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fafafa", marginBottom: 8 }}>
            3. Permitted Academic and Personal Use
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "#a1a1aa", margin: 0 }}>
            You are granted a revocable, non-exclusive, non-transferable license to access WellNest for lawful, personal, and academic purposes. You agree not to attempt security circumvention, denial of service attacks, unauthorized parameter tampering, or brute force attempts against administrative authorization endpoints.
          </p>
        </section>

        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fafafa", marginBottom: 8 }}>
            4. Limitation of Liability
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "#a1a1aa", margin: 0 }}>
            The application and all contained materials are provided on an "as is" and "as available" basis without express or implied warranties. To the fullest extent permitted under governing law, the authors and contributors disclaim liability for any indirect, incidental, or consequential damages resulting from the use or inability to use the service.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fafafa", marginBottom: 8 }}>
            5. Modifications to Terms
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "#a1a1aa", margin: 0 }}>
            These terms may be updated periodically to reflect software enhancements, regulatory guidelines, or academic institutional standards. Continued access to the application constitutes acceptance of updated terms.
          </p>
        </section>
      </div>
    </div>
  );
}
