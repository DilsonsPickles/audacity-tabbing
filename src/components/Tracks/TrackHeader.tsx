import styles from "./TrackHeader.module.css";
import GhostIconButton from "../Buttons/GhostIconButton/GhostIconButton";
import Button from "../Buttons/Button/Button";
import IconButton from "../Buttons/IconButton/IconButton";
import Knob from "../Controls/Knob";
import Slider from "../Controls/Slider";
import TrackNameInput from "../InputFields/TrackNameInput";

type TrackHeaderProps = {
  name: string;
  tabIndex: number;
  isSelected: boolean; // Track whether this track is selected
  inFocus: boolean;
  onClick: () => void; // Handle click to select this track
  focusedTrack: number;
  setFocusedTrack: (id: number) => void;
};

export default function TrackHeader({
  name,
  tabIndex,
  isSelected,
  inFocus,
  onClick,
  focusedTrack,
  setFocusedTrack,
}: TrackHeaderProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab" && event.shiftKey) {
      setFocusedTrack(focusedTrack - 1);
    }
  };

  return (
    <div
      className={`${styles.track_header_container} ${
        isSelected ? styles.selected : ""
      } ${inFocus ? styles.focused : ""}`}
      onClick={onClick} // Trigger the onClick handler when clicked
      onKeyDown={handleKeyDown}
    >
      <div tabIndex={tabIndex} className={styles.track_header_handle}></div>

      <div className={styles.track_content_container}>
        <div className={styles.track_header_info}>
          <div style={{ display: "flex", gap: "4px" }}>
            <GhostIconButton tabIndex={-1} code="&#xF41B;" size={16} />
            <TrackNameInput tabIndex={-1} value={name} />
          </div>
          <GhostIconButton tabIndex={-1} code="&#xEF13;" size={16} />
        </div>
        <div className={styles.track_header_controls}>
          <Knob tabIndex={-1} />
          <Slider tabIndex={-1} />
          <div style={{ display: "flex", gap: "4px" }}>
            <IconButton tabIndex={-1} code="&#xF3D5;" />
            <IconButton tabIndex={-1} code="&#xF3D6;" />
          </div>
        </div>

        <Button fullWidth textCenter tabIndex={-1} value="Effects" />
      </div>
    </div>
  );
}
