import React, { useState, useRef, useEffect } from "react";

const RangeSlider = ({ min = 0, max = 100, value, onChange }) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSeek = (e) => {
    if (!sliderRef.current) return;

    const { left, width } = sliderRef.current.getBoundingClientRect();
    const clickX = e.clientX - left;
    const percentageClicked = (clickX / width) * 100;

    // Clamp value between min and max
    const newValue = Math.max(
      min,
      Math.min((percentageClicked / 100) * max, max)
    );

    onChange(newValue);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleSeek(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleSeek(e);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove]);

  return (
    <div
      ref={sliderRef}
      className="relative w-full h-[0.3rem] bg-gray-300 rounded cursor-pointer"
      style={{ width: "calc(100% - 1rem)" }}
      onMouseDown={handleMouseDown}
    >
      {/* Progress Bar */}
      <div
        className="relative h-full rounded bg-sky-500"
        style={{ width: `${((value - min) / (max - min)) * 100}%` }}
      >
        {/* Thumb */}
        <div
          className={`absolute w-3 h-3 transition-all -translate-x-1/2 -translate-y-1/2 bg-sky-500 border-[4px] shadow rounded-full left-full top-1/2 ${
            isDragging ? "scale-150" : "group-hover:scale-100"
          }`}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
