import React from "react";
import styles from "./RealtimeEffectsPanel.module.css";
import { useTrackContext } from "@/context/TrackContext";

export default function RealtimeEffectsPanel() {
  const {
    selectedTrack,
    focusedTrack,
    selectedClip,
    focusedClip,
    focusedElement,
    trackControlIndex,
    clipControlIndex,
    focusedElementType,
    focusedClipPosition
  } = useTrackContext();

  return (
    <div id="panel-realtime-effects" tabIndex={1} className={styles.container}>
      <div>
        Selected track: <strong>{selectedTrack}</strong>
      </div>
      <div>
        Focused track: <strong>{focusedTrack}</strong>
      </div>
      <div>
        Selected clip:
        <strong>{selectedClip ? selectedClip : "No clip selected"}</strong>
      </div>
      <div>
        Focused clip:
        <strong>{focusedClip ? focusedClip : "No clip in focus"}</strong>
      </div>
      <div>
        Focused clip position:
        <strong>{focusedClipPosition ? focusedClipPosition : ""}</strong>
      </div>
      <div>
        Focused element: <strong>{focusedElement?.id}</strong>
      </div>
      <div>
        Focused element type: <strong>{focusedElementType}</strong>
      </div>
      <div>
        Track control index: <strong>{trackControlIndex}</strong>
      </div>
      <div>
        Clip control index: <strong>{clipControlIndex}</strong>
      </div>
    </div>
  );
}
