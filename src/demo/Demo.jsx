import { useRef, useState } from "react";
import video from "../assets/video.mp4";
import VideoPlayer from "../VideoPlayer";

function Demo() {
  const videoRef = useRef(null);
  const [sourceType, setSourceType] = useState("local");

  const sources = {
    local: video,
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
          <button
            variant={sourceType === "local" ? "default" : "outline"}
            onClick={() => setSourceType("local")}
          >
            Play Local Video
          </button>
          <button
            variant={sourceType === "url" ? "default" : "outline"}
            onClick={() => setSourceType("url")}
          >
            Play URL Video
          </button>
          <button
            variant={sourceType === "youtube" ? "default" : "outline"}
            onClick={() => setSourceType("youtube")}
          >
            Play YouTube Video
          </button>
        </div>
        <div></div>
      </div>
    </main>
  );
}

export default Demo;
