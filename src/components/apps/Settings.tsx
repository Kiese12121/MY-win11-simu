import { useState, useEffect } from 'react';
import { Monitor, Shield, Globe, AppWindow, User, Clock, Search, Image, Volume2, Battery, Check, Palette, Gamepad2, Briefcase, Sparkles, Scan, Loader2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useWindows, Language, SystemTheme } from '../../context/WindowContext';
import { THEMES } from '../../constants';

export default function Settings() {
  const { language, setLanguage, isProtectionEnabled, setProtectionEnabled, systemTheme, setSystemTheme, quality, setQuality, activeViruses, clearViruses, removeVirus } = useWindows();
  const [activeTab, setActiveTab] = useState('System');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanType, setScanType] = useState<'fast' | 'full' | null>(null);
  const [foundViruses, setFoundViruses] = useState<string[]>([]);
  const [isScanFinished, setIsScanFinished] = useState(false);

  const isDark = THEMES[systemTheme].mode === 'dark';

  const startScan = (type: 'fast' | 'full') => {
    setIsScanning(true);
    setScanProgress(0);
    setScanType(type);
    setFoundViruses([]);
    setIsScanFinished(false);
  };

  useEffect(() => {
    if (isScanning && scanType) {
      const duration = scanType === 'full' ? 50000 : 30000; // 50s vs 30s
      const intervalTime = 100;
      const step = 100 / (duration / intervalTime);

      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            setIsScanFinished(true);
            
            // Detection Logic
            const detected: string[] = [];
            if (scanType === 'full') {
              // 99.99% detection
              if (activeViruses.length > 0) detected.push(...activeViruses);
            } else {
              // Fast scan: 50% chance of NOT detecting MEMZ
              activeViruses.forEach(v => {
                if (v === 'memz') {
                  if (Math.random() > 0.5) detected.push(v);
                } else {
                  detected.push(v);
                }
              });
            }
            setFoundViruses(detected);
            return 100;
          }
          return prev + step;
        });
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [isScanning, scanType, activeViruses]);

  const removeFoundViruses = () => {
    foundViruses.forEach(v => removeVirus(v as any));
    setFoundViruses([]);
    setIsScanFinished(false);
  };

  const t = ({
    pt: {
      system: 'Sistema',
      bluetooth: 'Bluetooth e dispositivos',
      network: 'Rede e internet',
      personalization: 'Personalização',
      apps: 'Aplicativos',
      accounts: 'Contas',
      time: 'Hora e idioma',
      privacy: 'Privacidade e segurança',
      about: 'Sobre',
      findSetting: 'Localizar uma configuração',
      localAccount: 'Conta Local',
      protection: 'Proteção em tempo real',
      protectionDesc: 'Ajuda a impedir que malwares sejam instalados ou executados no dispositivo.',
      on: 'Ativado',
      off: 'Desativado',
      deviceSpecs: 'Especificações do dispositivo',
      winSpecs: 'Especificações do Windows',
      langRegion: 'Idioma e região',
      langDesc: 'Escolha o idioma que você deseja usar para o Windows e as respostas da IA.',
      dateTime: 'Data e hora',
      setTimeAuto: 'Definir hora automaticamente'
    },
    en: {
      system: 'System',
      bluetooth: 'Bluetooth & devices',
      network: 'Network & internet',
      personalization: 'Personalization',
      apps: 'Apps',
      accounts: 'Accounts',
      time: 'Time & language',
      privacy: 'Privacy & security',
      about: 'About',
      findSetting: 'Find a setting',
      localAccount: 'Local Account',
      protection: 'Real-time protection',
      protectionDesc: 'Helps prevent malware from being installed or executed on your device.',
      on: 'On',
      off: 'Off',
      deviceSpecs: 'Device specifications',
      winSpecs: 'Windows specifications',
      langRegion: 'Language & region',
      langDesc: 'Choose the language you want to use for Windows and AI responses.',
      dateTime: 'Date & time',
      setTimeAuto: 'Set time automatically'
    },
    es: {
      system: 'Sistema',
      bluetooth: 'Bluetooth y dispositivos',
      network: 'Red e internet',
      personalization: 'Personalización',
      apps: 'Aplicaciones',
      accounts: 'Cuentas',
      time: 'Hora e idioma',
      privacy: 'Privacidad y segurança',
      about: 'Acerca de',
      findSetting: 'Buscar una configuración',
      localAccount: 'Cuenta Local',
      protection: 'Protección en tiempo real',
      protectionDesc: 'Ayuda a evitar que se instale o ejecute malware en el dispositivo.',
      on: 'Activado',
      off: 'Desactivado',
      deviceSpecs: 'Especificaciones del dispositivo',
      winSpecs: 'Especificações de Windows',
      langRegion: 'Idioma y región',
      langDesc: 'Elija el idioma que desea usar para Windows y las respuestas de IA.',
      dateTime: 'Fecha y hora',
      setTimeAuto: 'Ajustar hora automáticamente'
    },
    'pt-PT': {
      system: 'Sistema',
      bluetooth: 'Bluetooth e dispositivos',
      network: 'Rede e Internet',
      personalization: 'Personalização',
      apps: 'Aplicações',
      accounts: 'Contas',
      time: 'Hora e idioma',
      privacy: 'Privacidade e segurança',
      about: 'Sobre',
      findSetting: 'Localizar uma definição',
      localAccount: 'Conta Local',
      protection: 'Proteção em tempo real',
      protectionDesc: 'Ajuda a impedir que malwares sejam instalados ou executados no dispositivo.',
      on: 'Ligado',
      off: 'Desligado',
      deviceSpecs: 'Especificações do dispositivo',
      winSpecs: 'Especificações do Windows',
      langRegion: 'Idioma e região',
      langDesc: 'Escolha o idioma que deseja utilizar para o Windows e respostas da IA.',
      dateTime: 'Data e hora',
      setTimeAuto: 'Definir hora automaticamente'
    },
    fr: {
      system: 'Système',
      bluetooth: 'Bluetooth et appareils',
      network: 'Réseau et Internet',
      personalization: 'Personnalisation',
      apps: 'Applications',
      accounts: 'Comptes',
      time: 'Heure et langue',
      privacy: 'Confidentialité et sécurité',
      about: 'À propos',
      findSetting: 'Rechercher un paramètre',
      localAccount: 'Compte local',
      protection: 'Protection en temps réel',
      protectionDesc: 'Aide à empêcher les logiciels malveillants de s\'installer ou de s\'exécuter sur votre appareil.',
      on: 'Activé',
      off: 'Désactivé',
      deviceSpecs: 'Spécifications de l\'appareil',
      winSpecs: 'Spécifications de Windows',
      langRegion: 'Langue et région',
      langDesc: 'Choisissez la langue que vous souhaitez utiliser pour Windows et les réponses de l\'IA.',
      dateTime: 'Date et heure',
      setTimeAuto: 'Régler l\'heure automatiquement'
    },
    it: {
      system: 'Sistema',
      bluetooth: 'Bluetooth e dispositivi',
      network: 'Rete e Internet',
      personalization: 'Personalizzazione',
      apps: 'App',
      accounts: 'Account',
      time: 'Data e ora',
      privacy: 'Privacy e sicurezza',
      about: 'Informazioni',
      findSetting: 'Trova un\'impostazione',
      localAccount: 'Account locale',
      protection: 'Protezione in tempo reale',
      protectionDesc: 'Aiuta a impedire l\'installazione o l\'esecuzione di malware nel dispositivo.',
      on: 'Attivato',
      off: 'Disattivato',
      deviceSpecs: 'Specifiche del dispositivo',
      winSpecs: 'Specifiche di Windows',
      langRegion: 'Area geografica e lingua',
      langDesc: 'Scegli la lingua da usare per Windows e per le risposte dell\'IA.',
      dateTime: 'Data e ora',
      setTimeAuto: 'Imposta l\'ora automaticamente'
    },
    de: {
      system: 'System',
      bluetooth: 'Bluetooth & Geräte',
      network: 'Netzwerk & Internet',
      personalization: 'Personalisierung',
      apps: 'Apps',
      accounts: 'Konten',
      time: 'Zeit & Sprache',
      privacy: 'Datenschutz & Sicherheit',
      about: 'Info',
      findSetting: 'Einstellung suchen',
      localAccount: 'Lokales Konto',
      protection: 'Echtzeitschutz',
      protectionDesc: 'Verhindert, dass Malware auf dem Gerät installiert oder ausgeführt wird.',
      on: 'Ein',
      off: 'Aus',
      deviceSpecs: 'Gerätespezifikationen',
      winSpecs: 'Windows-Spezifikationen',
      langRegion: 'Sprache & Region',
      langDesc: 'Wählen Sie die Sprache aus, die Sie für Windows und KI-Antworten verwenden möchten.',
      dateTime: 'Datum & Uhrzeit',
      setTimeAuto: 'Uhrzeit automatisch festlegen'
    },
    ru: {
      system: 'Система',
      bluetooth: 'Bluetooth и устройства',
      network: 'Сеть и Интернет',
      personalization: 'Персонализация',
      apps: 'Приложения',
      accounts: 'Учетные записи',
      time: 'Время и язык',
      privacy: 'Конфиденциальность и защита',
      about: 'О системе',
      findSetting: 'Найти настройку',
      localAccount: 'Локальная учетная запись',
      protection: 'Защита в реальном времени',
      protectionDesc: 'Помогает предотвратить установку или запуск вредоносных программ на устройстве.',
      on: 'Вкл.',
      off: 'Выкл.',
      deviceSpecs: 'Характеристики устройства',
      winSpecs: 'Характеристики Windows',
      langRegion: 'Язык и регион',
      langDesc: 'Выберите язык, который вы хотите использовать для Windows и ответов ИИ.',
      dateTime: 'Дата и время',
      setTimeAuto: 'Установить время автоматически'
    },
    ja: {
      system: 'システム',
      bluetooth: 'Bluetooth とデバイス',
      network: 'ネットワークとインターネット',
      personalization: '個人用設定',
      apps: 'アプリ',
      accounts: 'アカウント',
      time: '時刻と言語',
      privacy: 'プライバシーとセキュリティ',
      about: 'バージョン情報',
      findSetting: '設定の検索',
      localAccount: 'ローカル アカウント',
      protection: 'リアルタイム保護',
      protectionDesc: 'マルウェアがデバイスにインストールまたは実行されるのを防ぎます。',
      on: 'オン',
      off: 'オフ',
      deviceSpecs: 'デバイスの仕様',
      winSpecs: 'Windows の仕様',
      langRegion: '言語と地域',
      langDesc: 'Windows と AI の回答に使用する言語を選択してください。',
      dateTime: '日付と時刻',
      setTimeAuto: '時刻を自動的に設定する'
    },
    ko: {
      system: '시스템',
      bluetooth: 'Bluetooth 및 장치',
      network: '네트워크 및 인터넷',
      personalization: '개인 설정',
      apps: '앱',
      accounts: '계정',
      time: '시간 및 언어',
      privacy: '개인 정보 및 보안',
      about: '정보',
      findSetting: '설정 찾기',
      localAccount: '로컬 계정',
      protection: '실시간 보호',
      protectionDesc: '맬웨어가 장치에 설치되거나 실행되지 않도록 도와줍니다.',
      on: '켬',
      off: '끔',
      deviceSpecs: '장치 사양',
      winSpecs: 'Windows 사양',
      langRegion: '언어 및 지역',
      langDesc: 'Windows 및 AI 응답에 사용할 언어를 선택하세요.',
      dateTime: '날짜 및 시간',
      setTimeAuto: '자동으로 시간 설정'
    },
    ar: {
      system: 'النظام',
      bluetooth: 'البلوتوث والأجهزة',
      network: 'الشبكة والإنترنت',
      personalization: 'إضفاء طابع شخصي',
      apps: 'التطبيقات',
      accounts: 'الحسابات',
      time: 'الوقت واللغة',
      privacy: 'الخصوصية والأمان',
      about: 'حول',
      findSetting: 'البحث عن إعداد',
      localAccount: 'حساب محلي',
      protection: 'الحماية في الوقت الحقيقي',
      protectionDesc: 'يساعد في منع تثبيت البرامج الضارة أو تشغيلها على جهازك.',
      on: 'تشغيل',
      off: 'إيقاف',
      deviceSpecs: 'مواصفات الجهاز',
      winSpecs: 'مواصفات ويندوز',
      langRegion: 'اللغة والمنطقة',
      langDesc: 'اختر اللغة التي تريد استخدامها لويندوز وردود الذكاء الاصطناعي.',
      dateTime: 'التاريخ والوقت',
      setTimeAuto: 'ضبط الوقت تلقائياً'
    },
    nl: {
      system: 'Systeem',
      bluetooth: 'Bluetooth & apparaten',
      network: 'Netwerk & internet',
      personalization: 'Persoonlijke instellingen',
      apps: 'Apps',
      accounts: 'Accounts',
      time: 'Tijd en taal',
      privacy: 'Privacy en beveiliging',
      about: 'Info',
      findSetting: 'Een instelling zoeken',
      localAccount: 'Lokaal account',
      protection: 'Real-time beveiliging',
      protectionDesc: 'Helpt voorkomen dat malware op uw apparaat wordt geïnstalleerd of uitgevoerd.',
      on: 'Aan',
      off: 'Uit',
      deviceSpecs: 'Apparaatspecificaties',
      winSpecs: 'Windows-specificaties',
      langRegion: 'Taal en regio',
      langDesc: 'Kies de taal die u wilt gebruiken voor Windows en AI-antwoorden.',
      dateTime: 'Datum en tijd',
      setTimeAuto: 'Tijd automatisch instellen'
    },
    pl: {
      system: 'System',
      bluetooth: 'Bluetooth i urządzenia',
      network: 'Sieć i internet',
      personalization: 'Personalizacja',
      apps: 'Aplikacje',
      accounts: 'Konta',
      time: 'Czas i język',
      privacy: 'Prywatność i bezpieczeństwo',
      about: 'Informacje',
      findSetting: 'Znajdź ustawienie',
      localAccount: 'Konto lokalne',
      protection: 'Ochrona w czasie rzeczywistym',
      protectionDesc: 'Pomaga zapobiegać instalowaniu lub uruchamianiu złośliwego oprogramowania na urządzeniu.',
      on: 'Wł.',
      off: 'Wył.',
      deviceSpecs: 'Specyfikacja urządzenia',
      winSpecs: 'Specyfikacja systemu Windows',
      langRegion: 'Język i region',
      langDesc: 'Wybierz język, którego chcesz używać w systemie Windows i odpowiedziach AI.',
      dateTime: 'Data i godzina',
      setTimeAuto: 'Ustaw czas automatycznie'
    },
    tr: {
      system: 'Sistem',
      bluetooth: 'Bluetooth ve cihazlar',
      network: 'Ağ ve internet',
      personalization: 'Kişiselleştirme',
      apps: 'Uygulamalar',
      accounts: 'Hesaplar',
      time: 'Zaman ve dil',
      privacy: 'Gizlilik ve güvenlik',
      about: 'Hakkında',
      findSetting: 'Ayar bul',
      localAccount: 'Yerel Hesap',
      protection: 'Gerçek zamanlı koruma',
      protectionDesc: 'Kötü amaçlı yazılımların cihazınıza yüklenmesini veya çalıştırılmasını önlemeye yardımcı olur.',
      on: 'Açık',
      off: 'Kapalı',
      deviceSpecs: 'Cihaz özellikleri',
      winSpecs: 'Windows özellikleri',
      langRegion: 'Dil ve bölge',
      langDesc: 'Windows ve AI yanıtları için kullanmak istediğiniz dili seçin.',
      dateTime: 'Tarih ve saat',
      setTimeAuto: 'Saati otomatik olarak ayarla'
    },
    hi: {
      system: 'सिस्टम',
      bluetooth: 'ब्लूटूथ और डिवाइस',
      network: 'नेटवर्क और इंटरनेट',
      personalization: 'वैयक्तिकरण',
      apps: 'ऐप्स',
      accounts: 'खाते',
      time: 'समय और भाषा',
      privacy: 'गोपनीयता और सुरक्षा',
      about: 'के बारे में',
      findSetting: 'सेटिंग खोजें',
      localAccount: 'स्थानीय खाता',
      protection: 'रियल-टाइम सुरक्षा',
      protectionDesc: 'आपके डिवाइस पर मैलवेयर को इंस्टॉल या रन होने से रोकने में मदद करता है।',
      on: 'चालू',
      off: 'बंद',
      deviceSpecs: 'डिवाइस विनिर्देश',
      winSpecs: 'विंडोज विनिर्देश',
      langRegion: 'भाषा और क्षेत्र',
      langDesc: 'वह भाषा चुनें जिसका उपयोग आप विंडोज और एआई प्रतिक्रियाओं के लिए करना चाहते हैं।',
      dateTime: 'दिनांक और समय',
      setTimeAuto: 'समय स्वचालित रूप से सेट करें'
    },
    vi: {
      system: 'Hệ thống',
      bluetooth: 'Bluetooth & thiết bị',
      network: 'Mạng & internet',
      personalization: 'Cá nhân hóa',
      apps: 'Ứng dụng',
      accounts: 'Tài khoản',
      time: 'Giờ & ngôn ngữ',
      privacy: 'Quyền riêng tư & bảo mật',
      about: 'Giới thiệu',
      findSetting: 'Tìm cài đặt',
      localAccount: 'Tài khoản cục bộ',
      protection: 'Bảo vệ thời gian thực',
      protectionDesc: 'Giúp ngăn chặn phần mềm độc hại cài đặt hoặc chạy trên thiết bị của bạn.',
      on: 'Bật',
      off: 'Tắt',
      deviceSpecs: 'Thông số thiết bị',
      winSpecs: 'Thông số Windows',
      langRegion: 'Ngôn ngữ & vùng',
      langDesc: 'Chọn ngôn ngữ bạn muốn sử dụng cho Windows và các phản hồi của AI.',
      dateTime: 'Ngày & giờ',
      setTimeAuto: 'Đặt giờ tự động'
    },
    th: {
      system: 'ระบบ',
      bluetooth: 'Bluetooth และอุปกรณ์',
      network: 'เครือข่ายและอินเทอร์เน็ต',
      personalization: 'การตั้งค่าส่วนบุคคล',
      apps: 'แอป',
      accounts: 'บัญชี',
      time: 'เวลาและภาษา',
      privacy: 'ความเป็นส่วนตัวและความปลอดภัย',
      about: 'เกี่ยวกับ',
      findSetting: 'ค้นหาการตั้งค่า',
      localAccount: 'บัญชีภายในเครื่อง',
      protection: 'การป้องกันแบบเรียลไทม์',
      protectionDesc: 'ช่วยป้องกันไม่ให้มัลแวร์ถูกติดตั้งหรือเรียกใช้บนอุปกรณ์ของคุณ',
      on: 'เปิด',
      off: 'ปิด',
      deviceSpecs: 'ข้อมูลจำเพาะของอุปกรณ์',
      winSpecs: 'ข้อมูลจำเพาะของ Windows',
      langRegion: 'ภาษาและภูมิภาค',
      langDesc: 'เลือกภาษาที่คุณต้องการใช้สำหรับ Windows และการตอบกลับของ AI',
      dateTime: 'วันที่และเวลา',
      setTimeAuto: 'ตั้งเวลาโดยอัตโนมัติ'
    },
    zh: {
      system: '系统',
      bluetooth: '蓝牙和设备',
      network: '网络和 Internet',
      personalization: '个性化',
      apps: '应用',
      accounts: '账户',
      time: '时间和语言',
      privacy: '隐私和安全',
      about: '关于',
      findSetting: '查找设置',
      localAccount: '本地账户',
      protection: '实时保护',
      protectionDesc: '有助于防止恶意软件在您的设备上安装或运行。',
      on: '开启',
      off: '关闭',
      deviceSpecs: '设备规格',
      winSpecs: 'Windows 规格',
      langRegion: '语言和区域',
      langDesc: '选择您想要用于 Windows 和 AI 响应的语言。',
      dateTime: '日期和时间',
      setTimeAuto: '自动设置时间'
    },
    sv: {
      system: 'System',
      bluetooth: 'Bluetooth och enheter',
      network: 'Nätverk och internet',
      personalization: 'Anpassning',
      apps: 'Appar',
      accounts: 'Konton',
      time: 'Tid och språk',
      privacy: 'Sekretess och säkerhet',
      about: 'Om',
      findSetting: 'Sök efter en inställning',
      localAccount: 'Lokalt konto',
      protection: 'Realtidsskydd',
      protectionDesc: 'Hjälp till att förhindra att skadlig programvara installeras eller körs på enheten.',
      on: 'På',
      off: 'Av',
      deviceSpecs: 'Enhetsspecifikationer',
      winSpecs: 'Windows-specifikationer',
      langRegion: 'Språk och region',
      langDesc: 'Välj det språk du vill använda för Windows och AI-svar.',
      dateTime: 'Datum och tid',
      setTimeAuto: 'Ställ in tid automatiskt'
    },
    no: {
      system: 'System',
      bluetooth: 'Bluetooth og enheter',
      network: 'Nettverk og internett',
      personalization: 'Personalisering',
      apps: 'Apper',
      accounts: 'Kontoer',
      time: 'Tid og språk',
      privacy: 'Personvern og sikkerhet',
      about: 'Om',
      findSetting: 'Finn en innstilling',
      localAccount: 'Lokal konto',
      protection: 'Sanntidsbeskyttelse',
      protectionDesc: 'Hjelper med å forhindre at skadelig programvare blir installert eller kjørt på enheten din.',
      on: 'På',
      off: 'Av',
      deviceSpecs: 'Enhetsspesifikasjoner',
      winSpecs: 'Windows-spesifikasjoner',
      langRegion: 'Språk og region',
      langDesc: 'Velg språket du vil bruke for Windows og AI-svar.',
      dateTime: 'Dato og klokkeslett',
      setTimeAuto: 'Still inn tid automatisk'
    }
  } as Record<string, any>)[language] || (language.startsWith('pt') ? {
    system: 'Sistema',
    bluetooth: 'Bluetooth e dispositivos',
    network: 'Rede e internet',
    personalization: 'Personalização',
    apps: 'Aplicativos',
    accounts: 'Contas',
    time: 'Hora e idioma',
    privacy: 'Privacidade e segurança',
    about: 'Sobre',
    findSetting: 'Localizar uma configuração',
    localAccount: 'Conta Local',
    protection: 'Proteção em tempo real',
    protectionDesc: 'Ajuda a impedir que malwares sejam instalados ou executados no dispositivo.',
    on: 'Ativado',
    off: 'Desativado',
    deviceSpecs: 'Especificações do dispositivo',
    winSpecs: 'Especificações do Windows',
    langRegion: 'Idioma e região',
    langDesc: 'Escolha o idioma que você deseja usar para o Windows e as respostas da IA.',
    dateTime: 'Data e hora',
    setTimeAuto: 'Definir hora automaticamente'
  } : language.startsWith('es') ? {
    system: 'Sistema',
    bluetooth: 'Bluetooth y dispositivos',
    network: 'Red e internet',
    personalization: 'Personalización',
    apps: 'Aplicaciones',
    accounts: 'Cuentas',
    time: 'Hora e idioma',
    privacy: 'Privacidad y seguridad',
    about: 'Acerca de',
    findSetting: 'Buscar una configuración',
    localAccount: 'Cuenta Local',
    protection: 'Protección en tiempo real',
    protectionDesc: 'Ayuda a evitar que se instale o ejecute malware en el dispositivo.',
    on: 'Activado',
    off: 'Desactivado',
    deviceSpecs: 'Especificaciones del dispositivo',
    winSpecs: 'Especificaciones de Windows',
    langRegion: 'Idioma y región',
    langDesc: 'Elija el idioma que desea usar para Windows y las respuestas de IA.',
    dateTime: 'Fecha y hora',
    setTimeAuto: 'Ajustar hora automáticamente'
  } : language.startsWith('zh') ? {
    system: '系统',
    bluetooth: '蓝牙和设备',
    network: '网络和 Internet',
    personalization: '个性化',
    apps: '应用',
    accounts: '账户',
    time: '时间和语言',
    privacy: '隐私和安全',
    about: '关于',
    findSetting: '查找设置',
    localAccount: '本地账户',
    protection: '实时保护',
    protectionDesc: '有助于防止恶意软件在您的设备上安装或运行。',
    on: '开启',
    off: '关闭',
    deviceSpecs: '设备规格',
    winSpecs: 'Windows 规格',
    langRegion: '语言和区域',
    langDesc: '选择您想要用于 Windows 和 AI 响应的语言。',
    dateTime: '日期和时间',
    setTimeAuto: '自动设置时间'
  } : {
    system: 'System',
    bluetooth: 'Bluetooth & devices',
    network: 'Network & internet',
    personalization: 'Personalization',
    apps: 'Apps',
    accounts: 'Accounts',
    time: 'Time & language',
    privacy: 'Privacy & security',
    about: 'About',
    findSetting: 'Find a setting',
    localAccount: 'Local Account',
    protection: 'Real-time protection',
    protectionDesc: 'Helps prevent malware from being installed or executed on your device.',
    on: 'On',
    off: 'Off',
    deviceSpecs: 'Device specifications',
    winSpecs: 'Windows specifications',
    langRegion: 'Language & region',
    langDesc: 'Choose the language you want to use for Windows and AI responses.',
    dateTime: 'Date & time',
    setTimeAuto: 'Set time automatically'
  });

  const menuItems = [
    { id: 'System', icon: <Monitor size={18} />, label: t.system },
    { id: 'Bluetooth', icon: <Globe size={18} />, label: t.bluetooth },
    { id: 'Network', icon: <Globe size={18} />, label: t.network },
    { id: 'Personalization', icon: <Image size={18} />, label: t.personalization },
    { id: 'Apps', icon: <AppWindow size={18} />, label: t.apps },
    { id: 'Accounts', icon: <User size={18} />, label: t.accounts },
    { id: 'Time', icon: <Clock size={18} />, label: t.time },
    { id: 'Privacy', icon: <Shield size={18} />, label: t.privacy },
    { id: 'About', icon: <Monitor size={18} />, label: t.about },
  ];

  return (
    <div className={`h-full flex ${isDark ? 'bg-[#1a1c1e] text-white' : 'bg-gray-50/50 text-gray-900'}`}>
      <div className={`w-64 p-4 flex flex-col gap-1 ${isDark ? 'bg-white/5 border-r border-white/5' : ''}`}>
        <div className="flex items-center gap-3 mb-6 px-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
            <User size={20} />
          </div>
          <div>
            <p className="text-sm font-bold">User</p>
            <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.localAccount}</p>
          </div>
        </div>
        
        <div className="relative mb-4 px-2">
          <Search className={`absolute left-5 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} size={14} />
          <input 
            type="text" 
            placeholder={t.findSetting} 
            className={`w-full border rounded-md py-1.5 pl-8 pr-4 text-xs outline-none transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white focus:ring-blue-400/50' : 'bg-white text-gray-900 focus:ring-blue-500 border-gray-200'}`} 
          />
        </div>

        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 px-4 py-2 rounded-md text-xs transition-all ${
              activeTab === item.id 
                ? (isDark ? 'bg-white/10 shadow-sm font-semibold text-blue-400' : 'bg-white shadow-sm font-semibold text-blue-600') 
                : (isDark ? 'hover:bg-white/5 text-gray-300' : 'hover:bg-gray-200/50 text-gray-700')
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 p-10 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-8">{activeTab}</h2>
        
        {activeTab === 'Personalization' ? (
          <div className="flex flex-col gap-6">
            <div className={`p-6 rounded-xl border shadow-sm ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100'}`}>
              <h3 className="font-bold mb-1">System Resolution & Scale</h3>
              <p className={`text-[10px] mb-6 italic ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Simulate different display resolutions. High quality increases desktop space (more pixels).</p>
              
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'low', label: 'Low (720p)', desc: 'Large Icons' },
                  { id: 'medium', label: 'Medium (1080p)', desc: 'Standard' },
                  { id: 'high', label: '4K', desc: 'Small Icons' },
                  { id: '5k', label: '5K', desc: 'Retina Space' },
                  { id: '6k', label: '6K', desc: 'Super Retina' },
                  { id: '7k', label: '7K', desc: 'Ultra Retina' },
                  { id: '8k', label: '8K', desc: 'Ultra Tiny' },
                  { id: '16k', label: '16K', desc: 'Atomic Icons' },
                  { id: '32k', label: '32K', desc: 'Microscopic' },
                  { id: '64k', label: '64K', desc: 'Molecular' },
                  { id: '120k', label: '120K', desc: 'Black Hole' },
                ].map((q) => (
                  <button
                    key={q.id}
                    onClick={() => setQuality(q.id as any)}
                    className={`p-3 rounded-lg border text-left transition-all ${quality === q.id ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 hover:border-white/20'}`}
                  >
                    <p className="text-xs font-bold">{q.label}</p>
                    <p className="text-[10px] opacity-60">{q.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-xl border shadow-sm ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100'}`}>
              <h3 className="font-bold mb-1">Themes & Optimization</h3>
              <p className={`text-[10px] mb-6 italic ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Select the system-wide mode for performance and look.</p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setSystemTheme('gamer')}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left group ${systemTheme === 'gamer' ? (isDark ? 'bg-blue-600/20 border-blue-500 shadow-lg ring-1 ring-blue-500/20' : 'bg-[#1c1c1c] text-white border-blue-500 shadow-md') : (isDark ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-gray-50 border-gray-100 hover:border-gray-200')}`}
                >
                  <div className={`p-3 rounded-xl ${systemTheme === 'gamer' ? 'bg-blue-600' : (isDark ? 'bg-white/10 text-gray-400' : 'bg-gray-200 text-gray-500')} group-hover:bg-blue-600 transition-colors`}>
                    <Gamepad2 size={24} className={systemTheme === 'gamer' ? 'text-white' : ''} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-bold leading-none mb-1 ${systemTheme === 'gamer' ? (isDark ? 'text-blue-400' : 'text-white') : (isDark ? 'text-gray-300' : '')}`}>Gamer Mode</p>
                    <p className={`text-[10px] opacity-60 ${systemTheme === 'gamer' && !isDark ? 'text-white/80' : ''}`}>Dark mode, 144 FPS overlay, gaming wallpaper</p>
                  </div>
                  {systemTheme === 'gamer' && <Sparkles size={16} className={isDark ? 'text-blue-400' : 'text-blue-200'} />}
                </button>

                <button 
                  onClick={() => setSystemTheme('work')}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left group ${systemTheme === 'work' ? 'bg-blue-600 text-white border-blue-400 shadow-md' : (isDark ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-gray-50 border-gray-100 hover:border-gray-200')}`}
                >
                  <div className={`p-3 rounded-xl ${systemTheme === 'work' ? 'bg-white/20' : (isDark ? 'bg-white/10 text-gray-400' : 'bg-gray-200 text-gray-500')} group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors`}>
                    <Briefcase size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold leading-none mb-1">Work Efficient</p>
                    <p className="text-[10px] opacity-60">Light mode, clean wallpaper, focus metrics</p>
                  </div>
                  {systemTheme === 'work' && <Sparkles size={16} className="text-white" />}
                </button>

                <button 
                  onClick={() => setSystemTheme('normal')}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left group ${systemTheme === 'normal' ? 'bg-white border-blue-500 shadow-md' : (isDark ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-gray-50 border-gray-100 hover:border-gray-200')}`}
                >
                  <div className={`p-3 rounded-xl ${systemTheme === 'normal' ? 'bg-blue-500 text-white' : (isDark ? 'bg-white/10 text-gray-400' : 'bg-gray-200 text-gray-500')} group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors`}>
                    <Monitor size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold leading-none mb-1">Standard Logic</p>
                    <p className="text-[10px] opacity-60">Win11 default style, no extra overlays</p>
                  </div>
                  {systemTheme === 'normal' && <Sparkles size={16} className="text-blue-600" />}
                </button>

                <button 
                  onClick={() => setSystemTheme('linux')}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left group ${systemTheme === 'linux' ? (isDark ? 'bg-red-600/20 border-red-500 shadow-lg ring-1 ring-red-500/20' : 'bg-[#1c1c1c] text-white border-red-500 shadow-md') : (isDark ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-gray-50 border-gray-100 hover:border-gray-200')}`}
                >
                  <div className={`p-3 rounded-xl ${systemTheme === 'linux' ? 'bg-red-600' : (isDark ? 'bg-white/10 text-gray-400' : 'bg-gray-200 text-gray-500')} group-hover:bg-red-600 transition-colors`}>
                    <Monitor size={24} className={systemTheme === 'linux' ? 'text-white' : ''} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-bold leading-none mb-1 ${systemTheme === 'linux' ? (isDark ? 'text-red-400' : 'text-white') : (isDark ? 'text-gray-300' : '')}`}>Debian GNOME</p>
                    <p className={`text-[10px] opacity-60 ${systemTheme === 'linux' && !isDark ? 'text-white/80' : ''}`}>Linux desktop, top bar layout, Debian theme</p>
                  </div>
                  {systemTheme === 'linux' && <Sparkles size={16} className={isDark ? 'text-red-400' : 'text-red-200'} />}
                </button>
              </div>
            </div>

            <div className={`p-6 rounded-xl border shadow-sm ${isDark ? 'bg-white/5 border-white/5' : 'bg-white'}`}>
              <h3 className="font-bold mb-4">Background Preview</h3>
              <div className={`aspect-video w-full rounded-lg bg-cover bg-center border ${isDark ? 'border-white/10' : 'border-gray-200'}`} style={{ backgroundImage: `url(${THEMES[systemTheme].wallpaper})` }}>
                <div className="w-full h-full bg-black/10 flex items-center justify-center">
                  <span className={`backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold shadow-sm ${isDark ? 'bg-black/60 text-white' : 'bg-white/90 text-black'}`}>{THEMES[systemTheme].name} Preview</span>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'Time' ? (
          <div className="flex flex-col gap-6">
            <div className={`p-6 rounded-xl border shadow-sm ${isDark ? 'bg-white/5 border-white/5' : 'bg-white'}`}>
              <h3 className="font-bold mb-4">{t.langRegion}</h3>
              <p className={`text-xs mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.langDesc}</p>
              
              <div className="space-y-2">
                {[
                  { id: 'pt', label: 'Português (Brasil)', flag: '🇧🇷' },
                  { id: 'pt-PT', label: 'Português (Portugal)', flag: '🇵🇹' },
                  { id: 'en', label: 'English (United States)', flag: '🇺🇸' },
                  { id: 'es', label: 'Español (España)', flag: '🇪🇸' },
                  { id: 'es-AR', label: 'Español (Argentina)', flag: '🇦🇷' },
                  { id: 'fr', label: 'Français (France)', flag: '🇫🇷' },
                  { id: 'it', label: 'Italiano (Italia)', flag: '🇮🇹' },
                  { id: 'de', label: 'Deutsch (Deutschland)', flag: '🇩🇪' },
                  { id: 'ru', label: 'Русский (Россия)', flag: '🇷🇺' },
                  { id: 'ja', label: '日本語 (日本)', flag: '🇯🇵' },
                  { id: 'ko', label: '한국어 (대한민국)', flag: '🇰🇷' },
                  { id: 'zh', label: '中文 (中国)', flag: '🇨🇳' },
                  { id: 'ar', label: 'العربية (مصر)', flag: '🇪🇬' },
                  { id: 'nl', label: 'Nederlands (Nederland)', flag: '🇳🇱' },
                  { id: 'pl', label: 'Polski (Polska)', flag: '🇵🇱' },
                  { id: 'tr', label: 'Türkçe (Türkiye)', flag: '🇹🇷' },
                  { id: 'hi', label: 'हिन्दी (भारत)', flag: '🇮🇳' },
                  { id: 'vi', label: 'Tiếng Việt (Việt Nam)', flag: '🇻🇳' },
                  { id: 'th', label: 'ไทย (ไทย)', flag: '🇹🇭' },
                  { id: 'sv', label: 'Svenska (Sverige)', flag: '🇸🇪' },
                  { id: 'no', label: 'Norsk (Norge)', flag: '🇳🇴' },
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id as Language)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${language === lang.id ? (isDark ? 'border-blue-500 bg-blue-900/10' : 'border-blue-500 bg-blue-50/50') : (isDark ? 'border-white/5 hover:bg-white/5' : 'hover:bg-gray-50')}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.label}</span>
                    </div>
                    {language === lang.id && <Check size={18} className="text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-xl border shadow-sm ${isDark ? 'bg-white/5 border-white/5' : 'bg-white'}`}>
              <h3 className="font-bold mb-4">{t.dateTime}</h3>
              <div className={`flex items-center justify-between p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <span className="text-sm">{t.setTimeAuto}</span>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'Privacy' ? (
          <div className="flex flex-col gap-6">
            <div className={`p-6 rounded-xl border shadow-sm ${isDark ? 'bg-white/5 border-white/5' : 'bg-white shadow-sm'}`}>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Shield size={20} className="text-blue-500" />
                Windows Security
              </h3>
              <div className="space-y-4">
                <div className={`flex items-center justify-between p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <div>
                    <p className="text-sm font-semibold">{t.protection}</p>
                    <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.protectionDesc}</p>
                    <p className="text-[9px] text-red-500/80 font-medium mt-1">Note: Does not detect MEMZ strain.</p>
                  </div>
                  <div 
                    onClick={() => setProtectionEnabled(!isProtectionEnabled)}
                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${isProtectionEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isProtectionEnabled ? 'right-1' : 'left-1'}`} />
                  </div>
                </div>

                <div className={`p-5 rounded-xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100'}`}>
                  <h4 className="text-xs font-bold mb-4">Virus & threat protection scans</h4>
                  
                  {isScanning ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Loader2 size={14} className="animate-spin text-blue-500" />
                          <span>Scanning... ({scanType === 'full' ? 'Full System' : 'Fast Scan'})</span>
                        </div>
                        <span className="font-mono">{Math.round(scanProgress)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-300" 
                          style={{ width: `${scanProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : isScanFinished ? (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                      <div className={`p-4 rounded-lg flex items-center justify-between ${foundViruses.length > 0 ? 'bg-red-500/10 border border-red-500/30' : 'bg-green-500/10 border border-green-500/30'}`}>
                        <div className="flex items-center gap-3">
                          {foundViruses.length > 0 ? (
                            <AlertTriangle size={20} className="text-red-500" />
                          ) : (
                            <ShieldCheck size={20} className="text-green-500" />
                          )}
                          <div>
                            <p className={`text-sm font-bold ${foundViruses.length > 0 ? 'text-red-500' : 'text-green-500'}`}>
                              {foundViruses.length > 0 ? `${foundViruses.length} threats found.` : 'No threats found.'}
                            </p>
                            <p className="text-[10px] opacity-70">Scan results based on current database.</p>
                          </div>
                        </div>
                        {foundViruses.length > 0 && (
                          <button 
                            onClick={removeFoundViruses}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-[10px] font-bold transition-all shadow-lg active:scale-95"
                          >
                            Clean Device
                          </button>
                        )}
                        {foundViruses.length === 0 && (
                          <button 
                             onClick={() => setIsScanFinished(false)}
                             className="text-[10px] opacity-60 hover:opacity-100 underline"
                          >
                            Dismiss
                          </button>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button 
                            onClick={() => startScan('fast')}
                            className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-lg text-xs font-bold transition-all ${isDark ? 'border-white/10 hover:bg-white/5' : 'hover:bg-gray-50'}`}
                        >
                            <Scan size={14} /> Fast Scan
                        </button>
                        <button 
                            onClick={() => startScan('full')}
                            className="flex-1 flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-lg active:scale-95"
                        >
                            <ShieldCheck size={14} /> Full Scan
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <button 
                        onClick={() => startScan('fast')}
                        className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all group ${isDark ? 'border-white/10 hover:bg-white/5' : 'hover:bg-gray-50'}`}
                      >
                        <Scan size={24} className="text-blue-500 group-hover:scale-110 transition-transform" />
                        <div className="text-center">
                          <p className="text-xs font-bold">Fast Scan</p>
                          <p className="text-[9px] opacity-50">Estimated: 30s (Basic Checks)</p>
                        </div>
                      </button>
                      <button 
                        onClick={() => startScan('full')}
                        className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all group ${isDark ? 'border-white/10 hover:bg-white/5' : 'hover:bg-gray-50'}`}
                      >
                        <ShieldCheck size={24} className="text-green-500 group-hover:scale-110 transition-transform" />
                        <div className="text-center">
                          <p className="text-xs font-bold">Full System Scan</p>
                          <p className="text-[9px] opacity-50">Estimated: 50s (Deep Cleaning)</p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                <div className={`p-4 border rounded-lg flex items-center gap-3 ${isDark ? 'bg-yellow-900/10 border-yellow-900/30' : 'border-yellow-200 bg-yellow-50'}`}>
                  <Shield size={20} className={isDark ? 'text-yellow-400' : 'text-yellow-600'} />
                  <p className={`text-xs ${isDark ? 'text-yellow-200' : 'text-yellow-800'}`}>
                    {isProtectionEnabled ? 'Real-time protection is active.' : 'Real-time protection is turned off, leaving your device vulnerable.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'About' ? (
          <div className="flex flex-col gap-6">
            <div className={`p-6 rounded-xl border shadow-sm ${isDark ? 'bg-white/5 border-white/5' : 'bg-white'}`}>
              <h3 className="font-bold mb-4">{t.deviceSpecs}</h3>
              <div className="grid grid-cols-[150px_1fr] gap-y-4 text-sm">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Device name</span>
                <span className="font-medium">WINDOWS-PC-ULTRA</span>
                
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Processor</span>
                <span className="font-medium">AMD Ryzen 7 21114 (123 Cores, 353 Threads)</span>
                
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Installed RAM</span>
                <span className="font-medium">1.00 TB</span>
                
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>GPU</span>
                <span className="font-medium">NVIDIA GeForce RTX 1090</span>
 
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>System type</span>
                <span className="font-medium">64-bit operating system, x64-based processor</span>
              </div>
            </div>
 
            <div className={`p-6 rounded-xl border shadow-sm ${isDark ? 'bg-white/5 border-white/5' : 'bg-white'}`}>
              <h3 className="font-bold mb-4">{t.winSpecs}</h3>
              <div className="grid grid-cols-[150px_1fr] gap-y-4 text-sm">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Edition</span>
                <span className="font-medium">Windows 11 Pro Ultra</span>
                
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Version</span>
                <span className="font-medium">24H2</span>
                
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Installed on</span>
                <span className="font-medium">04/07/2026</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
          <div className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-gray-100 hover:bg-gray-50'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                <Monitor size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold">Display</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Monitors, brightness, night light, display profile</p>
              </div>
            </div>
          </div>
          <div className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-gray-100 hover:bg-gray-50'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-orange-900/20 text-orange-400' : 'bg-orange-50 text-orange-600'}`}>
                <Volume2 size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold">Sound</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Volume levels, output devices, sound effects</p>
              </div>
            </div>
          </div>
          <div className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-gray-100 hover:bg-gray-50'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                <Battery size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold">Power & battery</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sleep, battery usage, power mode</p>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
