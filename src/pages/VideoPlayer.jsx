import React, { useEffect, useRef, useState } from "react";
import video from "../assets/test video.mp4";
import PlayPauseButton from "./PlayPauseButton";
import SkipButton from "./SkipButton";
import VolumeButton from "./VolumeButton";
import FullscreenButton from "./FullscreenButton";
import PiPButton from "./PiPButton";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTimeInRemaining, setShowTimeInRemaining] = useState(false);
  const [timelineWidth, setTimelineWidth] = useState(0);

  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = useRef(null);
  const timelineRef = useRef(null);
  const skipTime = 10; // Skip forward/backward in seconds

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleFastForward = () => {
    if (!videoRef.current) return;

    const newTime = Math.min(
      videoRef.current.currentTime + skipTime,
      videoRef.current.duration // Ensure we don't exceed duration
    );
    videoRef.current.currentTime = newTime;
  };

  const handleRewind = () => {
    if (!videoRef.current) return;

    const newTime = Math.max(
      videoRef.current.currentTime - skipTime,
      0 // Ensure we don't go below 0
    );
    videoRef.current.currentTime = newTime;
  };

  const handleMute = () => {
    if (!videoRef.current) return;

    if (videoRef?.current?.muted) {
      videoRef.current.muted = false;
    } else {
      videoRef.current.muted = true;
    }
    setIsMuted(!isMuted);
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

  const handleSeek = (e) => {
    if (!timelineRef?.current || !videoRef?.current || timelineWidth === 0)
      return;

    const { left } = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - left;

    // Ensure clickX is within bounds
    const safeClickX = Math.max(0, Math.min(clickX, timelineWidth));

    const percentageClicked = (safeClickX / timelineWidth) * 100;
    const newTime = (percentageClicked / 100) * videoDuration;

    videoRef.current.currentTime = newTime;
  };

  const formatTime = (time) => {
    if (isNaN(time) || time < 0) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const updateTimelineWidth = () => {
      if (timelineRef.current) {
        setTimelineWidth(timelineRef.current.offsetWidth);
      }
    };

    // Set initial width
    updateTimelineWidth();

    // Listen for window resize
    window.addEventListener("resize", updateTimelineWidth);

    return () => {
      window.removeEventListener("resize", updateTimelineWidth);
    };
  }, []);

  const title = `JavaScript Basics (Variables, functions, events, DOM manipulation).
`;
  return (
    <div className="relative overflow-hidden text-white rounded-lg group ">
      <div
        className={`w-full absolute top-0 left-0  px-4 pt-2 pb-16 bg-gradient-to-b from-black/80 via-black/60 to-transparent
 transition duration-500  z-50 ${
   isPlaying ? "opacity-0 group-hover:opacity-100 " : ""
 } `}
      >
        <p className="text-lg font-bold">{title}</p>
      </div>
      <div
        className={`absolute w-full flex items-center gap-2  px-2 pt-16 pb-2 bottom-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent
 transition duration-500  z-40 ${
   isPlaying ? "opacity-0 group-hover:opacity-100 " : ""
 } `}
      >
        {/* Timeline Bar */}
        <div
          ref={timelineRef}
          className="absolute left-0 z-50 h-[0.35rem]  ml-2 transition-[height] bg-gray-200 rounded cursor-pointer top-11 "
          style={{ width: "calc(100% - 1rem)" }}
          onClick={handleSeek} // 🔥 Allow seeking
        >
          {/* Progress Indicator */}
          <div
            className="relative w-full h-full rounded bg-sky-500 group"
            style={{ width: `${(currentTime / videoDuration) * 100}%` }}
          >
            <div className="absolute w-3 h-3 transition-all -translate-x-1/2 -translate-y-1/2 bg-sky-500 border-[4px]  shadow  rounded-full left-full top-1/2 scale-0 group-hover:scale-100 duration-500" />
          </div>
        </div>
        <button
          onClick={togglePlay}
          className="p-1 transition rounded-lg hover:bg-sky-500"
        >
          <PlayPauseButton isPlaying={isPlaying} />
        </button>

        {/* Skip Backward Button */}
        <button
          onClick={handleRewind}
          className="p-1 transition rounded-lg hover:bg-sky-500"
        >
          <SkipButton direction="backward" />
        </button>
        {/* Skip Forward Button */}

        <button
          onClick={handleFastForward}
          className="p-1 transition rounded-lg hover:bg-sky-500"
        >
          <SkipButton direction="forward" />
        </button>
        <p
          onClick={() => setShowTimeInRemaining(!showTimeInRemaining)}
          className="p-1 px-2 transition rounded-lg cursor-pointer hover:bg-sky-500"
        >
          {showTimeInRemaining ? (
            <span>-{formatTime(videoDuration - currentTime || 0)}</span>
          ) : (
            <span>{formatTime(currentTime || 0)}</span>
          )}{" "}
          / <span>{formatTime(videoDuration || 0)}</span>
        </p>
        <div className="flex items-center gap-2 ml-6">
          <button
            onClick={handleMute}
            className="p-1 transition rounded-lg hover:bg-sky-500"
          >
            <VolumeButton isMuted={isMuted} />
          </button>
          <input type="range" name="" id="" />
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <p className="p-1 px-2 font-bold transition rounded-lg cursor-pointer hover:bg-sky-500">
            1x
          </p>
          <PiPButton videoRef={videoRef} />
          <button
            onClick={toggleFullScreen}
            className="p-1 transition rounded-lg cursor-pointer hover:bg-sky-500"
          >
            <FullscreenButton isFullscreen={isFullscreen} />
          </button>
        </div>
      </div>
      <video
        ref={videoRef}
        onClick={togglePlay}
        src={video}
        className="w-full"
        download="false"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      ></video>
    </div>
  );
};

export default VideoPlayer;
