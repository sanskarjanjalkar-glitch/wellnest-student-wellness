import { useState } from 'react';
import { askAI, MOODS, STUDENT_TAGS } from '../ai.js';

function MoodScreen({ moodLog, setMoodLog, initMood, onNav }) {
  const [selected, setSelected] = useState(initMood || null);
  const [selectedTag, setSelectedTag] = useState("");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [friendNote, setFriendNote] = useState("");
  const [loading, setLoading] = useState(false);

  async function save() {
    if (!selected) return;
    const combinedNote = selectedTag ? `[${selectedTag}] ${note}`.trim() : note.trim();
    const entry = { ...selected, note: combinedNote, time: new Date().toISOString() };
    const newLogs = [...moodLog, entry];
    setMoodLog(newLogs);
    localStorage.setItem("wellnest_moods", JSON.stringify(newLogs));
    setSaved(true);
    setLoading(true);
    const reply = await askAI(
      "You are a supportive college peer. Give a brief (2-3 sentences), warm, relatable note acknowledging what they logged. Be friendly, encouraging, and human.",
      `Mood: ${selected.label} (${selected.val}/5). Tag: ${selectedTag || "None"}. Note: "${note || "none"}"`
    );
    setFriendNote(reply);
    setLoading(false);
  }

  if (saved) return (
    <div style={{ padding: "40px 18px 90px", maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: 56, marginBottom: 12 }}>{selected.emoji}</div>
      <h2 style={{ color: "#f8fafc", fontWeight: 800, fontSize: 24, marginBottom: 6 }}>Logged: {selected.label}</h2>
      <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 20 }}>Your check-in has been added to your timeline.</p>
      
      {loading ? (
        <div style={{ color: "#38bdf8", fontStyle: "italic", padding: "16px 0", fontSize: 13 }}>
          Writing an encouraging note for you... 🌿
        </div>
      ) : friendNote && (
        <div style={{
          background: "#1e293b",
          border: "1px solid #334155", borderRadius: 16, padding: "18px 20px", textAlign: "left",
          marginBottom: 24
        }}>
          <div style={{ fontSize: 11, color: "#38bdf8", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
            💬 Note from Study Buddy
          </div>
          <p style={{ color: "#e2e8f0", lineHeight: 1.6, margin: 0, fontSize: 14 }}>{friendNote}</p>
        </div>
      )}
      
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button
          onClick={() => { setSaved(false); setSelected(null); setSelectedTag(""); setNote(""); setFriendNote(""); }}
          style={{
            padding: "10px 18px", borderRadius: 12, background: "#1e293b",
            border: "1px solid #334155", color: "#f8fafc", fontSize: 13, fontWeight: 600, cursor: "pointer"
          }}>
          Log Another
        </button>
        <button
          onClick={() => onNav("home")}
          style={{
            padding: "10px 22px", borderRadius: 12, background: "#3b82f6",
            border: "none", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer"
          }}>
          Done (Home)
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "24px 18px 90px", maxWidth: 480, margin: "0 auto" }}>
      <h2 style={{ color: "#f8fafc", fontWeight: 800, fontSize: 24, marginBottom: 4 }}>Daily Check-in 🌿</h2>
      <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 20 }}>Takes 10 seconds. How is college / school feeling right now?</p>

      {/* Mood Picker */}
      <div style={{ display: "flex", gap: 8, justifyContent: "space-between", marginBottom: 22 }}>
        {MOODS.map(m => (
          <button key={m.val} onClick={() => setSelected(m)}
            style={{
              flex: 1, padding: "12px 4px", borderRadius: 14,
              border: selected?.val === m.val ? `2px solid ${m.color}` : "1px solid #334155",
              background: selected?.val === m.val ? m.color + "25" : "#1e293b",
              cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4
            }}>
            <span style={{ fontSize: 26 }}>{m.emoji}</span>
            <span style={{ fontSize: 11, color: "#cbd5e1", fontWeight: 600 }}>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Student Context Tags */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginBottom: 8 }}>
          What's driving this today? (Optional tag)
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {STUDENT_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
              style={{
                padding: "6px 10px", borderRadius: 20, fontSize: 11, cursor: "pointer",
                background: selectedTag === tag ? "#38bdf825" : "#1e293b",
                border: selectedTag === tag ? "1px solid #38bdf8" : "1px solid #334155",
                color: selectedTag === tag ? "#38bdf8" : "#94a3b8",
                fontWeight: selectedTag === tag ? 600 : 400
              }}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Optional Note */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginBottom: 6 }}>
          Quick note or vent (Optional)
        </div>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="E.g., Finished math quiz, stayed up till 2 AM, feeling exhausted..."
          rows={3}
          style={{
            width: "100%", padding: "12px 14px", borderRadius: 12,
            background: "#1e293b", border: "1px solid #334155", color: "#f8fafc",
            fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "inherit"
          }}
        />
      </div>

      <button
        onClick={save}
        disabled={!selected}
        style={{
          width: "100%", padding: "14px", borderRadius: 12, border: "none",
          background: selected ? "#3b82f6" : "#334155",
          color: "#fff", fontWeight: 700, fontSize: 14,
          cursor: selected ? "pointer" : "not-allowed"
        }}>
        Save Check-in 🌿
      </button>
    </div>
  );
}

export default MoodScreen;
