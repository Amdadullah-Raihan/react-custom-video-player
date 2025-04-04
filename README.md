# React Custom Video Player

A fully customizable and modern video player component built with React.

## 🚀 Installation

```bash
npm install react-custom-video-player
```

## 💡 Usage

```jsx
import { VideoPlayer } from "react-custom-video-player";

function App() {
  return <VideoPlayer title="My Video" skipTime={10} />;
}
```

## 🎛 Props

| Prop       | Type   | Default                                                                                                                                                            | Description                       |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| `title`    | string | `""`                                                                                                                                                               | The video title                   |
| `skipTime` | number | `10`                                                                                                                                                               | Seconds to skip on forward/rewind |
| `src`      | string | `https://res.cloudinary.com/djv2ujxgy/video/upload/v1740465372/courses/67bd6083318babfd4e0805b1/modules/67bd6362318babfd4e0806c7/lessons/u86n2issdtecvvhyahpy.mp4` | Seconds to skip on forward/rewind |

## 🎉 Features

- Custom controls
- Keyboard accessible
- Picture-in-Picture
- Theater mode
- Volume control
- Playback speed control

## 🛠 Development

```bash
git clone https://github.com/yourname/react-custom-video-player.git
cd react-custom-video-player
npm install
npm run dev
```

---
