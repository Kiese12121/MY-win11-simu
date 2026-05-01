import React from 'react';
import { useWindows } from '../context/WindowContext';
import { RefreshCw, ShieldCheck, Loader2 } from 'lucide-react';

export default function SystemRecoveryScreens() {
  const { 
    isSystemReinstalling, reinstallProgress, isSystemResetting, resetProgress, language,
    isInstallingWindows, installProgress
  } = useWindows();

  const t = ({
    pt: {
      reinstalling: 'Reinstalando o Windows...',
      resetting: 'Resetando o sistema...',
      installing: 'Instalando o Windows...',
      timeRemaining: 'Tempo restante: {time}',
      dontTurnOff: 'Por favor, não desligue o computador.',
      almostThere: 'Quase lá...'
    },
    en: {
      reinstalling: 'Reinstalling Windows...',
      resetting: 'Resetting system...',
      installing: 'Installing Windows...',
      timeRemaining: 'Time remaining: {time}',
      dontTurnOff: 'Please do not turn off your computer.',
      almostThere: 'Almost there...'
    },
    es: {
      reinstalling: 'Reinstalando Windows...',
      resetting: 'Reiniciando el sistema...',
      installing: 'Instalando Windows...',
      timeRemaining: 'Tiempo restante: {time}',
      dontTurnOff: 'Por favor, no apague el equipo.',
      almostThere: 'Casi listo...'
    },
    it: {
      reinstalling: 'Reinstallazione di Windows...',
      resetting: 'Ripristino del sistema...',
      installing: 'Installazione di Windows...',
      timeRemaining: 'Tempo rimanente: {time}',
      dontTurnOff: 'Non spegnere il computer.',
      almostThere: 'Quasi fatto...'
    },
    de: {
      reinstalling: 'Windows wird neu installiert...',
      resetting: 'System wird zurückgesetzt...',
      installing: 'Windows wird installiert...',
      timeRemaining: 'Verbleibende Zeit: {time}',
      dontTurnOff: 'Bitte schalten Sie den Computer nicht aus.',
      almostThere: 'Fast geschafft...'
    },
    ru: {
      reinstalling: 'Переустановка Windows...',
      resetting: 'Сброс системы...',
      installing: 'Установка Windows...',
      timeRemaining: 'Оставшееся время: {time}',
      dontTurnOff: 'Пожалуйста, не выключайте компьютер.',
      almostThere: 'Почти готово...'
    },
    ja: {
      reinstalling: 'Windows を再インストールしています...',
      resetting: 'システムをリセットしています...',
      installing: 'Windows をインストールしています...',
      timeRemaining: '残り時間: {time}',
      dontTurnOff: 'コンピューターの電源を切らないでください。',
      almostThere: 'あと少しです...'
    },
    ko: {
      reinstalling: 'Windows 재설치 중...',
      resetting: '시스템 재설정 중...',
      installing: 'Windows 설치 중...',
      timeRemaining: '남은 시간: {time}',
      dontTurnOff: '컴퓨터를 끄지 마십시오.',
      almostThere: '거의 다 됐습니다...'
    },
    ar: {
      reinstalling: 'جاري إعادة تثبيت ويندوز...',
      resetting: 'جاري إعادة ضبط النظام...',
      installing: 'جاري تثبيت ويندوز...',
      timeRemaining: 'الوقت المتبقي: {time}',
      dontTurnOff: 'يرجى عدم إغلاق الكمبيوتر.',
      almostThere: 'قريباً سننتهي...'
    },
    nl: {
      reinstalling: 'Windows opnieuw installeren...',
      resetting: 'Systeem resetten...',
      installing: 'Windows installeren...',
      timeRemaining: 'Resterende tijd: {time}',
      dontTurnOff: 'Schakel uw computer niet uit.',
      almostThere: 'Bijna klaar...'
    },
    pl: {
      reinstalling: 'Ponowne instalowanie systemu Windows...',
      resetting: 'Resetowanie systemu...',
      installing: 'Instalowanie systemu Windows...',
      timeRemaining: 'Pozostały czas: {time}',
      dontTurnOff: 'Nie wyłączaj komputera.',
      almostThere: 'Już prawie...'
    },
    tr: {
      reinstalling: 'Windows yeniden yükleniyor...',
      resetting: 'Sistem sıfırlanıyor...',
      installing: 'Windows yükleniyor...',
      timeRemaining: 'Kalan süre: {time}',
      dontTurnOff: 'Lütfen bilgisayarınızı kapatmayın.',
      almostThere: 'Neredeyse bitti...'
    },
    hi: {
      reinstalling: 'विंडोज को फिर से स्थापित किया जा रहा है...',
      resetting: 'सिस्टम को रीसेट किया जा रहा है...',
      installing: 'विंडोज स्थापित किया जा रहा है...',
      timeRemaining: 'शेष समय: {time}',
      dontTurnOff: 'कृपया अपना कंप्यूटर बंद न करें।',
      almostThere: 'बस होने ही वाला है...'
    },
    vi: {
      reinstalling: 'Đang cài đặt lại Windows...',
      resetting: 'Đang thiết lập lại hệ thống...',
      installing: 'Đang cài đặt Windows...',
      timeRemaining: 'Thời gian còn lại: {time}',
      dontTurnOff: 'Vui lòng không tắt máy tính.',
      almostThere: 'Sắp xong rồi...'
    },
    th: {
      reinstalling: 'กำลังติดตั้ง Windows ใหม่...',
      resetting: 'กำลังรีเซ็ตระบบ...',
      installing: 'กำลังติดตั้ง Windows...',
      timeRemaining: 'เวลาที่เหลือ: {time}',
      dontTurnOff: 'โปรดอย่าปิดเครื่องคอมพิวเตอร์ของคุณ',
      almostThere: 'ใกล้จะเสร็จแล้ว...'
    },
    zh: {
      reinstalling: '正在重新安装 Windows...',
      resetting: '正在重置系统...',
      installing: '正在安装 Windows...',
      timeRemaining: '剩余时间: {time}',
      dontTurnOff: '请不要关闭计算机。',
      almostThere: '即将完成...'
    }
  } as Record<string, any>)[language] || (language.startsWith('pt') ? {
    reinstalling: 'Reinstalando o Windows...',
    resetting: 'Resetando o sistema...',
    installing: 'Instalando o Windows...',
    timeRemaining: 'Tempo restante: {time}',
    dontTurnOff: 'Por favor, não desligue o computador.',
    almostThere: 'Quase lá...'
  } : language.startsWith('es') ? {
    reinstalling: 'Reinstalando Windows...',
    resetting: 'Reiniciando el sistema...',
    installing: 'Instalando Windows...',
    timeRemaining: 'Tiempo restante: {time}',
    dontTurnOff: 'Por favor, no apague el equipo.',
    almostThere: 'Casi listo...'
  } : language.startsWith('zh') ? {
    reinstalling: '正在重新安装 Windows...',
    resetting: '正在重置系统...',
    installing: '正在安装 Windows...',
    timeRemaining: '剩余时间: {time}',
    dontTurnOff: '请不要关闭计算机。',
    almostThere: '即将完成...'
  } : {
    reinstalling: 'Reinstalling Windows...',
    resetting: 'Resetting system...',
    installing: 'Installing Windows...',
    timeRemaining: 'Time remaining: {time}',
    dontTurnOff: 'Please do not turn off your computer.',
    almostThere: 'Almost there...'
  });

  if (isInstallingWindows) {
    const timeRemaining = Math.max(0, 10 - Math.floor(installProgress / 10));
    return (
      <div className="fixed inset-0 z-[10002] bg-[#0078d7] flex flex-col items-center justify-center text-white p-12 text-center">
        <div className="max-w-xl w-full">
          <h1 className="text-4xl font-light mb-12">{t.installing}</h1>
          <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden mb-8">
            <div 
              className="bg-white h-full transition-all duration-1000 ease-linear" 
              style={{ width: `${installProgress}%` }}
            />
          </div>
          <p className="text-lg opacity-80">{t.dontTurnOff}</p>
          <p className="mt-4 text-sm opacity-60">{installProgress.toFixed(0)}%</p>
          <p className="mt-8 text-xl font-medium">{t.timeRemaining.replace('{time}', `${timeRemaining}s`)}</p>
        </div>
      </div>
    );
  }

  if (isSystemReinstalling) {
    const timeRemaining = Math.max(0, Math.ceil((100 - reinstallProgress) * 1.2)); // 120s total
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return (
      <div className="fixed inset-0 z-[10000] bg-blue-600 flex flex-col items-center justify-center text-white p-12 text-center">
        <RefreshCw size={80} className="mb-12 animate-spin" />
        <h1 className="text-5xl font-black mb-4">{t.reinstalling}</h1>
        <p className="text-2xl mb-12 opacity-80">{t.dontTurnOff}</p>
        
        <div className="w-full max-w-2xl bg-white/20 h-4 rounded-full overflow-hidden mb-6">
          <div 
            className="bg-white h-full transition-all duration-1000 ease-linear" 
            style={{ width: `${reinstallProgress}%` }}
          />
        </div>
        
        <p className="text-xl font-bold">
          {t.timeRemaining.replace('{time}', `${minutes}:${seconds.toString().padStart(2, '0')}`)}
        </p>
        <p className="mt-4 opacity-60">{reinstallProgress.toFixed(0)}%</p>
      </div>
    );
  }

  if (isSystemResetting) {
    const timeRemaining = Math.max(0, Math.ceil((100 - resetProgress) * 0.6)); // 60s total
    const seconds = timeRemaining;

    return (
      <div className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center text-white p-12 text-center">
        <Loader2 size={80} className="mb-12 animate-spin text-blue-500" />
        <h1 className="text-5xl font-black mb-4">{t.resetting}</h1>
        <p className="text-2xl mb-12 opacity-80">{t.almostThere}</p>
        
        <div className="w-full max-w-2xl bg-white/10 h-2 rounded-full overflow-hidden mb-6">
          <div 
            className="bg-blue-500 h-full transition-all duration-1000 ease-linear shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
            style={{ width: `${resetProgress}%` }}
          />
        </div>
        
        <p className="text-xl font-bold">
          {t.timeRemaining.replace('{time}', `${seconds}s`)}
        </p>
        <p className="mt-4 opacity-60">{resetProgress.toFixed(0)}%</p>
      </div>
    );
  }

  return null;
}
