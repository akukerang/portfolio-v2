import React from "react";
import Command from "@/components/command";
import ProjectInfo from "@/components/projectInfo";

const ProjectPage = async ({ params }: {
  params: Promise<{ name: string }>;
}) => {
  const { name } = await params;
  if (!name) {
    return <div>Error: Project not found</div>;
  }

  const commandString = `cat ${name}`;
  return (
    <div>
      <Command filePath="Projects" command={commandString} />
      <ProjectInfo ProjectName={name} />
    </div>
  );
};

export default ProjectPage;