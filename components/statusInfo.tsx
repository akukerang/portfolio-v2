"use client";
import { useEffect, useState } from "react";
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
            <h1 className="w-[7%] min-w-[50px] truncate">{pid}</h1>
            <h1 className="w-[45%] md:w-[25%] min-w-[100px] truncate">{task}</h1>
            <h1 className="hidden md:block w-[15%] min-w-[80px] truncate">{status}</h1>
            <h1 className="hidden md:block w-[10%] min-w-[60px] truncate">{cpu}%</h1>
            <h1 className="hidden md:block w-[10%] min-w-[60px] truncate">{mem}MB</h1>
            <h1 className="w-[45%] md:w-[33%] min-w-[150px] truncate">{info}</h1>
        </div>
    );
};


const BarChart = ({ name, usage, max }: { name: string, usage: number, max: number }) => {
    const totalBlocks = 15;
    const percent = usage / max;
    const filledBlocks = Math.round(percent * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    const bar =
        "█".repeat(filledBlocks) + "-".repeat(emptyBlocks);
    return (
        <div>

            <span className="color-4">{`${name}: `}</span>

            <span className="hidden md:inline-block">{`[${bar}]`}</span>
            {` ${(percent * 100).toFixed(0)}%`}
        </div>
    );
};



interface StatusProps {
    stars: number;
    commits: number;
    playing: string;
}

const StatusInfo: React.FC<StatusProps> = ({ stars, commits, playing }) => {
    const [cpuUsage, setCPUUsage] = useState(48)
    const [memoryUsage, setMemoryUsage] = useState(3148)
    const [memoryValues, setMemoryValues] = useState<number[]>([1128, 432, 124, 84]);
    const [cpuValues, setCPUValues] = useState<number[]>([15, 12, 5, 4]);
    const year = new Date().getFullYear();

    const getRandomValue = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    useEffect(() => {

        const interval = setInterval(() => {
            const cpuValues =
                [
                    getRandomValue(10, 40)
                    , getRandomValue(3, 30)
                    , getRandomValue(4, 10)
                    , getRandomValue(10, 20)
                ]
            const memoryValues =
                [
                    getRandomValue(400, 1300)
                    , getRandomValue(500, 1200)
                    , getRandomValue(100, 500)
                    , getRandomValue(50, 500)
                ]
            setCPUValues(cpuValues);
            setMemoryValues(memoryValues);
            setCPUUsage(cpuValues.reduce((a, b) => a + b, 0));
            setMemoryUsage(memoryValues.reduce((a, b) => a + b, 0));
        }, 4000);
        return () => clearInterval(interval); // cleanup
    }, []);



    return (
        <div className="text-base mt-2 border-1 border-[var(--color_08)] rounded-sm py-4 w-full mb-2">
            <div className="flex flex-row justify-between px-4 ">
                <h1><span className="color-2">System Status:</span> gabeOS</h1>
                <Uptime />
            </div>
            <div className="flex flex-row gap-8 mt-1 px-4">
                {/* Bar Chart */}
                <BarChart name={"CPU"} usage={cpuUsage} max={100} />
                <BarChart name={"MEM"} usage={memoryUsage} max={8192} />

            </div>
            <div>
                {/* Main Content */}
                <div className="mt-2 flex flex-row px-4 bg-[var(--color_08)] text-[var(--bg-color)]">
                    <h1 className="w-[7%] min-w-[50px] truncate">PID</h1>
                    <h1 className="w-[45%] md:w-[25%] min-w-[100px] truncate">TASK NAME</h1>
                    <h1 className="hidden md:block w-[15%] min-w-[80px] truncate">STATUS</h1>
                    <h1 className="hidden md:block w-[10%] min-w-[60px] truncate">CPU</h1>
                    <h1 className="hidden md:block w-[10%] min-w-[0px] truncate">MEM</h1>
                    <h1 className="w-[45%] md:w-[33%] min-w-[150px] truncate">INFO</h1>
                </div>
                <StatusItem pid="001" task="work" status="RUNNING" cpu={cpuValues[0]} mem={memoryValues[0]} info="Student" />
                <StatusItem pid="002" task="now-playing" status={playing !== "" ? "RUNNING" : "IDLE"}
                    cpu={cpuValues[1]} mem={memoryValues[1]} info={playing !== "" ? playing : "Nothing playing"} />
                <StatusItem pid="003" task="github-stars" status="IDLE" cpu={cpuValues[2]} mem={memoryValues[2]} info={`${stars} stars`} />
                <StatusItem pid="004" task="github-commits" status="IDLE" cpu={cpuValues[3]} mem={memoryValues[3]} info={`${commits} commits (${year})`} />
            </div>
            <div>


            </div>

        </div>
    );
};
export default StatusInfo;