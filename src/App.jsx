import { useState } from 'react';
import { STUDENT_REMINDERS } from './ai.js';
import { safeLoadJson, safeSaveJson } from './security.js';
import { SOSModal } from './screens/Common.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import MoodScreen from './screens/MoodScreen.jsx';
import ChatScreen from './screens/ChatScreen.jsx';
import BreatheScreen from './screens/BreatheScreen.jsx';
import JournalScreen from './screens/JournalScreen.jsx';
import InsightsScreen from './screens/InsightsScreen.jsx';
import AdminScreen from './screens/AdminScreen.jsx';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen.jsx';
import TermsScreen from './screens/TermsScreen.jsx';

export default function App() {
  const [screen, setScreen] = useState("home");
  const [moodLog, setMoodLog] = useState(() => {
    return safeLoadJson("wellnest_moods", [
      { label: "Good", color: "#3b82f6", val: 4, note: "[Exams and Quizzes] Finished study block on schedule", time: new Date(Date.now() - 86400000 * 2).toISOString() },
      { label: "Low", color: "#f97316", val: 2, note: "[Sleep Deprived] Stayed late working on laboratory report", time: new Date(Date.now() - 86400000).toISOString() },
    ]);
  });
  const [initMood, setInitMood] = useState(null);
  const [affirmIdx] = useState(() => Math.floor(Math.random() * STUDENT_REMINDERS.length));
  const [showSOS, setShowSOS] = useState(false);

  function nav(s, mood = null) {
    setInitMood(mood);
    setScreen(s);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function handleSeedDemoData() {
    const demo = [
      { label: "Good", color: "#3b82f6", val: 4, note: "[Focused Study Session] Completed lecture notes", time: new Date(Date.now() - 86400000 * 5).toISOString() },
      { label: "Okay", color: "#eab308", val: 3, note: "[Heavy Coursework] Long computer science lab", time: new Date(Date.now() - 86400000 * 4).toISOString() },
      { label: "Low", color: "#f97316", val: 2, note: "[Exams and Quizzes] Midterm tension rising", time: new Date(Date.now() - 86400000 * 3).toISOString() },
      { label: "Rough", color: "#ef4444", val: 1, note: "[Sleep Deprived] Under four hours of rest before quiz", time: new Date(Date.now() - 86400000 * 2).toISOString() },
      { label: "Low", color: "#f97316", val: 2, note: "[Procrastinating] Overwhelmed by project milestones", time: new Date(Date.now() - 86400000).toISOString() },
      { label: "Okay", color: "#eab308", val: 3, note: "[Productive Day] Walked campus, focused on recovery", time: new Date().toISOString() },
    ];
    setMoodLog(demo);
    safeSaveJson("wellnest_moods", demo);
  }

  function handleResetData() {
    if (confirm("Reset all check-in entries?")) {
      setMoodLog([]);
      localStorage.removeItem("wellnest_moods");
    }
  }

  // Navigation definition with clean inline SVG glyphs (Zero emojis)
  const NAV = [
    {
      id: "home",
      label: "Overview",
      svg: (active) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#3b82f6" : "#a1a1aa"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      id: "mood",
      label: "Check-in",
      svg: (active) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#3b82f6" : "#a1a1aa"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      )
    },
    {
      id: "chat",
      label: "Companion",
      svg: (active) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#3b82f6" : "#a1a1aa"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )
    },
    {
      id: "breathe",
      label: "Breathe",
      svg: (active) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#3b82f6" : "#a1a1aa"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      )
    },
    {
      id: "journal",
      label: "Venting",
      svg: (active) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#3b82f6" : "#a1a1aa"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      )
    },
    {
      id: "insights",
      label: "Rhythm",
      svg: (active) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#3b82f6" : "#a1a1aa"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#09090b",
      color: "#fafafa",
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      position: "relative"
    }}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #09090b; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 2px; }
        input::placeholder, textarea::placeholder { color: #52525b; }
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
        {screen === "admin" && <AdminScreen onNav={nav} />}
        {screen === "privacy" && <PrivacyPolicyScreen onNav={nav} />}
        {screen === "terms" && <TermsScreen onNav={nav} />}
      </div>

      {/* Professional Bottom Navigation */}
      <nav aria-label="Main Navigation" style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "#09090bf2",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid #27272a",
        padding: "8px 4px 12px",
        display: "flex",
        justifyContent: "space-around",
        maxWidth: 520,
        margin: "0 auto"
      }}>
        {NAV.map(n => {
          const isActive = screen === n.id;
          return (
            <button
              key={n.id}
              onClick={() => nav(n.id)}
              aria-current={isActive ? "page" : undefined}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 8px"
              }}>
              {n.svg(isActive)}
              <span style={{
                fontSize: 10,
                color: isActive ? "#3b82f6" : "#71717a",
                fontWeight: isActive ? 700 : 500
              }}>
                {n.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
