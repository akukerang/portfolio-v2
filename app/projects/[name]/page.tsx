"use client";
import { useParams } from "next/navigation";
import React from "react";
import Command from "@/components/command";
import ProjectInfo from "@/components/projectInfo";
import useStepInterval from "@/helper/useStepInterval";

const ProjectPage = () => {
  const params = useParams();
  const commandString = `cat ${params.name}`;
  const steps = useStepInterval({maxStep:2, time:300});
  return (
    <div>
      {steps >= 1 && <Command filePath="Projects" command={commandString} />}
      {steps >= 2 && params.name && <ProjectInfo ProjectName={params.name as string} />}
    </div>
  );
};
export default ProjectPage;