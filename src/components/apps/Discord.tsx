import { useState, useRef, useEffect } from 'react';
import { Hash, Volume2, Settings, User, Plus, Compass, Download, Mic, Headphones, MessageSquare, AtSign, Smile, Gift, Hash as HashIcon, ChevronRight } from 'lucide-react';

export default function Discord() {
  const [activeChannel, setActiveChannel] = useState('geral');
  const [messages, setMessages] = useState([
    { id: 1, user: 'GPT-Bot', avatar: '🤖', text: 'Olá Owner! Como posso ajudar no servidor hoje?', time: '10:00' },
    { id: 2, user: 'Gemini-Bot', avatar: '✨', text: 'Estou pronto para analisar qualquer dado que você enviar.', time: '10:01' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), user: 'Owner (Você)', avatar: '👑', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Random Bot Response
    setTimeout(() => {
      const bots = [
        { name: 'GPT-Bot', avatar: '🤖', msg: `Entendido, Owner! Sobre "${userMsg.text}", aqui está minha análise...` },
        { name: 'Gemini-Bot', avatar: '✨', msg: `Interessante ponto, Owner. Eu processaria "${userMsg.text}" da seguinte forma...` },
        { name: 'Lhamma-Bot', avatar: '🦙', msg: `Beééé! 🦙 Gostei da mensagem: "${userMsg.text}"` }
      ];
      const bot = bots[Math.floor(Math.random() * bots.length)];
      
      const botMsg = { 
        id: Date.now() + 1, 
        user: bot.name, 
        avatar: bot.avatar, 
        text: bot.msg, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1200);
  };

  return (
    <div className="h-full flex bg-[#313338] text-[#dbdee1] font-sans overflow-hidden">
      {/* Server List */}
      <div className="w-[72px] bg-[#1e1f22] flex flex-col items-center py-3 gap-2">
        <div className="w-12 h-12 bg-[#313338] rounded-2xl flex items-center justify-center text-white hover:rounded-xl transition-all cursor-pointer group relative">
          <div className="absolute -left-1 w-1 h-8 bg-white rounded-r-full" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/Windows_logo_-_2021.svg" className="w-6 h-6" alt="Win11" />
        </div>
        <div className="w-8 h-[2px] bg-[#35363c] rounded-full mx-auto my-1" />
        <div className="w-12 h-12 bg-[#5865f2] rounded-xl flex items-center justify-center text-white cursor-pointer relative">
          <span className="font-bold">AI</span>
        </div>
        <div className="w-12 h-12 bg-[#313338] rounded-full flex items-center justify-center text-[#23a559] hover:bg-[#23a559] hover:text-white transition-all cursor-pointer">
          <Plus size={24} />
        </div>
        <div className="w-12 h-12 bg-[#313338] rounded-full flex items-center justify-center text-[#23a559] hover:bg-[#23a559] hover:text-white transition-all cursor-pointer">
          <Compass size={24} />
        </div>
      </div>

      {/* Channel List */}
      <div className="w-60 bg-[#2b2d31] flex flex-col">
        <div className="h-12 flex items-center px-4 shadow-sm font-bold text-white border-b border-[#1e1f22]">
          AI Server 👑
        </div>
        <div className="flex-1 py-4 px-2 space-y-4">
          <div>
            <div className="flex items-center px-2 text-[11px] font-bold uppercase tracking-wider text-[#949ba4] hover:text-white cursor-pointer">
              <ChevronRight size={12} className="rotate-90 mr-1" />
              Canais de Texto
            </div>
            <div className="mt-1 space-y-0.5">
              {['geral', 'ajuda-ia', 'testes', 'regras'].map(ch => (
                <div 
                  key={ch}
                  onClick={() => setActiveChannel(ch)}
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded cursor-pointer group ${activeChannel === ch ? 'bg-[#3f4147] text-white' : 'hover:bg-[#35373c] text-[#949ba4] hover:text-[#dbdee1]'}`}
                >
                  <Hash size={20} className="text-[#80848e]" />
                  <span className="font-medium">{ch}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* User Info */}
        <div className="h-14 bg-[#232428] flex items-center px-2 gap-2">
          <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-lg relative">
            👑
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#23a559] border-2 border-[#232428] rounded-full" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-white truncate">Owner</p>
            <p className="text-[10px] text-[#949ba4] truncate">#0001</p>
          </div>
          <div className="flex gap-1">
            <div className="p-1.5 hover:bg-[#35373c] rounded cursor-pointer"><Mic size={16} /></div>
            <div className="p-1.5 hover:bg-[#35373c] rounded cursor-pointer"><Headphones size={16} /></div>
            <div className="p-1.5 hover:bg-[#35373c] rounded cursor-pointer"><Settings size={16} /></div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[#313338]">
        <div className="h-12 flex items-center px-4 shadow-sm gap-2 border-b border-[#1e1f22]">
          <Hash size={24} className="text-[#80848e]" />
          <span className="font-bold text-white">{activeChannel}</span>
          <div className="w-[1px] h-6 bg-[#3f4147] mx-2" />
          <span className="text-xs text-[#949ba4]">Bem-vindo ao canal #{activeChannel}!</span>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="mb-8 p-4">
            <div className="w-16 h-16 bg-[#41434a] rounded-full flex items-center justify-center text-4xl mb-4">#</div>
            <h1 className="text-3xl font-bold text-white">Bem-vindo ao #{activeChannel}!</h1>
            <p className="text-[#b5bac1]">Este é o começo do canal #{activeChannel}.</p>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-4 hover:bg-[#2e3035] -mx-4 px-4 py-1 group">
              <div className="w-10 h-10 bg-[#41434a] rounded-full flex items-center justify-center text-xl shrink-0 mt-1">
                {msg.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`font-bold hover:underline cursor-pointer ${msg.user.includes('Bot') ? 'text-[#00a8fc]' : 'text-white'}`}>
                    {msg.user}
                  </span>
                  {msg.user.includes('Bot') && (
                    <span className="bg-[#5865f2] text-white text-[10px] px-1 rounded font-bold">APP</span>
                  )}
                  <span className="text-[10px] text-[#949ba4]">{msg.time}</span>
                </div>
                <p className="text-sm text-[#dbdee1] leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4">
          <div className="bg-[#383a40] rounded-lg flex flex-col p-2">
            <div className="flex items-center gap-4 px-2">
              <div className="p-1 hover:bg-[#41434a] rounded-full cursor-pointer"><Plus size={20} className="bg-[#b5bac1] text-[#313338] rounded-full" /></div>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Conversar em #${activeChannel}`} 
                className="flex-1 bg-transparent border-none outline-none py-2 text-sm" 
              />
              <div className="flex gap-3 text-[#b5bac1]">
                <Gift size={20} className="hover:text-white cursor-pointer" />
                <Smile size={20} className="hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Member List */}
      <div className="w-60 bg-[#2b2d31] hidden lg:flex flex-col p-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#949ba4] mb-2">Online — 3</p>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-1.5 rounded hover:bg-[#35373c] cursor-pointer group">
            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-lg relative">
              👑
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#23a559] border-2 border-[#2b2d31] rounded-full" />
            </div>
            <span className="text-sm font-medium text-white">Owner</span>
          </div>
          <div className="flex items-center gap-3 p-1.5 rounded hover:bg-[#35373c] cursor-pointer group">
            <div className="w-8 h-8 bg-[#41434a] rounded-full flex items-center justify-center text-lg relative">
              🤖
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#23a559] border-2 border-[#2b2d31] rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#00a8fc]">GPT-Bot</span>
              <span className="text-[10px] text-[#949ba4]">Ouvindo Spotify</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-1.5 rounded hover:bg-[#35373c] cursor-pointer group">
            <div className="w-8 h-8 bg-[#41434a] rounded-full flex items-center justify-center text-lg relative">
              ✨
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#23a559] border-2 border-[#2b2d31] rounded-full" />
            </div>
            <span className="text-sm font-medium text-[#00a8fc]">Gemini-Bot</span>
          </div>
        </div>
      </div>
    </div>
  );
}
