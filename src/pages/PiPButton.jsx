import { useState } from "react";

const PiPButton = ({ videoRef }) => {
  const [isPiP, setIsPiP] = useState(false);

  const togglePiP = async () => {
    if (!videoRef.current) return;

    try {
      if (!document.pictureInPictureElement) {
        await videoRef.current.requestPictureInPicture();
        setIsPiP(true);
      } else {
        await document.exitPictureInPicture();
        setIsPiP(false);
      }
    } catch (error) {
      console.error("Error toggling PiP:", error);
    }
  };

  return (
    <button
      onClick={togglePiP}
      className="p-1 transition rounded-lg hover:bg-sky-500"
    >
      {isPiP ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-picture-in-picture-exit"
        >
          <path d="M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" />
          <rect width="10" height="7" x="2" y="4" rx="2" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-picture-in-picture-2"
        >
          <path d="M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" />
          <rect width="10" height="7" x="12" y="13" rx="2" />
        </svg>
      )}
    </button>
  );
};

export default PiPButton;
