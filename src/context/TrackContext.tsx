import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export interface ClipData {
  id: number;
  parentId: number;
  name: string;
  position: number;
  isSelected: boolean;
  isFocused: boolean;
}

export interface TrackData {
  id: number;
  name: string;
  clips: ClipData[];
  index: number;
  color?: string;
  isSelected: boolean;
  isFocused: boolean;
}

interface TrackContextType {
  tracks: TrackData[];
  setTracks: React.Dispatch<React.SetStateAction<TrackData[]>>;

  selectedTrack: number[];
  setSelectedTrack: (ids: number[]) => void;

  focusedTrack: number;
  setFocusedTrack: (id: number) => void;

  selectedClip: string[];
  setSelectedClip: (names: string[], shiftKey: boolean) => void; // Updated signature

  focusedClip: string;
  setFocusedClip: (name: string) => void;

  focusedElement: HTMLElement | null;
  setFocusedElement: (element: HTMLElement | null) => void;

  trackControlIndex: number;
  setTrackControlIndex: (index: number) => void;

  clipControlIndex: number;
  setClipControlIndex: (
    index: number | ((prevIndex: number) => number)
  ) => void;

  playbackTimecodeIndex: number;
  setPlaybackTimecodeIndex: (
    index: number | ((prevIndex: number) => number)
  ) => void;

  mainToolbarIndex: number;
  setMainToolbarIndex: (
    index: number | ((prevIndex: number) => number)
  ) => void;

  focusedClipPosition: number;
  setFocusedClipPosition: (index: number) => void;

  focusedElementType: string;
  setFocusedElementType: (type: string) => void;
}

const TrackContext = createContext<TrackContextType | undefined>(undefined);

