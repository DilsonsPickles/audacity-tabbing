import React from 'react'
import Icon from '../Icon';
import styles from './TransportButton.module.css';

type TransportButtonProps = {
    code: string; // Unicode character for the icon
    label: string;
    tabIndex: number;
    id: string;
  };
  

export default function TransportButton({ code, label, tabIndex, id }: TransportButtonProps) {

  return (
    <button id={id} tabIndex={tabIndex} aria-label={label} className={styles.button}><Icon code={code} size={16} /></button>
  )
}
