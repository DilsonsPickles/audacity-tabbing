import React from "react";
import styles from "./Measure.module.css";

export default function Measure() {
  return (
    <div className={styles.measure}>
      <div className={styles.quarterNote}>
        <span className={styles.eigthNote} />
        <span className={styles.eigthNote} />
      </div>
      <div className={styles.quarterNote}>
        <span className={styles.eigthNote} />
        <span className={styles.eigthNote} />
      </div>
      <div className={styles.quarterNote}>
        <span className={styles.eigthNote} />
        <span className={styles.eigthNote} />
      </div>
      <div className={styles.quarterNote}>
        <span className={styles.eigthNote} />
        <span className={styles.eigthNote} />
      </div>
    </div>
  );
}
