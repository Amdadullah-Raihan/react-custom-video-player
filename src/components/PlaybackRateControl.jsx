import { useEffect, useRef, useState } from "react";

const PlaybackRateControl = ({ videoRef, rates = [1, 1.25, 1.5, 1.75, 2] }) => {
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const rateRef = useRef(null);

  const toggleShowPopup = () => {
    setShowDropdown((prev) => !prev);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef?.current &&
        !dropdownRef?.current?.contains(e.target) &&
        rateRef?.current &&
        !rateRef?.current?.contains(e.target)
      ) {
        setShowDropdown(false);
        console.log("Clicked outside the dropdown");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative flex items-center justify-center w-full h-full"
    >
      <p
        className="p-1 px-2 font-bold transition rounded-lg cursor-pointer select-none hover:bg-sky-500"
        onClick={toggleShowPopup}
        title="Change Playback Speed"
      >
        {playbackRate}x
      </p>

      <div
        className={
          "absolute flex justify-between gap-2 p-2 mt-2 mr-2 text-black bg-white rounded-lg shadow-[0_0_15px_5px_rgba(0,0,0,0.5)] -right-[5.3rem] -top-[4.9rem] text-normal " +
          (showDropdown ? "block" : "hidden")
        }
      >
        {rates.length > 1 &&
          rates.map((rate) => (
            <button
              ref={rateRef}
              key={rate}
              className={`p-1 px-2 font-medium transition rounded-lg cursor-pointer select-none  ${
                playbackRate === rate
                  ? "bg-sky-500 text-white"
                  : "hover:ring-1 hover:ring-sky-500 "
              }`}
              onClick={() => {
                setPlaybackRate(rate);
                if (videoRef.current) {
                  videoRef.current.playbackRate = rate;
                }
              }}
            >
              {rate}x
            </button>
          ))}
      </div>
    </div>
  );
};

export default PlaybackRateControl;
