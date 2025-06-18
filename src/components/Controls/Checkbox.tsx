"use client";
import React, { useState } from "react";
import styles from "./Checkbox.module.css";
import Icon from "../Icon";

type CheckboxProps = {
  id: string;
}

export default function Checkbox({ id }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

return (
  <label htmlFor={id} className={styles.container}>
    <input
      type="checkbox"
      id={id}
      checked={isChecked}
      onChange={handleChange}
      className={styles.checkboxInput}
      aria-label="Toggle checkbox"
    />
    <span className={styles.customCheckbox}>{isChecked && <Icon code="&#xEF31;" size={16}/>}</span>
  </label>
);
}