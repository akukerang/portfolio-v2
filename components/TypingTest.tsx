"use client";
import { useState, useEffect, useRef } from "react";
import paragraphs from "@/data/paragraph.json";

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

    const paragraph = paragraphs.paragraphs[Math.floor(Math.random() * paragraphs.paragraphs.length)];
    const words = paragraph.split(" ");
    const [currWordIndex, setCurrWordIndex] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null);
    const [userInput, setUserInput] = useState<string[]>([]);
    const [currInput, setCurrInput] = useState("");

    const [visibleWord, setVisibleWord] = useState(0);

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
        } else if (e.key.length === 1) {
            const wrongCount = [...currInput].filter((char, i) => char !== currentWord[i]).length;
            if (wrongCount <= 8) {
                setCurrInput(currInput + e.key);
            }
        }
    }

    if (timer === 0) {
        return (
            <ResultScreen wpm={wpm} acc={acc} />
        )
    }


    return (
        <div className="mt-2 border-2 border-[var(--color_08)] rounded-sm w-full h-4/5 flex p-8 flex-col">
            <h1 className="text-2xl color-4 mx-auto">Typing Test</h1>
            <h1 className="text-2xl color-7 mx-auto">{timer}</h1>

            <div className="text-xl mx-16 mb-8 relative">
                <input
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                    className="opacity-0 absolute top-0 left-0 h-full w-full"
                />
                <div>

                </div>
            </div>
        </div>
    );
}
export default TypingTest;