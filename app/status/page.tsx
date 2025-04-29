import React from "react";
import Command from "@/components/command";
import StatusInfo from "@/components/statusInfo";
import getPlaying from "@/server/getPlaying";
import getGitHub from "@/server/getGitHub";

const Status = async () => {
    const [playingResult, githubResult] = await Promise.allSettled([getPlaying(), getGitHub()]);

    let playing: { error: string, song: string; artist: string } = { error: "", song: "", artist: "" };
    let stars: number = 0;
    let commits: number = 0;


    if (githubResult.status === "fulfilled") {
        stars = githubResult.value.stars;
        commits = githubResult.value.commits;
    }

    if (playingResult.status === "fulfilled") {
        playing = { error: playingResult.value.error || "", song: playingResult.value.song, artist: playingResult.value.artist };
    }

    return (
        <div className="w-full">
            <Command command="htop" />
            <StatusInfo stars={stars} commits={commits} playing={playing} />
            <Command command="|" />
        </div>
    );
};

export default Status;
