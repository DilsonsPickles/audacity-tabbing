"use client";
import React from "react";
import ProjectToolbar from "@/components/Toolbars/ProjectToolbar";
import MainToolbar from "@/components/Toolbars/MainToolbar";
import TrackHeadersPanel from "@/components/Panels/TrackHeadersPanel";
import Viewport from "@/components/Viewport/Viewport";
import BottomToolbar from "@/components/Toolbars/BottomToolbar";
import { TrackProvider } from "@/context/TrackContext";
import { KeyboardProvider } from "@/context/KeyboardNavigationContext";
import { PlayheadProvider } from "@/context/PlayheadContext";

function HomeContent() {
  return (
    <main>
      <div>
        <ProjectToolbar />
        <MainToolbar />
      </div>
      <div className="main-grid">
        <TrackHeadersPanel />
        <Viewport />
      </div>
      <BottomToolbar />
    </main>
  );
}

export default function Home() {
  return (
    <PlayheadProvider>
      <TrackProvider>
        <KeyboardProvider>
          <HomeContent />
        </KeyboardProvider>
      </TrackProvider>
    </PlayheadProvider>
  );
}
