import React from 'react';
import { Lock, ShoppingBag } from 'lucide-react';
import { useWindows } from '../context/WindowContext';

interface GamePassGuardProps {
  children: React.ReactNode;
  gameName: string;
  requiredPlan?: 'basic' | 'premium' | 'ultimate';
}

export default function GamePassGuard({ children, gameName, requiredPlan = 'basic' }: GamePassGuardProps) {
  const { gamePassPlan, openApp } = useWindows();

  const planHierarchy = {
    none: 0,
    basic: 1,
    premium: 2,
    ultimate: 3
  };

  const currentLevel = planHierarchy[gamePassPlan];
  const requiredLevel = planHierarchy[requiredPlan];

  if (currentLevel >= requiredLevel) {
    return <>{children}</>;
  }

  const planNames = {
    basic: 'Basic',
    premium: 'Premium',
    ultimate: 'Ultimate'
  };

  return (
    <div className="h-full w-full bg-zinc-900 flex flex-col items-center justify-center text-white p-8 text-center">
      <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-6 border border-zinc-700 shadow-xl">
        <Lock className="text-green-500" size={32} />
      </div>
      <h2 className="text-2xl font-bold mb-2">{gameName}</h2>
      <p className="text-zinc-400 mb-8 max-w-xs">
        This game requires an active <span className="text-green-500 font-bold">Xbox Game Pass {planNames[requiredPlan]}</span> subscription or higher.
      </p>
      <button 
        onClick={() => openApp('store')}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:scale-105 active:scale-95"
      >
        <ShoppingBag size={20} />
        Get Game Pass in Store
      </button>
      <p className="mt-6 text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
        Xbox Game Pass {planNames[requiredPlan]}
      </p>
    </div>
  );
}
