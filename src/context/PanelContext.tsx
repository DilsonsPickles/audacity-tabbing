import React, { createContext, useContext, useState, ReactNode } from "react";

interface PanelContextType {
  isPreferencePanelOpen: boolean;
  toggleIsPreferencePanelOpen: () => void;
  closePreferencesPanel: () => void;
  activePreferencePage: number;
  setActivePreferencePage: (id: number) => void;
  preferencePageIndex: number;
  setPreferencePageIndex: (index: number) => void;
}

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export function PanelProvider({ children }: { children: ReactNode }) {
  const [isPreferencePanelOpen, setIsPreferencePanelOpenState] =
    useState<boolean>(false);
  const [activePreferencePage, setActivePreferencePageState] =
    useState<number>(0);
    const [preferencePageIndex, setPreferencePageIndex] = useState<number>(0);

  function toggleIsPreferencePanelOpen() {
    setIsPreferencePanelOpenState(!isPreferencePanelOpen);
    if(isPreferencePanelOpen) {
        const newFocus = document.getElementById("preferences-nav-item-0");
        newFocus?.focus();
    }
  }

  function closePreferencesPanel() {
    setIsPreferencePanelOpenState(false);
  }

  function setActivePreferencePage(id: number) {
    setActivePreferencePageState(id);
  }

  const value = {
    isPreferencePanelOpen,
    toggleIsPreferencePanelOpen,
    closePreferencesPanel,
    activePreferencePage,
    setActivePreferencePage,
    preferencePageIndex,
    setPreferencePageIndex,
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