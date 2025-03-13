import React, { KeyboardEvent } from "react";
import styles from './Radio.module.css'

type RadioProps = {
    label: string;
  id: string;
  name: string;
  value: string;
  themePreference: string;
  setThemePreference: () => void;
};

function Radio({
    label,
  id,
  name,
  value,
  themePreference,
  setThemePreference,
}: RadioProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setThemePreference();
      e.preventDefault();
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={themePreference === value}
        onChange={setThemePreference}
        onKeyDown={handleKeyDown}
        className={styles.radioInput}
      />
      <label htmlFor={id} className={styles.radioLabel}>{label}</label>
    </div>
  );
}

export default Radio;