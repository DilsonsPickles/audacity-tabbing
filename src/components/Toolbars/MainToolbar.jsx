import TransportButton from "../Buttons/TransportButton";
import styles from "./MainToolbar.module.css";

export default function MainToolbar() {
  // Define the transport buttons' properties in an array
  const transportButtons = [
    { tabIndex: 1, label: "Play", code: "\uF446", id: "transport-button-0" },
    { tabIndex: -1, label: "Stop", code: "\uF447", id: "transport-button-1" },
    { tabIndex: -1, label: "Record", code: "\uF44A", id: "transport-button-2" },
    { tabIndex: -1, label: "Step backwards", code: "\uF448", id: "transport-button-3" },
    { tabIndex: -1, label: "Step forwards", code: "\uF449", id: "transport-button-4" },
    { tabIndex: -1, label: "Loop", code: "\uEF1F", id: "transport-button-5" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.transport_button_container}>
        {/* Use .map() to dynamically render the buttons */}
        {transportButtons.map((button, index) => (
          <TransportButton
            key={index} // Ensure a unique key is provided
            tabIndex={button.tabIndex}
            label={button.label}
            code={button.code}
            id={button.id}
          />
        ))}
      </div>
    </div>
  );
}
