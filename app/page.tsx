import Neofetch from "@/components/neofetch";
import Command from "@/components/command";
export default async function Home() {
  return (
    <div>
      <Neofetch />
      <Command command="|" />
    </div>
  );
}
