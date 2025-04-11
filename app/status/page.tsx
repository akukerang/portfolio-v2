"use client";
import React from "react";
import Command from "@/components/command";
import StatusInfo from "@/components/statusInfo";
// import NowPlaying from "@/components/nowPlaying";
const Status = () => {
    return (
        <div className="w-full">
            <Command command="htop" />
            <StatusInfo />
            <Command command="|" />
        </div>
    );
};
export default Status;
