"use client";
import { useState } from "react";
import Uptime from "./uptime";

interface StatusItemProps {
    pid: string;
    task: string;
    status: string;
    cpu: number;
    mem: number;
    info: string;
}
const StatusItem = ({ pid, task, status, cpu, mem, info }: StatusItemProps) => {
    return (
        <div className="flex flex-row px-4">
            <h1 className="w-[7%]">{pid}</h1>
            <h1 className="w-[25%]">{task}</h1>
            <h1 className="w-[15%]">{status}</h1>
            <h1 className="w-[10%]">{cpu}%</h1>
            <h1 className="w-[10%]">{mem}MB</h1>
            <h1 className="w-[33%]">{info}</h1>
        </div>
    );
}

const BarChart = ({ name, usage }: { name: string, usage: number }) => {
    const totalBlocks = 15;
    const filledBlocks = Math.round((usage / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    const bar =
        "█".repeat(filledBlocks) + "-".repeat(emptyBlocks);

    return (
        <div>
            {`${name}: [${bar}] ${usage}%`}
        </div>
    );

};



const StatusInfo = () => {
    const [cpuUsage, setCPUUsage] = useState(0)
    const [memoryUsage, setMemoryUsage] = useState(0)

    return (
        <div className="border-2 border-gray-300 rounded-sm py-4 w-full">
            <div className="flex flex-row justify-between px-4 ">
                <h1>System Status: gabeOS</h1>
                <Uptime />
            </div>
            <div className="flex flex-row gap-8 mt-1 px-4">
                {/* Bar Chart */}
                <BarChart name={"CPU"} usage={cpuUsage} />
                <BarChart name={"RAM"} usage={memoryUsage} />

            </div>
            <div>
                {/* Main Content */}
                <div className="mt-2 flex flex-row px-4 bg-[var(--color_08)] text-[var(--bg-color)]">
                    <h1 className="w-[7%]">PID</h1>
                    <h1 className="w-[25%]">TASK NAME</h1>
                    <h1 className="w-[15%]">STATUS</h1>
                    <h1 className="w-[10%]">CPU</h1>
                    <h1 className="w-[10%]">MEM</h1>
                    <h1 className="w-[33%]">INFO</h1>
                </div>
                <StatusItem pid="001" task="work" status="RUNNING" cpu={20} mem={40} info="Testing" />
                <StatusItem pid="002" task="location" status="IDLE" cpu={20} mem={40} info="Testing" />
                <StatusItem pid="003" task="now-playing" status="RUNNING" cpu={20} mem={128} info="Testing" />
                <StatusItem pid="004" task="last-commit" status="IDLE" cpu={20} mem={40} info="Testing" />



            </div>
            <div>


            </div>

        </div>
    );
};
export default StatusInfo;