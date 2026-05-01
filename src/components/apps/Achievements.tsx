import React from 'react';
import { useWindows } from '../../context/WindowContext';
import { Trophy, Lock, CheckCircle2, Star } from 'lucide-react';

export default function Achievements() {
  const { achievements, language } = useWindows();

  const translations = {
    pt: {
      title: 'Conquistas',
      subtitle: 'Acompanhe seu progresso e marcos especiais',
      unlocked: 'Desbloqueado',
      total: 'Total Desbloqueado',
      achievements: {
        cheat_activated: { title: 'Código Secreto Ativado', desc: 'Digita ??? no Notepad' },
        '5000_cheats': { title: '5000 Créditos com Cheats', desc: 'Consiga 5000 créditos usando cheats (Cheats Are good)' },
        '5000_no_cheats': { title: 'Eu tenho muito tempo livre', desc: 'Consiga 5000 créditos sem usar cheats' },
        '100000_no_cheats': { title: 'Tempo não é problema', desc: 'Consiga 100.000 créditos sem usar cheats' },
        '100000_cheats': { title: 'Eu amo cheats', desc: 'Consiga 100.000 créditos usando cheats' },
        '5h_active': { title: 'Usuário Regular', desc: 'Fique ativo por 5 horas' },
        '10h_active': { title: 'Cidadão Leal', desc: 'Fique ativo por 10 horas' }
      }
    },
    en: {
      title: 'Achievements',
      subtitle: 'Track your progress and special milestones',
      unlocked: 'Unlocked',
      total: 'Total Unlocked',
      achievements: {
        cheat_activated: { title: 'Cheat Code Activated', desc: 'Type ??? in Notepad' },
        '5000_cheats': { title: '5000 Credits with Cheats', desc: 'Get 5000 credits using cheats (Cheats Are good)' },
        '5000_no_cheats': { title: 'I have a lot of free time', desc: 'Get 5000 credits without using cheats' },
        '100000_no_cheats': { title: 'Time is not a problem', desc: 'Get 100,000 credits without using cheats' },
        '100000_cheats': { title: 'I love cheats', desc: 'Get 100,000 credits using cheats' },
        '5h_active': { title: 'Regular User', desc: 'Stay active for 5 hours' },
        '10h_active': { title: 'Loyal Citizen', desc: 'Stay active for 10 hours' }
      }
    },
    es: {
      title: 'Logros',
      subtitle: 'Sigue tu progreso y hitos especiales',
      unlocked: 'Desbloqueado',
      total: 'Total Desbloqueado',
      achievements: {
        cheat_activated: { title: 'Código Secreto Activado', desc: 'Escribe ??? en el Bloc de notas' },
        '5000_cheats': { title: '5000 Créditos con Cheats', desc: 'Consigue 5000 créditos usando cheats (Cheats Are good)' },
        '5000_no_cheats': { title: 'Tengo mucho tiempo libre', desc: 'Consigue 5000 créditos sin usar cheats' },
        '100000_no_cheats': { title: 'Time is not a problem', desc: 'Consigue 100.000 créditos sin usar cheats' },
        '100000_cheats': { title: 'I love cheats', desc: 'Consigue 100.000 créditos usando cheats' },
        '5h_active': { title: 'Usuario Regular', desc: 'Mantente activo por 5 horas' },
        '10h_active': { title: 'Ciudadano Leal', desc: 'Mantente activo por 10 horas' }
      }
    }
  }[language];

  return (
    <div className="h-full bg-zinc-50 flex flex-col">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-8 text-white">
        <div className="flex items-center gap-4 mb-2">
          <Trophy size={32} />
          <h1 className="text-3xl font-bold">{translations.title}</h1>
        </div>
        <p className="text-yellow-100 opacity-80">{translations.subtitle}</p>
      </div>

      <div className="p-6 flex-1 overflow-auto">
        <div className="grid gap-4">
          {achievements.map((ach) => {
            const achTrans = translations.achievements[ach.id as keyof typeof translations.achievements];
            return (
              <div 
                key={ach.id} 
                className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${
                  ach.unlocked 
                    ? 'bg-white border-yellow-200 shadow-md' 
                    : 'bg-zinc-100 border-zinc-200 grayscale opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  ach.unlocked ? 'bg-yellow-100 text-yellow-600' : 'bg-zinc-200 text-zinc-400'
                }`}>
                  {ach.unlocked ? <Star size={24} fill="currentColor" /> : <Lock size={24} />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-bold ${ach.unlocked ? 'text-zinc-800' : 'text-zinc-500'}`}>
                      {achTrans?.title || ach.title}
                    </h3>
                    {ach.unlocked && <CheckCircle2 size={16} className="text-green-500" />}
                  </div>
                  <p className="text-sm text-zinc-500">{achTrans?.desc || ach.description}</p>
                  {ach.unlocked && ach.unlockedAt && (
                    <p className="text-[10px] text-zinc-400 mt-1 uppercase tracking-wider">
                      {translations.unlocked}: {new Date(ach.unlockedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 bg-white border-t border-zinc-200 text-center">
        <p className="text-xs text-zinc-400">
          {translations.total}: {achievements.filter(a => a.unlocked).length} / {achievements.length}
        </p>
      </div>
    </div>
  );
}
