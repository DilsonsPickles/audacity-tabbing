import React from "react";
import styles from "./Button.module.css";
import Icon from "../../Icon";

type ButtonProps = {
  value?: string;
  code?: string; // Unicode character for the icon
  tabIndex: number;
  ariaLabel?: string; // Optional accessibility label for the button
  fullWidth?: boolean;
  textCenter?: boolean;
  id?: string;
  children?: string;
  onClick?: () => void;
  fixedWidth?: boolean;
};

const Button = ({
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
}: ButtonProps) => {
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
};

export default Button;
