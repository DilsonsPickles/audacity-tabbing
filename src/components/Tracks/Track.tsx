import React from "react";
import styles from "./Track.module.css";
import Clip from "../Clips/Clip";

type TrackProps = {
  track: {
    name: string;
    id: number;
    clips: { id: number }[];
  };
  setSelectedTrack: (id: number) => void;
  inFocus: boolean;
  tabIndex: number;
  isSelected: boolean;
  focusedTrack: number;
  setFocusedTrack: (id: number) => void;
  selectedClip: number;
  setSelectedClip: (id: number) => void;
  focusedClip: number;
  setFocusedClip: (id: number) => void;
};

const Track: React.FC<TrackProps> = ({
  track,
  setSelectedTrack,
  tabIndex,
  selectedClip,
  setSelectedClip,
  isSelected,
  inFocus,
  focusedTrack,
  setFocusedTrack,
  focusedClip,
  setFocusedClip,
}) => {
  const handleClipClick = (clipId: number) => {
    setSelectedTrack(track.id);
    setFocusedTrack(track.id);
  };

  return (
    <div
      className={`${styles.track_container} ${
        isSelected ? styles.selected : ""
      } ${inFocus ? styles.focused : ""}`}
    >
      {track.clips.map((clip, index) => {
        // If this is the last clip, give it a tabIndex of -1 (no focus)
        const isLastClip = index === track.clips.length - 1;
        return (
          <Clip
            key={clip.id}
            id={clip.id}
            tabIndex={tabIndex} // Last clip doesn't have tab focus
            onClick={handleClipClick}
            isSelected={clip.id === selectedClip}
            setSelectedClip={setSelectedClip}
            isFocused={clip.id === focusedClip}
            setFocusedClip={setFocusedClip} // Pass setFocusedClip here
            isLastClip={isLastClip}
            setFocusedTrack={setFocusedTrack}
            focusedTrack={focusedTrack}
          />
        );
      })}
    </div>
  );
};

export default Track;