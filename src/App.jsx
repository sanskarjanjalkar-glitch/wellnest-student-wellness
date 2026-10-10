import { useState } from 'react';
import { STUDENT_REMINDERS, loadStoredJson } from './ai.js';
import { SOSModal } from './screens/Common.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import MoodScreen from './screens/MoodScreen.jsx';
import ChatScreen from './screens/ChatScreen.jsx';
import BreatheScreen from './screens/BreatheScreen.jsx';
import JournalScreen from './screens/JournalScreen.jsx';
import InsightsScreen from './screens/InsightsScreen.jsx';

export default function App() {
  const [screen, setScreen] = useState("home");
  const [moodLog, setMoodLog] = useState(() => {
    return loadStoredJson("wellnest_moods", [
      { label: "Good", emoji: "😊", color: "#60a5fa", val: 4, note: "[📚 Exams / Quizzes] Finished study block on time", time: new Date(Date.now() - 86400000 * 2).toISOString() },
      { label: "Low", emoji: "😔", color: "#f87171", val: 2, note: "[💤 Sleep Deprived] Stayed up late working on lab report", time: new Date(Date.now() - 86400000).toISOString() },
    ]);
  });
  const [initMood, setInitMood] = useState(null);
  const [affirmIdx] = useState(() => Math.floor(Math.random() * STUDENT_REMINDERS.length));
  const [showSOS, setShowSOS] = useState(false);

  function nav(s, mood = null) {
    setInitMood(mood);
    setScreen(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSeedDemoData() {
    const demo = [
      { label: "Good", emoji: "😊", color: "#60a5fa", val: 4, note: "[☕ Good Study Session] Finished lecture notes", time: new Date(Date.now() - 86400000 * 5).toISOString() },
      { label: "Okay", emoji: "😐", color: "#fbbf24", val: 3, note: "[💻 Heavy Assignments] Long coding lab", time: new Date(Date.now() - 86400000 * 4).toISOString() },
      { label: "Low", emoji: "😔", color: "#f87171", val: 2, note: "[📚 Exams / Quizzes] Midterm anxiety creeping up", time: new Date(Date.now() - 86400000 * 3).toISOString() },
      { label: "Rough", emoji: "😢", color: "#ef4444", val: 1, note: "[💤 Sleep Deprived] Barely 3 hours of sleep before quiz", time: new Date(Date.now() - 86400000 * 2).toISOString() },
      { label: "Low", emoji: "😔", color: "#f87171", val: 2, note: "[⏳ Procrastinating] Stressed about unfinished project", time: new Date(Date.now() - 86400000).toISOString() },
      { label: "Okay", emoji: "😐", color: "#fbbf24", val: 3, note: "[🌿 Feeling Accomplished] Took a long walk, feeling a bit better", time: new Date().toISOString() },
    ];
    setMoodLog(demo);
    localStorage.setItem("wellnest_moods", JSON.stringify(demo));
  }

  function handleResetData() {
    if (confirm("Reset all mood check-ins?")) {
      setMoodLog([]);
      localStorage.removeItem("wellnest_moods");
    }
  }

  const NAV = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "mood", icon: "💭", label: "Check-in" },
    { id: "chat", icon: "💬", label: "Buddy" },
    { id: "breathe", icon: "🫧", label: "Breathe" },
    { id: "journal", icon: "📝", label: "Vent" },
    { id: "insights", icon: "📈", label: "Rhythm" },
  ];

  return (
    <div style={{
      minHeight: "100vh", background: "#0f172a", color: "#f8fafc",
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      position: "relative"
    }}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #0f172a; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        input::placeholder, textarea::placeholder { color: #64748b; }
      `}</style>

      {showSOS && <SOSModal onClose={() => setShowSOS(false)} />}

      <div style={{ position: "relative", zIndex: 1 }}>
        {screen === "home" && (
          <HomeScreen
            moodLog={moodLog}
            onNav={nav}
            affirmIdx={affirmIdx}
            onOpenSOS={() => setShowSOS(true)}
          />
        )}
        {screen === "mood" && (
          <MoodScreen
            moodLog={moodLog}
            setMoodLog={setMoodLog}
            initMood={initMood}
            onNav={nav}
          />
        )}
        {screen === "chat" && <ChatScreen />}
        {screen === "breathe" && <BreatheScreen />}
        {screen === "journal" && <JournalScreen />}
        {screen === "insights" && (
          <InsightsScreen
            moodLog={moodLog}
            onSeedDemoData={handleSeedDemoData}
            onResetData={handleResetData}
          />
        )}
      </div>

      {/* Clean Bottom Navigation */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: "#0f172af5", backdropFilter: "blur(16px)",
        borderTop: "1px solid #1e293b", padding: "8px 4px 14px",
        display: "flex", justifyContent: "space-around", maxWidth: 500, margin: "0 auto"
      }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => nav(n.id)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              background: "none", border: "none", cursor: "pointer",
              opacity: screen === n.id ? 1 : 0.5,
              transition: "opacity 0.15s", padding: "4px 8px"
            }}>
            <span style={{ fontSize: 19 }}>{n.icon}</span>
            <span style={{
              fontSize: 10,
              color: screen === n.id ? "#38bdf8" : "#94a3b8",
              fontWeight: screen === n.id ? 700 : 500
            }}>
              {n.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
