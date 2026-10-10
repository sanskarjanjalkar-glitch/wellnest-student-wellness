import { getStudentQA } from './ai_qa.js';

// ─── Student Companion & Support Engine ──────────────────────────────────────
async function askAI(systemPrompt, userMessage, history = [], customKey = "", customProvider = "gemini") {
  const trimmedKey = customKey ? customKey.trim() : "";

  // 1. Live Google Gemini API (if user optionally provided a key)
  if (trimmedKey && customProvider === "gemini") {
    try {
      const contents = [
        ...history.map(h => ({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: h.content }]
        })),
        { role: "user", parts: [{ text: userMessage }] }
      ];

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${trimmedKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: { maxOutputTokens: 1000, temperature: 0.7 }
        })
      });
      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) return reply;
    } catch {
      // Graceful fallback
    }
  }

  // 2. Live Groq / OpenAI compatible API (if user optionally provided a key)
  if (trimmedKey && (customProvider === "groq" || customProvider === "openai")) {
    try {
      const endpoint = customProvider === "groq" 
        ? "https://api.groq.com/openai/v1/chat/completions" 
        : "https://api.openai.com/v1/chat/completions";
      const model = customProvider === "groq" ? "llama-3.1-8b-instant" : "gpt-4o-mini";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${trimmedKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            ...history,
            { role: "user", content: userMessage }
          ],
          max_tokens: 1000
        })
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;
      if (reply) return reply;
    } catch {
      // Graceful fallback
    }
  }

  // 3. Built-in Student Companion Brain (Zero setup, natural peer-to-peer tone)
  await new Promise(r => setTimeout(r, 350));
  const raw = userMessage.trim();
  const lower = raw.toLowerCase();

  // Mode A: Daily Mood Check-in Note
  if (systemPrompt.includes("compassionate") || systemPrompt.includes("wellness coach") || systemPrompt.includes("peer")) {
    if (lower.includes("rough") || lower.includes("struggling") || lower.includes("1/5") || lower.includes("crying") || lower.includes("fail") || lower.includes("anxious") || lower.includes("panic")) {
      return "I'm so sorry today was rough. Academic stress and expectations can feel crushing, but remember: you are not your grades. Take tonight one hour and one breath at a time. Drink some water and get some rest. 🌿";
    }
    if (lower.includes("low") || lower.includes("2/5") || lower.includes("tired") || lower.includes("sleep") || lower.includes("exhaust")) {
      return "Catching that you're running low on energy is huge. Give yourself permission to take a real pause tonight. Step away from your study desk, stretch, and let your brain reboot.";
    }
    if (lower.includes("great") || lower.includes("good") || lower.includes("5/5") || lower.includes("4/5") || lower.includes("thriving")) {
      return "Love seeing this! Celebrate the wins—finishing assignments or having a good lecture day feels amazing. Keep riding this positive momentum! ✨";
    }
    if (lower.includes("okay") || lower.includes("3/5")) {
      return "An okay day is still a solid day. Steady routines get us through the semester better than sudden bursts. Be gentle with your workload today.";
    }
    return "Thanks for taking 10 seconds to check in with yourself. Noticing your energy before you hit burnout makes a world of difference. You're doing better than you give yourself credit for.";
  }

  // Mode B: Weekly Rhythm Summary (Human student summary, not robot analyst)
  if (systemPrompt.includes("analyst") || systemPrompt.includes("report") || systemPrompt.includes("summary")) {
    if (lower.includes("low mood count: 0")) {
      return "Your past week shows steady energy and good balance! You've stayed consistent with your check-ins. Keep protecting your sleep schedule so you don't hit sudden fatigue when midterm season arrives.";
    }
    return "Looking at your week, you had a few dips—usually when deadlines or exams stack up. That's totally normal, but it's a clear signal to slow down before you burn out. Try taking small 10-minute walk breaks between study sessions this week!";
  }

  // Mode C: Journal Reflection Note (Warm friend reply, not clinical breakdown)
  if (systemPrompt.includes("journal") || systemPrompt.includes("therapist")) {
    if (lower.includes("fail") || lower.includes("exam") || lower.includes("marks") || lower.includes("grade") || lower.includes("test")) {
      return "Thanks for writing this down. Test anxiety can make everything feel like a make-or-break crisis, but one exam never defines your worth or your future. You're putting in honest work, and that matters more than any single score. Take a breather tonight. ☕";
    }
    if (lower.includes("lonely") || lower.includes("alone") || lower.includes("friend") || lower.includes("nobody")) {
      return "Campus can feel really isolating sometimes, even when surrounded by hundreds of classmates. It's okay to feel this way, but remember that many others are feeling the exact same thing. Don't be afraid to say a simple 'hi' or share notes with someone in your next class.";
    }
    return "It takes real honesty to put feelings into words. Getting all that mental noise out of your head and onto the screen takes the edge off. You're handling a lot this semester, so be patient with yourself tonight.";
  }

  // Mode D: Direct Study Buddy Chat
  return getStudentQA(lower, raw);
}

export { askAI };
