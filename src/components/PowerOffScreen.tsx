import React from 'react';
import { useWindows } from '../context/WindowContext';
import { Power } from 'lucide-react';

export default function PowerOffScreen() {
  const { powerOn } = useWindows();

  return (
    <div className="fixed inset-0 z-[11000] bg-black flex flex-col items-center justify-center select-none">
      <button 
        onClick={powerOn}
        className="group flex flex-col items-center gap-4 transition-all hover:scale-110 active:scale-95"
      >
        <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-white/50 group-hover:bg-white/5 transition-all">
          <Power size={40} className="text-white/40 group-hover:text-white transition-colors" />
        </div>
        <span className="text-white/40 group-hover:text-white text-sm font-light tracking-widest uppercase">
          Power On
        </span>
      </button>
    </div>
  );
}
