import { useState } from 'react';
import { BookOpen, Monitor, Layout, MousePointer2, Settings, ShieldAlert, Cpu, Trophy, Play, Box, ChevronRight, HelpCircle, Gamepad2, Briefcase, Palette } from 'lucide-react';
import { useWindows } from '../../context/WindowContext';

export default function Guide() {
  const { language } = useWindows();
  const [activeTab, setActiveTab] = useState('Basic');

  const t = {
    pt: {
      title: 'Guia do Sistema Emulado',
      subtitle: 'Aprenda a tirar o máximo proveito desta experiência Desktop',
      tabs: {
        basic: 'Básico',
        howTo: 'Como Usar',
        settings: 'Definições',
        themes: 'Temas',
        vmware: 'VMware',
        apps: 'Apps'
      },
      content: {
        'Básico': [
          { title: 'O que é este sistema?', content: 'Este é um simulador de sistema operativo ultra-realista com suporte para temas Windows, Linux e Gamer.', icon: <Monitor className="text-blue-500" /> },
          { title: 'Primeiros Passos', content: 'Use o Menu Iniciar para encontrar aplicações. O ambiente de trabalho permite criar atalhos e organizar ícones.', icon: <Play className="text-green-500" /> },
          { title: 'Ligar/Desligar', content: 'Use o botão de Power no Menu Iniciar. Se o sistema crashar, pode tentar o atalho de reparação no arranque.', icon: <Settings className="text-red-500" /> }
        ],
        'Como Usar': [
          { title: 'Janelas', content: 'Arraste a barra superior para mover. Use os cantos para redimensionar. Clique duplo na barra de título para maximizar.', icon: <Layout className="text-blue-400" /> },
          { title: 'Multitarefa', content: 'A barra de tarefas mostra apps abertas. No modo Linux, use o botão Activities no topo esquerdo.', icon: <MousePointer2 className="text-indigo-400" /> },
          { title: 'Atalhos', content: 'Clique com o botão direito no desktop para organizar. Use o Task Manager se uma app não responder.', icon: <Cpu className="text-purple-400" /> }
        ],
        'Definições': [
          { title: 'Personalização', content: 'Altere resoluções até 120K e troque entre temas Windows/Linux instantaneamente.', icon: <Settings className="text-zinc-500" /> },
          { title: 'Proteção', content: 'Ative a Proteção em Tempo Real. Use scaneamento Full ou Fast para remover malwares como MEMZ.', icon: <ShieldAlert className="text-orange-500" /> },
          { title: 'Idioma', content: 'Mude o sistema para PT, EN ou ES. Todas as apps e IA do sistema serão traduzidas.', icon: <HelpCircle className="text-blue-500" /> }
        ],
        'Temas': [
          { title: 'Gamer Mode', content: 'Focado em performance com sotaque vermelho, stats de FPS e wallpapers dinâmicos.', icon: <Gamepad2 className="text-red-500" /> },
          { title: 'Work Efficient', content: 'Um look profissional azul com métricas de foco para produtividade máxima.', icon: <Briefcase className="text-blue-600" /> },
          { title: 'Debian GNOME', content: 'Transforma o sistema num ambiente Linux com barra superior, dock lateral e o clássico logo da Debian.', icon: <Box className="text-red-600" /> }
        ],
        'VMware': [
          { title: 'Simulação dentro de Simulação', content: 'A app VMware permite rodar outros sistemas operativos emulados dentro deste desktop.', icon: <Box className="text-orange-600" /> },
          { title: 'VMware PC', content: 'Crie uma instância virtual e conecte-se a hardware simulado para testes e diversão.', icon: <Monitor className="text-zinc-400" /> },
          { title: 'Segurança em VM', content: 'Útil para rodar executáveis suspeitos sem comprometer o sistema principal.', icon: <ShieldAlert className="text-red-600" /> }
        ],
        'Apps': [
          { title: 'Minecraft Classic', content: 'Pode comprar o Minecraft com créditos na Loja ou subscrever o GamePass Ultimate para acesso total.', icon: <Box className="text-green-600" /> },
          { title: 'Paint Creativo', content: 'Uma ferramenta de desenho completa com suporte para pincéis e cores. Solte a sua veia artística!', icon: <Palette className="text-pink-500" /> },
          { title: 'Banco e Créditos', content: 'Mantenha o banco aberto para minerar créditos. Use-os na Store para comprar jogos premium.', icon: <Trophy className="text-yellow-500" /> },
          { title: 'ChatGPT & Gemini', content: 'Aceda a modelos de linguagem avançados diretamente do seu desktop emulado.', icon: <HelpCircle className="text-blue-500" /> }
        ]
      }
    },
    en: {
      title: 'Emulated System Guide',
      subtitle: 'Learn how to make the most of this Desktop experience',
      tabs: {
        basic: 'Basic',
        howTo: 'How to Use',
        settings: 'Settings',
        themes: 'Themes',
        vmware: 'VMware',
        apps: 'Apps'
      },
      content: {
        'Basic': [
          { title: 'What is this?', content: 'An ultra-realistic OS simulator supporting Windows, Linux, and Gamer themes.', icon: <Monitor className="text-blue-500" /> },
          { title: 'First Steps', content: 'Use the Start Menu to find apps. Desktop allows shortcut creation and icon organization.', icon: <Play className="text-green-500" /> },
          { title: 'Power Options', content: 'Use the Power button in the Start Menu. If the system crashes, use basic repair options.', icon: <Settings className="text-red-500" /> }
        ],
        'How to Use': [
          { title: 'Windows', content: 'Drag the title bar to move. Use corners to resize. Double click title bar to maximize.', icon: <Layout className="text-blue-400" /> },
          { title: 'Multitasking', content: 'Taskbar shows open apps. In Linux mode, use the Activities button on the top left.', icon: <MousePointer2 className="text-indigo-400" /> },
          { title: 'Shortcuts', content: 'Right click desktop to organize. Use Task Manager if an app stops responding.', icon: <Cpu className="text-purple-400" /> }
        ],
        'Settings': [
          { title: 'Personalization', content: 'Change resolutions up to 120K and switch between Windows/Linux themes instantly.', icon: <Settings className="text-zinc-500" /> },
          { title: 'Protection', content: 'Enable Real-time Protection. Use Full or Fast scans to remove malware like MEMZ.', icon: <ShieldAlert className="text-orange-500" /> },
          { title: 'Language', content: 'Change system to PT, EN, or ES. All apps and system AI will be translated.', icon: <HelpCircle className="text-blue-500" /> }
        ],
        'Themes': [
          { title: 'Gamer Mode', content: 'Performance-focused with red accents, FPS stats, and dynamic wallpapers.', icon: <Gamepad2 className="text-red-500" /> },
          { title: 'Work Efficient', content: 'A professional blue look with focus metrics for maximum productivity.', icon: <Briefcase className="text-blue-600" /> },
          { title: 'Debian GNOME', content: 'Transforms the system into a Linux environment with a top bar, side dock, and Debian logo.', icon: <Box className="text-red-600" /> }
        ],
        'VMware': [
          { title: 'Sim within Sim', content: 'VMware app allows running other emulated OSs inside this desktop.', icon: <Box className="text-orange-600" /> },
          { title: 'VMware PC', content: 'Create a virtual instance and connect to simulated hardware.', icon: <Monitor className="text-zinc-400" /> },
          { title: 'VM Security', content: 'Useful for running suspicious executables without compromising the host.', icon: <ShieldAlert className="text-red-600" /> }
        ],
        'Apps': [
          { title: 'Minecraft Classic', content: 'Buy Minecraft with credits in the Store or subscribe to GamePass Ultimate for total access.', icon: <Box className="text-green-600" /> },
          { title: 'Creative Paint', content: 'A complete drawing tool with support for brushes and colors. Release your artistic side!', icon: <Palette className="text-pink-500" /> },
          { title: 'Bank & Credits', content: 'Keep the bank open to mine credits. Use them in the Store to buy premium games.', icon: <Trophy className="text-yellow-500" /> },
          { title: 'IA Models', content: 'Access advanced language models directly from your emulated desktop.', icon: <HelpCircle className="text-blue-500" /> }
        ]
      }
    }
  }[language === 'pt' || language === 'pt-PT' ? 'pt' : 'en'];

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shrink-0">
        <div className="flex items-center gap-4 mb-1">
          <BookOpen size={24} />
          <h1 className="text-xl font-bold">{t.title}</h1>
        </div>
        <p className="text-blue-100 opacity-80 text-xs">{t.subtitle}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 px-4">
        {(Object.keys(t.tabs) as Array<keyof typeof t.tabs>).map((tabKey) => {
          const label = (t.tabs as any)[tabKey];
          const isActive = activeTab === label;
          return (
            <button
              key={tabKey}
              onClick={() => setActiveTab(label)}
              className={`px-4 py-3 text-xs font-medium transition-all relative ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}`}
            >
              {label}
              {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 animate-in fade-in slide-in-from-bottom-1" />}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-2">
          <h2 className="text-lg font-bold mb-6 text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
            {activeTab}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(t.content as any)[activeTab]?.map((item: any, idx: number) => (
              <div 
                key={idx} 
                className="p-5 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-shadow group flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-700 group-hover:scale-110 transition-transform shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-zinc-800 dark:text-zinc-100 mb-1">{item.title}</h3>
                  <p className="text-[12px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
        }
      `}</style>
    </div>
  );
}
