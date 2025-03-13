import React from 'react'
import styles from './AccentColor.module.css'

type AccentColorCircleProps = {
  color: string,
  index: number,
  isSelected?: boolean,
  onClick?: () => void
}

function AccentColorCircle({color, isSelected = false, onClick, index}: AccentColorCircleProps) {
  return (
    <div 
      id={`preference-accent-color-${index}`}
      className={`${styles.container} ${styles[color]} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={index === 0 ? 0 : -1}
      aria-label={`Select ${color} accent color`}
    />
  )
}

export default AccentColorCircle