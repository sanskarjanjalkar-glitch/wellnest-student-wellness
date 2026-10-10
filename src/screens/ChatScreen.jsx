import { useState, useEffect, useRef } from 'react';
import { askAI, loadStoredJson } from '../ai.js';

function ChatScreen() {
  const [messages, setMessages] = useState(() => {
    return loadStoredJson("wellnest_chats", [
      { role: "assistant", content: "Hey! 👋 I'm your Study Buddy. College and school can get completely overwhelming with deadlines, exams, and late nights. I'm here to talk things through, share study tips that actually work, or just listen if you need to vent. What's on your mind today?" }
    ]);
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("wellnest_chats", JSON.stringify(messages));
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const SYSTEM = `You are a supportive, wise student peer and study buddy. Speak warmly, authentically, and practically. Help students with study tips, beating procrastination, dealing with exam anxiety, and emotional encouragement without sounding like a robotic clinical therapist.`;

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMsgs = [...messages, { role: "user", content: userMsg }];
    setMessages(newMsgs);
    setLoading(true);
    const history = newMsgs.map(m => ({ role: m.role, content: m.content }));
    const reply = await askAI(SYSTEM, userMsg, history.slice(0, -1));
    setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    setLoading(false);
  }

  function quickPrompt(txt) {
    setInput(txt);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 72px)", maxWidth: 480, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ padding: "16px 18px 12px", borderBottom: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ color: "#f8fafc", fontWeight: 800, fontSize: 20, margin: 0 }}>Study Buddy 💬</h2>
          <p style={{ color: "#94a3b8", fontSize: 12, margin: "2px 0 0" }}>Exam advice, study tricks, or just venting</p>
        </div>
        <button
          onClick={() => {
            if (confirm("Clear chat history?")) {
              setMessages([{ role: "assistant", content: "Hey! What's on your mind right now? 🌿" }]);
              localStorage.removeItem("wellnest_chats");
            }
          }}
          style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", borderRadius: 8, padding: "5px 10px", fontSize: 11, cursor: "pointer" }}>
          Clear
        </button>
      </div>

      {/* Suggested Student Prompts */}
      <div style={{ display: "flex", gap: 6, padding: "10px 18px 4px", overflowX: "auto" }}>
        {[
          "Stressed about exams",
          "Can't stop procrastinating",
          "Messy sleep schedule",
          "Feeling behind in class",
          "Quick study technique"
        ].map((q, idx) => (
          <button
            key={idx}
            onClick={() => quickPrompt(q)}
            style={{
              whiteSpace: "nowrap", padding: "6px 11px", borderRadius: 16,
              background: "#1e293b", border: "1px solid #334155", color: "#cbd5e1",
              fontSize: 11, cursor: "pointer"
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
              maxWidth: "88%", padding: "12px 15px",
              borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: m.role === "user" ? "#2563eb" : "#1e293b",
              border: m.role === "assistant" ? "1px solid #334155" : "none",
              color: "#f8fafc", fontSize: 14, lineHeight: 1.6,
              whiteSpace: "pre-wrap"
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 5, padding: "12px 14px", background: "#1e293b", borderRadius: "16px 16px 16px 4px", width: "fit-content", border: "1px solid #334155" }}>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>Typing...</span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "10px 18px 20px", borderTop: "1px solid #334155" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Ask about studying, exams, or share how you feel..."
            style={{
              flex: 1, padding: "12px 16px", borderRadius: 24, border: "1px solid #334155",
              background: "#1e293b", color: "#f8fafc", fontSize: 13, outline: "none", fontFamily: "inherit"
            }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            style={{
              width: 44, height: 44, borderRadius: "50%", border: "none",
              background: input.trim() && !loading ? "#3b82f6" : "#334155",
              cursor: input.trim() && !loading ? "pointer" : "not-allowed",
              color: "#fff", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center"
            }}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
