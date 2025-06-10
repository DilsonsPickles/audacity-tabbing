import React from "react";
import styles from "./TimelineRuler.module.css";
import MajorTick from "./Ticks/MajorTick";
import MinorTick from "./Ticks/MinorTick";

const generateTicks = (max: number) => {
    const ticks: number[] = [];
  
    for (let i = 1; i <= max; i++) {
      // Add whole number (e.g., 1, 2, 3...)
      ticks.push(i);
  
      // Add decimal steps after each whole number, but only .2, .3, .4 (no .1)
      for (let j = 2; j <= 4; j++) {
        ticks.push(i + j * 0.1);
      }
    }
  
    return ticks;
  };
  
  const ticks = generateTicks(16); // Generate ticks up to 16 (for example)

export default function TimelineRuler() {
  return (
    <div id="ruler-timeline" className={styles.ruler_container}>
    {ticks.map((tick) =>
      Number.isInteger(tick) ? (
        <MajorTick key={tick} value={tick} />
      ) : (
        <MinorTick key={tick} value={tick} />
      )
    )}
    </div>
  );
}
