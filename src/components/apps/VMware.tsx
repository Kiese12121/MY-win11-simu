import React, { useState, useEffect, useCallback } from 'react';
import { useWindows } from '../../context/WindowContext';
import { DebianSim } from '../systems/DebianSim';
import { 
  Maximize2, 
  Minimize2, 
  X, 
  Search, 
  Apple, 
  Wifi, 
  Battery, 
  Volume2, 
  Folder,
  Triangle,
  Globe,
  Calculator as CalcIcon,
  FileText,
  ShoppingBag,
  Settings as SettingsIcon,
  Terminal as TermIcon,
  Trash2,
  MessageSquare,
  Play,
  Layout,
  Code,
  CreditCard,
  Camera,
  Minus,
  HardDrive
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type MacAppId = 'finder' | 'safari' | 'calculator' | 'notes' | 'appstore' | 'settings' | 'terminal' | 'trash' | 'whatsapp' | 'photoshop' | 'chatgpt' | 'copilot' | 'bank' | 'mario' | 'vscode' | 'archlinux' | 'debian';

interface MacWindowState {
  id: MacAppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

// --- Sub-components (Defined outside to prevent remounting) ---

const MenuBar = ({ activeApp, windows, time, setIsSpotlightOpen }: { activeApp: MacAppId | null, windows: MacWindowState[], time: Date, setIsSpotlightOpen: (o: boolean) => void }) => (
  <div className="h-6 bg-white/70 backdrop-blur-md flex items-center justify-between px-4 text-[11px] font-medium text-gray-800 z-[100] border-b border-black/10">
    <div className="flex items-center gap-4">
      <Apple size={14} className="text-black" />
      <span className="font-bold">{activeApp ? windows.find(w => w.id === activeApp)?.title : 'Finder'}</span>
      <span className="opacity-60 hover:opacity-100 cursor-default">File</span>
      <span className="opacity-60 hover:opacity-100 cursor-default">Edit</span>
      <span className="opacity-60 hover:opacity-100 cursor-default">View</span>
      <span className="opacity-60 hover:opacity-100 cursor-default">Go</span>
      <span className="opacity-60 hover:opacity-100 cursor-default">Window</span>
      <span className="opacity-60 hover:opacity-100 cursor-default">Help</span>
    </div>
    <div className="flex items-center gap-3">
      <Wifi size={14} />
      <Battery size={14} />
      <Volume2 size={14} />
      <Search size={14} onClick={() => setIsSpotlightOpen(true)} className="cursor-pointer" />
      <div className="flex items-center gap-1">
        <span>{time.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}</span>
        <span>{time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  </div>
);

const Dock = ({ windows, openApp }: { windows: MacWindowState[], openApp: (id: MacAppId) => void }) => {
  const dockApps: { id: MacAppId; icon: React.ReactNode; color: string }[] = [
    { id: 'finder', icon: <Folder size={24} />, color: 'bg-blue-500' },
    { id: 'safari', icon: <Globe size={24} />, color: 'bg-blue-400' },
    { id: 'whatsapp', icon: <MessageSquare size={24} />, color: 'bg-green-500' },
    { id: 'chatgpt', icon: <MessageSquare size={24} />, color: 'bg-emerald-600' },
    { id: 'copilot', icon: <Layout size={24} />, color: 'bg-indigo-500' },
    { id: 'photoshop', icon: <Camera size={24} />, color: 'bg-blue-900' },
    { id: 'bank', icon: <CreditCard size={24} />, color: 'bg-orange-500' },
    { id: 'vscode', icon: <Code size={24} />, color: 'bg-blue-600' },
    { id: 'appstore', icon: <ShoppingBag size={24} />, color: 'bg-blue-500' },
    { id: 'notes', icon: <FileText size={24} />, color: 'bg-yellow-500' },
    { id: 'calculator', icon: <CalcIcon size={24} />, color: 'bg-orange-400' },
    { id: 'terminal', icon: <TermIcon size={24} />, color: 'bg-gray-800' },
    { id: 'settings', icon: <SettingsIcon size={24} />, color: 'bg-gray-400' },
    { id: 'trash', icon: <Trash2 size={24} />, color: 'bg-gray-300' },
  ];

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-14 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl flex items-center px-2 gap-1 z-[100]">
      {dockApps.map(app => (
        <motion.div
          key={app.id}
          whileHover={{ scale: 1.2, y: -10 }}
          onClick={() => openApp(app.id)}
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white cursor-pointer shadow-lg ${app.color} relative group`}
        >
          {app.icon}
          {windows.find(w => w.id === app.id)?.isOpen && (
            <div className="absolute -bottom-1.5 w-1 h-1 bg-white rounded-full" />
          )}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
            {app.id.charAt(0).toUpperCase() + app.id.slice(1)}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const Spotlight = ({ isOpen, setIsOpen, windows, openApp }: { isOpen: boolean, setIsOpen: (o: boolean) => void, windows: MacWindowState[], openApp: (id: MacAppId) => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] bg-white/80 backdrop-blur-2xl border border-white/50 rounded-2xl shadow-2xl z-[200] overflow-hidden"
      >
        <div className="p-4 flex items-center gap-3 border-b border-black/5">
          <Search size={24} className="text-gray-400" />
          <input
            autoFocus
            type="text"
            placeholder="Spotlight Search"
            className="flex-1 bg-transparent border-none outline-none text-xl font-light text-gray-800"
            onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
          />
        </div>
        <div className="p-2 max-h-[400px] overflow-auto">
          <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase">Applications</div>
          {windows.map(app => (
            <div
              key={app.id}
              onClick={() => { openApp(app.id); setIsOpen(false); }}
              className="flex items-center gap-3 px-3 py-2 hover:bg-blue-500 hover:text-white rounded-lg cursor-pointer group"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-white/20">
                <Layout size={16} className="text-gray-600 group-hover:text-white" />
              </div>
              <span className="font-medium">{app.title}</span>
            </div>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const MacWindow = ({ window: w, children, focusApp, closeApp, setWindows }: { window: MacWindowState; children: React.ReactNode, focusApp: (id: MacAppId) => void, closeApp: (id: MacAppId) => void, setWindows: React.Dispatch<React.SetStateAction<MacWindowState[]>> }) => (
  <motion.div
    drag
    dragMomentum={false}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    onMouseDown={() => focusApp(w.id)}
    style={{ zIndex: w.zIndex }}
    className={`absolute top-20 left-20 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-black/10 ${w.isMaximized ? 'w-full h-full !top-0 !left-0' : 'w-[800px] h-[500px]'}`}
  >
    {/* Title Bar */}
    <div className="h-10 bg-gray-100/80 backdrop-blur-md flex items-center px-4 gap-2 border-b border-black/5 select-none cursor-grab active:cursor-grabbing">
      <div className="flex gap-2 mr-4">
        <div onClick={() => closeApp(w.id)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group cursor-pointer">
          <X size={8} className="text-red-900 opacity-0 group-hover:opacity-100" />
        </div>
        <div onClick={() => setWindows(prev => prev.map(win => win.id === w.id ? { ...win, isMinimized: true } : win))} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group cursor-pointer">
          <Minus size={8} className="text-yellow-900 opacity-0 group-hover:opacity-100" />
        </div>
        <div onClick={() => setWindows(prev => prev.map(win => win.id === w.id ? { ...win, isMaximized: !win.isMaximized } : win))} className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group cursor-pointer">
          <Maximize2 size={8} className="text-green-900 opacity-0 group-hover:opacity-100" />
        </div>
      </div>
      <span className="text-xs font-bold text-gray-600 flex-1 text-center pr-16">{w.title}</span>
    </div>
    {/* Content */}
    <div className="flex-1 overflow-auto bg-white">
      {children}
    </div>
  </motion.div>
);

const Finder = () => {
  const [path, setPath] = useState(['Macintosh HD']);
  const [finderFiles, setFinderFiles] = useState(() => {
    const saved = localStorage.getItem('mac_files');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Applications', type: 'folder', parent: 'Macintosh HD' },
      { id: '2', name: 'Documents', type: 'folder', parent: 'Macintosh HD' },
      { id: '3', name: 'Downloads', type: 'folder', parent: 'Macintosh HD' },
      { id: '4', name: 'Desktop', type: 'folder', parent: 'Macintosh HD' },
      { id: '5', name: 'readme.txt', type: 'file', parent: 'Macintosh HD' },
    ];
  });

  const [trashFiles, setTrashFiles] = useState(() => {
    const saved = localStorage.getItem('mac_trash');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('mac_files', JSON.stringify(finderFiles));
    localStorage.setItem('mac_trash', JSON.stringify(trashFiles));
  }, [finderFiles, trashFiles]);

  const currentFolder = path[path.length - 1];
  const displayFiles = finderFiles.filter((f: any) => f.parent === currentFolder);

  const deleteFile = (id: string) => {
    const file = finderFiles.find((f: any) => f.id === id);
    if (file) {
      setFinderFiles(finderFiles.filter((f: any) => f.id !== id));
      setTrashFiles([...trashFiles, { ...file, originalParent: file.parent }]);
    }
  };

  return (
    <div className="h-full flex">
      <div className="w-40 bg-gray-100/50 border-r border-black/5 p-4 flex flex-col gap-2">
        <div className="text-[10px] font-bold text-gray-400 uppercase">Favorites</div>
        {['AirDrop', 'Recents', 'Applications', 'Documents', 'Desktop', 'Downloads'].map(item => (
          <div key={item} className="flex items-center gap-2 text-xs text-gray-700 hover:bg-black/5 p-1 rounded cursor-pointer">
            <Folder size={14} className="text-blue-500" /> {item}
          </div>
        ))}
        <div className="mt-4 text-[10px] font-bold text-gray-400 uppercase">Locations</div>
        <div className="flex items-center gap-2 text-xs text-gray-700 hover:bg-black/5 p-1 rounded cursor-pointer"><HardDrive size={14} className="text-gray-400" /> Macintosh HD</div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="h-10 border-b border-black/5 flex items-center px-4 gap-4">
          <div className="flex gap-2">
            <button onClick={() => path.length > 1 && setPath(path.slice(0, -1))} className="p-1 hover:bg-black/5 rounded"><Minimize2 size={14} className="-rotate-90" /></button>
            <button className="p-1 hover:bg-black/5 rounded opacity-30"><Maximize2 size={14} className="-rotate-90" /></button>
          </div>
          <div className="text-xs font-bold text-gray-600">{path.join(' > ')}</div>
        </div>
        <div className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-4 md:grid-cols-6 gap-8">
            {displayFiles.map((f: any) => (
              <div 
                key={f.id} 
                className="flex flex-col items-center gap-1 group cursor-pointer relative"
                onDoubleClick={() => f.type === 'folder' && setPath([...path, f.name])}
              >
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  {f.type === 'folder' ? <Folder size={32} className="text-blue-500" /> : <FileText size={32} className="text-gray-400" />}
                </div>
                <span className="text-[11px] text-gray-700 text-center truncate w-full px-1">{f.name}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteFile(f.id); }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={10} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Trash = () => {
  const [trashFiles, setTrashFiles] = useState(() => {
    const saved = localStorage.getItem('mac_trash');
    return saved ? JSON.parse(saved) : [];
  });

  const emptyTrash = () => {
    setTrashFiles([]);
    localStorage.setItem('mac_trash', JSON.stringify([]));
  };

  const restoreFile = (id: string) => {
    const file = trashFiles.find((f: any) => f.id === id);
    if (file) {
      const savedFiles = JSON.parse(localStorage.getItem('mac_files') || '[]');
      localStorage.setItem('mac_files', JSON.stringify([...savedFiles, { id: file.id, name: file.name, type: file.type, parent: file.originalParent }]));
      const newTrash = trashFiles.filter((f: any) => f.id !== id);
      setTrashFiles(newTrash);
      localStorage.setItem('mac_trash', JSON.stringify(newTrash));
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="h-10 border-b border-black/5 flex items-center justify-between px-4 bg-gray-50">
        <span className="text-xs font-bold text-gray-500">{trashFiles.length} items</span>
        <button 
          onClick={emptyTrash}
          className="text-xs bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md font-medium"
        >
          Empty Trash
        </button>
      </div>
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-6 gap-8">
          {trashFiles.map((f: any) => (
            <div key={f.id} className="flex flex-col items-center gap-1 group cursor-pointer relative">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center opacity-60">
                {f.type === 'folder' ? <Folder size={32} className="text-gray-400" /> : <FileText size={32} className="text-gray-300" />}
              </div>
              <span className="text-[11px] text-gray-500 text-center">{f.name}</span>
              <button 
                onClick={() => restoreFile(f.id)}
                className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full px-2 py-0.5 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Restore
              </button>
            </div>
          ))}
          {trashFiles.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center h-64 text-gray-300">
              <Trash2 size={48} className="mb-2" />
              <span className="text-sm">Trash is empty</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Safari = () => {
  const [url, setUrl] = useState('https://www.google.com/search?igu=1');
  const [inputUrl, setInputUrl] = useState('https://www.google.com');

  return (
    <div className="h-full flex flex-col">
      <div className="h-10 bg-gray-100 border-b flex items-center px-4 gap-4">
        <div className="flex gap-2">
          <div className="w-6 h-6 rounded hover:bg-black/5 flex items-center justify-center cursor-pointer opacity-50"><Minimize2 size={14} /></div>
          <div className="w-6 h-6 rounded hover:bg-black/5 flex items-center justify-center cursor-pointer opacity-50"><Maximize2 size={14} /></div>
        </div>
        <div className="flex-1 bg-white border border-black/10 rounded-md px-3 py-1 text-xs flex items-center gap-2">
          <Globe size={12} className="text-gray-400" />
          <input 
            type="text" 
            value={inputUrl} 
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setUrl(inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`)}
            className="flex-1 bg-transparent outline-none"
          />
        </div>
      </div>
      <iframe src={url} className="flex-1 border-none" title="Safari" />
    </div>
  );
};

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const buttons = [
    'AC', '+/-', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
  ];

  return (
    <div className="h-full bg-[#333] flex flex-col p-4">
      <div className="h-20 text-white text-5xl font-light flex items-end justify-end px-2 mb-4 overflow-hidden">{display}</div>
      <div className="grid grid-cols-4 gap-2 flex-1">
        {buttons.map(btn => (
          <button
            key={btn}
            onClick={() => {
              if (btn === 'AC') setDisplay('0');
              else if (btn === '=') {
                 try { setDisplay(eval(display).toString()); } catch { setDisplay('Error'); }
              }
              else setDisplay(prev => prev === '0' ? btn : prev + btn);
            }}
            className={`rounded-full flex items-center justify-center text-xl font-medium transition-colors ${
              ['/', '*', '-', '+', '='].includes(btn) ? 'bg-orange-500 text-white hover:bg-orange-400' :
              ['AC', '+/-', '%'].includes(btn) ? 'bg-gray-400 text-black hover:bg-gray-300' :
              'bg-gray-700 text-white hover:bg-gray-600'
            } ${btn === '0' ? 'col-span-2 rounded-3xl' : ''}`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

const Notes = () => {
  const [notes, setNotes] = useState<string[]>(() => {
    const saved = localStorage.getItem('mac_notes');
    return saved ? JSON.parse(saved) : ['Welcome to macOS Notes'];
  });
  const [activeNote, setActiveNote] = useState(0);

  useEffect(() => {
    localStorage.setItem('mac_notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="h-full flex">
      <div className="w-48 bg-gray-100/50 border-r border-black/5 flex flex-col">
        <div className="p-4 flex justify-between items-center border-b border-black/5">
          <span className="font-bold text-xs">Notes</span>
          <button onClick={() => { setNotes([...notes, 'New Note']); setActiveNote(notes.length); }} className="text-yellow-600 hover:text-yellow-700"><FileText size={16} /></button>
        </div>
        <div className="flex-1 overflow-auto">
          {notes.map((note, i) => (
            <div
              key={i}
              onClick={() => setActiveNote(i)}
              className={`p-3 border-b border-black/5 cursor-pointer text-xs truncate ${activeNote === i ? 'bg-yellow-100' : 'hover:bg-black/5'}`}
            >
              {note || 'Empty Note'}
            </div>
          ))}
        </div>
      </div>
      <textarea
        className="flex-1 p-8 outline-none resize-none text-sm font-medium bg-white"
        value={notes[activeNote]}
        onChange={(e) => {
          const newNotes = [...notes];
          newNotes[activeNote] = e.target.value;
          setNotes(newNotes);
        }}
        placeholder="Start typing..."
      />
    </div>
  );
};

const BankApp = ({ credits }: { credits: number }) => (
  <div className="h-full bg-orange-50 p-8 flex flex-col items-center justify-center gap-6">
    <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-xl">
      <CreditCard size={40} />
    </div>
    <div className="text-center">
      <h2 className="text-2xl font-bold text-orange-900">macBank</h2>
      <p className="text-orange-700 opacity-60">Synchronized with Windows</p>
    </div>
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm border border-orange-100">
      <div className="text-gray-400 text-xs uppercase font-bold mb-1">Total Balance</div>
      <div className="text-4xl font-black text-gray-800">${credits.toLocaleString()}</div>
      <div className="mt-4 pt-4 border-t flex justify-between items-center">
        <span className="text-xs text-gray-500">Account: **** 4242</span>
        <span className="text-xs font-bold text-green-600">Active</span>
      </div>
    </div>
  </div>
);

const AppStore = ({ openApp }: { openApp: (id: MacAppId) => void }) => {
  const apps = [
    { id: 'debian', name: 'Debian 13 GNOME', category: 'OS', icon: <Layout size={24} />, color: 'bg-red-500' },
    { id: 'mario', name: 'Super Mario', category: 'Games', icon: <Play size={24} />, color: 'bg-red-500' },
    { id: 'vscode', name: 'VS Code', category: 'Developer', icon: <Code size={24} />, color: 'bg-blue-600' },
    { id: 'archlinux', name: 'Arch Linux', category: 'OS', icon: <Triangle size={24} />, color: 'bg-blue-400' },
    { id: 'photoshop', name: 'Photoshop', category: 'Design', icon: <Camera size={24} />, color: 'bg-blue-900' },
    { id: 'whatsapp', name: 'WhatsApp', category: 'Social', icon: <MessageSquare size={24} />, color: 'bg-green-500' },
  ];

  return (
    <div className="h-full bg-white p-8">
      <h1 className="text-3xl font-bold mb-8">Discover</h1>
      <div className="grid grid-cols-2 gap-6">
        {apps.map(app => (
          <div key={app.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg ${app.color}`}>
              {app.icon}
            </div>
            <div className="flex-1">
              <div className="font-bold">{app.name}</div>
              <div className="text-xs text-gray-400">{app.category}</div>
            </div>
            <button onClick={() => openApp(app.id as MacAppId)} className="bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold hover:bg-blue-600">GET</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Terminal = () => {
  const [history, setHistory] = useState<string[]>(['Welcome to macOS Terminal', 'Type "help" for commands']);
  const [input, setInput] = useState('');

  const handleCommand = (cmd: string) => {
    let output = '';
    switch (cmd.toLowerCase()) {
      case 'help': output = 'Available commands: help, ls, clear, whoami, date'; break;
      case 'ls': output = 'Applications  Documents  Downloads  Desktop'; break;
      case 'clear': setHistory([]); return;
      case 'whoami': output = 'apple_user'; break;
      case 'date': output = new Date().toString(); break;
      default: output = `command not found: ${cmd}`;
    }
    setHistory(prev => [...prev, `user@mac ~ % ${cmd}`, output]);
  };

  return (
    <div className="h-full bg-[#1e1e1e] text-green-400 font-mono p-4 overflow-auto">
      {history.map((line, i) => <div key={i} className="mb-1">{line}</div>)}
      <div className="flex gap-2">
        <span className="text-white">user@mac ~ %</span>
        <input
          autoFocus
          type="text"
          className="flex-1 bg-transparent outline-none border-none text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { handleCommand(input); setInput(''); } }}
        />
      </div>
    </div>
  );
};

const MarioGame = () => (
  <div className="h-full bg-[#5c94fc] flex flex-col items-center justify-center relative overflow-hidden">
    <div className="text-4xl font-bold text-white mb-8 drop-shadow-lg">SUPER MARIO BROS.</div>
    <div className="relative w-full h-32 bg-[#e0f8cf] border-t-4 border-[#88d070] mt-auto flex items-end px-12">
      <div className="w-12 h-12 bg-red-500 rounded-sm mb-4 animate-bounce" />
      <div className="w-16 h-24 bg-green-600 rounded-t-lg ml-20" />
      <div className="w-12 h-12 bg-yellow-400 rounded-sm ml-auto mb-10 flex items-center justify-center font-bold text-2xl">?</div>
    </div>
    <div className="absolute top-10 left-10 text-white font-bold">MARIO<br/>000000</div>
    <div className="absolute top-10 right-10 text-white font-bold">WORLD<br/>1-1</div>
    <div className="absolute inset-0 flex items-center justify-center">
      <button className="bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold border border-white/30 hover:bg-white/30 transition-all">PRESS START</button>
    </div>
  </div>
);

const VSCode = () => (
  <div className="h-full bg-[#1e1e1e] flex flex-col font-mono text-sm">
    <div className="h-8 bg-[#252526] flex items-center px-4 gap-4 text-gray-400 text-[11px]">
      <div className="flex gap-2">
        <span className="text-white border-b border-blue-500 px-2">index.js</span>
        <span className="px-2">styles.css</span>
        <span className="px-2">App.tsx</span>
      </div>
    </div>
    <div className="flex-1 flex">
      <div className="w-12 bg-[#333333] flex flex-col items-center py-4 gap-4 text-gray-500">
        <Folder size={20} />
        <Search size={20} />
        <Code size={20} />
        <Play size={20} />
      </div>
      <div className="flex-1 p-4 text-gray-300">
        <div className="flex gap-4"><span className="text-gray-600">1</span> <span className="text-blue-400">import</span> React <span className="text-blue-400">from</span> <span className="text-orange-300">'react'</span>;</div>
        <div className="flex gap-4"><span className="text-gray-600">2</span> </div>
        <div className="flex gap-4"><span className="text-gray-600">3</span> <span className="text-blue-400">export default function</span> <span className="text-yellow-300">App</span>() {'{'}</div>
        <div className="flex gap-4"><span className="text-gray-600">4</span>   <span className="text-blue-400">return</span> (</div>
        <div className="flex gap-4"><span className="text-gray-600">5</span>     <span className="text-gray-400">&lt;</span><span className="text-blue-400">div</span><span className="text-gray-400">&gt;</span>Hello Mac!<span className="text-gray-400">&lt;/</span><span className="text-blue-400">div</span><span className="text-gray-400">&gt;</span></div>
        <div className="flex gap-4"><span className="text-gray-600">6</span>   );</div>
        <div className="flex gap-4"><span className="text-gray-600">7</span> {'}'}</div>
      </div>
    </div>
    <div className="h-6 bg-[#007acc] text-white flex items-center px-4 justify-between text-[10px]">
      <div className="flex gap-4"><span>main*</span> <span>0 0 0</span></div>
      <div className="flex gap-4"><span>UTF-8</span> <span>TypeScript JSX</span></div>
    </div>
  </div>
);

const SystemSettings = ({ language, setWallpaper }: { language: string; setWallpaper: (wp: string) => void }) => {
  const wallpapers = [
    'https://images.unsplash.com/photo-1611931981458-a62a627f9042?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop'
  ];

  return (
    <div className="h-full flex">
      <div className="w-48 bg-gray-100/50 border-r border-black/5 p-4 flex flex-col gap-1">
        {['Appearance', 'Desktop & Dock', 'Wallpaper', 'Screen Saver', 'Battery', 'Language'].map(item => (
          <div key={item} className="px-3 py-1.5 rounded-lg hover:bg-black/5 cursor-pointer text-xs font-medium text-gray-700">{item}</div>
        ))}
      </div>
      <div className="flex-1 p-8 overflow-auto">
        <h2 className="text-xl font-bold mb-6">Wallpaper</h2>
        <div className="grid grid-cols-2 gap-4">
          {wallpapers.map(wp => (
            <div 
              key={wp} 
              onClick={() => setWallpaper(wp)}
              className="aspect-video rounded-lg bg-cover bg-center cursor-pointer border-2 transition-all border-transparent hover:scale-105"
              style={{ backgroundImage: `url("${wp}")` }}
            />
          ))}
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Language</h2>
          <div className="bg-gray-50 p-4 rounded-xl border border-black/5 flex justify-between items-center">
            <span className="text-sm font-medium">System Language</span>
            <span className="text-sm text-gray-500">{language.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main VMware Component ---
export default function VMware() {
  const { credits, language } = useWindows();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [activeApp, setActiveApp] = useState<MacAppId | null>(null);
  const [wallpaper, setWallpaper] = useState('https://images.unsplash.com/photo-1611931981458-a62a627f9042?q=80&w=2000&auto=format&fit=crop');
  
  const [windows, setWindows] = useState<MacWindowState[]>([
    { id: 'finder', title: 'Finder', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'safari', title: 'Safari', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'calculator', title: 'Calculator', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'notes', title: 'Notes', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'appstore', title: 'App Store', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'settings', title: 'System Settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'terminal', title: 'Terminal', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'trash', title: 'Trash', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'whatsapp', title: 'WhatsApp', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'photoshop', title: 'Photoshop', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'chatgpt', title: 'ChatGPT', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'copilot', title: 'Copilot', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'bank', title: 'Bank', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'mario', title: 'Super Mario', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'vscode', title: 'VS Code', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'archlinux', title: 'Arch Linux (DistroSea)', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'debian', title: 'Debian 13 (DistroSea)', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
  ]);

  const [maxZIndex, setMaxZIndex] = useState(10);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
        e.preventDefault();
        setIsSpotlightOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const focusApp = useCallback((id: MacAppId) => {
    const newZ = maxZIndex + 1;
    setMaxZIndex(newZ);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZ } : w));
    setActiveApp(id);
  }, [maxZIndex]);

  const openApp = useCallback((id: MacAppId) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        const newZ = maxZIndex + 1;
        setMaxZIndex(newZ);
        return { ...w, isOpen: true, isMinimized: false, zIndex: newZ };
      }
      return w;
    }));
    setActiveApp(id);
  }, [maxZIndex]);

  const closeApp = useCallback((id: MacAppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
    if (activeApp === id) setActiveApp(null);
  }, [activeApp]);

  return (
    <div 
      className={`relative w-full h-full overflow-hidden bg-cover bg-center transition-all duration-500 ${isFullscreen ? 'fixed inset-0 z-[9999]' : ''}`}
      style={{ backgroundImage: `url("${wallpaper}")` }}
    >
      <MenuBar activeApp={activeApp} windows={windows} time={time} setIsSpotlightOpen={setIsSpotlightOpen} />
      
      <Spotlight isOpen={isSpotlightOpen} setIsOpen={setIsSpotlightOpen} windows={windows} openApp={openApp} />

      {/* Desktop Icons */}
      <div className="p-4 grid grid-flow-col grid-rows-6 gap-4 w-fit">
        <div className="flex flex-col items-center gap-1 cursor-pointer group" onDoubleClick={() => openApp('finder')}>
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all">
            <HardDrive size={24} className="text-white" />
          </div>
          <span className="text-[10px] font-bold text-white drop-shadow-md">Macintosh HD</span>
        </div>
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.filter(w => w.isOpen && !w.isMinimized).map(w => (
          <MacWindow key={w.id} window={w} focusApp={focusApp} closeApp={closeApp} setWindows={setWindows}>
            {w.id === 'finder' && <Finder />}
            {w.id === 'safari' && <Safari />}
            {w.id === 'calculator' && <Calculator />}
            {w.id === 'notes' && <Notes />}
            {w.id === 'appstore' && <AppStore openApp={openApp} />}
            {w.id === 'terminal' && <Terminal />}
            {w.id === 'trash' && <Trash />}
            {w.id === 'bank' && <BankApp credits={credits} />}
            {w.id === 'mario' && <MarioGame />}
            {w.id === 'vscode' && <VSCode />}
            {w.id === 'archlinux' && (
              <div className="h-full flex flex-col bg-black relative group">
                <div className="h-8 bg-zinc-900 flex items-center px-4 justify-between text-[10px] text-gray-500 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Globe size={12} className="text-blue-400" />
                    <span className="text-blue-400 font-bold animate-pulse tracking-widest">LOCAL_VM_BYPASS://archlinux.wasm</span>
                  </div>
                </div>
                <iframe 
                  src="https://copy.sh/v86/?profile=archlinux" 
                  className="flex-1 border-none bg-black" 
                  title="Arch Linux"
                  referrerPolicy="no-referrer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-downloads allow-storage-access-by-user-activation"
                  loading="eager"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/40 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                  <div className="bg-black/80 p-6 rounded-2xl border border-white/10 backdrop-blur-md max-w-sm text-center">
                    <Triangle size={32} className="text-blue-400 mx-auto mb-4" />
                    <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">Frame Warning</p>
                    <p className="mb-6 text-xs text-gray-300 leading-relaxed font-sans">
                      This system is powered by DistroSea. If the screen is blank, please click below to open in a new tab.
                    </p>
                    <a 
                      href="https://distrosea.com/select/archlinux/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-[10px] font-bold transition-all pointer-events-auto"
                    >
                      Open Outer Window
                    </a>
                  </div>
                </div>
              </div>
            )}
            {w.id === 'debian' && (
               <DebianSim />
            )}
            {w.id === 'settings' && <SystemSettings language={language} setWallpaper={setWallpaper} />}
            {['whatsapp', 'chatgpt', 'copilot', 'photoshop'].includes(w.id) && (
              <div className="h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                <Layout size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-medium">This app is coming soon to macOS</p>
              </div>
            )}
          </MacWindow>
        ))}
      </AnimatePresence>

      <Dock windows={windows} openApp={openApp} />

      {/* Fullscreen Toggle */}
      <button 
        onClick={() => setIsFullscreen(!isFullscreen)}
        className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 hover:bg-white/30 transition-all z-[101]"
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </button>
    </div>
  );
}
