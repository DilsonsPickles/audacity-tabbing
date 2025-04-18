import React from "react";
import styles from "./TrackHeadersPanel.module.css";
import TrackHeader from "@/components/Tracks/TrackHeader";
import AddNewTrackButton from "@/components/Buttons/AddNewTrackButton/AddNewTrackButton";
import AddNewTrackFlyout from '@/components/Flyouts/AddNewTrackFlyout';
import { useTrackContext } from "@/context/TrackContext";
import { usePanelContext } from "@/context/PanelContext";

export default function TrackHeadersPanel() {
  const {
    tracks,
    selectedTrack,
    setSelectedTrack,
    focusedTrack,
    setFocusedTrack,
    setHoveredTrackHeader,
  } = useTrackContext();

  const { isAddNewTrackPanelOpen, toggleIsAddNewTrackPanelOpen } = usePanelContext();

  const handleTrackHeaderClick = (id: number) => {
    // Select the clicked track and deselect any previously selected track
    setSelectedTrack([id]); // This ensures that only the clicked track is selected
    setFocusedTrack(id); // Focus the track as well
  };

  const handleTrackHeaderFocus = (id: number) => {
    setFocusedTrack(id);
  };

  const handleTrackHeaderHover = (id: number) => {
    setHoveredTrackHeader(id)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isAddNewTrackPanelOpen && <AddNewTrackFlyout/>}
          <p>Tracks</p>
        <AddNewTrackButton id="add-new-track-button" tabIndex={1} value="Add new" code="&#xEF2A;" onClick={toggleIsAddNewTrackPanelOpen}/>
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
            onMouseEnter={() => handleTrackHeaderHover(track.id)}
            onMouseLeave={() => handleTrackHeaderHover(0)}
          />
        ))}
      </div>
    </div>
  );
}
