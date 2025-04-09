"use client";
import Neofetch from "@/components/neofetch";
import Command from "@/components/command";
export default function Home() {
  return (
    <div>
      <Neofetch />
      <Command command="|" />
    </div>
  );
}
