import React from "react";
import styles from "./BottomToolbar.module.css";

export default function BottomToolbar() {
  return (
    <div className={styles.container}>
      <div className={styles.info_container}>
        <div className={styles.info}>Stopped.</div>
        <div className={styles.hint}>Click and drag to select audio</div>
      </div>
    </div>
  );
}
