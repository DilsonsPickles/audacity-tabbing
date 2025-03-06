export function handleMainToolbarNavigation(
  event: KeyboardEvent,
  mainToolbarIndex: number,
  setMainToolbarIndex: (newIndex: number) => void,
  exitTabbing: () => void
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
    default:
      break;
  }
}
