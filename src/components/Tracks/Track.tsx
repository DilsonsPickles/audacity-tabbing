"use client";
import React, { useState } from "react";
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

   // Handle clip selection with Shift key support
  function handleClipSelectionButton(
    event: React.KeyboardEvent,
    clipName: string,
    clipParentId: number
  ) {
    const isShiftPressed = event.shiftKey;
    let newSelectedClips: string[];
    let newSelectedTracks: number[];
  
    // Shift + Enter: Handle multiple clip selections
    if (isShiftPressed) {
      newSelectedClips = selectedClip.includes(clipName)
        ? selectedClip.filter((name) => name !== clipName) // Deselect clip
        : [...selectedClip, clipName]; // Select clip
  
      // Ensure the parent track is selected if it's not already
      newSelectedTracks = selectedTrack.includes(clipParentId)
        ? selectedTrack // Keep track selection unchanged
        : [...selectedTrack, clipParentId]; // Add parent track if it's not selected
    } else {
      // Enter (no Shift): Select only this clip and its parent track
      newSelectedClips = selectedClip.includes(clipName)
        ? selectedClip.filter((name) => name !== clipName) // Deselect the clip
        : [clipName]; // Select this clip
  
      newSelectedTracks = selectedClip.includes(clipName)
        ? selectedTrack // Keep the track selection unchanged if deselecting the clip
        : [clipParentId]; // Select the parent track for this clip
    }
  
    // Ensure that if no clips are selected in the track, we deselect the track
    if (!newSelectedClips.includes(clipName)) {
      const isAnyClipSelectedInTrack = selectedClip.some(
        (selectedClipName) =>
          track.clips.some((clip) => clip.parentId === clipParentId && selectedClipName === clip.name)
      );
  
      if (!isAnyClipSelectedInTrack) {
        // Remove the parent track ID if no clips are selected in it
        newSelectedTracks = newSelectedTracks.filter(
          (trackId) => trackId !== clipParentId
        );
      }
    }
  
    setSelectedClip(newSelectedClips, isShiftPressed);
    setSelectedTrack(newSelectedTracks);
  }

  // Handle clip focus
  function handleClipFocus(clipPos: number, clipParentId: number) {
    setFocusedClipPosition(clipPos);
    setFocusedTrack(clipParentId);
  }





  return (
    <div
  className={`${styles.track_container} 
    ${selectedTrack.includes(track.id) ? styles.selected : ""} 
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
      isSelected={selectedClip.includes(clip.name)} // Check if clip is selected
      isFocused={clip.name === focusedClip}
      onClipButtonSelect={(event) =>
        handleClipSelectionButton(event, clip.name, clip.parentId)
      }
      onFocus={handleClipFocus}
    />
  ))}
</div>
  );
};

export default Track;
