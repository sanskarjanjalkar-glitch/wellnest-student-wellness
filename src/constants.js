// ─── Student Wellness Constants ──────────────────────────────────────────────

const MOODS = [
  { label: "Great", emoji: "🌟", color: "#34d399", val: 5 },
  { label: "Good", emoji: "😊", color: "#60a5fa", val: 4 },
  { label: "Okay", emoji: "😐", color: "#fbbf24", val: 3 },
  { label: "Low", emoji: "😔", color: "#f87171", val: 2 },
  { label: "Rough", emoji: "😢", color: "#ef4444", val: 1 },
];

const STUDENT_TAGS = [
  "📚 Exams / Quizzes",
  "💻 Heavy Assignments",
  "💤 Sleep Deprived",
  "👥 Friends / Roommates",
  "⏳ Procrastinating",
  "☕ Good Study Session",
  "🌧️ Just Drained",
  "🌿 Feeling Accomplished",
];

const BREATHS = [
  { name: "Box Breathing", inhale: 4, hold1: 4, exhale: 4, hold2: 4, desc: "Quick reset before an exam, presentation, or quiz" },
  { name: "4-7-8 Calm", inhale: 4, hold1: 7, exhale: 8, hold2: 0, desc: "Unwind before sleep when your brain won't stop racing" },
  { name: "Quick Focus", inhale: 2, hold1: 0, exhale: 2, hold2: 0, desc: "2-minute energy boost when you're dozing off while studying" },
];

const STUDENT_REMINDERS = [
  "You are more than your grades, GPA, or this week's exam results.",
  "Taking a 20-minute break to rest won't ruin your future. Go stretch.",
  "One rough assignment doesn't mean you don't belong here.",
  "Unclench your jaw. Drop your shoulders. Drink some water.",
  "Doing your best today might look different than yesterday, and that's okay.",
  "Progress over perfection — just submitting it is a win.",
  "Nobody on campus has everything figured out, even if they pretend to.",
  "Your health and peace of mind matter far more than any deadline.",
];

const JOURNAL_PROMPTS = [
  "What is the most stressful thing on your plate this week, and how can you break it into small bites?",
  "What's one thing you survived this semester that you didn't think you could?",
  "If your best friend had the exact same workload right now, what advice would you give them?",
  "What's something nice you can do for yourself tonight after studying?",
  "Vent here freely: write down everything annoying you right now and leave it on this screen.",
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

export { MOODS, STUDENT_TAGS, BREATHS, STUDENT_REMINDERS, JOURNAL_PROMPTS, DAYS, loadStoredJson };
