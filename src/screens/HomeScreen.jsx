import { useState } from 'react';
import { MOODS, AFFIRMATIONS } from '../ai.js';
import { StressAlertSystem } from './Common.jsx';

// 1. HOME
function HomeScreen({ moodLog, onNav, affirmIdx, onOpenSOS, aiConfig, setAiConfig }) {
  const [showConfig, setShowConfig] = useState(false);
  const last = moodLog[moodLog.length - 1];
  const avg = moodLog.length
    ? (moodLog.slice(-7).reduce((s, m) => s + m.val, 0) / Math.min(7, moodLog.length)).toFixed(1)
    : null;

  return (
    <div style={{ padding: "28px 20px 100px", maxWidth: 500, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 13, letterSpacing: 3, color: "#a78bfa", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>
            WellNest • Student Wellness
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.2 }}>
            How are you<br />showing up today? 🌿
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setShowConfig(!showConfig)}
            title="AI Engine Options (Optional API Key)"
            style={{
              background: "#ffffff10", border: "1px solid #ffffff20", borderRadius: 12,
              padding: "8px 12px", color: "#c4b5fd", cursor: "pointer", fontSize: 13
            }}>
            🧠 AI
          </button>
          <button
            onClick={onOpenSOS}
            title="Emergency Student Helpline"
            style={{
              background: "rgba(239, 68, 68, 0.2)", border: "1px solid #ef444455", borderRadius: 12,
              padding: "8px 14px", color: "#f87171", cursor: "pointer", fontSize: 13, fontWeight: 700
            }}>
            🆘 SOS
          </button>
        </div>
      </div>

      {/* Optional AI Configuration Drawer */}
      {showConfig && (
        <div style={{
          background: "#1e1b4b99", border: "1px solid #7c3aed55", borderRadius: 18,
          padding: 16, marginBottom: 20
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#c4b5fd", marginBottom: 4 }}>
            ⚡ AI Intelligence Engine Settings
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 12, lineHeight: 1.4 }}>
            WellNest has a full built-in answers engine ready. If you want direct live web generation for any free-form topic, select a provider and enter your free key (e.g. Google Gemini or Groq):
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            {["gemini", "groq", "openai"].map(prov => (
              <button key={prov}
                onClick={() => setAiConfig(prev => ({ ...prev, provider: prov }))}
                style={{
                  flex: 1, padding: "6px 8px", borderRadius: 8, textTransform: "capitalize",
                  background: aiConfig.provider === prov ? "#7c3aed" : "#ffffff10",
                  border: "none", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer"
                }}>
                {prov}
              </button>
            ))}
          </div>
          <input
            type="password"
            value={aiConfig.key || ""}
            onChange={e => setAiConfig(prev => ({ ...prev, key: e.target.value }))}
            placeholder={`Paste optional ${aiConfig.provider.toUpperCase()} API key...`}
            style={{
              width: "100%", padding: "8px 12px", borderRadius: 10,
              background: "#0a0a14", border: "1px solid #ffffff22", color: "#fff",
              fontSize: 12, outline: "none", boxSizing: "border-box"
            }}
          />
          <div style={{ fontSize: 11, color: "#a78bfa", marginTop: 6 }}>
            ✓ Leave blank to use the built-in instant student wellness intelligence.
          </div>
        </div>
      )}

      {/* Early Detection Alert System */}
      <StressAlertSystem
        moodLog={moodLog}
        onBreathe={() => onNav("breathe")}
        onChat={() => onNav("chat")}
      />

      {/* Affirmation card */}
      <div style={{
        background: "linear-gradient(135deg, #7c3aed22, #0ea5e922)",
        border: "1px solid #7c3aed44",
        borderRadius: 20, padding: "20px 22px", marginBottom: 20,
        backdropFilter: "blur(12px)"
      }}>
        <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
          Daily Affirmation
        </div>
        <div style={{ fontSize: 17, color: "#e2e8f0", fontWeight: 600, lineHeight: 1.5, fontStyle: "italic" }}>
          "{AFFIRMATIONS[affirmIdx % AFFIRMATIONS.length]}"
        </div>
      </div>

      {/* Quick mood log */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>Quick Daily Check-in</div>
          <span style={{ fontSize: 11, color: "#a78bfa", fontWeight: 600 }}>Early Radar Active ⚡</span>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
          {MOODS.map(m => (
            <button key={m.val} onClick={() => onNav("mood", m)}
              style={{
                flex: 1, padding: "10px 0", borderRadius: 14, border: "1px solid #ffffff18",
                background: last?.val === m.val ? m.color + "33" : "#ffffff08",
                cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column",
                alignItems: "center", gap: 4
              }}>
              <span style={{ fontSize: 22 }}>{m.emoji}</span>
              <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
        {[
          { label: "7-Day Avg Mood", value: avg ? `${avg}/5` : "—", icon: "📊" },
          { label: "Check-ins Logged", value: moodLog.length, icon: "📝" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#ffffff08", border: "1px solid #ffffff12", borderRadius: 18,
            padding: "16px 18px", backdropFilter: "blur(8px)"
          }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {[
          { label: "AI Companion", icon: "🤖", screen: "chat", grad: "linear-gradient(135deg,#7c3aed,#4f46e5)", desc: "Ask questions & get advice" },
          { label: "Breathwork", icon: "🫧", screen: "breathe", grad: "linear-gradient(135deg,#0ea5e9,#06b6d4)", desc: "Relieve exam nerves" },
          { label: "Journal & AI", icon: "📔", screen: "journal", grad: "linear-gradient(135deg,#ec4899,#f43f5e)", desc: "Reflect & vent freely" },
          { label: "Insights & Alert", icon: "✨", screen: "insights", grad: "linear-gradient(135deg,#f59e0b,#f97316)", desc: "Burnout risk report" },
        ].map(a => (
          <button key={a.screen} onClick={() => onNav(a.screen)}
            style={{
              background: a.grad, border: "none", borderRadius: 18, padding: "18px 16px",
              cursor: "pointer", textAlign: "left", color: "#fff", transition: "transform 0.15s, opacity 0.15s"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <div style={{ fontSize: 28, marginBottom: 6 }}>{a.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{a.label}</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>{a.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
