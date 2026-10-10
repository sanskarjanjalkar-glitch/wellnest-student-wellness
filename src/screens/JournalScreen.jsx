import { useState } from 'react';
import { askAI, MOODS, JOURNAL_PROMPTS, loadStoredJson } from '../ai.js';

function JournalScreen() {
  const [entries, setEntries] = useState(() => {
    return loadStoredJson("wellnest_journals", []);
  });
  const [text, setText] = useState("");
  const [mood, setMood] = useState(null);
  const [view, setView] = useState("write");
  const [analyzing, setAnalyzing] = useState(false);
  const [friendlyReply, setFriendlyReply] = useState("");
  const [prompt, setPrompt] = useState(() => {
    return JOURNAL_PROMPTS[Math.floor(Math.random() * JOURNAL_PROMPTS.length)];
  });

  async function saveAndReply() {
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
      "You are a compassionate, thoughtful student peer reading a friend's private journal entry. Write a short, warm, encouraging response (3 sentences max). Remind them they are doing their best. Do NOT use bullet points or clinical headers.",
      `Journal entry: "${entry.text}"`
    );
    setFriendlyReply(res);
    setAnalyzing(false);
  }

  function handleNewPrompt() {
    const nextPrompt = JOURNAL_PROMPTS[Math.floor(Math.random() * JOURNAL_PROMPTS.length)];
    setPrompt(nextPrompt);
  }

  return (
    <div style={{ padding: "24px 18px 90px", maxWidth: 480, margin: "0 auto" }}>
      <h2 style={{ color: "#f8fafc", fontWeight: 800, fontSize: 24, marginBottom: 4 }}>Venting Space 📝</h2>
      <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 18 }}>Get whatever is on your chest out of your head. 100% private.</p>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["write", "history"].map(v => (
          <button key={v} onClick={() => setView(v)}
            style={{
              padding: "7px 16px", borderRadius: 10, border: "none",
              background: view === v ? "#3b82f6" : "#1e293b",
              color: view === v ? "#fff" : "#94a3b8", fontWeight: 600, fontSize: 13, cursor: "pointer"
            }}>
            {v === "write" ? "✍️ Write / Vent" : `📖 Past Entries (${entries.length})`}
          </button>
        ))}
      </div>

      {view === "write" ? (
        <div>
          {/* Prompt Idea Box */}
          <div style={{
            background: "#1e293b", border: "1px solid #334155", borderRadius: 14,
            padding: "14px 16px", marginBottom: 16
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#38bdf8", textTransform: "uppercase" }}>Thought Starter</span>
              <button
                onClick={handleNewPrompt}
                style={{ background: "none", border: "none", color: "#64748b", fontSize: 11, cursor: "pointer" }}>
                🎲 Shuffle
              </button>
            </div>
            <div style={{ fontSize: 13.5, color: "#e2e8f0", lineHeight: 1.5 }}>
              "{prompt}"
            </div>
          </div>

          {/* Mood tag */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>Tag feeling:</span>
            {MOODS.map(m => (
              <button key={m.val} onClick={() => setMood(m.val === mood?.val ? null : m)}
                style={{
                  background: mood?.val === m.val ? m.color + "33" : "#1e293b",
                  border: mood?.val === m.val ? `1px solid ${m.color}` : "1px solid #334155",
                  borderRadius: 8, padding: "3px 7px", cursor: "pointer", fontSize: 16
                }}>
                {m.emoji}
              </button>
            ))}
          </div>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type as much or as little as you need... Nobody else can read this."
            rows={7}
            style={{
              width: "100%", padding: "14px", borderRadius: 14,
              background: "#1e293b", border: "1px solid #334155", color: "#f8fafc",
              fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit",
              lineHeight: 1.6, marginBottom: 16
            }}
          />

          <button
            onClick={saveAndReply}
            disabled={!text.trim()}
            style={{
              width: "100%", padding: "13px", borderRadius: 12, border: "none",
              background: text.trim() ? "#3b82f6" : "#334155",
              color: "#fff", fontWeight: 700, fontSize: 14,
              cursor: text.trim() ? "pointer" : "not-allowed"
            }}>
            Save Entry 🌿
          </button>
        </div>
      ) : (
        /* History View */
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {analyzing && (
            <div style={{ background: "#1e293b", padding: 14, borderRadius: 12, color: "#38bdf8", fontSize: 13, textAlign: "center" }}>
              Writing a kind reflection for you... 🌿
            </div>
          )}
          {friendlyReply && !analyzing && (
            <div style={{
              background: "#1e293b", border: "1px solid #38bdf855", borderRadius: 14,
              padding: "16px 18px"
            }}>
              <div style={{ fontSize: 11, color: "#38bdf8", fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>
                💬 Note from your Study Buddy
              </div>
              <p style={{ color: "#e2e8f0", fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>
                {friendlyReply}
              </p>
            </div>
          )}

          {entries.length === 0 ? (
            <div style={{ textAlign: "center", color: "#64748b", padding: "40px 0", fontSize: 13 }}>
              No journal entries yet. Tap "Write / Vent" above to write your first entry!
            </div>
          ) : (
            entries.map(e => (
              <div key={e.id} style={{
                background: "#1e293b", border: "1px solid #334155", borderRadius: 14,
                padding: "16px 18px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>
                    {new Date(e.time).toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {e.mood && <span style={{ fontSize: 16 }}>{e.mood.emoji}</span>}
                </div>
                <div style={{ color: "#f8fafc", fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                  {e.text}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default JournalScreen;
