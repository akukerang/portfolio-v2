import Link from 'next/link';
import React, { useEffect, useState } from "react";
import "./projects.css";
import projectData from "@/data/projects.json";
import Carousel from "./carousel";

interface ProjectInfoProps {
  ProjectName: string;
}

type Project = {
  description: string;
  date: string;
  lang: string;
  summary: string;
  link: string;
  images: string[];
  videos: string;
};

type ProjectData = {
  [key: string]: Project;
};

// Cast projectData to the defined type
const projects: ProjectData = projectData;

const ProjectInfo: React.FC<ProjectInfoProps> = (params) => {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (params.ProjectName) {
      setProject(projects[params.ProjectName]);
    }
  }, [params.ProjectName]);

  return (
    <div className="projectInfo">
      {project ? (
        <>
          <div className="info-body">
            {project.images.length > 0 ? (
              <Carousel images={project.images} />
            ) : null}
            {project.videos ? (
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
            ) : null}

            <div className="info-body-text">
              <Link href="/projects" className="back-button">
                Back
              </Link>
              <h1>{params.ProjectName}</h1>
              <p>{project.summary}</p>
              <p>
                <span className="color-2">Technologies used</span>:{" "}
                {project.lang}
              </p>
              <Link
                href={project.link}
                target="_blank"
                className="btn btn-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  className="github-icon"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ProjectInfo;