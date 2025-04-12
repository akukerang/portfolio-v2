export async function getNowPlaying(): Promise<string> {
    try {
        const res = await fetch('/api/nowPlaying');
        const data = await res.json();
        if (data.error || !data.isPlaying) {
            return "";
        }
        return `${data.artist} - ${data.song}`;
    } catch (error) {
        console.error("Error fetching now playing data:", error);
        return "";
    }
}