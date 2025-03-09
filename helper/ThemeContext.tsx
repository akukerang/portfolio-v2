"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

type Theme = {
    name: string;
    "--task-bar": string;
    "--drop-down": string;
    "--bg-color": string;
    "--color_01": string;
    "--color_02": string;
    "--color_03": string;
    "--color_04": string;
    "--color_05": string;
    "--color_06": string;
    "--color_07": string;
    "--color_08": string;
};

type Themes = {
    macchiato: Theme;
    latte: Theme;
    frappe: Theme;
    mocha: Theme;
    ubuntu: Theme;
    dracula: Theme;
};


interface ThemeContextType {
  selectedTheme: keyof Themes;
  setSelectedTheme: (theme: keyof Themes) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider:React.FC<ThemeProviderProps> = ({ children }) => {
    const [selectedTheme, setSelectedTheme] = useState<keyof Themes>('macchiato');

  return (
    <ThemeContext.Provider value={{selectedTheme, setSelectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
  };
