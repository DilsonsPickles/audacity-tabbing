import { focusElement } from "../helper/focusElement";

export function handleBottomToolbarNavigation(
  focusedElement: HTMLElement | null,
  event: KeyboardEvent,
  setPlayheadPosition: React.Dispatch<React.SetStateAction<number>>
) {
  switch (event.key) {
    case ",":
      setPlayheadPosition((prev) => prev - 1); // Move playhead to the left
      break;
    case ".":
      setPlayheadPosition((prev) => prev + 1); // Move playhead to the left
      break;
    case "ArrowUp":
      {
        console.log("Arrow up");
      }
      break;
    case "ArrowRight":
      {
        console.log("Arrow right");
      }
      break;
    case "ArrowDown":
      {
        console.log("Arrow down");
      }
      break;
    case "ArrowLeft":
      {
        console.log("Arrow left");
      }
      break;
    case "Enter":
      {
        console.log("Enter");
      }
      break;
    case "Tab":
      if (focusedElement?.id === "toolbar-bottom" && event.shiftKey) {
        focusElement("clip-3-1");
        event.preventDefault();
      } else if (focusedElement?.id === "toolbar-bottom") {
        focusElement("toolbar-project-group-1-item-0");
      }
      break;
    default:
      break;
  }
}
