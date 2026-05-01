import { motion, AnimatePresence } from 'motion/react';
import { Search, LayoutGrid, Settings, Power, User, RefreshCw, LogOut } from 'lucide-react';
import { useWindows, AppId } from '../context/WindowContext';
import { useState, useEffect } from 'react';
import { APPS_METADATA, THEMES } from '../constants';
import DynamicIcon from './DynamicIcon';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StartMenu({ isOpen, onClose }: StartMenuProps) {
  const { openApp, isAppInstalled, restart, logout, language, systemTheme } = useWindows();
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const isDark = THEMES[systemTheme].mode === 'dark';

  const t = ({
    pt: {
      search: 'Pesquisar aplicativos, configurações e documentos',
      pinned: 'Fixado',
      allApps: 'Todos os aplicativos >',
      recommended: 'Recomendado',
      more: 'Mais >',
      getStarted: 'Introdução',
      recentlyAdded: 'Adicionado recentemente',
      settings: 'Configurações',
      user: 'Usuário',
      restart: 'Reiniciar',
      shutdown: 'Desligar',
      logout: 'Sair',
      shuttingDown: 'Desligando'
    },
    en: {
      search: 'Search for apps, settings, and documents',
      pinned: 'Pinned',
      allApps: 'All apps >',
      recommended: 'Recommended',
      more: 'More >',
      getStarted: 'Get Started',
      recentlyAdded: 'Recently added',
      settings: 'Settings',
      user: 'User',
      restart: 'Restart',
      shutdown: 'Shut down',
      logout: 'Log out',
      shuttingDown: 'Shutting down'
    },
    es: {
      search: 'Buscar aplicaciones, configuraciones y documentos',
      pinned: 'Anclado',
      allApps: 'Todas las aplicaciones >',
      recommended: 'Recomendado',
      more: 'Más >',
      getStarted: 'Primeros pasos',
      recentlyAdded: 'Agregado recientemente',
      settings: 'Configuración',
      user: 'Usuario',
      restart: 'Reiniciar',
      shutdown: 'Apagar',
      logout: 'Cerrar sesión',
      shuttingDown: 'Apagando'
    },
    it: {
      search: 'Cerca app, impostazioni e documenti',
      pinned: 'In primo piano',
      allApps: 'Tutte le app >',
      recommended: 'Consigliate',
      more: 'Altro >',
      getStarted: 'Per iniziare',
      recentlyAdded: 'Aggiunte di recente',
      settings: 'Impostazioni',
      user: 'Utente',
      restart: 'Riavvia',
      shutdown: 'Arresta',
      logout: 'Disconnetti',
      shuttingDown: 'Arresto in corso'
    },
    de: {
      search: 'Apps, Einstellungen und Dokumente suchen',
      pinned: 'Angeheftet',
      allApps: 'Alle Apps >',
      recommended: 'Empfohlen',
      more: 'Mehr >',
      getStarted: 'Erste Schritte',
      recentlyAdded: 'Zuletzt hinzugefügt',
      settings: 'Einstellungen',
      user: 'Benutzer',
      restart: 'Neu starten',
      shutdown: 'Herunterfahren',
      logout: 'Abmelden',
      shuttingDown: 'Herunterfahren'
    },
    ru: {
      search: 'Поиск приложений, параметров и документов',
      pinned: 'Закреплено',
      allApps: 'Все приложения >',
      recommended: 'Рекомендуем',
      more: 'Дополнительно >',
      getStarted: 'Начало работы',
      recentlyAdded: 'Недавно добавленные',
      settings: 'Параметры',
      user: 'Пользователь',
      restart: 'Перезагрузка',
      shutdown: 'Завершение работы',
      logout: 'Выйти',
      shuttingDown: 'Завершение работы'
    },
    ja: {
      search: 'アプリ、設定、ドキュメントの検索',
      pinned: 'ピン留め済み',
      allApps: 'すべてのアプリ >',
      recommended: 'おすすめ',
      more: 'その他 >',
      getStarted: 'はじめに',
      recentlyAdded: '最近追加されたもの',
      settings: '設定',
      user: 'ユーザー',
      restart: '再起動',
      shutdown: 'シャットダウン',
      logout: 'サインアウト',
      shuttingDown: 'シャットダウンしています'
    },
    ko: {
      search: '앱, 설정 및 문서 검색',
      pinned: '고정됨',
      allApps: '모든 앱 >',
      recommended: '맞춤형',
      more: '더 보기 >',
      getStarted: '시작하기',
      recentlyAdded: '최근에 추가됨',
      settings: '설정',
      user: '사용자',
      restart: '다시 시작',
      shutdown: '시스템 종료',
      logout: '로그아웃',
      shuttingDown: '종료 중'
    },
    zh: {
      search: '搜索应用、设置和文档',
      pinned: '已固定',
      allApps: '所有应用 >',
      recommended: '推荐',
      more: '更多 >',
      getStarted: '入门',
      recentlyAdded: '最近添加',
      settings: '设置',
      user: '用户',
      restart: '重启',
      shutdown: '关机',
      logout: '注销',
      shuttingDown: '正在关机'
    },
    ar: {
      search: 'البحث عن التطبيقات والإعدادات والمستندات',
      pinned: 'مثبت',
      allApps: 'كل التطبيقات >',
      recommended: 'موصى به',
      more: 'المزيد >',
      getStarted: 'البدء',
      recentlyAdded: 'تمت إضافتها مؤخراً',
      settings: 'الإعدادات',
      user: 'المستخدم',
      restart: 'إعادة التشغيل',
      shutdown: 'إيقاف التشغيل',
      logout: 'تسجيل الخروج',
      shuttingDown: 'جاري إيقاف التشغيل'
    },
    nl: {
      search: 'Zoeken naar apps, instellingen en documenten',
      pinned: 'Vastgemaakt',
      allApps: 'Alle apps >',
      recommended: 'Aanbevolen',
      more: 'Meer >',
      getStarted: 'Aan de slag',
      recentlyAdded: 'Onlangs toegevoegd',
      settings: 'Instellingen',
      user: 'Gebruiker',
      restart: 'Opnieuw opstarten',
      shutdown: 'Afsluiten',
      logout: 'Afmelden',
      shuttingDown: 'Bezig met afsluiten...'
    },
    pl: {
      search: 'Wyszukaj aplikacje, ustawienia i dokumenty',
      pinned: 'Przypięte',
      allApps: 'Wszystkie aplikacje >',
      recommended: 'Polecane',
      more: 'Więcej >',
      getStarted: 'Pierwsze kroki',
      recentlyAdded: 'Ostatnio dodane',
      settings: 'Ustawienia',
      user: 'Użytkownik',
      restart: 'Uruchom ponownie',
      shutdown: 'Zamknij',
      logout: 'Wyloguj',
      shuttingDown: 'Zamykanie'
    },
    tr: {
      search: 'Uygulamaları, ayarları ve belgeleri arayın',
      pinned: 'Sabitlendi',
      allApps: 'Tüm uygulamalar >',
      recommended: 'Önerilen',
      more: 'Diğer >',
      getStarted: 'Başlarken',
      recentlyAdded: 'Son eklenenler',
      settings: 'Ayarlar',
      user: 'Kullanıcı',
      restart: 'Yeniden başlat',
      shutdown: 'Bilgisayarı kapat',
      logout: 'Oturumu kapat',
      shuttingDown: 'Kapatılıyor'
    },
    hi: {
      search: 'ऐप्स, सेटिंग्स और दस्तावेज़ खोजें',
      pinned: 'पिन किए गए',
      allApps: 'सभी ऐप्स >',
      recommended: 'अनुशंसित',
      more: 'अधिक >',
      getStarted: 'शुरू करना',
      recentlyAdded: 'हाल ही में जोड़ा गया',
      settings: 'सेटिंग्स',
      user: 'उपयोगकर्ता',
      restart: 'पुनर्प्रारंभ करें',
      shutdown: 'बंद करें',
      logout: 'लॉग आउट',
      shuttingDown: 'बंद हो रहा है'
    },
    vi: {
      search: 'Tìm kiếm ứng dụng, cài đặt và tài liệu',
      pinned: 'Đã ghim',
      allApps: 'Tất cả ứng dụng >',
      recommended: 'Được đề xuất',
      more: 'Thêm >',
      getStarted: 'Bắt đầu',
      recentlyAdded: 'Đã thêm gần đây',
      settings: 'Cài đặt',
      user: 'Người dùng',
      restart: 'Khởi động lại',
      shutdown: 'Tắt máy',
      logout: 'Đăng xuất',
      shuttingDown: 'Đang tắt máy'
    },
    th: {
      search: 'ค้นหาแอป การตั้งค่า และเอกสาร',
      pinned: 'ปักหมุดไว้',
      allApps: 'แอปทั้งหมด >',
      recommended: 'แนะนำ',
      more: 'เพิ่มเติม >',
      getStarted: 'เริ่มต้นใช้งาน',
      recentlyAdded: 'เพิ่มล่าสุด',
      settings: 'การตั้งค่า',
      user: 'ผู้ใช้',
      restart: 'เริ่มระบบใหม่',
      shutdown: 'ปิดเครื่อง',
      logout: 'ออกจากระบบ',
      shuttingDown: 'กำลังปิดเครื่อง'
    },
    fr: {
      search: 'Rechercher des applications, des paramètres et des documents',
      pinned: 'Épinglé',
      allApps: 'Toutes les applications >',
      recommended: 'Nos recommandations',
      more: 'Plus >',
      getStarted: 'Prise en main',
      recentlyAdded: 'Ajouté récemment',
      settings: 'Paramètres',
      user: 'Utilisateur',
      restart: 'Redémarrer',
      shutdown: 'Arrêter',
      logout: 'Se déconnecter',
      shuttingDown: 'Arrêt en cours'
    }
  } as Record<string, any>)[language] || (language.startsWith('pt') ? {
    search: 'Pesquisar aplicativos, configurações e documentos',
    pinned: 'Fixado',
    allApps: 'Todos os aplicativos >',
    recommended: 'Recomendado',
    more: 'Mais >',
    getStarted: 'Introdução',
    recentlyAdded: 'Adicionado recentemente',
    settings: 'Configurações',
    user: 'Usuário',
    restart: 'Reiniciar',
    shutdown: 'Desligar',
    logout: 'Sair',
    shuttingDown: 'Desligando'
  } : language.startsWith('es') ? {
    search: 'Buscar aplicaciones, configuraciones y documentos',
    pinned: 'Anclado',
    allApps: 'Todas las aplicaciones >',
    recommended: 'Recomendado',
    more: 'Más >',
    getStarted: 'Primeros pasos',
    recentlyAdded: 'Agregado recientemente',
    settings: 'Configuración',
    user: 'Usuario',
    restart: 'Reiniciar',
    shutdown: 'Apagar',
    logout: 'Cerrar sesión',
    shuttingDown: 'Apagando'
  } : language.startsWith('fr') ? {
    search: 'Rechercher des applications, des paramètres et des documents',
    pinned: 'Épinglé',
    allApps: 'Toutes les applications >',
    recommended: 'Nos recommandations',
    more: 'Plus >',
    getStarted: 'Prise en main',
    recentlyAdded: 'Ajouté récemment',
    settings: 'Paramètres',
    user: 'Utilisateur',
    restart: 'Redémarrer',
    shutdown: 'Arrêter',
    logout: 'Se déconnecter',
    shuttingDown: 'Arrêt en cours'
  } : language.startsWith('zh') ? {
    search: '搜索应用、设置和文档',
    pinned: '已固定',
    allApps: '所有应用 >',
    recommended: '推荐',
    more: '更多 >',
    getStarted: '入门',
    recentlyAdded: '最近添加',
    settings: '设置',
    user: '用户',
    restart: '重启',
    shutdown: '关机',
    logout: '注销',
    shuttingDown: '正在关机'
  } : {
    search: 'Search for apps, settings, and documents',
    pinned: 'Pinned',
    allApps: 'All apps >',
    recommended: 'Recommended',
    more: 'More >',
    getStarted: 'Get Started',
    recentlyAdded: 'Recently added',
    settings: 'Settings',
    user: 'User',
    restart: 'Restart',
    shutdown: 'Shut down',
    logout: 'Log out',
    shuttingDown: 'Shutting down'
  });

  const pinnedApps = Object.values(APPS_METADATA).filter(app => isAppInstalled(app.id));

  const handleAppClick = (id: AppId) => {
    if (isAppInstalled(id)) {
      openApp(id);
      onClose();
    } else {
      openApp('store');
      onClose();
    }
  };

  const handleShutdown = () => {
    setIsShuttingDown(true);
    setIsPowerMenuOpen(false);
    onClose();
  };

  const handleRestart = () => {
    restart();
    setIsPowerMenuOpen(false);
    onClose();
  };

  const handleLogout = () => {
    logout();
    setIsPowerMenuOpen(false);
    onClose();
  };

  return (
    <>
      {isShuttingDown && (
        <div className="fixed inset-0 z-[10500]">
          <ShutdownScreen />
        </div>
      )}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => { onClose(); setIsPowerMenuOpen(false); }} />
            <motion.div
              initial={{ y: 300, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 300, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`fixed bottom-16 left-1/2 -translate-x-1/2 w-[640px] h-[720px] backdrop-blur-3xl border shadow-2xl rounded-xl z-50 overflow-hidden flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#1a1c1e]/90 border-white/5' : 'bg-white/80 border-white/40'}`}
            >
              {/* Search Bar */}
              <div className="p-8 pb-4">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
                  <input 
                    type="text" 
                    placeholder={t.search}
                    className={`w-full border-b-2 border-blue-500/0 focus:border-blue-500 outline-none py-2 pl-10 pr-4 rounded-full text-sm transition-all shadow-sm ${isDark ? 'bg-white/5 text-white placeholder-gray-500' : 'bg-white/50 text-gray-800'}`}
                  />
                </div>
              </div>

              {/* Pinned Section */}
              <div className="flex-1 px-8 overflow-y-auto relative">
                {systemTheme === 'linux' && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.08] select-none overflow-hidden">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Debian-OpenLogo.svg" 
                      className="w-[500px] h-[500px] grayscale brightness-200" 
                      alt="Debian BG"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{t.pinned}</h3>
                  <button className={`text-xs px-2 py-1 rounded shadow-sm transition-colors ${isDark ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-white/50 text-gray-700 hover:bg-white'}`}>{t.allApps}</button>
                </div>
                <div className="grid grid-cols-6 gap-y-6">
                  {pinnedApps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => handleAppClick(app.id)}
                      className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all group ${isDark ? 'hover:bg-white/5' : 'hover:bg-white/50'}`}
                    >
                      <div className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform relative">
                        <DynamicIcon 
                          src={app.icon} 
                          name={app.name} 
                          lucideName={app.lucideIcon} 
                          className="w-full h-full object-contain" 
                          size={20}
                        />
                      </div>
                      <span className={`text-[11px] ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{app.name}</span>
                    </button>
                  ))}
                </div>

                {/* Recommended Section */}
                <div className="mt-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{t.recommended}</h3>
                    <button className={`text-xs px-2 py-1 rounded shadow-sm transition-colors ${isDark ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-white/50 text-gray-700 hover:bg-white'}`}>{t.more}</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pb-8">
                    <div className={`flex items-center gap-3 p-2 rounded-lg transition-all cursor-pointer ${isDark ? 'hover:bg-white/5' : 'hover:bg-white/50'}`}>
                      <div className={`w-8 h-8 rounded flex items-center justify-center ${isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                        <LayoutGrid size={16} />
                      </div>
                      <div>
                        <p className={`text-xs font-medium ${isDark ? 'text-gray-200' : ''}`}>{t.getStarted}</p>
                        <p className="text-[10px] text-gray-500">{t.recentlyAdded}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-3 p-2 rounded-lg transition-all cursor-pointer ${isDark ? 'hover:bg-white/5' : 'hover:bg-white/50'}`}>
                      <div className={`w-8 h-8 rounded flex items-center justify-center ${isDark ? 'bg-orange-600/20 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>
                        <Settings size={16} />
                      </div>
                      <div>
                        <p className={`text-xs font-medium ${isDark ? 'text-gray-200' : ''}`}>{t.settings}</p>
                        <p className="text-[10px] text-gray-500">1h ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className={`h-16 px-12 flex items-center justify-between relative transition-colors ${isDark ? 'bg-black/20 border-t border-white/5' : 'bg-black/5 border-t border-white/20'}`}>
                <div className={`flex items-center gap-3 p-1 pr-3 rounded-full transition-all cursor-pointer ${isDark ? 'hover:bg-white/5' : 'hover:bg-white/50'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                    <User size={16} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
                  </div>
                  <span className={`text-xs font-medium ${isDark ? 'text-gray-200' : ''}`}>{t.user}</span>
                </div>
                
                <div className="relative">
                  <AnimatePresence>
                    {isPowerMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={`absolute bottom-full right-0 mb-2 w-36 backdrop-blur-3xl border shadow-xl rounded-lg overflow-hidden py-1 ${isDark ? 'bg-[#1a1c1e] border-white/10' : 'bg-white/90 border-white/40'}`}
                      >
                        <button 
                          onClick={handleLogout}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-xs transition-colors ${isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-700 hover:bg-black/5'}`}
                        >
                          <LogOut size={14} />
                          {t.logout}
                        </button>
                        <button 
                          onClick={handleRestart}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-xs transition-colors ${isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-700 hover:bg-black/5'}`}
                        >
                          <RefreshCw size={14} />
                          {t.restart}
                        </button>
                        <button 
                          onClick={handleShutdown}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-xs transition-colors ${isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-700 hover:bg-black/5'}`}
                        >
                          <Power size={14} />
                          {t.shutdown}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button 
                    onClick={() => setIsPowerMenuOpen(!isPowerMenuOpen)}
                    className={`p-2 rounded-lg transition-all ${isPowerMenuOpen ? (isDark ? 'bg-white/10 shadow-sm' : 'bg-white shadow-sm') : (isDark ? 'hover:bg-white/10' : 'hover:bg-white/50')}`}
                  >
                    <Power size={18} className={isDark ? 'text-gray-300' : 'text-gray-700'} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ShutdownScreen() {
  const { powerOff, language } = useWindows();

  const t = ({
    pt: 'Desligando',
    en: 'Shutting down',
    es: 'Apagando',
    fr: 'Arrêt en cours',
    it: 'Arresto in corso',
    de: 'Herunterfahren',
    ru: 'Завершение работы',
    ja: 'シャットダウンしています',
    ko: '종료 중',
    zh: '正在关机',
    ar: 'جاري إيقاف التشغيل',
    nl: 'Afsluiten',
    pl: 'Zamykanie',
    tr: 'Kapatılıyor',
    hi: 'बंद हो रहा है',
    vi: 'Đang tắt máy',
    th: 'กำลังปิดเครื่อง'
  } as Record<string, any>)[language] || (language.startsWith('pt') ? 'Desligando' : language.startsWith('es') ? 'Apagando' : language.startsWith('fr') ? 'Arrêt en cours' : language.startsWith('zh') ? '正在关机' : 'Shutting down');

  useEffect(() => {
    const timer = setTimeout(() => {
      powerOff();
    }, 3000);
    return () => clearTimeout(timer);
  }, [powerOff]);

  return (
    <div className="fixed inset-0 bg-blue-600 flex flex-col items-center justify-center select-none">
      <div className="flex flex-col items-center gap-8">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full" />
          <div 
            className="absolute inset-0 border-4 border-white rounded-full border-t-transparent animate-spin" 
            style={{ animationDuration: '1.5s' }}
          />
        </div>
        <h1 className="text-3xl font-light text-white tracking-wide">{t}</h1>
      </div>
    </div>
  );
}
