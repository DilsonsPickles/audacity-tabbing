import React from 'react';
import styles from './Knob.module.css';

type KnobProps = {
  tabIndex: number;
  id: string;
};

const Knob = ({ tabIndex, id }: KnobProps) => {
  return (
    <div tabIndex={tabIndex} className={styles.knob_container} id={id}>
      <div className={styles.knob_guage}>
        <div className={styles.knob_value}></div>
        <div className={styles.knob_dial}>
          <span className={styles.knob_dial_marker}></span>
        </div>
      </div>
    </div>
  );
};

export default Knob;