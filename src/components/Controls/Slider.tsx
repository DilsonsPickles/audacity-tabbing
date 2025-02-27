import React from "react";
import styles from "./Slider.module.css";

type SliderProps = {
  tabIndex: number;
};

function Slider({ tabIndex }: SliderProps) {
  return (
    <div tabIndex={tabIndex} className={styles.slider_container}>
      <div className={styles.slider_background}>
        <div className={styles.slider_handle}></div>
      </div>
    </div>
  );
}

export default Slider;
