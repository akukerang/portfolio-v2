"use client";
import React from "react";
import Command from "@/components/command";
import StatusInfo from "@/components/statusInfo";
// import NowPlaying from "@/components/nowPlaying";
const Status = () => {
    return (
        <div>
            <Command command="htop" />
            <StatusInfo />
            <Command command="|" />
        </div>
    );
};
export default Status;
