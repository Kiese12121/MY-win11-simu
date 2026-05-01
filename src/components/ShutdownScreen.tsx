import React, { useEffect } from 'react';
import { useWindows } from '../context/WindowContext';

export default function ShutdownScreen() {
  const { powerOff } = useWindows();

  useEffect(() => {
    const timer = setTimeout(() => {
      powerOff();
    }, 3000); // 3 seconds shutdown animation
    return () => clearTimeout(timer);
  }, [powerOff]);

  return (
    <div className="fixed inset-0 z-[10500] bg-blue-600 flex flex-col items-center justify-center select-none">
      <div className="flex flex-col items-center gap-8">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full" />
          <div 
            className="absolute inset-0 border-4 border-white rounded-full border-t-transparent animate-spin" 
            style={{ animationDuration: '1.5s' }}
          />
        </div>
        <h1 className="text-3xl font-light text-white tracking-wide">Shutting down</h1>
      </div>
    </div>
  );
}
