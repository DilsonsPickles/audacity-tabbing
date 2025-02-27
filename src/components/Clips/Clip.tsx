import React, { useState, useRef, useEffect } from "react";
import styles from "./Clip.module.css";
import GhostIconButton from "../Buttons/GhostIconButton/GhostIconButton";
import ClipNameInput from "../InputFields/ClipNameInput";
import SelectClipButton from "../Buttons/SelectClipButton/SelectClipButton";

type ClipProps = {
  id: number;
  tabIndex: number;
  onClick: (id: number) => void;
  isSelected: boolean;
  setSelectedClip: (id: number) => void;
  isFocused: boolean;
  setFocusedClip: (id: number) => void;
  isLastClip:boolean;
  focusedTrack: number;
  setFocusedTrack: (id: number) => void;
};

export default function Clip({
  id,
  onClick,
  tabIndex,
  isFocused,
  setFocusedClip,
  isSelected,
  setSelectedClip,
  isLastClip,
  setFocusedTrack,
  focusedTrack,
}: ClipProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const overflowMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const clipRef = useRef<HTMLDivElement | null>(null);
  const selectClipButtonRef = useRef<HTMLButtonElement | null>(null);

  // The order of tabbable elements within the clip.
  const tabbableElements = [
    selectClipButtonRef,
    inputRef,
    overflowMenuButtonRef,
  ];

  // Ensure focus goes to the first tabbable element when the clip is focused
  useEffect(() => {
    if (isFocused && selectClipButtonRef.current) {
      selectClipButtonRef.current.focus(); // Focus the first internal element
    }
  }, [isFocused]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setFocusedClip(id); // Focus the clip when Enter is pressed
      event.preventDefault(); // Prevent default tabbing behavior when Enter is pressed
    } else if (event.key === "Escape") {
      setFocusedClip(0); // Unfocus clip when Escape is pressed
      clipRef.current?.focus(); // Move focus back to the clip container
    } else if (event.key === "Tab") {
      if(isLastClip && focusedTrack < 3){
        setFocusedTrack(focusedTrack + 1)
      };
      setFocusedClip(0); // Unfocus clip when Tab is pressed
      clipRef.current?.focus(); // Move focus back to the clip container
    } else if (
      event.key === "ArrowRight" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowUp" ||
      event.key === "ArrowDown"
    ) {
      event.preventDefault(); // Prevent default behavior of arrows

      const currentIndex = tabbableElements.findIndex(
        (ref) => ref.current === document.activeElement
      );

      if (currentIndex !== -1) {
        const nextIndex =
          event.key === "ArrowRight"
            ? (currentIndex + 1) % tabbableElements.length // Loop forward
            : (currentIndex - 1 + tabbableElements.length) %
              tabbableElements.length; // Loop backward

        tabbableElements[nextIndex]?.current?.focus(); // Focus the next element
      }
    }
  };

  return (
    <div
      id={`${id}`}
      ref={clipRef}
      tabIndex={tabIndex}
      className={styles.clip}
      onClick={() => onClick(id)}
      onFocus={() => console.log(`Clip ${id} is in focus`)}
      onKeyDown={handleKeyDown} // Handle key events (Enter, ArrowLeft, ArrowRight, Escape, Tab)
    >
      <div
        className={`${styles.clip_header} ${isSelected ? styles.selected : ""}`}
        onClick={() => setSelectedClip(id)}
      >
        <ClipNameInput
          ref={inputRef}
          tabIndex={isFocused ? 0 : -1}
          value={id}
        />
        <GhostIconButton
          ref={overflowMenuButtonRef}
          tabIndex={isFocused ? 0 : -1}
          code="&#xEF13;"
          size={16}
        />
      </div>

      <div
        className={`${styles.clip_body} ${isSelected ? styles.selected : ""}`}
      >
        {isFocused && (
          <SelectClipButton
            onClick={() => setSelectedClip(id)}
            ref={selectClipButtonRef}
            tabIndex={isFocused ? 0 : -1}
            isSelected={isSelected}
          />
        )}
      </div>
    </div>
  );
}
