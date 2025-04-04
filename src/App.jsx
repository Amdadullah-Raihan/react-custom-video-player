import VideoPlayer from "./VideoPlayer";
import video from "./assets/video.mp4";

function App() {
  return (
    <main>
      <VideoPlayer
        title="JavaScript Basics (Variables, functions, events, DOM manipulation)."
        src={video}
      />
    </main>
  );
}

export default App;
