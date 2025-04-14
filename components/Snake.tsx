"use client";
import { useState } from "react";


const gridSize = 20;
const initSnake = [[10, 10]]; // spawn location
const initFood = [5, 5]; // spawn location of food

const Snake = () => {
    const [gameStart, setGameStart] = useState(false);
    const [snake, setSnake] = useState(initSnake);
    const [food, setFood] = useState(initFood);
    const [direction, setDirection] = useState([0, 0]); // x, y
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const title = `
    ███████ ███    ██  █████  ██   ██ ███████
    ██      ████   ██ ██   ██ ██  ██  ██     
    ███████ ██ ██  ██ ███████ █████   █████  
         ██ ██  ██ ██ ██   ██ ██  ██  ██     
    ███████ ██   ████ ██   ██ ██   ██ ███████
    `;



    return (
        <div className="mt-2 p-4 font-mono text-base border-2 border-[var(--color_08)] rounded-sm w-4/5 h-4/5">
            <div className="flex flex-col text-center justify-center h-full">
                {gameStart ? null :
                    (<pre className="whitespace-pre">
                        {title}
                        {"Press Enter to start the game"}
                    </pre>)
                }

            </div>

        </div>
    );
};
export default Snake;