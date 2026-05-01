import { useState, useRef, useEffect } from 'react';
import { Phone, Video, MoreVertical, Search, Smile, Paperclip, Mic, Send, CheckCheck } from 'lucide-react';
import { useWindows } from '../../context/WindowContext';
import { THEMES } from '../../constants';

export default function WhatsApp() {
  const { systemTheme } = useWindows();
  const isDark = THEMES[systemTheme].mode === 'dark';
  const [messages, setMessages] = useState([
    { id: 1, text: "Olá! Eu sou a Lhamma, a inteligência artificial da Meta.", sender: 'bot', time: '10:00' },
    { id: 2, text: "Como posso te ajudar hoje?", sender: 'bot', time: '10:00' }
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

    const userMsg = { id: Date.now(), text: input, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const botMsg = { 
        id: Date.now() + 1, 
        text: `Beééé! 🦙 Processando sua mensagem: "${userMsg.text}". Como uma Lhamma inteligente, estou aqui para pastar dados e te dar respostas úteis!`, 
        sender: 'bot', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className={`h-full flex transition-colors ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#f0f2f5]'}`}>
      {/* Sidebar */}
      <div className={`w-80 border-r flex flex-col transition-colors ${isDark ? 'bg-[#1a1c1e] border-white/5' : 'bg-white'}`}>
        <div className={`h-14 flex items-center justify-between px-4 border-b transition-colors ${isDark ? 'bg-black/20 border-white/5' : 'bg-[#f0f2f5]'}`}>
          <div className={`w-10 h-10 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-300'}`} />
          <div className="flex gap-4 text-gray-500">
            <CheckCheck size={20} className={isDark ? 'text-gray-400' : ''} />
            <MoreVertical size={20} className={isDark ? 'text-gray-400' : ''} />
          </div>
        </div>
        <div className="p-2">
          <div className={`flex items-center px-3 py-1.5 rounded-lg gap-4 transition-colors ${isDark ? 'bg-white/5' : 'bg-[#f0f2f5]'}`}>
            <Search size={18} className="text-gray-500" />
            <input type="text" placeholder="Search or start new chat" className={`bg-transparent border-none outline-none text-sm w-full ${isDark ? 'text-white' : ''}`} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${isDark ? 'bg-white/5' : 'bg-[#f0f2f5]'}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${isDark ? 'bg-green-600/20' : 'bg-green-100'}`}>🦙</div>
            <div className={`flex-1 border-b pb-3 ${isDark ? 'border-white/5' : ''}`}>
              <div className="flex justify-between">
                <span className={`font-medium ${isDark ? 'text-gray-200' : ''}`}>Lhamma AI</span>
                <span className="text-xs text-gray-500">10:00</span>
              </div>
              <p className="text-xs text-gray-500 truncate">Como posso te ajudar hoje?</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative" style={{ backgroundImage: isDark ? 'none' : 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")' }}>
        {isDark && <div className="absolute inset-0 bg-[#0a0a0a] opacity-90" />}
        <div className={`h-14 flex items-center justify-between px-4 border-b z-10 transition-colors ${isDark ? 'bg-[#1a1c1e] border-white/5' : 'bg-[#f0f2f5]'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${isDark ? 'bg-green-600/20' : 'bg-green-100'}`}>🦙</div>
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : ''}`}>Lhamma AI</p>
              <p className="text-[10px] text-gray-500">online</p>
            </div>
          </div>
          <div className="flex gap-6 text-gray-500">
            <Video size={20} className={isDark ? 'text-gray-400' : ''} />
            <Phone size={20} className={isDark ? 'text-gray-400' : ''} />
            <Search size={20} className={isDark ? 'text-gray-400' : ''} />
            <MoreVertical size={20} className={isDark ? 'text-gray-400' : ''} />
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-2 relative z-10">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[65%] p-2 rounded-lg shadow-sm relative transition-colors ${msg.sender === 'user' ? (isDark ? 'bg-green-900 border border-green-800 text-gray-100' : 'bg-[#dcf8c6]') : (isDark ? 'bg-[#2b2d31] border border-white/5 text-gray-100' : 'bg-white')}`}>
                <p className="text-sm pr-12">{msg.text}</p>
                <span className="text-[10px] text-gray-500 absolute bottom-1 right-2">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={`h-16 flex items-center px-4 gap-4 transition-colors z-10 ${isDark ? 'bg-[#1a1c1e] border-t border-white/5' : 'bg-[#f0f2f5]'}`}>
          <Smile className="text-gray-500 cursor-pointer hover:text-gray-400" />
          <Paperclip className="text-gray-500 cursor-pointer hover:text-gray-400" />
          <div className="flex-1">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..." 
              className={`w-full border-none rounded-lg py-2.5 px-4 text-sm outline-none transition-colors ${isDark ? 'bg-white/5 text-white placeholder-gray-500' : 'bg-white'}`} 
            />
          </div>
          {input.trim() ? (
            <Send className="text-green-500 cursor-pointer hover:text-green-400" onClick={handleSend} />
          ) : (
            <Mic className="text-gray-500 cursor-pointer hover:text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
}
