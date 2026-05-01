import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, Flag, AlertCircle } from 'lucide-react';
import GamePassGuard from '../GamePassGuard';

export default function RacingGame() {
  const [carPos, setCarPos] = useState(50);
  const [obstacles, setObstacles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [offset, setOffset] = useState(0);

  const spawnObstacle = useCallback(() => {
    const newObstacle = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: -10
    };
    setObstacles(prev => [...prev, newObstacle]);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      setOffset(prev => (prev + speed) % 100);
      setObstacles(prev => {
        const next = prev.map(o => ({ ...o, y: o.y + speed })).filter(o => o.y < 110);
        
        // Collision detection
        const collision = next.find(o => 
          o.y > 80 && o.y < 95 && Math.abs(o.x - carPos) < 10
        );
        
        if (collision) {
          setGameOver(true);
        }
        
        return next;
      });

      setScore(prev => {
        const newScore = prev + 1;
        if (newScore > 0 && newScore % 500 === 0) {
          setSpeed(s => s + 0.5);
        }
        return newScore;
      });
    }, 50);

    const obstacleSpawner = setInterval(spawnObstacle, 1500);

    return () => {
      clearInterval(gameLoop);
      clearInterval(obstacleSpawner);
    };
  }, [gameOver, carPos, speed, spawnObstacle]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setCarPos(prev => Math.max(10, prev - 5));
    if (e.key === 'ArrowRight') setCarPos(prev => Math.min(90, prev + 5));
  };

  const resetGame = () => {
    setCarPos(50);
    setObstacles([]);
    setScore(0);
    setGameOver(false);
    setSpeed(5);
    setOffset(0);
  };

  return (
    <div 
      className="h-full bg-zinc-900 relative overflow-hidden flex flex-col outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      autoFocus
    >
        <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-4 py-2 rounded-full font-mono flex items-center gap-2">
          <Trophy size={16} className="text-yellow-400" />
          {score.toString().padStart(6, '0')}
        </div>

        {/* Background Scenery */}
        <div className="absolute inset-0 flex justify-between px-10 pointer-events-none opacity-20">
          {[0, 1].map(side => (
            <div key={side} className="h-full w-20 relative">
              {[0, 1, 2, 3, 4].map(i => (
                <div 
                  key={i}
                  className="absolute w-4 h-20 bg-zinc-700 rounded-full"
                  style={{ 
                    top: `${((i * 25) + offset) % 125 - 25}%`,
                    left: side === 0 ? '0' : 'auto',
                    right: side === 1 ? '0' : 'auto'
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Road */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-full max-w-md h-full bg-zinc-800 border-x-8 border-zinc-700 relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            {/* Scrolling Center Lines */}
            <div 
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-2 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(to bottom, white 0%, white 50%, transparent 50%, transparent 100%)',
                backgroundSize: '100% 80px',
                backgroundRepeat: 'repeat-y',
                backgroundPosition: `center ${offset * 5}px`,
                opacity: 0.3
              }}
            />

            {/* Road Texture/Grain */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

            {/* Car */}
            <div 
              className="absolute bottom-10 w-12 h-20 bg-red-600 rounded-lg shadow-2xl transition-all duration-75 flex flex-col items-center justify-between p-1 z-10"
              style={{ 
                left: `${carPos}%`, 
                transform: `translateX(-50%) rotate(${(carPos - 50) * 0.2}deg)`,
                boxShadow: '0 10px 20px rgba(0,0,0,0.5), 0 0 20px rgba(255,0,0,0.3)'
              }}
            >
              {/* Wheels */}
              <div className="absolute -left-1 top-2 w-2 h-4 bg-zinc-900 rounded-sm" />
              <div className="absolute -right-1 top-2 w-2 h-4 bg-zinc-900 rounded-sm" />
              <div className="absolute -left-1 bottom-2 w-2 h-4 bg-zinc-900 rounded-sm" />
              <div className="absolute -right-1 bottom-2 w-2 h-4 bg-zinc-900 rounded-sm" />

              <div className="w-full h-3 bg-zinc-900/50 rounded-sm" />
              <div className="w-10 h-10 bg-blue-400/40 rounded-lg border border-white/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10" />
              </div>
              <div className="w-full h-4 bg-red-800 rounded-sm flex items-center justify-around px-1">
                <div className="w-2 h-1 bg-red-400 rounded-full" />
                <div className="w-2 h-1 bg-red-400 rounded-full" />
              </div>
              
              {/* Headlights Glow */}
              <div className="absolute -top-12 left-0 w-4 h-16 bg-yellow-200/30 blur-xl rounded-full" />
              <div className="absolute -top-12 right-0 w-4 h-16 bg-yellow-200/30 blur-xl rounded-full" />
            </div>

            {/* Obstacles (Other Cars) */}
            {obstacles.map(o => (
              <div 
                key={o.id}
                className="absolute w-12 h-20 bg-blue-600 rounded-lg shadow-lg z-0 flex flex-col items-center justify-between p-1"
                style={{ left: `${o.x}%`, top: `${o.y}%`, transform: 'translateX(-50%)' }}
              >
                {/* Wheels */}
                <div className="absolute -left-1 top-2 w-2 h-4 bg-zinc-900 rounded-sm" />
                <div className="absolute -right-1 top-2 w-2 h-4 bg-zinc-900 rounded-sm" />
                <div className="absolute -left-1 bottom-2 w-2 h-4 bg-zinc-900 rounded-sm" />
                <div className="absolute -right-1 bottom-2 w-2 h-4 bg-zinc-900 rounded-sm" />

                <div className="w-full h-3 bg-zinc-900/50 rounded-sm" />
                <div className="w-10 h-10 bg-zinc-800 rounded-lg border border-white/5" />
                <div className="w-full h-4 bg-blue-800 rounded-sm flex items-center justify-around px-1">
                  <div className="w-2 h-1 bg-red-600 rounded-full" />
                  <div className="w-2 h-1 bg-red-600 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {gameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white z-20 p-8 text-center">
            <Flag size={64} className="text-red-500 mb-6" />
            <h2 className="text-4xl font-bold mb-2 uppercase tracking-tighter">Game Over</h2>
            <p className="text-zinc-400 mb-8">Final Score: {score}</p>
            <button 
              onClick={resetGame}
              className="bg-white text-black px-12 py-4 rounded-full font-bold hover:scale-105 transition-transform active:scale-95"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs uppercase tracking-widest font-bold">
          Use Arrow Keys to Move
        </div>
      </div>
  );
}