export function TrackProvider({ children }: { children: ReactNode }) {
  const [selectedTrack, setSelectedTrackState] = useState<number[]>([1]);
  const [focusedTrack, setFocusedTrackState] = useState<number>(1);
  const [selectedClip, setSelectedClipState] = useState<string[]>([]); // Use an array of strings
  const [focusedClip, setFocusedClipState] = useState<string>("");
  const [focusedElement, setFocusedElementState] = useState<HTMLElement | null>(
    null
  );
  const [trackControlIndex, setTrackControlIndex] = useState<number>(0);
  const [playbackTimecodeIndex, setPlaybackTimecodeIndex] = useState<number>(0);
  const [clipControlIndex, setClipControlIndex] = useState<number>(0);
  const [focusedClipPosition, setFocusedClipPosition] = useState<number>(0);
  const [mainToolbarIndex, setMainToolbarIndex] = useState<number>(0);
  const [focusedElementType, setFocusedElementType] = useState<string>("");

  useEffect(() => {
    function handleFocus(event: FocusEvent) {
      if (!event.target || !(event.target instanceof HTMLElement)) return;
      setFocusedElement(event.target);

      switch (true) {
        case event.target.id.includes("transport-"):
          setFocusedElementType("transport");
          break;
        case event.target.id.includes("timecode-index-"):
          setFocusedElementType("playback-timecode");
          break;
        case event.target.id.includes("clip") &&
          event.target.id.includes("control"):
          setFocusedElementType("clip-control");
          break;
        case event.target.id.includes("track") &&
          event.target.id.includes("control"):
          setFocusedElementType("track-control");
          break;
        case event.target.id.includes("context-menu-clip-item-"):
          setFocusedElementType("clip-context-menu");
          break;
        case event.target.id.includes("clip"):
          setFocusedElementType("clip");
          break;
        case event.target.id.includes("add-new-track"):
          setFocusedElementType("add-new-track");
          break;
        case event.target.id.includes("track"):
          setFocusedElementType("track");
          break;
        case event.target.id.includes("preference") &&
          event.target.id.includes("-nav-item-"):
          setFocusedElementType("preference-nav-item");
          break;
        case event.target.id.includes("preference"):
          setFocusedElementType("preference");
          break;
        case event.target.id.includes("toolbar-project"):
          setFocusedElementType("toolbar-project");
          break;
        case event.target.id.includes("toolbar-bottom"):
          setFocusedElementType("toolbar-bottom");
          break;
        case event.target.id.includes("panel-realtime-effects"):
          setFocusedElementType("panel-realtime-effects");
          break;
        default:
          setFocusedElementType(""); // Handle unknown cases
      }
    }

    document.addEventListener("focusin", handleFocus);
    return () => document.removeEventListener("focusin", handleFocus);
  }, [focusedElement]);

  const [tracks, setTracks] = useState<TrackData[]>(() => {
    return [
      {
        id: 1,
        name: "Mono track 1",
        index: 0,
        isSelected: selectedTrack.includes(1),
        isFocused: focusedTrack === 1,
        clips: [
          {
            id: 1,
            name: "clip-1-1",
            position: 1,
            isSelected: selectedClip.includes("clip-1-1"), // Check if this clip is selected
            isFocused: focusedClip === "clip-1-1",
            parentId: 1,
          },
          {
            id: 2,
            name: "clip-1-2",
            position: 2,
            isSelected: selectedClip.includes("clip-1-2"), // Check if this clip is selected
            isFocused: focusedClip === "clip-1-2",
            parentId: 1,
          },
        ],
      },
      {
        id: 2,
        name: "Mono track 2",
        index: 1,
        isSelected: selectedTrack.includes(2),
        isFocused: focusedTrack === 2,
        clips: [
          {
            id: 1,
            name: "clip-2-1",
            position: 1,
            isSelected: selectedClip.includes("clip-2-1"),
            isFocused: focusedClip === "clip-2-1",
            parentId: 2,
          },
        ],
      },
      {
        id: 3,
        name: "Mono track 3",
        index: 2,
        isSelected: selectedTrack.includes(3),
        isFocused: focusedTrack === 3,
        clips: [
          {
            id: 1,
            name: "clip-3-1",
            position: 1,
            isSelected: selectedClip.includes("clip-3-1"),
            isFocused: focusedClip === "clip-3-1",
            parentId: 3,
          },
          {
            id: 2,
            name: "clip-3-2",
            position: 2,
            isSelected: selectedClip.includes("clip-3-2"),
            isFocused: focusedClip === "clip-3-2",
            parentId: 3,
          },
        ],
      },
    ];
  });

  function setSelectedTrack(newSelectedTracks: number[]) {
    setSelectedTrackState(newSelectedTracks);
  }

  function setFocusedTrack(id: number) {
    setFocusedTrackState(id);
  }

  function setSelectedClip(
    newSelectedClips: string[],
    isShiftPressed: boolean
  ) {
    setSelectedClipState((prevSelectedClip) => {
      const newSelection = isShiftPressed
        ? [...new Set([...prevSelectedClip, ...newSelectedClips])]
        : newSelectedClips;

      return newSelection;
    });
  }

  function setFocusedClip(name: string) {
    setFocusedClipState(name);
  }

  function setFocusedElement(element: HTMLElement | null) {
    setFocusedElementState(element);
  }

  const value = {
    tracks,
    setTracks,
    selectedTrack,
    setSelectedTrack,
    focusedTrack,
    setFocusedTrack,
    selectedClip,
    setSelectedClip,
    focusedClip,
    setFocusedClip,
    focusedElement,
    setFocusedElement,
    trackControlIndex,
    setTrackControlIndex,
    clipControlIndex,
    setClipControlIndex,
    focusedClipPosition,
    setFocusedClipPosition,
    focusedElementType,
    setFocusedElementType,
    mainToolbarIndex,
    setMainToolbarIndex,
    playbackTimecodeIndex,
    setPlaybackTimecodeIndex,
  };

  return (
    <TrackContext.Provider value={value}>{children}</TrackContext.Provider>
  );
}

export function useTrackContext() {
  const context = useContext(TrackContext);
  if (context === undefined) {
    throw new Error("useTrackContext must be used within a TrackProvider");
  }
  return context;
}
