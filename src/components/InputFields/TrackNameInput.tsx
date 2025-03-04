import React from "react";
import styles from "./TrackNameInput.module.css";

type TrackNameInputProps = {
  tabIndex: number;
  value: string;
  id: string;
};

const TrackNameInput = ({ tabIndex, value, id }: TrackNameInputProps) => {
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

export default TrackNameInput;