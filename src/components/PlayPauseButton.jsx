import React from "react";

const PlayPauseButton = ({ isPlaying, size = 24, color = "white" }) => {
  return isPlaying ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-all duration-200 ease-in-out"
    >
      {/* Pause Icon with Smooth Transition */}
      <rect x="5" y="4" width="4" height="16" rx="1" />
      <rect x="15" y="4" width="4" height="16" rx="1" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-all duration-200 ease-in-out"
    >
      {/* Play Icon */}
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
};

export default PlayPauseButton;
