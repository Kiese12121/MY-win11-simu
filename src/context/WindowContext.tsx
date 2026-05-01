import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot, 
  updateDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  runTransaction,
  limit
} from 'firebase/firestore';

export type AppId = 'store' | 'explorer' | 'notepad' | 'calculator' | 'solitaire' | 'minesweeper' | 'paint' | 'settings' | 'edge' | 'copilot' | 'chatgpt' | 'gemini' | 'spotify' | 'whatsapp' | 'vscode' | 'discord' | 'taskmanager' | 'weather' | 'camera' | 'preview' | 'bank' | 'racing' | 'minecraft' | 'achievements' | 'win7simu' | 'cmd' | 'vmware' | 'vmware_pc' | 'debian' | 'guide' | 'distrosea';
export type Language = 'pt' | 'pt-PT' | 'en' | 'es' | 'es-AR' | 'fr' | 'it' | 'de' | 'ru' | 'ja' | 'ko' | 'zh' | 'ar' | 'nl' | 'pl' | 'tr' | 'hi' | 'vi' | 'th' | 'sv' | 'no';
export type GamePassPlan = 'none' | 'basic' | 'premium' | 'ultimate';
export type SystemTheme = 'gamer' | 'work' | 'normal' | 'linux';
export type Quality = 'low' | 'medium' | 'high' | '5k' | '6k' | '7k' | '8k' | '16k' | '32k' | '64k' | '120k';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface WindowContextType {
  windows: WindowState[];
  activeWindowId: AppId | null;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  maximizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  isAppInstalled: (id: AppId) => boolean;
  installApp: (id: AppId) => void;
  isGamePassSubscribed: boolean;
  gamePassPlan: GamePassPlan;
  credits: number;
  highestCredits: number;
  createdAt: string | null;
  isMinecraftOwned: boolean;
  isWin7SimuOwned: boolean;
  subscribeGamePass: (plan: GamePassPlan) => void;
  addCredits: (amount: number) => void;
  buyMinecraft: () => Promise<boolean>;
  buyWin7Simu: () => Promise<boolean>;
  isSystemDeleted: boolean;
  deleteSystem: () => void;
  repairSystem: () => void;
  isBooting: boolean;
  isLoggedIn: boolean;
  isPoweredOff: boolean;
  finishBoot: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  user: FirebaseUser | null;
  activateCheatCode: () => void;
  isCheatActive: boolean;
  isCMDSecretMode: boolean;
  achievements: { id: string; title: string; description: string; unlocked: boolean; unlockedAt?: string }[];
  unlockAchievement: (id: string) => void;
  recentActivity: { id: string; title: string; subtitle: string; amount: string; type: 'positive' | 'negative' }[];
  incomingRate: number;
  onlineUsers: { uid: string; email: string; lastSeen: any }[];
  donateCredits: (targetEmail: string, amount: number, targetUid?: string) => Promise<{ success: boolean; error?: string }>;
  powerOff: () => void;
  powerOn: () => void;
  restart: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isProtectionEnabled: boolean;
  setProtectionEnabled: (enabled: boolean) => void;
  activeViruses: ('memz' | 'noescape' | 'bonzi')[];
  addVirus: (virus: 'memz' | 'noescape' | 'bonzi') => void;
  removeVirus: (virus: 'memz' | 'noescape' | 'bonzi') => void;
  clearViruses: () => void;
  isSystemReinstalling: boolean;
  reinstallProgress: number;
  startReinstall: () => void;
  isSystemResetting: boolean;
  resetProgress: number;
  startReset: () => void;
  isNoEscapeFraud: boolean;
  isNoOsFound: boolean;
  isInstallingWindows: boolean;
  installProgress: number;
  insertCd: () => void;
  startInstall: () => void;
  selectDisk: () => void;
  isSelectingDisk: boolean;
  systemTheme: SystemTheme;
  setSystemTheme: (theme: SystemTheme) => void;
  quality: Quality;
  setQuality: (quality: Quality) => void;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const WindowProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<WindowState[]>([
    { id: 'store', title: 'Microsoft Store', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'explorer', title: 'File Explorer', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'notepad', title: 'Notepad', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'calculator', title: 'Calculator', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'solitaire', title: 'Solitaire', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'minesweeper', title: 'Minesweeper', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'paint', title: 'Paint', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'settings', title: 'Settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'edge', title: 'Microsoft Edge', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'copilot', title: 'Microsoft Copilot', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'chatgpt', title: 'ChatGPT', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'gemini', title: 'Google Gemini', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'spotify', title: 'Spotify', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'whatsapp', title: 'WhatsApp', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'vscode', title: 'Visual Studio Code', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'discord', title: 'Discord', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'taskmanager', title: 'Task Manager', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'weather', title: 'Weather', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'camera', title: 'Camera', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'preview', title: 'App Preview', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'bank', title: 'Bank', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'racing', title: 'Racing Game', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'minecraft', title: 'Minecraft Classic', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'achievements', title: 'Achievements', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'win7simu', title: 'Win7Simu', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'cmd', title: 'Command Prompt', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'vmware', title: 'VMware Workstation', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'vmware_pc', title: 'VMware PC', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'debian', title: 'Debian System', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'guide', title: 'Guia do Sistema', isOpen: true, isMinimized: false, isMaximized: false, zIndex: 11 },
  ]);

  const [installedApps, setInstalledApps] = useState<AppId[]>(['store', 'explorer', 'notepad', 'calculator', 'solitaire', 'minesweeper', 'paint', 'settings', 'edge', 'copilot', 'taskmanager', 'weather', 'camera', 'preview', 'bank', 'achievements', 'racing', 'cmd', 'vmware', 'vmware_pc', 'debian', 'guide']);
  const [isGamePassSubscribed, setIsGamePassSubscribed] = useState(false);
  const [gamePassPlan, setGamePassPlan] = useState<GamePassPlan>('none');
  const [credits, setCredits] = useState(0);
  const [highestCredits, setHighestCredits] = useState(0);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [isMinecraftOwned, setIsMinecraftOwned] = useState(false);
  const [isWin7SimuOwned, setIsWin7SimuOwned] = useState(false);
  const [isSystemDeleted, setIsSystemDeleted] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isPoweredOff, setIsPoweredOff] = useState(false);
  const [isCheatActive, setIsCheatActive] = useState(false);
  const [isCMDSecretMode, setIsCMDSecretMode] = useState(false);
  const [achievements, setAchievements] = useState([
    { id: 'cheat_activated', title: 'Código Secreto Ativado', description: 'Digite ??? no Bloco de Notas', unlocked: false },
    { id: '5000_cheats', title: '5000 Créditos com Cheats', description: 'Consiga 5000 créditos usando cheats', unlocked: false },
    { id: '5000_no_cheats', title: 'Eu tenho muito tempo livre', description: 'Consiga 5000 créditos sem usar cheats', unlocked: false },
    { id: '100000_no_cheats', title: 'Tempo não é problema', description: 'Consiga 100.000 créditos sem usar cheats', unlocked: false },
    { id: '100000_cheats', title: 'Eu amo cheats', description: 'Consiga 100.000 créditos usando cheats', unlocked: false },
    { id: '5h_active', title: 'Usuário Regular', description: 'Fique ativo por 5 horas', unlocked: false },
    { id: '10h_active', title: 'Cidadão Leal', description: 'Fique ativo por 10 horas', unlocked: false },
  ]);
  const [recentActivity, setRecentActivity] = useState<{ id: string; title: string; subtitle: string; amount: string; type: 'positive' | 'negative' }[]>([]);
  const [language, setLanguage] = useState<Language>('pt');
  const [isProtectionEnabled, setProtectionEnabled] = useState(true);
  const [activeViruses, setActiveViruses] = useState<('memz' | 'noescape' | 'bonzi')[]>([]);
  const [isSystemReinstalling, setIsSystemReinstalling] = useState(false);
  const [reinstallProgress, setReinstallProgress] = useState(0);
  const [isSystemResetting, setIsSystemResetting] = useState(false);
  const [resetProgress, setResetProgress] = useState(0);
  const [isNoEscapeFraud, setIsNoEscapeFraud] = useState(false);
  const [isNoOsFound, setIsNoOsFound] = useState(false);
  const [isInstallingWindows, setIsInstallingWindows] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [isSelectingDisk, setIsSelectingDisk] = useState(false);
  const [systemTheme, setSystemTheme] = useState<SystemTheme>('normal');
  const [quality, setQuality] = useState<Quality>('high');
  const [onlineUsers, setOnlineUsers] = useState<{ uid: string; email: string; lastSeen: any }[]>([]);

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoggedIn(!!firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const unlockAchievement = (id: string) => {
    setAchievements(prev => prev.map(ach => {
      if (ach.id === id && !ach.unlocked) {
        // Show notification or something?
        return { ...ach, unlocked: true, unlockedAt: new Date().toISOString() };
      }
      return ach;
    }));
  };

  // Firestore Sync Listener
  useEffect(() => {
    if (!user) {
      setOnlineUsers([]);
      return;
    }

    // Update last seen
    const userDocRef = doc(db, 'users', user.uid);
    const updateLastSeen = () => {
      updateDoc(userDocRef, { lastSeen: serverTimestamp() }).catch(() => {});
    };
    updateLastSeen();
    const lastSeenInterval = setInterval(updateLastSeen, 30000);

    // Listen to online users (last seen in the last 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const onlineQuery = query(
      collection(db, 'users'),
      where('lastSeen', '>=', fiveMinutesAgo),
      limit(20)
    );

    const unsubscribeOnline = onSnapshot(onlineQuery, (snapshot) => {
      const users = snapshot.docs
        .map(doc => ({ uid: doc.id, email: doc.data().email, lastSeen: doc.data().lastSeen }))
        .filter(u => u.uid !== user.uid);
      setOnlineUsers(users);
    }, (err) => {
      console.warn('Online users query failed (likely missing index):', err);
      // Don't throw here to avoid crashing the whole app for a background feature
      setOnlineUsers([]);
    });

    const unsubscribeSync = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        // If email is not lowercase, update it
        if (data.email && data.email !== data.email.toLowerCase()) {
          updateDoc(userDocRef, { email: data.email.toLowerCase() }).catch(() => {});
        }
        setCredits(data.credits || 0);
        if ((data.credits || 0) > highestCredits) {
          setHighestCredits(data.credits || 0);
        }
        if (data.highestCredits) {
          setHighestCredits(prev => Math.max(prev, data.highestCredits));
        }
        if (data.createdAt) {
          setCreatedAt(data.createdAt.toDate ? data.createdAt.toDate().toISOString() : data.createdAt);
        }
        setGamePassPlan(data.gamePassPlan || 'none');
        setIsGamePassSubscribed(data.gamePassPlan !== 'none');
        setIsMinecraftOwned(data.isMinecraftOwned || false);
        setIsWin7SimuOwned(data.isWin7SimuOwned || false);
        if (data.achievements) {
          // Merge existing achievements from DB with new ones defined in code
          setAchievements(prev => {
            const dbAchievements = data.achievements as any[];
            return prev.map(codeAch => {
              const dbAch = dbAchievements.find(a => a.id === codeAch.id);
              if (dbAch) {
                return { ...codeAch, ...dbAch };
              }
              return codeAch;
            });
          });
        }
        if (data.isMinecraftOwned && !installedApps.includes('minecraft')) {
          setInstalledApps(prev => [...prev, 'minecraft']);
        }
        if (data.isWin7SimuOwned && !installedApps.includes('win7simu')) {
          setInstalledApps(prev => [...prev, 'win7simu']);
        }
      } else {
        // Initialize user document if it doesn't exist
        setDoc(userDocRef, {
          email: user.email?.toLowerCase(),
          credits: 0,
          gamePassPlan: 'none',
          isMinecraftOwned: false,
          isWin7SimuOwned: false,
          achievements: achievements,
          createdAt: serverTimestamp(),
          lastSeen: serverTimestamp()
        }).catch(err => handleFirestoreError(err, OperationType.CREATE, `users/${user.uid}`));
      }
    }, (err) => handleFirestoreError(err, OperationType.GET, `users/${user.uid}`));

    return () => {
      clearInterval(lastSeenInterval);
      unsubscribeOnline();
      unsubscribeSync();
    };
  }, [user]);

  // Periodic Firestore Sync for Credits and Achievements
  useEffect(() => {
    if (!user || !isLoggedIn) return;

    const syncInterval = setInterval(async () => {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { 
          credits,
          highestCredits: Math.max(highestCredits, credits),
          achievements 
        });
      } catch (err) {
        // Silent fail for periodic sync to avoid spamming errors
      }
    }, 5000);

    return () => clearInterval(syncInterval);
  }, [user, isLoggedIn, credits, achievements]);

  // Achievement Logic
  useEffect(() => {
    if (credits >= 5000) {
      if (isCheatActive) {
        unlockAchievement('5000_cheats');
      } else {
        unlockAchievement('5000_no_cheats');
      }
    }
    if (credits >= 100000) {
      if (isCheatActive) {
        unlockAchievement('100000_cheats');
      } else {
        unlockAchievement('100000_no_cheats');
      }
    }
  }, [credits, isCheatActive]);

  // Time-based Achievement Logic
  useEffect(() => {
    if (!createdAt) return;
    const start = new Date(createdAt).getTime();
    
    const checkTime = () => {
      const now = new Date().getTime();
      const diffHours = (now - start) / (1000 * 60 * 60);
      
      if (diffHours >= 5) unlockAchievement('5h_active');
      if (diffHours >= 10) unlockAchievement('10h_active');
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [createdAt]);

  const addVirus = (virus: 'memz' | 'noescape' | 'bonzi') => {
    if (!activeViruses.includes(virus)) {
      setActiveViruses(prev => [...prev, virus]);
    }
  };

  const removeVirus = (virus: 'memz' | 'noescape' | 'bonzi') => {
    setActiveViruses(prev => prev.filter(v => v !== virus));
  };

  const clearViruses = () => setActiveViruses([]);
  const [activeWindowId, setActiveWindowId] = useState<AppId | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);

  const incomingRate = (windows.find(w => w.id === 'bank')?.isOpen ? 1 : 0) + (isCheatActive ? 50 : 0);

  const isAppInstalled = (id: AppId) => installedApps.includes(id);
  const installApp = (id: AppId) => {
    if (!installedApps.includes(id)) {
      setInstalledApps(prev => [...prev, id]);
    }
  };

  const openApp = (id: AppId) => {
    if (activeViruses.includes('noescape') && id !== 'taskmanager') {
      alert('hacked by nooescape');
      return;
    }

    let targetId = id;
    if (id === 'debian') {
      setSystemTheme('linux');
      targetId = 'settings';
    }

    setWindows(prev => prev.map(w => {
      if (w.id === targetId) {
        const newZ = maxZIndex + 1;
        setMaxZIndex(newZ);
        return { ...w, isOpen: true, isMinimized: false, zIndex: newZ };
      }
      return w;
    }));
    setActiveWindowId(targetId);
  };

  const closeApp = (id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false, isMinimized: false, isMaximized: false } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeApp = (id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const maximizeApp = (id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const focusApp = (id: AppId) => {
    const newZ = maxZIndex + 1;
    setMaxZIndex(newZ);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w));
    setActiveWindowId(id);
  };

  // Credit accumulation logic
  useEffect(() => {
    const interval = setInterval(() => {
      const isBankOpen = windows.find(w => w.id === 'bank')?.isOpen;
      if (!isPoweredOff && isLoggedIn) {
        let amountToAdd = 0;
        if (isBankOpen) amountToAdd += 1;
        if (isCheatActive) amountToAdd += 50;
        
        if (amountToAdd > 0) {
          setCredits(prev => prev + amountToAdd);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [windows, isPoweredOff, isLoggedIn, isCheatActive]);

  const subscribeGamePass = async (plan: GamePassPlan) => {
    setGamePassPlan(plan);
    setIsGamePassSubscribed(plan !== 'none');
    
    const planPrices = { basic: 1200, premium: 5600, ultimate: 12000, none: 0 };
    
    if (plan !== 'none') {
      setRecentActivity(prev => [
        {
          id: Math.random().toString(36).substr(2, 9),
          title: `Game Pass ${plan}`,
          subtitle: 'Subscription purchase',
          amount: `-${planPrices[plan].toLocaleString()} credits`,
          type: 'negative'
        },
        ...prev
      ]);
    }

    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { 
          gamePassPlan: plan,
          credits: credits // Sync current credits
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
      }
    }
  };

  const addCredits = (amount: number) => {
    setCredits(prev => prev + amount);
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      updateDoc(userDocRef, { credits: credits + amount }).catch(err => 
        handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`)
      );
    }
  };

  const donateCredits = async (targetEmail: string, amount: number, targetUid?: string) => {
    if (!user) return { success: false, error: 'Not logged in' };
    if (amount <= 0) return { success: false, error: 'Invalid amount' };
    if (credits < amount) return { success: false, error: 'Insufficient credits' };
    if (targetEmail.toLowerCase() === user.email?.toLowerCase()) return { success: false, error: 'Cannot donate to yourself' };

    try {
      let finalTargetUid = targetUid;

      if (!finalTargetUid) {
        // Find user by email
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', targetEmail.toLowerCase()), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // Try exact match just in case normalization hasn't happened yet
          const qExact = query(usersRef, where('email', '==', targetEmail), limit(1));
          const querySnapshotExact = await getDocs(qExact);
          
          if (querySnapshotExact.empty) {
            return { success: false, error: 'User not found' };
          }
          finalTargetUid = querySnapshotExact.docs[0].id;
        } else {
          finalTargetUid = querySnapshot.docs[0].id;
        }
      }

      await runTransaction(db, async (transaction) => {
        const senderDoc = await transaction.get(doc(db, 'users', user.uid));
        const receiverDoc = await transaction.get(doc(db, 'users', finalTargetUid!));

        if (!senderDoc.exists() || !receiverDoc.exists()) {
          throw new Error('User document missing');
        }

        const senderCredits = senderDoc.data().credits || 0;
        if (senderCredits < amount) {
          throw new Error('Insufficient credits');
        }

        transaction.update(doc(db, 'users', user.uid), {
          credits: senderCredits - amount
        });

        transaction.update(doc(db, 'users', targetUid), {
          credits: (receiverDoc.data().credits || 0) + amount
        });
      });

      setRecentActivity(prev => [
        {
          id: Math.random().toString(36).substr(2, 9),
          title: 'Donation Sent',
          subtitle: `To: ${targetEmail}`,
          amount: `-${amount.toLocaleString()} credits`,
          type: 'negative'
        },
        ...prev
      ]);

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const activateCheatCode = () => {
    if (!isCheatActive) {
      openApp('cmd');
      setIsCMDSecretMode(true);
      
      setTimeout(() => {
        setIsCMDSecretMode(false);
        setIsCheatActive(true);
        addCredits(1000);
        unlockAchievement('cheat_activated');
        setRecentActivity(prev => [
          {
            id: Math.random().toString(36).substr(2, 9),
            title: 'Secret Code',
            subtitle: 'Cheat code activated',
            amount: '+1000 credits and +50 per second',
            type: 'positive'
          },
          ...prev
        ]);
      }, 10000);
    }
  };

  const buyMinecraft = async () => {
    if (credits >= 17000) {
      const newCredits = credits - 17000;
      setCredits(newCredits);
      setIsMinecraftOwned(true);
      installApp('minecraft');
      
      setRecentActivity(prev => [
        {
          id: Math.random().toString(36).substr(2, 9),
          title: 'Minecraft Classic',
          subtitle: 'Game purchase',
          amount: '-17,000 credits',
          type: 'negative'
        },
        ...prev
      ]);

      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          await updateDoc(userDocRef, { 
            credits: newCredits,
            isMinecraftOwned: true 
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
        }
      }
      return true;
    }
    return false;
  };

  const buyWin7Simu = async () => {
    if (credits >= 100000 && !isWin7SimuOwned) {
      try {
        const newCredits = credits - 100000;
        setCredits(newCredits);
        setIsWin7SimuOwned(true);
        installApp('win7simu');
        
        setRecentActivity(prev => [
          {
            id: Math.random().toString(36).substr(2, 9),
            title: 'Win7Simu',
            subtitle: 'App purchase',
            amount: '-100,000 credits',
            type: 'negative'
          },
          ...prev
        ]);

        if (user) {
          try {
            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, { 
              credits: newCredits,
              isWin7SimuOwned: true 
            });
          } catch (err) {
            handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
          }
        }
        return true;
      } catch (err) {
        console.error('Error buying Win7Simu:', err);
        return false;
      }
    }
    return false;
  };

  const deleteSystem = () => {
    setIsSystemDeleted(true);
    // Close all windows
    setWindows(prev => prev.map(w => ({ ...w, isOpen: false, isMinimized: false, isMaximized: false })));
    setActiveWindowId(null);
    setIsLoggedIn(false);
  };

  const repairSystem = () => {
    setIsSystemDeleted(false);
    setIsBooting(true);
  };

  const finishBoot = () => setIsBooting(false);
  
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Special bonus for specific credentials
      if (email.toLowerCase() === 'isiltalane@gmail.com' && password === 'letsgrowagarden') {
        const userDocRef = doc(db, 'users', userCredential.user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const currentCredits = docSnap.data().credits || 0;
          await updateDoc(userDocRef, { credits: currentCredits + 20000 });
          
          setRecentActivity(prev => [
            {
              id: Math.random().toString(36).substr(2, 9),
              title: 'Login Bonus',
              subtitle: 'Special credentials detected',
              amount: '+20,000 credits',
              type: 'positive'
            },
            ...prev
          ]);
        }
      }
      
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Send verification email
      await sendEmailVerification(userCredential.user);
      
      // Initialize Firestore document
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userDocRef, {
        email: email.toLowerCase(),
        credits: 0,
        gamePassPlan: 'none',
        isMinecraftOwned: false,
        createdAt: serverTimestamp(),
        lastSeen: serverTimestamp()
      });
      
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const powerOff = () => {
    setIsPoweredOff(true);
    setIsLoggedIn(false);
    setWindows(prev => prev.map(w => ({ ...w, isOpen: false, isMinimized: false, isMaximized: false })));
    setActiveWindowId(null);
  };

  const powerOn = () => {
    setIsPoweredOff(false);
    setIsBooting(true);
  };

  const restart = () => {
    setIsLoggedIn(false);
    setWindows(prev => prev.map(w => ({ ...w, isOpen: false, isMinimized: false, isMaximized: false })));
    setActiveWindowId(null);
    setIsBooting(true);
  };

  const startReinstall = () => {
    setIsSystemReinstalling(true);
    setReinstallProgress(0);
    const interval = setInterval(() => {
      setReinstallProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSystemReinstalling(false);
            setActiveViruses([]);
            restart();
          }, 1000);
          return 100;
        }
        return prev + (100 / (120)); // 2 minutes = 120 seconds
      });
    }, 1000);
  };

  const startReset = () => {
    setIsSystemResetting(true);
    setResetProgress(0);
    const interval = setInterval(() => {
      setResetProgress(prev => {
        if (activeViruses.includes('noescape') && prev >= 66) {
          clearInterval(interval);
          setIsNoEscapeFraud(true);
          setTimeout(() => {
            setIsSystemResetting(false);
            setIsNoEscapeFraud(false);
            clearViruses();
            setIsSystemDeleted(false);
            restart();
            // Show No OS found after the boot screen (5s)
            setTimeout(() => {
              setIsNoOsFound(true);
            }, 5500);
          }, 4000);
          return 66;
        }
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSystemResetting(false);
            setActiveViruses([]);
            setIsSystemDeleted(false);
            restart();
          }, 1000);
          return 100;
        }
        return prev + (100 / 60); // 1 minute = 60 seconds
      });
    }, 1000);
  };

  const insertCd = () => {
    setIsNoOsFound(false);
    setIsSelectingDisk(true);
  };

  const selectDisk = () => {
    setIsSelectingDisk(false);
    startInstall();
  };

  const startInstall = () => {
    setIsInstallingWindows(true);
    setInstallProgress(0);
    const interval = setInterval(() => {
      setInstallProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsInstallingWindows(false);
            restart();
          }, 1000);
          return 100;
        }
        return prev + 10; // 10 seconds total
      });
    }, 1000);
  };

  return (
    <WindowContext.Provider value={{ 
      windows, 
      activeWindowId, 
      openApp, 
      closeApp, 
      minimizeApp, 
      maximizeApp, 
      focusApp, 
      isAppInstalled, 
      installApp, 
      isGamePassSubscribed, 
      gamePassPlan,
      credits,
      highestCredits,
      createdAt,
      isMinecraftOwned,
      isWin7SimuOwned,
      subscribeGamePass,
      addCredits,
      buyMinecraft,
      buyWin7Simu,
      isSystemDeleted,
      deleteSystem,
      repairSystem,
      isBooting,
      isLoggedIn,
      user,
      isPoweredOff,
      finishBoot,
      login,
      loginWithGoogle,
      register,
      logout,
      activateCheatCode,
      isCheatActive,
      isCMDSecretMode,
      achievements,
      unlockAchievement,
      recentActivity,
      incomingRate,
      onlineUsers,
      donateCredits,
      powerOff,
      powerOn,
      restart,
      language,
      setLanguage,
      isProtectionEnabled,
      setProtectionEnabled,
      activeViruses,
      addVirus,
      removeVirus,
      clearViruses,
      isSystemReinstalling,
      reinstallProgress,
      startReinstall,
      isSystemResetting,
      resetProgress,
      startReset,
      isNoEscapeFraud,
      isNoOsFound,
      isInstallingWindows,
      installProgress,
      insertCd,
      startInstall,
      selectDisk,
      isSelectingDisk,
      systemTheme,
      setSystemTheme,
      quality,
      setQuality
    }}>
      {children}
    </WindowContext.Provider>
  );
};

export const useWindows = () => {
  const context = useContext(WindowContext);
  if (!context) throw new Error('useWindows must be used within a WindowProvider');
  return context;
};
