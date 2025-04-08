import React, { createContext, useContext, useState, ReactNode } from "react";
import { focusElement } from "@/helper/focusElement";

interface PanelContextType {
  isPreferencePanelOpen: boolean;
  toggleIsPreferencePanelOpen: () => void;
  openEffectsPanel: () => void;
  closeEffectsPanel: () => void;
  isEffectsPanelOpen: boolean;
  closePreferencesPanel: () => void;
  activePreferencePage: number;
  setActivePreferencePage: (id: number) => void;
  preferencePageIndex: number;
  setPreferencePageIndex: (index: number) => void;
  isAddNewTrackPanelOpen: boolean;
  toggleIsAddNewTrackPanelOpen: () => void;
  openContextMenuClipId: string | null;  // Changed from boolean to string | null
  toggleClipContextMenu: (clipId: string) => void;  // Updated to take a clipId
  closeAllClipContextMenus: () => void;  // Added for convenience
}

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export function PanelProvider({ children }: { children: ReactNode }) {
  const [isEffectsPanelOpen, setIsEffectsPanelOpenState] =
    useState<boolean>(false);
  const [isPreferencePanelOpen, setIsPreferencePanelOpenState] =
    useState<boolean>(false);
  const [activePreferencePage, setActivePreferencePageState] =
    useState<number>(0);
  const [preferencePageIndex, setPreferencePageIndex] = useState<number>(0);
  const [isAddNewTrackPanelOpen, setIsAddNewTrackPanelOpenState] =
    useState<boolean>(false);
  const [openContextMenuClipId, setOpenContextMenuClipId] = 
    useState<string | null>(null);

  // Updated function to toggle context menu for a specific clip
  function toggleClipContextMenu(clipId: string) {
    if (openContextMenuClipId === clipId) {
      // If this clip's menu is already open, close it
      setOpenContextMenuClipId(null);
    } else {
      // Close any open menu and open this clip's menu
      setOpenContextMenuClipId(clipId);
    }
  }

  // Added function to close all context menus
  function closeAllClipContextMenus() {
    setOpenContextMenuClipId(null);
  }

  function toggleIsPreferencePanelOpen() {
    setIsPreferencePanelOpenState(!isPreferencePanelOpen);
    if (!isPreferencePanelOpen) {
      focusElement(`preference-nav-item-${preferencePageIndex}`);
    }
  }

  function openEffectsPanel() {
    setIsEffectsPanelOpenState(true);
  }

  function closeEffectsPanel() {
    setIsEffectsPanelOpenState(false);
  }   

  function closePreferencesPanel() {
    setIsPreferencePanelOpenState(false);
    focusElement("toolbar-project-group-2-item-1");
  }

  function setActivePreferencePage(id: number) {
    setActivePreferencePageState(id);
  }

  function toggleIsAddNewTrackPanelOpen() {
    setIsAddNewTrackPanelOpenState(!isAddNewTrackPanelOpen);
    focusElement("add-new-track-flyout");
  }

  const value = {
    isEffectsPanelOpen,
    openEffectsPanel,
    closeEffectsPanel,
    isPreferencePanelOpen,
    toggleIsPreferencePanelOpen,
    closePreferencesPanel,
    activePreferencePage,
    setActivePreferencePage,
    preferencePageIndex,
    setPreferencePageIndex,
    isAddNewTrackPanelOpen,
    toggleIsAddNewTrackPanelOpen,
    openContextMenuClipId,
    toggleClipContextMenu,
    closeAllClipContextMenus,
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