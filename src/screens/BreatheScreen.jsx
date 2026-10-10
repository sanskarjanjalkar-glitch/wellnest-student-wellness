import { useState, useEffect, useMemo } from 'react';
import { BREATHS } from '../ai.js';

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
    if (p === "inhale") return "Breathe In Slowly";
    if (p === "hold1") return "Hold Gently";
    if (p === "exhale") return "Exhale Slowly";
    if (p === "hold2") return "Rest";
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
    <div style={{ padding: "24px 18px 90px", maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
      <h2 style={{ color: "#f8fafc", fontWeight: 800, fontSize: 24, marginBottom: 4 }}>Guided Breathing 🫧</h2>
      <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 20 }}>2 minutes to lower your heart rate before an exam or sleep</p>

      {/* Pattern Selector */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 26 }}>
        {BREATHS.map(b => (
          <button key={b.name} onClick={() => { setSelected(b); setActive(false); setPhaseIndex(0); setCount(0); }}
            style={{
              flex: 1, padding: "10px 8px", borderRadius: 12,
              background: selected.name === b.name ? "#2563eb" : "#1e293b",
              border: selected.name === b.name ? "1px solid #3b82f6" : "1px solid #334155",
              color: selected.name === b.name ? "#fff" : "#94a3b8",
              cursor: "pointer", fontSize: 12, fontWeight: 600
            }}>
            {b.name}
          </button>
        ))}
      </div>

      <div style={{ fontSize: 12, color: "#cbd5e1", marginBottom: 28, background: "#1e293b", padding: "8px 12px", borderRadius: 10, display: "inline-block" }}>
        💡 {selected.desc}
      </div>

      {/* Breathing Bubble */}
      <div style={{
        height: 250, display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", marginBottom: 28
      }}>
        <div style={{
          width: 170, height: 170, borderRadius: "50%",
          background: "radial-gradient(circle, #38bdf844 0%, #0284c715 70%)",
          border: "2px solid #38bdf888",
          transform: `scale(${scale})`,
          transition: "transform 1s linear",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          boxShadow: active ? "0 0 40px #38bdf833" : "none"
        }}>
          {active ? (
            <>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#f8fafc" }}>{getPhaseLabel(currentPhase)}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#38bdf8", marginTop: 4 }}>{phaseDur - count}</div>
            </>
          ) : (
            <div style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600 }}>Ready when you are</div>
          )}
        </div>
      </div>

      {active && (
        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 18 }}>
          Cycles completed: {cycle}
        </div>
      )}

      {/* Control Button */}
      <button
        onClick={() => {
          if (!active) {
            setCount(0);
            setPhaseIndex(0);
          }
          setActive(!active);
        }}
        style={{
          padding: "14px 38px", borderRadius: 14, border: "none",
          background: active ? "#ef4444" : "#3b82f6",
          color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.25)"
        }}>
          {active ? "Pause" : "Start Breathing 🌿"}
        </button>
    </div>
  );
}

export default BreatheScreen;
