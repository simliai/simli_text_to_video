'use client';
import SimliVideo from "@/Components/SimliVideo";
import {SimliVideoProps} from "@/Components/SimliVideo";

import { useRef, useState } from "react";

export default function Home() {

  const defaultText = "Hello world";
  const defaultVoiceId = "21m00Tcm4TlvDq8ikWAM";
  const defaultFaceId = "tmp9i8bbq7c";

  const [text, setText] = useState(defaultText);
  const [voiceId, setVoiceId] = useState(defaultVoiceId);
  const [faceId, setFaceId] = useState(defaultFaceId);

  const [simliApiKey, setSimliApiKey] = useState("");
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState("");

  const simliVideoComponent = useRef<SimliVideoProps>(null);



  const playVideo = async () => {
    // check if all fields are filled
    if (simliApiKey === "" || elevenLabsApiKey === "" ||
      text === "" || voiceId === "" || faceId === "") {
      alert("Please fill all fields");
      return;
    }

    simliVideoComponent.current?.playVideo(text, simliApiKey, elevenLabsApiKey, voiceId, faceId);
  }

  return (
    <main className="min-h-screen grid grid-cols-12  p-12 divide-x divide-gray-7">
      <div className="col-span-4 p-4 flex flex-col items-center gap-4">
        {/* Title */}

        <h1 className="text-3xl font-bold text-gray-5">Simli Video</h1>
        <h1 className="text-m  text-gray-5">Text To Video Example</h1>

        {/* Input for text and api keys */}

        <input className="bg-gray-3 w-full px-4 py-1 rounded" type="text" placeholder="Simli API Key" onChange={
          (e) => setSimliApiKey(e.target.value)
        } value={simliApiKey} />

        <input className="bg-gray-3 w-full px-4 py-1 rounded" type="text" placeholder="Eleven Labs API Key"
          value={elevenLabsApiKey} onChange={
            (e) => setElevenLabsApiKey(e.target.value)
          } />
        <input className="bg-gray-3 w-full px-4 py-1 rounded" type="text" placeholder="Text" value={text} onChange={
          (e) => setText(e.target.value)
        } />
        <input className="bg-gray-3 w-full px-4 py-1 rounded" type="text" placeholder="Voice ID" value={voiceId} onChange={
          (e) => setVoiceId(e.target.value)
        } />
        <input className="bg-gray-3 w-full px-4 py-1 rounded" type="text" placeholder="Face ID" value={faceId} onChange={
          (e) => setFaceId(e.target.value)
        } />

        <button className="bg-gray-3 w-48 px-2 py-1 hover:bg-gray-4 rounded" onClick={
          playVideo
        } >Play Video</button>
      </div>
      <div className="col-span-8  items-center flex flex-col justify-center" >
        <SimliVideo ref={simliVideoComponent} />

      </div>
    </main>
  );
}
