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
      `preference-nav-item-${newIndex}`
    );

    if (preferencePage) {
      preferencePage.focus();
    } else {
      console.warn(
        `No valid preference page found for preference-nav-item-${newIndex + 1}`
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
    case "ArrowLeft":
      navigatePreferencePage(-1);
      break;
    case "ArrowDown":
    case "ArrowRight":
      navigatePreferencePage(1);
      break;
    case "Tab":
      // Optional: handle tab navigation
      break;
    case "Escape":
      closePreferencesPanel(); // Close the preferences panel
      break;
    case "Enter": {
      // Get all focusable elements
      const focusableElements =
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const elements = [...document.querySelectorAll(focusableElements)].filter(
        (el) => {
          // Type casting for HTMLElement which has offsetParent property
          const htmlEl = el as HTMLElement;

          // Check visibility (offsetParent is null for hidden elements)
          const isVisible = htmlEl.offsetParent !== null;

          // Check if disabled based on element type
          let isDisabled = false;
          if (
            el instanceof HTMLButtonElement ||
            el instanceof HTMLInputElement ||
            el instanceof HTMLSelectElement ||
            el instanceof HTMLTextAreaElement
          ) {
            isDisabled = el.disabled;
          }

          return isVisible && !isDisabled;
        }
      );

      // Find current position (handle potential null activeElement)
      const currentElement = document.activeElement;
      const currentIndex = currentElement
        ? elements.indexOf(currentElement)
        : -1;

      // Focus next element or first if at end
      const nextIndex =
        currentIndex >= 0 && currentIndex < elements.length - 1
          ? currentIndex + 1
          : 0;

      // Make sure we have elements before trying to focus
      if (elements.length > 0) {
        (elements[nextIndex] as HTMLElement).focus();
      }

      // Prevent default Enter behavior
      event.preventDefault();
      break;
    }
    default:
      break;
  }
}
