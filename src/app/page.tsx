"use client";
import React from "react";
import ProjectToolbar from "@/components/Toolbars/ProjectToolbar";
import MainToolbar from "@/components/Toolbars/MainToolbar";
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
