import React from "react";
import styles from "./PreferencePage.module.css";
import { useTheme } from "@/context/ThemeContext";
import AccentColorCircle from "@/components/InputFields/AccentColorCircle";

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
    "accent_7"
  ];

  return (
    <div className={styles.container}>
      <fieldset>
        <legend>Themes</legend>
        <div>
          <input
            type="radio"
            id="preferences-interface-light-mode"
            name="theme"
            value="light"
            checked={themePreference === "light"}
            onChange={() => setThemePreference("light")}
          />
          <label htmlFor="preferences-interface-light-mode">Light</label>
        </div>

        <div>
          <input
            type="radio"
            id="preferences-interface-dark-mode"
            name="theme"
            value="dark"
            checked={themePreference === "dark"}
            onChange={() => setThemePreference("dark")}
          />
          <label htmlFor="preferences-interface-dark-mode">Dark</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="preferences-interface-system-theme"
            name="theme"
            value="system"
          />
          <label htmlFor="preferences-interface-system-theme">
            Follow system theme
          </label>
        </div>
        
        <div>
          <label>Accent color:</label>
          <div className={styles.accent_color_circle_container}>
            {accentColors.map((color, index) => (
              <AccentColorCircle 
                key={index} 
                color={color} 
                index={index}
              />
            ))}
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Clip style</legend>
        <div>
          <input
            type="radio"
            id="preferences-interface-colorful"
            name="preferences-clip-style"
            value="light"
            defaultChecked
          />
          <label htmlFor="preferences-interface-light-mode">Light</label>
        </div>

        <div>
          <input
            type="radio"
            id="preferences-interface-classic"
            name="preferences-clip-style"
            value="classic"
          />
          <label htmlFor="preferences-interface-dark-mode">Dark</label>
        </div>

        
      </fieldset>

    </div>
  );
}