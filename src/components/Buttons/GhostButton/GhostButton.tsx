import React from "react";
import Icon from "../../Icon";
import styles from "./GhostButton.module.css"

type GhostButtonProps = {
  code: string;
  size?: number;
  tabIndex?: number;
  id?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const GhostButton = ({ code, size, tabIndex, id, onClick, children }: GhostButtonProps) => {
  return (
    <button id={id} tabIndex={tabIndex} className={styles.button} onClick={onClick}>
      <Icon code={code} size={size} />
      {children}
    </button>
  );
};

export default GhostButton;