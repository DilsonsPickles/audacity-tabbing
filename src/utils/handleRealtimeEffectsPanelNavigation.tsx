import { focusElement } from "@/helper/focusElement";

export function handleRealtimeEffectsPanelNavigation(
  event: KeyboardEvent,
  focusedElement: HTMLElement | null
) {
  if (focusedElement?.id === "panel-realtime-effects") {
    switch (event.key) {
      case "Tab":
        event.preventDefault();
        focusElement("add-new-track-button");
        break;
      case "Enter":
        focusElement("panel-realtime-effects-header");
        break;
        default:
          break;
    }
  } else if (focusedElement?.id === "panel-realtime-effects-header") {
    switch (event.key) {
      case "Tab":
        focusElement("panel-realtime-effects-list-header");
        break;
      case "Escape":
        focusElement("panel-realtime-effects");
        break;
    }
  } else if (
    focusedElement?.id === "panel-realtime-effects-add-effect-button"
  ) {
    switch (event.key) {
      case "Tab":
        event.preventDefault();
        focusElement("panel-realtime-effects-header");
        break;
      case "Escape":
        focusElement("panel-realtime-effects");
        break;
    }
  } else if (focusedElement?.id === "panel-realtime-effects-list-header") {
    switch (event.key) {
      case "Escape":
        focusElement("panel-realtime-effects");
        break;
    }
  } else if (focusedElement?.id === "panel-realtime-effects-list") {
    switch (event.key) {
      case "Escape":
        focusElement("panel-realtime-effects");
        break;
        case "Tab":
        event.preventDefault();
        focusElement("panel-realtime-effects-add-effect-button");
        break;
    }
  }
}
