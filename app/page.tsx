"use client";
import Neofetch from "@/components/neofetch";
import Command from "@/components/command"; 
import Ls from "@/components/ls";
import useStepInterval from "../helper/useStepInterval";
export default function Home() {
  const step = useStepInterval({maxStep: 2, time: 300});

  return (
    <div>
      <Ls activeLink="about" />
      {step >= 1 && <Neofetch />}
      {step >= 2 && <Command command="|" />}
    </div>
  );
}
