import React from "react";
import Icon from "../../Icon";
import styles from "./PowerButton.module.css";

export default function PowerButton() {
  return (
    <div className={styles.container}>
      <Icon code="&#xF38F;" size={16} />
    </div>
  );
}
