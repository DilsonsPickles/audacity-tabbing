import React, { forwardRef } from "react";
import styles from "./ClipNameInput.module.css";

type ClipNameInputProps = {
  tabIndex: number;
  value: number;
};

const ClipNameInput = forwardRef<HTMLInputElement, ClipNameInputProps>(
  ({ tabIndex, value }, ref) => {
    return (
      <input
        ref={ref}
        className={styles.input}
        tabIndex={tabIndex}
        value={value}
        readOnly
      ></input>
    );
  }
);

export default ClipNameInput;
