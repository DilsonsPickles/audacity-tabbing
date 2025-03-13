import React, { KeyboardEvent } from "react";
import styles from "./Checkbox.module.css";

type CheckboxProps = {
  id: string,
  name: string,
  value: string,
  children: string,
}

export default function Checkbox({id, name, value, children}:CheckboxProps) {
  // Handle keydown events
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Toggle the checkbox
      const checkbox = e.target as HTMLInputElement;
      checkbox.checked = !checkbox.checked;
      
      // Dispatch change event to ensure any onChange handlers will fire
      const changeEvent = new Event('change', { bubbles: true });
      checkbox.dispatchEvent(changeEvent);
      
      // Prevent default Enter behavior
      e.preventDefault();
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor={id}>
        {children}
      </label>
    </div>
  );
}