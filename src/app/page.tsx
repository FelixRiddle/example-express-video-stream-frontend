"use client";

import DisplayVideo from "@/components/displayVideo/DisplayVideo";
import DownloadVideo from "@/components/downloadVideo/DownloadVideo";

/**
 * Home component
 * 
 * @returns 
 */
export default function Home() {
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
            <h1 className="text-3xl font-bold mb-5">My Video Player</h1>
            <DisplayVideo />
            <DownloadVideo />
        </div>
    );
}
