
import React from "react";
import "./neofetch.css";
import Command from "./command";
import useStepInterval from "../helper/useStepInterval";

const Neofetch = () => {
  const step = useStepInterval({maxStep: 2, time: 300});

  return (
    <div className="neofetch">
      {step >= 1 && <Command command="neofetch" />}
      {step >= 2 && (
        <div className="neobody">
          <div className="profile-pic">
            <img
              src="https://avatars.githubusercontent.com/u/22510552?v=4"
              alt="pfp"
            ></img>
          </div>
          <div className="info">
            <h1 className="color-3">Gabriel Suoth</h1>
            <h1>--------------------</h1>
            <p>
              <span className="color-5">Education</span>: Florida Atlantic
              University
            </p>
            <p>
              <span className="color-5">Major</span>: BS Computer Science, Minor
              in AI
            </p>
            <p>
              <span className="color-5">Languages</span>: Python, JavaScript,
              Java
            </p>
            <p>
              <span className="color-5">Frameworks/Libraries</span>: React,
              Node.js, Pandas, Flask, Flutter
            </p>
            <p>
              <span className="color-5">Tools</span>: GNU/Linux, Git, AutoCAD{" "}
              <span className="color-2">(cert. 2019)</span>, MSSQL{" "}
              <span className="color-2">(cert. 2019)</span>
            </p>
            <div className="links">
              <span className="color-5">Links</span>:
              <a className="first-link" href="mailto: gabrielsuoth@gmail.com">
                Email
              </a>
              <a href="https://www.github.com/akukerang">Github</a>
              <a href="https://www.linkedin.com/in/gabriel-suoth/">Linkedin</a>
            </div>
            <div className="color-palette">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i + 1}
                  className={`color-block bgcolor-${i + 1}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Neofetch;
