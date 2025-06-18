import React from 'react';
import styles from './ToolbarDivider.module.css';

function ToolbarDivider() {
  return (
    <div className={styles.container}><span className={styles.divider}/></div>
  )
}

export default ToolbarDivider