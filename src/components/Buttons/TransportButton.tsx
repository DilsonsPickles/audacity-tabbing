import React from 'react'
import Icon from '../Icon';
import styles from './TransportButton.module.css';

type TransportButtonProps = {
    code: string; // Unicode character for the icon
    label: string;
    tabIndex: number;
  };
  

export default function TransportButton({ code, label, tabIndex }: TransportButtonProps) {

  return (
    <button tabIndex={tabIndex} aria-label={label} className={styles.button}><Icon code={code} size={16} /></button>
  )
}
