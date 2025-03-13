import { focusElement } from "@/helper/focusElement";

export function handlePreferenceNavigation(
  focusedElement: HTMLElement | null,
  event: KeyboardEvent,
  preferencePageIndex: number,
  closePreferencePanel: () => void,
) {

  // Early return if no focused element
  if (!focusedElement) return;

  const totalColors = 7;

  // Get element ID (safely)
  const elementId = focusedElement.id || "";

  // Handle accent color circles
  if (elementId.includes("preference-accent-color-")) {
    const currentColorIndex = parseInt(elementId.split("-").pop() || "0");

    if (["ArrowRight", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      const nextIndex =
        currentColorIndex === totalColors - 1 ? 0 : currentColorIndex + 1;
      focusElement(`preference-accent-color-${nextIndex}`);
    } else if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      const prevIndex =
        currentColorIndex === 0 ? totalColors - 1 : currentColorIndex - 1;
      focusElement(`preference-accent-color-${prevIndex}`);
    } else if (["Escape"].includes(event.key)){
      closePreferencePanel();
    }
  }
  // Handle theme radio buttons
  else if (
    elementId === "preference-interface-light-mode" &&
    ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(event.key)
  ) {
    event.preventDefault();
    focusElement("preference-interface-dark-mode");
  } else if (
    elementId === "preference-interface-dark-mode" &&
    ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(event.key)
  ) {
    event.preventDefault();
    focusElement("preference-interface-light-mode");
  }
  // Handle clip style radio buttons
  else if (
    elementId === "preference-interface-colorful" &&
    event.key === "ArrowDown"
  ) {
    event.preventDefault();
    focusElement("preference-interface-classic");
  } else if (
    elementId === "preference-interface-classic" &&
    ["ArrowDown", "ArrowUp"].includes(event.key)
  ) {
    event.preventDefault();
    focusElement("preference-interface-colorful");
  }
  // Handle OK button navigation
  else if (
    elementId === "preference-done-button" &&
    event.key === "Tab" &&
    !event.shiftKey
  ) {
    event.preventDefault();
    focusElement(`preference-nav-item-${preferencePageIndex}`);
  }
  // Handle nav item to OK button navigation with Shift+Tab
  else if (
    elementId === `preference-nav-item-${preferencePageIndex}` &&
    event.key === "Tab" &&
    event.shiftKey
  ) {
    event.preventDefault();
    focusElement("preference-done-button");
  }
  // Default arrow key prevention for other elements
  else if (
    ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(event.key)
  ) {
    event.preventDefault();
  }
  // Default arrow key prevention for other elements
  else if (
    ["Escape"].includes(event.key)
  ) {
    event.preventDefault();
    closePreferencePanel();
    focusElement("project-toolbar-audio-setup-button");
  }
}
