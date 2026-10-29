import { getStudentQA } from './ai_qa.js';
import { sanitizeInput, checkRateLimit } from './security.js';

/**
 * Student Companion & Support Query Dispatcher
 * Secure, rate-limited, and sanitized dispatch for peer assistance.
 */
async function askAI(systemPrompt, userMessage, history = [], customKey = "", customProvider = "gemini") {
  // Rate limit check: max 20 prompts per minute
  const rateCheck = checkRateLimit('companion_chat', 20, 60000);
  if (!rateCheck.allowed) {
    return `Rate limit reached. Please pause and resume in ${rateCheck.retryAfterSec} seconds.`;
  }

  const cleanUserMessage = sanitizeInput(userMessage, 1000);
  const cleanSystemPrompt = sanitizeInput(systemPrompt, 1000);
  const trimmedKey = customKey ? customKey.trim() : "";

  // 1. Google Gemini API integration (optional key provided in client)
  if (trimmedKey && customProvider === "gemini") {
    try {
      const contents = [
        ...history.map(h => ({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: sanitizeInput(h.content, 1000) }]
        })),
        { role: "user", parts: [{ text: cleanUserMessage }] }
      ];

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(trimmedKey)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: cleanSystemPrompt }] },
          contents,
          generationConfig: { maxOutputTokens: 1000, temperature: 0.7 }
        })
      });
      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) return sanitizeInput(reply, 2000);
    } catch {
      // Graceful fallback to deterministic local logic
    }
  }

  // 2. Groq / OpenAI compatible API integration (optional key provided in client)
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
            { role: "system", content: cleanSystemPrompt },
            ...history.map(h => ({ role: h.role, content: sanitizeInput(h.content, 1000) })),
            { role: "user", content: cleanUserMessage }
          ],
          max_tokens: 1000
        })
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;
      if (reply) return sanitizeInput(reply, 2000);
    } catch {
      // Graceful fallback to deterministic local logic
    }
  }

  // 3. Local Student Companion Engine (Deterministic, instant, and privacy-preserving)
  await new Promise(r => setTimeout(r, 200));
  const lower = cleanUserMessage.toLowerCase();

  // Mode A: Daily Mood Check-in Note
  if (cleanSystemPrompt.includes("compassionate") || cleanSystemPrompt.includes("wellness coach") || cleanSystemPrompt.includes("peer")) {
    if (lower.includes("rough") || lower.includes("struggling") || lower.includes("1/5") || lower.includes("crying") || lower.includes("fail") || lower.includes("anxious") || lower.includes("panic")) {
      return "Experiencing a difficult day is part of demanding academic programs. Course examinations do not measure your intelligence or character. Prioritize hydration, step away from screens, and rest tonight.";
    }
    if (lower.includes("low") || lower.includes("2/5") || lower.includes("tired") || lower.includes("sleep") || lower.includes("exhaust")) {
      return "Recognizing depleted energy early prevents deep burnout. Give yourself permission to disconnect from coursework this evening and establish a regular sleep window.";
    }
    if (lower.includes("great") || lower.includes("good") || lower.includes("5/5") || lower.includes("4/5") || lower.includes("thriving")) {
      return "Good work completing today's objectives. Acknowledge your steady progress across lectures and coursework, and maintain healthy study pacing.";
    }
    if (lower.includes("okay") || lower.includes("3/5")) {
      return "A steady, average day provides consistent progress. Predictable routines sustain semester endurance more effectively than frantic cramming.";
    }
    return "Thank you for completing your daily check-in. Tracking energy levels proactively preserves focus and reduces cumulative semester strain.";
  }

  // Mode B: Weekly Rhythm Summary
  if (cleanSystemPrompt.includes("analyst") || cleanSystemPrompt.includes("report") || cleanSystemPrompt.includes("summary")) {
    if (lower.includes("low mood count: 0")) {
      return "Your logs show stable energy and balanced focus across recent days. Continue safeguarding your sleep schedule to stay resilient through upcoming deliverables.";
    }
    return "Your check-ins indicate occasional fatigue corresponding with deadline peaks. This is typical during the term, but indicates a need for structured ten-minute breaks between study blocks.";
  }

  // Mode C: Journal Reflection Note
  if (cleanSystemPrompt.includes("journal") || cleanSystemPrompt.includes("therapist")) {
    if (lower.includes("fail") || lower.includes("exam") || lower.includes("marks") || lower.includes("grade") || lower.includes("test")) {
      return "Recording exam stress helps externalize anxiety. Single exam scores rarely reflect sustained ability or future potential. Reset your evening with low-stimulation rest.";
    }
    if (lower.includes("lonely") || lower.includes("alone") || lower.includes("friend") || lower.includes("nobody")) {
      return "Navigating large academic institutions can feel isolating at times. Many classmates experience identical feelings; consider participating in structured departmental study groups or campus clubs.";
    }
    return "Articulating academic pressure in writing helps regulate cognitive overwhelm. Acknowledge the effort you have invested today and allow yourself time to recharge.";
  }

  // Mode D: Direct Study Companion Guidance
  return getStudentQA(lower, cleanUserMessage);
}

export { askAI };
