import { focusElement } from "../helper/focusElement";

export function handleClipContextMenuNavigation(
  focusedElement: HTMLElement | null,
  event: KeyboardEvent,
  closeAllClipContextMenus: () => void,
  focusedClip: string,
  setPlayheadPosition: React.Dispatch<React.SetStateAction<number>>,

) {
  const totalElements = 13; // Total number of focusable elements

  // Function to navigate between elements
  function navigateElements(currentIndex: number, direction: 1 | -1) {
    event.preventDefault();
    // Calculate next index with wrapping
    const nextIndex =
      (currentIndex + direction + totalElements) % totalElements;
    focusElement(`context-menu-clip-item-${nextIndex}`);
  }

  // Extract current index from element ID if possible
  let currentIndex = -1;
  if (focusedElement?.id?.startsWith("context-menu-clip-item-")) {
    currentIndex = parseInt(focusedElement.id.split("-").pop() || "-1", 10);
  }

  // Handle key events
  switch (event.key) {
    case ",":
      setPlayheadPosition((prev) => prev - 1); // Move playhead to the left
      break;
    case ".":
      setPlayheadPosition((prev) => prev + 1); // Move playhead to the left
      break;
    case "ArrowUp":
    case "ArrowLeft":
      if (currentIndex >= 0) {
        navigateElements(currentIndex, -1);
      }
      break;
    case "ArrowDown":
    case "ArrowRight":
      if (currentIndex >= 0) {
        navigateElements(currentIndex, 1);
      }
      break;
    case "Tab":
      if (currentIndex >= 0) {
        // Prevent default Tab behavior and handle it ourselves
        event.preventDefault();
        navigateElements(currentIndex, event.shiftKey ? -1 : 1);
      }
      break;
    case "Escape":
      event.preventDefault();
      closeAllClipContextMenus();
      focusElement(`${focusedClip}-control-2`);
      console.log("Escape on clip context menu")
      break;
    case "Enter":
      break;
    default:
      break;
  }
}
