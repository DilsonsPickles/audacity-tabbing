import React from "react";
import styles from "./ClipNameInput.module.css";

type ClipNameInputProps = {
  tabIndex: number;
  value: string;
  id: string;
};

const ClipNameInput = ({ tabIndex, value, id }: ClipNameInputProps) => {
  return (
    <input
      className={styles.input}
      tabIndex={tabIndex}
      value={value}
      readOnly
      id={id}
    />
  );
};

export default ClipNameInput;