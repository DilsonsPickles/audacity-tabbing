import React from "react";
import styles from "./PlaybackMeter.module.css";
import Icon from "../Icon";
import ToolButton from "../Buttons/ToolButton/ToolButton";

function PlaybackMeter() {
  return (
    <div className={styles.wrapper}>
        <ToolButton code="&#xEF4E;"/>
      <div className={styles.container}>
        <div className={styles.meterContainer}>
          <div className={styles.leftMeter} />
          <div className={styles.rightMeter} />
        </div>

        <div className={styles.meterRuler}>
          <p>-60</p>
          <p>-48</p>
          <p>-36</p>
          <p>-24</p>
          <p>-12</p>
          <p>0</p>
        </div>
      </div>
      <div className={styles.resizeGripper}><Icon code="&#xF347;" size={16}/></div>
    </div>
  );
}

export default PlaybackMeter;
