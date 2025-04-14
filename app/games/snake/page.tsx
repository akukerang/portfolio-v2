import React from "react";
import Command from "@/components/command";
import Snake from "@/components/Snake";
import Link from "next/link";
const Games = () => {
    return (
        <div className="w-full h-full overflow-hidden">
            <Command filePath="Games" command="python snake.py" />
            <Link href="/games" className="color-6 underline text-xl">
                Back
            </Link>
            <Snake />
        </div>
    );
};
export default Games;
