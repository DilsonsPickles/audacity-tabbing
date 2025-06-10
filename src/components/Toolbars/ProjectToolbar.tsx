import { usePanelContext } from "@/context/PanelContext";
import styles from "./ProjectToolbar.module.css";
import { useTrackContext } from "@/context/TrackContext";
import GhostButton from '@/components/Buttons/GhostButton/GhostButton'



export default function ProjectToolbar() {

const {toggleIsPreferencePanelOpen, openEffectsPanel, closeEffectsPanel, isEffectsPanelOpen} = usePanelContext();
const {focusedElement} = useTrackContext();

  return (
    <div className={styles.container}>
      <div id="toolbar-project-group-1" className={styles.navGroup}>
        <div className={styles.navItem} tabIndex={1} id="toolbar-project-group-1-item-0">
          Home
        </div>
        <div className={`${styles.navItem} ${styles.selected}`} tabIndex={-1} id="toolbar-project-group-1-item-1">
          Project
        </div>
        <div className={styles.navItem} tabIndex={-1} id="toolbar-project-group-1-item-2">
          Share
        </div>
      </div>
      
      <div id="toolbar-project-group-2" className={styles.buttonGroup}>
        <GhostButton tabIndex={1} id="toolbar-project-group-2-item-0" code="&#xEF27;" size={16} onClick={isEffectsPanelOpen ? closeEffectsPanel : openEffectsPanel}>Mixer</GhostButton>
        <GhostButton tabIndex={-1} id="toolbar-project-group-2-item-1" code="&#xEF51;" size={16}  onClick={toggleIsPreferencePanelOpen}>Audio setup</GhostButton>

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
