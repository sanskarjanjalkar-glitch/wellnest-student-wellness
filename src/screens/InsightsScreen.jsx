import { useState, useMemo } from 'react';
import { askAI, MOODS, DAYS } from '../ai.js';

// 6. INSIGHTS
function InsightsScreen({ moodLog, onSeedDemoData, onResetData, aiConfig }) {
  const [aiReport, setAiReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTimestamp] = useState(() => Date.now());

  // Safe pure week stats calculation using stable state timestamp
  const week = useMemo(() => {
    const baseDate = new Date(currentTimestamp);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() - 6 + i);
      const key = d.toDateString();
      const dayLogs = moodLog.filter(m => new Date(m.time).toDateString() === key);
      const avg = dayLogs.length ? dayLogs.reduce((s, m) => s + m.val, 0) / dayLogs.length : null;
      return { day: DAYS[d.getDay()], avg };
    });
  }, [moodLog, currentTimestamp]);

  const totalEntries = moodLog.length;
  const avgMood = moodLog.length ? (moodLog.reduce((s, m) => s + m.val, 0) / moodLog.length).toFixed(1) : "—";
  const lowCount = moodLog.filter(m => m.val <= 2).length;
  const topMood = moodLog.length ? MOODS.find(m => m.val === Math.round(moodLog.reduce((s, m) => s + m.val, 0) / moodLog.length)) : null;

  async function getReport() {
    setLoading(true);
    const summary = moodLog.slice(-10).map(m => `${m.label}${m.note ? ` ("${m.note}")` : ""}`).join(", ");
    const res = await askAI(
      "You are a wellness data analyst. Based on mood log data, generate a short, personalized wellbeing report (3-4 sentences). Include: pattern noticed, strength to celebrate, one gentle suggestion. Be warm and specific.",
      `Recent mood log: ${summary || "No data yet"}. Average mood: ${avgMood}/5. Total check-ins: ${totalEntries}. Low mood count: ${lowCount}`,
      [],
      aiConfig?.key,
      aiConfig?.provider
    );
    setAiReport(res);
    setLoading(false);
  }

  return (
    <div style={{ padding: "28px 20px 100px", maxWidth: 500, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <h2 style={{ color: "#fff", fontWeight: 800, fontSize: 26, margin: 0 }}>Insights ✨</h2>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={onSeedDemoData}
            style={{
              padding: "4px 10px", borderRadius: 8, background: "#7c3aed22",
              border: "1px solid #7c3aed", color: "#c4b5fd", fontSize: 11, cursor: "pointer"
            }}>
            Load Demo Data
          </button>
          {moodLog.length > 0 && (
            <button
              onClick={onResetData}
              style={{
                padding: "4px 8px", borderRadius: 8, background: "#ffffff0a",
                border: "1px solid #ffffff18", color: "#94a3b8", fontSize: 11, cursor: "pointer"
              }}>
              Reset
            </button>
          )}
        </div>
      </div>
      <p style={{ color: "#64748b", marginBottom: 20 }}>Early detection tracking & trends</p>

      {/* Early Detection Status Indicator */}
      <div style={{
        background: lowCount >= 2 ? "rgba(239, 68, 68, 0.14)" : "rgba(34, 197, 94, 0.12)",
        border: `1px solid ${lowCount >= 2 ? "rgba(239, 68, 68, 0.35)" : "rgba(34, 197, 94, 0.3)"}`,
        borderRadius: 16, padding: "14px 16px", marginBottom: 18,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>{lowCount >= 2 ? "⚠️" : "🛡️"}</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: lowCount >= 2 ? "#fca5a5" : "#86efac" }}>
              {lowCount >= 2 ? "Burnout Risk Warning (Active)" : "Healthy Stress Balance"}
            </div>
            <div style={{ fontSize: 11, color: "#cbd5e1" }}>
              {lowCount >= 2 ? `${lowCount} low score check-ins detected in recent timeline` : "No chronic low stress spikes detected"}
            </div>
          </div>
        </div>
      </div>

      {/* 7-day chart */}
      <div style={{ background: "#ffffff08", border: "1px solid #ffffff10", borderRadius: 20, padding: "20px 18px", marginBottom: 18 }}>
        <div style={{ fontSize: 13, color: "#a78bfa", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>7-Day Mood Trend</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 90 }}>
          {week.map((d, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{
                width: "100%", borderRadius: 8,
                height: d.avg ? `${(d.avg / 5) * 75}px` : 4,
                background: d.avg ? (d.avg <= 2 ? "linear-gradient(to top, #ef4444, #f87171)" : "linear-gradient(to top, #7c3aed, #a78bfa)") : "#ffffff10",
                transition: "height 0.6s ease"
              }} />
              <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{d.day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 18 }}>
        {[
          { label: "Avg Mood", val: avgMood + (avgMood !== "—" ? "/5" : ""), icon: "📊" },
          { label: "Check-ins", val: totalEntries, icon: "📝" },
          { label: "Overall Mood", val: topMood ? topMood.emoji : "—", icon: "" },
        ].map(s => (
          <div key={s.label} style={{ background: "#ffffff08", border: "1px solid #ffffff10", borderRadius: 16, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 22 }}>{s.icon}</div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>{s.val}</div>
            <div style={{ color: "#64748b", fontSize: 10, fontWeight: 600, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* AI Report */}
      <button onClick={getReport} disabled={loading}
        style={{
          width: "100%", padding: "16px", borderRadius: 18,
          background: "linear-gradient(135deg,#f59e0b,#f97316)", border: "none",
          color: "#fff", fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", marginBottom: 16
        }}>
        {loading ? "Generating report…" : "🤖 Generate AI Wellness Analysis"}
      </button>
      {aiReport && (
        <div style={{ background: "#f59e0b14", border: "1px solid #f59e0b33", borderRadius: 18, padding: "18px 20px" }}>
          <div style={{ fontSize: 11, color: "#f59e0b", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Your Early Wellness Report</div>
          <p style={{ color: "#e2e8f0", lineHeight: 1.7, margin: 0, fontSize: 14 }}>{aiReport}</p>
        </div>
      )}
    </div>
  );
}

export default InsightsScreen;
