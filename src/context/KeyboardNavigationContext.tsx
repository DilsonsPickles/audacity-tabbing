import React, { createContext, useContext, useEffect } from "react";
import { useTrackContext } from "./TrackContext";

type KeyboardContextType = {
  focusedElement: HTMLElement | null;
  focusedClip: string | null;
};
// Create a context for managing keyboard events globally
const KeyboardContext = createContext<KeyboardContextType | null>(null);

export const useKeyboardContext = () => useContext(KeyboardContext);

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
    setClipControlIndex,
    mainToolbarIndex,
    setMainToolbarIndex,
  } = useTrackContext();

  const totalTrackControls = 9; // Number of track header controls (0-7)
  const totalClipControls = 3;
  const totalMainToolbarControls = 6;

  function exitTabbing() {
    const firstFocusableElement = document.getElementById("transport-button-0");
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
  }

  /**
   * Finds the nearest valid clip in a given track.
   * - First attempts position, if not found, tries previous positions.
   */
  function findValidClip(track: number, position: number) {
    let attemptPosition = position;
    let clip = document.getElementById(`clip-${track}-${attemptPosition}`);

    while (!clip && attemptPosition > 0) {
      attemptPosition--;
      clip = document.getElementById(`clip-${track}-${attemptPosition}`);
    }

    return { clip, attemptPosition };
  }

  /**
   * Moves focus to an adjacent track (up or down) while maintaining clip position.
   */
  function navigateToAdjacentTrackClip(
    event: KeyboardEvent,
    direction: -1 | 1
  ) {
    event.preventDefault();
    const newTrack = focusedTrack + direction;
    if (newTrack < 0) return; // Prevents out-of-bounds navigation

    const { clip, attemptPosition } = findValidClip(
      newTrack,
      focusedClipPosition
    );
    if (clip) {
      clip.focus();
      setFocusedTrack(newTrack);
      setFocusedClipPosition(attemptPosition);
    } else {
      console.warn(`No valid clip found on track-${newTrack}`);
    }
  }

  /**
   * Moves focus to an adjacent track header (up or down).
   */
  function navigateToAdjacentTrackHeader(
    event: KeyboardEvent,
    direction: -1 | 1
  ) {
    event.preventDefault();
    const newTrack = focusedTrack + direction;
    if (newTrack < 0) return; // Prevents out-of-bounds navigation

    const header = document.getElementById(`track-${newTrack}-control-0`);
    if (header) {
      header.focus();
      setFocusedTrack(newTrack);
    } else {
      console.warn(`No valid track header found for track-${newTrack}`);
    }
  }

  /**
   * Moves focus within the track header's internal tab group.
   * - Loops through the 0 controls (0 to 8).
   */
  function navigateInternalTrackHeader(
    event: KeyboardEvent,
    direction: -1 | 1
  ) {
    event.preventDefault();
    const newIndex =
      (trackControlIndex + direction + totalTrackControls) % totalTrackControls;
    setTrackControlIndex(newIndex); // Update the track control index

    const newControl = document.getElementById(
      `track-${focusedTrack}-control-${newIndex}`
    );
    if (newControl) {
      newControl.focus();
    } else {
      console.warn(
        `No valid control found for track-${focusedTrack}-control-${newIndex}`
      );
    }
  }

  /**
   * Moves focus within the maint toolbar's tab group.
   * - Loops through the 6 controls (0 to 5).
   */
  function navigateMainToolbar(event: KeyboardEvent, direction: -1 | 1) {
    event.preventDefault();
    const newIndex =
      (mainToolbarIndex + direction + totalMainToolbarControls) %
      totalMainToolbarControls;
    setMainToolbarIndex(newIndex); // Update the main toolbar index

    const newControl = document.getElementById(`transport-button-${newIndex}`);
    if (newControl) {
      newControl.focus();
    } else {
      console.warn(`No valid control found for transport-button-${newIndex}`);
    }
  }

  /**
   * Moves focus within the clip's internal tab group.
   * - Loops through the 3 controls (0 to 2).
   */
  function navigateInternalClipControl(
    event: KeyboardEvent,
    direction: -1 | 1
  ) {
    event.preventDefault();

    // Use a function-based setter for safe index calculations based on the previous state
    setClipControlIndex((prevIndex) => {
      let newIndex = prevIndex + direction;

      // Ensure the index wraps correctly between 0 and 2
      if (newIndex < 0) {
        newIndex = totalClipControls - 1; // Wrap to 2 when going left from 0
      } else if (newIndex >= totalClipControls) {
        newIndex = 0; // Wrap to 0 when going right from 2
      }

      // Find the clip control to focus
      const newClipControl = document.getElementById(
        `clip-${focusedTrack}-${focusedClipPosition}-control-${newIndex}`
      );

      if (newClipControl) {
        newClipControl.focus();
      } else {
        console.warn(
          `No valid control found for clip-${focusedTrack}-${focusedClipPosition}-control-${newIndex}`
        );
      }

      return newIndex; // Return the updated index
    });
  }

  /**
   * Handles navigation within track headers.
   */
  function handleTrackNavigation(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowUp":
        if (focusedElement?.id.includes(`track-${focusedTrack}-control-0`)) {
          navigateToAdjacentTrackHeader(event, -1);
        } else if (
          focusedElement?.id.includes(`track-${focusedTrack}-control-`)
        ) {
          navigateInternalTrackHeader(event, -1); // Move left in the internal track header tab group
        }
        break;
      case "ArrowRight":
        if (focusedElement?.id.includes(`track-${focusedTrack}-control-`)) {
          navigateInternalTrackHeader(event, 1); // Move right in the internal track header tab group
        }
        break;
      case "ArrowDown":
        if (focusedElement?.id.includes(`track-${focusedTrack}-control-0`)) {
          navigateToAdjacentTrackHeader(event, 1);
        } else if (
          focusedElement?.id.includes(`track-${focusedTrack}-control-`)
        ) {
          navigateInternalTrackHeader(event, 1); // Move left in the internal track header tab group
        }
        break;
      case "ArrowLeft":
        if (focusedElement?.id.includes(`track-${focusedTrack}-control-`)) {
          navigateInternalTrackHeader(event, -1); // Move left in the internal track header tab group
        }
        break;
      case "Tab":
        if (
          focusedElement?.id.includes(`track-${focusedTrack}-control-`) &&
          !focusedElement.id.includes(`track-${focusedTrack}-control-0`)
        ) {
          event.preventDefault();
          setTrackControlIndex(0); // Reset the control index to the first one
          const firstClip = document.getElementById(`clip-${focusedTrack}-1`);
          if (firstClip) {
            firstClip.focus(); // Focus the first clip
          }
        }
        break;
      case "Enter":
        if (focusedElement?.id.includes("track")) {
          console.log("Enter pressed on track header");
        } else {
          console.log("Enter key pressed");
        }
        break;
      case "Escape":
        if (
          focusedElement?.id.includes(`track-${focusedTrack}-control-`) &&
          !focusedElement.id.includes(`track-${focusedTrack}-control-0`)
        ) {
          document.getElementById(`track-${focusedTrack}-control-0`)?.focus();
          setTrackControlIndex(0);
        } else {
          exitTabbing();
        }
        break;
    }
  }

  /**
   * Handles navigation between clips.
   */
  function handleClipNavigation(event: KeyboardEvent) {
    const currentClip = document.getElementById(
      `clip-${focusedTrack}-${focusedClipPosition}`
    );
    switch (event.key) {
      case "ArrowUp":
      case "w":
        navigateToAdjacentTrackClip(event, -1);
        break;
      case "ArrowDown":
      case "s":
        navigateToAdjacentTrackClip(event, 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        break;
      case "a": // Navigate to the previous clip using "A"
        event.preventDefault(); // Prevent default behavior
        const prevClip = document.getElementById(
          `clip-${focusedTrack}-${focusedClipPosition - 1}`
        );
        if (prevClip) {
          prevClip.focus();
          setFocusedClipPosition(focusedClipPosition - 1); // Update focused clip position
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        break;
      case "d": // Navigate to the next clip using "D"
        event.preventDefault(); // Prevent default behavior
        const nextClip = document.getElementById(
          `clip-${focusedTrack}-${focusedClipPosition + 1}`
        );
        if (nextClip) {
          nextClip.focus();
          setFocusedClipPosition(focusedClipPosition + 1); // Update focused clip position
        }
        break;

      case "Enter":
        if (focusedElement?.id.includes("clip")) {
          setFocusedClip(`${currentClip?.id}`);
        }
        break;
      case "Escape":
        exitTabbing();
        break;

      default:
        break;
    }
  }

  function handleClipControlNavigation(event: KeyboardEvent) {
    const currentClip = document.getElementById(
      `clip-${focusedTrack}-${focusedClipPosition}`
    );
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        navigateInternalClipControl(event, -1);
        break;
      case "ArrowRight":
        event.preventDefault();
        navigateInternalClipControl(event, 1);
        break;
      case "ArrowDown":
        event.preventDefault();
        navigateInternalClipControl(event, 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        navigateInternalClipControl(event, -1);
        break;
      case "Escape":
        // Attempt to return focus to the clip first
        if (currentClip) {
          currentClip.focus();
        }

        // Then clear focused state
        setTimeout(() => {
          setFocusedClip("");
        }, 0); // Delayed to ensure DOM updates correctly

        setClipControlIndex(0);

        break;
      case "Tab":
        if (currentClip) {
          currentClip.focus();
          setFocusedClip("");
        }

        break;
      default:
        break;
    }
  }

  function handleMainToolbarNavigation(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowUp":
        {
          navigateMainToolbar(event, -1);
        }
        break;
      case "ArrowRight":
        {
          navigateMainToolbar(event, 1);
        }
        break;
      case "ArrowDown":
        {
          navigateMainToolbar(event, 1);
        }
        break;
      case "ArrowLeft": {
        navigateMainToolbar(event, -1);
      }
      case "Tab":
        setMainToolbarIndex(0);
        break;
      case "Escape":
        exitTabbing();
        setMainToolbarIndex(0);
        break;
    }
  }

  function handleDefaultNavigation(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowUp":
        {
          setFocusedTrack(focusedTrack - 1);
        }
        break;
      case "ArrowRight":
        {
          navigateMainToolbar(event, 1);
        }
        break;
      case "ArrowDown":
        {
          setFocusedTrack(focusedTrack + 1);
        }
        break;
      case "ArrowLeft":
        {
          navigateMainToolbar(event, -1);
        }
        break;
      case "Enter":
        {
          setSelectedTrack(focusedTrack);
        }
        break;
      case "Escape":
        exitTabbing();
        setMainToolbarIndex(0);
        break;
    }
  }

  useEffect(() => {
    if (focusedClip) {
      const selectButtonFocus = document.getElementById(
        `${focusedClip}-control-2`
      );
      selectButtonFocus?.focus();
      setClipControlIndex(2);
    }
  }, [focusedClip]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (focusedElementType) {
        case "transport":
          handleMainToolbarNavigation(event);
          break;
        case "track-control":
          handleTrackNavigation(event);
          break;
        case "clip":
          handleClipNavigation(event);
          break;
        case "clip-control":
          handleClipControlNavigation(event);
          break;
        default:
          handleDefaultNavigation(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    focusedElementType,
    focusedTrack,
    focusedClipPosition,
    trackControlIndex,
    mainToolbarIndex,
  ]);

  return (
    <KeyboardContext.Provider value={{ focusedElement, focusedClip }}>
      {children}
    </KeyboardContext.Provider>
  );
};