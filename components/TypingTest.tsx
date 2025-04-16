"use client";
import { useState, useEffect, useRef } from "react";
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
    const [userInput, setUserInput] = useState("");
    const [wpm, setWPM] = useState(0);
    const [acc, setAcc] = useState(0);
    const [timer, setTimer] = useState(30);
    const [paragraph, setParagraph] = useState<string>(paragraphs.paragraphs[Math.floor(Math.random() * paragraphs.paragraphs.length)]);

    const inputRef = useRef<HTMLInputElement>(null);
    // * Notes
    // If character is correct, display character
    // If incorrect and on a character, display red correct character
    // If incorrect and on a space, display wrong character
    // When completed a word correctly, don't allow to go back to the space after that word or word
    // Handle test word by word, rather than by character by character
    // Only display 3 lines of paragraph at a time, display next line when reached.
    // If the user presses backspace, remove the last character from the input
    // Only allow 8 maximum wrong characters per word (aka w/o space)
    // When time runs out display result screen.
    // WPM = 
    // ACC = (correct characters / total characters) * 100
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!gameStart) {
            setGameStart(true);
            inputRef.current?.focus();
        }
        if (gameStart) {
            if (e.key === "Backspace") {
                setUserInput(userInput.slice(0, -1));
            } else if (e.key.length === 1) {
                setUserInput(userInput + e.key);
            }
            console.log(userInput);

        }
    }



    return (
        <div className="mt-2 border-2 border-[var(--color_08)] rounded-sm w-full h-4/5 flex p-8 flex-col">
            <h1 className="text-2xl color-4 mx-auto">Typing Test</h1>
            <h1 className="text-2xl color-7 mx-auto">{timer}</h1>

            <div className="overflow-hidden text-xl mx-16 mb-8 relative">
                <input ref={inputRef} onKeyDown={handleKeyDown} className="opacity-0 absolute top-0 left-0 h-full w-full" />
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