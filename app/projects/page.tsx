"use client"

import React from "react";
import Ls from "@/components/ls";
import ProjectList from "@/components/projectList";
import Command from "@/components/command";
import useStepInterval from "@/helper/useStepInterval";
const Projects = () => {
  const step = useStepInterval({maxStep:2, time:600});
  return (
    <div>
      <Ls activeLink="projects" />
      {step >= 1 && <ProjectList />}
      {step >= 2 && <Command filePath="Projects" command="|" />}
    </div>
  );
};
export default Projects;
