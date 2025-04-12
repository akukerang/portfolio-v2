"use client";
import { useState, useEffect } from "react";
const Uptime = () => {
    const birthday = new Date("2003-02-24T00:00:00Z");
    const [uptime, setUptime] = useState("");
    useEffect(() => {
        const now = new Date();
        const diff = now.getTime() - birthday.getTime();
        const days = Math.floor(diff / (24 * 60 * 60 * 1000));
        const years = Math.floor(days / 365);
        setUptime(`${years} years, ${days % 365} days`);
    }, []);
    return (
        <div className="color-2">
            Uptime: <span className="text-sm color-8">{uptime}</span>
        </div>
    )
};
export default Uptime;