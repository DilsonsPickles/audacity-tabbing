export function handleDefaultNavigation(
  event: KeyboardEvent,
  focusedTrack: number,
  setFocusedTrack: (focusedTrack: number) => void,
  setSelectedTrack: (focusedTrack: number[]) => void,
  exitTabbing: () => void,
  setMainToolbarIndex: (index: number) => void,
  setPlayheadPosition: React.Dispatch<React.SetStateAction<number>>
) {
  switch (event.key) {
    case "ArrowUp":
      {
        setFocusedTrack(focusedTrack - 1);
      }
      break;
    case "ArrowRight":
      {
        event.preventDefault();
        setPlayheadPosition((prev) => prev + 1); // Move playhead to the right
      }
      break;
    case "ArrowDown":
      {
        setFocusedTrack(focusedTrack + 1);
      }
      break;
    case "ArrowLeft":
      {
        event.preventDefault();
        setPlayheadPosition((prev) => prev - 1); // Move playhead to the left
      }
      break;
    case "Enter":
      setSelectedTrack([focusedTrack]);

      break;
    case "Escape":
      exitTabbing();
      setMainToolbarIndex(0);
      break;
  }
}
