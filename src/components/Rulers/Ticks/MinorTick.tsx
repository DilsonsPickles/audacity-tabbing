import React from 'react'
import styles from "./Tick.module.css";


type MinorTickProps = {
  value: number;
  isWholeNumber?: boolean;
};

export default function MinorTick({ value, isWholeNumber = false }: MinorTickProps) {
  return (
    <div className={styles.minor_tick_container}>
      <div className={styles.tick_container_upper}>
        <p className={isWholeNumber ? styles.bold : ""}>{value}</p>
      </div>
      <div className={styles.tick_container_lower}></div>
    </div>
  );
}