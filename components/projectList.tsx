import React from "react";
import Command from "./command";
import ProjectItem from "./projectItem";
import projectData from "../data/projects.json";
import useStepInterval from "../helper/useStepInterval";
const ProjectList = () => {
  const step = useStepInterval({maxStep:3, time:200});

  return (
    <div className="project-list">
      {step >= 1 && <Command command="cd Projects" />}
      {step >= 2 && <Command filePath="projects" command="ls -l" />}
      {step >= 3 && (
        <div className="project-list-body">
          <p>Click on a project for more information</p>
          <div className="project-list-body">
            {Object.entries(projectData).map(([name, project], index) => (
              <ProjectItem
                key={index}
                name={name}
                description={project.description}
                date={project.date}
                lang={project.lang}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ProjectList;
