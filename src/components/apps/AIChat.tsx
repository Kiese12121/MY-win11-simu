import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { useWindows } from '../../context/WindowContext';
import { THEMES } from '../../constants';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  name: string;
  color: string;
  icon: React.ReactNode;
  initialMessage: string;
  placeholder: string;
}

export default function AIChat({ name, color, icon, initialMessage, placeholder }: AIChatProps) {
  const { language, systemTheme } = useWindows();
  const isDark = THEMES[systemTheme].mode === 'dark';
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: initialMessage }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: 'assistant', content: initialMessage }]);
  }, [initialMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      const translations = {
        pt: {
          copilot: `Eu sou o seu Microsoft Copilot. Posso ajudá-lo com as configurações do Windows, escrevendo código ou apenas conversando! Você perguntou: "${userMsg}". Como mais posso ajudá-lo hoje?`,
          chatgpt: `Como um modelo de linguagem de IA, estou aqui para ajudar com suas perguntas. Sobre "${userMsg}", esse é um tópico interessante! Posso fornecer mais detalhes se desejar.`,
          gemini: `Eu sou o Gemini, a IA mais capaz do Google. Processei seu pedido sobre "${userMsg}". Há algo específico que você gostaria que eu gerasse ou analisasse?`
        },
        en: {
          copilot: `I'm your Microsoft Copilot. I can help you with Windows settings, writing code, or just chatting! You asked: "${userMsg}". How else can I assist you today?`,
          chatgpt: `As an AI language model, I'm here to help with your questions. Regarding "${userMsg}", that's an interesting topic! I can provide more details if you'd like.`,
          gemini: `I'm Gemini, Google's most capable AI. I've processed your request about "${userMsg}". Is there anything specific you'd like me to generate or analyze?`
        },
        es: {
          copilot: `Soy tu Microsoft Copilot. ¡Puedo ayudarte con la configuración de Windows, escribiendo código o simplemente charlando! Preguntaste: "${userMsg}". ¿En qué más puedo ayudarte hoy?`,
          chatgpt: `Como modelo de lenguaje de IA, estoy aquí para ayudar con tus preguntas. Con respecto a "${userMsg}", ¡es un tema interesante! Puedo proporcionar más detalles si lo deseas.`,
          gemini: `Soy Gemini, la IA más capaz de Google. He procesado tu solicitud sobre "${userMsg}". ¿Hay algo específico que te gustaría que genere o analice?`
        },
        zh: {
          copilot: `我是您的 Microsoft Copilot。我可以帮助您进行 Windows 设置、编写代码或只是聊天！您问了：“${userMsg}”。今天我还能为您提供什么帮助？`,
          chatgpt: `作为 AI 语言模型，我在这里为您解答。关于“${userMsg}”，这是一个有趣话题！如果您愿意，我可以提供更多细节。`,
          gemini: `我是 Gemini，Google 最强大的 AI。我处理了您关于“${userMsg}”的请求。您有什么具体想要我生成或分析的内容吗？`
        },
        it: {
          copilot: `Sono il tuo Microsoft Copilot. Posso aiutarti con le impostazioni di Windows, scrivendo codice o semplicemente chiacchierando! Hai chiesto: "${userMsg}". In cos'altro posso aiutarti oggi?`,
          chatgpt: `Come modello linguistico di IA, sono qui per aiutarti con le tue domande. Riguardo a "${userMsg}", è un argomento interessante! Posso fornirti maggiori dettagli se lo desideri.`,
          gemini: `Sono Gemini, l'IA più capace di Google. Ho elaborato la tua richiesta su "${userMsg}". C'è qualcosa di specifico che vorresti che generassi o analizzassi?`
        },
        de: {
          copilot: `Ich bin Ihr Microsoft Copilot. Ich kann Ihnen bei Windows-Einstellungen, beim Schreiben von Code oder einfach nur beim Chatten helfen! Sie haben gefragt: "${userMsg}". Wie kann ich Ihnen heute sonst noch helfen?`,
          chatgpt: `Als KI-Sprachmodell bin ich hier, um bei Ihren Fragen zu helfen. Zu "${userMsg}" - das ist ein interessantes Thema! Ich kann Ihnen bei Bedarf weitere Details nennen.`,
          gemini: `Ich bin Gemini, die leistungsfähigste KI von Google. Ich habe Ihre Anfrage zu "${userMsg}" bearbeitet. Gibt es etwas Bestimmtes, das ich generieren oder analysieren soll?`
        },
        ru: {
          copilot: `Я ваш Microsoft Copilot. Я могу помочь вам с настройками Windows, написанием кода или просто пообщаться! Вы спросили: "${userMsg}". Чем еще я могу вам помочь сегодня?`,
          chatgpt: `Как языковая модель ИИ, я здесь, чтобы помочь с вашими вопросами. Что касается "${userMsg}", это интересная тема! Я могу предоставить более подробную информацию, если хотите.`,
          gemini: `Я Gemini, самая способная ИИ от Google. Я обработал ваш запрос о "${userMsg}". Есть ли что-то конкретное, что вы хотели бы, чтобы я сгенерировал или проанализировал?`
        },
        ja: {
          copilot: `あなたの Microsoft Copilot です。Windows の設定、コードの作成、または単なるチャットのお手伝いをします。 "${userMsg}" について質問されましたね。今日は他に何かお手伝できることはありますか？`,
          chatgpt: `AI 言語モデルとして、あなたの質問にお答えします。 "${userMsg}" について、それは興味深いトピックですね！ご希望であれば詳細を提供できます。`,
          gemini: `Google の最も有能な AI、Gemini です。 "${userMsg}" に関するリクエストを処理しました。生成または分析してほしい具体的な内容はありますか？`
        },
        ko: {
          copilot: `사용자의 Microsoft Copilot입니다. Windows 설정, 코드 작성 또는 단순한 대화를 도와드릴 수 있습니다! "${userMsg}"에 대해 문의하셨군요. 오늘 또 무엇을 도와드릴까요?`,
          chatgpt: `AI 언어 모델로서 질문을 도와드리기 위해 여기 있습니다. "${userMsg}"에 관해서는 흥미로운 주제네요! 원하신다면 더 자세한 내용을 제공해 드릴 수 있습니다.`,
          gemini: `Google의 가장 유능한 AI인 Gemini입니다. "${userMsg}"에 대한 요청을 처리했습니다. 생성하거나 분석하고 싶은 구체적인 내용이 있나요?`
        },
        ar: {
          copilot: `أنا Microsoft Copilot الخاص بك. يمكنني مساعدتك في إعدادات Windows أو كتابة التعليمات البرمجية أو مجرد الدردشة! لقد سألت عن: "${userMsg}". كيف يمكنني مساعدتك أكثر اليوم؟`,
          chatgpt: `كنموذج لغة يعمل بالذكاء الاصطناعي، أنا هنا للمساعدة في أسئلتك. بخصوص "${userMsg}"، هذا موضوع مثير للاهتمام! يمكنني تقديم مزيد من التفاصيل إذا كنت ترغب في ذلك.`,
          gemini: `أنا Gemini، الذكاء الاصطناعي الأكثر قدرة من Google. لقد عالجت طلبك بخصوص "${userMsg}". هل هناك شيء محدد تود مني إنتاجه أو تحليله؟`
        },
        nl: {
          copilot: `Ik ben uw Microsoft Copilot. Ik kan u helpen met Windows-instellingen, het schrijven van code of gewoon chatten! U vroeg: "${userMsg}". Hoe kan ik u vandaag nog meer helpen?`,
          chatgpt: `Als AI-taalmodel ben ik hier om te helpen met uw vragen. Over "${userMsg}", dat is een interessant onderwerp! Ik kan meer details geven als u dat wilt.`,
          gemini: `Ik ben Gemini, de meest bekwame AI van Google. Ik heb uw verzoek over "${userMsg}" verwerkt. Is er iets specifiek dat u wilt dat ik genereer of analyseer?`
        },
        pl: {
          copilot: `Jestem Twoim Microsoft Copilot. Mogę pomóc Ci w ustawieniach systemu Windows, pisaniu kodu lub po prostu porozmawiać! Zapytałeś o: "${userMsg}". W czym jeszcze mogę Ci dzisiaj pomóc?`,
          chatgpt: `Jako model językowy AI jestem tutaj, aby pomóc w Twoich pytaniach. Odnośnie "${userMsg}", to ciekawy temat! Mogę podać więcej szczegółów, jeśli chcesz.`,
          gemini: `Jestem Gemini, najbardziej zaawansowana AI od Google. Przetworzyłem Twoją prośbę dotyczącą "${userMsg}". Czy jest coś konkretnego, co chciałbyś, abym wygenerował lub przeanalizował?`
        },
        tr: {
          copilot: `Ben sizin Microsoft Copilot'unuzum. Windows ayarları, kod yazma veya sadece sohbet etme konusunda size yardımcı olabilirim! "${userMsg}" hakkında soru sordunuz. Bugün size başka nasıl yardımcı olabilirim?`,
          chatgpt: `Bir yapay zeka dil modeli olarak, sorularınıza yardımcı olmak için buradayım. "${userMsg}" ile ilgili olarak, bu ilginç bir konu! İsterseniz daha fazla ayrıntı sağlayabilirim.`,
          gemini: `Ben Google'ın en yetenekli yapay zekası Gemini'yim. "${userMsg}" hakkındaki isteğinizi işledim. Oluşturmamı veya analiz etmemi istediğiniz özel bir şey var mı?`
        },
        hi: {
          copilot: `मैं आपका Microsoft Copilot हूँ। मैं विंडोज सेटिंग्स, कोड लिखने या सिर्फ चैटिंग में आपकी मदद कर सकता हूँ! आपने पूछा: "${userMsg}"। आज मैं आपकी और कैसे सहायता कर सकता हूँ?`,
          chatgpt: `एक AI भाषा मॉडल के रूप में, मैं आपके प्रश्नों में सहायता के लिए यहाँ हूँ। "${userMsg}" के संबंध में, यह एक दिलचस्प विषय है! यदि आप चाहें तो मैं और अधिक विवरण प्रदान कर सकता हूँ।`,
          gemini: `मैं जेमिनी हूँ, गूगल का सबसे सक्षम एआई। मैंने "${userMsg}" के बारे में आपके अनुरोध पर कार्रवाई की है। क्या कुछ विशिष्ट है जिसे आप चाहते हैं कि मैं उत्पन्न या विश्लेषण करूँ?`
        },
        vi: {
          copilot: `Tôi là Microsoft Copilot của bạn. Tôi có thể giúp bạn cài đặt Windows, viết mã hoặc chỉ trò chuyện! Bạn đã hỏi: "${userMsg}". Tôi có thể hỗ trợ gì thêm cho bạn hôm nay?`,
          chatgpt: ` Là một mô hình ngôn ngữ AI, tôi ở đây để giúp giải đáp các câu hỏi của bạn. Về "${userMsg}", đó là một chủ đề thú vị! Tôi có thể cung cấp thêm chi tiết nếu bạn muốn.`,
          gemini: `Tôi là Gemini, AI có khả năng nhất của Google. Tôi đã xử lý yêu cầu của bạn về "${userMsg}". Có điều gì cụ thể bạn muốn tôi tạo hoặc phân tích không?`
        },
        th: {
          copilot: `ฉันคือ Microsoft Copilot ของคุณ ฉันสามารถช่วยคุณในการตั้งค่า Windows การเขียนโค้ด หรือเพียงแค่แชท! คุณถามว่า: "${userMsg}" วันนี้ฉันจะช่วยคุณอย่างไรได้บ้าง?`,
          chatgpt: `ในฐานะโมเดลภาษา AI ฉันมาที่นี่เพื่อช่วยตอบคำถามของคุณ เกี่ยวกับ "${userMsg}" นั่นเป็นหัวข้อที่น่าสนใจ! ฉันสามารถให้รายละเอียดเพิ่มเติมได้หากคุณต้องการ`,
          gemini: `ฉันคือ Gemini AI ที่มีความสามารถมากที่สุดของ Google ฉันได้ประมวลผลคำขอของคุณเกี่ยวกับ "${userMsg}" แล้ว มีอะไรเฉพาะเจาะจงที่คุณต้องการให้ฉันสร้างหรือวิเคราะห์ไหม?`
        }
      };

      const lang = language || 'en';
      let t = (translations as any)[lang];
      if (!t) {
        if (lang.startsWith('pt')) t = translations.pt;
        else if (lang.startsWith('es')) t = translations.es;
        else if (lang.startsWith('zh')) t = translations.zh;
        else t = translations.en;
      }
      
      let response = "";
      if (name === "Copilot") {
        response = t.copilot;
      } else if (name === "ChatGPT") {
        response = t.chatgpt;
      } else {
        response = t.gemini;
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={`h-full flex flex-col transition-colors ${isDark ? 'bg-[#1a1c1e] text-white' : 'bg-white text-gray-900'}`}>
      <div className={`h-14 flex items-center px-6 gap-3 border-b text-white ${color}`}>
        {icon}
        <h2 className="font-semibold">{name}</h2>
      </div>

      <div ref={scrollRef} className={`flex-1 overflow-y-auto p-6 space-y-4 transition-colors ${isDark ? 'bg-black/20' : 'bg-gray-50'}`}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl flex gap-3 ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : (isDark ? 'bg-white/5 border border-white/10 text-gray-200' : 'bg-white border border-gray-100 shadow-sm') + ' rounded-tl-none'}`}>
              <div className="shrink-0 mt-1">
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} className={msg.role === 'assistant' ? (isDark ? 'text-blue-400' : 'text-blue-600') : ''} />}
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className={`p-3 rounded-2xl rounded-tl-none flex gap-2 items-center ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border shadow-sm'}`}>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <div className={`p-4 border-t transition-colors ${isDark ? 'bg-[#1a1c1e] border-white/5' : 'bg-white border-gray-100'}`}>
        <div className="max-w-3xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={placeholder}
            className={`w-full border-none rounded-xl py-3 pl-4 pr-12 text-sm outline-none transition-all ${isDark ? 'bg-white/5 text-white focus:ring-blue-400/50' : 'bg-gray-100 focus:ring-2 focus:ring-blue-500'}`}
          />
          <button 
            onClick={handleSend}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${isDark ? 'text-blue-400 hover:bg-white/10' : 'text-blue-600 hover:bg-blue-50'}`}
          >
            <Send size={18} />
          </button>
        </div>
        <p className={`text-[10px] text-center mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}
