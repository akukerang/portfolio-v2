"use client"

import React from "react";
import ProjectList from "@/components/projectList";
import Command from "@/components/command";
import useStepInterval from "@/helper/useStepInterval";
const Projects = () => {
  const step = useStepInterval({maxStep:2, time:300});
  return (
    <div>
      {step >= 1 && <ProjectList />}
      {step >= 2 && <Command filePath="Projects" command="|" />}
    </div>
  );
};
export default Projects;
