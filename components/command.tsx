import React from "react";

interface CommandProps {
  filePath?: string;
  command: string;
}

const Command: React.FC<CommandProps> = (params) => {
  return (
    <p className="text-lg">
      <span className="color-3">gabe@dev</span>:
      <span className="color-5">~{params.filePath ? "/" + params.filePath : ""}</span>
      {"$ "}
      {params.command === "|" ? (
        <span className={"cursor animate-blink"}>
          |
        </span>
      ) : (
        params.command
      )}
    </p>
  );
};

export default Command;
