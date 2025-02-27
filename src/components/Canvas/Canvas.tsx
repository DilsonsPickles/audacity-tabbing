import React from "react";
import styles from "./Canvas.module.css";
import Measure from "../Gridlines/Measure";
import Track from "../Tracks/Track";
import { TrackData } from "@/app/page";

type CanvasProps = {
  tracks: TrackData[]; // Use the imported Track type from page.tsx
  selectedTrack: number;
  setSelectedTrack: (id: number) => void;
  focusedTrack: number;
  setFocusedTrack: (id: number) => void;
  selectedClip: number;
  setSelectedClip: (id: number) => void;
  focusedClip: number;
  setFocusedClip: (id: number) => void;
};

function Canvas({
  tracks,
  selectedTrack,
  setSelectedTrack,
  focusedTrack,
  setFocusedTrack,
  selectedClip,
  setSelectedClip,
  focusedClip,
  setFocusedClip,
}: CanvasProps) {
  return (
    <div className={styles.container}>
      <div className={styles.trackContainer}>
        {tracks.map((track) => (
          <Track
            key={track.id}
            tabIndex={track.id}
            track={track}
            isSelected={selectedTrack === track.id}
            setSelectedTrack={setSelectedTrack}
            inFocus={focusedTrack === track.id}
            focusedTrack={focusedTrack}
            setFocusedTrack={setFocusedTrack}
            selectedClip={selectedClip}
            setSelectedClip={setSelectedClip}
            focusedClip={focusedClip}
            setFocusedClip={setFocusedClip}
          />
        ))}
      </div>

      <div className={styles.measureContainer}>
        <div style={{ display: "flex", height: "100%" }}>
          {[...Array(16)].map((_, index) => (
            <Measure key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Canvas;
