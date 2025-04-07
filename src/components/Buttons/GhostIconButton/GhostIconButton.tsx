import React from "react";
import Icon from "../../Icon";
import styles from "./GhostIconButton.module.css";

type GhostIconButtonProps = {
  code: string;
  size?: number;
  tabIndex?: number;
  id?: string;
  onClick?: () => void;
};

const GhostIconButton = ({ code, size, tabIndex, id, onClick }: GhostIconButtonProps) => {
  return (
    <button id={id} tabIndex={tabIndex} className={styles.button} onClick={onClick}>
      <Icon code={code} size={size} />
    </button>
  );
};

export default GhostIconButton;