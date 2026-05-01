import React, { useState, useEffect, useCallback } from 'react';
import { Bomb, Flag, RotateCcw } from 'lucide-react';
import GamePassGuard from '../GamePassGuard';
import { useWindows } from '../../context/WindowContext';
import { THEMES } from '../../constants';

type CellValue = number | 'mine';
interface Cell {
  value: CellValue;
  isRevealed: boolean;
  isFlagged: boolean;
}

const GRID_SIZE = 9;
const MINE_COUNT = 10;

export default function Minesweeper() {
  const { systemTheme } = useWindows();
  const isDark = THEMES[systemTheme].mode === 'dark';
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [mineLocations, setMineLocations] = useState<[number, number][]>([]);
  const [flagsUsed, setFlagsUsed] = useState(0);
  const [timer, setTimer] = useState(0);

  const initGame = useCallback(() => {
    const newGrid: Cell[][] = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(null).map(() => ({
        value: 0,
        isRevealed: false,
        isFlagged: false,
      }))
    );

    // Place mines
    const mines: [number, number][] = [];
    while (mines.length < MINE_COUNT) {
      const r = Math.floor(Math.random() * GRID_SIZE);
      const c = Math.floor(Math.random() * GRID_SIZE);
      if (!mines.some(([mr, mc]) => mr === r && mc === c)) {
        mines.push([r, c]);
        newGrid[r][c].value = 'mine';
      }
    }

    // Calculate numbers
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (newGrid[r][c].value === 'mine') continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE && newGrid[nr][nc].value === 'mine') {
              count++;
            }
          }
        }
        newGrid[r][c].value = count;
      }
    }

    setGrid(newGrid);
    setMineLocations(mines);
    setGameState('playing');
    setFlagsUsed(0);
    setTimer(0);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    let interval: any;
    if (gameState === 'playing' && timer < 999) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, timer]);

  const revealCell = (r: number, c: number) => {
    if (gameState !== 'playing' || grid[r][c].isRevealed || grid[r][c].isFlagged) return;

    const newGrid = [...grid.map(row => [...row])];
    
    if (newGrid[r][c].value === 'mine') {
      // Game Over
      mineLocations.forEach(([mr, mc]) => {
        newGrid[mr][mc].isRevealed = true;
      });
      setGrid(newGrid);
      setGameState('lost');
      return;
    }

    const revealRecursive = (row: number, col: number) => {
      if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE || newGrid[row][col].isRevealed || newGrid[row][col].isFlagged) return;
      
      newGrid[row][col].isRevealed = true;
      
      if (newGrid[row][col].value === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            revealRecursive(row + dr, col + dc);
          }
        }
      }
    };

    revealRecursive(r, c);

    // Check win
    let unrevealedSafeCells = 0;
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (!newGrid[row][col].isRevealed && newGrid[row][col].value !== 'mine') {
          unrevealedSafeCells++;
        }
      }
    }

    setGrid(newGrid);
    if (unrevealedSafeCells === 0) {
      setGameState('won');
    }
  };

  const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameState !== 'playing' || grid[r][c].isRevealed) return;

    const newGrid = [...grid.map(row => [...row])];
    const isFlagged = !newGrid[r][c].isFlagged;
    newGrid[r][c].isFlagged = isFlagged;
    setGrid(newGrid);
    setFlagsUsed(prev => isFlagged ? prev + 1 : prev - 1);
  };

  const getNumberColor = (num: number) => {
    const colors = isDark ? [
      '', 'text-blue-400', 'text-green-400', 'text-red-400', 
      'text-purple-400', 'text-orange-400', 'text-cyan-400', 
      'text-white', 'text-gray-400'
    ] : [
      '', 'text-blue-600', 'text-green-600', 'text-red-600', 
      'text-purple-800', 'text-maroon-800', 'text-cyan-600', 
      'text-black', 'text-gray-600'
    ];
    return colors[num] || '';
  };

  return (
    <GamePassGuard gameName="Minesweeper" requiredPlan="basic">
      <div className={`h-full flex flex-col items-center justify-center p-4 select-none transition-colors ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-200'}`}>
        <div className={`p-2 shadow-xl ${isDark ? 'bg-[#1a1c1e] border-4 border-t-white/10 border-l-white/10 border-b-black border-r-black' : 'bg-gray-300 border-4 border-t-white border-l-white border-b-gray-500 border-r-gray-500'}`}>
          {/* Header */}
          <div className={`p-2 mb-2 flex justify-between items-center ${isDark ? 'bg-[#1a1c1e] border-4 border-b-white/10 border-r-white/10 border-t-black border-l-black' : 'bg-gray-300 border-4 border-b-white border-r-white border-t-gray-500 border-l-gray-500'}`}>
            <div className={`font-mono text-2xl px-1 w-16 text-right border-2 ${isDark ? 'bg-black text-red-500 border-white/5' : 'bg-black text-red-600 border-gray-500'}`}>
              {String(Math.max(0, MINE_COUNT - flagsUsed)).padStart(3, '0')}
            </div>
            
            <button 
              onClick={initGame}
              className={`w-10 h-10 flex items-center justify-center active:border-t-black active:border-l-black active:border-b-white/10 active:border-r-white/10 ${isDark ? 'bg-[#1a1c1e] border-2 border-t-white/10 border-l-white/10 border-b-black border-r-black' : 'bg-gray-300 border-2 border-t-white border-l-white border-b-gray-500 border-r-gray-500'}`}
            >
              <span className="text-2xl">
                {gameState === 'playing' ? '😊' : gameState === 'won' ? '😎' : '😵'}
              </span>
            </button>

            <div className={`font-mono text-2xl px-1 w-16 text-right border-2 ${isDark ? 'bg-black text-red-500 border-white/5' : 'bg-black text-red-600 border-gray-500'}`}>
              {String(timer).padStart(3, '0')}
            </div>
          </div>

          {/* Grid */}
          <div className={`grid grid-cols-9 gap-0 border-4 ${isDark ? 'border-b-white/10 border-r-white/10 border-t-black border-l-black' : 'border-b-white border-r-white border-t-gray-500 border-l-gray-500'}`}>
            {grid.map((row, r) => (
              row.map((cell, c) => (
                <div
                  key={`${r}-${c}`}
                  onClick={() => revealCell(r, c)}
                  onContextMenu={(e) => toggleFlag(e, r, c)}
                  className={`
                    w-8 h-8 flex items-center justify-center text-lg font-bold
                    ${cell.isRevealed 
                      ? (isDark ? 'bg-black/40 border border-white/5' : 'bg-gray-300 border border-gray-400') 
                      : (isDark 
                          ? 'bg-[#1a1c1e] border-2 border-t-white/10 border-l-white/10 border-b-black border-r-black hover:bg-white/5 cursor-pointer active:border-t-black active:border-l-black active:border-b-white/10 active:border-r-white/10'
                          : 'bg-gray-300 border-2 border-t-white border-l-white border-b-gray-500 border-r-gray-500 hover:bg-gray-200 cursor-pointer active:border-t-gray-500 active:border-l-gray-500 active:border-b-white active:border-r-white'
                        )
                    }
                  `}
                >
                  {cell.isRevealed ? (
                    cell.value === 'mine' ? (
                      <Bomb size={16} className={isDark ? 'text-white fill-white' : 'text-black fill-black'} />
                    ) : (
                      cell.value > 0 ? <span className={getNumberColor(cell.value)}>{cell.value}</span> : ''
                    )
                  ) : (
                    cell.isFlagged ? <Flag size={14} className="text-red-600 fill-red-600" /> : ''
                  )}
                </div>
              ))
            ))}
          </div>
        </div>
        
        <div className="mt-6 flex flex-col items-center gap-2">
          <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Minesweeper Classic</p>
          <div className="flex gap-4 text-[10px] text-gray-500 font-medium">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-gray-400 rounded-full" /> Left Click: Reveal</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-400 rounded-full" /> Right Click: Flag</span>
          </div>
        </div>
      </div>
    </GamePassGuard>
  );
}
