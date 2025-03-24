import { focusElement } from "@/helper/focusElement";

export function handleMainToolbarNavigation(
  event: KeyboardEvent,
  mainToolbarIndex: number,
  setMainToolbarIndex: (newIndex: number) => void,
  exitTabbing: () => void, 
  focusedElement: HTMLElement | null,
  setPlayheadPosition: React.Dispatch<React.SetStateAction<number>>
) {
  const totalMainToolbarControls = 18;
  // Helper function to navigate the toolbar
  function navigateMainToolbar(direction: -1 | 1) {
    event.preventDefault();
    const newIndex =
      (mainToolbarIndex + direction + totalMainToolbarControls) %
      totalMainToolbarControls;
    setMainToolbarIndex(newIndex); // Update the toolbar index

    const newControl = document.getElementById(`transport-button-${newIndex}`);
    if (newControl) {
      newControl.focus();
    } else {
      console.warn(`No valid control found for transport-button-${newIndex}`);
    }
  }

  // Handle key events
  switch (event.key) {
    case ",":
      setPlayheadPosition((prev) => prev - 1); // Move playhead to the left
      break;
    case ".":
      setPlayheadPosition((prev) => prev + 1); // Move playhead to the right
      break;
    case "ArrowUp":
    case "ArrowLeft":
      navigateMainToolbar(-1); // Navigate left
      break;
    case "ArrowDown":
    case "ArrowRight":
      navigateMainToolbar(1); // Navigate right
      break;
    case "Tab":
      setMainToolbarIndex(0); // Reset toolbar index on Tab
      break;
    case "Escape":
      exitTabbing(); // Exit tabbing mode
      setMainToolbarIndex(0); // Reset toolbar index on Escape
      break;
      case "Enter":
        if(focusedElement?.id === "transport-button-17"){
          focusElement("timecode-index-0");
        }
    default:
      break;
  }
}