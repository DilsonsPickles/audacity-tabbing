import React, { createContext, useContext, useState, ReactNode } from "react";
import { focusElement } from "@/helper/focusElement";

interface PanelContextType {
  isPreferencePanelOpen: boolean;
  toggleIsPreferencePanelOpen: () => void;
  closePreferencesPanel: () => void;
  activePreferencePage: number;
  setActivePreferencePage: (id: number) => void;
  preferencePageIndex: number;
  setPreferencePageIndex: (index: number) => void;
  isAddNewTrackPanelOpen: boolean;
  toggleIsAddNewTrackPanelOpen: () => void;
}

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export function PanelProvider({ children }: { children: ReactNode }) {
  const [isPreferencePanelOpen, setIsPreferencePanelOpenState] =
    useState<boolean>(false);
  const [activePreferencePage, setActivePreferencePageState] =
    useState<number>(0);
  const [preferencePageIndex, setPreferencePageIndex] = useState<number>(0);
  const [isAddNewTrackPanelOpen, setIsAddNewTrackPanelOpenState] = useState<boolean>(true);

  function toggleIsPreferencePanelOpen() {
    setIsPreferencePanelOpenState(!isPreferencePanelOpen);
    if (!isPreferencePanelOpen) {
      focusElement(`preference-nav-item-${preferencePageIndex}`);
    }
  }

  function closePreferencesPanel() {
    setIsPreferencePanelOpenState(false);
    focusElement("project-toolbar-audio-setup-button");
  }

  function setActivePreferencePage(id: number) {
    setActivePreferencePageState(id);
  }

  function toggleIsAddNewTrackPanelOpen(){
    setIsAddNewTrackPanelOpenState(!isAddNewTrackPanelOpen);
    focusElement("add-new-track-flyout")
  }

  const value = {
    isPreferencePanelOpen,
    toggleIsPreferencePanelOpen,
    closePreferencesPanel,
    activePreferencePage,
    setActivePreferencePage,
    preferencePageIndex,
    setPreferencePageIndex,
    isAddNewTrackPanelOpen,
    toggleIsAddNewTrackPanelOpen,
  };

  return (
    <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
  );
}

export function usePanelContext() {
  const context = useContext(PanelContext);
  if (context === undefined) {
    throw new Error("usePanelContext must be used within a PanelProvider");
  }
  return context;
}
