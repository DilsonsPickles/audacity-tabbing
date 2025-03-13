import React, { KeyboardEvent } from "react";
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
  // Handle keydown events
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Trigger the same function as onChange
      setThemePreference();
      // Prevent default Enter behavior
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
      />
      <label htmlFor={id}>{value}</label>
    </div>
  );
}

export default Radio;