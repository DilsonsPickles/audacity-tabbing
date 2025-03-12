import React from "react";
import Icon from "../../Icon";
import styles from "./ClipHeaderButton.module.css";

type ClipHeaderButtonProps = {
  code: string;
  size?: number;
  tabIndex: number;
  id: string;
};

const ClipHeaderButton = ({ code, size, tabIndex, id }: ClipHeaderButtonProps) => {
  return (
    <button id={id} tabIndex={tabIndex} className={styles.button}>
      <Icon code={code} size={size} />
    </button>
  );
};

export default ClipHeaderButton;