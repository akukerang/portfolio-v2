import React from "react";
import "./command.css";

interface CommandStaticProps {
  filePath?: string;
  command: string;
}

const CommandStatic:React.FC<CommandStaticProps> = (params) => {
  return (
    <p>
      <span className="color-3">gabe@dev</span>:
      <span className="color-5">~{params.filePath ? "/" + params.filePath : ""}</span>
      {"$ "}
      <span className="command-body">{params.command}</span>

    </p>
  );
};

export default CommandStatic;
