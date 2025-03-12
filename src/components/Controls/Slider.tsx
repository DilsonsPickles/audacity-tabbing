import React from "react";
import styles from "./Slider.module.css";

type SliderProps = {
  tabIndex: number;
  id: string;
  isSelected: boolean;
};

const Slider = ({ tabIndex, id, isSelected }: SliderProps) => {
  return (
    <div tabIndex={tabIndex} className={styles.slider_container} id={id}>
      <div className={styles.slider_background}>
        <div className={`${styles.slider_value} ${isSelected && styles.selected}`}></div>
      </div>
      <div className={styles.slider_handle}></div>
    </div>
  );
};

export default Slider;
