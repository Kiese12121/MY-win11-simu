import React, { useEffect } from 'react';
import { useWindows } from '../context/WindowContext';

export default function BootScreen() {
  const { finishBoot } = useWindows();
  const [showForceStart, setShowForceStart] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      finishBoot();
    }, 5000); // 5 seconds boot

    const safetyTimer = setTimeout(() => {
      setShowForceStart(true);
    }, 10000); // Show force start after 10s

    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimer);
    };
  }, [finishBoot]);

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center select-none">
      <div className="w-24 h-24 mb-12">
        <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500 fill-current">
          <path d="M0 0h48v48H0zM52 0h48v48H52zM0 52h48v48H0zM52 52h48v48H52z" />
        </svg>
      </div>
      
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
        <div 
          className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" 
          style={{ animationDuration: '1.5s' }}
        />
      </div>
      
      <div className="mt-12 text-white/40 text-xs font-light tracking-widest uppercase">
        Starting System
      </div>

      {showForceStart && (
        <button 
          onClick={() => finishBoot()}
          className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 text-white/60 text-[10px] rounded-full border border-white/10 transition-all"
        >
          Force Start System
        </button>
      )}
    </div>
  );
}
