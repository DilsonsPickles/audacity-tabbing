import React from "react";
import styles from "./SelectClipButton.module.css";

type SelectClipButtonProps = {
  clipName: string;
  clipParentId: number;
  tabIndex: number;
  isSelected: boolean;
  id: string;
  onClipButtonSelect: (event: React.KeyboardEvent, clipName: string, clipParentId: number) => void;
};

const SelectClipButton = ({
  clipName,
  tabIndex,
  isSelected,
  id,
  onClipButtonSelect,
  clipParentId
}: SelectClipButtonProps) => {
  // Handle key down for "Enter" key to trigger the onClick handler
  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.code === "Enter") {
      onClipButtonSelect(event, clipName, clipParentId); // Trigger the onClick handler with the clipName when "Enter" is pressed
    }
  }

  return (
    <button
      tabIndex={tabIndex}
      className={styles.button}
      id={id}
      onKeyDown={handleKeyDown} // Pass the function reference to onKeyDown
    >
      {isSelected ? "Deselect" : "Select"}
    </button>
  );
};

export default SelectClipButton;