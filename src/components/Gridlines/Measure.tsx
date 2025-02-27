import React from "react";
import styles from "./Measure.module.css";

export default function Measure() {
  return (
    <div className={styles.measure}>
      <span className={styles.beat} />
      <span className={styles.beat} />
      <span className={styles.beat} />
      <span className={styles.beat} />
    </div>
  );
}
