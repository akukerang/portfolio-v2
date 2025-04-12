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
    const [cpuUsage, setCPUUsage] = useState(48)
    const [memoryUsage, setMemoryUsage] = useState(3148)
    const [memoryValues, setMemoryValues] = useState<number[]>([1128, 432, 124, 84]);
    const [cpuValues, setCPUValues] = useState<number[]>([15, 12, 5, 4]);
    const [playing, setPlaying] = useState("");
    const [stars, setStars] = useState(0);
    const [commits, setCommits] = useState(0);
    const [year, setYear] = useState(new Date().getFullYear());

    const getRandomValue = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };


    const getNowPlaying = async () => {
        try {
            const res = await fetch('/api/nowPlaying');
            const data = await res.json();
            if (data.error || !data.isPlaying) {
                return "";
            }
            return `${data.artist} - ${data.song}`;
        } catch (error) {
            console.error("Error fetching now playing data:", error);
            return "";
        }
    }

    const getStats = async () => {
        try {
            const res = await fetch('/api/github');
            const data = await res.json();
            if (data.error) {
                return null;
            }
            return { stars: data.stars, commits: data.commits };
        } catch (error) {
            console.error("Error fetching GitHub data:", error);
            return null;
        }
    }


    useEffect(() => {
        const fetchNowPlaying = async () => {
            const nowPlaying = await getNowPlaying();
            setPlaying(nowPlaying);
        };
        fetchNowPlaying();
        const fetchStats = async () => {
            const stats = await getStats();
            if (stats) {
                setStars(stats.stars);
                setCommits(stats.commits);
            }
        }
        fetchStats();
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
        <div className="mt-2 border-2 border-gray-300 rounded-sm py-4 w-full">
            <div className="flex flex-row justify-between px-4 ">
                <h1>System Status: gabeOS</h1>
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
                    <h1 className="w-[7%]">PID</h1>
                    <h1 className="w-[25%]">TASK NAME</h1>
                    <h1 className="w-[15%]">STATUS</h1>
                    <h1 className="w-[10%]">CPU</h1>
                    <h1 className="w-[10%]">MEM</h1>
                    <h1 className="w-[33%]">INFO</h1>
                </div>
                <StatusItem pid="001" task="work" status="RUNNING" cpu={cpuValues[0]} mem={memoryValues[0]} info="Testing" />
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