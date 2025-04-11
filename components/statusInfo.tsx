"use client";
import Uptime from "./uptime";

const StatusInfo = () => {
    return (
        <div className="border-2 border-gray-300 rounded-sm p-4 w-200">
            <div className="flex flex-row justify-between">
                <h1>System Status: gabeOS</h1>
                <Uptime />
            </div>
            <div>


            </div>

        </div>
    );
};
export default StatusInfo;