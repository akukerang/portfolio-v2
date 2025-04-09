import React from "react";
import "./command.css";

interface CommandStaticProps {
  filePath?: string;
  command: string;
}

const CommandStatic: React.FC<CommandStaticProps> = (params) => {
  return (
    <p className="text-lg">
      <span className="text-[var(--color_03)]">gabe@dev</span>:
      <span className="text-[var(--color_05)]">~{params.filePath ? "/" + params.filePath : ""}</span>
      {"$ "}
      <span className="command-body">{params.command}</span>

    </p>
  );
};

export default CommandStatic;
