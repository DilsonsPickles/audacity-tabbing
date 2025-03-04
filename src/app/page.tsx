"use client";
import React from "react";
import ProjectToolbar from "@/components/Toolbars/ProjectToolbar";
import MainToolbar from "@/components/Toolbars/MainToolbar";
import RealtimeEffectsPanel from "@/components/Panels/RealtimeEffectsPanel";
import TrackHeadersPanel from "@/components/Panels/TrackHeadersPanel";
import Viewport from "@/components/Viewport/Viewport";
import { TrackProvider } from "@/context/TrackContext";
import { KeyboardProvider } from "@/context/KeyboardNavigationContext";

function HomeContent() {
  return (
    <main>
      <div>
        <ProjectToolbar />
        <MainToolbar />
      </div>
      <div className="main-grid">
        <RealtimeEffectsPanel />
        <TrackHeadersPanel />
        <Viewport />
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <TrackProvider>
      <KeyboardProvider>
        <HomeContent />
      </KeyboardProvider>
    </TrackProvider>
  );
}
