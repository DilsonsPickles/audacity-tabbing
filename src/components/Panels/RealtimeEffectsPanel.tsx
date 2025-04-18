import React from "react";
import styles from "./RealtimeEffectsPanel.module.css";
import Button from "../Buttons/Button/Button";
import PowerButton from "../Buttons/PowerButton/PowerButton";
import EffectListItem from "../ListItems/EffectListItem";
import GhostIconButton from "../Buttons/GhostIconButton/GhostIconButton";
import { useTrackContext } from "@/context/TrackContext";

type RealtimeEffectsPanelProps = {
  toggleEffectsPanel: () => void;
};

export default function RealtimeEffectsPanel({
  toggleEffectsPanel,
}: RealtimeEffectsPanelProps) {
  const { tracks, selectedTrack } = useTrackContext();

  return (
    <div id="panel-realtime-effects" tabIndex={1} className={styles.container}>
      <div id="panel-realtime-effects-header" className={styles.header} tabIndex={-1}>
        <div>Realtime effects</div>
        <GhostIconButton
          code="&#xEF14;"
          size={14}
          onClick={toggleEffectsPanel}
        />
      </div>
      <div className={styles.effectsContainer}>
        <div id="panel-realtime-effects-list-header" className={styles.effectsContainerHeader} tabIndex={1}>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <PowerButton /> {tracks[Number(selectedTrack) - 1]?.name}
          </div>
          <GhostIconButton code="&#xEF13;" size={16} />
        </div>
        <div id="panel-realtime-effects-list" className={styles.effectList}>
          <EffectListItem name="Reverb"/>
          <EffectListItem name="Distortion" />
          <EffectListItem name="Delay" />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button textCenter fullWidth tabIndex={1} id="panel-realtime-effects-add-effect-button">
          Add effect
        </Button>
      </div>
    </div>
  );
}
