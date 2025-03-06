import React from "react";
import styles from "./Timecode.module.css";

type PlaybackTimecodeProps = {
  id: string;
};

export default function PlaybackTimecode({ id }: PlaybackTimecodeProps) {
  return (
    <div tabIndex={-1} id={id} className={styles.container}>
      <div className={styles.digit}>0</div>
      <div className={styles.digit}>0</div>
      <div className={styles.digit}>1</div>
      <div className={styles.type}>bar</div>
      <div className={styles.digit}>0</div>
      <div className={styles.digit}>0</div>
      <div className={styles.digit}>1</div>
      <div className={styles.type}>beat</div>
    </div>
  );
}
