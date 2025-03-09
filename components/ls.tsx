import React from "react";
import Command from "./command";
import "./ls.css";
import Link from 'next/link';

interface lsProps {
  activeLink?: string;
}

const Ls:React.FC<lsProps> = (params) => {
  const { activeLink } = params;
  return (
    <div className="ls">
      <Command command="ls" />
      <div className="lsbody">
        <Link
          href="/"
          className={activeLink === "about" ? "active list-item" : "list-item"}
        >
          About
        </Link>
        <Link
          href="/projects"
          className={
            activeLink === "projects" ? "active list-item" : "list-item"
          }
        >
          Projects
        </Link>
        <Link
          href="/services"
          className={
            activeLink === "services" ? "active list-item" : "list-item"
          }
        >
          Services
        </Link>
      </div>
    </div>
  );
};
export default Ls;
