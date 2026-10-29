/**
 * Student Wellness Constants and Configurations
 * Strictly professional, emoji-free, and compliant with accessibility guidelines.
 */

const MOODS = [
  { label: "Great", tag: "High Energy", color: "#10b981", val: 5 },
  { label: "Good", tag: "Balanced", color: "#3b82f6", val: 4 },
  { label: "Okay", tag: "Steady", color: "#eab308", val: 3 },
  { label: "Low", tag: "Drained", color: "#f97316", val: 2 },
  { label: "Rough", tag: "Overwhelmed", color: "#ef4444", val: 1 },
];

const STUDENT_TAGS = [
  "Exams and Quizzes",
  "Heavy Coursework",
  "Sleep Deprived",
  "Social and Roommates",
  "Procrastinating",
  "Focused Study Session",
  "Mental Fatigue",
  "Productive Day",
];

const BREATHS = [
  {
    name: "Box Breathing",
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    desc: "Autonomic nervous system stabilization before an exam, presentation, or quiz."
  },
  {
    name: "4-7-8 Calm",
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    desc: "Vagal nerve stimulation to unwind before sleep when ruminating."
  },
  {
    name: "Quick Focus",
    inhale: 2,
    hold1: 0,
    exhale: 2,
    hold2: 0,
    desc: "Two-minute alertness reset when feeling fatigued during study sessions."
  },
];

const STUDENT_REMINDERS = [
  "Academic performance does not define your total capability or worth as an individual.",
  "Taking a twenty-minute structured recovery break enhances memory consolidation.",
  "A challenging assignment is an indicator of difficulty, not an indicator of personal capability.",
  "Relax your posture, release jaw tension, and hydrate between study blocks.",
  "Daily output varies based on energy levels; maintaining baseline consistency is sufficient.",
  "Progress over perfection: submitting your coursework cleanly is a concrete victory.",
  "Peer performance is rarely as effortless as it appears from the outside.",
  "Sustained physical health remains the foundation of long-term academic success.",
];

const JOURNAL_PROMPTS = [
  "Identify the primary academic demand causing tension this week, and outline the initial three-step action plan.",
  "Describe an academic or personal hurdle you resolved earlier this academic year.",
  "If a peer presented you with your current workload, what objective workflow counsel would you offer?",
  "Specify one deliberate recuperation activity planned for the conclusion of today's study block.",
  "Document your current unvarnished thoughts and academic frustrations to clear working memory.",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Helper to safely read JSON from localStorage
 */
function loadStoredJson(key, defaultVal) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
}

export {
  MOODS,
  STUDENT_TAGS,
  BREATHS,
  STUDENT_REMINDERS,
  JOURNAL_PROMPTS,
  DAYS,
  loadStoredJson
};
