import { useState, useMemo } from 'react';
import { askAI, MOODS, DAYS } from '../ai.js';

function InsightsScreen({ moodLog, onSeedDemoData, onResetData }) {
  const [weeklyNote, setWeeklyNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTimestamp] = useState(() => Date.now());

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

  async function getSummary() {
    setLoading(true);
    const summary = moodLog.slice(-7).map(m => `${m.label}${m.note ? ` (${m.note})` : ""}`).join(", ");
    const res = await askAI(
      "You are a friendly student peer looking at a classmate's weekly check-in logs. Write a 2-3 sentence casual, supportive summary of their week. Suggest one simple thing to help them stay relaxed.",
      `Recent logs: ${summary || "None"}. Average: ${avgMood}/5. Low mood days: ${lowCount}`
    );
    setWeeklyNote(res);
    setLoading(false);
  }

  return (
    <div style={{ padding: "24px 18px 90px", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <h2 style={{ color: "#f8fafc", fontWeight: 800, fontSize: 24, margin: 0 }}>Weekly Rhythm 📈</h2>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={onSeedDemoData}
            style={{
              padding: "4px 8px", borderRadius: 8, background: "#1e293b",
              border: "1px solid #334155", color: "#38bdf8", fontSize: 11, cursor: "pointer"
            }}>
            Load Sample Week
          </button>
          {moodLog.length > 0 && (
            <button
              onClick={onResetData}
              style={{
                padding: "4px 8px", borderRadius: 8, background: "#1e293b",
                border: "1px solid #334155", color: "#94a3b8", fontSize: 11, cursor: "pointer"
              }}>
              Reset
            </button>
          )}
        </div>
      </div>
      <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 20 }}>
        Notice your energy patterns before academic burnout creeps in.
      </p>

      {/* 7-Day Visual Rhythm Bar */}
      <div style={{
        background: "#1e293b", border: "1px solid #334155", borderRadius: 16,
        padding: "18px 16px", marginBottom: 20
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#cbd5e1", marginBottom: 14 }}>
          Past 7 Days
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: 110, gap: 6 }}>
          {week.map((d, i) => {
            const h = d.avg ? (d.avg / 5) * 80 : 8;
            const moodObj = d.avg ? MOODS.find(m => m.val === Math.round(d.avg)) : null;
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13 }}>{moodObj?.emoji || ""}</span>
                <div style={{
                  width: "100%", maxWidth: 28, height: h,
                  background: moodObj ? moodObj.color : "#334155",
                  borderRadius: 6, transition: "height 0.3s"
                }} />
                <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
        <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#f8fafc" }}>{avgMood}</div>
          <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>Avg Score</div>
        </div>
        <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#f8fafc" }}>{totalEntries}</div>
          <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>Check-ins</div>
        </div>
        <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: lowCount > 0 ? "#f87171" : "#34d399" }}>{lowCount}</div>
          <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>Heavy Days</div>
        </div>
      </div>

      {/* Weekly Buddy Summary */}
      <div style={{
        background: "#1e293b", border: "1px solid #334155", borderRadius: 16,
        padding: "16px 18px", marginBottom: 20
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#38bdf8", textTransform: "uppercase" }}>
            Weekly Wrap-Up
          </div>
          <button
            onClick={getSummary}
            disabled={moodLog.length === 0 || loading}
            style={{
              padding: "4px 10px", borderRadius: 8, background: "#3b82f6",
              border: "none", color: "#fff", fontSize: 11, fontWeight: 600,
              cursor: moodLog.length === 0 || loading ? "not-allowed" : "pointer"
            }}>
            {loading ? "Thinking..." : "Get Summary"}
          </button>
        </div>

        {weeklyNote ? (
          <p style={{ color: "#e2e8f0", fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>
            {weeklyNote}
          </p>
        ) : (
          <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5, margin: 0 }}>
            {moodLog.length > 0
              ? "Tap 'Get Summary' to have your Study Buddy summarize how your week went and give you a tip."
              : "Log a few check-ins or tap 'Load Sample Week' above to see your weekly summary!"}
          </p>
        )}
      </div>

      {/* Early Detection Explanation */}
      <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 12, padding: "14px 16px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#cbd5e1", marginBottom: 4 }}>
          💡 Why early tracking matters
        </div>
        <p style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>
          When 2 or more low days happen in a row, WellNest's Early Radar triggers a gentle reminder on your Home tab before it turns into full academic burnout.
        </p>
      </div>
    </div>
  );
}

export default InsightsScreen;
