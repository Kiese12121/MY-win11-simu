import React, { useState } from 'react';
import { ShoppingBag, Search, Download, Star, Check, LayoutGrid, CreditCard, X, AlertCircle } from 'lucide-react';
import { useWindows, AppId } from '../../context/WindowContext';
import { APPS_METADATA, THEMES } from '../../constants';
import DynamicIcon from '../DynamicIcon';

export default function MicrosoftStore() {
  const { 
    openApp, isAppInstalled, installApp, gamePassPlan, subscribeGamePass, 
    credits, buyMinecraft, isMinecraftOwned, addCredits,
    buyWin7Simu, isWin7SimuOwned, systemTheme, language
  } = useWindows();
  const isDark = THEMES[systemTheme].mode === 'dark';
  const [error, setError] = useState('');

  const t = ({
    pt: {
      search: 'Pesquisar aplicativos, jogos...',
      plans: 'Planos Xbox Game Pass',
      featured: 'Jogos e Aplicativos em Destaque',
      moreGames: 'Mais Jogos',
      topFree: 'Melhores aplicativos gratuitos',
      free: 'Grátis',
      get: 'Obter',
      open: 'Abrir',
      play: 'Jogar agora',
      subscribe: 'Assinar',
      current: 'Plano Atual',
      credits: 'Créditos',
      noCredits: 'você está sem créditos suficientes',
      owned: 'Adquirido',
      access: 'Acesso a jogos exclusivos'
    },
    en: {
      search: 'Search apps, games...',
      plans: 'Xbox Game Pass Plans',
      featured: 'Featured Games & Apps',
      moreGames: 'More Games',
      topFree: 'Top free apps',
      free: 'Free',
      get: 'Get',
      open: 'Open',
      play: 'Play Now',
      subscribe: 'Subscribe',
      current: 'Current Plan',
      credits: 'Credits',
      noCredits: 'u are without enogh creddits',
      owned: 'Owned',
      access: 'Access to exclusive games'
    },
    es: {
      search: 'Buscar aplicaciones, juegos...',
      plans: 'Planes de Xbox Game Pass',
      featured: 'Juegos y aplicaciones destacados',
      moreGames: 'Más juegos',
      topFree: 'Principales aplicaciones gratuitas',
      free: 'Gratis',
      get: 'Obtener',
      open: 'Abrir',
      play: 'Jugar ahora',
      subscribe: 'Suscribirse',
      current: 'Plan actual',
      credits: 'Créditos',
      noCredits: 'no tienes suficientes créditos',
      owned: 'Comprado',
      access: 'Acceso a juegos exclusivos'
    },
    fr: {
      search: 'Rechercher des applications, des jeux...',
      plans: 'Forfaits Xbox Game Pass',
      featured: 'Jeux et applications à la une',
      moreGames: 'Plus de jeux',
      topFree: 'Meilleures applications gratuites',
      free: 'Gratuit',
      get: 'Obtenir',
      open: 'Ouvrir',
      play: 'Jouer maintenant',
      subscribe: 'S\'abonner',
      current: 'Forfait actuel',
      credits: 'Crédits',
      noCredits: 'vous n\'avez pas assez de crédits',
      owned: 'Possédé',
      access: 'Accès à des jeux exclusifs'
    },
    it: {
      search: 'Cerca app, giochi...',
      plans: 'Piani Xbox Game Pass',
      featured: 'Giochi e app in evidenza',
      moreGames: 'Altri giochi',
      topFree: 'Le migliori app gratuite',
      free: 'Gratis',
      get: 'Ottieni',
      open: 'Apri',
      play: 'Gioca ora',
      subscribe: 'Abbonati',
      current: 'Piano attuale',
      credits: 'Crediti',
      noCredits: 'non hai abbastanza crediti',
      owned: 'Acquistato',
      access: 'Accesso a giochi esclusivi'
    },
    de: {
      search: 'Apps, Spiele suchen...',
      plans: 'Xbox Game Pass-Pläne',
      featured: 'Herausragende Spiele und Apps',
      moreGames: 'Weitere Spiele',
      topFree: 'Top kostenlose Apps',
      free: 'Kostenlos',
      get: 'Abrufen',
      open: 'Öffnen',
      play: 'Jetzt spielen',
      subscribe: 'Abonnieren',
      current: 'Aktueller Plan',
      credits: 'Credits',
      noCredits: 'du hast nicht genug Credits',
      owned: 'Bereits im Besitz',
      access: 'Zugriff auf exklusive Spiele'
    },
    ru: {
      search: 'Поиск приложений, игр...',
      plans: 'Планы Xbox Game Pass',
      featured: 'Рекомендуемые игры и приложения',
      moreGames: 'Другие игры',
      topFree: 'Лучшие бесплатные приложения',
      free: 'Бесплатно',
      get: 'Получить',
      open: 'Открыть',
      play: 'Играть',
      subscribe: 'Подписаться',
      current: 'Текущий план',
      credits: 'Кредиты',
      noCredits: 'недостаточно кредитов',
      owned: 'Куплено',
      access: 'Доступ к эксклюзивным играм'
    },
    ja: {
      search: 'アプリ、ゲームの検索...',
      plans: 'Xbox Game Pass プラン',
      featured: '注目のゲームとアプリ',
      moreGames: 'その他のゲーム',
      topFree: '人気の無料アプリ',
      free: '無料',
      get: '入手',
      open: '開く',
      play: '今すぐプレイ',
      subscribe: 'サブスクライブ',
      current: '現在のプラン',
      credits: 'クレジット',
      noCredits: 'クレジットが不足しています',
      owned: '所有済み',
      access: '限定ゲームへのアクセス'
    },
    ko: {
      search: '앱, 게임 검색...',
      plans: 'Xbox Game Pass 플랜',
      featured: '추천 게임 및 앱',
      moreGames: '추가 게임',
      topFree: '인기 무료 앱',
      free: '무료',
      get: '받기',
      open: '열기',
      play: '지금 플레이',
      subscribe: '구독하기',
      current: '현재 플랜',
      credits: '크레딧',
      noCredits: '크레딧이 부족합니다',
      owned: '보유함',
      access: '독점 게임 액세스'
    },
    zh: {
      search: '搜索应用、游戏...',
      plans: 'Xbox Game Pass 方案',
      featured: '精选游戏和应用',
      moreGames: '更多游戏',
      topFree: '热门免费应用',
      free: '免费',
      get: '获取',
      open: '打开',
      play: '立即玩',
      subscribe: '订阅',
      current: '当前方案',
      credits: '积分',
      noCredits: '积分不足',
      owned: '已拥有',
      access: '访问专属游戏'
    },
    ar: {
      search: 'بحث عن التطبيقات والألعاب...',
      plans: 'خطط Xbox Game Pass',
      featured: 'ألعاب وتطبيقات مميزة',
      moreGames: 'المزيد من الألعاب',
      topFree: 'أفضل التطبيقات المجانية',
      free: 'مجاني',
      get: 'الحصول عليه',
      open: 'فتح',
      play: 'العب الآن',
      subscribe: 'اشتراك',
      current: 'الخطة الحالية',
      credits: 'الاعتمادات',
      noCredits: 'ليس لديك اعتمادات كافية',
      owned: 'تمتلكها',
      access: 'الوصول إلى الألعاب الحصرية'
    },
    nl: {
      search: 'Apps, games zoeken...',
      plans: 'Xbox Game Pass-abonnementen',
      featured: 'Uitgelichte games en apps',
      moreGames: 'Meer games',
      topFree: 'Populaire gratis apps',
      free: 'Gratis',
      get: 'Downloaden',
      open: 'Openen',
      play: 'Nu spelen',
      subscribe: 'Abonneren',
      current: 'Huidig abonnement',
      credits: 'Credits',
      noCredits: 'je hebt niet genoeg credits',
      owned: 'In bezit',
      access: 'Toegang tot exclusieve games'
    },
    pl: {
      search: 'Szukaj aplikacji, gier...',
      plans: 'Plany Xbox Game Pass',
      featured: 'Polecane gry i aplikacje',
      moreGames: 'Więcej gier',
      topFree: 'Najlepsze darmowe aplikacje',
      free: 'Bezpłatne',
      get: 'Pobierz',
      open: 'Otwórz',
      play: 'Graj teraz',
      subscribe: 'Subskrybuj',
      current: 'Bieżący plan',
      credits: 'Kredyty',
      noCredits: 'masz za mało kredytów',
      owned: 'Posiadane',
      access: 'Dostęp do ekskluzywnych gier'
    },
    tr: {
      search: 'Uygulamaları, oyunları arayın...',
      plans: 'Xbox Game Pass Planları',
      featured: 'Öne Çıkan Oyunlar ve Uygulamalar',
      moreGames: 'Daha Fazla Oyun',
      topFree: 'En çok tercih edilen ücretsiz uygulamalar',
      free: 'Ücretsiz',
      get: 'Al',
      open: 'Aç',
      play: 'Şimdi Oyna',
      subscribe: 'Abone Ol',
      current: 'Mevcut Plan',
      credits: 'Krediler',
      noCredits: 'yeterli krediniz yok',
      owned: 'Sahip olundu',
      access: 'Özel oyunlara erişim'
    },
    hi: {
      search: 'ऐप्स, गेम खोजें...',
      plans: 'Xbox Game Pass योजनाएं',
      featured: 'चुनिंदा गेम और ऐप्स',
      moreGames: 'अधिक गेम',
      topFree: 'शीर्ष निःशुल्क ऐप्स',
      free: 'निःशुल्क',
      get: 'प्राप्त करें',
      open: 'खोलें',
      play: 'अभी खेलें',
      subscribe: 'सब्सक्राइब करें',
      current: 'वर्तमान योजना',
      credits: 'क्रेडिट',
      noCredits: 'आपके पास पर्याप्त क्रेडिट नहीं है',
      owned: 'स्वामित्व में',
      access: 'विशेष खेलों तक पहुंच'
    },
    vi: {
      search: 'Tìm kiếm ứng dụng, trò chơi...',
      plans: 'Các gói Xbox Game Pass',
      featured: 'Trò chơi & Ứng dụng nổi bật',
      moreGames: 'Nhiều trò chơi hơn',
      topFree: 'Ứng dụng miễn phí hàng đầu',
      free: 'Miễn phí',
      get: 'Nhận',
      open: 'Mở',
      play: 'Chơi ngay',
      subscribe: 'Đăng ký',
      current: 'Gói hiện tại',
      credits: 'Tín dụng',
      noCredits: 'bạn không đủ tín dụng',
      owned: 'Đã sở hữu',
      access: 'Truy cập vào các trò chơi độc quyền'
    },
    th: {
      search: 'ค้นหาแอป เกม...',
      plans: 'แผน Xbox Game Pass',
      featured: 'เกมและแอปที่แนะนำ',
      moreGames: 'เกมเพิ่มเติม',
      topFree: 'แอปฟรีชั้นนำ',
      free: 'ฟรี',
      get: 'รับ',
      open: 'เปิด',
      play: 'เล่นเลย',
      subscribe: 'สมัครสมาชิก',
      current: 'แผนปัจจุบัน',
      credits: 'เครดิต',
      noCredits: 'คุณมีเครดิตไม่เพียงพอ',
      owned: 'เป็นเจ้าของแล้ว',
      access: 'เข้าถึงเกมสุดพิเศษ'
    }
  } as Record<string, any>)[language] || (language.startsWith('pt') ? { search: 'Pesquisar...', plans: 'Planos Xbox Game Pass', featured: 'Jogos em Destaque', moreGames: 'Mais Jogos', topFree: 'Melhores Apps', free: 'Grátis', get: 'Obter', open: 'Abrir', play: 'Jogar', subscribe: 'Assinar', current: 'Plano Atual', credits: 'Créditos', noCredits: 'sem créditos', owned: 'Adquirido', access: 'Jogos exclusivos' } : language.startsWith('es') ? { search: 'Buscar...', plans: 'Planes Xbox Game Pass', featured: 'Juegos destacados', moreGames: 'Más juegos', topFree: 'Top apps gratis', free: 'Gratis', get: 'Obtener', open: 'Abrir', play: 'Jugar', subscribe: 'Suscribirse', current: 'Plan actual', credits: 'Créditos', noCredits: 'pocos créditos', owned: 'Comprado', access: 'Juegos exclusivos' } : language.startsWith('fr') ? { search: 'Rechercher...', plans: 'Forfaits Xbox Game Pass', featured: 'Jeux à la une', moreGames: 'Plus de jeux', topFree: 'Top apps gratuites', free: 'Gratuit', get: 'Obtenir', open: 'Ouvrir', play: 'Jouer', subscribe: 'S\'abonner', current: 'Forfait actuel', credits: 'Crédits', noCredits: 'pas assez de crédits', owned: 'Possédé', access: 'Jeux exclusifs' } : language.startsWith('zh') ? { search: '搜索...', plans: 'Xbox Game Pass 方案', featured: '精选游戏和应用', moreGames: '更多游戏', topFree: '热门免费应用', free: '免费', get: '获取', open: '打开', play: '立即玩', subscribe: '订阅', current: '当前方案', credits: '积分', noCredits: '积分不足', owned: '已拥有', access: '访问专属游戏' } : { search: 'Search...', plans: 'Xbox Game Pass Plans', featured: 'Featured Games & Apps', moreGames: 'More Games', topFree: 'Top free apps', free: 'Free', get: 'Get', open: 'Open', play: 'Play Now', subscribe: 'Subscribe', current: 'Current Plan', credits: 'Credits', noCredits: 'u are without enogh creddits', owned: 'Owned', access: 'Access to exclusive games' });

  const storeApps = [
    { ...APPS_METADATA.whatsapp, category: 'Social', price: 'Free' },
    { ...APPS_METADATA.spotify, category: 'Music', price: 'Free' },
    { ...APPS_METADATA.chatgpt, category: 'AI Chat', price: 'Free' },
    { ...APPS_METADATA.gemini, category: 'AI Assistant', price: 'Free' },
    { ...APPS_METADATA.discord, category: 'Social', price: 'Free' },
    { ...APPS_METADATA.vscode, category: 'Developer', price: 'Free' },
    { ...APPS_METADATA.bank, category: 'Finance', price: 'Free' },
  ];

  const gamePassPlans = [
    { id: 'basic', name: 'Basic', price: 1200, color: 'bg-zinc-700' },
    { id: 'premium', name: 'Premium', price: 5600, color: 'bg-blue-600' },
    { id: 'ultimate', name: 'Ultimate', price: 12000, color: 'bg-green-600' },
  ];

  const handleAction = (id: string) => {
    if (isAppInstalled(id as AppId)) {
      openApp(id as AppId);
    } else {
      installApp(id as AppId);
    }
  };

  const handleBuyPlan = (plan: any) => {
    if (credits >= plan.price) {
      addCredits(-plan.price);
      subscribeGamePass(plan.id);
      setError('');
    } else {
      setError(t.noCredits);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleBuyMinecraft = () => {
    if (credits >= 17000) {
      buyMinecraft();
      setError('');
    } else {
      setError(t.noCredits);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleBuyWin7Simu = () => {
    if (credits >= 100000) {
      buyWin7Simu();
      setError('');
    } else {
      setError(t.noCredits);
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className={`h-full flex flex-col relative transition-colors ${isDark ? 'bg-[#1a1c1e] text-white' : 'bg-gray-50'}`}>
      <div className={`h-16 border-b flex items-center justify-between px-8 transition-colors ${isDark ? 'bg-white/5 border-white/5' : 'bg-white'}`}>
        <div className="flex items-center gap-4">
          <ShoppingBag className={isDark ? 'text-blue-400' : 'text-blue-600'} size={24} />
          <h2 className="font-semibold text-lg">Microsoft Store</h2>
        </div>
        <div className="flex items-center gap-6">
          <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 border transition-colors ${isDark ? 'bg-white/5 border-white/10' : 'bg-zinc-100 border-zinc-200'}`}>
            <CreditCard size={16} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
            <span className={`text-sm font-bold ${isDark ? 'text-gray-200' : 'text-zinc-700'}`}>{credits.toLocaleString()} {t.credits}</span>
          </div>
          <div className="relative w-64">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} size={16} />
            <input 
              type="text" 
              placeholder={t.search}
              className={`w-full rounded-full py-2 pl-10 pr-4 text-sm outline-none transition-all ${isDark ? 'bg-white/5 text-white focus:ring-blue-400/50' : 'bg-gray-100 focus:ring-2 focus:ring-blue-500'}`}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        {error && (
          <div className="mb-6 bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-bounce">
            <AlertCircle size={20} />
            <span className="text-sm font-bold">{error}</span>
          </div>
        )}

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">{t.plans}</h3>
          <div className="grid grid-cols-3 gap-6">
            {gamePassPlans.map((plan) => (
              <div key={plan.id} className={`${plan.color} rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between h-64 relative overflow-hidden group`}>
                <div className="relative z-10">
                  <h4 className="text-2xl font-black italic uppercase mb-1">{plan.name}</h4>
                  <p className="text-white/70 text-sm mb-4">{t.access}</p>
                  <p className="text-3xl font-bold">{plan.price.toLocaleString()} <span className="text-sm font-normal opacity-70">{t.credits}</span></p>
                </div>
                
                <div className="relative z-10">
                  {gamePassPlan === plan.id ? (
                    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl py-3 flex items-center justify-center gap-2">
                      <Check size={20} />
                      <span className="font-bold">{t.current}</span>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleBuyPlan(plan)}
                      className="w-full bg-white text-zinc-900 py-3 rounded-xl font-bold hover:bg-zinc-100 transition-all active:scale-95"
                    >
                      {t.subscribe}
                    </button>
                  )}
                </div>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">{t.featured}</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-zinc-900 rounded-2xl p-8 text-white flex gap-8 items-center shadow-2xl relative overflow-hidden group">
              <div className="w-32 h-32 bg-zinc-800 rounded-2xl overflow-hidden shadow-xl relative z-10">
                <img src={APPS_METADATA.minecraft.icon} alt="Minecraft" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 relative z-10">
                <h4 className="text-2xl font-bold mb-2">Minecraft Classic</h4>
                <p className="text-zinc-400 text-sm mb-6">The original sandbox game. Build anything you can imagine.</p>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold">17,000 {t.credits}</span>
                  {isMinecraftOwned ? (
                    <button 
                      onClick={() => openApp('minecraft')}
                      className="bg-green-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-green-700 transition-all"
                    >
                      {t.play}
                    </button>
                  ) : (
                    <button 
                      onClick={handleBuyMinecraft}
                      className="bg-blue-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95"
                    >
                      {t.get}
                    </button>
                  )}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className={`rounded-2xl p-8 text-white flex gap-8 items-center shadow-2xl relative overflow-hidden group ${isDark ? 'bg-blue-900/40' : 'bg-blue-900'}`}>
              <div className={`w-32 h-32 rounded-2xl overflow-hidden shadow-xl relative z-10 flex items-center justify-center ${isDark ? 'bg-blue-800/40' : 'bg-blue-800'}`}>
                <DynamicIcon lucideName="Monitor" size={48} className="text-blue-400" />
              </div>
              <div className="flex-1 relative z-10">
                <h4 className="text-2xl font-bold mb-2">Win7Simu</h4>
                <p className="text-blue-200 text-sm mb-6">Experience Windows 7 in your browser. Nostalgia at its best.</p>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold">100,000 {t.credits}</span>
                  {isWin7SimuOwned ? (
                    <button 
                      onClick={() => openApp('win7simu')}
                      className="bg-green-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-green-700 transition-all"
                    >
                      {t.open}
                    </button>
                  ) : (
                    <button 
                      onClick={handleBuyWin7Simu}
                      className="bg-blue-500 text-white px-8 py-2 rounded-xl font-bold hover:bg-blue-600 transition-all active:scale-95"
                    >
                      {t.get}
                    </button>
                  )}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">{t.moreGames}</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className={`rounded-2xl p-8 border flex gap-8 items-center shadow-sm relative overflow-hidden group transition-colors ${isDark ? 'bg-white/5 border-white/5' : 'bg-zinc-100 border-zinc-200'}`}>
              <div className={`w-32 h-32 rounded-2xl flex items-center justify-center shadow-md relative z-10 transition-colors ${isDark ? 'bg-white/10' : 'bg-zinc-200'}`}>
                <DynamicIcon lucideName="Trophy" size={48} className="text-zinc-400" />
              </div>
              <div className="flex-1 relative z-10">
                <h4 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-zinc-800'}`}>Racing Game</h4>
                <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-zinc-500'}`}>High speed action. Now free for everyone!</p>
                <button 
                  onClick={() => handleAction('racing')}
                  className={`px-8 py-2 rounded-xl font-bold transition-all active:scale-95 ${isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-zinc-800 text-white hover:bg-zinc-900'}`}
                >
                  {isAppInstalled('racing') ? t.open : t.get}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-bold mb-6">{t.topFree}</h3>
          <div className="grid grid-cols-3 gap-6">
            {storeApps.map((app, i) => (
              <div 
                key={i} 
                onClick={() => handleAction(app.id)}
                className={`p-4 rounded-xl border hover:shadow-md transition-all flex items-center gap-4 cursor-pointer group ${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-gray-100'}`}
              >
                <div className="w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform relative">
                  <DynamicIcon 
                    src={app.icon} 
                    name={app.name} 
                    lucideName={app.lucideIcon} 
                    className="w-full h-full object-contain" 
                    size={32}
                  />
                </div>
                <div className="flex-1">
                  <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-zinc-800'}`}>{app.name}</p>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{app.category}</p>
                </div>
                <button className={`text-xs font-bold px-4 py-1.5 rounded-full transition-colors ${isAppInstalled(app.id as AppId) ? (isDark ? 'bg-white/10 text-gray-300 hover:bg-white/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200') : (isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700')}`}>
                  {isAppInstalled(app.id as AppId) ? t.open : t.get}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
