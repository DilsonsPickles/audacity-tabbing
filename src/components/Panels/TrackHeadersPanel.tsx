import React from "react";
import styles from "./TrackHeadersPanel.module.css";
import TrackHeader from "../Tracks/TrackHeader";
import Button from "../Buttons/Button/Button";

type Track = {
  name: string;
  id: number;
};

type TrackHeadersPanelProps = {
  tracks: Track[];
  focusedTrack: number;
  setFocusedTrack: (id: number) => void;
  selectedTrack: number; // Receive selected track ID
  setSelectedTrack: (id: number) => void; // Receive the function to update the selected track
};

export default function TrackHeadersPanel({
  tracks,
  selectedTrack,
  setSelectedTrack,
  focusedTrack,
  setFocusedTrack,
}: TrackHeadersPanelProps) {
  const handleTrackHeaderClick = (id: number) => {
    setSelectedTrack(id);
    setFocusedTrack(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <p>Tracks</p>
        </div>
        <Button tabIndex={1} value="Add new" code="&#xEF2A;" />
      </div>
      <div className={styles.track_headers_list}>
        {tracks.map((track) => (
          <TrackHeader
            key={track.id}
            name={track.name}
            tabIndex={track.id}
            isSelected={selectedTrack === track.id} // Pass selected status to TrackHeader
            inFocus={focusedTrack === track.id}
            onClick={() => handleTrackHeaderClick(track.id)} // Handle click
            focusedTrack={focusedTrack}
            setFocusedTrack={setFocusedTrack}
          />
        ))}
      </div>
    </div>
  );
}
