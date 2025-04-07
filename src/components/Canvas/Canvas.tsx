import React from "react";
import styles from "./Canvas.module.css";
import Measure from "../Gridlines/Measure";
import Track from "../Tracks/Track";
import { useTrackContext } from "@/context/TrackContext";
import { usePlayheadContext } from "@/context/PlayheadContext";

function Canvas() {
  const { tracks, focusedTrack, hoveredTrackHeader, setHoveredTrackHeader} = useTrackContext();
  const { setPlayheadPosition } = usePlayheadContext();

  function handleCanvasClick(e: React.MouseEvent) {
    const canvasRect = e.currentTarget.getBoundingClientRect(); // Get the canvas size and position
    const clickX = e.clientX - canvasRect.left; // Calculate the mouse click position relative to the canvas
    const newPlayheadPosition = Math.floor(clickX / 14); // Divide by 14 to match the playhead movement logic

    setPlayheadPosition(newPlayheadPosition); // Set the playhead position
  }

  const handleTrackHeaderHover = (id: number) => {
    setHoveredTrackHeader(id)
  }

  

  return (
    <div className={styles.container} onClick={handleCanvasClick}>
      <div className={styles.trackContainer}>
        {tracks.map((track) => (
          <Track 
            key={track.id} 
            track={track} 
            tabIndex={track.id}
            inFocus={focusedTrack === track.id}
            isParentTrackHeaderHovered={hoveredTrackHeader===track.id}
            onMouseEnter={() => handleTrackHeaderHover(track.id)}
            onMouseLeave={() => handleTrackHeaderHover(0)}
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