"use client";
import { useState } from "react";
import paragraphs from "@/data/paragraph.json";

interface ResultProps {
    wpm: number;
    acc: number;
}

const ResultScreen: React.FC<ResultProps> = ({ wpm, acc }) => {
    return <></>
}


const TypingTest = () => {
    const [gameStart, setGameStart] = useState(false);
    const [wpm, setWPM] = useState(0);
    const [acc, setAcc] = useState(0);
    const [timer, setTimer] = useState(30);
    const [paragraph, setParagraph] = useState<string>(paragraphs.paragraphs[Math.floor(Math.random() * paragraphs.paragraphs.length)]);



    return (
        <div className="mt-2 border-2 border-[var(--color_08)] rounded-sm w-full h-4/5 flex p-8 flex-col">
            <h1 className="text-2xl color-4 mx-auto">Typing Test</h1>
            <div className="overflow-hidden text-xl mx-16 mb-8">
                <h1 className="text-2xl color-7 mx-auto">{timer}</h1>
                <div
                    className="overflow-hidden whitespace-pre-wrap"
                    style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                    }}
                >
                    {paragraph}
                </div>
            </div>
        </div>
    );
}
export default TypingTest;