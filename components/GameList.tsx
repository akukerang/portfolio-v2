import Link from "next/link";

interface GameItemProps {
    name: string;
    link: string;
}

const GameItem: React.FC<GameItemProps> = ({ name, link }) => {
    return (
        <div className="text-lg hover:cursor-pointer color-5 hover:underline ">
            <Link href={`/games/${link}`}>
                {name}
            </Link>
        </div>
    )
}


const GameList = () => {
    return (
        <div className="flex flex-col">
            <GameItem name="snake.py" link="snake" />

        </div>
    );
};
export default GameList;