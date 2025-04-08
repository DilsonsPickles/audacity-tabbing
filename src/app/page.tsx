"use client";
import React, { useState } from "react";
import ProjectToolbar from "@/components/Toolbars/ProjectToolbar";
import MainToolbar from "@/components/Toolbars/MainToolbar";
import TrackHeadersPanel from "@/components/Panels/TrackHeadersPanel";
import RealtimeEffectsPanel from "@/components/Panels/RealtimeEffectsPanel";
import Viewport from "@/components/Viewport/Viewport";
import BottomToolbar from "@/components/Toolbars/BottomToolbar";
import { ThemeProvider } from "@/context/ThemeContext";
import { TrackProvider } from "@/context/TrackContext";
import { KeyboardProvider } from "@/context/KeyboardNavigationContext";
import { PlayheadProvider } from "@/context/PlayheadContext";
import { PanelProvider, usePanelContext } from "@/context/PanelContext";
import Preferences from "@/components/Windows/Preferences";

function HomeContent() {
  const {
    isPreferencePanelOpen,
    isEffectsPanelOpen,
    openEffectsPanel,
    closeEffectsPanel,  
    toggleIsPreferencePanelOpen,
  } = usePanelContext();

  return (
    <main>
      <div>
        <ProjectToolbar/>
        <MainToolbar />
      </div>
      {isPreferencePanelOpen && <Preferences />}
      <div
        className={`main-grid ${
          isEffectsPanelOpen ? "with-effects-panel" : ""
        }`}
      >
        {isEffectsPanelOpen && <RealtimeEffectsPanel toggleEffectsPanel={closeEffectsPanel} />}
        <TrackHeadersPanel />
        <Viewport />
      </div>
      <BottomToolbar />
    </main>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <PlayheadProvider>
        <PanelProvider>
          <TrackProvider>
            <KeyboardProvider>
              <HomeContent />
            </KeyboardProvider>
          </TrackProvider>
        </PanelProvider>
      </PlayheadProvider>
    </ThemeProvider>
  );
}
