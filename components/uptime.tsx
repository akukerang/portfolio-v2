"use client";
import { useState, useEffect } from "react";
const Uptime = () => {
    const birthday = new Date("2003-02-24T00:00:00Z");
    const [years, setYears] = useState("");
    const [days, setDays] = useState("");
    useEffect(() => {
        const now = new Date();
        const diff = now.getTime() - birthday.getTime();
        const days = Math.floor(diff / (24 * 60 * 60 * 1000));
        const years = Math.floor(days / 365);
        setYears(`${years} years`);
        setDays(`${days % 365} days`);
    }, []);
    return (
        <div className="color-2">
            Uptime:{" "}
            <span className="text-sm color-8">{years}</span>&nbsp;
            <span className="hidden md:inline-block text-sm color-8">{days}</span>
        </div>
    )
};
export default Uptime;