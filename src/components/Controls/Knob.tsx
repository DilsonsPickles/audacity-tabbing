import React from 'react'
import styles from './Knob.module.css'

type KnobProps = {
    tabIndex: number;
  };

export default function Knob({tabIndex}: KnobProps) { 
  return (
    <div tabIndex={tabIndex} className={styles.knob_container}>
        <div className={styles.knob_guage}>
            <div className={styles.knob_value}></div>
            <div className={styles.knob_dial}>
                <span className={styles.knob_dial_marker}></span>
            </div>
        </div>
    </div>
  )
}