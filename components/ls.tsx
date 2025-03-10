"use client";
import React from "react";
import CommandStatic from "./command-static";
import "./ls.css";
import Link from 'next/link';
import { usePathname } from "next/navigation";

const Ls = () => {
  const pathname = usePathname();
  return (
    <div className="ls">
      <CommandStatic command="ls" />
      <div className="lsbody">
        <Link
          href="/"
          className={pathname === "/" ? "active list-item" : "list-item"}
        >
          About
        </Link>
        <Link
          href="/projects"
          className={
            pathname === "/projects" ? "active list-item" : "list-item"
          }
        >
          Projects
        </Link>
        <Link
          href="/services"
          className={
            pathname === "/services" ? "active list-item" : "list-item"
          }
        >
          Services
        </Link>
      </div>
    </div>
  );
};
export default Ls;
