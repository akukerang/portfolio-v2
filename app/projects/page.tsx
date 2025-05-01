import React from "react";
import ProjectList from "@/components/projectList";
import Command from "@/components/command";
export const revalidate = 0; // Revalidate on every request

const Projects = async () => {
  return (
    <div>
      <ProjectList />
      <Command filePath="Projects" command="|" />
    </div>
  );
};
export default Projects;
