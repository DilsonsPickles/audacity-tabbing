import React, { forwardRef } from "react";
import styles from "./SelectClipButton.module.css";

type SelectClipButtonProps = {
  tabIndex: number;
  onClick: () => void; 
  isSelected: boolean;
};

const SelectClipButton = forwardRef<HTMLButtonElement, SelectClipButtonProps>(
  ({ tabIndex, onClick, isSelected }, ref) => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
      // Trigger onClick when Enter key is pressed
      if (event.key === "Enter") {
        onClick();
        event.preventDefault(); // Prevent default behavior of Enter key
      }
    };

    return (
      <button
        ref={ref}
        tabIndex={tabIndex}
        className={styles.button}
        onClick={onClick}
        onKeyDown={handleKeyDown} // Handle keydown event for Enter key
      >
        {isSelected ? "Deselect" : "Select"}
      </button>
    );
  }
);

export default SelectClipButton;