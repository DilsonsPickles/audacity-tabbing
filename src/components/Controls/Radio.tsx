import React from "react";
import styles from './Radio.module.css'

type RadioProps = {
  id: string;
  name: string;
  value: string;
  themePreference: string;
  setThemePreference: () => void;
};

function Radio({
  id,
  name,
  value,
  themePreference,
  setThemePreference,
}: RadioProps) {
  return (
    <div className={styles.container}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={themePreference == value}
        onChange={setThemePreference}
      />
      <label>{value}</label>
    </div>
  );
}

export default Radio;
