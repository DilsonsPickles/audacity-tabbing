import React from "react";
import styles from "./BottomToolbar.module.css";

export default function BottomToolbar() {
  return (
    <div id="toolbar-bottom" className={styles.container} tabIndex={6}>
      <div className={styles.info_container}>
        <div className={styles.info}>Stopped.</div>
        <div className={styles.hint}>Click and drag to select audio</div>
      </div>
    </div>
  );
}
