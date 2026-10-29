import { useState } from 'react';
import { askAI, MOODS, STUDENT_TAGS } from '../ai.js';
import { sanitizeInput } from '../security.js';

function MoodScreen({ moodLog, setMoodLog, initMood, onNav }) {
  const [selected, setSelected] = useState(initMood || null);
  const [selectedTag, setSelectedTag] = useState("");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [friendNote, setFriendNote] = useState("");
  const [loading, setLoading] = useState(false);

  async function save() {
    if (!selected) return;
    const cleanNote = sanitizeInput(note, 500);
    const cleanTag = sanitizeInput(selectedTag, 50);
    const combinedNote = cleanTag ? `[${cleanTag}] ${cleanNote}`.trim() : cleanNote;
    const entry = {
      label: selected.label,
      val: selected.val,
      color: selected.color,
      note: combinedNote,
      time: new Date().toISOString()
    };
    const newLogs = [...moodLog, entry];
    setMoodLog(newLogs);
    localStorage.setItem("wellnest_moods", JSON.stringify(newLogs));
    setSaved(true);
    setLoading(true);

    const reply = await askAI(
      "You are a supportive college peer. Give a brief, objective, and encouraging note (two to three sentences) acknowledging their daily check-in. Avoid clinical jargon or bullet points.",
      `Mood: ${selected.label} (${selected.val}/5). Tag: ${cleanTag || "None"}. Note: "${cleanNote || "none"}"`
    );
    setFriendNote(reply);
    setLoading(false);
  }

  if (saved) return (
    <div style={{ padding: "40px 18px 90px", maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
      <div style={{
        display: "inline-block",
        padding: "6px 14px",
        background: "#27272a",
        border: "1px solid #3f3f46",
        borderRadius: 6,
        fontSize: 16,
        fontWeight: 700,
        color: selected?.color || "#3b82f6",
        marginBottom: 12
      }}>
        {selected.val} / 5 Score Recorded
      </div>
      <h2 style={{ color: "#fafafa", fontWeight: 700, fontSize: 22, margin: "0 0 6px" }}>
        Check-in Recorded: {selected.label}
      </h2>
      <p style={{ color: "#a1a1aa", fontSize: 13, marginBottom: 20 }}>
        Your daily evaluation has been securely appended to local device storage.
      </p>

      {loading ? (
        <div style={{ color: "#3b82f6", padding: "16px 0", fontSize: 13 }}>
          Generating companion note...
        </div>
      ) : friendNote && (
        <div style={{
          background: "#18181b",
          border: "1px solid #27272a",
          borderRadius: 8,
          padding: "18px 20px",
          textAlign: "left",
          marginBottom: 24
        }}>
          <div style={{ fontSize: 11, color: "#3b82f6", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
            Companion Response
          </div>
          <p style={{ color: "#d4d4d8", lineHeight: 1.6, margin: 0, fontSize: 13 }}>
            {friendNote}
          </p>
        </div>
      )}

      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button
          onClick={() => { setSaved(false); setSelected(null); setSelectedTag(""); setNote(""); setFriendNote(""); }}
          style={{
            padding: "10px 16px",
            borderRadius: 6,
            background: "#18181b",
            border: "1px solid #27272a",
            color: "#fafafa",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer"
          }}>
          Log Another Entry
        </button>
        <button
          onClick={() => onNav("home")}
          style={{
            padding: "10px 20px",
            borderRadius: 6,
            background: "#2563eb",
            border: "none",
            color: "#ffffff",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer"
          }}>
          Return to Overview
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "28px 18px 90px", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
        Daily Logging
      </div>
      <h2 style={{ color: "#fafafa", fontWeight: 700, fontSize: 22, margin: "0 0 6px" }}>
        Academic Energy Check-in
      </h2>
      <p style={{ color: "#a1a1aa", fontSize: 13, marginBottom: 20 }}>
        Rate your current cognitive and emotional bandwidth. Stored strictly in local client memory.
      </p>

      {/* Mood Picker */}
      <div style={{ display: "flex", gap: 8, justifyContent: "space-between", marginBottom: 22 }}>
        {MOODS.map(m => (
          <button
            key={m.val}
            onClick={() => setSelected(m)}
            style={{
              flex: 1,
              padding: "12px 6px",
              borderRadius: 6,
              border: selected?.val === m.val ? `1px solid ${m.color}` : "1px solid #27272a",
              background: selected?.val === m.val ? "#27272a" : "#18181b",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4
            }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: m.color }}>{m.val}/5</span>
            <span style={{ fontSize: 11, color: "#d4d4d8", fontWeight: 600 }}>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Context Tags */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 12, color: "#a1a1aa", fontWeight: 600, marginBottom: 8 }}>
          Primary Academic Factor (Optional)
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {STUDENT_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
              style={{
                padding: "6px 12px",
                borderRadius: 4,
                fontSize: 11,
                cursor: "pointer",
                background: selectedTag === tag ? "#1e3a8a33" : "#18181b",
                border: selectedTag === tag ? "1px solid #3b82f6" : "1px solid #27272a",
                color: selectedTag === tag ? "#93c5fd" : "#a1a1aa",
                fontWeight: selectedTag === tag ? 600 : 400
              }}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Note */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 12, color: "#a1a1aa", fontWeight: 600, marginBottom: 6 }}>
          Context Notes (Sanitized, Optional)
        </div>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="E.g., Completed differential equations exam, stayed in library until 1 AM..."
          rows={3}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 6,
            background: "#18181b",
            border: "1px solid #27272a",
            color: "#fafafa",
            fontSize: 13,
            outline: "none",
            boxSizing: "border-box",
            fontFamily: "inherit"
          }}
        />
      </div>

      <button
        onClick={save}
        disabled={!selected}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: 6,
          border: "none",
          background: selected ? "#2563eb" : "#27272a",
          color: selected ? "#ffffff" : "#71717a",
          fontWeight: 600,
          fontSize: 13,
          cursor: selected ? "pointer" : "not-allowed"
        }}>
        Save Check-in Record
      </button>
    </div>
  );
}

export default MoodScreen;
