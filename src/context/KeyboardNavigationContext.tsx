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
import { handleAddNewTrackNavigation } from "@/utils/handleAddNewTrackNavigation";
import { handleClipContextMenuNavigation } from "@/utils/handleClipContextMenuNavigation";
import { handleBottomToolbarNavigation } from "@/utils/handleBottomToolbarNavigation";
import { handleProjectToolbarNavigation } from "@/utils/handleProjectToolbarNavigation";
import { handleRealtimeEffectsPanelNavigation } from "@/utils/handleRealtimeEffectsPanelNavigation";
import { handlePlaybackTimecodeNavigation } from "@/utils/handlePlaybackTimecodeNavigation";
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
    selectedClip,
    playbackTimecodeIndex,
    setPlaybackTimecodeIndex,
  } = useTrackContext();

  const {
    closePreferencesPanel,
    preferencePageIndex,
    setPreferencePageIndex,
    setActivePreferencePage,
    toggleIsAddNewTrackPanelOpen,
    closeAllClipContextMenus,
  } = usePanelContext();

  const { setPlayheadPosition, playheadPosition } = usePlayheadContext();

  const totalTrackControls = 9; // Number of track header controls (0-7)

  useEffect(() => {
    if (!focusedClip) return;

    const selectButtonFocus = document.getElementById(
      `${focusedClip}-control-0`
    );
    if (selectButtonFocus) {
      selectButtonFocus.focus();
      setClipControlIndex(0);
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
            exitTabbing,
            focusedElement,
            setPlayheadPosition
          );
          break;
        case "playback-timecode":
          handlePlaybackTimecodeNavigation(
            event,
            focusedElement,
            playbackTimecodeIndex,
            setPlaybackTimecodeIndex,
            setPlayheadPosition,
          );
          break;
        case "add-new-track":
          handleAddNewTrackNavigation(
            focusedElement,
            event,
            toggleIsAddNewTrackPanelOpen,
            setPlayheadPosition
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
            exitTabbing,
            setPlayheadPosition
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
            setPlayheadPosition
          );
          break;
        case "clip-control":
          handleClipControlNavigation(
            event,
            focusedTrack,
            focusedClipPosition,
            setFocusedClip,
            clipControlIndex,
            setClipControlIndex,
            selectedClip,
            focusedElement,
            setPlayheadPosition
          );
          break;
        case "clip-context-menu":
          handleClipContextMenuNavigation(
            focusedElement,
            event,
            closeAllClipContextMenus,
            focusedClip,
            setPlayheadPosition
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
        case "toolbar-bottom":
          handleBottomToolbarNavigation(focusedElement, event, setPlayheadPosition);
          break;
        case "preference":
          handlePreferenceNavigation(
            focusedElement,
            event,
            preferencePageIndex,
            closePreferencesPanel,
          );
          break;
        case "toolbar-project":
          {
            handleProjectToolbarNavigation(
              focusedElement,
              event,
              setPlayheadPosition
            );
          }
          break;
        case "realtime-effects-panel":
          {
            handleRealtimeEffectsPanelNavigation(event);
          }
          break;
        case "":
          handleDefaultNavigation(
            event,
            focusedTrack,
            setFocusedTrack,
            setSelectedTrack,
            exitTabbing,
            setMainToolbarIndex,
            setPlayheadPosition,
            focusedElement
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
      clipControlIndex,
      selectedClip,
      focusedClip,
      focusedElement,
      playheadPosition,
      preferencePageIndex,
      setTrackControlIndex,
      setFocusedTrack,
      setFocusedClipPosition,
      setFocusedClip,
      setSelectedTrack,
      setMainToolbarIndex,
      setClipControlIndex,
      setPlayheadPosition,
      setPreferencePageIndex,
      setActivePreferencePage,
      toggleIsAddNewTrackPanelOpen,
      closePreferencesPanel,
      closeAllClipContextMenus,
      // Note: exitTabbing is excluded as it's a static utility function
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
