"use client";
import VideoPlayerHLS from "./Player";
import React, { useState, useImperativeHandle, forwardRef } from 'react';

export interface SimliVideoProps {
    playVideo: (text: string, apiKey: string, ttsKey: string, voiceId: string, faceId: string) => void;
}

const SimliVideo = forwardRef<SimliVideoProps, {}>((props, ref) => {
    const [videoSrc, setVideoSrc] = useState("");

    
    // Use useImperativeHandle to expose functions to the parent component
    useImperativeHandle(ref, () => ({
      playVideo: async  (text: string, apiKey: string, ttsKey: string, voiceId: string, faceId: string) => {

        try {
                  const response = await fetch("https://api.simli.ai/textToVideoStream", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      "ttsAPIKey": ttsKey,
                      "simliAPIKey": apiKey,
                      "faceId": faceId,
                      "requestBody": {
                        "audioProvider": "ElevenLabs",
                        "model_id": "eleven_turbo_v2",
                        "voiceName": voiceId,
                        "text": text,
                        "voice_settings": {
                          "stability": 0.5,
                          "similarity_boost": 0.8
                        }
                      }
                    })
                  });
            
                  if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                  }
            
                  const hlsUrl = await response.json();
            
                  console.log(JSON.stringify(hlsUrl));
            
                  const videoURL = hlsUrl.hls_url;
            
                  // wait for 1 second
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  setVideoSrc(videoURL);
            
                } catch (error) {
                  console.error("Fetching video failed: ", error);
                }


      }
    }));

    
  
    return <div >{videoSrc && <VideoPlayerHLS src={videoSrc} />}</div>;
          
  });

  
SimliVideo.displayName = 'SimliVideo';

export default SimliVideo;
