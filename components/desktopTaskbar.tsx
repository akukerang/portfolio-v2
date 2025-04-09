"use client";

import React, { useEffect, useState } from "react";
import themes from "../data/themes.json";
import Clock from "./clock";
import { useTheme } from "@/helper/ThemeContext";
import WifiIcon from '@mui/icons-material/Wifi';
import Battery80Icon from '@mui/icons-material/Battery80';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
  ubuntu: Theme
  dracula: Theme;
};

const DesktopTaskbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const { selectedTheme, setSelectedTheme } = useTheme()

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value as keyof Themes;
    setSelectedTheme(selectedTheme);
    const theme = themes[selectedTheme];
    for (const variable in theme) {
      document.documentElement.style.setProperty(variable, theme[variable as keyof Theme]);
    }
  };

  useEffect(() => {
    const theme = themes[selectedTheme];
    for (const variable in theme) {
      document.documentElement.style.setProperty(variable, theme[variable as keyof Theme]);
    }
  }, []);


  return (
    <div className="hidden md:w-[100%] md:h-8 md:flex items-center justify-between 
    bg-[var(--task-bar)] text-[var(--color_08)] absolute">
      <div className="ml-8">gabeOS</div>
      <Clock />
      <div className="mr-8 flex items-center justify-center gap-4 relative">
        <WifiIcon
          fontSize="small"
        />
        <Battery80Icon className="rotate-90"
        />
        <ExpandMoreIcon
          className="hover:cursor-pointer"
          onClick={toggleDropdown}
        />
      </div>
      {isDropdownOpen && themes ? (
        <div className="absolute right-0 top-8 bg-[var(--drop-down)] 
            w-64 h-32 shadow-lg
            p-4 rounded-b-xl z-100">
          <div>
            <label htmlFor="theme">Select a theme:</label>
            <br />
            <select
              name="theme"
              id="theme"
              onChange={handleThemeChange}
              className="w-full h-10 rounded-md
              bg-[var(--bg-color)] p-3 mt-1 
              cursor-pointer
              "
              value={selectedTheme}
            >
              {Object.entries(themes).map(([name, theme]) => (
                <option
                  key={name}
                  value={name}
                  style={{
                    backgroundColor: theme["--bg-color"],
                    color: theme["--color_08"],
                  }}
                >
                  {theme.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DesktopTaskbar;