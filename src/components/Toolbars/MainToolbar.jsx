import TransportButton from "../Buttons/TransportButton";
import styles from "./MainToolbar.module.css";

export default function MainToolbar() {
  return (
    <div className={styles.container}>
      <div  className={styles.transport_button_container}>
        <TransportButton tabIndex={1} label="Play" code="&#xF446;" />
        <TransportButton tabIndex={1} label="Stop" code="&#xF447;" />
        <TransportButton tabIndex={1} label="Record" code="&#xF44A;" />
        <TransportButton tabIndex={1} label="Step backwards" code="&#xF448;" />
        <TransportButton tabIndex={1} label="Step forwards" code="&#xF449;" />
        <TransportButton tabIndex={1} label="Loop" code="&#xEF1F;" />
      </div>
    </div>
  );
}
