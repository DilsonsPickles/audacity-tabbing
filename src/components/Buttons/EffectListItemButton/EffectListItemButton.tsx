import React from "react";
import Icon from "../../Icon";
import styles from "./EffectListItemButton.module.css";

export default function EffectListItemButton() {
  return (
    <button className={styles.container}>
      <Icon size={16} code="&#xEF12;" />
    </button>
  );
}
