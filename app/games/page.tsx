import React from "react";
import Command from "@/components/command";
import GameList from "@/components/GameList";
const GamesPage = async () => {
    return (
        <div className="w-full h-full overflow-hidden">
            <Command filePath="" command="cd Games" />
            <Command filePath="Games" command="ls -l" />
            <p>Click on a game to start playing</p>
            <GameList />
        </div>
    );
};
export default GamesPage;
