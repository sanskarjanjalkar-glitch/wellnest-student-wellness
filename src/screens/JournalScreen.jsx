import { useState } from 'react';
import { askAI, MOODS, JOURNAL_PROMPTS, loadStoredJson } from '../ai.js';

// 5. JOURNAL
function JournalScreen({ aiConfig }) {
  const [entries, setEntries] = useState(() => {
    return loadStoredJson("wellnest_journals", []);
  });
  const [text, setText] = useState("");
  const [mood, setMood] = useState(null);
  const [view, setView] = useState("write");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [prompt, setPrompt] = useState(() => {
    return JOURNAL_PROMPTS[Math.floor(Math.random() * JOURNAL_PROMPTS.length)];
  });

  async function saveAndAnalyze() {
    if (!text.trim()) return;
    const entry = { text, mood, time: new Date().toISOString(), id: Date.now() };
    const newEntries = [entry, ...entries];
    setEntries(newEntries);
    localStorage.setItem("wellnest_journals", JSON.stringify(newEntries));
    setText("");
    setMood(null);
    setView("history");
    setAnalyzing(true);
    const res = await askAI(
      "You are a thoughtful journal therapist. Analyze this journal entry and provide: 1) The dominant emotion detected 2) A key theme 3) One gentle reflection question 4) One compassionate observation. Be warm, brief, and insightful. Format as plain text, not lists.",
      `Journal entry: "${entry.text}"`,
      [],
      aiConfig?.key,
      aiConfig?.provider
    );
    setAnalysis(res);
    setAnalyzing(false);
  }

  function handleNewPrompt() {
    const nextPrompt = JOURNAL_PROMPTS[Math.floor(Math.random() * JOURNAL_PROMPTS.length)];
    setPrompt(nextPrompt);
  }

  return (
    <div style={{ padding: "28px 20px 100px", maxWidth: 500, margin: "0 auto" }}>
      <h2 style={{ color: "#fff", fontWeight: 800, fontSize: 26, marginBottom: 6 }}>Journal & Reflect 📔</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {["write", "history"].map(v => (
          <button key={v} onClick={() => setView(v)}
            style={{
              padding: "8px 20px", borderRadius: 50, border: "none",
              background: view === v ? "linear-gradient(135deg,#ec4899,#f43f5e)" : "#ffffff0f",
              color: view === v ? "#fff" : "#64748b", fontWeight: 700, fontSize: 14, cursor: "pointer"
            }}>
            {v === "write" ? "✍️ Write" : `📚 History (${entries.length})`}
          </button>
        ))}
      </div>

      {view === "write" ? (
        <>
          <div style={{ background: "#ffffff08", border: "1px solid #ec489922", borderRadius: 16, padding: "14px 16px", marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ fontSize: 11, color: "#ec4899", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
                Student Prompt of the Day
              </div>
              <button onClick={handleNewPrompt} style={{
                background: "none", border: "none", color: "#ec4899", fontSize: 11, cursor: "pointer", textDecoration: "underline"
              }}>
                Shuffle
              </button>
            </div>
            <div style={{ color: "#e2e8f0", fontSize: 15, lineHeight: 1.6 }}>{prompt}</div>
          </div>
          <textarea value={text} onChange={e => setText(e.target.value)}
            placeholder="Write freely… deadlines, worries, thoughts, or small wins. This is your safe space."
            rows={8}
            style={{
              width: "100%", padding: "16px", borderRadius: 18, border: "1px solid #ffffff18",
              background: "#ffffff06", color: "#fff", fontSize: 15, resize: "none",
              outline: "none", boxSizing: "border-box", marginBottom: 14, fontFamily: "inherit", lineHeight: 1.7
            }} />
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            {MOODS.map(m => (
              <button key={m.val} onClick={() => setMood(m)}
                style={{
                  padding: "8px 14px", borderRadius: 50, border: `1.5px solid ${mood?.val === m.val ? m.color : "#ffffff18"}`,
                  background: mood?.val === m.val ? m.color + "22" : "#ffffff06",
                  color: "#fff", fontSize: 13, cursor: "pointer", transition: "all 0.2s"
                }}>
                {m.emoji} {m.label}
              </button>
            ))}
          </div>
          <button onClick={saveAndAnalyze} disabled={!text.trim()}
            style={{
              width: "100%", padding: "16px", borderRadius: 18,
              background: text.trim() ? "linear-gradient(135deg,#ec4899,#f43f5e)" : "#ffffff12",
              border: "none", color: "#fff", fontWeight: 700, fontSize: 16,
              cursor: text.trim() ? "pointer" : "not-allowed"
            }}>
            Save & Analyze with AI ✨
          </button>
        </>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {analyzing && (
            <div style={{ background: "#ec489914", border: "1px solid #ec489933", borderRadius: 16, padding: 18 }}>
              <div style={{ color: "#ec4899", fontSize: 14 }}>🤖 Analyzing your entry for stress cues & themes…</div>
            </div>
          )}
          {analysis && (
            <div style={{ background: "#ec489914", border: "1px solid #ec489933", borderRadius: 16, padding: 18, marginBottom: 4 }}>
              <div style={{ fontSize: 11, color: "#ec4899", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>AI Emotional Analysis</div>
              <p style={{ color: "#e2e8f0", lineHeight: 1.7, margin: 0, fontSize: 14 }}>{analysis}</p>
            </div>
          )}
          {entries.length === 0 ? (
            <div style={{ textAlign: "center", color: "#64748b", padding: "40px 0" }}>No entries yet. Write your first thought! ✍️</div>
          ) : entries.map(e => (
            <div key={e.id} style={{ background: "#ffffff06", border: "1px solid #ffffff10", borderRadius: 18, padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>{new Date(e.time).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                {e.mood && <span style={{ fontSize: 18 }}>{e.mood.emoji}</span>}
              </div>
              <p style={{ color: "#cbd5e1", fontSize: 14, margin: 0, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                {e.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JournalScreen;
