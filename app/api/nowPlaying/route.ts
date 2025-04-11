import { NextResponse } from "next/server";
import axios from "axios";

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

// Gets Access Token from Refresh Token
async function getAccessToken() {
    const basicAuth = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')
    const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: SPOTIFY_REFRESH_TOKEN || "",
        }),
        {
            headers: {
                Authorization: `Basic ${basicAuth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    )
    return response.data.access_token
}

export async function GET() {
    try {
        const accessToken = await getAccessToken();
        const url = "https://api.spotify.com/v1/me/player/currently-playing";
        const header = {
            Authorization: `Bearer ${accessToken}`,
        }
        const response = await axios.get(url, { headers: header });
        const data = response.data;
        if (!data.is_playing || !data) {
            return NextResponse.json({
                song: "",
                artist: "",
                isPlaying: false,
            });
        }
        return NextResponse.json({
            song: data.item.name,
            artist: data.item.artists[0].name,
            isPlaying: true,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch now playing" }, { status: 500 });
    }
}

