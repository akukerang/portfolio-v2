"use client";
import Neofetch from "@/components/neofetch";
import Command from "@/components/command"; 
import useStepInterval from "../helper/useStepInterval";
export default function Home() {
  const step = useStepInterval({maxStep: 2, time: 300});

  return (
    <div>
      {step >= 1 && <Neofetch />}
      {step >= 2 && <Command command="|" />}
    </div>
  );
}
