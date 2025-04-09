"use client";
import React from "react";
import CommandStatic from "./command-static";
import Link from 'next/link';
import { usePathname } from "next/navigation";

const LSItem = ({ name, link, active }: { name: string, link: string, active: boolean }) => {
  return <div className={`text-xl underline hover:cursor-pointer ${active ? "color-7" : "color-5"}`}>
    <Link href={link}>{name}</Link>
  </div>;
}

const Ls = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col w-full">
      <CommandStatic command="ls" />
      <div className="flex flex-row gap-4">
        <LSItem name="About" link="/" active={pathname === "/"} />
        <LSItem name="Projects" link="/projects" active={pathname === "/projects"} />
        <LSItem name="Services" link="/services" active={pathname === "/services"} />
      </div>

    </div>
  );
};
export default Ls;
