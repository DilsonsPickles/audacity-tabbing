import Icon from '@/components/Icon'
import React from 'react'
import styles from './IconButton.module.css'

type IconButtonProps = {
  code: string;
  tabIndex: number;
};

function IconButton({ code, tabIndex }: IconButtonProps) {
  return (
    <button tabIndex={tabIndex} className={styles.button}><Icon size={16} code={code}/></button>
  )
}

export default IconButton