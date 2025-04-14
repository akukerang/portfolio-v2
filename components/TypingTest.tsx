import { useState } from "react";


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
    return (
        <div className="mt-2 border-2 border-[var(--color_08)] rounded-sm w-full h-4/5 flex p-2 ">
            <h1 className="text-2xl color-4 mx-auto">Typing Test</h1>
            <div>
                {/* Timer Here hidden till game start*/}
            </div>
            <div>
                {/* Test and Text Here */}
                {/* 3 Lines of Text Maximum */}
            </div>
        </div>
    );
};
export default TypingTest;