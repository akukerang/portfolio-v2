import React from "react";
import Command from "./command";
import ProjectItem from "./projectItem";
import { createClient } from '@supabase/supabase-js'
import { Database } from "@/helper/supabase"
const ProjectList = async () => {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  const projects = supabase.from("projects").select().order("date", { ascending: false });
  const { data, error } = await projects;
  if (error) {
    return <div>Error fetching projects</div>;
  }

  return (
    <div className="project-list">
      <Command command="cd Projects" />
      <Command filePath="Projects" command="ls -l" />
      <div className="project-list-body">
        <p>Click on a project for more information</p>
        <div className="project-list-body">
          {data ? Object.entries(data).map(([key, project]) => (
            <ProjectItem
              key={key}
              name={project.name || ""}
              description={project.description || ""}
              date={project.date || ""}
              lang={project.languages || ""}
            />
          )) : "Loading..."}
        </div>
      </div>
    </div>
  );
};
export default ProjectList;
