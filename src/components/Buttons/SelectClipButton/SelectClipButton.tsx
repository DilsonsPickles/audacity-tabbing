import React from "react";
import styles from "./SelectClipButton.module.css";

type SelectClipButtonProps = {
  clipName: string;
  clipParentId: number;
  tabIndex: number;
  isSelected: boolean;
  id: string;
  onClick: (clipName: string, clipParentId: number) => void;
};

const SelectClipButton = ({
  clipName,
  clipParentId,
  tabIndex,
  isSelected,
  id,
  onClick,
}: SelectClipButtonProps) => {
  // Handle key down for "Enter" key to trigger the onClick handler
  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.code === "Enter") {
      onClick(clipName, clipParentId); // Trigger the onClick handler with the clipName when "Enter" is pressed
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