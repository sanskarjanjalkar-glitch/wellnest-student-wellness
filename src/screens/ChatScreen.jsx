import { useState, useEffect, useRef } from 'react';
import { askAI, loadStoredJson } from '../ai.js';

// 3. AI CHAT
function ChatScreen({ aiConfig }) {
  const [messages, setMessages] = useState(() => {
    return loadStoredJson("wellnest_chats", [
      { role: "assistant", content: "Hi there 💜 I'm your WellNest Companion. Ask me any question—whether it's how to study effectively, overcome procrastination, manage exam stress, or process your emotions. How can I help you today?" }
    ]);
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("wellnest_chats", JSON.stringify(messages));
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const SYSTEM = `You are an intelligent, empathetic academic and mental wellness coach named Nest. Answer students' questions thoroughly, practically, and supportively. Help with study techniques, time management, exam anxiety, stress reduction, and emotional validation. Format answers cleanly with bullet points or numbered steps when appropriate.`;

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMsgs = [...messages, { role: "user", content: userMsg }];
    setMessages(newMsgs);
    setLoading(true);
    const history = newMsgs.map(m => ({ role: m.role, content: m.content }));
    const reply = await askAI(SYSTEM, userMsg, history.slice(0, -1), aiConfig?.key, aiConfig?.provider);
    setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    setLoading(false);
  }

  function quickPrompt(txt) {
    setInput(txt);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 80px)", maxWidth: 500, margin: "0 auto" }}>
      <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid #ffffff10", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ color: "#fff", fontWeight: 800, fontSize: 22, margin: 0 }}>AI Q&A & Companion 🤖</h2>
          <p style={{ color: "#64748b", fontSize: 12, margin: "4px 0 0" }}>Ask any question or get practical advice</p>
        </div>
        <button
          onClick={() => {
            if (confirm("Reset conversation?")) {
              setMessages([{ role: "assistant", content: "Hi there 💜 Ask me anything you need help with right now!" }]);
              localStorage.removeItem("wellnest_chats");
            }
          }}
          style={{ background: "none", border: "none", color: "#64748b", fontSize: 12, cursor: "pointer" }}>
          Clear
        </button>
      </div>

      {/* Suggested practical question prompts */}
      <div style={{ display: "flex", gap: 8, padding: "10px 20px 0", overflowX: "auto" }}>
        {[
          "How to study effectively for exams?",
          "How do I stop procrastinating?",
          "Tips for fixing my sleep schedule",
          "Overwhelmed with deadlines",
          "Dealing with imposter syndrome"
        ].map((q, idx) => (
          <button
            key={idx}
            onClick={() => quickPrompt(q)}
            style={{
              whiteSpace: "nowrap", padding: "6px 12px", borderRadius: 20,
              background: "#ffffff0a", border: "1px solid #ffffff14", color: "#cbd5e1",
              fontSize: 11, cursor: "pointer"
            }}>
            {q}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "86%", padding: "13px 17px", borderRadius: m.role === "user" ? "20px 20px 6px 20px" : "20px 20px 20px 6px",
              background: m.role === "user" ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "#ffffff0f",
              border: m.role === "assistant" ? "1px solid #ffffff14" : "none",
              color: "#e2e8f0", fontSize: 14.5, lineHeight: 1.65, fontWeight: 400,
              whiteSpace: "pre-wrap"
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 6, padding: "14px 18px", background: "#ffffff0f", borderRadius: "20px 20px 20px 6px", width: "fit-content", border: "1px solid #ffffff14" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#7c3aed", animation: `bounce 1s ${i * 0.2}s infinite` }} />
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div style={{ padding: "12px 20px 24px", borderTop: "1px solid #ffffff10" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Ask a question or share what's on your mind…"
            style={{
              flex: 1, padding: "13px 18px", borderRadius: 50, border: "1px solid #ffffff18",
              background: "#ffffff0a", color: "#fff", fontSize: 14, outline: "none", fontFamily: "inherit"
            }} />
          <button onClick={send} disabled={!input.trim() || loading}
            style={{
              width: 48, height: 48, borderRadius: "50%", border: "none",
              background: input.trim() && !loading ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "#ffffff12",
              cursor: input.trim() && !loading ? "pointer" : "not-allowed", fontSize: 18,
              display: "flex", alignItems: "center", justifyContent: "center", color: "#fff"
            }}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
