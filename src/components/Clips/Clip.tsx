"use client";
import React from "react";
import styles from "./Clip.module.css";
import ClipHeaderButton from '../Buttons/ClipHeaderButton/ClipHeaderButton'
import ClipNameInput from "../InputFields/ClipNameInput";
import SelectClipButton from "../Buttons/SelectClipButton/SelectClipButton";
import { ClipData } from "@/context/TrackContext";
import waveform from "@/../public/waveform.svg";

type ClipProps = {
  clip: ClipData;
  tabIndex: number;
  parentId: number;
  isSelected: boolean;
  isFocused: boolean;
  onClipButtonSelect: (
    event: React.KeyboardEvent,
    clipName: string,
    clipParentId: number
  ) => void;
  onFocus: (clipPos: number, clipParentId: number) => void;
};

export default function Clip({
  clip,
  tabIndex,
  isSelected,
  isFocused,
  onClipButtonSelect,
  onFocus,
}: ClipProps) {
  const { name } = clip;

  return (
    <div
      id={`clip-${clip.parentId}-${clip.id}`}
      className={`${styles.clip} ${styles[`clip_track${clip.parentId}`]} ${
        isSelected && styles.selected
      } ${isFocused && styles.focused}`}
      role="cell"
      tabIndex={tabIndex}
      onFocus={() => onFocus(clip.position, clip.parentId)}
    >
      <div
        className={`${styles.clip_header} ${isSelected ? styles.selected : ""}`}
      >
        <ClipNameInput
          tabIndex={isFocused ? 0 : -1}
          value={name}
          id={`clip-${clip.parentId}-${clip.id}-control-0`}
        />
        <ClipHeaderButton
          tabIndex={isFocused ? 0 : -1}
          code="&#xEF13;"
          size={16}
          id={`clip-${clip.parentId}-${clip.id}-control-1`}
        />
      </div>

      <div
        className={`${styles.clip_body} ${isSelected ? styles.selected : ""}`}
      >
        <img
          src={waveform.src}
          style={{ color: "black", opacity: `${isSelected ? "0.8" : "0.6"}` }}
        />
        {isFocused && (
          <SelectClipButton
            clipName={clip.name}
            clipParentId={clip.parentId}
            tabIndex={tabIndex}
            isSelected={isSelected}
            id={`clip-${clip.parentId}-${clip.id}-control-2`}
            onClipButtonSelect={(event) =>
              onClipButtonSelect(event, clip.name, clip.parentId)
            } // Pass event to onClick
          />
        )}
      </div>
    </div>
  );
}
