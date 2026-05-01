import React, { useState, useEffect } from 'react';
import { useWindows } from '../context/WindowContext';
import { AlertTriangle, X, RefreshCw } from 'lucide-react';

export default function VirusOverlays() {
  const { 
    activeViruses, language, startReinstall, startReset, isSystemDeleted, isLoggedIn,
    isNoEscapeFraud, isNoOsFound, insertCd, isSelectingDisk, selectDisk
  } = useWindows();
  const [showMemzMessage, setShowMemzMessage] = useState(false);
  const [nyanCat, setNyanCat] = useState(false);

  useEffect(() => {
    if (activeViruses.includes('memz')) {
      const timer = setTimeout(() => {
        setShowMemzMessage(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowMemzMessage(false);
      setNyanCat(false);
    }
  }, [activeViruses]);

  const t = {
    pt: {
      memzTitle: 'MEMZ Trojan',
      memzMsg: 'Seu PC foi destruído pelo MEMZ Trojan. Aproveite o Nyan Cat!',
      reinstall: 'Reinstalar Windows',
      deletedTitle: 'Você deletou seu sistema',
      deletedMsg: 'O sistema operacional foi removido. Clique em resetar para restaurar.',
      reset: 'Resetar Sistema',
      reinstalling: 'Reinstalando o Windows...',
      resetting: 'Resetando o sistema...',
      timeRemaining: 'Tempo restante: {time}',
      fraud: 'NoEscape encontrou uma fraude no sistema e agora vai deletar o sistema inteiro e vai reiniciar.',
      noOs: 'No operating system found',
      putCd: 'Put Windows CD',
      selectDisk: 'Qual disco quer instalar?',
      disk0: 'Disco 0 Partição 1 (C:) - 1.0 PB'
    },
    en: {
      memzTitle: 'MEMZ Trojan',
      memzMsg: 'Your PC has been trashed by the MEMZ Trojan. Enjoy the Nyan Cat!',
      reinstall: 'Reinstall Windows',
      deletedTitle: 'You deleted your system',
      deletedMsg: 'The operating system has been removed. Click reset to restore.',
      reset: 'Reset System',
      reinstalling: 'Reinstalling Windows...',
      resetting: 'Resetting system...',
      timeRemaining: 'Time remaining: {time}',
      fraud: 'NoEscape found a fraud in the system and will now delete the entire system and restart.',
      noOs: 'No operating system found',
      putCd: 'Put Windows CD',
      selectDisk: 'Which disk do you want to install on?',
      disk0: 'Disk 0 Partition 1 (C:) - 1.0 PB'
    },
    es: {
      memzTitle: 'MEMZ Trojan',
      memzMsg: 'Tu PC ha sido destruido por el MEMZ Trojan. ¡Disfruta del Nyan Cat!',
      reinstall: 'Reinstalar Windows',
      deletedTitle: 'Has eliminado tu sistema',
      deletedMsg: 'El sistema operativo ha sido eliminado. Haz clic en reiniciar para restaurar.',
      reset: 'Reiniciar Sistema',
      reinstalling: 'Reinstalando Windows...',
      resetting: 'Reiniciando el sistema...',
      timeRemaining: 'Tiempo restante: {time}',
      fraud: 'NoEscape encontró un fraude en el sistema y ahora eliminará todo el sistema y se reiniciará.',
      noOs: 'No operating system found',
      putCd: 'Put Windows CD',
      selectDisk: '¿En qué disco quieres instalar?',
      disk0: 'Disco 0 Partición 1 (C:) - 1.0 PB'
    }
  }[language];

  if (isNoOsFound) {
    return (
      <div className="fixed inset-0 z-[10005] bg-black flex flex-col items-center justify-center text-white font-mono p-12">
        <div className="max-w-xl w-full">
          <p className="text-xl mb-8">{t.noOs}</p>
          <button 
            onClick={insertCd}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded border border-gray-600 transition-colors"
          >
            {t.putCd}
          </button>
        </div>
      </div>
    );
  }

  if (isSelectingDisk) {
    return (
      <div className="fixed inset-0 z-[10005] bg-[#0078d7] flex flex-col items-center justify-center text-white p-12">
        <div className="bg-white text-black p-8 rounded shadow-2xl max-w-2xl w-full">
          <h2 className="text-2xl font-light mb-6 text-blue-700">{t.selectDisk}</h2>
          <div className="border border-gray-300 mb-8">
            <div 
              onClick={selectDisk}
              className="p-4 hover:bg-blue-50 cursor-pointer border-b flex items-center gap-4 transition-colors"
            >
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                <RefreshCw size={16} className="text-gray-500" />
              </div>
              <span className="font-medium">{t.disk0}</span>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">Refresh</button>
            <button className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">Load driver</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {isNoEscapeFraud && (
        <div className="fixed inset-0 z-[10006] bg-black flex flex-col items-center justify-center text-red-600 p-12 text-center font-mono">
          <AlertTriangle size={100} className="mb-8 animate-pulse" />
          <h1 className="text-4xl font-black uppercase mb-6 tracking-widest">SYSTEM FRAUD DETECTED</h1>
          <p className="text-2xl font-bold max-w-3xl leading-relaxed">
            {t.fraud}
          </p>
        </div>
      )}

      {activeViruses.includes('memz') && !isLoggedIn && (
        !nyanCat ? (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white p-12 text-center select-none">
            <div className="max-w-2xl flex flex-col items-center gap-12">
              <AlertTriangle size={120} className="text-red-500 animate-pulse" />
              <h1 className="text-6xl font-black italic tracking-tighter uppercase text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                {t.memzTitle}
              </h1>
              <p className="text-3xl font-bold leading-tight opacity-90">
                {t.memzMsg}
              </p>
              <div className="flex flex-col w-full gap-4 max-w-md">
                <button 
                  onClick={() => setNyanCat(true)}
                  className="bg-red-600 text-white py-5 rounded-2xl font-black text-2xl hover:bg-red-700 transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                >
                  OK
                </button>
                <button 
                  onClick={startReinstall}
                  className="bg-blue-600 text-white py-5 rounded-2xl font-black text-2xl hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(37,99,235,0.3)]"
                >
                  <RefreshCw size={28} className="animate-spin-slow" />
                  {t.reinstall}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden">
            <img 
              src="https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif" 
              alt="Nyan Cat" 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-12 bg-black/20">
              <h1 className="text-white text-8xl font-black italic animate-bounce drop-shadow-[0_0_50px_rgba(255,255,255,0.5)]">
                NYAN NYAN NYAN
              </h1>
              <button 
                onClick={startReinstall}
                className="bg-white text-black px-12 py-5 rounded-full font-black text-3xl hover:bg-gray-200 transition-all transform hover:scale-110 active:scale-95 flex items-center gap-4 shadow-2xl"
              >
                <RefreshCw size={32} />
                {t.reinstall}
              </button>
            </div>
          </div>
        )
      )}

      {activeViruses.includes('noescape') && isSystemDeleted && (
        <div className="fixed inset-0 z-[9999] bg-blue-900 flex flex-col items-center justify-center text-white p-12 text-center">
          <X size={120} className="mb-8 text-red-500" />
          <h1 className="text-6xl font-black mb-4">{t.deletedTitle}</h1>
          <p className="text-2xl mb-12 opacity-80">{t.deletedMsg}</p>
          <button 
            onClick={startReset}
            className="bg-white text-blue-900 px-12 py-4 rounded-xl font-black text-2xl hover:bg-gray-100 transition-all transform hover:scale-110 active:scale-95 shadow-2xl"
          >
            {t.reset}
          </button>
        </div>
      )}

      {activeViruses.includes('bonzi') && (
        <div className="fixed bottom-20 right-10 z-[9998]">
          <div className="relative group cursor-pointer">
            <img 
              src="https://web.archive.org/web/20010401123456im_/http://www.bonzi.com/bonzibuddy/images/bonzi.gif" 
              alt="BonziBuddy" 
              className="w-48 animate-bounce"
              style={{ animationDuration: '3s' }}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/gorilla/200/200";
              }}
            />
            <div className="absolute -top-32 -left-32 bg-white p-6 rounded-3xl border-4 border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.4)] w-64 text-sm font-black text-purple-700 animate-pulse">
              <div className="relative">
                "HELLO THERE! I'm Bonzi! I've come to help you with everything! Especially your credit card info! HAHAHA!"
                <div className="absolute -bottom-6 right-4 w-6 h-6 bg-white border-r-4 border-b-4 border-purple-500 rotate-45" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
