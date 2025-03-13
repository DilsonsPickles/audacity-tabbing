import React from "react";
import styles from "./ButtonPrimary.module.css";
import Icon from "../../Icon";

type ButtonPrimaryProps = {
  value?: string;
  code?: string; // Unicode character for the icon
  tabIndex: number;
  ariaLabel?: string; // Optional accessibility label for the button
  fullWidth?: boolean;
  textCenter?: boolean;
  id?: string;
  children?: string;
  onClick: () => void;
  fixedWidth?: boolean;
};

export default function ButtonPrimary({
  children,
  value,
  code,
  tabIndex,
  ariaLabel,
  fullWidth,
  textCenter,
  id,
  onClick,
  fixedWidth,
}: ButtonPrimaryProps) {
  return (
    <button
      tabIndex={tabIndex}
      className={`${styles.container} ${fullWidth && styles.full_width} ${
        textCenter && styles.text_center
      } ${fixedWidth && styles.fixed_width}`}
      aria-label={ariaLabel || value} // Fallback to button's text value for screen readers
      id={id}
      onClick={onClick}
    >
      {code && <Icon code={code} size={16} />}
      {value}
      {children}
    </button>
  );
}
