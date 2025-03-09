"use client";
import './globals.css';
import Command from '@/components/command';
import { usePathname } from 'next/navigation';

export default function NotFound() {
    const pathname = usePathname();
    return (
        <div className="not-found">
            <Command command={`cd ${pathname}`} />
            <p>-bash: cd: ${pathname}: No such file or directory</p>
        </div>
    );
}
