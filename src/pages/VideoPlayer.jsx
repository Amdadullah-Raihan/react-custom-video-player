import React, { useEffect, useRef, useState } from "react";
import video from "../assets/test video.mp4";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  console.log("is muted?", videoRef?.current?.muted);

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

  const handleMute = () => {
    if (!videoRef.current) return;

    if (videoRef?.current?.muted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const toggleFullScreen = () => {
    if (!videoRef.current) return;

    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
    setIsFullscreen(!isFullscreen);
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
        className={`w-full absolute top-0 left-0  px-4 pt-2 pb-16 bg-gradient-to-b from-black/80 via-black/60 to-transparent
 transition  z-50 ${isPlaying ? "opacity-0 group-hover:opacity-100 " : ""} `}
      >
        <p className="text-lg font-bold">{title}</p>
      </div>
      <div
        className={`absolute w-full flex items-center gap-2  px-2 pt-16 pb-2 bottom-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent
 transition  z-40 ${isPlaying ? "opacity-0 group-hover:opacity-100 " : ""} `}
      >
        <div
          className="absolute left-0 z-50 h-1 mx-auto ml-2 bg-gray-200 rounded top-11"
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
              fill="white"
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
              fill="white"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-pause-icon lucide-pause"
            >
              <rect x="5" y="4" width="4" height="16" rx="1" />
              <rect x="15" y="4" width="4" height="16" rx="1" />
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
            fill="white"
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
            fill="white"
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
        <p className="p-1 px-2 transition rounded-lg cursor-pointer hover:bg-sky-500">
          <span>{formatTime(videoRef?.current?.currentTime)}</span> /{" "}
          <span>{formatTime(videoRef?.current?.duration)}</span>
        </p>
        <div className="flex items-center gap-2 ml-6">
          <button
            onClick={handleMute}
            className="p-1 transition rounded-lg hover:bg-sky-500"
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-volume-off-icon lucide-volume-off"
              >
                <path d="M16 9a5 5 0 0 1 .95 2.293" />
                <path d="M19.364 5.636a9 9 0 0 1 1.889 9.96" />
                <path d="m2 2 20 20" />
                <path d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11" />
                <path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-volume2-icon lucide-volume-2"
              >
                <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                <path d="M16 9a5 5 0 0 1 0 6" />
                <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
              </svg>
            )}
          </button>
          <input type="range" name="" id="" />
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <p className="p-1 px-2 font-bold transition rounded-lg cursor-pointer hover:bg-sky-500">
            1x
          </p>
          <button className="p-1 transition rounded-lg cursor-pointer hover:bg-sky-500">
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
              class="lucide lucide-picture-in-picture2-icon lucide-picture-in-picture-2"
            >
              <path d="M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" />
              <rect width="10" height="7" x="12" y="13" rx="2" />
            </svg>
          </button>
          <button
            onClick={toggleFullScreen}
            className="p-1 transition rounded-lg cursor-pointer hover:bg-sky-500"
          >
            {isFullscreen ? (
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
                class="lucide lucide-minimize-icon lucide-minimize"
              >
                <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
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
                class="lucide lucide-maximize-icon lucide-maximize"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <video
        ref={videoRef}
        onClick={togglePlay}
        src={video}
        className="w-full"
        download="false"
      ></video>
    </div>
  );
};

export default VideoPlayer;
