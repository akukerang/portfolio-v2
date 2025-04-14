import React from "react";
import Command from "@/components/command";
import Link from "next/link";
import TypingTest from "@/components/TypingTest";
const TypingTestPage = () => {
    return (
        <div className="w-full h-full overflow-hidden">
            <Command filePath="Games" command="python typing-test.py" />
            <Link href="/games" className="color-6 underline text-xl">
                Back
            </Link>
            <TypingTest />
        </div>
    );
};
export default TypingTestPage;
