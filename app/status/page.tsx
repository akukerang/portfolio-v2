import React from "react";
import Command from "@/components/command";
import StatusInfo from "@/components/statusInfo";
import getPlaying from "@/server/getPlaying";
import getGitHub from "@/server/getGitHub";



const { stars, commits } = await getGitHub();
const data = await getPlaying();
let playing: string;

if (data?.error) {
    playing = "";
} else {
    playing = `${data?.artist} - ${data?.song}`;
}
const Status = async () => (
    // Get stuff
    <div className="w-full">
        <Command command="htop" />
        <StatusInfo stars={stars} commits={commits} playing={playing} />
        <Command command="|" />
    </div>
);
export default Status;
