import React from "react";
import styles from "./Viewport.module.css";
import TimelineRuler from "../Rulers/TimelineRuler";
import Canvas from "../Canvas/Canvas";

// Import Track and Clip types from page.tsx
import { TrackData } from "@/app/page"; // Adjust the import path based on your project structure

interface ViewportProps {
  selectedClip: number;
  setSelectedClip: (id: number) => void;
  focusedClip: number;
  setFocusedClip: (id: number) => void;
  selectedTrack: number;
  setSelectedTrack: (id: number) => void;
  focusedTrack: number;
  setFocusedTrack: (id: number) => void;
  tracks: TrackData[]; // Use the imported Track type
}

export default function Viewport({
  tracks,
  selectedTrack,
  setSelectedTrack,
  focusedTrack,
  setFocusedTrack,
  selectedClip,
  setSelectedClip,
  focusedClip,
  setFocusedClip,
}: ViewportProps) {
  return (
    <div className={styles.container}>
      <TimelineRuler />
      {/* Pass props down to Canvas */}
      <Canvas
        tracks={tracks}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
        focusedTrack={focusedTrack}
        setFocusedTrack={setFocusedTrack}
        selectedClip={selectedClip}
        setSelectedClip={setSelectedClip}
        focusedClip={focusedClip}
        setFocusedClip={setFocusedClip}
      />
    </div>
  );
}
