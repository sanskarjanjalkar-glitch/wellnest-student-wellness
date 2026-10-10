import { MOODS, STUDENT_REMINDERS } from '../ai.js';
import { StressAlertSystem } from './Common.jsx';

function HomeScreen({ moodLog, onNav, affirmIdx, onOpenSOS }) {
  const last = moodLog[moodLog.length - 1];
  const avg = moodLog.length
    ? (moodLog.slice(-7).reduce((s, m) => s + m.val, 0) / Math.min(7, moodLog.length)).toFixed(1)
    : null;

  return (
    <div style={{ padding: "24px 18px 90px", maxWidth: 480, margin: "0 auto" }}>
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{
            display: "inline-block", fontSize: 11, fontWeight: 700, color: "#38bdf8",
            background: "#0284c722", border: "1px solid #0284c744",
            padding: "3px 8px", borderRadius: 6, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6
          }}>
            🎒 Student Wellness Project
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#f8fafc", margin: 0, lineHeight: 1.25 }}>
            How are you doing today?
          </h1>
        </div>
        <button
          onClick={onOpenSOS}
          title="Emergency Student Helpline"
          style={{
            background: "#ef444422", border: "1px solid #ef444455", borderRadius: 10,
            padding: "8px 12px", color: "#fca5a5", cursor: "pointer", fontSize: 12, fontWeight: 700
          }}>
          🆘 Helpline
        </button>
      </div>

      {/* Early Detection Alert (if stress is detected) */}
      <StressAlertSystem
        moodLog={moodLog}
        onBreathe={() => onNav("breathe")}
        onChat={() => onNav("chat")}
      />

      {/* Relatable Student Reminder Card */}
      <div style={{
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: 16, padding: "16px 18px", marginBottom: 20
      }}>
        <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
          💡 Student Reality Check
        </div>
        <div style={{ fontSize: 15, color: "#e2e8f0", fontWeight: 500, lineHeight: 1.5 }}>
          "{STUDENT_REMINDERS[affirmIdx % STUDENT_REMINDERS.length]}"
        </div>
      </div>

      {/* Quick 10-Second Mood Check-in */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 600 }}>Quick 10-Second Check-in</div>
          <span style={{ fontSize: 11, color: "#64748b" }}>Tap how you feel</span>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
          {MOODS.map(m => (
            <button key={m.val} onClick={() => onNav("mood", m)}
              style={{
                flex: 1, padding: "10px 4px", borderRadius: 12, border: "1px solid #334155",
                background: last?.val === m.val ? m.color + "25" : "#1e293b",
                cursor: "pointer", transition: "transform 0.1s", display: "flex", flexDirection: "column",
                alignItems: "center", gap: 4
              }}>
              <span style={{ fontSize: 22 }}>{m.emoji}</span>
              <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 22 }}>
        <div style={{
          background: "#1e293b", border: "1px solid #334155", borderRadius: 14,
          padding: "14px 16px"
        }}>
          <div style={{ fontSize: 18, marginBottom: 4 }}>📊</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#f8fafc" }}>{avg ? `${avg}/5` : "—"}</div>
          <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>7-Day Average</div>
        </div>
        <div style={{
          background: "#1e293b", border: "1px solid #334155", borderRadius: 14,
          padding: "14px 16px"
        }}>
          <div style={{ fontSize: 18, marginBottom: 4 }}>📝</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#f8fafc" }}>{moodLog.length}</div>
          <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Total Check-ins</div>
        </div>
      </div>

      {/* 4 Practical Student Tool Cards */}
      <div style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 600, marginBottom: 10 }}>Student Survival Tools</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[
          { label: "Study Buddy", icon: "💬", screen: "chat", desc: "Exam advice & venting", bg: "#1e293b", accent: "#38bdf8" },
          { label: "Quick Breath", icon: "🫧", screen: "breathe", desc: "2-min panic reset", bg: "#1e293b", accent: "#34d399" },
          { label: "Venting Space", icon: "📝", screen: "journal", desc: "Private journal", bg: "#1e293b", accent: "#f472b6" },
          { label: "Weekly Rhythm", icon: "📈", screen: "insights", desc: "Stress pattern check", bg: "#1e293b", accent: "#fbbf24" },
        ].map(a => (
          <button key={a.screen} onClick={() => onNav(a.screen)}
            style={{
              background: a.bg, border: "1px solid #334155", borderRadius: 14, padding: "16px 14px",
              cursor: "pointer", textAlign: "left", color: "#fff", transition: "border-color 0.15s"
            }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{a.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#f8fafc" }}>{a.label}</div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{a.desc}</div>
          </button>
        ))}
      </div>

      {/* Subtle Privacy Badge */}
      <div style={{ textAlign: "center", marginTop: 26, fontSize: 11, color: "#64748b" }}>
        🔒 100% Private & Free • Stored only on your device • No sign-up needed
      </div>
    </div>
  );
}

export default HomeScreen;
