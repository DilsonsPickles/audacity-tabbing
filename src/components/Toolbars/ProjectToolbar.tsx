import styles from "./ProjectToolbar.module.css";

type ProjectToolbarProps = {
  onEffectButtonClick: () => void;
  onAudioSetupButtonClick: () => void;
};

export default function ProjectToolbar({
  onEffectButtonClick,
  onAudioSetupButtonClick,
}: ProjectToolbarProps) {
  return (
    <div className={styles.container}>
      <div className={styles.navGroup}>
        <div>Home</div>
        <div>Project</div>
        <div>Share</div>
      </div>
      <div className={styles.buttonGroup}>
        <button onClick={onEffectButtonClick}>Effects</button>
        <button onClick={onAudioSetupButtonClick}>Audio setup</button>
      </div>
      <div className={styles.buttonGroup}>
        <div>Workspaces</div>
        <div>Undo</div>
      </div>
    </div>
  );
}
