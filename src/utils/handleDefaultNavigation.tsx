import { focusElement } from "@/helper/focusElement";

export function handleDefaultNavigation(
  event: KeyboardEvent,
  focusedTrack: number,
  setFocusedTrack: (focusedTrack: number) => void,
  setSelectedTrack: (focusedTrack: number[]) => void,
  exitTabbing: () => void,
  setMainToolbarIndex: (index: number) => void,
  setPlayheadPosition: React.Dispatch<React.SetStateAction<number>>,
  focusedElement: HTMLElement | null
) {
  switch (event.key) {
    case "ArrowUp":
      {
        setFocusedTrack(focusedTrack - 1);
      }
      break;
    case "ArrowRight":
    case ".":
      {
        setPlayheadPosition((prev) => prev + 1); // Move playhead to the right
        event.preventDefault();
      }
      break;
    case "ArrowDown":
      {
        setFocusedTrack(focusedTrack + 1);
      }
      break;
    case "ArrowLeft":
    case ",":
      {
        setPlayheadPosition((prev) => prev - 1); // Move playhead to the left
        event.preventDefault();
      }
      break;
    case "Enter":
      setSelectedTrack([focusedTrack]);
      if (focusedElement?.id === "add-new-track-button") {
        console.log("Enter pressed on add new track button");
        focusElement("add-new-track-flyout-index-0");
      }
      break;
    case "Escape":
      exitTabbing();
      setMainToolbarIndex(0);
      break;
  }
}
