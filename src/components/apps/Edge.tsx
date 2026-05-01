import { useState } from 'react';
import { RefreshCw, ChevronLeft, ChevronRight, Home, Search, Shield, Star, MoreVertical, AlertTriangle } from 'lucide-react';
import { useWindows } from '../../context/WindowContext';
import { THEMES } from '../../constants';

export default function Edge() {
  const { language, isProtectionEnabled, addVirus, systemTheme } = useWindows();
  const [url, setUrl] = useState('https://www.google.com');
  const isDark = THEMES[systemTheme].mode === 'dark';

  const t = {
    pt: {
      malwareSite: 'Site de Malware',
      warning: 'AVISO: Este site contém malware!',
      clickToInfect: 'Clique aqui para baixar um vírus (30% de chance se a proteção estiver desativada)',
      searchPlaceholder: 'Pesquise no Google ou digite uma URL'
    },
    en: {
      malwareSite: 'Malware Site',
      warning: 'WARNING: This site contains malware!',
      clickToInfect: 'Click here to download a virus (30% chance if protection is off)',
      searchPlaceholder: 'Search Google or type a URL'
    },
    es: {
      malwareSite: 'Sitio de Malware',
      warning: '¡ADVERTENCIA: Este sitio contiene malware!',
      clickToInfect: 'Haga clic aquí para descargar un virus (30% de probabilidad si la protección está desactivada)',
      searchPlaceholder: 'Busca en Google o escribe una URL'
    }
  }[language];

  const handleMalwareClick = (specificVirus?: 'memz' | 'noescape' | 'bonzi') => {
    if (!isProtectionEnabled) {
      if (specificVirus) {
        addVirus(specificVirus);
        if (specificVirus === 'memz') {
          alert(language === 'pt' ? 'MEMZ Trojan baixado. Reinicie o sistema para ver o efeito!' : language === 'es' ? 'MEMZ Trojan descargado. ¡Reinicie el sistema para ver el efecto!' : 'MEMZ Trojan downloaded. Restart the system to see the effect!');
        } else {
          alert(language === 'pt' ? `VÍRUS DETECTADO: ${specificVirus.toUpperCase()}!` : language === 'es' ? `VIRUS DETECTADO: ${specificVirus.toUpperCase()}!` : `VIRUS DETECTED: ${specificVirus.toUpperCase()}!`);
        }
      } else {
        // Trigger ALL viruses at once as requested
        addVirus('memz');
        addVirus('noescape');
        addVirus('bonzi');
        alert(language === 'pt' ? 'VOCÊ BAIXOU TODOS OS VÍRUS! BOA SORTE!' : language === 'es' ? '¡HAS DESCARGADO TODOS LOS VIRUS! ¡BUENA SUERTE!' : 'YOU DOWNLOADED ALL VIRUSES! GOOD LUCK!');
      }
    } else {
      alert(language === 'pt' ? 'A proteção em tempo real bloqueou o download malicioso.' : language === 'es' ? 'La protección en tiempo real bloqueó la descarga maliciosa.' : 'Real-time protection blocked the malicious download.');
    }
  };

  return (
    <div className={`h-full flex flex-col transition-colors ${isDark ? 'bg-[#1a1c1e] text-gray-200' : 'bg-white text-gray-900'}`}>
      {/* Browser Header */}
      <div className={`border-b pt-2 transition-colors ${isDark ? 'bg-black/20 border-white/5' : 'bg-gray-100/80'}`}>
        <div className="flex items-center px-4 gap-1">
          <div className={`px-4 py-2 rounded-t-lg text-xs flex items-center gap-2 border-x border-t w-48 shadow-sm transition-colors ${isDark ? 'bg-[#1a1c1e] border-white/10 text-gray-300' : 'bg-white border-white/50'}`}>
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-3 h-3" />
            <span className="truncate">Google</span>
            <button className="ml-auto text-gray-400 hover:text-gray-200">×</button>
          </div>
          <button className={`p-2 rounded-full transition-colors ${isDark ? 'text-gray-500 hover:bg-white/10' : 'text-gray-500 hover:bg-gray-200'}`}>+</button>
        </div>
        
        <div className={`flex items-center px-4 py-2 gap-4 border-b transition-colors ${isDark ? 'bg-[#1a1c1e] border-white/5' : 'bg-white'}`}>
          <div className="flex items-center gap-2 text-gray-600">
            <ChevronLeft size={18} className={`cursor-pointer rounded transition-colors ${isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100'}`} />
            <ChevronRight size={18} className={`cursor-pointer rounded transition-colors ${isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100'}`} />
            <RefreshCw size={16} className={`cursor-pointer rounded mx-1 transition-colors ${isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100'}`} />
            <Home size={18} className={`cursor-pointer rounded transition-colors ${isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100'}`} />
          </div>
          
          <div className={`flex-1 flex items-center rounded-full px-4 py-1 gap-2 border transition-all ${isDark ? 'bg-white/5 border-white/10 focus-within:ring-blue-400/30' : 'bg-gray-100 border-gray-200 focus-within:ring-blue-500/30 shadow-none'}`}>
            <Shield size={14} className="text-green-600" />
            <input 
              type="text" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)}
              className={`flex-1 bg-transparent border-none outline-none text-xs ${isDark ? 'text-white' : 'text-gray-800'}`} 
            />
            <Star size={14} className="text-gray-400 cursor-pointer" />
          </div>

          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>U</div>
            <MoreVertical size={18} className={`cursor-pointer rounded transition-colors ${isDark ? 'text-gray-400 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'}`} />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className={`flex-1 flex flex-col items-center justify-center p-8 transition-colors ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        {url.includes('malware') ? (
          <div className="max-w-2xl w-full bg-red-50 border-2 border-red-500 rounded-xl p-8 flex flex-col items-center text-center gap-6 shadow-2xl">
            <AlertTriangle size={64} className="text-red-600 animate-pulse" />
            <h1 className="text-3xl font-bold text-red-700">{t.warning}</h1>
            <p className="text-red-600 font-medium">{t.clickToInfect}</p>
            <button 
              onClick={() => handleMalwareClick()}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              DOWNLOAD FREE RAM / FREE V-BUCKS
            </button>
            <div className="flex gap-6 mt-4">
              <button 
                onClick={() => handleMalwareClick('memz')}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform">M</div>
                <span className="text-[10px] font-bold text-purple-700 uppercase">MEMZ</span>
              </button>
              <button 
                onClick={() => handleMalwareClick('noescape')}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform">NE</div>
                <span className="text-[10px] font-bold text-black uppercase">NoEscape</span>
              </button>
              <button 
                onClick={() => handleMalwareClick('bonzi')}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform">BB</div>
                <span className="text-[10px] font-bold text-blue-700 uppercase">Bonzi</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <img 
              src={isDark ? "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png" : "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"} 
              alt="Google" 
              className="w-64 mb-8" 
              referrerPolicy="no-referrer"
            />
            <div className="w-[580px] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                className={`w-full rounded-full py-3 px-12 shadow-sm transition-shadow outline-none ${isDark ? 'bg-white/5 border border-white/10 text-white hover:shadow-white/5 focus:shadow-white/5' : 'bg-white border border-gray-200 hover:shadow-md focus:shadow-md'}`}
                placeholder={t.searchPlaceholder}
              />
            </div>
            <div className="flex gap-4 mt-8">
              <button className={`px-4 py-2 rounded text-sm transition-colors border ${isDark ? 'bg-white/5 border-transparent hover:bg-white/10 text-gray-300' : 'bg-gray-50 border-transparent hover:border-gray-200 text-gray-700'}`}>Google Search</button>
              <button className={`px-4 py-2 rounded text-sm transition-colors border ${isDark ? 'bg-white/5 border-transparent hover:bg-white/10 text-gray-300' : 'bg-gray-50 border-transparent hover:border-gray-200 text-gray-700'}`}>I'm Feeling Lucky</button>
            </div>
            <div className="mt-12 flex gap-8">
              <div 
                onClick={() => setUrl('https://malware-site.com')}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 group-hover:bg-red-200 transition-colors">
                  <AlertTriangle size={24} />
                </div>
                <span className="text-xs font-medium text-gray-600">{t.malwareSite}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
