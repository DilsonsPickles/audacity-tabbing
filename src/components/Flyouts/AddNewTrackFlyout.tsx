import React, { useEffect, useRef } from "react";
import styles from "./AddNewTrackFlyout.module.css";
import AddNewTrackTypeButton from "@/components/Buttons/AddNewTrackButton/AddNewTrackTypeButton";
import { usePanelContext } from "@/context/PanelContext";

export default function AddNewTrackFlyout() {
  const flyoutRef = useRef<HTMLDivElement>(null);
  const { toggleIsAddNewTrackPanelOpen } = usePanelContext();

  useEffect(() => {
    // Function to handle clicks outside the flyout
    const handleClickOutside = (event: MouseEvent) => {
      const addNewTrackButton = document.getElementById("add-new-track-button");
      
      if (
        flyoutRef.current && 
        !flyoutRef.current.contains(event.target as Node) &&
        event.target !== addNewTrackButton &&
        !addNewTrackButton?.contains(event.target as Node)
      ) {
        toggleIsAddNewTrackPanelOpen();
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleIsAddNewTrackPanelOpen]);

  return (
    <div 
      id="add-new-track-flyout" 
      className={styles.container} 
      ref={flyoutRef}
      tabIndex={0}
    >
      <div className={styles.button_group}>
        <AddNewTrackTypeButton
          id="add-new-track-flyout-index-0"
          text="Mono"
          icon="&#xF41B;"
        />
        <AddNewTrackTypeButton
          id="add-new-track-flyout-index-1"
          text="Stereo"
          icon="&#xF41B;"
        />
        <AddNewTrackTypeButton
          id="add-new-track-flyout-index-2"
          text="Label"
          icon="&#xF3C7;"
        />
      </div>
      <div className={styles.footer}>
      </div>
    </div>
  );
}