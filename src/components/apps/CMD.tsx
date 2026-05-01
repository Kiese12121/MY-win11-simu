import { useState, useEffect, useRef } from 'react';
import { useWindows } from '../../context/WindowContext';

export default function CMD() {
  const { language, credits, isCMDSecretMode } = useWindows();
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = {
    pt: {
      welcome: 'Microsoft Windows [Versão 10.0.22621.1702]\n(c) Microsoft Corporation. Todos os direitos reservados.\n',
      help: 'Comandos disponíveis: help, cls, credits, date, echo, exit, ver, color, matrix',
      unknown: 'é um comando não reconhecido.',
      secret: 'Bem-vindo ao código secreto do Win11 Simu!',
    },
    en: {
      welcome: 'Microsoft Windows [Version 10.0.22621.1702]\n(c) Microsoft Corporation. All rights reserved.\n',
      help: 'Available commands: help, cls, credits, date, echo, exit, ver, color, matrix',
      unknown: 'is not recognized as an internal or external command.',
      secret: 'Welcome to Win11 simu secret code!',
    },
    es: {
      welcome: 'Microsoft Windows [Versión 10.0.22621.1702]\n(c) Microsoft Corporation. Todos los derechos reservados.\n',
      help: 'Comandos disponibles: help, cls, credits, date, echo, exit, ver, color, matrix',
      unknown: 'no se reconoce como un comando interno o externo.',
      secret: '¡Bienvenido al código secreto de Win11 Simu!',
    }
  }[language];

  useEffect(() => {
    if (isCMDSecretMode) {
      setHistory([t.secret]);
    } else {
      setHistory([t.welcome]);
    }
  }, [t.welcome, t.secret, isCMDSecretMode]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const args = cmd.trim().split(' ');
    const command = args[0].toLowerCase();
    let output = '';

    switch (command) {
      case 'help':
        output = t.help;
        break;
      case 'cls':
        setHistory([]);
        return;
      case 'credits':
        output = `Current credits: ${credits}`;
        break;
      case 'date':
        output = new Date().toLocaleString();
        break;
      case 'echo':
        output = args.slice(1).join(' ');
        break;
      case 'ver':
        output = 'Win11 Simu [Version 1.0.0]';
        break;
      case 'color':
        output = 'Color changed (simulated)';
        break;
      case 'matrix':
        output = 'Entering the matrix... (simulated)';
        break;
      case 'exit':
        // In a real app we might close the window here
        output = 'Type "exit" to close the window (not implemented in this view)';
        break;
      case '':
        break;
      default:
        output = `'${command}' ${t.unknown}`;
    }

    setHistory(prev => [...prev, `C:\\Users\\User> ${cmd}`, output].filter(Boolean));
  };

  return (
    <div className="h-full bg-black text-gray-200 font-mono text-sm p-4 overflow-y-auto" ref={scrollRef}>
      <div className="whitespace-pre-wrap">
        {history.map((line, i) => (
          <div key={i} className="mb-1">{line}</div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-200">C:\Users\User&gt;</span>
        <input
          type="text"
          autoFocus
          className="flex-1 bg-transparent outline-none border-none text-gray-200"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCommand(input);
              setInput('');
            }
          }}
        />
      </div>
    </div>
  );
}
