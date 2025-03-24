import React from "react";
import styles from "./Timecode.module.css";
import Icon from "../Icon";

type PlaybackTimecodeProps = {
  id: string;
};

export default function PlaybackTimecode({ id }: PlaybackTimecodeProps) {
  return (
    <div tabIndex={-1} id={id} className={styles.container}>
      <div className={styles.digitGroup}>
        <div id="timecode-index-0" tabIndex={-1} className={styles.digit}>
          0
        </div>
        <div id="timecode-index-1" tabIndex={-1} className={styles.digit}>
          0
        </div>
        <div id="timecode-index-2" tabIndex={-1} className={styles.digit}>
          1
        </div>
        <div className={styles.type}>bar</div>
        <div id="timecode-index-3" tabIndex={-1} className={styles.digit}>
          0
        </div>
        <div id="timecode-index-4" tabIndex={-1} className={styles.digit}>
          0
        </div>
        <div id="timecode-index-5" tabIndex={-1} className={styles.digit}>
          1
        </div>
        <div className={styles.type}>beat</div>
      </div>

      <div
        id="timecode-index-6"
        tabIndex={-1}
        className={styles.dropdownButton}
      >
        <Icon code="&#xEF12;" size={16} />
      </div>
    </div>
  );
}
