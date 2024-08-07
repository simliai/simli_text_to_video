import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
// Define props type
interface VideoPlayerProps {
  src: string;
}
const VideoPlayerHLS: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null); // Typing the ref
  useEffect(() => {
    let hls: Hls | undefined;
    if (Hls.isSupported()) {
        console.log("HLS supported");
        const video = videoRef.current;
        if (video) {
          console.log("Setting hls source");
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          video.play().catch((e) => console.error("Error playing video", e));
        });
      }
    } else if (videoRef.current && videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      // This will run on Safari browsers, as they support HLS natively
      videoRef.current.src = src;
      videoRef.current.addEventListener('loadedmetadata', function() {
        videoRef.current?.play().catch((e) => console.error("Error playing video", e));
      });
    }
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);
  return (
    <div>
        <video ref={videoRef} controls width="100%" />
    </div>
  );
};
export default VideoPlayerHLS;
