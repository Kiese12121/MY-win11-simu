import React, { useState, useEffect } from 'react';
import { useWindows } from '../../context/WindowContext';
import { APPS_METADATA, THEMES } from '../../constants';
import { Activity, LayoutGrid, Cpu, MemoryStick as Memory, HardDrive, Monitor } from 'lucide-react';

export default function TaskManager() {
  const { windows, deleteSystem, language, activeViruses, systemTheme } = useWindows();
  const [activeTab, setActiveTab] = useState<'processes' | 'performance'>('processes');
  const isDark = THEMES[systemTheme].mode === 'dark';
  const [cpuUsage, setCpuUsage] = useState(0);
  const [ramUsage, setRamUsage] = useState(0);
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);

  const t = ({
    pt: {
      processes: 'Processos',
      performance: 'Desempenho',
      cpu: 'CPU',
      memory: 'Memória',
      name: 'Nome',
      status: 'Status',
      running: 'Executando',
      background: 'Segundo plano',
      endTask: 'Finalizar tarefa',
      system: 'Sistema',
      dwm: 'Gerenciador de Janelas da Área de Trabalho'
    },
    en: {
      processes: 'Processes',
      performance: 'Performance',
      cpu: 'CPU',
      memory: 'Memory',
      name: 'Name',
      status: 'Status',
      running: 'Running',
      background: 'Background',
      endTask: 'End task',
      system: 'System',
      dwm: 'Desktop Window Manager'
    },
    es: {
      processes: 'Procesos',
      performance: 'Rendimiento',
      cpu: 'CPU',
      memory: 'Memoria',
      name: 'Nombre',
      status: 'Estado',
      running: 'En ejecución',
      background: 'Segundo plano',
      endTask: 'Finalizar tarea',
      system: 'Sistema',
      dwm: 'Administrador de ventanas de escritorio'
    },
    it: {
      processes: 'Processi',
      performance: 'Prestazioni',
      cpu: 'CPU',
      memory: 'Memoria',
      name: 'Nome',
      status: 'Stato',
      running: 'In esecuzione',
      background: 'In background',
      endTask: 'Termina attività',
      system: 'Sistema',
      dwm: 'Desktop Window Manager'
    },
    de: {
      processes: 'Prozesse',
      performance: 'Leistung',
      cpu: 'CPU',
      memory: 'Arbeitsspeicher',
      name: 'Name',
      status: 'Status',
      running: 'Wird ausgeführt',
      background: 'Hintergrund',
      endTask: 'Task beenden',
      system: 'System',
      dwm: 'Desktopfenster-Manager'
    },
    ru: {
      processes: 'Процессы',
      performance: 'Производительность',
      cpu: 'ЦП',
      memory: 'Память',
      name: 'Имя',
      status: 'Состояние',
      running: 'Выполняется',
      background: 'Фоновый режим',
      endTask: 'Снять задачу',
      system: 'Система',
      dwm: 'Диспетчер окон рабочего стола'
    },
    ja: {
      processes: 'プロセス',
      performance: 'パフォーマンス',
      cpu: 'CPU',
      memory: 'メモリ',
      name: '名前',
      status: '状態',
      running: '実行中',
      background: 'バックグラウンド',
      endTask: 'タスクの終了',
      system: 'システム',
      dwm: 'デスクトップ ウィンドウ マネージャー'
    },
    ko: {
      processes: '프로세스',
      performance: '성능',
      cpu: 'CPU',
      memory: '메모리',
      name: '이름',
      status: '상태',
      running: '실행 중',
      background: '백그라운드',
      endTask: '작업 끝내기',
      system: '시스템',
      dwm: '데스크톱 창 관리자'
    },
    zh: {
      processes: '进程',
      performance: '性能',
      cpu: '中央处理器',
      memory: '内存',
      name: '名称',
      status: '状态',
      running: '正在运行',
      background: '后台',
      endTask: '结束任务',
      system: '系统',
      dwm: '桌面窗口管理'
    },
    ar: {
      processes: 'العمليات',
      performance: 'الأداء',
      cpu: 'وحدة المعالجة المركزية',
      memory: 'الذاكرة',
      name: 'الاسم',
      status: 'الحالة',
      running: 'قيد التشغيل',
      background: 'خلفية',
      endTask: 'إنهاء المهمة',
      system: 'النظام',
      dwm: 'مدير نافذة سطح المكتب'
    },
    nl: {
      processes: 'Processen',
      performance: 'Prestaties',
      cpu: 'CPU',
      memory: 'Geheugen',
      name: 'Naam',
      status: 'Status',
      running: 'Wordt uitgevoerd',
      background: 'Achtergrond',
      endTask: 'Taak beëindigen',
      system: 'Systeem',
      dwm: 'Bureaubladvensterbeheer'
    },
    pl: {
      processes: 'Procesy',
      performance: 'Wydajność',
      cpu: 'Procesor',
      memory: 'Pamięć',
      name: 'Nazwa',
      status: 'Stan',
      running: 'Uruchomiony',
      background: 'W tle',
      endTask: 'Zakończ zadanie',
      system: 'System',
      dwm: 'Menedżer okien pulpitu'
    },
    tr: {
      processes: 'İşlemler',
      performance: 'Performans',
      cpu: 'CPU',
      memory: 'Bellek',
      name: 'Ad',
      status: 'Durum',
      running: 'Çalışıyor',
      background: 'Arka Plan',
      endTask: 'Görevi sonlandır',
      system: 'Sistem',
      dwm: 'Masaüstü Pencere Yöneticisi'
    },
    hi: {
      processes: 'प्रक्रियाएं',
      performance: 'प्रदर्शन',
      cpu: 'CPU',
      memory: 'मेमोरी',
      name: 'नाम',
      status: 'स्थिति',
      running: 'चल रहा है',
      background: 'बैकग्राउंड',
      endTask: 'कार्य समाप्त करें',
      system: 'सिस्टम',
      dwm: 'डेस्कटॉप विंडो मैनेजर'
    },
    vi: {
      processes: 'Tiến trình',
      performance: 'Hiệu năng',
      cpu: 'CPU',
      memory: 'Bộ nhớ',
      name: 'Tên',
      status: 'Trạng thái',
      running: 'Đang chạy',
      background: 'Nền',
      endTask: 'Kết thúc nhiệm vụ',
      system: 'Hệ thống',
      dwm: 'Trình quản lý cửa sổ máy tính để bàn'
    },
    th: {
      processes: 'กระบวนการ',
      performance: 'ประสิทธิภาพ',
      cpu: 'CPU',
      memory: 'หน่วยความจำ',
      name: 'ชื่อ',
      status: 'สถานะ',
      running: 'กำลังทำงาน',
      background: 'เบื้องหลัง',
      endTask: 'จบภารกิจ',
      system: 'ระบบ',
      dwm: 'ตัวจัดการหน้าต่างเดสก์ท็อป'
    },
    fr: {
      processes: 'Processus',
      performance: 'Performance',
      cpu: 'Processeur',
      memory: 'Mémoire',
      name: 'Nom',
      status: 'Statut',
      running: 'En cours d\'exécution',
      background: 'Arrière-plan',
      endTask: 'Fin de tâche',
      system: 'Système',
      dwm: 'Gestionnaire de fenêtres du bureau'
    }
  } as Record<string, any>)[language] || (language.startsWith('pt') ? {
    processes: 'Processos',
    performance: 'Desempenho',
    cpu: 'CPU',
    memory: 'Memória',
    name: 'Nome',
    status: 'Status',
    running: 'Executando',
    background: 'Segundo plano',
    endTask: 'Finalizar tarefa',
    system: 'Sistema',
    dwm: 'Gerenciador de Janelas da Área de Trabalho'
  } : language.startsWith('es') ? {
    processes: 'Procesos',
    performance: 'Rendimiento',
    cpu: 'CPU',
    memory: 'Memoria',
    name: 'Nombre',
    status: 'Estado',
    running: 'En ejecución',
    background: 'Segundo plano',
    endTask: 'Finalizar tarea',
    system: 'Sistema',
    dwm: 'Administrador de ventanas de escritorio'
  } : language.startsWith('fr') ? {
    processes: 'Processus',
    performance: 'Performance',
    cpu: 'Processeur',
    memory: 'Mémoire',
    name: 'Nom',
    status: 'Statut',
    running: 'En cours d\'exécution',
    background: 'Arrière-plan',
    endTask: 'Fin de tâche',
    system: 'Système',
    dwm: 'Gestionnaire de fenêtres du bureau'
  } : language.startsWith('zh') ? {
    processes: '进程',
    performance: '性能',
    cpu: '中央处理器',
    memory: '内存',
    name: '名称',
    status: '状态',
    running: '正在运行',
    background: '后台',
    endTask: '结束任务',
    system: '系统',
    dwm: '桌面窗口管理'
  } : {
    processes: 'Processes',
    performance: 'Performance',
    cpu: 'CPU',
    memory: 'Memory',
    name: 'Name',
    status: 'Status',
    running: 'Running',
    background: 'Background',
    endTask: 'End task',
    system: 'System',
    dwm: 'Desktop Window Manager'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 5) + 1);
      setRamUsage(Math.floor(Math.random() * 2) + 12);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleEndTask = () => {
    if (selectedProcess === 'System') {
      deleteSystem();
    }
  };

  const openWindows = windows.filter(w => w.isOpen);

  return (
    <div className={`h-full flex flex-col text-sm select-none transition-colors ${isDark ? 'bg-[#1a1c1e] text-white' : 'bg-[#f3f3f3] text-black'}`}>
      {/* Sidebar */}
      <div className="flex h-full">
        <div className={`w-12 flex flex-col items-center py-4 border-r gap-4 transition-colors ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-gray-200'}`}>
          <button 
            onClick={() => setActiveTab('processes')}
            className={`p-2 rounded-lg transition-all ${activeTab === 'processes' ? (isDark ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-50 text-blue-600') : (isDark ? 'hover:bg-white/10 text-gray-500' : 'hover:bg-gray-100 text-gray-500')}`}
            title={t.processes}
          >
            <LayoutGrid size={20} />
          </button>
          <button 
            onClick={() => setActiveTab('performance')}
            className={`p-2 rounded-lg transition-all ${activeTab === 'performance' ? (isDark ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-50 text-blue-600') : (isDark ? 'hover:bg-white/10 text-gray-500' : 'hover:bg-gray-100 text-gray-500')}`}
            title={t.performance}
          >
            <Activity size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeTab === 'processes' ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className={`p-4 border-b flex justify-between items-center transition-colors ${isDark ? 'bg-white/5 border-white/5' : 'bg-white'}`}>
                <h2 className="font-semibold text-lg">{t.processes}</h2>
                <div className={`flex gap-8 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className="flex flex-col items-end">
                    <span>{t.cpu}</span>
                    <span className={`font-bold ${isDark ? 'text-blue-400' : 'text-black'}`}>{cpuUsage}%</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span>{t.memory}</span>
                    <span className={`font-bold ${isDark ? 'text-purple-400' : 'text-black'}`}>{ramUsage}%</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                  <thead className={`sticky top-0 border-b z-10 ${isDark ? 'bg-[#1a1c1e] border-white/5' : 'bg-[#f3f3f3]'}`}>
                    <tr>
                      <th className={`p-2 font-normal border-r ${isDark ? 'text-gray-400 border-white/5' : 'text-gray-600'}`}>{t.name}</th>
                      <th className={`p-2 font-normal border-r w-20 text-right ${isDark ? 'text-gray-400 border-white/5' : 'text-gray-600'}`}>{t.status}</th>
                      <th className={`p-2 font-normal border-r w-20 text-right ${isDark ? 'text-gray-400 border-white/5' : 'text-gray-600'}`}>{t.cpu}</th>
                      <th className={`p-2 font-normal w-24 text-right ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.memory}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {openWindows.map(app => (
                      <tr 
                        key={app.id} 
                        onClick={() => setSelectedProcess(app.id)}
                        className={`border-b transition-colors group cursor-pointer ${
                          selectedProcess === app.id 
                            ? (isDark ? 'bg-blue-900/30' : 'bg-blue-100') 
                            : (isDark ? 'hover:bg-white/5 bg-transparent border-white/5' : 'hover:bg-blue-50/50 bg-white border-gray-100')
                        }`}
                      >
                        <td className="p-2 flex items-center gap-2">
                          <img src={APPS_METADATA[app.id].icon} className="w-4 h-4" referrerPolicy="no-referrer" />
                          <span>{APPS_METADATA[app.id].name}</span>
                        </td>
                        <td className={`p-2 text-right text-xs ${isDark ? 'text-green-400' : 'text-green-600'}`}>{t.running}</td>
                        <td className={`p-2 text-right ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{(Math.random() * 1.5).toFixed(1)}%</td>
                        <td className={`p-2 text-right ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{(Math.random() * 150 + 50).toFixed(0)} MB</td>
                      </tr>
                    ))}
                    {/* System processes */}
                    <tr 
                      onClick={() => setSelectedProcess('System')}
                      className={`border-b transition-colors group cursor-pointer ${
                        selectedProcess === 'System' 
                          ? (isDark ? 'bg-blue-900/30' : 'bg-blue-100') 
                          : (isDark ? 'hover:bg-white/5 bg-transparent border-white/5' : 'hover:bg-blue-50/50 bg-white border-gray-100')
                      }`}
                    >
                      <td className="p-2 flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-sm" />
                        <span>{t.system}</span>
                      </td>
                      <td className={`p-2 text-right text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{t.background}</td>
                      <td className={`p-2 text-right ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>0.1%</td>
                      <td className={`p-2 text-right ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>28.4 MB</td>
                    </tr>
                    <tr 
                      onClick={() => setSelectedProcess('DWM')}
                      className={`border-b transition-colors group cursor-pointer ${
                        selectedProcess === 'DWM' 
                          ? (isDark ? 'bg-blue-900/30' : 'bg-blue-100') 
                          : (isDark ? 'hover:bg-white/5 bg-transparent border-white/5' : 'hover:bg-blue-50/50 bg-white border-gray-100')
                      }`}
                    >
                      <td className="p-2 flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-400 rounded-sm" />
                        <span>{t.dwm}</span>
                      </td>
                      <td className={`p-2 text-right text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{t.background}</td>
                      <td className={`p-2 text-right ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>0.4%</td>
                      <td className={`p-2 text-right ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>142.1 MB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden p-6 gap-6">
              <h2 className="font-semibold text-lg">{t.performance}</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {/* CPU */}
                <div className={`p-4 rounded-xl border flex gap-4 items-center shadow-sm transition-colors ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100'}`}>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                    <Cpu size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold">CPU</span>
                      <span className={`font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{cpuUsage}%</span>
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>AMD Ryzen 7 21114</div>
                    <div className={`text-[10px] mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>123 Cores • 353 Threads</div>
                  </div>
                </div>

                {/* Memory */}
                <div className={`p-4 rounded-xl border flex gap-4 items-center shadow-sm transition-colors ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100'}`}>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                    <Memory size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold">Memory</span>
                      <span className={`font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>12.4 GB / 1 TB</span>
                    </div>
                    <div className={`w-full h-1.5 rounded-full mt-2 overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                      <div className="bg-purple-500 h-full w-[1.2%]" />
                    </div>
                  </div>
                </div>

                {/* Disk */}
                <div className={`p-4 rounded-xl border flex gap-4 items-center shadow-sm transition-colors ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100'}`}>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-green-900/20 text-green-400' : 'bg-green-50 text-green-600'}`}>
                    <HardDrive size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold">Disk 0 (C:)</span>
                      <span className={`font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>0%</span>
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>NVMe SSD</div>
                    <div className={`text-[10px] mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Capacity: 1.0 PB</div>
                  </div>
                </div>

                {/* GPU */}
                <div className={`p-4 rounded-xl border flex gap-4 items-center shadow-sm transition-colors ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100'}`}>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-orange-900/20 text-orange-400' : 'bg-orange-50 text-orange-600'}`}>
                    <Monitor size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold">GPU 0</span>
                      <span className={`font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>2%</span>
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>NVIDIA GeForce RTX 1090</div>
                    <div className={`text-[10px] mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Dedicated GPU Memory: 256 GB</div>
                  </div>
                </div>
              </div>

              {/* Graph Placeholder */}
              <div className={`flex-1 border rounded-xl p-4 flex flex-col shadow-sm transition-colors ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100'}`}>
                <div className="flex justify-between items-center mb-4">
                  <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>CPU Usage History</span>
                  <span className="text-xs text-gray-400">60 Seconds</span>
                </div>
                <div className="flex-1 flex items-end gap-1">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 border-t ${isDark ? 'bg-blue-400/10 border-blue-400' : 'bg-blue-500/20 border-blue-500'}`} 
                      style={{ height: `${Math.random() * 30 + 10}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className={`p-2 border-t flex justify-end gap-2 transition-colors ${isDark ? 'bg-[#1a1c1e] border-white/5' : 'bg-white border-gray-200'}`}>
        <button 
          onClick={handleEndTask}
          disabled={!selectedProcess}
          className={`px-4 py-1 border rounded transition-colors ${
            selectedProcess 
              ? (isDark ? 'bg-white/10 text-white border-white/10 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50' : 'hover:bg-gray-100 bg-white text-black border-gray-200') 
              : (isDark ? 'bg-white/5 text-gray-600 border-white/5' : 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-100')
          }`}
        >
          {t.endTask}
        </button>
      </div>
    </div>
  );
}
