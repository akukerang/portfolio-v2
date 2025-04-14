import React from "react";
import Command from "@/components/command";
import Snake from "@/components/Snake";
const Games = () => {
    return (
        <div className="w-full h-full">
            <Command filePath="" command="cd Games" />
            <Command filePath="Games" command="python snake.py" />
            <Snake />
        </div>
    );
};
export default Games;
