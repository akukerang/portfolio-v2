"use client";
import React, { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 3000);

    return () => clearInterval(timerID);
  }, []);
  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = time.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  return (
    <div className="clock">
      {formattedDate}
      {" | "}
      {formattedTime}
    </div>
  );
};
export default Clock;
