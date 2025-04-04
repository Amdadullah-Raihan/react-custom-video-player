import React, { useEffect, useRef, useState } from "react";
import video from "../assets/test video.mp4";
import PlayPauseButton from "../components/PlayPauseButton";
import SkipButton from "../components/SkipButton";
import VolumeButton from "../components/VolumeButton";
import FullscreenButton from "../components/FullscreenButton";
import PiPButton from "../components/PiPButton";
import RangeSlider from "../components/RangeSlider";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTimeInRemaining, setShowTimeInRemaining] = useState(false);

  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  const videoRef = useRef(null);

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

  const formatTime = (time) => {
    if (isNaN(time) || time < 0) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume; // Update the actual video element volume
    }
  }, [volume]); // Update whenever volume changes

  const title = `JavaScript Basics (Variables, functions, events, DOM manipulation).
`;
  return (
    <div className="relative overflow-hidden text-white rounded-lg group ">
      {/* Upper Title Part */}
      <div
        className={`w-full absolute top-0 left-0  px-4 pt-2 pb-16 bg-gradient-to-b from-black/80 via-black/60 to-transparent
 transition duration-500  z-50 ${
   isPlaying ? "opacity-0 group-hover:opacity-100 " : ""
 } `}
      >
        <p className="text-lg font-bold">{title}</p>
      </div>

      {/* Bottom Controls Part */}
      <div
        className={`absolute w-full flex items-center gap-2  px-2 pt-16 pb-2 bottom-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent
 transition duration-500  z-40 ${
   isPlaying ? "opacity-0 group-hover:opacity-100 " : ""
 } `}
      >
        {/* Timeline Bar */}
        <div className="absolute w-full top-12">
          <RangeSlider
            min={0}
            max={videoDuration}
            value={currentTime}
            onChange={(newTime) => (videoRef.current.currentTime = newTime)}
          />
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="p-1 transition rounded-lg hover:bg-sky-500"
        >
          <PlayPauseButton isPlaying={isPlaying} size={18} />
        </button>

        {/* Skip Backward Button */}
        <button
          onClick={handleRewind}
          className="p-1 transition rounded-lg hover:bg-sky-500"
        >
          <SkipButton direction="backward" size={18} />
        </button>

        {/* Skip Forward Button */}
        <button
          onClick={handleFastForward}
          className="p-1 transition rounded-lg hover:bg-sky-500"
        >
          <SkipButton direction="forward" size={18} />
        </button>

        {/* Current Time/Toltal Time || Remaining Time/Total Time */}
        <p
          onClick={() => setShowTimeInRemaining(!showTimeInRemaining)}
          className="p-1 px-2 transition rounded-lg cursor-pointer select-none hover:bg-sky-500"
        >
          {showTimeInRemaining ? (
            <span>-{formatTime(videoDuration - currentTime || 0)}</span>
          ) : (
            <span>{formatTime(currentTime || 0)}</span>
          )}{" "}
          / <span>{formatTime(videoDuration || 0)}</span>
        </p>

        {/* Volume Control */}
        <div className="flex items-center gap-2 ml-6">
          <button
            onClick={handleMute}
            className="p-1 transition rounded-lg hover:bg-sky-500"
          >
            <VolumeButton isMuted={isMuted} size={18} />
          </button>

          {/* Volume Slider */}
          <div className="w-20">
            <RangeSlider
              min={0}
              max={1}
              value={volume}
              onChange={(newVolume) => setVolume(newVolume)}
            />
          </div>
        </div>

        {/* PiP & Full Screen Controll */}
        <div className="flex items-center gap-3 ml-auto">
          <p className="p-1 px-2 font-bold transition rounded-lg cursor-pointer hover:bg-sky-500">
            1x
          </p>
          <PiPButton
            videoRef={videoRef}
            size={18}
            setIsPlaying={setIsPlaying}
          />
          <button
            onClick={toggleFullScreen}
            className="p-1 transition rounded-lg cursor-pointer hover:bg-sky-500"
          >
            <FullscreenButton isFullscreen={isFullscreen} size={18} />
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
