import React from "react";
import styles from "./Tick.module.css";

type TickProps = {
  value: number;
  isWholeNumber?: boolean;
};

export default function Tick({ value, isWholeNumber = false }: TickProps) {
  return (
    <div className={styles.tick_container}>
      <div className={styles.tick_container_upper}>
        <p className={isWholeNumber ? styles.bold : ""}>{value}</p>
      </div>
      <div className={styles.tick_container_lower}></div>
    </div>
  );
}