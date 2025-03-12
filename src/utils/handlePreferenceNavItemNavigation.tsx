// handlePreferencesNavigation.tsx
export function handlePreferenceNavItemNavigation(
  closePreferencesPanel: () => void,
  event: KeyboardEvent,
  preferencePageIndex: number,
  setPreferencePageIndex: (index: number) => void,
  setActivePreferencePage: (id: number) => void
) {
  const totalPreferencePages = 10; // Total number of preference pages

  function setFocusOnPreference(newIndex: number): void {
    const preferencePage = document.getElementById(
      `preferences-nav-item-${newIndex}`
    );

    if (preferencePage) {
      preferencePage.focus();
    } else {
      console.warn(
        `No valid preference page found for preferences-nav-item-${
          newIndex + 1
        }`
      );
    }
  }

  function updatePreferenceIndex(prevIndex: number, direction: -1 | 1): number {
    return (
      (prevIndex + direction + totalPreferencePages) % totalPreferencePages
    ); // Wrapping index calculation
  }

  function navigatePreferencePage(direction: -1 | 1): void {
    event.preventDefault(); // Prevent default behavior
    const newIndex = updatePreferenceIndex(preferencePageIndex, direction);
    setPreferencePageIndex(newIndex);
    setFocusOnPreference(newIndex); // Set focus on the new preference page
    setActivePreferencePage(newIndex);
  }

  // Handle key events
  switch (event.key) {
    case "ArrowUp":
      navigatePreferencePage(-1);
      break;
    case "ArrowDown":
      navigatePreferencePage(1);
      break;
    case "ArrowLeft":
      break;
    case "ArrowRight":
      break;
    case "Tab":
      // Optional: handle tab navigation
      break;
    case "Escape":
      closePreferencesPanel(); // Close the preferences panel
      break;
    default:
      break;
  }
}
