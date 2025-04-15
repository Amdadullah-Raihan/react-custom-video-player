# React Custom Video Player

A fully customizable and modern video player component built with React.

## 🔴 [See Live Demo](https://react-custom-video-player.vercel.app/)

> A sneak peek of the React Custom Video Player in action.

[![React custom video player demo](https://github.com/user-attachments/assets/2dfad1c2-48b9-4a0e-b3db-005ba7f02d8f)](https://react-custom-video-player.vercel.app/)

## 🚀 Installation

Install the package via npm:

```bash
npm install @amdadullah_raihan/react-custom-video-player
```

## 💡 Usage

```jsx
import { VideoPlayer } from "@amdadullah_raihan/react-custom-video-player";
import "@amdadullah_raihan/react-custom-video-player/dist/react-custom-video-player.css";

function App() {
  return (
    <VideoPlayer
      title="JavaScript Basics"
      skipTime={10}
      src="https://example.com/video.mp4"
    />
  );
}
```

## 🎛 Props

| Prop       | Type   | Default                                                                                                                                                            | Description                       |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| `title`    | string | `""`                                                                                                                                                               | The video title                   |
| `skipTime` | number | `10`                                                                                                                                                               | Seconds to skip on forward/rewind |
| `src`      | string | `https://res.cloudinary.com/djv2ujxgy/video/upload/v1740465372/courses/67bd6083318babfd4e0805b1/modules/67bd6362318babfd4e0806c7/lessons/u86n2issdtecvvhyahpy.mp4` | The video source URL              |

## 🎉 Features

- Default Youtube video support
- Custom controls
- Keyboard accessible
- Picture-in-Picture
- Theater mode
- Volume control
- Playback speed control

## 🎮 How to Use / Controls

### ▶️ Play / Pause

- Click the play/pause button
- Press `Space`

### ⏩ Seek Forward

- Click the forward button
- Press `→` (Right Arrow)

### ⏪ Seek Backward

- Click the rewind button
- Press `←` (Left Arrow)

---

## ⏳ Timeline Control

- Click anywhere on the progress bar to jump to that point
- Drag the thumb/pointer to scrub through the video
- Scroll your mouse wheel over the timeline to fine-tune the position

---

## 🔊 Volume Control

- Use the volume slider or scroll over it
- Press `↑` / `↓` to increase or decrease volume
- Press `M` to mute/unmute

---

## 🔲 Fullscreen & Modes

- **Fullscreen:** Click the fullscreen button or press `F`
- **Picture-in-Picture (PiP):** Click the PiP button or press `P`
- **Theater Mode:** Press `T` to toggle

---

## 🎚 Playback Speed

- Use the speed selector
- Press `Shift + .` to increase
- Press `Shift + ,` to decrease

## 🛠 Development

To clone and start the development server:

```bash
git clone https://github.com/amdadullah-raihan/react-custom-video-player.git
cd react-custom-video-player
npm install
npm run dev
```

## 📄 License

MIT License. See [LICENSE](./LICENSE) for more details.
