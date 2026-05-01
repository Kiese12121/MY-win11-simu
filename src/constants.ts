import { AppId } from './context/WindowContext';

export interface AppMetadata {
  id: AppId;
  name: string;
  icon: string;
  lucideIcon?: string;
  requiresGamePass?: boolean;
  requiredPlan?: 'basic' | 'premium' | 'ultimate';
  isPinned?: boolean;
  isDesktop?: boolean;
}

export const APPS_METADATA: Record<AppId, AppMetadata> = {
  edge: {
    id: 'edge',
    name: 'Microsoft Edge',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg',
    lucideIcon: 'Globe',
    isPinned: true,
    isDesktop: true,
  },
  explorer: {
    id: 'explorer',
    name: 'File Explorer',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/File_Explorer_Icon_Windows_11.svg',
    lucideIcon: 'Folder',
    isPinned: true,
    isDesktop: true,
  },
  store: {
    id: 'store',
    name: 'Microsoft Store',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Store_logo.svg',
    lucideIcon: 'ShoppingBag',
    isPinned: true,
    isDesktop: true,
  },
  copilot: {
    id: 'copilot',
    name: 'Copilot',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Microsoft_Copilot_logo.svg',
    lucideIcon: 'Bot',
    isPinned: true,
    isDesktop: true,
  },
  notepad: {
    id: 'notepad',
    name: 'Notepad',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Notepad_Windows_11_icon.svg',
    lucideIcon: 'FileText',
    isPinned: true,
    isDesktop: true,
  },
  calculator: {
    id: 'calculator',
    name: 'Calculator',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Calculator_icon.svg',
    lucideIcon: 'Calculator',
    isPinned: true,
    isDesktop: true,
  },
  solitaire: {
    id: 'solitaire',
    name: 'Solitaire',
    icon: 'https://upload.wikimedia.org/wikipedia/en/5/5a/Microsoft_Solitaire_Collection_logo.png',
    lucideIcon: 'Gamepad2',
    requiresGamePass: true,
    requiredPlan: 'premium',
    isPinned: true,
    isDesktop: true,
  },
  minesweeper: {
    id: 'minesweeper',
    name: 'Minesweeper',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Minesweeper_Icon.svg/1024px-Minesweeper_Icon.svg.png',
    lucideIcon: 'Bomb',
    requiresGamePass: true,
    requiredPlan: 'basic',
    isPinned: true,
    isDesktop: true,
  },
  paint: {
    id: 'paint',
    name: 'Paint',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Microsoft_Paint_Icon.svg',
    lucideIcon: 'Palette',
    isPinned: true,
    isDesktop: true,
  },
  settings: {
    id: 'settings',
    name: 'Settings',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_Settings_icon.svg',
    lucideIcon: 'Settings',
    isPinned: true,
    isDesktop: true,
  },
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    lucideIcon: 'MessageSquare',
    isPinned: true,
    isDesktop: true,
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg',
    lucideIcon: 'Sparkles',
    isPinned: true,
    isDesktop: true,
  },
  spotify: {
    id: 'spotify',
    name: 'Spotify',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
    lucideIcon: 'Music',
    isPinned: true,
    isDesktop: true,
  },
  whatsapp: {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
    lucideIcon: 'MessageSquare',
    isPinned: true,
    isDesktop: true,
  },
  vscode: {
    id: 'vscode',
    name: 'VS Code',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg',
    lucideIcon: 'FileCode',
    isPinned: true,
    isDesktop: true,
  },
  discord: {
    id: 'discord',
    name: 'Discord',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Discord_Color_Text_Logo.svg',
    lucideIcon: 'MessageSquare',
    isPinned: true,
    isDesktop: true,
  },
  taskmanager: {
    id: 'taskmanager',
    name: 'Task Manager',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Task_Manager_Windows_11_Icon.svg',
    lucideIcon: 'LayoutGrid',
    isPinned: true,
    isDesktop: true,
  },
  weather: {
    id: 'weather',
    name: 'Weather',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Windows_Weather_icon.svg',
    lucideIcon: 'CloudSun',
    isPinned: true,
    isDesktop: true,
  },
  camera: {
    id: 'camera',
    name: 'Camera',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Windows_Camera_Icon.svg',
    lucideIcon: 'Camera',
    isPinned: true,
    isDesktop: true,
  },
  preview: {
    id: 'preview',
    name: 'App Preview',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Microsoft_Copilot_logo.svg', // Temporary icon
    lucideIcon: 'Play',
    isPinned: false,
    isDesktop: false,
  },
  bank: {
    id: 'bank',
    name: 'Bank',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Bank_Icon.svg',
    lucideIcon: 'Wallet',
    isPinned: true,
    isDesktop: true,
  },
  racing: {
    id: 'racing',
    name: 'Racing Game',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Racing_Car_Icon.svg',
    lucideIcon: 'Trophy',
    requiresGamePass: true,
    requiredPlan: 'ultimate',
    isPinned: true,
    isDesktop: true,
  },
  debian: {
    id: 'debian',
    name: 'Debian System',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Debian-OpenLogo.svg',
    lucideIcon: 'Info',
    isPinned: true,
    isDesktop: false,
  },
  guide: {
    id: 'guide',
    name: 'Guia do Sistema',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/A_help_icon.svg',
    lucideIcon: 'BookOpen',
    isPinned: true,
    isDesktop: true,
  },
  minecraft: {
    id: 'minecraft',
    name: 'Minecraft Classic',
    icon: 'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png',
    lucideIcon: 'Box',
    isPinned: true,
    isDesktop: true,
  },
  achievements: {
    id: 'achievements',
    name: 'Achievements',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Racing_Car_Icon.svg', // Placeholder
    lucideIcon: 'Trophy',
    isPinned: true,
    isDesktop: true,
  },
  win7simu: {
    id: 'win7simu',
    name: 'Win7Simu',
    icon: 'https://win7simu.visnalize.com/favicon.ico',
    lucideIcon: 'Monitor',
    isPinned: true,
    isDesktop: true,
  },
  cmd: {
    id: 'cmd',
    name: 'Command Prompt',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Task_Manager_Windows_11_Icon.svg', // Placeholder
    lucideIcon: 'Terminal',
    isPinned: true,
    isDesktop: true,
  },
  vmware: {
    id: 'vmware',
    name: 'VMware Workstation',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/VMware_Workstation_icon.svg/1024px-VMware_Workstation_icon.svg.png',
    lucideIcon: 'Monitor',
    isPinned: false,
    isDesktop: false,
  },
  vmware_pc: {
    id: 'vmware_pc',
    name: 'VMware PC',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/VMware_Workstation_icon.svg/1024px-VMware_Workstation_icon.svg.png',
    lucideIcon: 'Monitor',
    isPinned: true,
    isDesktop: true,
  },
  distrosea: {
    id: 'distrosea',
    name: 'DistroSea',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Debian-OpenLogo.svg',
    lucideIcon: 'Globe',
    isPinned: true,
    isDesktop: true,
  },
};

export const THEMES = {
  gamer: {
    name: 'Gamer Mode',
    wallpaper: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop',
    showFps: true,
    showStats: true,
    mode: 'dark' as const,
    darkMode: true,
    accentColor: 'text-purple-500',
    bgColor: 'bg-[#000000]'
  },
  work: {
    name: 'Work Mode',
    wallpaper: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop',
    showFps: false,
    showStats: false,
    mode: 'light' as const,
    darkMode: false,
    accentColor: 'text-blue-600',
    bgColor: 'bg-[#f5f5f7]'
  },
  normal: {
    name: 'Normal User',
    wallpaper: 'https://raw.githubusercontent.com/blueedgetechno/windows11/master/public/img/wallpaper/default/img0.jpg',
    showFps: false,
    showStats: false,
    mode: 'light' as const,
    darkMode: false,
    accentColor: 'text-blue-500',
    bgColor: 'bg-[#1a1a1a]'
  },
  linux: {
    name: 'Debian GNOME',
    wallpaper: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop', // Dark tech wallpaper
    showFps: false,
    showStats: false,
    mode: 'dark' as const,
    darkMode: true,
    accentColor: 'text-red-600',
    bgColor: 'bg-[#2d0922]' // Debian dark berry color
  }
} as const;
