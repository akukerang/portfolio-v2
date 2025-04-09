import React from "react";
import { useAnimation } from '@/helper/AnimationContext';

interface CommandProps {
  filePath?: string;
  command: string;
}

const Command: React.FC<CommandProps> = (params) => {
  const { animationToggled } = useAnimation();
  return (
    <p className="text-lg">
      <span className="color-3">gabe@dev</span>:
      <span className="color-5">~{params.filePath ? "/" + params.filePath : ""}</span>
      {"$ "}
      {params.command === "|" ? (
        <span className={`cursor ${animationToggled ? "blinking" : ""}`}>
          |
        </span>
      ) : !animationToggled || params.command === "ls" ? (
        <span className="">{params.command}</span>
      ) : (
        <span className="typing">{params.command}</span>
      )}
    </p>
  );
};

export default Command;
