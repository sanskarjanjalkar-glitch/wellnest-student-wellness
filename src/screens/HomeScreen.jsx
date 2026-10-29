import { MOODS, STUDENT_REMINDERS } from '../ai.js';
import { StressAlertSystem } from './Common.jsx';

function HomeScreen({ moodLog, onNav, affirmIdx, onOpenSOS }) {
  const last = moodLog[moodLog.length - 1];
  const avg = moodLog.length
    ? (moodLog.slice(-7).reduce((s, m) => s + m.val, 0) / Math.min(7, moodLog.length)).toFixed(1)
    : null;

  return (
    <div style={{ padding: "28px 18px 90px", maxWidth: 520, margin: "0 auto" }}>
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{
            display: "inline-block",
            fontSize: 11,
            fontWeight: 700,
            color: "#3b82f6",
            background: "#1e3a8a25",
            border: "1px solid #1d4ed844",
            padding: "3px 8px",
            borderRadius: 4,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 6
          }}>
            Student Mental Wellness Platform
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#fafafa", margin: 0, lineHeight: 1.25 }}>
            Daily Wellness Overview
          </h1>
        </div>
        <button
          onClick={onOpenSOS}
          title="Emergency Student Helpline"
          style={{
            background: "#450a0a",
            border: "1px solid #7f1d1d",
            borderRadius: 6,
            padding: "8px 12px",
            color: "#fca5a5",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600
          }}>
          Crisis Helplines
        </button>
      </div>

      {/* Early Detection Alert (if stress is detected) */}
      <StressAlertSystem
        moodLog={moodLog}
        onBreathe={() => onNav("breathe")}
        onChat={() => onNav("chat")}
      />

      {/* Student Academic Reminder Card */}
      <div style={{
        background: "#18181b",
        border: "1px solid #27272a",
        borderRadius: 8,
        padding: "16px 18px",
        marginBottom: 20
      }}>
        <div style={{ fontSize: 11, color: "#a1a1aa", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
          Daily Cognitive Reframing
        </div>
        <div style={{ fontSize: 14, color: "#d4d4d8", fontWeight: 500, lineHeight: 1.5 }}>
          "{STUDENT_REMINDERS[affirmIdx % STUDENT_REMINDERS.length]}"
        </div>
      </div>

      {/* Quick Mood Check-in */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontSize: 13, color: "#d4d4d8", fontWeight: 600 }}>Daily Mood Rating</div>
          <span style={{ fontSize: 11, color: "#71717a" }}>Select current state</span>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
          {MOODS.map(m => (
            <button
              key={m.val}
              onClick={() => onNav("mood", m)}
              style={{
                flex: 1,
                padding: "10px 4px",
                borderRadius: 6,
                border: last?.val === m.val ? `1px solid ${m.color}` : "1px solid #27272a",
                background: last?.val === m.val ? "#27272a" : "#18181b",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4
              }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: m.color }}>{m.val}/5</span>
              <span style={{ fontSize: 11, color: "#a1a1aa", fontWeight: 600 }}>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 22 }}>
        <div style={{
          background: "#18181b",
          border: "1px solid #27272a",
          borderRadius: 8,
          padding: "14px 16px"
        }}>
          <div style={{ fontSize: 11, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>
            7-Day Score
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#fafafa", marginTop: 4 }}>
            {avg ? `${avg} / 5` : "No data"}
          </div>
          <div style={{ fontSize: 11, color: "#71717a", marginTop: 2 }}>Rolling academic average</div>
        </div>
        <div style={{
          background: "#18181b",
          border: "1px solid #27272a",
          borderRadius: 8,
          padding: "14px 16px"
        }}>
          <div style={{ fontSize: 11, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>
            Total Recorded
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#fafafa", marginTop: 4 }}>
            {moodLog.length}
          </div>
          <div style={{ fontSize: 11, color: "#71717a", marginTop: 2 }}>Client-side check-ins</div>
        </div>
      </div>

      {/* 4 Practical Student Tool Cards */}
      <div style={{ fontSize: 13, color: "#d4d4d8", fontWeight: 600, marginBottom: 10 }}>
        Wellness and Focus Utilities
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Study Companion", screen: "chat", desc: "Exam advice and strategy", code: "01" },
          { label: "Guided Breathing", screen: "breathe", desc: "Two-minute reset routine", code: "02" },
          { label: "Private Venting", screen: "journal", desc: "Secure local reflections", code: "03" },
          { label: "Weekly Patterns", screen: "insights", desc: "Energy rhythm tracking", code: "04" },
        ].map(a => (
          <button
            key={a.screen}
            onClick={() => onNav(a.screen)}
            style={{
              background: "#18181b",
              border: "1px solid #27272a",
              borderRadius: 8,
              padding: "14px",
              cursor: "pointer",
              textAlign: "left",
              color: "#fafafa"
            }}>
            <div style={{ fontSize: 11, color: "#3b82f6", fontWeight: 700, marginBottom: 4 }}>
              SECTION {a.code}
            </div>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#fafafa" }}>{a.label}</div>
            <div style={{ fontSize: 11, color: "#a1a1aa", marginTop: 2 }}>{a.desc}</div>
          </button>
        ))}
      </div>

      {/* Institutional Links and Legal Navigation */}
      <div style={{
        borderTop: "1px solid #27272a",
        paddingTop: 16,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 14,
        fontSize: 11,
        color: "#71717a"
      }}>
        <button
          onClick={() => onNav("privacy")}
          style={{ background: "none", border: "none", color: "#a1a1aa", fontSize: 11, cursor: "pointer", padding: 0 }}>
          Privacy Policy
        </button>
        <span>&bull;</span>
        <button
          onClick={() => onNav("terms")}
          style={{ background: "none", border: "none", color: "#a1a1aa", fontSize: 11, cursor: "pointer", padding: 0 }}>
          Terms and Conditions
        </button>
        <span>&bull;</span>
        <button
          onClick={() => onNav("admin")}
          style={{ background: "none", border: "none", color: "#3b82f6", fontSize: 11, cursor: "pointer", padding: 0 }}>
          Administrator Console
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: 12, fontSize: 11, color: "#52525b" }}>
        Client-Side Isolated Storage | No Remote Telemetry
      </div>
    </div>
  );
}

export default HomeScreen;
