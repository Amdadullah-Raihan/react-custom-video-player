import { useRef, useState } from "react";
import VideoPlayer from "../VideoPlayer";

function Demo() {
  const videoRef = useRef(null);
  const [sourceType, setSourceType] = useState("url");

  const sources = {
    url: "https://res.cloudinary.com/djv2ujxgy/video/upload/v1740465372/courses/67bd6083318babfd4e0805b1/modules/67bd6362318babfd4e0806c7/lessons/u86n2issdtecvvhyahpy.mp4",
    youtube: "https://www.youtube.com/watch?v=NW2jm2t6Zso",
  };

  return (
    <main className="min-h-screen px-4 py-10 bg-gray-100">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          🎥 React Custom Video Player Demo
        </h1>

        <div className="p-4 bg-white shadow rounded-xl">
          <VideoPlayer
            ref={videoRef}
            title="JavaScript Basics (Variables, functions, events, DOM manipulation)."
            src={sources[sourceType]}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {sourceType === "youtube" ? (
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow"
              onClick={() => setSourceType("url")}
            >
              Play Video
            </button>
          ) : (
            <button
              className="px-4 py-2 text-white bg-red-500 rounded-lg shadow"
              onClick={() => setSourceType("youtube")}
            >
              Play YouTube Video
            </button>
          )}
        </div>
        {sourceType === "url" && (
          <div className="p-6 mt-10 bg-white shadow rounded-xl">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              🎮 How to Use / Controls
            </h2>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>
                <strong>Play / Pause:</strong> Click the play/pause button or
                press{" "}
                <kbd className="px-1 py-0.5 bg-gray-200 rounded">Space</kbd>
              </li>
              <li>
                <strong>Seek Forward:</strong> Click the forward button or press{" "}
                <kbd className="px-1 py-0.5 bg-gray-200 rounded">→</kbd> (Right
                Arrow)
              </li>
              <li>
                <strong>Seek Backward:</strong> Click the rewind button or press{" "}
                <kbd className="px-1 py-0.5 bg-gray-200 rounded">←</kbd> (Left
                Arrow)
              </li>
              <li>
                <strong>Timeline Control:</strong>
                <ul className="list-disc ml-14">
                  <li>
                    Click anywhere on the progress bar to jump to that point
                  </li>
                  <li>Drag the thumb/pointer to scrub through the video</li>
                  <li>
                    Scroll your mouse wheel over the timeline to fine-tune the
                    position
                  </li>
                </ul>
              </li>
              <li>
                <strong>Volume Up:</strong> Scroll up on the volume slider or
                press <kbd className="px-1 py-0.5 bg-gray-200 rounded">↑</kbd>{" "}
                (Up Arrow)
              </li>
              <li>
                <strong>Volume Down:</strong> Scroll down on the volume slider
                or press{" "}
                <kbd className="px-1 py-0.5 bg-gray-200 rounded">↓</kbd> (Down
                Arrow)
              </li>
              <li>
                <strong>Mute / Unmute:</strong> Press{" "}
                <kbd className="px-1 py-0.5 bg-gray-200 rounded">M</kbd>
              </li>
              <li>
                <strong>Toggle Fullscreen:</strong> Click fullscreen button or
                press <kbd className="px-1 py-0.5 bg-gray-200 rounded">F</kbd>
              </li>
              <li>
                <strong>Toggle Picture-in-Picture:</strong> Click PiP button or
                press <kbd className="px-1 py-0.5 bg-gray-200 rounded">P</kbd>
              </li>
              <li>
                <strong>Change Playback Speed:</strong> Use the speed dropdown
                or press{" "}
                <kbd className="px-1 py-0.5 bg-gray-200 rounded">Shift</kbd> +{" "}
                <kbd className="px-1 py-0.5 bg-gray-200 rounded">.</kbd>/
                <kbd className="px-1 py-0.5 bg-gray-200 rounded">,</kbd> to
                increase/decrease
              </li>
              <li>
                <strong>Theater Mode:</strong> Press{" "}
                <kbd className="px-1 py-0.5 bg-gray-200 rounded">T</kbd> to
                toggle theater mode
              </li>
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

export default Demo;
