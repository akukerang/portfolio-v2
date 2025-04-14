import React from "react";
import Command from "./command";
const Neofetch = () => {
  return (
    <div className="neofetch">
      <Command command="neofetch" />
      <div className="flex flex-row text-lg my-4">
        <div className="hidden md:block md:w-1/3">
          <img
            src="https://avatars.githubusercontent.com/u/22510552?v=4"
            alt="pfp"
          ></img>
        </div>
        <div className="w-full md:w-2/3 md:ml-8 2xl:ml-16">
          <h1 className="color-3 text-3xl">Gabriel Suoth</h1>
          <h1>--------------------</h1>
          <p>
            <span className="color-5">Location</span>: West Palm Beach, FL
          </p>
          <p>
            <span className="color-5">Education</span>: Florida Atlantic
            University
          </p>
          <p>
            <span className="color-5">Major</span>: BS Computer Science, Minor
            in AI
          </p>
          <p>
            <span className="color-5">Languages</span>: Python, TypeScript, JavaScript,
            Go, Java
          </p>
          <p>
            <span className="color-5">Frameworks/Libraries</span>: React, Next.js,
            Node.js, Tailwind, Flask, Flutter, Pandas, TensorFlow
          </p>
          <p>
            <span className="color-5">Tools</span>: Linux, Docker, Git, AutoCAD{" "}
            <span className="color-2 italic">(cert. 2019)</span>, MSSQL{" "}
            <span className="color-2 italic">(cert. 2019)</span>
          </p>
          <div className="flex flex-row">
            <span className="color-5">Links</span>:
            <div className="flex flex-row gap-4 ml-3">
              <a className="color-4 underline" href="mailto: gabrielsuoth@gmail.com">
                Email
              </a>
              <a className="color-4 underline" href="https://www.gitub.com/akukerang">GitHub</a>
              <a className="color-4 underline" href="https://www.linkedin.com/in/gabriel-suoth/">Linkedin</a>

            </div>

          </div>
          <div className="flex flex-row mt-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i + 1}
                className={`w-8 h-11 bgcolor-${i + 1}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Neofetch;
