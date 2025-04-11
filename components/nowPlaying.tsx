import { useEffect, useState } from "react";


interface nowPlayingData {
    song: string;
    artist: string;
    isPlaying: boolean;
}

const nowPlaying = () => {
    const [data, setData] = useState<nowPlayingData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/nowPlaying')
            const json = await res.json()
            setData(json)
            // console.log(json.song)
        }
        fetchData()

    }, [])

    return (
        <div>
            {data ? `${data.artist} - ${data.song}` : "Loading..."}
        </div>
    );
};
export default nowPlaying;