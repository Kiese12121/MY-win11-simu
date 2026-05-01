import { useState } from 'react';
import { useWindows } from '../../context/WindowContext';
import { THEMES } from '../../constants';

export default function Calculator() {
  const { systemTheme } = useWindows();
  const isDark = THEMES[systemTheme].mode === 'dark';
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldReset, setShouldReset] = useState(false);

  const handleNumber = (num: string) => {
    if (display === '0' || shouldReset) {
      setDisplay(num);
      setShouldReset(false);
    } else {
      setDisplay(prev => prev + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setShouldReset(true);
  };

  const handleEqual = () => {
    try {
      const fullEquation = equation + display;
      // Using Function constructor as a safer alternative to eval for simple math
      const result = new Function(`return ${fullEquation}`)();
      setDisplay(String(result));
      setEquation('');
      setShouldReset(true);
    } catch (e) {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setShouldReset(false);
  };

  const handleBackspace = () => {
    setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  };

  const handleSquare = () => {
    const val = Number(display);
    setDisplay(String(val * val));
    setShouldReset(true);
  };

  const handleSqrt = () => {
    const val = Number(display);
    setDisplay(String(Math.sqrt(val)));
    setShouldReset(true);
  };

  const handleInvert = () => {
    const val = Number(display);
    setDisplay(String(1 / val));
    setShouldReset(true);
  };

  const handleToggleSign = () => {
    setDisplay(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev);
  };

  const handlePercent = () => {
    const val = Number(display);
    setDisplay(String(val / 100));
    setShouldReset(true);
  };

  const handleAction = (btn: string) => {
    if (!isNaN(Number(btn))) {
      handleNumber(btn);
    } else {
      switch (btn) {
        case 'C':
        case 'CE':
          handleClear();
          break;
        case '⌫':
          handleBackspace();
          break;
        case '=':
          handleEqual();
          break;
        case '+':
        case '-':
        case '*':
        case '/':
          handleOperator(btn);
          break;
        case 'x²':
          handleSquare();
          break;
        case '√':
          handleSqrt();
          break;
        case '1/x':
          handleInvert();
          break;
        case '+/-':
          handleToggleSign();
          break;
        case '%':
          handlePercent();
          break;
        case '.':
          if (!display.includes('.')) setDisplay(prev => prev + '.');
          break;
      }
    }
  };

  return (
    <div className={`h-full p-4 flex flex-col transition-colors ${isDark ? 'bg-[#1a1c1e] text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`p-4 rounded-lg mb-4 text-right shadow-inner transition-colors ${isDark ? 'bg-black/20' : 'bg-white/50'}`}>
        <p className={`text-xs h-4 font-mono ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{equation}</p>
        <p className="text-4xl font-light overflow-hidden font-mono tracking-tighter">{display}</p>
      </div>
      <div className="grid grid-cols-4 gap-1 flex-1">
        {['%', 'CE', 'C', '⌫', '1/x', 'x²', '√', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '+/-', '0', '.', '='].map((btn) => (
          <button
            key={btn}
            onClick={() => handleAction(btn)}
            className={`
              flex items-center justify-center rounded text-sm font-medium transition-all active:scale-95
              ${!isNaN(Number(btn)) || btn === '.' 
                ? (isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-white hover:bg-gray-50 shadow-sm') 
                : (isDark ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-gray-200/50 hover:bg-gray-200')}
              ${btn === '=' ? (isDark ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700') : ''}
              ${['/', '*', '-', '+'].includes(btn) ? (isDark ? 'text-blue-400 font-bold' : 'text-blue-600 font-bold') : ''}
            `}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
