import DefaultPlayer from "./components/DefaultPlayer";

const VideoPlayer = ({ title = "", skipTime = 10, src, ref: videoRef }) => {
  const isYouTubeLink = (url) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const getYouTubeVideoId = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("v") || url.split("/").pop();
  };

  return (
    <>
      {isYouTubeLink(src) ? (
        <div className="relative w-full pb-[56.25%]">
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(src)}`}
            title={title}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <DefaultPlayer
          ref={videoRef}
          src={src}
          title={title}
          accentColor="#F79426"
        />
      )}
    </>
  );
};

export default VideoPlayer;
