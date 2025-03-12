import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useTrackContext } from "./TrackContext";
import { usePlayheadContext } from "./PlayheadContext";
import { handleClipNavigation } from "@/utils/handleClipNavigation";
import { handleMainToolbarNavigation } from "@/utils/handleMainToolbarNavigation";
import { handleTrackNavigation } from "@/utils/handleTrackNavigation";
import { handleClipControlNavigation } from "@/utils/handleClipControlNavigation";
import { handleDefaultNavigation } from "@/utils/handleDefaultNavigation";
import { handlePreferenceNavigation } from "@/utils/handlePreferenceNavigation";
import { handlePreferenceNavItemNavigation } from "@/utils/handlePreferenceNavItemNavigation";
import { exitTabbing } from "@/helper/exitTabbing";
import { usePanelContext } from "./PanelContext";

type KeyboardContextType = {
  focusedElement: HTMLElement | null;
  focusedClip: string | null;
};
// Create a context for managing keyboard events globally
const KeyboardContext = createContext<KeyboardContextType | null>(null);

export const useKeyboardContext = () => {
  const context = useContext(KeyboardContext);
  if (!context) {
    throw new Error(
      "useKeyboardContext must be used within a KeyboardProvider"
    );
  }
  return context;
};

export const KeyboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    setSelectedTrack,
    focusedTrack,
    focusedElement,
    focusedClip,
    setFocusedClip,
    focusedElementType,
    setFocusedTrack,
    focusedClipPosition,
    setFocusedClipPosition,
    trackControlIndex,
    setTrackControlIndex,
    clipControlIndex,
    setClipControlIndex,
    mainToolbarIndex,
    setMainToolbarIndex,
  } = useTrackContext();

  const {
    closePreferencesPanel,
    preferencePageIndex,
    setPreferencePageIndex,
    setActivePreferencePage,
  } = usePanelContext();

  const { setPlayheadPosition, playheadPosition } = usePlayheadContext();

  const totalTrackControls = 9; // Number of track header controls (0-7)

  useEffect(() => {
    if (!focusedClip) return;

    const selectButtonFocus = document.getElementById(
      `${focusedClip}-control-2`
    );
    if (selectButtonFocus) {
      selectButtonFocus.focus();
      setClipControlIndex(2);
    }
  }, [focusedClip, setClipControlIndex]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (focusedElementType) {
        case "transport":
          handleMainToolbarNavigation(
            event,
            mainToolbarIndex,
            setMainToolbarIndex,
            exitTabbing
          );
          break;
        case "track-control":
          handleTrackNavigation(
            event,
            trackControlIndex,
            totalTrackControls,
            setTrackControlIndex,
            focusedTrack,
            focusedElement,
            setFocusedTrack,
            exitTabbing
          );
          break;
        case "clip":
          handleClipNavigation(
            event,
            focusedTrack,
            focusedClipPosition,
            setFocusedClipPosition,
            focusedElement,
            setFocusedClip,
            exitTabbing,
            setFocusedTrack,
            setPlayheadPosition,
            playheadPosition
          );
          break;
        case "clip-control":
          handleClipControlNavigation(
            event,
            focusedTrack,
            focusedClipPosition,
            setFocusedClip,
            clipControlIndex,
            setClipControlIndex
          );
          break;
        case "preference-nav-item":
          handlePreferenceNavItemNavigation(
            closePreferencesPanel,
            event,
            preferencePageIndex,
            setPreferencePageIndex,
            setActivePreferencePage
          );
          break;

        case "preference":
          handlePreferenceNavigation(focusedElement, event, preferencePageIndex);
          break;
        case "":
          handleDefaultNavigation(
            event,
            focusedTrack,
            setFocusedTrack,
            setSelectedTrack,
            exitTabbing,
            setMainToolbarIndex,
            setPlayheadPosition
          );
          break;
      }
    },
    [
      focusedElementType,
      focusedTrack,
      focusedClipPosition,
      trackControlIndex,
      mainToolbarIndex,
      setTrackControlIndex,
      setFocusedTrack,
      setFocusedClipPosition,
      setFocusedClip,
      setSelectedTrack,
      setMainToolbarIndex,
      exitTabbing,
    ]
  );

  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => handleKeyDown(event);

    window.addEventListener("keydown", keydownListener);
    return () => window.removeEventListener("keydown", keydownListener);
  }, [handleKeyDown]);

  return (
    <KeyboardContext.Provider
      value={{ focusedElement: focusedElement || null, focusedClip }}
    >
      {children}
    </KeyboardContext.Provider>
  );
};
