import styles from "./ProjectToolbar.module.css";
import { useTrackContext } from "@/context/TrackContext";

export default function ProjectToolbar() {

const {selectedClip, selectedTrack} = useTrackContext();

  return <div className={styles.container}>{selectedTrack}</div>;
}
