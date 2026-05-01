import { ShoppingBag, Folder, FileText, Calculator as CalcIcon, Gamepad2, Settings as SettingsIcon, Globe, Palette, Bomb, Bot, Sparkles, MessageSquare, Music, LayoutGrid, FileCode, Play } from 'lucide-react';
import { useWindows } from './context/WindowContext';
import { APPS_METADATA, THEMES } from './constants';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import DynamicIcon from './components/DynamicIcon';
import GamePassGuard from './components/GamePassGuard';
import MicrosoftStore from './components/apps/MicrosoftStore';
import Minesweeper from './components/apps/Minesweeper';
import Paint from './components/apps/Paint';
import Notepad from './components/apps/Notepad';
import Calculator from './components/apps/Calculator';
import Solitaire from './components/apps/Solitaire';
import FileExplorer from './components/apps/FileExplorer';
import Settings from './components/apps/Settings';
import Edge from './components/apps/Edge';
import AIChat from './components/apps/AIChat';
import Spotify from './components/apps/Spotify';
import WhatsApp from './components/apps/WhatsApp';
import VSCode from './components/apps/VSCode';
import Discord from './components/apps/Discord';
import TaskManager from './components/apps/TaskManager';
import Weather from './components/apps/Weather';
import Camera from './components/apps/Camera';
import AppPreview from './components/apps/AppPreview';
import Bank from './components/apps/Bank';
import RacingGame from './components/apps/RacingGame';
import Minecraft from './components/apps/Minecraft';
import Achievements from './components/apps/Achievements';
import CMD from './components/apps/CMD';
import VMware from './components/apps/VMware';
import VMwarePC from './components/apps/VMwarePC';
import Guide from './components/apps/Guide';
import DistroSea from './components/apps/DistroSea';
import SystemRepairScreen from './components/SystemRepairScreen';
import BootScreen from './components/BootScreen';
import LoginScreen from './components/LoginScreen';
import PowerOffScreen from './components/PowerOffScreen';
import VirusOverlays from './components/VirusOverlays';
import SystemRecoveryScreens from './components/SystemRecoveryScreens';

