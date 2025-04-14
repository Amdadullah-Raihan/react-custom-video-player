import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import video from "./assets/video.mp4";

function App() {
  const [useYoutube, setUseYoutube] = useState(false);

  const handleToggle = () => {
    setUseYoutube((prev) => !prev);
  };

  return (
    <main className="p-4">
      <VideoPlayer
        title="JavaScript Basics (Variables, functions, events, DOM manipulation)."
        src={useYoutube ? "https://www.youtube.com/watch?v=NW2jm2t6Zso" : video}
      />

      <div className="mt-4">
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={handleToggle}
        >
          {useYoutube ? "Play Local Video" : "Play YouTube Video"}
        </button>
      </div>
    </main>
  );
}

export default App;
