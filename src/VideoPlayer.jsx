import React, { Fragment, useEffect, useRef, useState } from "react";
import PlayPauseButton from "./components/PlayPauseButton.jsx";
import SkipButton from "./components/SkipButton.jsx";
import VolumeButton from "./components/VolumeButton.jsx";
import FullscreenButton from "./components/FullscreenButton.jsx";
import PiPButton from "./components/PiPButton.jsx";
import RangeSlider from "./components/RangeSlider.jsx";
import PlaybackRateControl from "./components/PlaybackRateControl.jsx";

const VideoPlayer = ({ title = "", skipTime = 10, src, ref: videoRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTimeInRemaining, setShowTimeInRemaining] = useState(false);

  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);

  const containerRef = useRef(null);
  const inactivityTimer = useRef(null);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current || !showControls) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      ``;
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
    if (!containerRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
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

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);

      clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => {
        setShowControls(false);
      }, 2000); // Hide after 3s of inactivity
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      clearTimeout(inactivityTimer.current);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnterPiP = () => setIsInPiP(true);
    const handleLeavePiP = () => setIsInPiP(false);
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("enterpictureinpicture", handleEnterPiP);
    document.addEventListener("leavepictureinpicture", handleLeavePiP);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("enterpictureinpicture", handleEnterPiP);
      video.removeEventListener("leavepictureinpicture", handleLeavePiP);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    const handleKeyDown = (e) => {
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      )
        return;
      setShowControls(true);
      switch (e.key) {
        case " ": // Spacebar
          e.preventDefault(); // prevent scrolling
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume(Math.min(video.volume + 0.1, 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume(Math.max(video.volume - 0.1, 0));
          break;
        case "ArrowRight":
          e.preventDefault();
          video.currentTime = Math.min(
            video.currentTime + skipTime,
            video.duration
          );
          break;
        case "ArrowLeft":
          e.preventDefault();
          video.currentTime = Math.max(video.currentTime - skipTime, 0);
          break;
        case "f":
        case "F":
          if (!document.fullscreenElement) {
            containerRef?.current?.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
          setIsFullscreen((prev) => !prev);
          break;
        case "Escape":
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          break;
        case "m":
        case "M":
          setIsMuted((prev) => !prev);
          video.muted = !video.muted;
          break;

        case "p":
        case "P":
          if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
          } else {
            if (
              video !== document.pictureInPictureElement &&
              document.pictureInPictureEnabled
            ) {
              video.requestPictureInPicture().catch((error) => {
                console.error("Failed to enter PiP mode:", error);
              });
            }
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative text-white group   ${
        !showControls && isPlaying ? "cursor-none" : "cursor-default"
      }`}
    >
      {/* Upper Title Part */}
      <div
        className={`w-full absolute top-0 left-0  px-4 pt-2 pb-16 bg-gradient-to-b from-black/80 via-black/60 to-transparent
 transition duration-500  z-50 ${
   showControls || !isPlaying
     ? "opacity-100"
     : "opacity-0 pointer-events-none cursor-none"
 }`}
      >
        <p className="text-sm font-bold md:text-lg">{title}</p>
      </div>

      {/* Bottom Controls Part */}
      <div
        className={`absolute w-full flex items-center gap-2  px-2 pt-16 pb-2 bottom-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent
 transition duration-500  z-40 ${
   showControls || !isPlaying
     ? "opacity-100"
     : "opacity-0 pointer-events-none cursor-none"
 } `}
      >
        {/* Timeline Bar */}
        <div className="absolute w-full top-12 ">
          <RangeSlider
            min={0}
            max={videoDuration}
            value={currentTime}
            onChange={(newTime) => (videoRef.current.currentTime = newTime)}
          />
        </div>
        {/* For Large Screen */}
        <div className="hidden md:block md:space-x-2">
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
        </div>

        {/* Current Time/Toltal Time || Remaining Time/Total Time for large screens */}
        <p
          onClick={() => setShowTimeInRemaining(!showTimeInRemaining)}
          className="p-1 text-sm rounded-lg cursor-pointer select-none md:px-2 md:text-lg hover:bg-sky-500"
        >
          {showTimeInRemaining ? (
            <span>-{formatTime(videoDuration - currentTime || 0)}</span>
          ) : (
            <span>{formatTime(currentTime || 0)}</span>
          )}{" "}
          / <span>{formatTime(videoDuration || 0)}</span>
        </p>

        {/* Volume Control */}
        <div className="flex items-center gap-2 md:ml-6">
          <button
            onClick={handleMute}
            className="p-1 transition rounded-lg hover:bg-sky-500"
          >
            <VolumeButton isMuted={isMuted} volume={volume} size={18} />
          </button>

          {/* Volume Slider */}
          <div className="w-16 md:w-20 ">
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
          <PlaybackRateControl videoRef={videoRef} />
          <PiPButton
            videoRef={videoRef}
            size={18}
            setIsPlaying={setIsPlaying}
          />
          <button
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            onClick={toggleFullScreen}
            className="p-1 transition rounded-lg cursor-pointer hover:bg-sky-500"
          >
            <FullscreenButton isFullscreen={isFullscreen} size={18} />
          </button>
        </div>
      </div>
      <div
        className={`relative ${
          isFullscreen ? "  flex items-center justify-center h-full w-full" : ""
        }`}
      >
        {/* Mobile Playback Controls */}
        <div
          className={`absolute z-50 flex items-center gap-6 transform -translate-x-1/2 -translate-y-1/2 md:hidden  left-1/2 
 rounded-full p-2  transition-all duration-300 ${
   showControls || !isPlaying
     ? "opacity-100"
     : "opacity-0 pointer-events-none cursor-none"
 } ${isFullscreen ? "top-[50%]" : "top-[45%]"}`}
        >
          {/* Skip Backward Button */}
          <button
            onClick={handleRewind}
            className="p-2 transition-all rounded-full bg-white/10 backdrop-blur-sm hover:bg-sky-600"
          >
            <SkipButton direction="backward" size={20} />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="p-3 text-white transition-all rounded-full shadow-md bg-sky-500 hover:bg-sky-600"
          >
            <PlayPauseButton isPlaying={isPlaying} size={30} />
          </button>

          {/* Skip Forward Button */}
          <button
            onClick={handleFastForward}
            className="p-2 transition-all rounded-full bg-white/10 backdrop-blur-sm hover:bg-sky-600"
          >
            <SkipButton direction="forward" size={20} />
          </button>
        </div>
        <video
          ref={videoRef}
          onClick={togglePlay}
          src={src}
          className={`w-full   `}
          download="false"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          controls={false}
          style={{ WebkitMediaControls: "none" }}
        ></video>
      </div>
    </div>
  );
};

export default VideoPlayer;
