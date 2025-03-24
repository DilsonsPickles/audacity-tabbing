import { focusElement } from "@/helper/focusElement";

export function handleClipControlNavigation(
  event: KeyboardEvent,
  focusedTrack: number,
  focusedClipPosition: number,
  setFocusedClip: (name: string) => void,
  clipControlIndex: number,
  setClipControlIndex: (newIndex: number) => void,
  selectedClip: string[],
  focusedElement: HTMLElement | null,
  setPlayheadPosition: React.Dispatch<React.SetStateAction<number>>,

) {
  // Update totalClipControls based on whether there are any selected clips
  const totalClipControls = selectedClip.length > 0 ? 7 : 3;

  // Helper to set focus on a specific clip control by index
  function setFocusOnClipControl(newIndex: number): void {
    const newClipControl = document.getElementById(
      `clip-${focusedTrack}-${focusedClipPosition}-control-${newIndex}`
    );

    if (newClipControl) {
      newClipControl.focus();
    } else {
      console.warn(
        `No valid control found for clip-${focusedTrack}-${focusedClipPosition}-control-${newIndex}`
      );
    }
  }

  // Update the clip control index and handle wrapping logic
  function updateClipControlIndex(
    prevIndex: number,
    direction: -1 | 1
  ): number {
    return (prevIndex + direction + totalClipControls) % totalClipControls; // Wrapping index calculation
  }

  // Function to handle internal clip control navigation
  function navigateInternalClipControl(direction: -1 | 1): void {
    event.preventDefault(); // Prevent default behavior
    const newIndex = updateClipControlIndex(clipControlIndex, direction); // Update the index directly
    setClipControlIndex(newIndex); // Set the new index directly
    setFocusOnClipControl(newIndex); // Set focus on the new control
  }

  // Get the current clip element for handling Escape or Tab focus
  const currentClip = document.getElementById(
    `clip-${focusedTrack}-${focusedClipPosition}`
  );

  switch (event.key) {
    case ",":
      setPlayheadPosition((prev) => prev - 1); // Move playhead to the left
      break;
    case ".":
      setPlayheadPosition((prev) => prev + 1); // Move playhead to the left
      break;
    case "ArrowUp":
    case "ArrowLeft":
      console.log("Arrow up or left");
      navigateInternalClipControl(-1); // Move up or left
      break;
    case "ArrowRight":
    case "ArrowDown":
      console.log("Arrow right or down");
      navigateInternalClipControl(1); // Move down or right
      break;
    case "Escape":
      if (currentClip) currentClip.focus(); // Focus back on the clip itself
      setFocusedClip(""); // Clear the focused clip state
      setClipControlIndex(0); // Reset the clip control index
      break;
    case "Tab":
      if (currentClip) {
        currentClip.focus(); // Focus back on the clip itself
        setFocusedClip(""); // Clear the focused clip state
      }
      break;
    case "Enter":
      if (
        focusedElement?.id.includes("-control-2") ||
        focusedElement?.id.includes("-control-4")
      ) {
        focusElement("context-menu-clip-item-0")
      }
      break;
    default:
      console.log(`Unhandled key: ${event.key}`); // Log any unsupported keys
      break;
  }
}
