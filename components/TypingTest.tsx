"use client";
import { useState, useEffect, useRef } from "react";
import WordSet from "../data/english_5k.json";

interface ResultProps {
    wpm: number;
    acc: number;
}

const ResultScreen: React.FC<ResultProps> = ({ wpm, acc }) => {
    return <div>
        <h1>Results</h1>
        {wpm}
        {acc}
    </div>
}


const TypingTest = () => {
    const [gameStart, setGameStart] = useState(false);
    const [timer, setTimer] = useState(30);

    const [wpm, setWPM] = useState(0);
    const [acc, setAcc] = useState(0);


    const words = [...WordSet.words]
        .sort(() => Math.random() - 0.5)
        .slice(0, 400);


    const [currWordIndex, setCurrWordIndex] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null);
    const [userInput, setUserInput] = useState<string[]>([]);
    const [currInput, setCurrInput] = useState("");

    const [lines, setLines] = useState<string[]>([]);
    const wordsPerLine = 10
    const [visibleLine, setVisibleLines] = useState([0, 3]);

    // Converts Word Array to Lines per 10 words
    useEffect(() => {
        let newLines = [];
        for (let i = 0; i < words.length; i += wordsPerLine) {
            newLines.push(words.slice(i, i + wordsPerLine).join(" "));
        }
        setLines(newLines);
    }, []);

    // Visible line handler
    useEffect(() => {
        const currentLine = Math.floor(currWordIndex / wordsPerLine);
        // When ending second last line, show the next line
        if (currentLine >= visibleLine[1] - 1) {
            const newStartLine = Math.max(0, currentLine - 1); // Show previous
            const newEndLine = Math.min(lines.length, currentLine + 2); // Show the current and next line
            setVisibleLines([newStartLine, newEndLine]);
        }
    }, [currWordIndex, lines.length]);

    // * Timer Loop
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameStart && timer > 0) {
            interval = setInterval(() => {
                setTimer(timer => timer - 1);
            }, 1000);
        } else if (timer == 0) {
            setGameStart(false);
            // Calculate WPM and ACC

        }
        return () => clearInterval(interval);
    }, [gameStart, timer])

    // * Key Handler
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!gameStart) {
            setGameStart(true);
            inputRef.current?.focus();
        }
        const currentWord = words[currWordIndex];
        if (e.key === " ") { // Space, go to next word
            if (currInput.length > 0) { // Only allow if input not empty
                setUserInput(prev => [...prev, currInput])
                setCurrWordIndex(prev => prev + 1);
                setCurrInput("");
            }
            e.preventDefault(); // Don't add space
        } else if (e.key == "Backspace") {
            if (currInput.length > 0) { // Backspace to remove character
                setCurrInput(currInput.slice(0, -1));
            } else if (currWordIndex > 0) { // Backspace to previous word
                const previousWord = userInput[currWordIndex - 1];
                const actualWord = words[currWordIndex - 1];
                if (previousWord !== actualWord) { // Don't allow to backspace if correct
                    setCurrWordIndex(currWordIndex - 1);
                    setCurrInput(previousWord);
                    setUserInput(userInput.slice(0, -1));
                }
            }
        } else if (e.key.length >= 1) {
            const wrongCount = [...currInput].filter((char, i) => char !== currentWord[i]).length;
            if (wrongCount <= 10) {
                setCurrInput(currInput + e.key);
            }
        }
    }

    // if (timer === 0) {
    //     return (
    //         <ResultScreen wpm={wpm} acc={acc} />
    //     )
    // }


    return (
        <div className="mt-2 border-2 border-[var(--color_08)] rounded-sm w-full h-4/5 flex p-8 flex-col">
            <h1 className="text-2xl color-4 mx-auto">Typing Test</h1>
            <h1 className="text-2xl color-7 mx-auto">{timer}</h1>

            <div className="text-xl mx-16 mb-8 relative overflow-hidden">
                <input
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                    className="opacity-0 absolute top-0 left-0 h-full w-full"
                />

                <div className="flex flex-col mx-auto items-center text-center text-xl">
                    {lines.length > 0 && lines.slice(visibleLine[0], visibleLine[1]).map((line, lineIndex) => (
                        <div key={lineIndex + visibleLine[0]} className="flex flex-wrap justify-center mb-2">
                            {line.split(" ").map((word, wordIndex) => {
                                const globalWordIndex = (lineIndex + visibleLine[0]) * wordsPerLine + wordIndex;
                                let className = "mr-2";

                                // Completed Words
                                if (globalWordIndex < currWordIndex) {
                                    const typed = userInput[globalWordIndex] || "";
                                    return (
                                        <span key={globalWordIndex} className={className}>
                                            {word.split("").map((char, i) => {
                                                const color =
                                                    typed[i] === char ? "color-3" : "color-2";
                                                return (
                                                    <span key={i} className={color}>
                                                        {char}
                                                    </span>
                                                );
                                            })}
                                        </span>
                                    );
                                }

                                // Current Word
                                if (globalWordIndex === currWordIndex) {
                                    return (
                                        <span key={globalWordIndex} className={className}>
                                            {word.split("").map((char, i) => {
                                                let color = "";
                                                if (i < currInput.length) {
                                                    color = currInput[i] === char ? "color-3" : "color-2";
                                                }
                                                if (i === currInput.length) {
                                                    color = "color-1 cursor animate-blink-text";
                                                }
                                                return (
                                                    <span key={i} className={color}>
                                                        {char}
                                                    </span>
                                                );
                                            })}

                                            {/* Extra Characters after Word */}
                                            {currInput.length > word.length &&
                                                currInput
                                                    .slice(word.length)
                                                    .split("")
                                                    .map((char, j) => (
                                                        <span
                                                            key={`extra-${j}`}
                                                            className="color-2 underline"
                                                        >
                                                            {char}
                                                        </span>
                                                    ))}
                                        </span>
                                    );
                                }

                                // Other Words
                                return (
                                    <span key={globalWordIndex} className={className}>
                                        {word}
                                    </span>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default TypingTest;