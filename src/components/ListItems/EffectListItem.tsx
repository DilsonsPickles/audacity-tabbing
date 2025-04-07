import React from "react";
import styles from "./EffectListItem.module.css";
import PowerButton from "../Buttons/PowerButton/PowerButton";
import Icon from "../Icon";
import EffectListItemButton from "../Buttons/EffectListItemButton/EffectListItemButton";

type EffectListItemProps = {
  name: string;
};

export default function EffectListItem({ name }: EffectListItemProps) {
  return (
    <div className={styles.container}>
      <Icon code="&#xF3A2;" size={16} />
      <PowerButton />
      <input
        style={{
          display: "flex",
          width: "100%",
          height: "24px",
          paddingLeft: "4px",
          border: `1px solid var(--stroke-primary)`,
        }}
        value={name}
        readOnly
      />
      <EffectListItemButton />
    </div>
  );
}
