export function exitTabbing() {
    const firstFocusableElement = document.getElementById("transport-button-0");
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
  }
