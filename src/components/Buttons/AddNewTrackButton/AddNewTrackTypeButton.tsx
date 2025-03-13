import React from "react";
import Icon from "../../Icon";
import styles from "./AddNewTrackTypeButton.module.css";

type AddNewTrackTypeButtonProps = {
  id: string;
  text: string;
  icon: string;
};

export default function AddNewTrackTypeButton({
  id,
  text,
  icon,
}: AddNewTrackTypeButtonProps) {
  return (
    <button id={id} className={styles.container}>
      <Icon size={16} code={icon} />
      {text}
    </button>
  );
}

AddNewTrackTypeButton;
