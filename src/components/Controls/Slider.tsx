import React from "react";
import styles from "./Slider.module.css";

type SliderProps = {
  tabIndex: number;
  id: string;
};

const Slider = ({ tabIndex, id }: SliderProps) => {
  return (
    <div tabIndex={tabIndex} className={styles.slider_container} id={id}>
      <div className={styles.slider_background}>
        <div className={styles.slider_handle}></div>
      </div>
    </div>
  );
};

export default Slider;