export default function App() {
  const { openApp, isAppInstalled, isSystemDeleted, isBooting, isLoggedIn, isPoweredOff, language, activeViruses, systemTheme, quality } = useWindows();

  const desktopIcons = Object.values(APPS_METADATA).filter(app => app.isDesktop && isAppInstalled(app.id));

  const t = ({
    pt: {
      copilot: { msg: "Olá! Eu sou o Copilot. Como posso ajudar com o Windows ou suas tarefas hoje?", placeholder: "Pergunte-me qualquer coisa..." },
      chatgpt: { msg: "Olá! Eu sou o ChatGPT. Como posso ajudar você hoje?", placeholder: "Mensagem ChatGPT..." },
      gemini: { msg: "Olá! Eu sou o Gemini. Posso ajudar você a escrever, planejar, aprender e muito mais.", placeholder: "Digite um comando aqui" }
    },
    en: {
      copilot: { msg: "Hello! I'm Copilot. How can I help you with Windows or your tasks today?", placeholder: "Ask me anything..." },
      chatgpt: { msg: "Hello! I'm ChatGPT. How can I help you today?", placeholder: "Message ChatGPT..." },
      gemini: { msg: "Hi! I'm Gemini. I can help you write, plan, learn, and more.", placeholder: "Enter a prompt here" }
    },
    es: {
      copilot: { msg: "¡Hola! Soy Copilot. ¿Cómo posso ayudarte con Windows o tus tareas hoy?", placeholder: "Pregúntame lo que sea..." },
      chatgpt: { msg: "¡Hola! Soy ChatGPT. ¿Cómo posso ayudarte hoy?", placeholder: "Mensaje ChatGPT..." },
      gemini: { msg: "¡Hola! Soy Gemini. Puedo ayudarte a escribir, planificar, aprender e mucho más.", placeholder: "Introduce un comando aquí" }
    },
    'es-AR': {
      copilot: { msg: "¡Hola! Soy Copilot. ¿Cómo te puedo ayudar con Windows o tus tareas hoy?", placeholder: "Preguntame lo que sea..." },
      chatgpt: { msg: "¡Hola! Soy ChatGPT. ¿Cómo te puedo ayudar hoy?", placeholder: "Mensaje ChatGPT..." },
      gemini: { msg: "¡Hola! Soy Gemini. Te puedo ayudar a escribir, planear, aprender y mucho más.", placeholder: "Ingresa un comando acá" }
    },
    'pt-PT': {
      copilot: { msg: "Olá! Eu sou o Copilot. Como posso ajudar com o Windows ou as suas tarefas hoje?", placeholder: "Pergunte-me qualquer coisa..." },
      chatgpt: { msg: "Olá! Eu sou o ChatGPT. Como posso ajudar-vos hoje?", placeholder: "Mensagem ChatGPT..." },
      gemini: { msg: "Olá! Eu sou o Gemini. Posso ajudar-vos a escrever, planear, aprender e muito mais.", placeholder: "Digite um comando aqui" }
    },
    fr: {
      copilot: { msg: "Bonjour ! Je suis Copilot. Comment puis-je vous aider avec Windows ou vos tâches aujourd'hui ?", placeholder: "Demandez-moi n'importe quoi..." },
      chatgpt: { msg: "Bonjour ! Je suis ChatGPT. Comment puis-je vous aider aujourd'hui ?", placeholder: "Message ChatGPT..." },
      gemini: { msg: "Bonjour ! Je suis Gemini. Je peux vous aider à écrire, planifier, apprendre et plus encore.", placeholder: "Entrez une commande ici" }
    },
    it: {
      copilot: { msg: "Ciao! Sono Copilot. Come posso aiutarti con Windows o le tue attività oggi?", placeholder: "Chiedimi qualsiasi cosa..." },
      chatgpt: { msg: "Ciao! Sono ChatGPT. Come posso aiutarti oggi?", placeholder: "Messaggio ChatGPT..." },
      gemini: { msg: "Ciao! Sono Gemini. Posso aiutarti a scrivere, pianificare, imparare e altro ancora.", placeholder: "Inserisci un comando qui" }
    },
    de: {
      copilot: { msg: "Hallo! Ich bin Copilot. Wie kann ich dir heute mit Windows oder deinen Aufgaben helfen?", placeholder: "Frage mich alles..." },
      chatgpt: { msg: "Hallo! Ich bin ChatGPT. Wie kann ich dir heute helfen?", placeholder: "ChatGPT-Nachricht..." },
      gemini: { msg: "Hallo! Ich bin Gemini. Ich kann dir beim Schreiben, Planen, Lernen und mehr helfen.", placeholder: "Geben Sie hier einen Befehl ein" }
    },
    ru: {
      copilot: { msg: "Привет! Я Copilot. Чем я могу помочь вам с Windows или вашими задачами сегодня?", placeholder: "Спрашивайте о чем угодно..." },
      chatgpt: { msg: "Привет! Я ChatGPT. Чем я могу помочь вам сегодня?", placeholder: "Сообщение ChatGPT..." },
      gemini: { msg: "Привет! Я Gemini. Я могу помочь вам писать, планировать, учиться и многое другое.", placeholder: "Введите команду здесь" }
    },
    ja: {
      copilot: { msg: "こんにちは！Copilotです。Windowsや今日のタスクについて何かお手伝いしましょうか？", placeholder: "何でも聞いてください..." },
      chatgpt: { msg: "こんにちは！ChatGPTです。今日はどのようなご用件でしょうか？", placeholder: "ChatGPTにメッセージを送信..." },
      gemini: { msg: "こんにちは！Geminiです。執筆、計画、学習など、お手伝いします。", placeholder: "ここにプロンプトを入力してください" }
    },
    ko: {
      copilot: { msg: "안녕하세요! Copilot입니다. 오늘 Windows 또는 작업에 대해 어떻게 도와드릴까요?", placeholder: "무엇이든 물어보세요..." },
      chatgpt: { msg: "안녕하세요! ChatGPT입니다. 오늘 어떻게 도와드릴까요?", placeholder: "ChatGPT 메시지..." },
      gemini: { msg: "안녕하세요! Gemini입니다. 글쓰기, 계획, 학습 등을 도와드릴 수 있습니다.", placeholder: "여기에 명령을 입력하세요" }
    },
    zh: {
      copilot: { msg: "你好！我是 Copilot。今天我能在 Windows 或任务方面为您提供什么帮助？", placeholder: "问我任何问题..." },
      chatgpt: { msg: "你好！我是 ChatGPT。今天我能为您提供什么帮助？", placeholder: "发送消息给 ChatGPT..." },
      gemini: { msg: "你好！我是 Gemini。我可以帮你写作、规划、学习等。", placeholder: "在此处输入提示" }
    },
    ar: {
      copilot: { msg: "مرحباً! أنا Copilot. كيف يمكنني مساعدتك في Windows أو مهامك اليوم؟", placeholder: "اسألني عن أي شيء..." },
      chatgpt: { msg: "مرحباً! أنا ChatGPT. كيف يمكنني مساعدتك اليوم؟", placeholder: "رسالة ChatGPT..." },
      gemini: { msg: "مرحباً! أنا Gemini. يمكنني مساعدتك في الكتابة والتخطيط والتعلم وغير ذلك الكثير.", placeholder: "أدخل أمراً هنا" }
    },
    nl: {
      copilot: { msg: "Hallo! Ik ben Copilot. Hoe kan ik je vandaag helpen met Windows of je taken?", placeholder: "Vraag me alles..." },
      chatgpt: { msg: "Hallo! Ik ben ChatGPT. Hoe kan ik je vandaag helpen?", placeholder: "Bericht ChatGPT..." },
      gemini: { msg: "Hallo! Ik ben Gemini. Ik kan je helpen met schrijven, plannen, leren en meer.", placeholder: "Voer hier een opdracht in" }
    },
    pl: {
      copilot: { msg: "Cześć! Jestem Copilot. Jak mogę Ci dzisiaj pomóc w systemie Windows lub Twoich zadaniach?", placeholder: "Zapytaj mnie o cokolwiek..." },
      chatgpt: { msg: "Cześć! Jestem ChatGPT. Jak mogę Ci dzisiaj pomóc?", placeholder: "Wiadomość ChatGPT..." },
      gemini: { msg: "Cześć! Jestem Gemini. Mogę pomóc Ci w pisaniu, planowaniu, nauce i nie tylko.", placeholder: "Wprowadź polecenie tutaj" }
    },
    tr: {
      copilot: { msg: "Merhaba! Ben Copilot. Bugün Windows veya görevleriniz konusunda size nasıl yardımcı olabilirim?", placeholder: "Bana her şeyi sorabilirsiniz..." },
      chatgpt: { msg: "Merhaba! Ben ChatGPT. Bugün size nasıl yardımcı olabilirim?", placeholder: "ChatGPT'ye mesaj gönder..." },
      gemini: { msg: "Merhaba! Ben Gemini. Yazma, planlama, öğrenme ve daha fazlası konusunda size yardımcı olabilirim.", placeholder: "Buraya bir istem girin" }
    },
    hi: {
      copilot: { msg: "नमस्ते! मैं कोपायलट हूँ। आज मैं विंडोज या आपके कार्यों में आपकी क्या मदद कर सकता हूँ?", placeholder: "मुझसे कुछ भी पूछें..." },
      chatgpt: { msg: "नमस्ते! मैं चैटजीपीटी हूँ। आज मैं आपकी क्या मदद कर सकता हूँ?", placeholder: "ChatGPT को संदेश भेजें..." },
      gemini: { msg: "नमस्ते! मैं जेमिनी हूँ। मैं आपको लिखने, योजना बनाने, सीखने और बहुत कुछ करने में मदद कर सकता हूँ।", placeholder: "यहाँ एक प्रॉम्प्ट दर्ज करें" }
    },
    vi: {
      copilot: { msg: "Xin chào! Tôi là Copilot. Tôi có thể giúp gì cho bạn với Windows hoặc các tác vụ của bạn hôm nay?", placeholder: "Hỏi tôi bất cứ điều gì..." },
      chatgpt: { msg: "Xin chào! Tôi là ChatGPT. Tôi có thể giúp gì cho bạn hôm nay?", placeholder: "Gửi tin nhắn cho ChatGPT..." },
      gemini: { msg: "Xin chào! Tôi là Gemini. Tôi có thể giúp bạn viết, lập kế hoạch, học tập và hơn thế nữa.", placeholder: "Nhập lời nhắc tại đây" }
    },
    th: {
      copilot: { msg: "สวัสดี! ฉันคือ Copilot วันนี้ฉันจะช่วยคุณเรื่อง Windows หรือการทำงานของคุณได้อย่างไรบ้าง?", placeholder: "ถามฉันได้ทุกเรื่อง..." },
      chatgpt: { msg: "สวัสดี! ฉันคือ ChatGPT วันนี้มีอะไรให้ฉันช่วยไหม?", placeholder: "ส่งข้อความถึง ChatGPT..." },
      gemini: { msg: "สวัสดี! ฉันคือ Gemini ฉันสามารถช่วยคุณเขียน วางแผน เรียนรู้ และอื่นๆ อีกมากมาย", placeholder: "ป้อนคำสั่งที่นี่" }
    }
  } as Record<string, any>)[language] || (language.startsWith('pt') ? {
    copilot: { msg: "Olá! Eu sou o Copilot. Como posso ajudar com o Windows ou suas tarefas hoje?", placeholder: "Pergunte-me qualquer coisa..." },
    chatgpt: { msg: "Olá! Eu sou o ChatGPT. Como posso ajudar você hoje?", placeholder: "Mensagem ChatGPT..." },
    gemini: { msg: "Olá! Eu sou o Gemini. Posso ajudar você a escrever, planejar, aprender e muito mais.", placeholder: "Digite um comando aqui" }
  } : language.startsWith('es') ? {
    copilot: { msg: "¡Hola! Soy Copilot. ¿Cómo posso ayudarte con Windows o tus tareas hoy?", placeholder: "Pregúntame lo que sea..." },
    chatgpt: { msg: "¡Hola! Soy ChatGPT. ¿Cómo posso ayudarte hoy?", placeholder: "Mensaje ChatGPT..." },
    gemini: { msg: "¡Hola! Soy Gemini. Puedo ayudarte a escribir, planificar, aprender e mucho más.", placeholder: "Introduce un comando aquí" }
  } : language.startsWith('zh') ? {
    copilot: { msg: "你好！我是 Copilot。今天我能在 Windows 或任务方面为您提供什么帮助？", placeholder: "问我任何问题..." },
    chatgpt: { msg: "你好！我是 ChatGPT。今天我能为您提供什么帮助？", placeholder: "发送消息给 ChatGPT..." },
    gemini: { msg: "你好！我是 Gemini。我可以帮你写作、规划、学习等。", placeholder: "在此处输入提示" }
  } : {
    copilot: { msg: "Hello! I'm Copilot. How can I help you with Windows or your tasks today?", placeholder: "Ask me anything..." },
    chatgpt: { msg: "Hello! I'm ChatGPT. How can I help you today?", placeholder: "Message ChatGPT..." },
    gemini: { msg: "Hi! I'm Gemini. I can help you write, plan, learn, and more.", placeholder: "Enter a prompt here" }
  });

  const distroTitles: Record<string, string> = {
    pt: 'DistroSea',
    en: 'DistroSea',
    es: 'DistroSea',
    fr: 'DistroSea',
    it: 'DistroSea',
    de: 'DistroSea'
  };

  const windowTitles = ({
    pt: {
      store: 'Microsoft Store',
      explorer: 'Explorador de Arquivos',
      notepad: 'Bloco de Notas',
      calculator: 'Calculadora',
      solitaire: 'Paciência',
      settings: 'Configurações',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: 'Gerenciador de Tarefas',
      weather: 'Clima',
      camera: 'Câmera',
      preview: 'Visualização de App',
      minesweeper: 'Campo Minado',
      paint: 'Paint',
      bank: 'Banco',
      racing: 'Jogo de Corrida',
      minecraft: 'Minecraft Classic',
      achievements: 'Conquistas',
      cmd: 'Prompt de Comando',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: 'Guia do Sistema'
    },
    'pt-PT': {
      store: 'Microsoft Store',
      explorer: 'Explorador de Ficheiros',
      notepad: 'Bloco de Notas',
      calculator: 'Calculadora',
      solitaire: 'Paciência',
      settings: 'Definições',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: 'Gestor de Tarefas',
      weather: 'Meteorologia',
      camera: 'Câmara',
      preview: 'Visualização de Aplicação',
      minesweeper: 'Campo Minado',
      paint: 'Paint',
      bank: 'Banco',
      racing: 'Jogo de Corridas',
      minecraft: 'Minecraft Classic',
      achievements: 'Conquistas',
      cmd: 'Linha de Comandos',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: 'Guia do Sistema'
    },
    en: {
      store: 'Microsoft Store',
      explorer: 'File Explorer',
      notepad: 'Notepad',
      calculator: 'Calculator',
      solitaire: 'Solitaire',
      settings: 'Settings',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: 'Task Manager',
      weather: 'Weather',
      camera: 'Camera',
      preview: 'App Preview',
      minesweeper: 'Minesweeper',
      paint: 'Paint',
      bank: 'Bank',
      racing: 'Racing Game',
      minecraft: 'Minecraft Classic',
      achievements: 'Achievements',
      cmd: 'Command Prompt',
      distrosea: 'DistroSea (Debian 13)',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      guide: 'System Guide'
    },
    es: {
      store: 'Microsoft Store',
      explorer: 'Explorador de archivos',
      notepad: 'Bloc de notas',
      calculator: 'Calculadora',
      solitaire: 'Solitario',
      settings: 'Configuración',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: 'Administrador de tareas',
      weather: 'Clima',
      camera: 'Cámara',
      preview: 'Vista previa de la aplicación',
      minesweeper: 'Buscaminas',
      paint: 'Paint',
      bank: 'Banco',
      racing: 'Juego de Carreras',
      minecraft: 'Minecraft Classic',
      achievements: 'Logros',
      cmd: 'Símbolo del sistema',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: 'Guía del Sistema'
    },
    'es-AR': {
      store: 'Microsoft Store',
      explorer: 'Explorador de archivos',
      notepad: 'Bloc de notas',
      calculator: 'Calculadora',
      solitaire: 'Solitario',
      settings: 'Configuración',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: 'Administrador de tareas',
      weather: 'Clima',
      camera: 'Cámara',
      preview: 'Vista previa de la aplicación',
      minesweeper: 'Buscaminas',
      paint: 'Paint',
      bank: 'Banco',
      racing: 'Juego de carreras',
      minecraft: 'Minecraft Classic',
      achievements: 'Logros',
      cmd: 'Símbolo del sistema',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: 'Guía del sistema'
    },
    fr: {
      store: 'Microsoft Store',
      explorer: 'Explorateur de fichiers',
      notepad: 'Bloc-notes',
      calculator: 'Calculatrice',
      solitaire: 'Solitaire',
      settings: 'Paramètres',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: 'Gestionnaire des tâches',
      weather: 'Météo',
      camera: 'Appareil photo',
      preview: 'Aperçu de l\'application',
      minesweeper: 'Démineur',
      paint: 'Paint',
      bank: 'Banque',
      racing: 'Jeu de course',
      minecraft: 'Minecraft Classic',
      achievements: 'Succès',
      cmd: 'Invite de commande',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: 'Guide du système'
    },
    it: {
      store: 'Microsoft Store',
      explorer: 'Esplora file',
      notepad: 'Blocco note',
      calculator: 'Calcolatrice',
      solitaire: 'Solitario',
      settings: 'Impostazioni',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: 'Gestione attività',
      weather: 'Meteo',
      camera: 'Fotocamera',
      preview: 'Anteprima app',
      minesweeper: 'Prato fiorito',
      paint: 'Paint',
      bank: 'Banca',
      racing: 'Gioco di corse',
      minecraft: 'Minecraft Classic',
      achievements: 'Obiettivi',
      cmd: 'Prompt dei comandi',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: 'Guida del sistema'
    },
    de: {
      store: 'Microsoft Store',
      explorer: 'Datei-Explorer',
      notepad: 'Editor',
      calculator: 'Rechner',
      solitaire: 'Solitär',
      settings: 'Einstellungen',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: 'Task-Manager',
      weather: 'Wetter',
      camera: 'Kamera',
      preview: 'App-Vorschau',
      minesweeper: 'Minesweeper',
      paint: 'Paint',
      bank: 'Bank',
      racing: 'Rennspiel',
      minecraft: 'Minecraft Classic',
      achievements: 'Erfolge',
      cmd: 'Eingabeaufforderung',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: 'Systemhandbuch'
    },
    ru: {
      store: 'Microsoft Store',
      explorer: 'Проводник',
      notepad: 'Блокнот',
      calculator: 'Калькулятор',
      solitaire: 'Косынка',
      settings: 'Параметры',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: 'Диспетчер задач',
      weather: 'Погода',
      camera: 'Камера',
      preview: 'Предпросмотр приложения',
      minesweeper: 'Сапер',
      paint: 'Paint',
      bank: 'Банк',
      racing: 'Гонки',
      minecraft: 'Minecraft Classic',
      achievements: 'Достижения',
      cmd: 'Командная строка',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: 'Руководство пользователя'
    },
    ja: {
      store: 'Microsoft Store',
      explorer: 'エクスプローラー',
      notepad: 'メモ帳',
      calculator: '電卓',
      solitaire: 'ソリティア',
      settings: '設定',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: 'タスク マネージャー',
      weather: '天気',
      camera: 'カメラ',
      preview: 'アプリのプレビュー',
      minesweeper: 'マインスイーパー',
      paint: 'ペイント',
      bank: '銀行',
      racing: 'レーシング ゲーム',
      minecraft: 'Minecraft Classic',
      achievements: '実績',
      cmd: 'コマンド プロンプト',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: 'システム ガイド'
    },
    ko: {
      store: 'Microsoft Store',
      explorer: '파일 탐색기',
      notepad: '메모장',
      calculator: '계산기',
      solitaire: '소설테어',
      settings: '설정',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: '작업 관리자',
      weather: '날씨',
      camera: '카메라',
      preview: '앱 미리보기',
      minesweeper: '지뢰 찾기',
      paint: '그림판',
      bank: '은행',
      racing: '레이싱 게임',
      minecraft: 'Minecraft Classic',
      achievements: '업적',
      cmd: '명령 프롬프트',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: '시스템 가이드'
    },
    ar: {
      store: 'Microsoft Store',
      explorer: 'مستكشف الملفات',
      notepad: 'المفكرة',
      calculator: 'الحاسبة',
      solitaire: 'سوليتير',
      settings: 'الإعدادات',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: 'مدير المهام',
      weather: 'الطقس',
      camera: 'الكاميرا',
      preview: 'معاينة التطبيق',
      minesweeper: 'كنس الألغام',
      paint: 'الرسام',
      bank: 'البنك',
      racing: 'لعبة سباق',
      minecraft: 'ماين كرافت كلاسيك',
      achievements: 'الإنجازات',
      cmd: 'موجه الأوامر',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: 'دليل النظام'
    },
    nl: {
      store: 'Microsoft Store',
      explorer: 'Bestandsverkenner',
      notepad: 'Kladblok',
      calculator: 'Rekenmachine',
      solitaire: 'Solitaire',
      settings: 'Instellingen',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: 'Taakbeheer',
      weather: 'Weer',
      camera: 'Camera',
      preview: 'App-voorbeeld',
      minesweeper: 'Mijnenveger',
      paint: 'Paint',
      bank: 'Bank',
      racing: 'Racespel',
      minecraft: 'Minecraft Classic',
      achievements: 'Prestaties',
      cmd: 'Opdrachtprompt',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: 'Systeemgids'
    },
    pl: {
      store: 'Microsoft Store',
      explorer: 'Eksplorator plików',
      notepad: 'Notatnik',
      calculator: 'Kalkulator',
      solitaire: 'Pasjans',
      settings: 'Ustawienia',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: 'Menedżer zadań',
      weather: 'Pogoda',
      camera: 'Aparat',
      preview: 'Podgląd aplikacji',
      minesweeper: 'Saper',
      paint: 'Paint',
      bank: 'Bank',
      racing: 'Gra wyścigowa',
      minecraft: 'Minecraft Classic',
      achievements: 'Osiągnięcia',
      cmd: 'Wiersz polecenia',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: 'Przewodnik po systemie'
    },
    tr: {
      store: 'Microsoft Store',
      explorer: 'Dosya Gezgini',
      notepad: 'Not Defteri',
      calculator: 'Hesap Makinesi',
      solitaire: 'Solitaire',
      settings: 'Ayarlar',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: 'Görev Yöneticisi',
      weather: 'Hava Durumu',
      camera: 'Kamera',
      preview: 'Uygulama Önizlemesi',
      minesweeper: 'Mayın Tarlası',
      paint: 'Paint',
      bank: 'Banka',
      racing: 'Yarış Oyunu',
      minecraft: 'Minecraft Classic',
      achievements: 'Başarımlar',
      cmd: 'Komut İstemi',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: 'Sistem Kılavuzu'
    },
    hi: {
      store: 'Microsoft Store',
      explorer: 'फ़ाइल एक्सप्लोरर',
      notepad: 'नोटपैड',
      calculator: 'कैलकुलेटर',
      solitaire: 'सॉलिटेयर',
      settings: 'सेटिंग्स',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: 'टास्क मैनेजर',
      weather: 'मौसम',
      camera: 'कैमरा',
      preview: 'ऐप प्रीव्यू',
      minesweeper: 'माइनस्वीपर',
      paint: 'पेंट',
      bank: 'बैंक',
      racing: 'रेसिंग गेम',
      minecraft: 'माइनक्राफ्ट क्लासिक',
      achievements: 'उपलब्धियां',
      cmd: 'कमांड प्रॉम्प्ट',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: 'सिस्टम गाइड'
    },
    vi: {
      store: 'Microsoft Store',
      explorer: 'Trình khám phá tệp',
      notepad: 'Sổ ghi chép',
      calculator: 'Máy tính',
      solitaire: 'Xếp bài',
      settings: 'Cài đặt',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: 'Trình quản lý tác vụ',
      weather: 'Thời tiết',
      camera: 'Máy ảnh',
      preview: 'Xem trước ứng dụng',
      minesweeper: 'Dò mìn',
      paint: 'Paint',
      bank: 'Ngân hàng',
      racing: 'Trò chơi đua xe',
      minecraft: 'Minecraft Classic',
      achievements: 'Thành tích',
      cmd: 'Dấu nhắc lệnh',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: 'Hướng dẫn hệ thống'
    },
    th: {
      store: 'Microsoft Store',
      explorer: 'ตัวสำรวจไฟล์',
      notepad: 'แผ่นจดบันทึก',
      calculator: 'เครื่องคิดเลข',
      solitaire: 'โซลิแทร์',
      settings: 'การตั้งค่า',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: 'ตัวจัดการงาน',
      weather: 'สภาพอากาศ',
      camera: 'กล้อง',
      preview: 'ดูตัวอย่างแอป',
      minesweeper: 'ไมน์สวีปเปอร์',
      paint: 'Paint',
      bank: 'ธนาคาร',
      racing: 'เกมแข่งรถ',
      minecraft: 'Minecraft Classic',
      achievements: 'ความสำเร็จ',
      cmd: 'พร้อมท์คำสั่ง',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: 'คู่มือระบบ'
    },
    zh: {
      store: '微软商店',
      explorer: '文件资源管理器',
      notepad: '记事本',
      calculator: '计算器',
      solitaire: '纸牌',
      settings: '设置',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: '任务管理器',
      weather: '天气',
      camera: '相机',
      preview: '应用预览',
      minesweeper: '扫雷',
      paint: '画图',
      bank: '银行',
      racing: '赛车游戏',
      minecraft: '我的世界经典版',
      achievements: '成就',
      cmd: '命令提示符',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: '系统指南'
    },
    sv: {
      store: 'Microsoft Store',
      explorer: 'Filutforskaren',
      notepad: 'Anteckningar',
      calculator: 'Kalkylatorn',
      solitaire: 'Patiens',
      settings: 'Inställningar',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: 'Aktivitetshanteraren',
      weather: 'Väder',
      camera: 'Kamera',
      preview: 'App-förhandsvisning',
      minesweeper: 'Röj',
      paint: 'Paint',
      bank: 'Bank',
      racing: 'Racingspel',
      minecraft: 'Minecraft Classic',
      achievements: 'Prestationer',
      cmd: 'Kommandotolken',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: 'Systemguide'
    },
    no: {
      store: 'Microsoft Store',
      explorer: 'Filutforsker',
      notepad: 'Notisblokk',
      calculator: 'Kalkulator',
      solitaire: 'Kortspill',
      settings: 'Innstillinger',
      edge: 'Microsoft Edge',
      copilot: 'Microsoft Copilot',
      chatgpt: 'ChatGPT',
      gemini: 'Google Gemini',
      spotify: 'Spotify',
      whatsapp: 'WhatsApp',
      vscode: 'Visual Studio Code',
      discord: 'Discord',
      taskmanager: 'Oppgavebehandling',
      weather: 'Vær',
      camera: 'Kamera',
      preview: 'App-forhåndsvisning',
      minesweeper: 'Minerydder',
      paint: 'Paint',
      bank: 'Bank',
      racing: 'Racing-spill',
      minecraft: 'Minecraft Classic',
      achievements: 'Prestasjoner',
      cmd: 'Ledetekst',
      vmware: 'VMware Workstation',
      vmware_pc: 'VMware PC',
      distrosea: 'DistroSea',
      guide: 'Systemguide'
    }
  } as Record<string, any>)[language] || (language.startsWith('pt') ? {
    store: 'Microsoft Store',
    explorer: 'Explorador de Arquivos',
    notepad: 'Bloco de Notas',
    calculator: 'Calculadora',
    solitaire: 'Paciência',
    settings: 'Configurações',
    edge: 'Microsoft Edge',
    copilot: 'Microsoft Copilot',
    chatgpt: 'ChatGPT',
    gemini: 'Google Gemini',
    spotify: 'Spotify',
    whatsapp: 'WhatsApp',
    vscode: 'Visual Studio Code',
    discord: 'Discord',
    taskmanager: 'Gerenciador de Tarefas',
    weather: 'Clima',
    camera: 'Câmera',
    preview: 'Visualização de App',
    minesweeper: 'Campo Minado',
    paint: 'Paint',
    bank: 'Banco',
    racing: 'Jogo de Corrida',
    minecraft: 'Minecraft Classic',
    achievements: 'Conquistas',
    cmd: 'Prompt de Comando',
    vmware: 'VMware Workstation',
    vmware_pc: 'VMware PC',
    distrosea: 'DistroSea',
    guide: 'Guia do Sistema'
  } : language.startsWith('es') ? {
    store: 'Microsoft Store',
    explorer: 'Explorador de archivos',
    notepad: 'Bloc de notas',
    calculator: 'Calculadora',
    solitaire: 'Solitario',
    settings: 'Configuración',
    edge: 'Microsoft Edge',
    copilot: 'Microsoft Copilot',
    chatgpt: 'ChatGPT',
    gemini: 'Google Gemini',
    spotify: 'Spotify',
    whatsapp: 'WhatsApp',
    vscode: 'Visual Studio Code',
    discord: 'Discord',
    taskmanager: 'Administrador de tareas',
    weather: 'Clima',
    camera: 'Cámara',
    preview: 'Vista previa de la aplicación',
    minesweeper: 'Buscaminas',
    paint: 'Paint',
    bank: 'Banco',
    racing: 'Juego de Carreras',
    minecraft: 'Minecraft Classic',
    achievements: 'Logros',
    cmd: 'Símbolo del sistema',
    vmware: 'VMware Workstation',
    vmware_pc: 'VMware PC',
    distrosea: 'DistroSea',
    guide: 'Guía del Sistema'
  } : language.startsWith('fr') ? {
    store: 'Microsoft Store',
    explorer: 'Explorateur de fichiers',
    notepad: 'Bloc-notes',
    calculator: 'Calculatrice',
    solitaire: 'Solitaire',
    settings: 'Paramètres',
    edge: 'Microsoft Edge',
    copilot: 'Microsoft Copilot',
    chatgpt: 'ChatGPT',
    gemini: 'Google Gemini',
    spotify: 'Spotify',
    whatsapp: 'WhatsApp',
    vscode: 'Visual Studio Code',
    discord: 'Discord',
    taskmanager: 'Gestionnaire des tâches',
    weather: 'Météo',
    camera: 'Appareil photo',
    preview: 'Aperçu de l\'application',
    minesweeper: 'Démineur',
    paint: 'Paint',
    bank: 'Banque',
    racing: 'Jeu de course',
    minecraft: 'Minecraft Classic',
    achievements: 'Succès',
    cmd: 'Invite de commandes',
    vmware: 'VMware Workstation',
    vmware_pc: 'VMware PC',
    distrosea: 'DistroSea',
    guide: 'Guide du système'
  } : language.startsWith('it') ? {
    store: 'Microsoft Store',
    explorer: 'Esplora file',
    notepad: 'Blocco note',
    calculator: 'Calcolatrice',
    solitaire: 'Solitario',
    settings: 'Impostazioni',
    edge: 'Microsoft Edge',
    copilot: 'Microsoft Copilot',
    chatgpt: 'ChatGPT',
    gemini: 'Google Gemini',
    spotify: 'Spotify',
    whatsapp: 'WhatsApp',
    vscode: 'Visual Studio Code',
    discord: 'Discord',
    taskmanager: 'Gestione attività',
    weather: 'Meteo',
    camera: 'Fotocamera',
    preview: 'Anteprima app',
    minesweeper: 'Prato fiorito',
    paint: 'Paint',
    bank: 'Banca',
    racing: 'Gioco di corse',
    minecraft: 'Minecraft Classic',
    achievements: 'Obiettivi',
    cmd: 'Prompt dei comandi',
    vmware: 'VMware Workstation',
    vmware_pc: 'VMware PC',
    distrosea: 'DistroSea',
    guide: 'Guida del sistema'
  } : language.startsWith('de') ? {
    store: 'Microsoft Store',
    explorer: 'Datei-Explorer',
    notepad: 'Editor',
    calculator: 'Rechner',
    solitaire: 'Solitär',
    settings: 'Einstellungen',
    edge: 'Microsoft Edge',
    copilot: 'Microsoft Copilot',
    chatgpt: 'ChatGPT',
    gemini: 'Google Gemini',
    spotify: 'Spotify',
    whatsapp: 'WhatsApp',
    vscode: 'Visual Studio Code',
    discord: 'Discord',
    taskmanager: 'Task-Manager',
    weather: 'Wetter',
    camera: 'Kamera',
    preview: 'App-Vorschau',
    minesweeper: 'Minesweeper',
    paint: 'Paint',
    bank: 'Bank',
    racing: 'Rennspiel',
    minecraft: 'Minecraft Classic',
    achievements: 'Erfolge',
    cmd: 'Eingabeaufforderung',
    vmware: 'VMware Workstation',
    vmware_pc: 'VMware PC',
    distrosea: 'DistroSea',
    guide: 'Systemhandbuch'
  } : language.startsWith('ru') ? {
    store: 'Microsoft Store',
    explorer: 'Проводник',
    notepad: 'Блокнот',
    calculator: 'Калькулятор',
    solitaire: 'Косынка',
    settings: 'Параметры',
    edge: 'Microsoft Edge',
    copilot: 'Microsoft Copilot',
    chatgpt: 'ChatGPT',
    gemini: 'Google Gemini',
    spotify: 'Spotify',
    whatsapp: 'WhatsApp',
    vscode: 'Visual Studio Code',
    discord: 'Discord',
    taskmanager: 'Диспетчер задач',
    weather: 'Погода',
    camera: 'Камера',
    preview: 'Предпросмотр приложения',
    minesweeper: 'Сапер',
    paint: 'Paint',
    bank: 'Банк',
    racing: 'Гонки',
    minecraft: 'Minecraft Classic',
    achievements: 'Достижения',
    cmd: 'Командная строка',
    vmware: 'VMware Workstation',
    vmware_pc: 'VMware PC',
    distrosea: 'DistroSea',
    guide: 'Руководство пользователя'
  } : language.startsWith('ja') ? {
    store: 'Microsoft Store',
    explorer: 'エクスプローラー',
    notepad: 'メモ帳',
    calculator: '電卓',
    solitaire: 'ソリティア',
    settings: '設定',
    edge: 'Microsoft Edge',
    copilot: 'Microsoft Copilot',
    chatgpt: 'ChatGPT',
    gemini: 'Google Gemini',
    spotify: 'Spotify',
    whatsapp: 'WhatsApp',
    vscode: 'Visual Studio Code',
    discord: 'Discord',
    taskmanager: 'タスク マネージャー',
    weather: '天気',
    camera: 'カメラ',
    preview: 'アプリのプレビュー',
    minesweeper: 'マインスイーパー',
    paint: 'ペイント',
    bank: '銀行',
    racing: 'レーシング ゲーム',
    minecraft: 'Minecraft Classic',
    achievements: '実績',
    cmd: 'コマンド プロンプト',
    vmware: 'VMware Workstation',
    vmware_pc: 'VMware PC',
    distrosea: 'DistroSea',
    guide: '系统 ガイド'
  } : language.startsWith('zh') ? {
    store: '微软商店',
    explorer: '文件资源管理器',
    notepad: '记事本',
    calculator: '计算器',
    solitaire: '纸牌',
    settings: '设置',
    edge: 'Microsoft Edge',
    copilot: 'Microsoft Copilot',
    chatgpt: 'ChatGPT',
    gemini: 'Google Gemini',
    spotify: 'Spotify',
    whatsapp: 'WhatsApp',
    vscode: 'Visual Studio Code',
    discord: 'Discord',
    taskmanager: '任务管理器',
    weather: '天气',
    camera: '相机',
    preview: '应用预览',
    minesweeper: '扫雷',
    paint: '画图',
    bank: '银行',
    racing: '赛车游戏',
    minecraft: '我的世界经典版',
    achievements: '成就',
    cmd: '命令提示符',
    vmware: 'VMware Workstation',
    vmware_pc: 'VMware PC',
    distrosea: 'DistroSea',
    guide: '系统指南'
  } : {
    store: 'Microsoft Store',
    explorer: 'File Explorer',
    notepad: 'Notepad',
    calculator: 'Calculator',
    solitaire: 'Solitaire',
    settings: 'Settings',
    distrosea: 'DistroSea',
    edge: 'Microsoft Edge',
    copilot: 'Microsoft Copilot',
    chatgpt: 'ChatGPT',
    gemini: 'Google Gemini',
    spotify: 'Spotify',
    whatsapp: 'WhatsApp',
    vscode: 'Visual Studio Code',
    discord: 'Discord',
    taskmanager: 'Task Manager',
    weather: 'Weather',
    camera: 'Camera',
    preview: 'App Preview',
    minesweeper: 'Minesweeper',
    paint: 'Paint',
    bank: 'Bank',
    racing: 'Racing Game',
    minecraft: 'Minecraft Classic',
    achievements: 'Achievements',
    cmd: 'Command Prompt',
    vmware: 'VMware Workstation',
    vmware_pc: 'VMware PC',
    guide: 'System Guide'
  });

  if (isPoweredOff) return <PowerOffScreen />;

  const qualityConfigs = {
    low: { scale: 1.25, size: 80 },
    medium: { scale: 1.0, size: 100 },
    high: { scale: 0.8, size: 125 },
    '5k': { scale: 0.6, size: 166.6 },
    '6k': { scale: 0.53, size: 188.6 },
    '7k': { scale: 0.46, size: 217.3 },
    '8k': { scale: 0.4, size: 250 },
    '16k': { scale: 0.2, size: 500 },
    '32k': { scale: 0.1, size: 1000 },
    '64k': { scale: 0.05, size: 2000 },
    '120k': { scale: 0.025, size: 4000 }
  };

  const currentQuality = qualityConfigs[quality as keyof typeof qualityConfigs];
  
  return (
    <div className="bg-black h-screen w-screen overflow-hidden">
      <VirusOverlays />
      <SystemRecoveryScreens />
      {isSystemDeleted ? <SystemRepairScreen /> : isBooting ? <BootScreen /> : !isLoggedIn ? <LoginScreen /> : (
        <div 
          className={`overflow-hidden bg-cover bg-center absolute top-0 left-0 select-none transition-all duration-500 origin-top-left ${THEMES[systemTheme].mode === 'dark' ? 'brightness-75' : ''}`}
          style={{ 
            backgroundImage: `url("${THEMES[systemTheme].wallpaper}")`,
            width: `${currentQuality.size}vw`,
            height: `${currentQuality.size}vh`,
            transform: `scale(${currentQuality.scale})`
          }}
        >
          {/* Gamer Mode Overlays */}
          {THEMES[systemTheme].showFps && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
              <div className="bg-black/60 backdrop-blur-md border border-green-500/30 px-4 py-1 rounded-full flex items-center gap-3 shadow-lg">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-green-400 font-mono">144 FPS</span>
                </div>
                <div className="h-3 w-[1px] bg-white/10" />
                <span className="text-[9px] text-white/60 font-medium tracking-tight uppercase">Gamer Mode Active</span>
              </div>
            </div>
          )}

          {THEMES[systemTheme].showStats && (
            <div className="absolute top-4 right-4 z-[9999] pointer-events-none flex flex-col gap-1 items-end">
              <div className="bg-black/40 backdrop-blur-sm border border-white/5 px-2 py-0.5 rounded text-[9px] text-white/50 font-mono">
                CPU: 12% | RAM: 4.2GB
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-white/5 px-2 py-0.5 rounded text-[9px] text-white/50 font-mono">
                GPU: 34% | VRAM: 2.1GB
              </div>
            </div>
          )}

          {/* Desktop Icons */}
          <div className={`p-4 grid grid-flow-col grid-rows-[repeat(auto-fill,100px)] gap-4 w-fit transition-all ${systemTheme === 'linux' ? 'pt-16 h-screen' : 'h-[calc(100vh-48px)]'} overflow-visible`}>
        <button
          onDoubleClick={() => openApp('debian')}
          className="w-24 h-24 flex flex-col items-center justify-center gap-1 hover:bg-white/10 rounded-lg transition-all group"
        >
          <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform relative">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Debian-OpenLogo.svg" className="w-full h-full object-contain filter drop-shadow-lg" referrerPolicy="no-referrer" />
          </div>
          <span className="text-[11px] text-white text-shadow font-medium text-center px-1 leading-tight">
            Debian System
          </span>
        </button>
        {activeViruses.includes('bonzi') && (
          <button
            onDoubleClick={() => alert("HELLO! I'M BONZI!")}
            className="w-24 h-24 flex flex-col items-center justify-center gap-1 hover:bg-white/10 rounded-lg transition-all group"
          >
            <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform relative">
              <img src="https://web.archive.org/web/20010401123456im_/http://www.bonzi.com/bonzibuddy/images/bonzi.gif" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <span className="text-[11px] text-white text-shadow font-medium text-center px-1 leading-tight">
              BonziBuddy
            </span>
          </button>
        )}
        {desktopIcons.map((icon) => (
          <button
            key={icon.id}
            onDoubleClick={() => openApp(icon.id as any)}
            className="w-24 h-24 flex flex-col items-center justify-center gap-1 hover:bg-white/10 rounded-lg transition-all group"
          >
            <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform relative">
              <DynamicIcon 
                src={icon.icon} 
                name={icon.name} 
                lucideName={icon.lucideIcon} 
                className="w-full h-full object-contain" 
              />
            </div>
            <span className="text-[11px] text-white text-shadow font-medium text-center px-1 leading-tight">
              {windowTitles[icon.id as keyof typeof windowTitles] || icon.name}
            </span>
          </button>
        ))}
      </div>

      {/* Windows */}
      <Window id="store" title={windowTitles.store} icon={<img src={APPS_METADATA.store.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={1000} defaultHeight={700}>
        <MicrosoftStore />
      </Window>
      
      <Window id="explorer" title={windowTitles.explorer} icon={<img src={APPS_METADATA.explorer.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />}>
        <FileExplorer />
      </Window>
 
      <Window id="notepad" title={windowTitles.notepad} icon={<img src={APPS_METADATA.notepad.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={600} defaultHeight={400}>
        <Notepad />
      </Window>
 
      <Window id="calculator" title={windowTitles.calculator} icon={<img src={APPS_METADATA.calculator.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={320} defaultHeight={480}>
        <Calculator />
      </Window>
 
      <Window id="solitaire" title={windowTitles.solitaire} icon={<img src={APPS_METADATA.solitaire.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={900} defaultHeight={650}>
        <GamePassGuard gameName="Solitaire" requiredPlan="premium">
          <Solitaire />
        </GamePassGuard>
      </Window>
 
      <Window id="settings" title={windowTitles.settings} icon={<img src={APPS_METADATA.settings.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={900} defaultHeight={650}>
        <Settings />
      </Window>
 
      <Window id="edge" title={windowTitles.edge} icon={<img src={APPS_METADATA.edge.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={1100} defaultHeight={750}>
        <Edge />
      </Window>
 
      <Window id="copilot" title={windowTitles.copilot} icon={<img src={APPS_METADATA.copilot.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={500} defaultHeight={700}>
        <AIChat 
          name="Copilot" 
          color="bg-gradient-to-r from-blue-600 to-cyan-500" 
          icon={<img src={APPS_METADATA.copilot.icon} className="w-5 h-5" referrerPolicy="no-referrer" />} 
          initialMessage={t.copilot.msg}
          placeholder={t.copilot.placeholder}
        />
      </Window>
 
      <Window id="chatgpt" title={windowTitles.chatgpt} icon={<img src={APPS_METADATA.chatgpt.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={800} defaultHeight={650}>
        <AIChat 
          name="ChatGPT" 
          color="bg-[#10a37f]" 
          icon={<img src={APPS_METADATA.chatgpt.icon} className="w-5 h-5" referrerPolicy="no-referrer" />} 
          initialMessage={t.chatgpt.msg}
          placeholder={t.chatgpt.placeholder}
        />
      </Window>
 
      <Window id="gemini" title={windowTitles.gemini} icon={<img src={APPS_METADATA.gemini.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={900} defaultHeight={700}>
        <AIChat 
          name="Gemini" 
          color="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" 
          icon={<img src={APPS_METADATA.gemini.icon} className="w-5 h-5" referrerPolicy="no-referrer" />} 
          initialMessage={t.gemini.msg}
          placeholder={t.gemini.placeholder}
        />
      </Window>
 
      <Window id="spotify" title={windowTitles.spotify} icon={<img src={APPS_METADATA.spotify.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={1000} defaultHeight={700}>
        <Spotify />
      </Window>
 
      <Window id="whatsapp" title={windowTitles.whatsapp} icon={<img src={APPS_METADATA.whatsapp.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={1000} defaultHeight={700}>
        <WhatsApp />
      </Window>
 
      <Window id="vscode" title={windowTitles.vscode} icon={<img src={APPS_METADATA.vscode.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={1100} defaultHeight={750}>
        <VSCode />
      </Window>
 
      <Window id="discord" title={windowTitles.discord} icon={<img src={APPS_METADATA.discord.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={1100} defaultHeight={750}>
        <Discord />
      </Window>
 
      <Window id="taskmanager" title={windowTitles.taskmanager} icon={<img src={APPS_METADATA.taskmanager.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={800} defaultHeight={600}>
        <TaskManager />
      </Window>
 
      <Window id="weather" title={windowTitles.weather} icon={<img src={APPS_METADATA.weather.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={900} defaultHeight={650}>
        <Weather />
      </Window>
 
      <Window id="camera" title={windowTitles.camera} icon={<img src={APPS_METADATA.camera.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={800} defaultHeight={600}>
        <Camera />
      </Window>
 
      <Window id="preview" title={windowTitles.preview} icon={<Play size={14} className="text-green-500" />} defaultWidth={800} defaultHeight={600}>
        <AppPreview />
      </Window>
 
      <Window id="guide" title={windowTitles.guide} icon={<img src={APPS_METADATA.guide.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={800} defaultHeight={600}>
        <Guide />
      </Window>

      <Window id="minesweeper" title={windowTitles.minesweeper} icon={<img src={APPS_METADATA.minesweeper.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={400} defaultHeight={500}>
        <GamePassGuard gameName="Minesweeper" requiredPlan="basic">
          <Minesweeper />
        </GamePassGuard>
      </Window>

      <Window id="bank" title={windowTitles.bank} icon={<DynamicIcon lucideName="Wallet" size={14} className="text-blue-600" />} defaultWidth={800} defaultHeight={600}>
        <Bank />
      </Window>

      <Window id="racing" title={windowTitles.racing} icon={<DynamicIcon lucideName="Trophy" size={14} className="text-yellow-600" />} defaultWidth={900} defaultHeight={700}>
        <GamePassGuard gameName="Racing Game" requiredPlan="ultimate">
          <RacingGame />
        </GamePassGuard>
      </Window>

      <Window id="minecraft" title={windowTitles.minecraft} icon={<img src={APPS_METADATA.minecraft.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={1000} defaultHeight={750}>
        <Minecraft />
      </Window>

      <Window id="achievements" title={windowTitles.achievements} icon={<DynamicIcon lucideName="Trophy" size={14} className="text-orange-500" />} defaultWidth={600} defaultHeight={700}>
        <Achievements />
      </Window>

      <Window id="cmd" title={windowTitles.cmd} icon={<DynamicIcon lucideName="Terminal" size={14} className="text-gray-400" />} defaultWidth={700} defaultHeight={450}>
        <CMD />
      </Window>

      <Window id="vmware" title={windowTitles.vmware} icon={<img src={APPS_METADATA.vmware.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={1100} defaultHeight={800}>
        <VMware />
      </Window>

      <Window id="vmware_pc" title={windowTitles.vmware_pc} icon={<img src={APPS_METADATA.vmware_pc.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={800} defaultHeight={600}>
        <VMwarePC />
      </Window>

      <Window id="distrosea" title={windowTitles.distrosea} icon={<Globe size={14} className="text-indigo-400" />} defaultWidth={1100} defaultHeight={750}>
        <DistroSea />
      </Window>

      <Window id="win7simu" title="Win7Simu" icon={<DynamicIcon lucideName="Monitor" size={14} className="text-blue-400" />} defaultWidth={1024} defaultHeight={768}>
        <div className="w-full h-full bg-black relative group">
          <iframe 
            src="https://win7simu.visnalize.com/" 
            className="w-full h-full border-none"
            title="Win7Simu"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <p className="mb-4 text-center px-8">If the simulator doesn't load, it might be blocked by your browser's security settings.</p>
            <button 
              onClick={() => window.open('https://win7simu.visnalize.com/', '_blank')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold pointer-events-auto transition-all active:scale-95"
            >
              Open in New Tab
            </button>
          </div>
        </div>
      </Window>
 
      <Window id="paint" title={windowTitles.paint} icon={<img src={APPS_METADATA.paint.icon} className="w-3.5 h-3.5" referrerPolicy="no-referrer" />} defaultWidth={1000} defaultHeight={700}>
        <Paint />
      </Window>

      <Taskbar />

      <style>{`
        .text-shadow {
          text-shadow: 0 1px 2px rgba(0,0,0,0.8);
        }
      `}</style>
    </div>
    )}
    </div>
  );
}
