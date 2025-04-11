"use client";
import React from "react";
import Command from "@/components/command";
import NowPlaying from "@/components/nowPlaying";
const Status = () => {
    return (
        <div>
            <Command command="htop" />
            <NowPlaying />
            <Command command="|" />
        </div>
    );
};
export default Status;
