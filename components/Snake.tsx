"use client";
import { useState, useEffect } from "react";


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


    // * Controls
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!gameStart && event.key === "Enter") { // Start Game
                setGameStart(true);
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
    }, [direction, gameStart]);

    // * Game Loop
    useEffect(() => {
        if (gameStart && !gameOver) {


        }




    }, [direction, gameStart, food, gameOver]);




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