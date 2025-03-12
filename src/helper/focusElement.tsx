  // Helper function to focus an element by ID with error handling
  export const focusElement = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.focus();
      } else {
        console.warn(`Element not found: ${id}`);
      }
    }, 0);
  };