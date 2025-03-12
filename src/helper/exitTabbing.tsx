export function exitTabbing() {
    const firstFocusableElement = document.getElementById("project-toolbar-effects-button");
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
  }
