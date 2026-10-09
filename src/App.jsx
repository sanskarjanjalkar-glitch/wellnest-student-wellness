import { useState, useEffect } from 'react';
import { AFFIRMATIONS, loadStoredJson } from './ai.js';
import { Sparkle, WaveBg, SOSModal } from './screens/Common.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import MoodScreen from './screens/MoodScreen.jsx';
import ChatScreen from './screens/ChatScreen.jsx';
import BreatheScreen from './screens/BreatheScreen.jsx';
import JournalScreen from './screens/JournalScreen.jsx';
import InsightsScreen from './screens/InsightsScreen.jsx';

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [moodLog, setMoodLog] = useState(() => {
    return loadStoredJson("wellnest_moods", [
      { label: "Good", emoji: "😊", color: "#86efac", val: 4, note: "Finished study block on time", time: new Date(Date.now() - 86400000 * 2).toISOString() },
      { label: "Low", emoji: "😔", color: "#fca5a5", val: 2, note: "Stayed up late studying, feeling tired", time: new Date(Date.now() - 86400000).toISOString() },
    ]);
  });
  const [initMood, setInitMood] = useState(null);
  const [sparkles, setSparkles] = useState([]);
  const [affirmIdx] = useState(() => Math.floor(Math.random() * AFFIRMATIONS.length));
  const [showSOS, setShowSOS] = useState(false);
  const [aiConfig, setAiConfig] = useState(() => {
    return loadStoredJson("wellnest_ai_config", { provider: "gemini", key: "" });
  });

  useEffect(() => {
    localStorage.setItem("wellnest_ai_config", JSON.stringify(aiConfig));
  }, [aiConfig]);

  function nav(s, mood = null) {
    setInitMood(mood);
    setScreen(s);
  }

  function handleSeedDemoData() {
    const demo = [
      { label: "Good", emoji: "😊", color: "#86efac", val: 4, note: "Finished quiz smoothly", time: new Date(Date.now() - 86400000 * 4).toISOString() },
      { label: "Okay", emoji: "😐", color: "#fde68a", val: 3, note: "Long lecture day", time: new Date(Date.now() - 86400000 * 3).toISOString() },
      { label: "Low", emoji: "😔", color: "#fca5a5", val: 2, note: "Heavy assignment load", time: new Date(Date.now() - 86400000 * 2).toISOString() },
      { label: "Struggling", emoji: "😢", color: "#f87171", val: 1, note: "Exam panic and lack of sleep", time: new Date(Date.now() - 86400000).toISOString() },
      { label: "Okay", emoji: "😐", color: "#fde68a", val: 3, note: "Took a walk and feel slightly calmer", time: new Date().toISOString() },
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

  function handleClick(e) {
    if (Math.random() > 0.85) {
      const s = { id: Date.now(), x: e.clientX - 10, y: e.clientY - 10 };
      setSparkles(prev => [...prev, s]);
      setTimeout(() => setSparkles(prev => prev.filter(sp => sp.id !== s.id)), 1000);
    }
  }

  const NAV = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "mood", icon: "💭", label: "Mood" },
    { id: "chat", icon: "🤖", label: "Companion" },
    { id: "breathe", icon: "🫧", label: "Breathe" },
    { id: "journal", icon: "📔", label: "Journal" },
    { id: "insights", icon: "✨", label: "Insights" },
  ];

  return (
    <div onClick={handleClick} style={{
      minHeight: "100vh", background: "#0a0a14",
      fontFamily: "'Plus Jakarta Sans', 'DM Sans', 'Segoe UI', sans-serif", position: "relative", overflowX: "hidden"
    }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #7c3aed44; border-radius: 4px; }
        @keyframes sparkle { 0%{opacity:1;transform:scale(1) translateY(0)} 100%{opacity:0;transform:scale(1.5) translateY(-30px)} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes wave { from{transform:scale(1) rotate(0deg)} to{transform:scale(1.04) rotate(2deg)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .screen-enter { animation: fadeIn 0.35s ease-out; }
        input::placeholder, textarea::placeholder { color: #475569; }
      `}</style>

      <WaveBg />
      {sparkles.map(s => <Sparkle key={s.id} x={s.x} y={s.y} />)}
      {showSOS && <SOSModal onClose={() => setShowSOS(false)} />}

      <div className="screen-enter" key={screen} style={{ position: "relative", zIndex: 1 }}>
        {screen === "home" && (
          <HomeScreen
            moodLog={moodLog}
            onNav={nav}
            affirmIdx={affirmIdx}
            onOpenSOS={() => setShowSOS(true)}
            aiConfig={aiConfig}
            setAiConfig={setAiConfig}
          />
        )}
        {screen === "mood" && (
          <MoodScreen
            moodLog={moodLog}
            setMoodLog={setMoodLog}
            initMood={initMood}
            onNav={nav}
            aiConfig={aiConfig}
          />
        )}
        {screen === "chat" && <ChatScreen aiConfig={aiConfig} />}
        {screen === "breathe" && <BreatheScreen />}
        {screen === "journal" && <JournalScreen aiConfig={aiConfig} />}
        {screen === "insights" && (
          <InsightsScreen
            moodLog={moodLog}
            onSeedDemoData={handleSeedDemoData}
            onResetData={handleResetData}
            aiConfig={aiConfig}
          />
        )}
      </div>

      {/* Bottom nav */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: "#0a0a14ee", backdropFilter: "blur(20px)",
        borderTop: "1px solid #ffffff0f", padding: "10px 4px 16px",
        display: "flex", justifyContent: "space-around"
      }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => nav(n.id)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              background: "none", border: "none", cursor: "pointer",
              opacity: screen === n.id ? 1 : 0.45,
              transform: screen === n.id ? "translateY(-2px)" : "none",
              transition: "all 0.2s", padding: "4px 8px"
            }}>
            <span style={{ fontSize: 20 }}>{n.icon}</span>
            <span style={{ fontSize: 10, color: screen === n.id ? "#a78bfa" : "#64748b", fontWeight: 700, letterSpacing: 0.5 }}>
              {n.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
