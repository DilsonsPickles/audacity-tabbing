import React, { useEffect, useState, useRef } from "react";
import styles from "./Preferences.module.css";
import PreferenceNavItem from "@/components/ListItems/PreferenceNavItem";
import { usePanelContext } from "@/context/PanelContext";
import GeneralPreferences from "@/components/PreferencePages/GeneralPreferences";
import InterfacePreferences from "@/components/PreferencePages/InterfacePreferences";
import AudioSettingsPreferences from "@/components/PreferencePages/AudioSettingsPreferences";
import PlaybackRecordingPreferences from "@/components/PreferencePages/PlaybackRecordPreferences";
import SpectralDisplayPreferences from "@/components/PreferencePages/SpectralDisplayPreferences";
import EditingPreferences from "@/components/PreferencePages/EditingPreferences";
import EffectsPreferences from "@/components/PreferencePages/EffectsPreferences";
import CloudPreferences from "@/components/PreferencePages/CloudPreferences";
import ShortcutsPreferences from "@/components/PreferencePages/ShortcutsPreferences";
import PluginManagerPreferences from "@/components/PreferencePages/PluginManagerPreferences";
import { handlePreferenceNavigation } from "@/utils/handlePreferenceNavigation";
import ButtonPrimary from "../Buttons/ButtonPrimary/ButtonPrimary";

// Define preference pages for easy mapping
const PREFERENCE_PAGES = [
  { id: 0, name: "General", component: GeneralPreferences },
  { id: 1, name: "Interface", component: InterfacePreferences },
  { id: 2, name: "Audio settings", component: AudioSettingsPreferences },
  { id: 3, name: "Playback/Recording", component: PlaybackRecordingPreferences },
  { id: 4, name: "Spectral display", component: SpectralDisplayPreferences },
  { id: 5, name: "Editing", component: EditingPreferences },
  { id: 6, name: "Effects", component: EffectsPreferences },
  { id: 7, name: "Cloud", component: CloudPreferences },
  { id: 8, name: "Shortcuts", component: ShortcutsPreferences },
  { id: 9, name: "Plugin manager", component: PluginManagerPreferences }
];

export default function Preferences() {
  const {
    isPreferencePanelOpen,
    closePreferencesPanel,
    activePreferencePage,
    setActivePreferencePage,
    preferencePageIndex
  } = usePanelContext();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const focusedElement = document.activeElement as HTMLElement;
  
      // Trap focus inside the preferences panel
      if (
        !document.querySelector(".preferences-panel")?.contains(focusedElement)
      ) {
        event.preventDefault();
        document.getElementById("preferences-ok")?.focus();
      }
  
      handlePreferenceNavigation(focusedElement, event, activePreferencePage, closePreferencesPanel);
    };
  
    document.addEventListener("keydown", handleKeyDown);
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePreferencePage]);

  // Event handlers
  const onPreferenceNavItemClick = (id: number) => {
    setActivePreferencePage(id);
  };

  const handleDoneButtonClick = () => {
    if (isPreferencePanelOpen) {
      closePreferencesPanel();
    }
  };

  // Get the active preference page component
  const ActiveComponent = PREFERENCE_PAGES.find(page => page.id === activePreferencePage)?.component;

  return (
    <div 
      className={`${styles.container} preferences-panel`} 
    >
      <div className={styles.header}>Preferences</div>

      <div className={styles.body}>
        <div className={styles.side_nav}>
          {PREFERENCE_PAGES.map(page => (
            <PreferenceNavItem
              key={page.id}
              name={page.name}
              id={`preference-nav-item-${page.id}`}
              tabIndex={activePreferencePage === page.id ? 0 : -1}
              onClick={() => onPreferenceNavItemClick(page.id)}
              isSelected={activePreferencePage === page.id}
            />
          ))}
        </div>
        <div className={styles.main_content}>
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
      
      <div className={styles.footer}>
        <button id="preference-reset-button">Reset preferences</button>
        <div className={styles.footer_btn_group}>
         
          <ButtonPrimary tabIndex={0} id="preference-done-button" onClick={handleDoneButtonClick} fixedWidth>Done</ButtonPrimary>
        </div>
      </div>
    </div>
  );
}