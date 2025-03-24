import { focusElement } from "../helper/focusElement";

export function handlePlaybackTimecodeNavigation(
  event: KeyboardEvent,
  focusedElement: HTMLElement | null,
  currentIndex: number,
  setCurrentIndex: (newIndex: number) => void,
  setPlayheadPosition: React.Dispatch<React.SetStateAction<number>>
) {
  const totalPlaybackTimecodeControls = 7;

  // Only handle navigation if we're focused on a timecode element
  if (focusedElement?.id.startsWith("timecode-index-")) {
    switch (event.key) {
      case ",":
        setPlayheadPosition((prev) => prev - 1); // Move playhead to the left
        break;
      case ".":
        setPlayheadPosition((prev) => prev + 1); // Move playhead to the right
        break;
      case "ArrowRight":
        const nextIndex = (currentIndex + 1) % totalPlaybackTimecodeControls;
        setCurrentIndex(nextIndex);
        focusElement(`timecode-index-${nextIndex}`);
        break;
      case "ArrowLeft":
        const prevIndex =
          (currentIndex - 1 + totalPlaybackTimecodeControls) %
          totalPlaybackTimecodeControls;
        setCurrentIndex(prevIndex);
        focusElement(`timecode-index-${prevIndex}`);
        break;
      case "Enter":
        if (focusedElement) {
          focusedElement.click();
        }
        break;
    }
  }
}
