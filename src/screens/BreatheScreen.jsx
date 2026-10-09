import { useState, useEffect, useMemo } from 'react';
import { BREATHS } from '../ai.js';

// 4. BREATHE
function BreatheScreen() {
  const [active, setActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [selected, setSelected] = useState(BREATHS[0]);

  const phaseOrder = useMemo(() => {
    return ["inhale", "hold1", "exhale", "hold2"].filter(p => selected[p] > 0);
  }, [selected]);

  const currentPhase = phaseOrder[phaseIndex] || "inhale";

  function getPhaseLabel(p) {
    if (p === "inhale") return "Breathe In";
    if (p === "hold1") return "Hold";
    if (p === "exhale") return "Breathe Out";
    if (p === "hold2") return "Hold";
    return "";
  }

  useEffect(() => {
    if (!active) return;

    const timer = setInterval(() => {
      setCount(prevCount => {
        const currentDur = selected[phaseOrder[phaseIndex]] || 1;
        if (prevCount + 1 >= currentDur) {
          setPhaseIndex(prevIdx => {
            const nextIdx = (prevIdx + 1) % phaseOrder.length;
            if (nextIdx === 0) {
              setCycle(c => c + 1);
            }
            return nextIdx;
          });
          return 0;
        }
        return prevCount + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [active, phaseIndex, phaseOrder, selected]);

  const phaseDur = selected[currentPhase] || 1;
  const progress = count / phaseDur;
  const scale = currentPhase === "inhale"
    ? 1 + progress * 0.35
    : currentPhase === "exhale"
      ? 1.35 - progress * 0.35
      : 1.35;

  return (
    <div style={{ padding: "28px 20px 100px", maxWidth: 500, margin: "0 auto" }}>
      <h2 style={{ color: "#fff", fontWeight: 800, fontSize: 26, marginBottom: 6 }}>Breathwork 🫧</h2>
      <p style={{ color: "#64748b", marginBottom: 20 }}>Choose a technique and breathe with the calming circle</p>
      <div style={{ display: "flex", gap: 10, marginBottom: 28, overflowX: "auto", paddingBottom: 4 }}>
        {BREATHS.map(b => (
          <button key={b.name} onClick={() => { setSelected(b); setActive(false); setPhaseIndex(0); setCount(0); setCycle(0); }}
            style={{
              padding: "10px 16px", borderRadius: 50, border: `1.5px solid ${selected.name === b.name ? "#7c3aed" : "#ffffff18"}`,
              background: selected.name === b.name ? "#7c3aed22" : "#ffffff06",
              color: selected.name === b.name ? "#a78bfa" : "#64748b", fontSize: 13, fontWeight: 700,
              cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s"
            }}>
            {b.name}
          </button>
        ))}
      </div>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ position: "relative", width: 200, height: 200, margin: "0 auto 24px" }}>
          {[1.6, 1.4, 1.2].map((r, i) => (
            <div key={i} style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: `radial-gradient(circle, #7c3aed${["08", "0c", "12"][i]}, transparent 70%)`,
              transform: `scale(${active ? scale * r : r})`, transition: "transform 0.8s ease-in-out"
            }} />
          ))}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "linear-gradient(135deg,#7c3aed,#0ea5e9)",
            transform: `scale(${active ? scale : 1})`, transition: "transform 0.8s ease-in-out",
            display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"
          }}>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>{getPhaseLabel(currentPhase)}</div>
            <div style={{ color: "#e2e8f0", fontSize: 32, fontWeight: 900 }}>{active ? phaseDur - count : "—"}</div>
          </div>
        </div>
        <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 6 }}>{selected.desc}</div>
        {cycle > 0 && <div style={{ color: "#4ade80", fontWeight: 700, fontSize: 14 }}>✓ Cycle {cycle} complete</div>}
      </div>
      <button onClick={() => setActive(a => !a)}
        style={{
          width: "100%", padding: "16px", borderRadius: 18,
          background: active ? "#ffffff12" : "linear-gradient(135deg,#0ea5e9,#06b6d4)",
          border: "none", color: "#fff", fontWeight: 700, fontSize: 17, cursor: "pointer", transition: "all 0.2s"
        }}>
        {active ? "⏸ Pause" : "▶ Start Session"}
      </button>
    </div>
  );
}

export default BreatheScreen;
