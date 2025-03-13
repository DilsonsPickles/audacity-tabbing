import React from "react";
import Icon from "../../Icon";
import styles from "./ClipHeaderButton.module.css";

type ClipHeaderButtonProps = {
  onClick: () => void;
  code: string;
  size?: number;
  tabIndex: number;
  id: string;
};

const ClipHeaderButton = ({ onClick, code, size, tabIndex, id }: ClipHeaderButtonProps) => {
  return (
    <button onClick={onClick} id={id} tabIndex={tabIndex} className={styles.button}>
      <Icon code={code} size={size} />
    </button>
  );
};

export default ClipHeaderButton;