import React, { useState, useEffect } from 'react';
import { useWindows } from '../context/WindowContext';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export default function SystemRepairScreen() {
  const { repairSystem } = useWindows();
  const [isRepairing, setIsRepairing] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: any;
    if (isRepairing && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (isRepairing && timer === 0) {
      repairSystem();
    }
    return () => clearInterval(interval);
  }, [isRepairing, timer, repairSystem]);

  const handleRefresh = () => {
    setIsRepairing(true);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white font-mono p-8 text-center select-none">
      {!isRepairing ? (
        <div className="max-w-md flex flex-col items-center gap-6 animate-pulse">
          <AlertTriangle size={64} className="text-red-500" />
          <h1 className="text-2xl font-bold uppercase tracking-widest text-red-500">System Failure</h1>
          <p className="text-lg leading-relaxed">
            u deleted system no more pc now refresh the app to repair
          </p>
          <button 
            onClick={handleRefresh}
            className="mt-4 flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all active:scale-95 group"
          >
            <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
            REFRESH
          </button>
        </div>
      ) : (
        <div className="max-w-md flex flex-col items-center gap-8">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
            <div 
              className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" 
              style={{ animationDuration: '2s' }}
            />
            <span className="text-3xl font-bold">{timer}s</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold animate-pulse">repairing the system</h2>
            <p className="text-gray-400 text-sm">Please do not turn off your computer...</p>
          </div>
          <div className="w-64 bg-gray-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-1000 ease-linear"
              style={{ width: `${((60 - timer) / 60) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
