// ─── Mood data ───────────────────────────────────────────────────────────────
const MOODS = [
  { label: "Thriving", emoji: "🌟", color: "#4ade80", val: 5 },
  { label: "Good", emoji: "😊", color: "#86efac", val: 4 },
  { label: "Okay", emoji: "😐", color: "#fde68a", val: 3 },
  { label: "Low", emoji: "😔", color: "#fca5a5", val: 2 },
  { label: "Struggling", emoji: "😢", color: "#f87171", val: 1 },
];

const BREATHS = [
  { name: "Box Breathing", inhale: 4, hold1: 4, exhale: 4, hold2: 4, desc: "Calm the nervous system & exam nerves" },
  { name: "4-7-8 Calm", inhale: 4, hold1: 7, exhale: 8, hold2: 0, desc: "Deep relaxation & bedtime anxiety relief" },
  { name: "Energize", inhale: 2, hold1: 0, exhale: 2, hold2: 0, desc: "Quick focus & energy boost between study sessions" },
];

const AFFIRMATIONS = [
  "I am enough, exactly as I am today.",
  "My feelings are valid, and this stress is temporary.",
  "Each breath I take brings me peace and clarity.",
  "I choose progress over perfection.",
  "I am worthy of rest, joy, and peace of mind.",
  "Small steps forward still move me ahead.",
  "I release what I cannot control.",
  "My mental health matters deeply, more than any grade.",
];

const JOURNAL_PROMPTS = [
  "What am I grateful for today, even on a hectic campus day?",
  "What emotion or pressure am I avoiding right now, and why?",
  "If a classmate felt as stressed as I do right now, what compassion would I offer them?",
  "When did I last feel truly rested and unburdened? What was happening?",
  "What boundary do I need to set with my schedule or friends for my own wellbeing?",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Helper to safely read localStorage
function loadStoredJson(key, defaultVal) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
}

export { MOODS, BREATHS, AFFIRMATIONS, JOURNAL_PROMPTS, DAYS, loadStoredJson };
