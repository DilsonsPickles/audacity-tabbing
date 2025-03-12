import React from "react";
import styles from "./PreferenceNavItem.module.css";

type PreferenceNavItemProps = {
  name: string;
  id: string;
  tabIndex: number;
  onClick: () => void;
  isSelected: boolean,
};

export default function PreferenceNavItem({
  name,
  id,
  tabIndex,
  onClick,
  isSelected,
}: PreferenceNavItemProps) {
  return (
    <div className={`${styles.container} ${isSelected && styles.selected}`} id={id} tabIndex={tabIndex} onClick={onClick}>
      {name}
    </div>
  );
}
