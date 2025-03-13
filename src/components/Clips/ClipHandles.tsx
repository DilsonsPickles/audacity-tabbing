import React from "react";
import styles from "./ClipHandles.module.css";
import Icon from "../Icon";

type ClipHandlesProps = {
    parentId: number, 
    clipId: number,
}

export default function ClipHandles({parentId, clipId}: ClipHandlesProps) {
  return (
    <div className={styles.container}>
      <div>
        <div id={`clip-${parentId}-${clipId}-control-2`} className={styles.handle} tabIndex={0}>
          <Icon code="&#xEF0F;" />
          <span className={styles.arrow_bg}>
            <Icon code="&#xEF0F;" size={32} />
          </span>
        </div>
        <div id={`clip-${parentId}-${clipId}-control-1`} className={styles.handle} tabIndex={0}>
          <Icon code="&#xF475;" size={14} />
          <span className={styles.clock_bg}></span>
        </div>
      </div>
      <div>
        <div id={`clip-${parentId}-${clipId}-control-5`} className={styles.handle} tabIndex={0}>
          <Icon code="&#xEF11;" size={24}/>

          <span className={styles.arrow_bg}>
            <Icon code="&#xEF11;" size={32} />
          </span>
        </div>
        <div id={`clip-${parentId}-${clipId}-control-6`} className={styles.handle} tabIndex={0}>
          <Icon code="&#xF475;" size={14} />
          <span className={styles.clock_bg}></span>
        </div>
      </div>
    </div>
  );
}
