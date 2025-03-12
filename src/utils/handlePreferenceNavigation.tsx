export function handlePreferenceNavigation(
  focusedElement: HTMLElement | null,
  event: KeyboardEvent,
  preferencePageIndex: number
) {

  // Early return if no focused element
  if (!focusedElement) return;

  const totalColors = 7;

  // Helper function to focus an element by ID with error handling
  const focusElement = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.focus();
      } else {
        console.warn(`Element not found: ${id}`);
      }
    }, 0);
  };

  // Get element ID (safely)
  const elementId = focusedElement.id || "";

  // Handle accent color circles
  if (elementId.includes("preferences-accent-color-")) {
    const currentColorIndex = parseInt(elementId.split("-").pop() || "0");

    if (["ArrowRight", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      const nextIndex =
        currentColorIndex === totalColors - 1 ? 0 : currentColorIndex + 1;
      focusElement(`preferences-accent-color-${nextIndex}`);
    } else if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      const prevIndex =
        currentColorIndex === 0 ? totalColors - 1 : currentColorIndex - 1;
      focusElement(`preferences-accent-color-${prevIndex}`);
    }
  }
  // Handle theme radio buttons
  else if (
    elementId === "preferences-interface-light-mode" &&
    event.key === "ArrowDown"
  ) {
    event.preventDefault();
    focusElement("preferences-interface-dark-mode");
  } else if (
    elementId === "preferences-interface-dark-mode" &&
    ["ArrowDown", "ArrowUp"].includes(event.key)
  ) {
    event.preventDefault();
    focusElement("preferences-interface-light-mode");
  }
  // Handle clip style radio buttons
  else if (
    elementId === "preferences-interface-colorful" &&
    event.key === "ArrowDown"
  ) {
    event.preventDefault();
    focusElement("preferences-interface-classic");
  } else if (
    elementId === "preferences-interface-classic" &&
    ["ArrowDown", "ArrowUp"].includes(event.key)
  ) {
    event.preventDefault();
    focusElement("preferences-interface-colorful");
  }
  // Handle OK button navigation
  else if (
    elementId === "preferences-ok" &&
    event.key === "Tab" &&
    !event.shiftKey
  ) {
    event.preventDefault();
    focusElement(`preferences-nav-item-${preferencePageIndex}`);
  }
  // Handle nav item to OK button navigation with Shift+Tab
  else if (
    elementId === `preferences-nav-item-${preferencePageIndex}` &&
    event.key === "Tab" &&
    event.shiftKey
  ) {
    event.preventDefault();
    focusElement("preferences-ok");
  }
  // Default arrow key prevention for other elements
  else if (
    ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(event.key)
  ) {
    event.preventDefault();
  }
}
