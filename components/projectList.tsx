import React, { useEffect, useState } from "react";
import Command from "./command";
import ProjectItem from "./projectItem";
import useStepInterval from "@/helper/useStepInterval";
import { createClient } from '@supabase/supabase-js'
import { Database, Tables } from "@/helper/supabase"
const ProjectList = () => {
  const step = useStepInterval({maxStep:3, time:200});
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );
  const [projects, setProjects] = useState<Tables<'projects'>[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = supabase.from("projects").select().order("date", { ascending: false });
      const { data, error } = await projects;
      if (error) {
        console.error("Error fetching projects:", error);
      } 
      setProjects(data || []);
      };
    fetchProjects();
  }, []);





  return (
    <div className="project-list">
      {step >= 1 && <Command command="cd Projects" />}
      {step >= 2 && <Command filePath="Projects" command="ls -l" />}
      {step >= 3 && (
        <div className="project-list-body">
          <p>Click on a project for more information</p>
          <div className="project-list-body">
            {Object.entries(projects).map(([key, project]) => (
              <ProjectItem
                key={key}
                name={project.name || ""}
                description={project.description || ""}
                date={project.date || ""}
                lang={project.languages || ""}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ProjectList;
