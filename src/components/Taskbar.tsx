import { useState, useEffect, useRef } from 'react';
import { Wifi, Volume2, Battery, ChevronUp, LayoutGrid, Mouse } from 'lucide-react';
import { useWindows, AppId } from '../context/WindowContext';
import { APPS_METADATA, THEMES } from '../constants';
import StartMenu from './StartMenu';
import DynamicIcon from './DynamicIcon';

export default function Taskbar() {
  const [time, setTime] = useState(new Date());
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isOverflowOpen, setIsOverflowOpen] = useState(false);
  const [taskbarLimit, setTaskbarLimit] = useState(8);
  const [scrollValue, setScrollValue] = useState(50);
  const dockRef = useRef<HTMLDivElement>(null);
  const { windows, openApp, focusApp, isAppInstalled, systemTheme, language } = useWindows();

  useEffect(() => {
    const updateLimit = () => {
      // Roughly calculate how many icons fit
      // 40px per icon, leaving room for start/search/sys tray (approx 300px total)
      const availableWidth = window.innerWidth - 350;
      const limit = Math.floor(availableWidth / 44);
      setTaskbarLimit(Math.max(1, limit));
    };

    updateLimit();
    window.addEventListener('resize', updateLimit);
    return () => window.removeEventListener('resize', updateLimit);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pinnedApps = Object.values(APPS_METADATA).filter(app => app.isPinned && isAppInstalled(app.id));

  const activeApps = windows.filter(w => w.isOpen);

  const isDark = THEMES[systemTheme].mode === 'dark';

  const isLinux = systemTheme === 'linux';

  const t = ({
    pt: { activities: 'Atividades', showApplications: 'Mostrar Aplicativos', moreApps: 'Mais aplicativos' },
    en: { activities: 'Activities', showApplications: 'Show Applications', moreApps: 'More apps' },
    es: { activities: 'Actividades', showApplications: 'Mostrar aplicaciones', moreApps: 'Más aplicaciones' },
    fr: { activities: 'Activités', showApplications: 'Afficher les applications', moreApps: 'Plus d\'applications' },
    it: { activities: 'Attività', showApplications: 'Mostra applicazioni', moreApps: 'Altre app' },
    de: { activities: 'Aktivitäten', showApplications: 'Anwendungen anzeigen', moreApps: 'Weitere Apps' },
    ru: { activities: 'Обзор', showApplications: 'Показать приложения', moreApps: 'Больше приложений' },
    ja: { activities: 'アクティビティ', showApplications: 'アプリケーションを表示する', moreApps: 'その他のアプリ' },
    ko: { activities: '활동', showApplications: '응용 프로그램 표시', moreApps: '추가 앱' },
    zh: { activities: '活动', showApplications: '显示所有应用', moreApps: '更多应用' },
    ar: { activities: 'الأنشطة', showApplications: 'عرض التطبيقات', moreApps: 'تطبيقات إضافية' },
    nl: { activities: 'Activiteiten', showApplications: 'Toon applicaties', moreApps: 'Meer apps' },
    pl: { activities: 'Podgląd', showApplications: 'Pokaż aplikacje', moreApps: 'Więcej aplikacji' },
    tr: { activities: 'Etkinlikler', showApplications: 'Uygulamaları Göster', moreApps: 'Daha fazla uygulama' },
    hi: { activities: 'गतिविधियां', showApplications: 'एप्लिकेशंस दिखाएं', moreApps: 'अधिक ऐप्स' },
    vi: { activities: 'Hoạt động', showApplications: 'Hiển thị ứng dụng', moreApps: 'Thêm ứng dụng' },
    th: { activities: 'กิจกรรม', showApplications: 'แสดงแอปพลิเคชัน', moreApps: 'แอปเพิ่มเติม' }
  } as Record<string, any>)[language] || (language.startsWith('pt') ? { activities: 'Atividades', showApplications: 'Mostrar Aplicativos', moreApps: 'Mais aplicativos' } : language.startsWith('es') ? { activities: 'Actividades', showApplications: 'Mostrar aplicaciones', moreApps: 'Más aplicaciones' } : language.startsWith('fr') ? { activities: 'Activités', showApplications: 'Afficher les applications', moreApps: 'Plus d\'applications' } : language.startsWith('zh') ? { activities: '活动', showApplications: '显示所有应用', moreApps: '更多应用' } : { activities: 'Activities', showApplications: 'Show Applications', moreApps: 'More apps' });

  const allApps = [
    ...pinnedApps.map(a => ({ ...a, isPinned: true })),
    ...activeApps.filter(a => !pinnedApps.find(p => p.id === a.id)).map(a => ({ ...APPS_METADATA[a.id], isPinned: false }))
  ];

  const visibleApps = allApps.slice(0, taskbarLimit);
  const overflowApps = allApps.slice(taskbarLimit);

  const handleWheel = (e: React.WheelEvent) => {
    if (isLinux) {
      setScrollValue(prev => Math.max(0, Math.min(100, prev - (e.deltaY / 10))));
    }
  };

  const CustomScrollIcon = () => (
    <div className="relative flex items-center justify-center p-1 group">
      <div className={`w-3.5 h-6 border-[1.5px] rounded-full relative ${isDark ? 'border-white/40 bg-white/5' : 'border-black/40 bg-black/5'}`}>
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-current opacity-20" />
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-2 bg-red-600 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(220,38,38,0.8)] z-10"
          style={{ top: `${15 + (scrollValue / 100) * 50}%` }}
        />
      </div>
      <div className="absolute -top-10 right-0 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 bg-black/90 text-[10px] text-white px-2 py-1 rounded-md shadow-xl whitespace-nowrap pointer-events-none border border-white/10">
        System Scroll: <span className="text-red-400 font-bold">{Math.round(scrollValue)}%</span>
      </div>
    </div>
  );

  return (
    <>
      <StartMenu isOpen={isStartOpen} onClose={() => setIsStartOpen(false)} />
      
      {/* Overflow Menu */}
      {!isLinux && isOverflowOpen && overflowApps.length > 0 && (
        <div className={`fixed bottom-14 left-1/2 -translate-x-1/2 p-2 rounded-xl backdrop-blur-3xl shadow-2xl border flex gap-1 z-[110] animate-in fade-in slide-in-from-bottom-2 duration-200 ${isDark ? 'bg-zinc-900/90 border-white/10' : 'bg-zinc-200/80 border-gray-400/50'}`}>
          {overflowApps.map(app => {
            const win = windows.find(w => w.id === app.id);
            const isActive = win?.isOpen;
            return (
              <button
                key={app.id}
                onClick={() => { isActive ? focusApp(app.id) : openApp(app.id); setIsOverflowOpen(false); }}
                className={`p-2 rounded transition-all hover:bg-white/20 relative group ${isActive ? (isDark ? 'bg-white/10' : 'bg-white/30') : ''}`}
                title={app.name}
              >
                <div className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <DynamicIcon src={app.icon} name={app.name} lucideName={app.lucideIcon} size={20} />
                </div>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-blue-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      )}
      
      <div className={`h-12 w-full backdrop-blur-3xl transition-colors duration-300 flex items-center justify-between px-3 z-[100] fixed ${isLinux ? 'top-0 border-b' : 'bottom-0 border-t'} ${isDark ? 'bg-[#1a1c1e]/80 border-white/5' : 'bg-white/70 border-white/30'}`}>
        <div className="flex-1 flex items-center gap-2">
          {isLinux ? (
            <div className="flex items-center gap-1">
              <div 
                className="p-1 px-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-2 group"
                onClick={() => setIsStartOpen(!isStartOpen)}
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Debian-OpenLogo.svg" 
                  className="w-5 h-5 group-hover:rotate-12 transition-transform drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]" 
                  alt="Debian"
                  referrerPolicy="no-referrer"
                />
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {t.activities}
                </span>
              </div>
            </div>
          ) : (
            <button className={`p-2 rounded transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-white/50'}`}>
              <ChevronUp size={16} className={isDark ? 'text-gray-300' : 'text-gray-700'} />
            </button>
          )}
        </div>

        {/* Centered Icons (Windows) or Clock (GNOME) */}
        <div className="flex items-center gap-1">
          {!isLinux && (
            <>
              <button 
                onClick={() => setIsStartOpen(!isStartOpen)}
                className={`p-2 rounded transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-white/50'} ${isStartOpen ? (isDark ? 'bg-white/10 shadow-inner' : 'bg-white/50 shadow-inner') : ''}`}
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/8/87/Windows_logo_-_2021.svg" 
                  alt="Start" 
                  className="w-6 h-6"
                  referrerPolicy="no-referrer"
                />
              </button>
              
              <button className="p-2 hover:bg-white/50 rounded transition-all">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Search_Icon.svg" 
                  alt="Search" 
                  className="w-5 h-5" 
                  referrerPolicy="no-referrer"
                />
              </button>

              <div className="w-[1px] h-6 bg-gray-300/50 mx-1" />

              {/* Visible Apps */}
              {visibleApps.map(app => {
                const win = windows.find(w => w.id === app.id);
                const isActive = win?.isOpen;
                return (
                  <button
                    key={app.id}
                    onClick={() => isActive ? focusApp(app.id) : openApp(app.id)}
                    className={`p-2 rounded transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-white/50'} relative group ${isActive ? (isDark ? 'bg-white/10' : 'bg-white/30') : ''}`}
                  >
                    <div className="w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform relative">
                      <DynamicIcon 
                        src={app.icon} 
                        name={app.name} 
                        lucideName={app.lucideIcon} 
                        className="w-full h-full object-contain" 
                        size={16}
                      />
                    </div>
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-blue-500 rounded-full" />
                    )}
                  </button>
                );
              })}

              {/* Overflow Toggle Button */}
              {overflowApps.length > 0 && (
                <button
                  onClick={() => setIsOverflowOpen(!isOverflowOpen)}
                  className={`p-2 rounded transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-white/50'} ${isOverflowOpen ? 'bg-white/20' : ''}`}
                  title={t.moreApps}
                >
                  <ChevronUp size={20} className={`transform transition-transform ${isOverflowOpen ? '' : 'rotate-180'} ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
                </button>
              )}
            </>
          )}

          {isLinux && (
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              <div className={`px-4 py-1 rounded hover:bg-white/10 transition-colors cursor-pointer text-xs font-bold flex gap-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <div className="h-4 w-[1px] bg-white/20" />
                <div className="overflow-hidden w-32 relative">
                  <div className="animate-marquee whitespace-nowrap">
                    {activeApps.length > 0 ? activeApps.map(app => APPS_METADATA[app.id].name).join(' • ') : 'Debian GNOME'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side Info */}
        <div className="flex-1 flex items-center justify-end gap-2" onWheel={handleWheel}>
          {isLinux && <CustomScrollIcon />}
          
          <div className={`flex items-center gap-3 px-3 py-1 rounded-full transition-all cursor-pointer ${isDark ? 'hover:bg-white/10' : 'hover:bg-white/50'}`}>
            <Wifi size={14} className={isDark ? 'text-gray-300' : 'text-gray-700'} />
            <Volume2 size={14} className={isDark ? 'text-gray-300' : 'text-gray-700'} />
            <Battery size={14} className={isDark ? 'text-gray-300' : 'text-gray-700'} />
            {isLinux && (
              <ChevronUp size={14} className={`rotate-180 transition-transform ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            )}
          </div>
          
          {!isLinux && (
            <div className={`flex flex-col items-end px-2 py-0.5 rounded transition-all cursor-pointer text-[11px] ${isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-800 hover:bg-white/50'}`}>
              <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span>{time.toLocaleDateString()}</span>
            </div>
          )}
          
          {isLinux && (
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm ring-1 ring-white/10">
              U
            </div>
          )}
        </div>
      </div>

      {/* GNOME Side Dock (Activities) */}
      {isLinux && isStartOpen && (
        <div 
          ref={dockRef}
          className="fixed left-4 top-1/2 -translate-y-1/2 max-h-[80vh] overflow-y-auto flex flex-col gap-2 p-2 backdrop-blur-3xl bg-[#1a1c1e]/60 border border-white/10 rounded-2xl z-[150] shadow-2xl animate-in slide-in-from-left duration-300 custom-scrollbar"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgb(220 38 38) transparent'
          }}
          onMouseLeave={() => setIsStartOpen(false)}
        >
           {pinnedApps.map(app => {
             const win = windows.find(w => w.id === app.id);
             const isActive = win?.isOpen;
             return (
              <button
                key={app.id}
                onClick={() => { openApp(app.id); setIsStartOpen(false); }}
                className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all hover:scale-110 active:scale-95 group relative ${isActive ? 'bg-white/10 font-bold' : 'hover:bg-white/5'}`}
                title={app.name}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <DynamicIcon src={app.icon} name={app.name} lucideName={app.lucideIcon} size={28} />
                </div>
                {isActive && (
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-3 bg-red-600 rounded-full" />
                )}
                {/* Tooltip */}
                <div className="absolute left-full ml-4 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-[160]">
                  {app.name}
                </div>
              </button>
             );
           })}
          <div className="w-8 h-[1px] bg-white/10 mx-auto my-1" />
          <button 
            onClick={() => { openApp('debian'); setIsStartOpen(false); }}
            className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/10 transition-all text-white group relative"
          >
             <img 
               src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Debian-OpenLogo.svg" 
               className="w-6 h-6 group-hover:scale-110 transition-transform" 
               alt="Debian"
               referrerPolicy="no-referrer"
             />
             <div className="absolute left-full ml-4 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-[160]">
               {t.showApplications}
             </div>
          </button>
        </div>
      )}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
}
