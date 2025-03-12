import React, { useEffect } from "react";
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

export default function Preferences() {
  const {
    isPreferencePanelOpen,
    closePreferencesPanel,
    activePreferencePage,
    setActivePreferencePage,
    preferencePageIndex
  } = usePanelContext();

  function onPreferenceNavItemClick(id: number) {
    setActivePreferencePage(id);
  }

  function handleCancelButtonClick() {
    if (isPreferencePanelOpen) {
      closePreferencesPanel();
    }
  }

  function handleOkButtonClick(){
    if (isPreferencePanelOpen) {
      closePreferencesPanel();
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handlePreferenceNavigation(document.activeElement as HTMLElement, event, preferencePageIndex);
    };
  
    const panel = document.querySelector('.preferences-panel');
    
    if (panel) {
      panel.addEventListener('keydown', handleKeyDown as EventListener);
      return () => panel.removeEventListener('keydown', handleKeyDown as EventListener);
    }
  }, [preferencePageIndex]);

  return (
    <div className={`${styles.container} preferences-panel`}>
      <div className={styles.header}>Preferences</div>

      <div className={styles.body}>
        <div className={styles.sideNav}>
          <PreferenceNavItem
            name="General"
            id="preferences-nav-item-0"
            tabIndex={activePreferencePage === 0 ? 0 : -1}
            onClick={() => onPreferenceNavItemClick(0)}
            isSelected={activePreferencePage === 0}
          />
          <PreferenceNavItem
            name="Interface"
            id="preferences-nav-item-1"
            tabIndex={activePreferencePage === 1 ? 0 : -1}
            onClick={() => onPreferenceNavItemClick(1)}
            isSelected={activePreferencePage === 1}
          />
          <PreferenceNavItem
            name="Audio settings"
            id="preferences-nav-item-2"
            tabIndex={activePreferencePage === 2 ? 0 : -1}
            onClick={() => onPreferenceNavItemClick(2)}
            isSelected={activePreferencePage === 2}
          />
          <PreferenceNavItem
            name="Playback/Recording"
            id="preferences-nav-item-3"
            tabIndex={activePreferencePage === 3 ? 0 : -1}
            onClick={() => onPreferenceNavItemClick(3)}
            isSelected={activePreferencePage === 3}
          />
          <PreferenceNavItem
            name="Spectral display"
            id="preferences-nav-item-4"
            tabIndex={activePreferencePage === 4 ? 0 : -1}
            onClick={() => onPreferenceNavItemClick(4)}
            isSelected={activePreferencePage === 4}
          />
          <PreferenceNavItem
            name="Editing"
            id="preferences-nav-item-5"
            tabIndex={activePreferencePage === 5 ? 0 : -1}
            onClick={() => onPreferenceNavItemClick(5)}
            isSelected={activePreferencePage === 5}
          />
          <PreferenceNavItem
            name="Effects"
            id="preferences-nav-item-6"
            tabIndex={activePreferencePage === 6 ? 0 : -1}
            onClick={() => onPreferenceNavItemClick(6)}
            isSelected={activePreferencePage === 6}
          />
          <PreferenceNavItem
            name="Cloud"
            id="preferences-nav-item-7"
            tabIndex={activePreferencePage === 7 ? 0 : -1}
            onClick={() => onPreferenceNavItemClick(7)}
            isSelected={activePreferencePage === 7}
          />
          <PreferenceNavItem
            name="Shortcuts"
            id="preferences-nav-item-8"
            tabIndex={activePreferencePage === 8 ? 0 : -1}
            onClick={() => onPreferenceNavItemClick(8)}
            isSelected={activePreferencePage === 8}
          />
          <PreferenceNavItem
            name="Plugin manager"
            id="preferences-nav-item-9"
            tabIndex={activePreferencePage === 9 ? 0 : -1}
            onClick={() => onPreferenceNavItemClick(9)}
            isSelected={activePreferencePage === 9}
          />
        </div>
        <div className={styles.mainContent}>
          {activePreferencePage === 0 && <GeneralPreferences />}
          {activePreferencePage === 1 && <InterfacePreferences />}
          {activePreferencePage === 2 && <AudioSettingsPreferences />}
          {activePreferencePage === 3 && <PlaybackRecordingPreferences />}
          {activePreferencePage === 4 && <SpectralDisplayPreferences />}
          {activePreferencePage === 5 && <EditingPreferences />}
          {activePreferencePage === 6 && <EffectsPreferences />}
          {activePreferencePage === 7 && <CloudPreferences />}
          {activePreferencePage === 8 && <ShortcutsPreferences />}
          {activePreferencePage === 9 && <PluginManagerPreferences />}
        </div>
      </div>
      <div className={styles.footer}>
        <button id="preferences-reset">Reset preferences</button>
        <div className={styles.footer_btn_group}>
          <button id="preferences-cancel" onClick={handleCancelButtonClick}>
            Cancel
          </button>
          <button id="preferences-ok" onClick={handleOkButtonClick}>Ok</button>
        </div>
      </div>
    </div>
  );
}
