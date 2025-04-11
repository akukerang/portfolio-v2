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
            <h1 className="w-[7%]">{pid}</h1>
            <h1 className="w-[25%]">{task}</h1>
            <h1 className="w-[15%]">{status}</h1>
            <h1 className="w-[10%]">{cpu}%</h1>
            <h1 className="w-[10%]">{mem}MB</h1>
            <h1 className="w-[33%]">{info}</h1>
        </div>
    );
}

const BarChart = ({ name, usage, max }: { name: string, usage: number, max: number }) => {
    const totalBlocks = 15;
    const percent = usage / max;
    const filledBlocks = Math.round(percent * totalBlocks);
    console.log(usage, max, percent, filledBlocks);

    const emptyBlocks = totalBlocks - filledBlocks;
    const bar =
        "█".repeat(filledBlocks) + "-".repeat(emptyBlocks);

    return (
        <div>
            {`${name}: [${bar}] ${(percent * 100).toFixed(2)}%`}
        </div>
    );

};



const StatusInfo = () => {
    const [cpuUsage, setCPUUsage] = useState(0)
    const [memoryUsage, setMemoryUsage] = useState(0)
    const [memoryValues, setMemoryValues] = useState<number[]>([0, 0, 0, 0]);
    const [cpuValues, setCPUValues] = useState<number[]>([0, 0, 0, 0]);

    const getRandomValue = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const cpuValues =
                [
                    getRandomValue(10, 40)
                    , getRandomValue(3, 10)
                    , getRandomValue(4, 20)
                    , getRandomValue(10, 30)
                ]
            const memoryValues =
                [
                    getRandomValue(400, 1300)
                    , getRandomValue(150, 600)
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
        <div className="mt-2 border-2 border-gray-300 rounded-sm py-4 w-full">
            <div className="flex flex-row justify-between px-4 ">
                <h1>System Status: gabeOS</h1>
                <Uptime />
            </div>
            <div className="flex flex-row gap-8 mt-1 px-4">
                {/* Bar Chart */}
                <BarChart name={"CPU"} usage={cpuUsage} max={100} />
                <BarChart name={"MEM"} usage={memoryUsage} max={16384} />

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
                <StatusItem pid="001" task="work" status="RUNNING" cpu={cpuValues[0]} mem={memoryValues[0]} info="Testing" />
                <StatusItem pid="002" task="location" status="IDLE" cpu={cpuValues[1]} mem={memoryValues[1]} info="Testing" />
                <StatusItem pid="003" task="now-playing" status="RUNNING" cpu={cpuValues[2]} mem={memoryValues[2]} info="Testing" />
                <StatusItem pid="004" task="last-commit" status="IDLE" cpu={cpuValues[3]} mem={memoryValues[3]} info="Testing" />



            </div>
            <div>


            </div>

        </div>
    );
};
export default StatusInfo;