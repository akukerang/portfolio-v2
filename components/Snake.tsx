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
        <>
            <pre className="whitespace-pre overflow-clip text-xs">
                {title}
            </pre>
            <p className="text-lg">
                Press Enter to start the game
            </p>
            <p className="text-lg">
                Control with arrow keys
            </p>
        </>

    );
}


interface GameOverScreenProps {
    score: number;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score }) => {
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
        <>
            <pre className="whitespace-pre overflow-clip text-xs">
                {gameOverTitle}
            </pre>
            <p className="text-lg">
                Score: {score}
            </p>
            <p className="text-lg">
                Press Enter to play again
            </p>
        </>
    );
}

const Snake = () => {
    const [gameStart, setGameStart] = useState(false);
    const [snake, setSnake] = useState(initSnake);
    const [food, setFood] = useState(initFood);
    const [direction, setDirection] = useState([0, 0]);
    const score = snake.length - 1;
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
                        let newX = Math.floor(Math.random() * gridSize);
                        let newY = Math.floor(Math.random() * gridSize);
                        while (newSnake.some((part) => part[0] === newX && part[1] === newY)) { // Check if food spawns on snake
                            newX = Math.floor(Math.random() * gridSize);
                            newY = Math.floor(Math.random() * gridSize);
                        }
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
        <div className="mt-2 p-4 font-[Gohu] text-lg border-2 border-[var(--color_08)] rounded-sm w-full h-4/5">
            <div className="flex flex-col text-center justify-center h-full">
                {gameOver ? (
                    <GameOverScreen score={score} />
                ) : gameStart ? (
                    <>
                        <h1>Score: {score}</h1>

                        <div className="grid grid-cols-20 grid-rows-20 w-full h-full">
                            {
                                [...Array(gridSize * gridSize).keys()].map((_, index) => {
                                    const x = index % gridSize;
                                    const y = Math.floor(index / gridSize);
                                    const isSnake = snake.some((part) => part[0] === x && part[1] === y);
                                    const isFood = food[0] === x && food[1] === y;
                                    return (
                                        <div
                                            key={index}
                                            className={`aspect-square w-full h-full 
                                                ${isFood
                                                    ? "bg-[var(--color_02)]"
                                                    : isSnake
                                                        ? "bg-[var(--color_08)]" : null
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