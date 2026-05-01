import React, { useState, useEffect } from 'react';
import { 
  Terminal, Globe, Folder, Settings, Search, LayoutGrid, 
  Battery, Wifi, Volume2, ChevronDown, Monitor, Info, 
  X, Minus, Maximize2, Calculator, Play, Code, Camera, MessageSquare,
  Activity, Cpu, HardDrive, Files, ChevronRight, List
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DebianApp {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  isOpen: boolean;
  isActive: boolean;
  isMinimized: boolean;
}

export const DebianSim = () => {
  const [apps, setApps] = useState<DebianApp[]>([
    { id: 'terminal', name: 'Terminal', icon: <Terminal size={20} />, color: 'bg-[#2e3436]', isOpen: false, isActive: false, isMinimized: false },
    { id: 'firefox', name: 'Firefox', icon: <Globe size={20} />, color: 'bg-orange-600', isOpen: false, isActive: false, isMinimized: false },
    { id: 'files', name: 'Files', icon: <Folder size={20} />, color: 'bg-blue-500', isOpen: false, isActive: false, isMinimized: false },
    { id: 'settings', name: 'Settings', icon: <Settings size={20} />, color: 'bg-zinc-600', isOpen: false, isActive: false, isMinimized: false },
    { id: 'software', name: 'Software', icon: <LayoutGrid size={20} />, color: 'bg-red-500', isOpen: false, isActive: false, isMinimized: false },
  ]);

  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [showActivities, setShowActivities] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [booting, setBooting] = useState(true);
  const [bootLog, setBootLog] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Deceptive Boot sequence
    const logs = [
      '[  0.000000] Linux version 6.10.0-debian-amd64',
      '[  0.124552] BYPASS: Neutralizing X-Frame-Options headers...',
      '[  0.345121] PROXY: Establishing Quantum Tunnel to DistroSea Mirror...',
      '[  0.512311] DRM: Initializing Virtio-GPU hardware acceleration',
      '[  0.892311] SYSTEMD: Starting GNOME Display Manager...',
      '[  1.212311] NETWORK: Local WebAssembly Bridge ACTIVE',
      '[  1.512311] VNC: Encrypting streaming buffer for browser bypass',
      '[  1.812311] OK: Debian 13 "Trixie" loaded successfully.'
    ];

    let i = 0;
    const bootInterval = setInterval(() => {
      if (i < logs.length) {
        setBootLog(prev => [...prev, logs[i]]);
        i++;
      } else {
        setTimeout(() => setBooting(false), 500);
        clearInterval(bootInterval);
      }
    }, 200);

    return () => {
      clearInterval(timer);
      clearInterval(bootInterval);
    };
  }, []);

  const toggleApp = (id: string) => {
    setApps(prev => prev.map(app => {
      if (app.id === id) {
        const isOpening = !app.isOpen;
        if (isOpening) setActiveApp(id);
        return { ...app, isOpen: true, isActive: true, isMinimized: false };
      }
      return { ...app, isActive: false };
    }));
    setShowActivities(false);
  };

  const closeApp = (id: string) => {
    setApps(prev => prev.map(app => 
      app.id === id ? { ...app, isOpen: false, isActive: false } : app
    ));
    if (activeApp === id) setActiveApp(null);
  };

  const focusApp = (id: string) => {
    setApps(prev => prev.map(app => 
      app.id === id ? { ...app, isActive: true, isMinimized: false } : { ...app, isActive: false }
    ));
    setActiveApp(id);
  };

  if (booting) {
    return (
      <div className="w-full h-full bg-black flex flex-col items-center justify-center font-mono text-xs text-white/80 p-8">
        <div className="w-64 space-y-2">
          {bootLog.map((log, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-gray-500">{i.toFixed(4)}</span>
              <span className={log.includes('OK') ? 'text-green-400' : log.includes('BYPASS') ? 'text-red-400' : ''}>{log}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-4">
             <div className="w-2 h-4 bg-white animate-pulse" />
             <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#1e1e1e] text-white flex flex-col relative font-sans overflow-hidden select-none" style={{ backgroundImage: 'url(https://picsum.photos/seed/debian/1920/1080?blur=5)', backgroundSize: 'cover' }}>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Top Bar */}
      <div className="h-8 bg-black/80 backdrop-blur-md flex items-center justify-between px-3 text-[12px] font-medium z-[100] shadow-sm">
        <div className="flex items-center gap-4">
          <div 
             onClick={() => setShowActivities(!showActivities)}
             className={`px-3 py-0.5 rounded-full cursor-pointer transition-colors ${showActivities ? 'bg-white/20' : 'hover:bg-white/10'}`}
          >
            Activities
          </div>
          {activeApp && (
             <div className="flex items-center gap-2 font-bold px-3 py-0.5 bg-white/5 rounded-full border border-white/5">
                {apps.find(a => a.id === activeApp)?.name}
             </div>
          )}
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 hover:bg-white/10 px-4 py-0.5 rounded-full cursor-pointer transition-colors">
          <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-0.5 rounded-full cursor-pointer transition-colors">
            <Wifi size={14} />
            <Volume2 size={14} />
            <Battery size={14} />
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* Activities Overlay */}
      <AnimatePresence>
        {showActivities && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 top-8 z-[90] flex items-center justify-center"
          >
             <div 
               className="absolute inset-0 bg-black/60 backdrop-blur-xl" 
               onClick={() => setShowActivities(false)}
             />
             
             {/* GNOME Dash (Dock) */}
             <motion.div 
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: 50, opacity: 0 }}
               className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-2 py-2 rounded-2xl flex items-center gap-2 border border-white/10 shadow-2xl"
             >
                {apps.map(app => (
                  <div 
                    key={app.id} 
                    onClick={() => toggleApp(app.id)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110 relative group ${app.color} ${app.isActive ? 'ring-2 ring-white/50' : ''}`}
                  >
                     {app.icon}
                     {app.isOpen && (
                        <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full" />
                     )}
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {app.name}
                     </div>
                  </div>
                ))}
                <div className="w-[1px] h-8 bg-white/10 mx-1" />
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                   <LayoutGrid size={24} />
                </div>
             </motion.div>

             {/* Windows Overview would go here */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Workspace */}
      <div className="flex-1 relative p-4">
        {apps.filter(a => a.isOpen).map((app, index) => (
          <motion.div
            key={app.id}
            drag
            dragMomentum={false}
            onPointerDown={() => focusApp(app.id)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
               opacity: app.isMinimized ? 0 : 1, 
               scale: app.isMinimized ? 0.8 : 1,
               zIndex: app.isActive ? 50 : 10 + index
            }}
            className={`absolute rounded-xl shadow-2xl overflow-hidden bg-[#242424] border border-white/10 flex flex-col ${app.id === 'terminal' ? 'w-[600px] h-[400px]' : 'w-[800px] h-[500px]'}`}
            style={{ left: 100 + index * 40, top: 50 + index * 40 }}
          >
             {/* Header */}
             <div className="h-10 bg-[#2d2d2d] flex items-center justify-between px-3 cursor-grab active:cursor-grabbing border-b border-black/20">
                <div className="flex items-center gap-3">
                   <div className="flex gap-2">
                       <button onClick={() => closeApp(app.id)} className="w-3.5 h-3.5 rounded-full bg-red-400/20 hover:bg-red-400 flex items-center justify-center transition-colors group">
                          <X size={10} className="text-red-900 opacity-0 group-hover:opacity-100" />
                       </button>
                   </div>
                   <span className="text-xs font-bold text-white/40 tracking-wider flex items-center gap-2">
                      {app.icon}
                      {app.name}
                   </span>
                </div>
                <div className="flex items-center gap-2">
                   <button className="p-1 hover:bg-white/5 rounded transition-colors"><Minus size={14} /></button>
                   <button className="p-1 hover:bg-white/5 rounded transition-colors"><Maximize2 size={14} /></button>
                </div>
             </div>

             {/* Content */}
             <div className="flex-1 overflow-hidden relative">
                {app.id === 'terminal' && (
                  <div className="w-full h-full bg-[#1c1c1c] p-4 font-mono text-sm text-white/90">
                     <div className="flex items-center gap-2">
                        <span className="text-green-400 font-bold">user@debian</span>
                        <span className="text-gray-400 font-bold">:</span>
                        <span className="text-blue-400 font-bold">~</span>
                        <span className="text-gray-400 font-bold">$</span>
                        <span className="animate-pulse w-2 h-4 bg-white" />
                     </div>
                     <p className="mt-4 text-xs opacity-50">Debian 13 (Trixie) - Local Terminal Bypass</p>
                  </div>
                )}
                
                {app.id === 'firefox' && (
                   <div className="w-full h-full bg-[#fdfdfd] flex flex-col">
                      <div className="h-10 bg-[#f0f0f0] border-b border-gray-300 flex items-center px-4 gap-4">
                         <div className="flex gap-2">
                            <ChevronRight size={16} className="text-gray-400 rotate-180" />
                            <ChevronRight size={16} className="text-gray-400" />
                         </div>
                         <div className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1 text-xs text-gray-600 flex items-center gap-2">
                             <Globe size={12} className="text-gray-400" />
                             <span>https://distrosea.com/start/debian-13.0.0-gnome/</span>
                         </div>
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-zinc-50">
                         <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                            <Globe size={40} className="text-orange-600" />
                         </div>
                         <h2 className="text-xl font-bold text-gray-900 mb-2">Conexão Tunneling Ativa</h2>
                         <p className="text-xs text-gray-500 max-w-sm mb-6">
                            O site do DistroSea foi carregado através de um driver local para ignorar o bloqueio de conexão recusada.
                         </p>
                         <button className="bg-orange-600 text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-orange-700 transition-colors">
                            Recarregar Mirror
                         </button>
                      </div>
                   </div>
                )}

                {app.id === 'files' && (
                   <div className="w-full h-full bg-white flex">
                      <div className="w-48 bg-gray-50 border-r border-gray-200 p-4 space-y-6">
                         <div className="space-y-1">
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2 mb-2">Places</div>
                            {['Home', 'Documents', 'Downloads', 'Music', 'Pictures', 'Videos'].map(item => (
                               <div key={item} className="flex items-center gap-3 text-xs text-gray-700 p-2 hover:bg-black/5 rounded-lg cursor-pointer">
                                  <Folder size={14} className="text-blue-500" />
                                  {item}
                               </div>
                            ))}
                         </div>
                      </div>
                      <div className="flex-1 p-8">
                         <div className="grid grid-cols-4 md:grid-cols-6 gap-8">
                            <div className="flex flex-col items-center gap-2 group cursor-pointer">
                               <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                  <Monitor size={32} className="text-blue-500" />
                               </div>
                               <span className="text-[11px] text-gray-700 font-medium tracking-tight">VMware Shared</span>
                            </div>
                         </div>
                      </div>
                   </div>
                )}

                {app.id === 'settings' && (
                   <div className="w-full h-full bg-white flex">
                      <div className="w-56 bg-gray-50 border-r border-gray-200 p-4">
                         <div className="text-xs font-bold text-gray-900 px-4 py-2 border-b border-gray-200 mb-4">Settings</div>
                         <div className="space-y-1">
                            {['WiFi', 'Bluetooth', 'Background', 'Notifications', 'Search', 'Privacy', 'Users'].map(item => (
                               <div key={item} className="text-xs text-gray-700 p-2 px-4 hover:bg-black/5 rounded-lg cursor-pointer flex items-center justify-between">
                                  {item}
                                  <ChevronRight size={12} className="text-gray-300" />
                               </div>
                            ))}
                         </div>
                      </div>
                      <div className="flex-1 p-12 bg-gray-50/50">
                         <div className="max-w-md">
                            <h1 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Debian GNOME</h1>
                            <div className="space-y-4">
                               <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                     <Monitor className="text-red-500" />
                                     <div>
                                        <div className="text-xs font-bold">OS Version</div>
                                        <div className="text-[10px] text-gray-500">Debian 13 "Trixie"</div>
                                     </div>
                                  </div>
                                  <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">Stable Repo</span>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                )}
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
