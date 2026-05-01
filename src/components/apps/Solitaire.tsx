import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Trophy, HelpCircle } from 'lucide-react';
import GamePassGuard from '../GamePassGuard';
import { useWindows } from '../../context/WindowContext';
import { THEMES } from '../../constants';

type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

interface Card {
  suit: Suit;
  rank: Rank;
  isFaceUp: boolean;
  id: string;
}

const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const RANK_VALUE: Record<Rank, number> = {
  'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13
};

const getSuitSymbol = (suit: Suit) => {
  switch (suit) {
    case 'hearts': return '♥';
    case 'diamonds': return '♦';
    case 'clubs': return '♣';
    case 'spades': return '♠';
  }
};

const getSuitColor = (suit: Suit) => {
  return (suit === 'hearts' || suit === 'diamonds') ? 'text-red-600' : 'text-black';
};

interface CardUIProps {
  card: Card | null;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const CardUI: React.FC<CardUIProps> = ({ card, isSelected, onClick, className = "", style = {} }) => {
  if (!card) return <div onClick={onClick} className={`w-16 h-24 rounded-lg border-2 border-white/10 bg-white/5 ${className}`} style={style} />;
  
  if (!card.isFaceUp) {
    return (
      <div 
        onClick={onClick}
        className={`w-16 h-24 rounded-lg bg-blue-700 border border-white/40 shadow-md flex items-center justify-center cursor-pointer ${isSelected ? 'ring-4 ring-yellow-400' : ''} ${className}`}
        style={style}
      >
        <div className="w-10 h-16 border border-white/20 rounded opacity-20" />
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={`w-16 h-24 rounded-lg bg-white border border-gray-300 shadow-md flex flex-col p-1 cursor-pointer select-none ${isSelected ? 'ring-4 ring-yellow-400' : ''} ${className}`}
      style={style}
    >
      <div className={`text-xs font-bold flex flex-col leading-none ${getSuitColor(card.suit)}`}>
        <span>{card.rank}</span>
        <span className="text-[10px]">{getSuitSymbol(card.suit)}</span>
      </div>
      <div className={`text-2xl self-center my-auto leading-none ${getSuitColor(card.suit)}`}>
        {getSuitSymbol(card.suit)}
      </div>
      <div className={`text-xs font-bold flex flex-col leading-none rotate-180 ${getSuitColor(card.suit)}`}>
        <span>{card.rank}</span>
        <span className="text-[10px]">{getSuitSymbol(card.suit)}</span>
      </div>
    </div>
  );
};

export default function Solitaire() {
  const { systemTheme } = useWindows();
  const isDark = THEMES[systemTheme].mode === 'dark';
  const [stock, setStock] = useState<Card[]>([]);
  const [waste, setWaste] = useState<Card[]>([]);
  const [foundation, setFoundation] = useState<Card[][]>([[], [], [], []]);
  const [tableau, setTableau] = useState<Card[][]>([[], [], [], [], [], [], []]);
  const [selected, setSelected] = useState<{ pileType: string, pileIndex: number, cardIndex: number } | null>(null);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const initGame = useCallback(() => {
    const deck: Card[] = [];
    SUITS.forEach(suit => {
      RANKS.forEach(rank => {
        deck.push({ suit, rank, isFaceUp: false, id: `${rank}-${suit}` });
      });
    });

    // Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    // Deal Tableau
    const newTableau: Card[][] = [[], [], [], [], [], [], []];
    let deckIndex = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j <= i; j++) {
        const card = deck[deckIndex++];
        if (j === i) card.isFaceUp = true;
        newTableau[i].push(card);
      }
    }

    setTableau(newTableau);
    setStock(deck.slice(deckIndex));
    setWaste([]);
    setFoundation([[], [], [], []]);
    setSelected(null);
    setScore(0);
    setMoves(0);
    setGameWon(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const isOppositeColor = (card1: Card, card2: Card) => {
    const isRed1 = card1.suit === 'hearts' || card1.suit === 'diamonds';
    const isRed2 = card2.suit === 'hearts' || card2.suit === 'diamonds';
    return isRed1 !== isRed2;
  };

  const canMoveToTableau = (card: Card, targetPile: Card[]) => {
    if (targetPile.length === 0) return card.rank === 'K';
    const targetCard = targetPile[targetPile.length - 1];
    return isOppositeColor(card, targetCard) && RANK_VALUE[card.rank] === RANK_VALUE[targetCard.rank] - 1;
  };

  const canMoveToFoundation = (card: Card, targetPile: Card[]) => {
    if (targetPile.length === 0) return card.rank === 'A';
    const targetCard = targetPile[targetPile.length - 1];
    return card.suit === targetCard.suit && RANK_VALUE[card.rank] === RANK_VALUE[targetCard.rank] + 1;
  };

  const handleCardClick = (pileType: string, pileIndex: number, cardIndex: number) => {
    if (gameWon) return;

    // If clicking on stock
    if (pileType === 'stock') {
      if (stock.length === 0) {
        setStock(waste.reverse().map(c => ({ ...c, isFaceUp: false })));
        setWaste([]);
      } else {
        const newStock = [...stock];
        const card = newStock.pop()!;
        card.isFaceUp = true;
        setWaste(prev => [...prev, card]);
        setStock(newStock);
      }
      setSelected(null);
      setMoves(m => m + 1);
      return;
    }

    // Selection logic
    if (!selected) {
      // Only select if card is face up
      let card: Card | null = null;
      if (pileType === 'waste') card = waste[waste.length - 1];
      if (pileType === 'tableau') card = tableau[pileIndex][cardIndex];
      if (pileType === 'foundation') card = foundation[pileIndex][foundation[pileIndex].length - 1];

      if (card && card.isFaceUp) {
        setSelected({ pileType, pileIndex, cardIndex });
      }
      return;
    }

    // Move logic
    const sourcePile = getPile(selected.pileType, selected.pileIndex);
    const movingCards = sourcePile.slice(selected.cardIndex);
    const firstMovingCard = movingCards[0];

    let moveSuccessful = false;

    if (pileType === 'tableau') {
      if (canMoveToTableau(firstMovingCard, tableau[pileIndex])) {
        const newTableau = [...tableau];
        // Remove from source
        removeFromSource(selected.pileType, selected.pileIndex, selected.cardIndex);
        // Add to target
        newTableau[pileIndex] = [...newTableau[pileIndex], ...movingCards];
        setTableau(newTableau);
        moveSuccessful = true;
      }
    } else if (pileType === 'foundation' && movingCards.length === 1) {
      if (canMoveToFoundation(firstMovingCard, foundation[pileIndex])) {
        const newFoundation = [...foundation];
        removeFromSource(selected.pileType, selected.pileIndex, selected.cardIndex);
        newFoundation[pileIndex] = [...newFoundation[pileIndex], firstMovingCard];
        setFoundation(newFoundation);
        moveSuccessful = true;
        setScore(s => s + 10);
      }
    }

    if (moveSuccessful) {
      setMoves(m => m + 1);
      checkWin();
    }
    setSelected(null);
  };

  const getPile = (type: string, index: number) => {
    if (type === 'waste') return waste;
    if (type === 'tableau') return tableau[index];
    if (type === 'foundation') return foundation[index];
    return [];
  };

  const removeFromSource = (type: string, index: number, cardIndex: number) => {
    if (type === 'waste') {
      setWaste(prev => prev.slice(0, -1));
    } else if (type === 'tableau') {
      setTableau(prev => {
        const next = [...prev];
        next[index] = next[index].slice(0, cardIndex);
        if (next[index].length > 0) {
          next[index][next[index].length - 1].isFaceUp = true;
        }
        return next;
      });
    } else if (type === 'foundation') {
      setFoundation(prev => {
        const next = [...prev];
        next[index] = next[index].slice(0, -1);
        return next;
      });
    }
  };

  const checkWin = () => {
    const totalCardsInFoundation = foundation.reduce((acc, pile) => acc + pile.length, 0);
    if (totalCardsInFoundation === 51) { // One card left to move
       // This is a simple check, usually it's 52
    }
    if (foundation.every(pile => pile.length === 13)) {
      setGameWon(true);
    }
  };

  return (
    <GamePassGuard gameName="Solitaire" requiredPlan="premium">
      <div className={`h-full flex flex-col p-6 overflow-hidden select-none transition-colors ${isDark ? 'bg-green-950' : 'bg-green-800'}`}>
        {/* Top Bar */}
        <div className={`flex justify-between items-center mb-8 p-3 rounded-xl border ${isDark ? 'bg-black/40 border-white/5' : 'bg-black/20 border-white/10'}`}>
          <div className="flex gap-6 text-white/80 text-sm font-medium">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase opacity-50">Score</span>
              <span className="font-mono text-lg">{score}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase opacity-50">Moves</span>
              <span className="font-mono text-lg">{moves}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={initGame} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
              <RotateCcw size={20} />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
              <HelpCircle size={20} />
            </button>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Top Row: Stock, Waste, Foundations */}
          <div className="flex gap-4 items-start">
            <div className="flex gap-2">
              <CardUI card={stock.length > 0 ? { ...stock[0], isFaceUp: false } : null} onClick={() => handleCardClick('stock', 0, 0)} />
              <CardUI card={waste.length > 0 ? waste[waste.length - 1] : null} isSelected={selected?.pileType === 'waste'} onClick={() => handleCardClick('waste', 0, waste.length - 1)} />
            </div>
            
            <div className="flex-1" />

            <div className="flex gap-2">
              {foundation.map((pile, i) => (
                <div key={i} className="relative">
                   <div className="absolute inset-0 flex items-center justify-center text-white/5 text-4xl pointer-events-none">
                    {getSuitSymbol(SUITS[i])}
                  </div>
                  <CardUI 
                    card={pile.length > 0 ? pile[pile.length - 1] : null} 
                    isSelected={selected?.pileType === 'foundation' && selected.pileIndex === i}
                    onClick={() => handleCardClick('foundation', i, pile.length - 1)} 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tableau */}
          <div className="flex gap-4 justify-between">
            {tableau.map((pile, i) => (
              <div key={i} className="flex flex-col w-16 relative min-h-[300px]" onClick={() => pile.length === 0 && handleCardClick('tableau', i, 0)}>
                {pile.map((card, j) => (
                  <CardUI 
                    key={card.id} 
                    card={card} 
                    isSelected={selected?.pileType === 'tableau' && selected.pileIndex === i && selected.cardIndex === j}
                    onClick={() => handleCardClick('tableau', i, j)}
                    className="absolute"
                    style={{ top: `${j * 25}px`, zIndex: j }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {gameWon && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className={`rounded-2xl p-8 text-center shadow-2xl scale-110 ${isDark ? 'bg-[#1a1c1e] border border-white/5' : 'bg-white'}`}>
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Trophy className="text-white" size={40} />
              </div>
              <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>You Won!</h2>
              <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Final Score: {score} | Moves: {moves}</p>
              <button 
                onClick={initGame}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg text-lg"
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-white/30 text-[10px] uppercase tracking-widest font-bold mt-4">
          Microsoft Solitaire Collection
        </p>
      </div>
    </GamePassGuard>
  );
}

