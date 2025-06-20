import styles from "./TrackHeader.module.css";
import GhostIconButton from "../Buttons/GhostIconButton/GhostIconButton";
import Button from "../Buttons/Button/Button";
import IconButton from "../Buttons/IconButton/IconButton";
import Knob from "../Controls/Knob";
import Slider from "../Controls/Slider";
import TrackNameInput from "../InputFields/TrackNameInput";
import { usePanelContext } from "@/context/PanelContext";

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
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export default function TrackHeader({
  name,
  tabIndex,
  isSelected,
  inFocus,
  onClick,
  onFocus,
  id,
  onMouseEnter,
  onMouseLeave,
}: TrackHeaderProps) {
  const { openEffectsPanel } = usePanelContext();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      onClick();
    }
  };

  return (
    <div
      id={`track-${id}-control-0`}
      tabIndex={tabIndex}
      className={`${styles.track_header_container} ${
        isSelected && styles.selected
      } ${inFocus && styles.focused}`}
      onFocus={onFocus}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={handleKeyDown}
    >
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
          <Slider
            tabIndex={-1}
            id={`track-${id}-control-5`}
            isSelected={isSelected}
          />
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
          onClick={openEffectsPanel}
        />
      </div>
      <div className={styles.track_header_playback_meter_container}>
        <div className={styles.track_header_playback_meter}>
          <div className={styles.playback_meter_clipping_zone}/>
        </div>
      </div>
    </div>
  );
}
