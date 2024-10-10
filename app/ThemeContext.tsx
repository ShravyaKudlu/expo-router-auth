// ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";

type ThemeContextType = {
  theme: {
    background: string;
    text: string;
    tint: string;
    separator: string;
  };
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const scheme = useColorScheme();
  const [theme, setTheme] = useState(Colors.light);

  useEffect(() => {
    setTheme(Colors[scheme as "light" | "dark"] || Colors.light);
  }, [scheme]);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
