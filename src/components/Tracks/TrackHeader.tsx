import styles from "./TrackHeader.module.css";
import GhostIconButton from "../Buttons/GhostIconButton/GhostIconButton";
import Button from "../Buttons/Button/Button";
import IconButton from "../Buttons/IconButton/IconButton";
import Knob from "../Controls/Knob";
import Slider from "../Controls/Slider";
import TrackNameInput from "../InputFields/TrackNameInput";
import Icon from "../Icon";

type TrackHeaderProps = {
  name: string;
  tabIndex: number;
  isSelected: boolean; // Track whether this track is selected
  inFocus: boolean;
  onClick: () => void; // Handle click to select this track
  focusedTrack: number;
  setFocusedTrack: (id: number) => void;
  onFocus: () => void;
  id: number;
};

export default function TrackHeader({
  name,
  tabIndex,
  isSelected,
  inFocus,
  onClick,
  onFocus,
  id,
}: TrackHeaderProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      onClick();
    }
  };

  return (
    <div
      className={`${styles.track_header_container} ${
        isSelected && styles.selected
      } ${inFocus && styles.focused}`}
      onFocus={onFocus}
      >
      <div
        id={`track-${id}-control-0`}
        tabIndex={tabIndex}
        className={`${styles.track_header_handle} ${
          isSelected && styles.selected
        }`}
        onKeyDown={handleKeyDown}
        aria-label={`mono track ${id} grab handle`}
        role="button"
      >
        <div
          className={`${styles.track_header_handle_background} ${
            isSelected && styles.selected
          }`}
        ></div>
        <Icon code="&#xF347;" size={14} />
      </div>

      <div className={styles.track_content_container}>
        <div className={styles.track_header_info}>
          <div style={{ display: "flex", gap: "4px" }}>
            <GhostIconButton
              tabIndex={-1}
              code="&#xF41B;"
              size={16}
              id={`track-${id}-control-1`}
            />
            <TrackNameInput
              tabIndex={-1}
              value={name}
              id={`track-${id}-control-2`}
            />
          </div>
          <GhostIconButton
            tabIndex={-1}
            code="&#xEF13;"
            size={16}
            id={`track-${id}-control-3`}
          />
        </div>
        <div className={styles.track_header_controls}>
          <Knob tabIndex={-1} id={`track-${id}-control-4`} />
          <Slider tabIndex={-1} id={`track-${id}-control-5`} />
          <div style={{ display: "flex", gap: "4px" }}>
            <IconButton
              tabIndex={-1}
              code="&#xF3D5;"
              id={`track-${id}-control-6`}
            />
            <IconButton
              tabIndex={-1}
              code="&#xF3D6;"
              id={`track-${id}-control-7`}
            />
          </div>
        </div>

        <Button
          fullWidth
          textCenter
          tabIndex={-1}
          value="Effects"
          id={`track-${id}-control-8`}
        />
      </div>
    </div>
  );
}
