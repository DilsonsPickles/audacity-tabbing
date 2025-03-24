import { focusElement } from "@/helper/focusElement";

export function handleTrackNavigation(
  event: KeyboardEvent,
  trackControlIndex: number,
  totalTrackControls: number,
  setTrackControlIndex: (newIndex: number) => void,
  focusedTrack: number,
  focusedElement: HTMLElement | null,
  setFocusedTrack: (newTrack: number) => void,
  exitTabbing: () => void,
  setPlayheadPosition: React.Dispatch<React.SetStateAction<number>>,
) {
  function navigateInternalTrackHeader(
    event: KeyboardEvent,
    direction: -1 | 1
  ) {
    event.preventDefault();
    const newIndex =
      (trackControlIndex + direction + totalTrackControls) % totalTrackControls;
    setTrackControlIndex(newIndex); // Update the track control index

    const newControl = document.getElementById(
      `track-${focusedTrack}-control-${newIndex}`
    );
    if (newControl) {
      newControl.focus();
    } else {
      console.warn(
        `No valid control found for track-${focusedTrack}-control-${newIndex}`
      );
    }
  }

  function navigateToAdjacentTrackHeader(
    event: KeyboardEvent,
    direction: -1 | 1
  ) {
    event.preventDefault();
    const newTrack = focusedTrack + direction;
    if (newTrack < 0) return; // Prevents out-of-bounds navigation

    const header = document.getElementById(`track-${newTrack}-control-0`);
    if (header) {
      header.focus();
      setFocusedTrack(newTrack);
    } else {
      console.warn(`No valid track header found for track-${newTrack}`);
    }
  }

  switch (event.key) {
    case "ArrowUp":
      if (focusedElement?.id.includes(`track-${focusedTrack}-control-0`)) {
        navigateToAdjacentTrackHeader(event, -1);
      } else if (
        focusedElement?.id.includes(`track-${focusedTrack}-control-`)
      ) {
        navigateInternalTrackHeader(event, -1); // Move left in the internal track header tab group
      }
      break;
    case "ArrowRight":
      if (focusedElement?.id.includes(`track-${focusedTrack}-control-`)) {
        navigateInternalTrackHeader(event, 1); // Move right in the internal track header tab group
      }
      break;
    case "ArrowDown":
      if (focusedElement?.id.includes(`track-${focusedTrack}-control-0`)) {
        navigateToAdjacentTrackHeader(event, 1);
      } else if (
        focusedElement?.id.includes(`track-${focusedTrack}-control-`)
      ) {
        navigateInternalTrackHeader(event, 1); // Move left in the internal track header tab group
      }
      break;
    case "ArrowLeft":
      if (focusedElement?.id.includes(`track-${focusedTrack}-control-`)) {
        navigateInternalTrackHeader(event, -1); // Move left in the internal track header tab group
      }
      break;
    case "Tab":
      if (
        focusedElement?.id.includes(`track-${focusedTrack}-control-`) &&
        !focusedElement.id.includes(`track-${focusedTrack}-control-0`)
      ) {
        event.preventDefault();
        setTrackControlIndex(0); // Reset the control index to the first one
        const firstClip = document.getElementById(`clip-${focusedTrack}-1`);
        if (firstClip) {
          focusElement(firstClip.id);
        }
      }
      break;
    case "Escape":
      if (
        focusedElement?.id.includes(`track-${focusedTrack}-control-`) &&
        !focusedElement.id.includes(`track-${focusedTrack}-control-0`)
      ) {
        document.getElementById(`track-${focusedTrack}-control-0`)?.focus();
        setTrackControlIndex(0);
      } else {
        exitTabbing();
      }
      break;
    case "Enter":
      if (focusedElement?.id === "add-new-track-button") {
        console.log("Enter pressed on add new track button")
        focusElement("add-new-track-flyout-index-0");
      }
      break;
      case ",":
        setPlayheadPosition((prev) => prev - 1); // Move playhead to the left
        break;
      case ".":
        setPlayheadPosition((prev) => prev + 1); // Move playhead to the left
        break;
      default: 
      break;
  }
}
