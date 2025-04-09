"use client";

import React, { useEffect, useState } from "react";
import themes from "../data/themes.json";
import Clock from "./clock";
import { useAnimation } from '@/helper/AnimationContext';
import "./desktopTaskbar.css";
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

  const { animationToggled, toggleAnimation } = useAnimation();

  return (
    <div className="w-[100%] h-8 flex items-center justify-between 
    bg-[var(--task-bar)] text-[var(--color_08)]
    ">
      <div className="ml-8">gabeOS</div>
      <Clock />
      <div className="mr-8 flex items-center justify-center gap-4">
        <WifiIcon />
        <Battery80Icon className="rotate-90" />
        <div>
          <ExpandMoreIcon
            className="hover:cursor-pointer"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && themes ? (
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <label htmlFor="theme">Select a theme:</label>
                <br />
                <select
                  name="theme"
                  id="theme"
                  onChange={handleThemeChange}
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
              <div className="dropdown-item">
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={toggleAnimation}
                    checked={animationToggled}
                  />
                  <span className="slider round"></span>
                </label>
                Animations
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DesktopTaskbar;