import { focusElement } from "../helper/focusElement";

export function handleProjectToolbarNavigation(
  focusedElement: HTMLElement | null,
  event: KeyboardEvent,
  setPlayheadPosition: React.Dispatch<React.SetStateAction<number>>
) {
  switch (event.key) {
    case ",":
      setPlayheadPosition((previous) => previous - 1); // Move playhead to the left
      break;
    case ".":
      setPlayheadPosition((previous) => previous + 1); // Move playhead to the right
      break;
  }

  // Handle navigation for toolbar group 1
  if (focusedElement?.id.startsWith("toolbar-project-group-1-item-")) {
    // Extract the current item index
    const currentItemIndex = parseInt(
      focusedElement.id.split("-").pop() || "0"
    );

    // Define navigation mapping for toolbar group 1
    const navigationMap: { [key: number]: { prev: number; next: number } } = {
      0: { prev: 2, next: 1 },
      1: { prev: 0, next: 2 },
      2: { prev: 1, next: 0 },
    };

    // Get navigation direction
    let direction: "prev" | "next" | null = null;

    switch (event.key) {
      case "ArrowUp":
      case "ArrowLeft":
        direction = "prev";
        break;
      case "ArrowRight":
      case "ArrowDown":
        direction = "next";
        break;
      default:
        return; // Exit if key isn't one we handle
    }

    // Only attempt to navigate if direction is not null
    if (direction !== null) {
      // Get the target index to navigate to
      const targetIndex = navigationMap[currentItemIndex]?.[direction];

      if (targetIndex !== undefined) {
        focusElement(`toolbar-project-group-1-item-${targetIndex}`);
      }
    }
  }
  // Handle navigation for toolbar group 2
  else if (focusedElement?.id.startsWith("toolbar-project-group-2-item-")) {
    // Extract the current item index
    const currentItemIndex = parseInt(
      focusedElement.id.split("-").pop() || "0"
    );

    // Define navigation mapping for toolbar group 2
    const navigationMap: { [key: number]: { prev: number; next: number } } = {
      0: { prev: 1, next: 1 },
      1: { prev: 0, next: 0 },
    };

    // Get navigation direction
    let direction: "prev" | "next" | null = null;

    switch (event.key) {
      case "ArrowUp":
      case "ArrowLeft":
        direction = "prev";
        break;
      case "ArrowRight":
      case "ArrowDown":
        direction = "next";
        break;
      default:
        return; // Exit if key isn't one we handle
    }

    // Only attempt to navigate if direction is not null
    if (direction !== null) {
      // Get the target index to navigate to
      const targetIndex = navigationMap[currentItemIndex]?.[direction];

      if (targetIndex !== undefined) {
        focusElement(`toolbar-project-group-2-item-${targetIndex}`);
      }
    }
  }
}
