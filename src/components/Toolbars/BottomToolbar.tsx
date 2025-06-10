import React from "react";
import styles from "./BottomToolbar.module.css";
import { useTrackContext } from "@/context/TrackContext";


export default function BottomToolbar() {

const {focusedElement} = useTrackContext();

  return (
    <div id="toolbar-bottom" className={styles.container} tabIndex={6}>
      <div className={styles.info_container}>
        <div className={styles.info}>Stopped.</div>
        <div className={styles.hint}>{focusedElement?.id}</div>
      </div>
    </div>
  );
}
