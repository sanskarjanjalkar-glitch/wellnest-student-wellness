/**
 * Reusable System Modals and Alerts
 * Strictly professional, emoji-free, and compliant with accessibility standards.
 */

function SOSModal({ onClose }) {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 999,
      background: "rgba(9, 9, 11, 0.88)",
      backdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16
    }}>
      <div style={{
        background: "#18181b",
        border: "1px solid #7f1d1d",
        borderRadius: 8,
        padding: "24px 22px",
        maxWidth: 440,
        width: "100%",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#f87171", textTransform: "uppercase", letterSpacing: 1 }}>
              Emergency Assistance
            </div>
            <h3 style={{ margin: "2px 0 0", color: "#fafafa", fontSize: 17, fontWeight: 700 }}>
              Student Crisis and Support Helplines
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: "#27272a",
              border: "1px solid #3f3f46",
              color: "#a1a1aa",
              borderRadius: 6,
              width: 28,
              height: 28,
              cursor: "pointer",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
            &times;
          </button>
        </div>

        <p style={{ color: "#d4d4d8", fontSize: 13, lineHeight: 1.5, margin: "0 0 16px" }}>
          If you are experiencing acute distress, panic attacks, or thoughts of self-harm, confidential and trained support counselors are available 24 hours a day, 7 days a week:
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          <div style={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 6, padding: "12px 14px" }}>
            <div style={{ fontWeight: 700, color: "#fafafa", fontSize: 13 }}>
              988 Suicide and Crisis Lifeline
            </div>
            <div style={{ fontSize: 12, color: "#a1a1aa", marginTop: 2 }}>
              Call or text <strong>988</strong> (United States and Canada, Free, 24/7)
            </div>
          </div>

          <div style={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 6, padding: "12px 14px" }}>
            <div style={{ fontWeight: 700, color: "#fafafa", fontSize: 13 }}>
              Crisis Text Line
            </div>
            <div style={{ fontSize: 12, color: "#a1a1aa", marginTop: 2 }}>
              Text <strong>HOME</strong> to <strong>741741</strong> to connect with a crisis counselor
            </div>
          </div>

          <div style={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 6, padding: "12px 14px" }}>
            <div style={{ fontWeight: 700, color: "#fafafa", fontSize: 13 }}>
              International Helplines
            </div>
            <div style={{ fontSize: 12, color: "#a1a1aa", marginTop: 2 }}>
              India: <strong>14416</strong> (Tele-MANAS) | United Kingdom: <strong>111</strong>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "11px",
            borderRadius: 6,
            background: "#2563eb",
            border: "none",
            color: "#ffffff",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer"
          }}>
          Return to Application
        </button>
      </div>
    </div>
  );
}

function StressAlertSystem({ moodLog, onBreathe, onChat }) {
  const recentLogs = moodLog.slice(-3);
  const isHighStress = recentLogs.length >= 2 && recentLogs.every(m => m.val <= 2);
  const consecutiveLow = recentLogs.filter(m => m.val <= 2).length;

  if (!isHighStress && consecutiveLow < 2) return null;

  return (
    <div style={{
      background: "#18181b",
      border: "1px solid #dc2626",
      borderRadius: 8,
      padding: "16px 18px",
      marginBottom: 20
    }}>
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        color: "#f87171",
        letterSpacing: 1,
        textTransform: "uppercase",
        marginBottom: 4
      }}>
        Early Stress Detection Radar
      </div>
      <div style={{ fontWeight: 700, fontSize: 14, color: "#fafafa", marginBottom: 6 }}>
        Consecutive high-strain check-ins identified
      </div>
      <p style={{ color: "#d4d4d8", fontSize: 13, lineHeight: 1.5, margin: "0 0 14px" }}>
        Your recent check-in scores indicate elevated stress levels over consecutive days. Taking a short pause now reduces the likelihood of academic burnout.
      </p>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={onBreathe}
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 6,
            border: "none",
            background: "#2563eb",
            color: "#ffffff",
            fontWeight: 600,
            fontSize: 12,
            cursor: "pointer"
          }}>
          Guided Breathing Session
        </button>
        <button
          onClick={onChat}
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 6,
            border: "1px solid #27272a",
            background: "#27272a",
            color: "#fafafa",
            fontWeight: 600,
            fontSize: 12,
            cursor: "pointer"
          }}>
          Consult Study Companion
        </button>
      </div>
    </div>
  );
}

export { SOSModal, StressAlertSystem };
