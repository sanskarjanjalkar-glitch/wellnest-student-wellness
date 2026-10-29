import { useState } from 'react';
import { askAI, MOODS, JOURNAL_PROMPTS, loadStoredJson } from '../ai.js';
import { sanitizeInput } from '../security.js';

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
    const cleanText = sanitizeInput(text, 4000);
    if (!cleanText) return;
    const entry = {
      text: cleanText,
      mood: mood ? { label: mood.label, val: mood.val, color: mood.color } : null,
      time: new Date().toISOString(),
      id: Date.now()
    };
    const newEntries = [entry, ...entries];
    setEntries(newEntries);
    localStorage.setItem("wellnest_journals", JSON.stringify(newEntries));
    setText("");
    setMood(null);
    setView("history");
    setAnalyzing(true);

    const res = await askAI(
      "You are a compassionate, thoughtful student peer reading a classmate's private journal reflection. Provide a concise, supportive note (three sentences maximum). Remind them that consistent effort matters. Do not use bullet points or clinical headings.",
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
    <div style={{ padding: "28px 18px 90px", maxWidth: 520, margin: "0 auto" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
        Cognitive Externalization
      </div>
      <h2 style={{ color: "#fafafa", fontWeight: 700, fontSize: 22, margin: "0 0 6px" }}>
        Private Venting Workspace
      </h2>
      <p style={{ color: "#a1a1aa", fontSize: 13, marginBottom: 18 }}>
        Externalize academic demands and stress. Encrypted and stored exclusively in browser local storage.
      </p>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["write", "history"].map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              border: "1px solid #27272a",
              background: view === v ? "#2563eb" : "#18181b",
              color: view === v ? "#ffffff" : "#a1a1aa",
              fontWeight: 600,
              fontSize: 12,
              cursor: "pointer"
            }}>
            {v === "write" ? "New Reflection" : `Saved History (${entries.length})`}
          </button>
        ))}
      </div>

      {view === "write" ? (
        <div>
          {/* Prompt Box */}
          <div style={{
            background: "#18181b",
            border: "1px solid #27272a",
            borderRadius: 8,
            padding: "14px 16px",
            marginBottom: 16
          }}>
            <div style={{ display: "flex ancient", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", letterSpacing: 0.5 }}>
                Structured Prompt
              </span>
              <button
                onClick={handleNewPrompt}
                style={{
                  background: "none",
                  border: "none",
                  color: "#a1a1aa",
                  fontSize: 11,
                  cursor: "pointer",
                  fontWeight: 600
                }}>
                Shuffle Prompt
              </button>
            </div>
            <div style={{ fontSize: 13, color: "#d4d4d8", lineHeight: 1.5 }}>
              "{prompt}"
            </div>
          </div>

          {/* Mood tag */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#a1a1aa" }}>Associated score:</span>
            {MOODS.map(m => (
              <button
                key={m.val}
                onClick={() => setMood(m.val === mood?.val ? null : m)}
                style={{
                  background: mood?.val === m.val ? "#27272a" : "#18181b",
                  border: mood?.val === m.val ? `1px solid ${m.color}` : "1px solid #27272a",
                  borderRadius: 4,
                  padding: "4px 8px",
                  cursor: "pointer",
                  fontSize: 11,
                  color: mood?.val === m.val ? m.color : "#a1a1aa",
                  fontWeight: 600
                }}>
                {m.val}/5
              </button>
            ))}
          </div>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Document academic pressures, schedule bottlenecks, or reflections..."
            rows={7}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 6,
              background: "#18181b",
              border: "1px solid #27272a",
              color: "#fafafa",
              fontSize: 13,
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
              lineHeight: 1.6,
              marginBottom: 16
            }}
          />

          <button
            onClick={saveAndReply}
            disabled={!text.trim()}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 6,
              border: "none",
              background: text.trim() ? "#2563eb" : "#27272a",
              color: text.trim() ? "#ffffff" : "#71717a",
              fontWeight: 600,
              fontSize: 13,
              cursor: text.trim() ? "pointer" : "not-allowed"
            }}>
            Save Entry
          </button>
        </div>
      ) : (
        /* History View */
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {analyzing && (
            <div style={{ background: "#18181b", padding: 12, borderRadius: 6, border: "1px solid #27272a", color: "#3b82f6", fontSize: 13, textAlign: "center" }}>
              Generating peer reflection...
            </div>
          )}
          {friendlyReply && !analyzing && (
            <div style={{
              background: "#18181b",
              border: "1px solid #27272a",
              borderRadius: 8,
              padding: "16px 18px"
            }}>
              <div style={{ fontSize: 11, color: "#3b82f6", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
                Peer Note
              </div>
              <p style={{ color: "#d4d4d8", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                {friendlyReply}
              </p>
            </div>
          )}

          {entries.length === 0 ? (
            <div style={{ textAlign: "center", color: "#71717a", padding: "40px 0", fontSize: 13 }}>
              No journal reflections recorded yet. Select "New Reflection" above to record an entry.
            </div>
          ) : (
            entries.map(e => (
              <div key={e.id} style={{
                background: "#18181b",
                border: "1px solid #27272a",
                borderRadius: 8,
                padding: "16px 18px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, color: "#a1a1aa" }}>
                    {new Date(e.time).toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {e.mood && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: e.mood.color }}>
                      Score {e.mood.val}/5 ({e.mood.label})
                    </span>
                  )}
                </div>
                <div style={{ color: "#fafafa", fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
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
