import React from "react";
import Command from "@/components/command";
import GameList from "@/components/GameList";
const Games = () => {
    return (
        <div className="w-full h-full overflow-hidden">
            <Command filePath="" command="cd Games" />
            <Command filePath="Games" command="ls -l" />
            <GameList />
        </div>
    );
};
export default Games;
