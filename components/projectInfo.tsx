import Link from 'next/link';
import React, { useEffect, useState } from "react";
import Carousel from "./carousel";
import { createClient } from '@supabase/supabase-js'
import { Database, Tables } from "@/helper/supabase"


interface ProjectInfoProps {
  ProjectName: string;
}

type ProjectMedia = {
  images?: string[];
  videos?: string[];
};

const ProjectInfo: React.FC<ProjectInfoProps> = ({ ProjectName }) => {
  const [project, setProject] = useState<(Tables<'projects'> & { media?: { images?: string[] } }) | null>(null);
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );
  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select()
        .eq("name", ProjectName);

      if (error) {
        console.error("Error fetching projects:", error);
        return;
      }

      if (data && data[0]) {
        const parsedProject = {
          ...data[0],
          media: (data[0].media || {}) as ProjectMedia,
        };
        setProject(parsedProject);
      } else {
        setProject(null);
      }
    };

    fetchProject();
  }, [ProjectName]);


  if (!project) return null;

  return (
    <div className="projectInfo">
      <div className="flex flex-col lg:flex-row mt-2">
        <div className='w-full lg:w-2/5'>
          <Link href="/projects" className="lg:hidden color-6 underline text-xl">
            Back
          </Link>
          {project.media?.images && Array.isArray(project.media.images) && project.media.images.length > 0 && (
            <Carousel images={project.media.images} />
          )}
          {/* {project.media?.videos.length > 0 ? (
              <div>
                <iframe
                  className="yt-video"
                  src={project.videos}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            ) : null} */}
        </div>
        <div className="w-full lg:w-3/5 lg:ml-8 mt-2">
          <Link href="/projects" className="hidden lg:block color-6 underline text-xl">
            Back
          </Link>
          <h1 className='text-3xl color-3 mb-2'>{ProjectName}</h1>
          <p className='text-base mb-2'>{project.summary}</p>
          <p className='mb-2 text-lg'>
            <span className="color-2">Technologies used</span>:{" "}
            {project.languages ? project.languages : "N/A"}
          </p>

          <Link
            href={project.link ? project.link : ""}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="w-12 h-12 fill-[var(--color_04)]"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;