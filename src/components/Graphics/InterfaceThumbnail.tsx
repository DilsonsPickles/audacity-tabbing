import React from "react";
import styles from "./InterfaceThumbnail.module.css";
import Radio from "@/components/Controls/Radio";

type InterfaceProps = {
  label: string,
  theme: string;
  id: string;
  name: string;
  value: string;
  themePreference: string;
  setThemePreference: () => void;
};

export default function InterfaceThumbnail({
  label,
  theme,
  id,
  name,
  value,
  themePreference,
  setThemePreference,
}: InterfaceProps) {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.thumbnail} ${
          theme === "light" ? styles.light : styles.dark
        }`}
      />
      <Radio
        label={label}
        id={id}
        name={name}
        value={value}
        themePreference={themePreference}
        setThemePreference={setThemePreference}
      />
    </div>
  );
}
