"use client";

/**
 * Video player
 * 
 * @returns 
 */
export default function DisplayVideo() {
    return (
        <div className="mb-3">
            <video controls={true} width="860">
                {/* Run repository: 'example-express-video-stream' */}
                <source src="http://localhost:38004/video" type="video/mkv" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
