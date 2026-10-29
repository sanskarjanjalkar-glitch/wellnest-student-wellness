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
    if (p === "inhale") return "Inhale Deeply";
    if (p === "hold1") return "Hold Breath";
    if (p === "exhale") return "Exhale Completely";
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
    <div style={{ padding: "28px 18px 90px", maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
        Physiological Regulation
      </div>
      <h2 style={{ color: "#fafafa", fontWeight: 700, fontSize: 22, margin: "0 0 6px" }}>
        Guided Breathing Protocol
      </h2>
      <p style={{ color: "#a1a1aa", fontSize: 13, marginBottom: 20 }}>
        Structured pacing to moderate heart rate variability before exams or sleep.
      </p>

      {/* Pattern Selector */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
        {BREATHS.map(b => (
          <button
            key={b.name}
            onClick={() => { setSelected(b); setActive(false); setPhaseIndex(0); setCount(0); }}
            style={{
              flex: 1,
              padding: "10px 8px",
              borderRadius: 6,
              background: selected.name === b.name ? "#2563eb" : "#18181b",
              border: selected.name === b.name ? "1px solid #3b82f6" : "1px solid #27272a",
              color: selected.name === b.name ? "#ffffff" : "#a1a1aa",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600
            }}>
            {b.name}
          </button>
        ))}
      </div>

      <div style={{
        fontSize: 12,
        color: "#d4d4d8",
        marginBottom: 28,
        background: "#18181b",
        border: "1px solid #27272a",
        padding: "8px 14px",
        borderRadius: 6,
        display: "inline-block"
      }}>
        {selected.desc}
      </div>

      {/* Breathing Bubble */}
      <div style={{
        height: 240,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginBottom: 24
      }}>
        <div style={{
          width: 160,
          height: 160,
          borderRadius: 80,
          background: "#18181b",
          border: "2px solid #3b82f6",
          transform: `scale(${scale})`,
          transition: "transform 1s linear",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: active ? "0 0 24px rgba(59, 130, 246, 0.25)" : "none"
        }}>
          {active ? (
            <>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fafafa" }}>
                {getPhaseLabel(currentPhase)}
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#3b82f6", marginTop: 4 }}>
                {phaseDur - count}
              </div>
            </>
          ) : (
            <div style={{ color: "#a1a1aa", fontSize: 13, fontWeight: 600 }}>
              Session Paused
            </div>
          )}
        </div>
      </div>

      {active && (
        <div style={{ fontSize: 12, color: "#71717a", marginBottom: 18 }}>
          Completed Cycles: {cycle}
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
          padding: "12px 34px",
          borderRadius: 6,
          border: "none",
          background: active ? "#dc2626" : "#2563eb",
          color: "#ffffff",
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer"
        }}>
        {active ? "Pause Protocol" : "Begin Breathing Protocol"}
      </button>
    </div>
  );
}

export default BreatheScreen;
