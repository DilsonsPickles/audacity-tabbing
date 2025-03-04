"use client";
import React from "react";
import styles from "./Track.module.css";
import Clip from "../Clips/Clip";
import { TrackData } from "@/context/TrackContext";
import { useTrackContext } from "@/context/TrackContext";

type TrackProps = {
  track: TrackData;
  tabIndex: number;
  inFocus: boolean;
};

const Track: React.FC<TrackProps> = ({ track, tabIndex, inFocus }) => {
  const {
    focusedClip,
    selectedClip,
    setSelectedClip,
    selectedTrack,
    setSelectedTrack,
    setFocusedClipPosition,
    setFocusedTrack,
  } = useTrackContext();

  // Handle clip click
  function handleClipSelectionButton(clipName: string, clipParentId: number) {
    setSelectedClip(clipName);
    setSelectedTrack(clipParentId)
  }

  // Handle clip focus
  function handleClipFocus(clipPos: number, clipParentId: number) {
    setFocusedClipPosition(clipPos);
    setFocusedTrack(clipParentId);
  }

  return (
    <div
      className={`
        ${styles.track_container} 
        ${selectedTrack === track.id ? styles.selected : ""} 
        ${inFocus ? styles.focused : ""}
      `}
      role="region"
      aria-label={`${track.name} Track`}
    >
      {track.clips.map((clip) => (
        <Clip
          key={clip.id}
          clip={clip}
          tabIndex={tabIndex}
          parentId={clip.parentId}
          isSelected={clip.name === selectedClip}
          isFocused={clip.name === focusedClip}
          onClick={handleClipSelectionButton}
          onFocus={handleClipFocus}
        />
      ))}
    </div>
  );
};

export default Track;
