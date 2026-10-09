// ─── Visual Enhancements ─────────────────────────────────────────────────────
function Sparkle({ x, y }) {
  return (
    <div style={{
      position: "fixed", left: x, top: y, pointerEvents: "none", zIndex: 9999,
      fontSize: 18, animation: "sparkle 1s ease-out forwards"
    }}>✨</div>
  );
}

function WaveBg() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%", opacity: 0.07 }}>
        <defs>
          <linearGradient id="wg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        {[0, 60, 120, 180, 240].map((d, i) => (
          <ellipse key={i} cx={720} cy={450 + d} rx={900 - i * 60} ry={300 - i * 20}
            fill="none" stroke="url(#wg1)" strokeWidth={1.5}
            style={{ animation: `wave ${8 + i}s ease-in-out infinite alternate`, transformOrigin: "center" }}
          />
        ))}
      </svg>
    </div>
  );
}

// ─── Student Emergency SOS Modal ─────────────────────────────────────────────
function SOSModal({ onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.78)",
      backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20
    }}>
      <div style={{
        background: "#181829", border: "1px solid #ef444455", borderRadius: 24,
        padding: "28px 24px", maxWidth: 440, width: "100%", boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>🆘</span>
            <h3 style={{ margin: 0, color: "#f87171", fontSize: 20, fontWeight: 800 }}>Student Crisis & Support</h3>
          </div>
          <button onClick={onClose} style={{
            background: "#ffffff14", border: "none", color: "#94a3b8", borderRadius: "50%",
            width: 32, height: 32, cursor: "pointer", fontSize: 16
          }}>✕</button>
        </div>
        <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
          If you are in severe distress, experiencing panic attacks, or having thoughts of self-harm, please know that confidential, free, and immediate support is always ready for you.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          <div style={{ background: "#ffffff08", border: "1px solid #ffffff12", borderRadius: 14, padding: "12px 16px" }}>
            <div style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>📞 988 Suicide & Crisis Lifeline</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Call or text <strong>988</strong> (24/7, Free & Confidential)</div>
          </div>
          <div style={{ background: "#ffffff08", border: "1px solid #ffffff12", borderRadius: 14, padding: "12px 16px" }}>
            <div style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>💬 Crisis Text Line</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Text <strong>HOME</strong> to <strong>741741</strong> to connect with a crisis counselor</div>
          </div>
          <div style={{ background: "#ffffff08", border: "1px solid #ffffff12", borderRadius: 14, padding: "12px 16px" }}>
            <div style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>🌍 International Emergency Lines</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Europe: <strong>112</strong> | UK: <strong>111</strong> | India: <strong>14416</strong> (Tele-MANAS)</div>
          </div>
        </div>
        <button onClick={onClose} style={{
          width: "100%", padding: "14px", borderRadius: 16,
          background: "linear-gradient(135deg, #7c3aed, #4f46e5)", border: "none",
          color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer"
        }}>
          Return to WellNest
        </button>
      </div>
    </div>
  );
}

// ─── Early Stress Detection Alert System ─────────────────────────────────────
function StressAlertSystem({ moodLog, onBreathe, onChat }) {
  const recentLogs = moodLog.slice(-3);
  const isHighStress = recentLogs.length >= 2 && recentLogs.every(m => m.val <= 2);
  const consecutiveLow = recentLogs.filter(m => m.val <= 2).length;

  if (!isHighStress && consecutiveLow < 2) return null;

  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(239, 68, 68, 0.22), rgba(249, 115, 22, 0.22))",
      border: "1px solid rgba(239, 68, 68, 0.45)",
      borderRadius: 18,
      padding: "16px 18px",
      marginBottom: 22,
      backdropFilter: "blur(12px)",
      boxShadow: "0 8px 24px rgba(239, 68, 68, 0.18)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 22 }}>🚨</span>
        <div style={{ fontWeight: 800, fontSize: 14, color: "#fca5a5", letterSpacing: 0.5 }}>
          EARLY STRESS DETECTION ALERT
        </div>
      </div>
      <p style={{ color: "#fee2e2", fontSize: 13, lineHeight: 1.5, margin: "0 0 12px" }}>
        We noticed low mood scores across your latest check-ins. Student burnout often begins silently with high workload or fatigue. Let's reset together before stress compounds.
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onBreathe} style={{
          flex: 1, padding: "9px 12px", borderRadius: 12, border: "none",
          background: "#ef4444", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer"
        }}>
          🫧 Take a 2-min Breath
        </button>
        <button onClick={onChat} style={{
          flex: 1, padding: "9px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.12)", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer"
        }}>
          💬 Talk with Companion
        </button>
      </div>
    </div>
  );
}

export { Sparkle, WaveBg, SOSModal, StressAlertSystem };
