import React, { useRef, useState } from "react";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef?.current?.paused) {
      videoRef?.current?.play();
      setIsPlaying(true);
    } else {
      videoRef?.current?.pause();
      setIsPlaying(false);
    }
  };
  return (
    <div className="rounded-lg overflow-hidden ">
      <div>
        <button onClick={togglePlay}>
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-play-icon lucide-play"
            >
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-pause-icon lucide-pause"
            >
              <rect x="14" y="4" width="4" height="16" rx="1" />
              <rect x="6" y="4" width="4" height="16" rx="1" />
            </svg>
          )}
        </button>
      </div>
      <video
        ref={videoRef}
        onClick={togglePlay}
        src="https://videos.pexels.com/video-files/15832152/15832152-hd_1920_1080_30fps.mp4"
      ></video>
    </div>
  );
};

export default VideoPlayer;
