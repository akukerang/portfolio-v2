"use client";

import React, { useEffect, useState } from "react";
import themes from "../data/themes.json";
import Clock from "./clock";
import { useAnimation } from '@/helper/AnimationContext';
import "./desktopTaskbar.css";
import { useTheme } from "@/helper/ThemeContext";

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
    <div className="fixed top-0 left-0 w-[100%] h-8 flex items-center justify-between 
    bg-[var(--task-bar)] text-[var(--color_08)]
    ">
      <div className="ml-5">gabeOS</div>
      <Clock />
      <div className="flex justify-between gap-10 items-center">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-3"
          viewBox="0 0 16 16"
        >
          <path d="M2 6h5v4H2z" />
          <path d="M2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm10 1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm4 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className=""
          viewBox="0 0 16 16"
        >
          <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z" />
          <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z" />
          <path d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className=""
          viewBox="0 0 16 16"
        >
          <path d="M15.384 6.115a.485.485 0 0 0-.047-.736A12.44 12.44 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.52.52 0 0 0 .668.05A11.45 11.45 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049" />
          <path d="M13.229 8.271a.482.482 0 0 0-.063-.745A9.46 9.46 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065m-2.183 2.183c.226-.226.185-.605-.1-.75A6.5 6.5 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.5 5.5 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091zM9.06 12.44c.196-.196.198-.52-.04-.66A2 2 0 0 0 8 11.5a2 2 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-caret-down-fill"
          viewBox="0 0 16 16"
          onClick={toggleDropdown}
        >
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg> */}
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
                    }} // Dynamic background color
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
  );
};

export default DesktopTaskbar;