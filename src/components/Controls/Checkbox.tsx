import React from "react";
import styles from "./Checkbox.module.css";

type CheckboxProps = {
  id: string,
  name: string,
  value: string,
  children: string,
}

export default function Checkbox({id, name, value, children}:CheckboxProps) {
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
      />
      <label htmlFor={`${id}`}>
        {children}
      </label>
    </div>
  );
}
