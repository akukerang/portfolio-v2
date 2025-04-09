"use client"
import React from "react";
import ProjectList from "@/components/projectList";
import Command from "@/components/command";
const Projects = () => {
  return (
    <div>
      <ProjectList />
      <Command filePath="Projects" command="|" />
    </div>
  );
};
export default Projects;
