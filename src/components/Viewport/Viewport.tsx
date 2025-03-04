import React from "react";
import styles from "./Viewport.module.css";
import TimelineRuler from "../Rulers/TimelineRuler";
import Canvas from "../Canvas/Canvas";
import PlayheadCursor from "@/components/Cursor/PlayheadCursor"

export default function Viewport() {
  return (
    <div className={styles.container}>
      <PlayheadCursor />
      <TimelineRuler />
      <Canvas />
    </div>
  );
}