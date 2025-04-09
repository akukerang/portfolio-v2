"use client";
import { useParams } from "next/navigation";
import React from "react";
import Command from "@/components/command";
import ProjectInfo from "@/components/projectInfo";

const ProjectPage = () => {
  const params = useParams();
  const commandString = `cat ${params.name}`;
  return (
    <div>
      <Command filePath="Projects" command={commandString} />
      {params.name && <ProjectInfo ProjectName={params.name as string} />}
    </div>
  );
};
export default ProjectPage;