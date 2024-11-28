"use client";
import VideoPlayerHLS from "./Player";
import React, { useState, useImperativeHandle, forwardRef } from 'react';

interface RequestData {
  ttsAPIKey: string;
  simliAPIKey: string;
  faceId: string;
  requestBody: {
    audioProvider: string;
    text: string;
    voiceName: string;
    model_id: string;
    voice_settings: {
      stability: number;
      similarity_boost: number;
      style: number;
    }
  }
}

export interface SimliVideoProps {
  playVideo: (requestData: RequestData) => void;
}

const SimliVideo = forwardRef<SimliVideoProps, {}>((props, ref) => {
  const [videoSrc, setVideoSrc] = useState("");

  useImperativeHandle(ref, () => ({
    playVideo: async (requestData: RequestData) => {
      try {
        console.log("Request body:", JSON.stringify(requestData, null, 2));

        const response = await fetch("https://api.simli.ai/textToVideoStream", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData)
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
        }

        const data = await response.json();
        console.log("Response:", JSON.stringify(data));

        setVideoSrc(data.hls_url);

      } catch (error) {
        console.error("Fetching video failed: ", error);
      }
    }
  }));

  return <div>{videoSrc && <VideoPlayerHLS src={videoSrc} />}</div>;
});

SimliVideo.displayName = 'SimliVideo';
export default SimliVideo;
