import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type ThemePreference = "light" | "dark" | "system";

interface ThemeContextType {
  themePreference: ThemePreference;
  setThemePreference: (theme: ThemePreference) => void;
  currentTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("themePreference") as ThemePreference) || "system";
    }
    return "system";
  });

  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  const currentTheme = themePreference === "system" ? systemTheme : themePreference;

  const setThemePreference = (newTheme: ThemePreference) => {
    setThemePreferenceState(newTheme);
    localStorage.setItem("themePreference", newTheme);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    setSystemTheme(mediaQuery.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", updateSystemTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateSystemTheme);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = currentTheme;
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ themePreference, setThemePreference, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}