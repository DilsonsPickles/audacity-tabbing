import React from "react";
import styles from "./PreferencePage.module.css";
import { useTheme } from "@/context/ThemeContext";
import AccentColorCircle from "@/components/InputFields/AccentColorCircle";
import InterfaceThumbnail from "@/components/Graphics/InterfaceThumbnail";
import Checkbox from "@/components/Controls/Checkbox";

export default function InterfacePreferences() {
  const { themePreference, setThemePreference } = useTheme();

  // Define accent colors array
  const accentColors = [
    "accent_1",
    "accent_2",
    "accent_3",
    "accent_4",
    "accent_5",
    "accent_6",
    "accent_7",
  ];

  return (
    <div className={styles.container}>
      <fieldset className={styles.fieldset}>
        <h1 className={styles.legend}>Themes</h1>
        <div className={styles.clip_thumbnail_group}>
          <div className={styles.clip_thumbnail_container}>
            <InterfaceThumbnail
              theme="light"
              id="preference-interface-light-mode"
              name="theme"
              value="light"
              themePreference={themePreference}
              setThemePreference={() => setThemePreference("light")}
            />
            <InterfaceThumbnail
              theme="dark"
              id="preference-interface-dark-mode"
              name="theme"
              value="dark"
              themePreference={themePreference}
              setThemePreference={() => setThemePreference("dark")}
            />
          </div>
        </div>

        <Checkbox
          id="preference-interface-system-theme"
          name="theme"
          value="system"
        >
          Follow system theme
        </Checkbox>
        <Checkbox
          id="preference-interface-high-contrast"
          name="theme"
          value="high-contrast"
        >
          Enable high contrast
        </Checkbox>

        <div className={styles.accent_color_container}>
          <label>Accent color:</label>
          <div className={styles.accent_color_circle_container}>
            {accentColors.map((color, index) => (
              <AccentColorCircle key={index} color={color} index={index} />
            ))}
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Clip style</legend>
        <div>
          <input
            type="radio"
            id="preference-interface-colorful"
            name="preference-clip-style"
            value="light"
            defaultChecked
          />
          <label htmlFor="preference-interface-light-mode">Light</label>
        </div>

        <div>
          <input
            type="radio"
            id="preference-interface-classic"
            name="preference-clip-style"
            value="classic"
          />
          <label htmlFor="preference-interface-dark-mode">Dark</label>
        </div>
      </fieldset>
    </div>
  );
}
