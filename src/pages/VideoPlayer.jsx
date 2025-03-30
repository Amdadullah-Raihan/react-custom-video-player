import React, { useEffect, useRef, useState } from "react";
import video from "../assets/test video.mp4";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const videoRef = useRef(null);
  const skipTime = 5; // Skip forward/backward in seconds

  // Effect to update video duration when metadata is loaded
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateDuration = () => setVideoDuration(video.duration || 0);

    video.addEventListener("loadedmetadata", updateDuration);

    return () => video.removeEventListener("loadedmetadata", updateDuration);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleFastForward = () => {
    if (!videoRef.current) return;

    const newTime = Math.min(
      videoRef.current.currentTime + skipTime,
      videoDuration
    );
    videoRef.current.currentTime = newTime;
  };

  const formatTime = (time) => {
    if (isNaN(time) || time < 0) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const title = `JavaScript Basics (Variables, functions, events, DOM manipulation).
`;
  return (
    <div className="relative overflow-hidden text-white rounded-lg group ">
      <div
        className={`w-full absolute top-0 left-0  px-4 pt-2 pb-6 bg-gradient-to-b from-black transition  z-50 ${
          isPlaying ? "opacity-0 group-hover:opacity-100 " : ""
        } `}
      >
        <p className="text-lg font-bold">{title}</p>
      </div>
      <div
        className={`absolute w-full flex items-center gap-2  px-2 pt-5 pb-2 bottom-0 bg-gradient-to-t from-black  transition  z-50 ${
          isPlaying ? "opacity-0 group-hover:opacity-100 " : ""
        } `}
      >
        <div
          className="absolute left-0 h-1 mx-auto ml-2 bg-white rounded bg-opacity-70 top-1"
          style={{ width: "calc(100% - 1rem)" }}
        >
          {" "}
        </div>
        <button
          onClick={togglePlay}
          className="p-1 transition rounded-lg hover:bg-sky-500"
        >
          {!isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-play-icon lucide-play"
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-pause-icon lucide-pause"
            >
              <rect x="14" y="4" width="4" height="16" rx="1" />
              <rect x="6" y="4" width="4" height="16" rx="1" />
            </svg>
          )}
        </button>

        {/* Fast Backward */}
        <button className="p-1 transition rounded-lg hover:bg-sky-500">
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
            class="lucide lucide-skip-back-icon lucide-skip-back"
          >
            <polygon points="19 20 9 12 19 4 19 20" />
            <line x1="5" x2="5" y1="19" y2="5" />
          </svg>
        </button>

        {/* Fast Forward */}
        <button
          className="p-1 transition rounded-lg hover:bg-sky-500"
          onClick={handleFastForward}
        >
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
            class="lucide lucide-skip-forward-icon lucide-skip-forward"
          >
            <polygon points="5 4 15 12 5 20 5 4" />
            <line x1="19" x2="19" y1="5" y2="19" />
          </svg>
        </button>
        <div>
          <p className="">
            <span>{formatTime(videoRef?.current?.currentTime)}</span> /{" "}
            <span>{formatTime(videoRef?.current?.duration)}</span>
          </p>
        </div>
      </div>
      <video
        ref={videoRef}
        onClick={togglePlay}
        src={video}
        className="w-full"
      ></video>
    </div>
  );
};

export default VideoPlayer;
