import React from "react";
import styles from "./Tick.module.css";

type MajorTickProps = {
  value: number;
  isWholeNumber?: boolean;
};

export default function MajorTick({ value, isWholeNumber = false }: MajorTickProps) {
  return (
    <div className={styles.major_tick_container}>
      <div className={styles.tick_container_upper}>
        <p className={isWholeNumber ? styles.bold : ""}>{value}</p>
      </div>
      <div className={styles.tick_container_lower}></div>
    </div>
  );
}