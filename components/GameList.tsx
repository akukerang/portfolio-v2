import Link from "next/link";
import CodeIcon from '@mui/icons-material/Code';
interface GameItemProps {
    name: string;
}

const GameItem: React.FC<GameItemProps> = ({ name }) => {
    return (
        <Link href={`/games/${name}`}>
            <span className="color-5 text-lg hover:underline"><CodeIcon fontSize='inherit' className='mr-1' />{`${name}.py`}</span>
        </Link>
    )
}


const GameList = () => {
    return (
        <div className="flex flex-col">
            <GameItem name="snake" />
            <GameItem name="typing-test" />
        </div>
    );
};
export default GameList;