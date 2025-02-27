import React from 'react'
import styles from './TrackNameInput.module.css'

type TrackNameInputProps = {    
    tabIndex: number;
    value: string;
};

function TrackNameInput({tabIndex, value}: TrackNameInputProps) {
  return (
    <input className={styles.input} tabIndex={tabIndex} value={value} readOnly></input>
  )
}

export default TrackNameInput