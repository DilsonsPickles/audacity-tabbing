import React from "react";
import styles from "./TrackHeadersPanel.module.css";
import TrackHeader from "../Tracks/TrackHeader";
import Button from "../Buttons/Button/Button";
import { useTrackContext } from "@/context/TrackContext";

export default function TrackHeadersPanel() {
  const {
    tracks,
    selectedTrack,
    setSelectedTrack,
    focusedTrack,
    setFocusedTrack,
  } = useTrackContext();

  const handleTrackHeaderClick = (id: number) => {
    // Select the clicked track and deselect any previously selected track
    setSelectedTrack([id]); // This ensures that only the clicked track is selected
    setFocusedTrack(id); // Focus the track as well
  };

  const handleTrackHeaderFocus = (id: number) => {
    setFocusedTrack(id)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <p>Tracks</p>
        </div>
        <Button tabIndex={1} value="Add new" code="&#xEF2A;"  />
      </div>
      <div className={styles.track_headers_list}>
        {tracks.map((track) => (
          <TrackHeader
            id={track.id}
            key={track.id}
            name={track.name}
            tabIndex={track.id}
            isSelected={selectedTrack.includes(track.id)}
            inFocus={focusedTrack === track.id}
            onClick={() => handleTrackHeaderClick(track.id)}
            focusedTrack={focusedTrack}
            setFocusedTrack={setFocusedTrack}
            onFocus={() => handleTrackHeaderFocus(track.id)}
          />
        ))}
      </div>
    </div>
  );
}