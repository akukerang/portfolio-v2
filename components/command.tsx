import React from "react";
import "./command.css";
import { useAnimation } from '@/helper/AnimationContext';

interface CommandProps {
  filePath?: string;
  command: string;
}

const Command:React.FC<CommandProps> = (params) => {
  const { animationToggled } = useAnimation();
  return (
    <p>
      <span className="color-3">gabe@dev</span>:
      <span className="color-5">~{params.filePath ? "/" + params.filePath : ""}</span>
      {"$ "}
      {params.command === "|" ? (
        <span className={`cursor ${animationToggled ? "blinking" : ""}`}>
          |
        </span>
      ) : !animationToggled || params.command === "ls" ? (
        <span className="command-body">{params.command}</span>
      ) : (
        <span className="command-body typing">{params.command}</span>
      )}
    </p>
  );
};

export default Command;
