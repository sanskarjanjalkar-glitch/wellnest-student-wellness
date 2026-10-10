// ─── Student Crisis & Support Helpline Modal ─────────────────────────────────
function SOSModal({ onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999, background: "rgba(15, 23, 42, 0.85)",
      backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16
    }}>
      <div style={{
        background: "#1e293b", border: "1px solid #ef444455", borderRadius: 20,
        padding: "24px 20px", maxWidth: 440, width: "100%", boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🆘</span>
            <h3 style={{ margin: 0, color: "#f87171", fontSize: 18, fontWeight: 700 }}>Student Support Helplines</h3>
          </div>
          <button onClick={onClose} style={{
            background: "#ffffff10", border: "none", color: "#94a3b8", borderRadius: 8,
            width: 30, height: 30, cursor: "pointer", fontSize: 15
          }}>✕</button>
        </div>
        <p style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, marginBottom: 18 }}>
          If you're dealing with severe anxiety, panic attacks, or having a really dark day, please know that free, confidential, and instant help is ready 24/7.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontWeight: 700, color: "#f8fafc", fontSize: 14 }}>📞 988 Suicide & Crisis Lifeline</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Call or text <strong>988</strong> (Free, 24/7, Confidential)</div>
          </div>
          <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontWeight: 700, color: "#f8fafc", fontSize: 14 }}>💬 Crisis Text Line</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Text <strong>HOME</strong> to <strong>741741</strong> to message with a counselor</div>
          </div>
          <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontWeight: 700, color: "#f8fafc", fontSize: 14 }}>🌍 India & UK Helplines</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>India: <strong>14416</strong> (Tele-MANAS) | UK: <strong>111</strong></div>
          </div>
        </div>
        <button onClick={onClose} style={{
          width: "100%", padding: "12px", borderRadius: 12,
          background: "#3b82f6", border: "none",
          color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer"
        }}>
          Close & Back to App
        </button>
      </div>
    </div>
  );
}

// ─── Early Stress Radar (Supportive Student Warning) ─────────────────────────
function StressAlertSystem({ moodLog, onBreathe, onChat }) {
  const recentLogs = moodLog.slice(-3);
  const isHighStress = recentLogs.length >= 2 && recentLogs.every(m => m.val <= 2);
  const consecutiveLow = recentLogs.filter(m => m.val <= 2).length;

  if (!isHighStress && consecutiveLow < 2) return null;

  return (
    <div style={{
      background: "#3f1d24",
      border: "1px solid #f8717155",
      borderRadius: 16,
      padding: "16px 18px",
      marginBottom: 20
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 18 }}>🌱</span>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#fca5a5" }}>
          Gentle Check-in: Rough couple of days?
        </div>
      </div>
      <p style={{ color: "#fecaca", fontSize: 13, lineHeight: 1.5, margin: "0 0 12px" }}>
        Your last few check-ins show stress is piling up. Semester burnout usually sneaks in silently. Give yourself a 5-minute break right now before pushing any further.
      </p>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onBreathe} style={{
          flex: 1, padding: "9px 12px", borderRadius: 10, border: "none",
          background: "#ef4444", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer"
        }}>
          🫧 2-Minute Breathing
        </button>
        <button onClick={onChat} style={{
          flex: 1, padding: "9px 12px", borderRadius: 10, border: "1px solid #ffffff22",
          background: "#1e293b", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer"
        }}>
          💬 Talk to Study Buddy
        </button>
      </div>
    </div>
  );
}

export { SOSModal, StressAlertSystem };
