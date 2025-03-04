import React from "react";
import Icon from "../../Icon";
import styles from "./GhostIconButton.module.css";

type GhostIconButtonProps = {
  code: string;
  size?: number;
  tabIndex: number;
  id: string;
};

const GhostIconButton = ({ code, size, tabIndex, id }: GhostIconButtonProps) => {
  return (
    <button id={id} tabIndex={tabIndex} className={styles.button}>
      <Icon code={code} size={size} />
    </button>
  );
};

export default GhostIconButton;