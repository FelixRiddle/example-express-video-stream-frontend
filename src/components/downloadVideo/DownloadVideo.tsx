'use client';

import { useState } from "react";

/**
 * Download video
 */
export default function DownloadVideo() {
    const [downloadProgress, setDownloadProgress] = useState(0);
    
    /**
     * Handle video download and its progress
     * 
     * @returns 
     */
    const handleDownload = async () => {
        try {
            const res = await fetch('http://localhost:38004/download');
            const reader = res.body?.getReader();
            
            if(!reader) {
                return;
            }
            
            const contentLength = +(res.headers?.get('Content-Length') || 0);
            let receivedLength = 0;
            let chunks = [];
            
            while(true) {
                const { done, value } = await reader.read();
                if(done) {
                    console.log(`Download complete`);
                    
                    // Create download url
                    const blob = new Blob(chunks, { type: 'video/mkv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    
                    a.style.display = 'none';
                    a.href = url;
                    a.download = 'gp-1.mkv';
                    
                    // Display download link
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    
                    setDownloadProgress(100);
                    break;
                }
                
                // Update current chunks and download progress
                chunks.push(value);
                receivedLength += value.byteLength;
                setDownloadProgress((receivedLength / contentLength) * 100);
            }
        } catch(err) {
            console.error(err);
        }
    };
    
    return (
        <div className="flex gap-3 items-center">
            <button
                onClick={handleDownload}
                className="py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
            >
                Download video
            </button>
            
            {downloadProgress > 0 && downloadProgress < 100 && (
                <p className="flex gap-3 items-center">
                    Download progress: <progress value={downloadProgress} max={100} />
                </p>
            )}
            {downloadProgress === 100 && <p>Download complete!</p>}
        </div>
    );
}

