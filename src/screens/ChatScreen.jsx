import { useState, useEffect, useRef } from 'react';
import { askAI, loadStoredJson } from '../ai.js';
import { sanitizeInput } from '../security.js';

function ChatScreen() {
  const [messages, setMessages] = useState(() => {
    return loadStoredJson("wellnest_chats", [
      { role: "assistant", content: "Welcome to your Study Companion. Navigating university and coursework can be demanding. This space is here for practical study techniques, addressing procrastination, exam strategies, or discussing workload concerns. What is on your agenda today?" }
    ]);
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("wellnest_chats", JSON.stringify(messages));
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const SYSTEM = `You are a supportive, experienced college peer and study advisor. Speak pragmatically, clearly, and constructively. Assist students with study protocols, reducing procrastination, managing exam stress, and maintaining balanced routines without clinical jargon or synthetic cheer.`;

  async function send() {
    const clean = sanitizeInput(input, 1000);
    if (!clean || loading) return;
    setInput("");
    const newMsgs = [...messages, { role: "user", content: clean }];
    setMessages(newMsgs);
    setLoading(true);

    const history = newMsgs.map(m => ({ role: m.role, content: m.content }));
    const reply = await askAI(SYSTEM, clean, history.slice(0, -1));
    setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    setLoading(false);
  }

  function quickPrompt(txt) {
    setInput(txt);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 72px)", maxWidth: 520, margin: "0 auto" }}>
      {/* Header */}
      <div style={{
        padding: "16px 18px",
        borderBottom: "1px solid #27272a",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", letterSpacing: 1 }}>
            Academic Advisor
          </div>
          <h2 style={{ color: "#fafafa", fontWeight: 700, fontSize: 18, margin: "2px 0 0" }}>
            Study Companion
          </h2>
        </div>
        <button
          onClick={() => {
            if (confirm("Reset chat history?")) {
              setMessages([{ role: "assistant", content: "Session reset. What academic topic would you like to review?" }]);
              localStorage.removeItem("wellnest_chats");
            }
          }}
          style={{
            background: "#18181b",
            border: "1px solid #27272a",
            color: "#a1a1aa",
            borderRadius: 6,
            padding: "6px 12px",
            fontSize: 11,
            fontWeight: 600,
            cursor: "pointer"
          }}>
          Clear Session
        </button>
      </div>

      {/* Suggested Prompts */}
      <div style={{ display: "flex", gap: 6, padding: "10px 18px 6px", overflowX: "auto" }}>
        {[
          "Exam preparation strategy",
          "Resolving procrastination",
          "Restructuring sleep cycle",
          "Falling behind syllabus",
          "Active recall methods"
        ].map((q, idx) => (
          <button
            key={idx}
            onClick={() => quickPrompt(q)}
            style={{
              whiteSpace: "nowrap",
              padding: "6px 10px",
              borderRadius: 4,
              background: "#18181b",
              border: "1px solid #27272a",
              color: "#d4d4d8",
              fontSize: 11,
              cursor: "pointer"
            }}>
            {q}
          </button>
        ))}
      </div>

      {/* Message List */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "88%",
              padding: "12px 14px",
              borderRadius: 6,
              background: m.role === "user" ? "#2563eb" : "#18181b",
              border: m.role === "assistant" ? "1px solid #27272a" : "none",
              color: "#fafafa",
              fontSize: 13,
              lineHeight: 1.6,
              whiteSpace: "pre-wrap"
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{
            display: "inline-block",
            padding: "8px 12px",
            background: "#18181b",
            borderRadius: 6,
            border: "1px solid #27272a",
            color: "#a1a1aa",
            fontSize: 12
          }}>
            Consulting companion guidelines...
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input Form */}
      <div style={{ padding: "12px 18px 24px", borderTop: "1px solid #27272a" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Discuss exam preparation, schedule balance, or study friction..."
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: 6,
              border: "1px solid #27272a",
              background: "#18181b",
              color: "#fafafa",
              fontSize: 13,
              outline: "none",
              fontFamily: "inherit"
            }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            style={{
              padding: "10px 16px",
              borderRadius: 6,
              border: "none",
              background: input.trim() && !loading ? "#2563eb" : "#27272a",
              cursor: input.trim() && !loading ? "pointer" : "not-allowed",
              color: "#ffffff",
              fontSize: 12,
              fontWeight: 600
            }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
