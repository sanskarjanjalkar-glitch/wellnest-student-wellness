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
  const avgMood = moodLog.length ? (moodLog.reduce((s, m) => s + m.val, 0) / moodLog.length).toFixed(1) : "N/A";
  const lowCount = moodLog.filter(m => m.val <= 2).length;

  async function getSummary() {
    setLoading(true);
    const summary = moodLog.slice(-7).map(m => `${m.label}${m.note ? ` (${m.note})` : ""}`).join(", ");
    const res = await askAI(
      "You are a friendly student peer looking at a classmate's weekly check-in logs. Write a two to three sentence casual, supportive summary of their week. Suggest one simple thing to help them stay relaxed. Do not use em dashes or bullet points.",
      `Recent logs: ${summary || "None"}. Average: ${avgMood}/5. Low mood days: ${lowCount}`
    );
    setWeeklyNote(res);
    setLoading(false);
  }

  return (
    <div style={{ padding: "28px 18px 90px", maxWidth: 520, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", letterSpacing: 1 }}>
            Pattern Analysis
          </div>
          <h2 style={{ color: "#fafafa", fontWeight: 700, fontSize: 22, margin: "2px 0 0" }}>
            Weekly Energy Rhythm
          </h2>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={onSeedDemoData}
            style={{
              padding: "6px 10px",
              borderRadius: 4,
              background: "#18181b",
              border: "1px solid #27272a",
              color: "#3b82f6",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer"
            }}>
            Sample Week
          </button>
          {moodLog.length > 0 && (
            <button
              onClick={onResetData}
              style={{
                padding: "6px 10px",
                borderRadius: 4,
                background: "#18181b",
                border: "1px solid #27272a",
                color: "#a1a1aa",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer"
              }}>
              Reset
            </button>
          )}
        </div>
      </div>
      <p style={{ color: "#a1a1aa", fontSize: 13, marginBottom: 20 }}>
        Identify energy deficits before chronic academic fatigue compounds.
      </p>

      {/* 7-Day Visual Rhythm Bar */}
      <div style={{
        background: "#18181b",
        border: "1px solid #27272a",
        borderRadius: 8,
        padding: "18px 16px",
        marginBottom: 20
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#d4d4d8", marginBottom: 14 }}>
          Seven-Day Mood Distribution
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: 110, gap: 6 }}>
          {week.map((d, i) => {
            const h = d.avg ? (d.avg / 5) * 80 : 8;
            const moodObj = d.avg ? MOODS.find(m => m.val === Math.round(d.avg)) : null;
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 10, color: moodObj ? moodObj.color : "#71717a", fontWeight: 700 }}>
                  {d.avg ? `${d.avg.toFixed(1)}` : ""}
                </span>
                <div style={{
                  width: "100%",
                  maxWidth: 24,
                  height: h,
                  background: moodObj ? moodObj.color : "#27272a",
                  borderRadius: 2
                }} />
                <span style={{ fontSize: 11, color: "#a1a1aa", fontWeight: 600 }}>{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
        <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 6, padding: "12px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#fafafa" }}>{avgMood}</div>
          <div style={{ fontSize: 10, color: "#a1a1aa", marginTop: 2 }}>Mean Rating</div>
        </div>
        <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 6, padding: "12px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#fafafa" }}>{totalEntries}</div>
          <div style={{ fontSize: 10, color: "#a1a1aa", marginTop: 2 }}>Check-ins</div>
        </div>
        <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 6, padding: "12px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: lowCount > 0 ? "#f87171" : "#10b981" }}>{lowCount}</div>
          <div style={{ fontSize: 10, color: "#a1a1aa", marginTop: 2 }}>High-Strain Days</div>
        </div>
      </div>

      {/* Weekly Buddy Summary */}
      <div style={{
        background: "#18181b",
        border: "1px solid #27272a",
        borderRadius: 8,
        padding: "16px 18px",
        marginBottom: 20
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Synthesized Weekly Summary
          </div>
          <button
            onClick={getSummary}
            disabled={moodLog.length === 0 || loading}
            style={{
              padding: "6px 12px",
              borderRadius: 4,
              background: "#2563eb",
              border: "none",
              color: "#ffffff",
              fontSize: 11,
              fontWeight: 600,
              cursor: moodLog.length === 0 || loading ? "not-allowed" : "pointer"
            }}>
            {loading ? "Generating..." : "Generate Analysis"}
          </button>
        </div>

        {weeklyNote ? (
          <p style={{ color: "#d4d4d8", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
            {weeklyNote}
          </p>
        ) : (
          <p style={{ color: "#a1a1aa", fontSize: 13, lineHeight: 1.5, margin: 0 }}>
            {moodLog.length > 0
              ? "Select 'Generate Analysis' to compute a summary of your recorded week and receive practical recommendations."
              : "Log check-ins or click 'Sample Week' above to inspect the weekly analysis dashboard."}
          </p>
        )}
      </div>

      {/* Early Detection Explanation */}
      <div style={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 6, padding: "14px 16px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#d4d4d8", marginBottom: 4 }}>
          Early Detection Methodology
        </div>
        <p style={{ fontSize: 12, color: "#a1a1aa", lineHeight: 1.5, margin: 0 }}>
          When two or more consecutive check-ins record scores below 3, the Early Detection Radar initiates supportive alerts on the overview page to prompt recovery interventions before severe academic burnout occurs.
        </p>
      </div>
    </div>
  );
}

export default InsightsScreen;
