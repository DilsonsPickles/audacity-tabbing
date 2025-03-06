import TransportButton from "../Buttons/TransportButton/TransportButton";
import ToolButton from "@/components/Buttons/ToolButton/ToolButton"
import PlaybackTimecode from "@/components/Timecode/PlaybackTimecode"
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
  const toolButtons = [
    { tabIndex: -1, label: "Automation", code: "\uF45C", id: "transport-button-6" },
    { tabIndex: -1, label: "Zoom in", code: "\uEF18", id: "transport-button-7" },
    { tabIndex: -1, label: "Zoom out", code: "\uF438", id: "transport-button-8" },
    { tabIndex: -1, label: "Fit selection to width", code: "\uF439", id: "transport-button-9" },
    { tabIndex: -1, label: "Fit project to width", code: "\uF437", id: "transport-button-10" },
    { tabIndex: -1, label: "Zoom toggle", code: "\uEF1F", id: "transport-button-11" },
    { tabIndex: -1, label: "Cut", code: "\uF39A", id: "transport-button-12" },
    { tabIndex: -1, label: "Copy", code: "\uF398", id: "transport-button-13" },
    { tabIndex: -1, label: "Paste", code: "\uF399", id: "transport-button-14" },
    { tabIndex: -1, label: "Silence", code: "\uF43A", id: "transport-button-15" },
    { tabIndex: -1, label: "Trim", code: "\uF43B", id: "transport-button-16" },
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
      <div className={styles.tools_button_container}>
        {/* Use .map() to dynamically render the buttons */}
        {toolButtons.map((button, index) => (
          <ToolButton
            key={index} // Ensure a unique key is provided
            tabIndex={button.tabIndex}
            label={button.label}
            code={button.code}
            id={button.id}
          />
        ))}
      </div>
      <PlaybackTimecode id="transport-button-17"/>
    </div>
  );
}
