import { useState, useEffect } from 'react';
import { useWindows } from '../../context/WindowContext';
import { THEMES } from '../../constants';

export default function Notepad() {
  const [text, setText] = useState('');
  const { activateCheatCode, isCheatActive, systemTheme, language } = useWindows();
  const isDark = THEMES[systemTheme].mode === 'dark';

  const t = ({
    pt: { file: 'Arquivo', edit: 'Editar', format: 'Formatar', view: 'Exibir', help: 'Ajuda', placeholder: 'Comece a digitar...' },
    en: { file: 'File', edit: 'Edit', format: 'Format', view: 'View', help: 'Help', placeholder: 'Start typing...' },
    es: { file: 'Archivo', edit: 'Edición', format: 'Formato', view: 'Ver', help: 'Ayuda', placeholder: 'Empieza a escribir...' },
    fr: { file: 'Fichier', edit: 'Modifier', format: 'Format', view: 'Affichage', help: 'Aide', placeholder: 'Commencez à taper...' },
    it: { file: 'File', edit: 'Modifica', format: 'Formato', view: 'Visualizza', help: 'Guida', placeholder: 'Inizia a scrivere...' },
    de: { file: 'Datei', edit: 'Bearbeiten', format: 'Format', view: 'Ansicht', help: 'Hilfe', placeholder: 'Fangen Sie an te tippen...' },
    nl: { file: 'Bestand', edit: 'Bewerken', format: 'Opmaak', view: 'Beeld', help: 'Help', placeholder: 'Begin met typen...' },
    zh: { file: '文件', edit: '编辑', format: '格式', view: '查看', help: '帮助', placeholder: '开始输入...' }
  } as Record<string, any>)[language] || (language.startsWith('pt') ? { file: 'Arquivo', edit: 'Editar', format: 'Formatar', view: 'Exibir', help: 'Ajuda', placeholder: 'Comece a digitar...' } : { file: 'File', edit: 'Edit', format: 'Format', view: 'View', help: 'Help', placeholder: 'Start typing...' });

  useEffect(() => {
    if (text.includes('WIN11bp1') && !isCheatActive) {
      activateCheatCode();
    }
  }, [text, isCheatActive, activateCheatCode]);

  return (
    <div className={`h-full flex flex-col ${isDark ? 'bg-[#1e1e1e] text-gray-200' : 'bg-white text-gray-900'}`}>
      <div className={`flex items-center gap-4 px-4 py-1 text-xs border-b ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
        <span className={`px-2 py-1 rounded cursor-pointer transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-200'}`}>{t.file}</span>
        <span className={`px-2 py-1 rounded cursor-pointer transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-200'}`}>{t.edit}</span>
        <span className={`px-2 py-1 rounded cursor-pointer transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-200'}`}>{t.format}</span>
        <span className={`px-2 py-1 rounded cursor-pointer transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-200'}`}>{t.view}</span>
        <span className={`px-2 py-1 rounded cursor-pointer transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-200'}`}>{t.help}</span>
      </div>
      <textarea
        className={`flex-1 w-full p-4 outline-none resize-none font-mono text-sm bg-transparent ${isDark ? 'text-gray-200 placeholder-gray-600' : 'text-gray-900'}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.placeholder}
        spellCheck={false}
      />
      <div className={`h-6 border-t flex items-center justify-end px-4 text-[10px] gap-4 ${isDark ? 'bg-white/5 border-white/5 text-gray-500' : 'bg-gray-100 border-gray-100 text-gray-500'}`}>
        <span>Ln 1, Col 1</span>
        <span>100%</span>
        <span>Windows (CRLF)</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
