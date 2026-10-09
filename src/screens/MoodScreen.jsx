import { useState } from 'react';
import { askAI, MOODS } from '../ai.js';

// 2. MOOD LOG
function MoodScreen({ moodLog, setMoodLog, initMood, onNav, aiConfig }) {
  const [selected, setSelected] = useState(initMood || null);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [aiInsight, setAiInsight] = useState("");
  const [loading, setLoading] = useState(false);

  async function save() {
    if (!selected) return;
    const entry = { ...selected, note, time: new Date().toISOString() };
    const newLogs = [...moodLog, entry];
    setMoodLog(newLogs);
    localStorage.setItem("wellnest_moods", JSON.stringify(newLogs));
    setSaved(true);
    setLoading(true);
    const insight = await askAI(
      "You are a compassionate mental wellness coach. Give a brief (2-3 sentences), warm, personalized insight based on someone's mood and note. Be specific and encouraging, not generic.",
      `Mood: ${selected.label} (${selected.val}/5). Note: "${note || "no note"}"`,
      [],
      aiConfig?.key,
      aiConfig?.provider
    );
    setAiInsight(insight);
    setLoading(false);
  }

  if (saved) return (
    <div style={{ padding: "40px 20px 100px", maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>{selected.emoji}</div>
      <h2 style={{ color: "#fff", fontWeight: 800, fontSize: 26, marginBottom: 8 }}>Logged: {selected.label}</h2>
      <p style={{ color: "#94a3b8", marginBottom: 24 }}>Your feeling has been recorded in your wellness pattern history.</p>
      {loading ? (
        <div style={{ color: "#a78bfa", fontStyle: "italic", padding: "20px 0" }}>
          Generating your personalized wellness reflection… ✨
        </div>
      ) : aiInsight && (
        <div style={{
          background: "linear-gradient(135deg,#7c3aed22,#0ea5e922)",
          border: "1px solid #7c3aed44", borderRadius: 18, padding: "20px 22px", textAlign: "left",
          marginBottom: 24
        }}>
          <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
            AI Wellness Insight 🤖
          </div>
          <p style={{ color: "#e2e8f0", lineHeight: 1.7, margin: 0, fontSize: 15 }}>{aiInsight}</p>
        </div>
      )}
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button
          onClick={() => { setSaved(false); setSelected(null); setNote(""); setAiInsight(""); }}
          style={{
            padding: "12px 24px", borderRadius: 14, background: "#ffffff14",
            border: "1px solid #ffffff24", color: "#fff", fontWeight: 600, cursor: "pointer"
          }}>
          Log Another
        </button>
        <button
          onClick={() => onNav("home")}
          style={{
            padding: "12px 24px", borderRadius: 14, background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
            border: "none", color: "#fff", fontWeight: 700, cursor: "pointer"
          }}>
          Go Home
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "28px 20px 100px", maxWidth: 500, margin: "0 auto" }}>
      <h2 style={{ color: "#fff", fontWeight: 800, fontSize: 26, marginBottom: 6 }}>Mood Check-in 🌈</h2>
      <p style={{ color: "#94a3b8", marginBottom: 24, fontSize: 14 }}>
        Check in honestly. Tracking early keeps small stresses from compounding.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        {MOODS.map(m => (
          <button key={m.val} onClick={() => setSelected(m)}
            style={{
              display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
              borderRadius: 18, border: `2px solid ${selected?.val === m.val ? m.color : "#ffffff12"}`,
              background: selected?.val === m.val ? m.color + "22" : "#ffffff06",
              cursor: "pointer", transition: "all 0.2s", color: "#fff", textAlign: "left"
            }}>
            <span style={{ fontSize: 30 }}>{m.emoji}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{m.label}</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>Score: {m.val}/5</div>
            </div>
          </button>
        ))}
      </div>
      <textarea value={note} onChange={e => setNote(e.target.value)}
        placeholder="What triggered this feeling? (Ex: exam coming up, tired, good conversation...)"
        rows={3}
        style={{
          width: "100%", padding: "14px 16px", borderRadius: 16, border: "1px solid #ffffff18",
          background: "#ffffff08", color: "#fff", fontSize: 15, resize: "none",
          outline: "none", boxSizing: "border-box", marginBottom: 16, fontFamily: "inherit"
        }} />
      <button onClick={save} disabled={!selected}
        style={{
          width: "100%", padding: "16px", borderRadius: 18,
          background: selected ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "#ffffff12",
          border: "none", color: selected ? "#fff" : "#64748b", fontWeight: 700, fontSize: 16,
          cursor: selected ? "pointer" : "not-allowed", transition: "all 0.2s"
        }}>
        Save Check-in & Get AI Feedback
      </button>
    </div>
  );
}

export default MoodScreen;
