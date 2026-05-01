import React from 'react';

export default function Minecraft() {
  return (
    <div className="h-full w-full bg-black flex flex-col">
      <iframe 
        src="https://classic.minecraft.net/" 
        className="flex-1 w-full border-none"
        title="Minecraft Classic"
        allow="autoplay; fullscreen; webgl; webrtc"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
