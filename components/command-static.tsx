import React from "react";

interface CommandStaticProps {
  filePath?: string;
  command: string;
}

const CommandStatic: React.FC<CommandStaticProps> = (params) => {
  return (
    <p className="text-lg">
      <span className="color-3">gabe@dev</span>:
      <span className="color-5">~{params.filePath ? "/" + params.filePath : ""}</span>
      {"$ "}
      <span>{params.command}</span>

    </p>
  );
};

export default CommandStatic;
