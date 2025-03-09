"use client";
import React, {useState, useEffect} from "react";
import "./command.css";

interface CommandProps {
  command: string;
}

const Command:React.FC<CommandProps> = (params) => {
  const [animationEnabled, setAnimationEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    setAnimationEnabled(localStorage.getItem("animationEnabled") === "true");
  }, []);

  return (
    <p>
      <span className="color-3">gabe@dev</span>:
      <span className="color-5">~</span>
      {"$ "}
      {params.command === "|" ? (
        <span className={`cursor ${animationEnabled ? "blinking" : ""}`}>
          |
        </span>
      ) : !animationEnabled || params.command === "ls" ? (
        <span className="command-body">{params.command}</span>
      ) : (
        <span className="command-body typing">{params.command}</span>
      )}
    </p>
  );
};

export default Command;
