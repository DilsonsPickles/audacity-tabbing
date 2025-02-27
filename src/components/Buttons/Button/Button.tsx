import React from 'react';
import styles from './Button.module.css';
import Icon from '../../Icon';

type ButtonProps = {
  value: string;
  code?: string; // Unicode character for the icon
  tabIndex: number;
  ariaLabel?: string; // Optional accessibility label for the button
  fullWidth?: boolean;
  textCenter?: boolean;
};

export default function Button({ value, code, tabIndex, ariaLabel, fullWidth, textCenter}: ButtonProps) {
  return (
    <button 
      tabIndex={tabIndex} 
      className={`${styles.container} ${fullWidth ? styles.full_width : ''} ${textCenter ? styles.text_center : ''}`}
      aria-label={ariaLabel || value} // Fallback to button's text value for screen readers
    >
      {code && <Icon code={code} size={16} />} 
      {value}
    </button>
  );
}