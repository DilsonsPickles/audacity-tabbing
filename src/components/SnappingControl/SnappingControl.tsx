import React from "react";
import styles from "./SnappingControl.module.css";
import Checkbox from "../Controls/Checkbox";
import SnappingDropdown from "@/components/Dropdown/SnappingDropdown";

export default function SnappingControl() {
  return (
    <div id="snapping-control" className={styles.container}>
      <p>Snap</p> <Checkbox id="snapping-checkbox"/> <SnappingDropdown />
    </div>
  );
}
