"use client";
import React from "react";
import styles from "./Clip.module.css";
import ClipHeaderButton from "../Buttons/ClipHeaderButton/ClipHeaderButton";
import ClipNameInput from "../InputFields/ClipNameInput";
import SelectClipButton from "../Buttons/SelectClipButton/SelectClipButton";
import { ClipData } from "@/context/TrackContext";
import waveform from "@/../public/waveform.svg";
import ClipHandles from "@/components/Clips/ClipHandles";
import ClipContextMenu from '@/components/ContextMenu/ClipContextMenu'
import { usePanelContext } from "@/context/PanelContext";

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

  // Use the updated context with clip-specific menu tracking
  const { openContextMenuClipId, toggleClipContextMenu } = usePanelContext();

  // Create a unique ID for this clip
  const clipId = `clip-${clip.parentId}-${clip.id}`;
  
  // Check if this specific clip's menu should be shown
  const showContextMenu = openContextMenuClipId === clipId;

  function handleToggleContextMenu() {
    toggleClipContextMenu(clipId);
  }

  return (
    <div
      id={clipId}
      className={`${styles.clip} ${styles[`clip_track${clip.parentId}`]} ${
        isSelected && styles.selected
      } ${isFocused && styles.focused}`}
      role="cell"
      tabIndex={tabIndex}
      onFocus={() => onFocus(clip.position, clip.parentId)}
    >
      <div
        className={`${styles.clip_header} ${isSelected ? styles.selected : ""}`}
        onClick={(event) => onClipButtonSelect(event, clip.name, clip.parentId)}
      >
        <ClipNameInput
          tabIndex={isFocused ? 0 : -1}
          value={name}
          id={`clip-${clip.parentId}-${clip.id}-control-${
            isSelected ? `3` : `1`
          }`}
        />
        <ClipHeaderButton
          onClick={handleToggleContextMenu}
          tabIndex={isFocused ? 0 : -1}
          code="&#xEF13;"
          size={16}
          id={`clip-${clip.parentId}-${clip.id}-control-${
            isSelected ? `4` : `2`
          }`}
        />
        {showContextMenu && <ClipContextMenu handleToggleContextMenu={handleToggleContextMenu}/>}
      </div>

      {isSelected && (
        <div className={styles.clip_handles_container}>
          <ClipHandles parentId={clip.parentId} clipId={clip.id} />
        </div>
      )}
      <div
        className={`${styles.clip_body} ${isSelected ? styles.selected : ""}`}
      >
        <img
          src={waveform.src}
          alt="waveform"
          style={{ color: "black", opacity: `${isSelected ? "0.8" : "0.6"}` }}
        />
        {isFocused && (
          <SelectClipButton
            clipName={clip.name}
            clipParentId={clip.parentId}
            tabIndex={tabIndex}
            isSelected={isSelected}
            id={`clip-${clip.parentId}-${clip.id}-control-0`}
            onClipButtonSelect={(event) =>
              onClipButtonSelect(event, clip.name, clip.parentId)
            }
          />
        )}
      </div>
    </div>
  );
}