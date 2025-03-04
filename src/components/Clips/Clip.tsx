"use client";
import React from "react";
import styles from "./Clip.module.css";
import GhostIconButton from "../Buttons/GhostIconButton/GhostIconButton";
import ClipNameInput from "../InputFields/ClipNameInput";
import SelectClipButton from "../Buttons/SelectClipButton/SelectClipButton";
import { ClipData } from "@/context/TrackContext";

type ClipProps = {
  clip: ClipData;
  tabIndex: number;
  parentId: number;
  isSelected: boolean;
  isFocused: boolean;
  onClick: (clipName: string, clipParentId: number) => void;
  onFocus: (clipPos: number, clipParentId: number) => void;
};

export default function Clip({
  clip,
  tabIndex,
  isSelected,
  isFocused,
  onClick,
  onFocus,
}: ClipProps) {
  const { name } = clip;

  return (
    <div
      id={`clip-${clip.parentId}-${clip.id}`}
      className={styles.clip}
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
        <GhostIconButton
          tabIndex={isFocused ? 0 : -1}
          code="&#xEF13;"
          size={16}
          id={`clip-${clip.parentId}-${clip.id}-control-1`}
        />
      </div>

      <div
        className={`${styles.clip_body} ${isSelected ? styles.selected : ""}`}
      >
        {isFocused && (
          <SelectClipButton
            clipName={clip.name}
            clipParentId={clip.parentId}
            tabIndex={tabIndex}
            isSelected={isSelected}
            id={`clip-${clip.parentId}-${clip.id}-control-2`}
            onClick={onClick} // Trigger click
          />
        )}
      </div>
    </div>
  );
}