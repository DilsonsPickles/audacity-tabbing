import React, { forwardRef } from "react";
import Icon from "../../Icon";
import styles from "./GhostIconButton.module.css";

type GhostIconButtonProps = {
  code: string;
  size?: number;
  tabIndex: number;
};

const GhostIconButton = forwardRef<HTMLButtonElement, GhostIconButtonProps>(
  ({ code, size, tabIndex }, ref) => {
    return (
      <button ref={ref} tabIndex={tabIndex} className={styles.button}>
        <Icon code={code} size={size} />
      </button>
    );
  }
);

export default GhostIconButton; 