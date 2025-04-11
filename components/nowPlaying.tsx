import { useEffect, useState } from "react";


interface nowPlayingData {
    error: string;
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
        }
        fetchData()

    }, [])

    return (
        <div>
            {data && data.error == null ? `${data.artist} - ${data.song}` : "Nothing is playing"}
        </div>
    );
};
export default nowPlaying;