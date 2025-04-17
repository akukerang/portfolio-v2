import Link from 'next/link';
import DescriptionIcon from '@mui/icons-material/Description';
interface ProjectItemProps {
  name: string;
  description: string;
  date: string;
  lang: string;
}

const ProjectItem: React.FC<ProjectItemProps> = async (params) => {
  const { name, description, date, lang } = params;
  return (
    <div className="text-base my-1">

      <span className="color-8 hidden lg:inline">
        {`| ${date} | `}
      </span>
      <Link href={`/projects/${name}`}>
        <span className="color-5 text-lg hover:underline"><DescriptionIcon fontSize='inherit' className='mr-1' />{`${name}`}</span>
      </Link>
      {" | "}
      <span className="color-3 italic">{description}</span>

      <span className="color-8 hidden 2xl:inline">
        {" | "}
        <span className="color-2">
          {lang}
        </span>
        {" | "}
      </span>
    </div>
  );
};
export default ProjectItem;
