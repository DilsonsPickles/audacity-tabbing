import React from "react";
import Icon from "@/components/Icon";
import styles from "./IconButton.module.css";

type IconButtonProps = {
  code: string;
  tabIndex: number;
  id: string;
};

const IconButton = ({ code, tabIndex, id }: IconButtonProps) => {
  return (
    <button tabIndex={tabIndex} className={styles.button} id={id}>
      <Icon size={16} code={code} />
    </button>
  );
};

export default IconButton;