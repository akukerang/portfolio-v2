"use client";
import { useState, useEffect, useRef } from "react";


const gridSize = 20;
const initSnake = [[10, 10]]; // spawn location
const initFood = [5, 5]; // spawn location of food


const TitleScreen = () => {
    const title = `
   ▄████████ ███▄▄▄▄      ▄████████    ▄█   ▄█▄    ▄████████ 
  ███    ███ ███▀▀▀██▄   ███    ███   ███ ▄███▀   ███    ███ 
  ███    █▀  ███   ███   ███    ███   ███▐██▀     ███    █▀  
  ███        ███   ███   ███    ███  ▄█████▀     ▄███▄▄▄     
▀███████████ ███   ███ ▀███████████ ▀▀█████▄    ▀▀███▀▀▀     
         ███ ███   ███   ███    ███   ███▐██▄     ███    █▄  
   ▄█    ███ ███   ███   ███    ███   ███ ▀███▄   ███    ███ 
 ▄████████▀   ▀█   █▀    ███    █▀    ███   ▀█▀   ██████████ 
                                      ▀                      
    `;

    return (
        <pre className="whitespace-pre">
            {title}
            {"Press Enter to start the game"}
        </pre>
    );
}




const GameOverScreen = () => {
    const gameOverTitle = `
  ▄████  ▄▄▄       ███▄ ▄███▓▓█████     ▒█████   ██▒   █▓▓█████  ██▀███  
 ██▒ ▀█▒▒████▄    ▓██▒▀█▀ ██▒▓█   ▀    ▒██▒  ██▒▓██░   █▒▓█   ▀ ▓██ ▒ ██▒
▒██░▄▄▄░▒██  ▀█▄  ▓██    ▓██░▒███      ▒██░  ██▒ ▓██  █▒░▒███   ▓██ ░▄█ ▒
░▓█  ██▓░██▄▄▄▄██ ▒██    ▒██ ▒▓█  ▄    ▒██   ██░  ▒██ █░░▒▓█  ▄ ▒██▀▀█▄  
░▒▓███▀▒ ▓█   ▓██▒▒██▒   ░██▒░▒████▒   ░ ████▓▒░   ▒▀█░  ░▒████▒░██▓ ▒██▒
 ░▒   ▒  ▒▒   ▓▒█░░ ▒░   ░  ░░░ ▒░ ░   ░ ▒░▒░▒░    ░ ▐░  ░░ ▒░ ░░ ▒▓ ░▒▓░
  ░   ░   ▒   ▒▒ ░░  ░      ░ ░ ░  ░     ░ ▒ ▒░    ░ ░░   ░ ░  ░  ░▒ ░ ▒░
░ ░   ░   ░   ▒   ░      ░      ░      ░ ░ ░ ▒       ░░     ░     ░░   ░ 
      ░       ░  ░       ░      ░  ░       ░ ░        ░     ░  ░   ░     
    `;
    return (
        <pre className="whitespace-pre">
            {gameOverTitle}
            {"Press Enter to restart the game"}
        </pre>
    );
}

const Snake = () => {
    const [gameStart, setGameStart] = useState(false);
    const [snake, setSnake] = useState(initSnake);
    const [food, setFood] = useState(initFood);
    const [direction, setDirection] = useState([0, 0]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const refInt = useRef<NodeJS.Timeout | null>(null);

    // * Controls
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!gameStart && event.key === "Enter") { // Start Game
                setGameStart(true);
                setDirection([1, 0]);
                return;
            }
            if (gameOver && event.key === "Enter") { // Restart Game
                setGameOver(false);
                setGameStart(true);
                setSnake(initSnake);
                setFood(initFood);
                setDirection([1, 0]);
                setScore(0);
                return;
            }
            if (gameStart) { // Game started check for movement controls
                switch (event.key) {
                    case "ArrowUp":
                        setDirection([0, -1]);
                        break;
                    case "ArrowDown":
                        setDirection([0, 1]);
                        break;
                    case "ArrowLeft":
                        setDirection([-1, 0]);
                        break;
                    case "ArrowRight":
                        setDirection([1, 0]);
                        break;
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [direction, gameStart, gameOver]);

    // * Game Loop
    useEffect(() => {
        if (gameStart && !gameOver) {
            refInt.current = setInterval(() => {
                setSnake((prevSnake) => {
                    const newHead = [
                        prevSnake[0][0] + direction[0],
                        prevSnake[0][1] + direction[1]
                    ];
                    // Check collision
                    if (
                        newHead[0] < 0 || newHead[0] >= gridSize || // Wall collision
                        newHead[1] < 0 || newHead[1] >= gridSize || // Wall collision
                        prevSnake.some((part) => part[0] === newHead[0] && part[1] === newHead[1]) // Self collision
                    ) {
                        setGameOver(true);
                        clearInterval(refInt.current!);
                        return prevSnake;
                    }
                    let newSnake = [newHead, ...prevSnake];
                    if (newHead[0] === food[0] && newHead[1] === food[1]) { // Check if food eaten
                        setScore((prevScore) => prevScore + 1);
                        setFood([Math.floor(Math.random() * gridSize), Math.floor(Math.random() * gridSize)]);
                    } else {
                        newSnake.pop();
                    }
                    return newSnake;
                });
            }, 200);
            return () => clearInterval(refInt.current!);
        }
    }, [direction, gameStart, food, gameOver]);

    return (
        <div className="mt-2 p-4 font-mono text-base border-2 border-[var(--color_08)] rounded-sm w-4/5 h-4/5">
            <div className="flex flex-col text-center justify-center h-full">
                {gameOver ? (
                    <GameOverScreen />
                ) : gameStart ? (
                    <>
                        <h1>Score {score}</h1>

                        <div className="grid grid-cols-20 grid-rows-20 w-full h-full">
                            {
                                [...Array(gridSize * gridSize).keys()].map((_, index) => {
                                    const x = index % gridSize;
                                    const y = Math.floor(index / gridSize);
                                    const isSnake = snake.some((part) => part[0] === x && part[1] === y);
                                    const isHead = snake[0][0] === x && snake[0][1] === y;
                                    const isFood = food[0] === x && food[1] === y;
                                    return (
                                        <div
                                            key={index}
                                            className={`aspect-square w-full h-full 
                                                ${isSnake
                                                    ? "bg-[var(--color_08)]"
                                                    : isFood
                                                        ? "bg-[var(--color_02)]" : null
                                                }`}
                                        />
                                    );
                                })
                            }
                        </div>
                    </>
                ) : (
                    <TitleScreen />
                )}
            </div>
        </div>
    );
};
export default Snake;