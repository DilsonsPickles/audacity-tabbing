import { findValidClip } from "@/helper/findValidClip";
import { focusElement } from "@/helper/focusElement";

export function handleClipNavigation(
  event: KeyboardEvent,
  focusedTrack: number,
  focusedClipPosition: number,
  setFocusedClipPosition: (pos: number) => void,
  focusedElement: HTMLElement | null,
  setFocusedClip: (id: string) => void,
  exitTabbing: () => void,
  setFocusedTrack: (newTrack: number) => void,
  setPlayheadPosition: React.Dispatch<React.SetStateAction<number>>
) {
  // Helper to navigate to the adjacent track clip
  function navigateToAdjacentTrackClip(direction: -1 | 1) {
    event.preventDefault();
    const newTrack = focusedTrack + direction;
    if (newTrack < 0) return; // Prevent out-of-bounds navigation

    const { clip, attemptPosition } = findValidClip(
      newTrack,
      focusedClipPosition
    );
    if (clip) {
      clip.focus();
      setFocusedTrack(newTrack);
      setFocusedClipPosition(attemptPosition);
    } else {
      console.warn(`No valid clip found on track-${newTrack}`);
    }
  }

  // Helper to get the clip element for a given position
  const getClipElement = (position: number) =>
    document.getElementById(`clip-${focusedTrack}-${position}`);

  // Get the current clip element
  const currentClip = getClipElement(focusedClipPosition);

  // Handle navigation based on the event key
  const handleArrowNavigation = (direction: -1 | 1) => {
    event.preventDefault();
    const targetClip = getClipElement(focusedClipPosition + direction);
    if (targetClip) {
      targetClip.focus();
      setFocusedClipPosition(focusedClipPosition + direction);
    }
  };

  switch (event.key) {
    case ",":
      setPlayheadPosition((prev) => prev - 1); // Move playhead to the left
      break;
    case ".":
      setPlayheadPosition((prev) => prev + 1); // Move playhead to the left
      break;
    case "ArrowUp":
    case "w":
      navigateToAdjacentTrackClip(-1); // Navigate up
      break;
    case "ArrowRight":
      handleArrowNavigation(1); // Navigate right
      event.preventDefault(); // Prevent default to avoid other actions
      break;
    case "ArrowDown":
    case "s":
      navigateToAdjacentTrackClip(1); // Navigate down
      break;
    case "ArrowLeft":
      handleArrowNavigation(-1); // Navigate left
      event.preventDefault(); // Prevent default to avoid other actions
      break;
    case "a":
      handleArrowNavigation(-1); // Navigate left
      break;
    case "d":
      handleArrowNavigation(1); // Navigate right
      break;
    case "Enter":
      if (focusedElement?.id.includes("clip") && currentClip) {
        setFocusedClip(currentClip.id); // Set the focused clip
        focusElement(`${currentClip.id}-control-0`);
      }
      break;
    case "Tab":
      if (focusedElement?.id.includes("clip") && event.shiftKey) {
        console.log(focusedTrack);
        focusElement(`track-${focusedTrack}-control-0`);
        event.preventDefault();
      } else if (focusedElement?.id.includes("clip-3-")) {
        focusElement("toolbar-bottom");
        event.preventDefault();
      } else if (focusedElement?.id.includes("clip")) {
        focusElement(`track-${focusedTrack + 1}-control-0`);
        event.preventDefault();
      }

      break;
    case "Escape":
      exitTabbing(); // Exit tabbing mode
      break;
    default:
      break;
  }
}
