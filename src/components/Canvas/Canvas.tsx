import React from "react";
import styles from "./Canvas.module.css";
import Measure from "../Gridlines/Measure";
import Track from "../Tracks/Track";
import { useTrackContext } from "@/context/TrackContext";

function Canvas() {
  const { tracks, focusedTrack } = useTrackContext();

  return (
    <div className={styles.container}>
      <div className={styles.trackContainer}>
        {tracks.map((track) => (
          <Track 
            key={track.id} 
            track={track} 
            tabIndex={track.id}
            inFocus={focusedTrack === track.id}
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