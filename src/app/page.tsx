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
  const [realtimeEffectsPanelIsOpen, setRealtimeEffectsPanelIsOpen] =
    useState(true);

  function toggleRealtimeEffectsPanel() {
    setRealtimeEffectsPanelIsOpen(!realtimeEffectsPanelIsOpen);
  }

  const {
    isPreferencePanelOpen,
    toggleIsPreferencePanelOpen,
  } = usePanelContext();

  return (
    <main>
      <div>
        <ProjectToolbar
          onEffectButtonClick={toggleRealtimeEffectsPanel}
          onAudioSetupButtonClick={toggleIsPreferencePanelOpen}
        />
        <MainToolbar />
      </div>
      {isPreferencePanelOpen && <Preferences />}
      <div
        className={`main-grid ${
          realtimeEffectsPanelIsOpen ? "with-effects-panel" : ""
        }`}
      >
        {realtimeEffectsPanelIsOpen && <RealtimeEffectsPanel />}
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
