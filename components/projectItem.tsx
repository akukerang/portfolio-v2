import Link from 'next/link';
import "./projects.css";

interface ProjectItemProps {
  name: string;
  description: string;
  date: string;
  lang: string;
}

const ProjectItem:React.FC<ProjectItemProps> = (params) => {
  const { name, description, date, lang } = params;
  return (
    <div className="projectItem">
      {"| "}
      <span className="color-8">{date}</span>
      {" | "}
      <Link href={`/projects/${name}`}>
        <span className="color-5 name">{name}</span>
      </Link>
      {" | "}
      <span className="color-3">{description}</span>
      {" | "}
      <span className="color-2">{lang}</span>
      {" |"}
    </div>
  );
};
export default ProjectItem;
