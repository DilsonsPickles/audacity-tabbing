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
      <div id="toolbar-project-group-1" className={styles.navGroup}>
        <div tabIndex={1} id="toolbar-project-group-1-item-0">
          Home
        </div>
        <div tabIndex={-1} id="toolbar-project-group-1-item-1">
          Project
        </div>
        <div tabIndex={-1} id="toolbar-project-group-1-item-2">
          Share
        </div>
      </div>
      <div id="toolbar-project-group-2" className={styles.buttonGroup}>
        <button
          tabIndex={1}
          id="toolbar-project-group-2-item-0"
          onClick={onEffectButtonClick}
        >
          Effects
        </button>
        <button
        tabIndex={-1}
          id="toolbar-project-group-2-item-1"
          onClick={onAudioSetupButtonClick}
        >
          Audio setup
        </button>
      </div>
      <div className={styles.buttonGroup} id="toolbar-project-group-3">
        <div tabIndex={1} id="toolbar-project-group-3-item-0">
          Workspaces
        </div>
        <div id="toolbar-project-group-3-item-0">Undo</div>
      </div>
    </div>
  );
}
