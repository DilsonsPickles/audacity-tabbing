import React from 'react'
import Icon from '@/components/Icon';
import styles from './ToolButton.module.css';

type ToolButtonProps = {
    code: string; // Unicode character for the icon
    label?: string;
    tabIndex?: number;
    id?: string;
  };
  

export default function ToolButton({ code, label, tabIndex, id }: ToolButtonProps) {

  return (
    <button id={id} tabIndex={tabIndex} aria-label={label} className={styles.button}><Icon code={code} size={16} /></button>
  )
}
