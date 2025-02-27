"use client";
import React, { useEffect, useState } from "react";
import ProjectToolbar from "@/components/Toolbars/ProjectToolbar";
import MainToolbar from "@/components/Toolbars/MainToolbar";
import RealtimeEffectsPanel from "@/components/Panels/RealtimeEffectsPanel";
import TrackHeadersPanel from "@/components/Panels/TrackHeadersPanel";
import Viewport from "@/components/Viewport/Viewport";

interface Clip {
  id: number;
}

export interface TrackData {
  name: string;
  id: number;
  clips: Clip[]; // Clips included in track data
}

export default function Home() {
  const [tracks, setTracks] = useState<TrackData[]>([
    {
      name: "Mono track 1",
      id: 1,
      clips: [{ id: 101 }, { id: 102 }],
    },
    {
      name: "Mono track 2",
      id: 2,
      clips: [{ id: 201 }],
    },
    {
      name: "Mono track 3",
      id: 3,
      clips: [{ id: 301 }, { id: 302 }],
    },
  ]);

  const [selectedTrack, setSelectedTrack] = useState<number>(1);
  const [focusedTrack, setFocusedTrack] = useState<number>(1);
  const [selectedClip, setSelectedClip] = useState<number>(0);
  const [focusedClip, setFocusedClip] = useState<number>(0);

  function handleTrackSelection(id: number) {
    setSelectedTrack(id);
  }

  function handleTrackFocus(id: number) {
    setFocusedTrack(id);
  }

  function handleClipSelection(id: number) {
    if (id === selectedClip) {
      setSelectedClip(0);
    } else {
      setSelectedClip(id);
    }
  }

  function handleClipFocus(id: number) {
    setFocusedClip(id);
  }

  useEffect(() => {
    function logFocus() {
      const activeElement = document.activeElement;
      if (activeElement) {
        console.log("Focused Element:", {
          tag: activeElement.tagName,
          id: activeElement.id,
          className: activeElement.className,
          role: activeElement.getAttribute("role"),
        });
      }
    }
  
    document.addEventListener("focusin", logFocus);
    return () => document.removeEventListener("focusin", logFocus);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Disable main arrow key behavior if a clip is focused
      if (focusedClip !== 0) return;
  
      if (event.key === "ArrowUp") {
        setFocusedTrack((prev) => Math.max(1, prev - 1)); // Move up
      } else if (event.key === "ArrowDown") {
        setFocusedTrack((prev) => Math.min(tracks.length, prev + 1)); // Move down
      } else if (event.key === "Enter") {
        setSelectedTrack(focusedTrack);
      }
    }
  
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [tracks.length, focusedTrack, focusedClip]);

  return (
    <main>
      <div>
        <ProjectToolbar />
        <MainToolbar />
      </div>
      <div className="main-grid">
        <RealtimeEffectsPanel />
        <TrackHeadersPanel
          tracks={tracks}
          selectedTrack={selectedTrack}
          setSelectedTrack={handleTrackSelection}
          focusedTrack={focusedTrack}
          setFocusedTrack={handleTrackFocus}
        />
        <Viewport
          tracks={tracks}
          selectedTrack={selectedTrack}
          setSelectedTrack={handleTrackSelection}
          focusedTrack={focusedTrack}
          setFocusedTrack={handleTrackFocus}
          selectedClip={selectedClip}
          setSelectedClip={handleClipSelection}
          focusedClip={focusedClip}
          setFocusedClip={handleClipFocus}
        />
      </div>
    </main>
  );
}
