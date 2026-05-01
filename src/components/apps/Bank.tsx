import React, { useState } from 'react';
import { useWindows } from '../../context/WindowContext';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownLeft, Clock, Send, Search, Users, Loader2 } from 'lucide-react';

export default function Bank() {
  const { credits, incomingRate, recentActivity, onlineUsers, donateCredits, createdAt, highestCredits, language } = useWindows();
  const [targetEmail, setTargetEmail] = useState('');
  const [targetUid, setTargetUid] = useState<string | undefined>(undefined);
  const [amount, setAmount] = useState('');
  const [isDonating, setIsDonating] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const t = ({
    pt: {
      balance: 'Saldo Total',
      credits: 'Créditos',
      incomeRate: 'Taxa de Renda',
      status: 'Status',
      active: 'Ativo',
      accountCreated: 'Conta Criada',
      highestBalance: 'Saldo Mais Alto',
      totalTime: 'Tempo Total Ativo',
      recentActivity: 'Atividade Recente',
      noActivity: 'Nenhuma atividade recente',
      sendCredits: 'Enviar Créditos',
      recipient: 'E-mail do Destinatário',
      amount: 'Quantidade',
      sendButton: 'Enviar Doação',
      onlinePlayers: 'Jogadores Online',
      noPlayers: 'Nenhum outro jogador online',
      footer: 'Banco do Windows 11 - Transferências Seguras de Créditos'
    },
    en: {
      balance: 'Total Balance',
      credits: 'Credits',
      incomeRate: 'Income Rate',
      status: 'Status',
      active: 'Active',
      accountCreated: 'Account Created',
      highestBalance: 'Highest Balance',
      totalTime: 'Total Time Active',
      recentActivity: 'Recent Activity',
      noActivity: 'No recent activity',
      sendCredits: 'Send Credits',
      recipient: 'Recipient Email',
      amount: 'Amount',
      sendButton: 'Send Donation',
      onlinePlayers: 'Online Players',
      noPlayers: 'No other players online',
      footer: 'Bank of Windows 11 - Secure Credit Transfers'
    },
    es: {
      balance: 'Saldo Total',
      credits: 'Créditos',
      incomeRate: 'Tasa de Ingresos',
      status: 'Estado',
      active: 'Activo',
      accountCreated: 'Cuenta Creada',
      highestBalance: 'Saldo Más Alto',
      totalTime: 'Tiempo Total Activo',
      recentActivity: 'Actividad Reciente',
      noActivity: 'Sin actividad reciente',
      sendCredits: 'Enviar Créditos',
      recipient: 'Correo del Destinatario',
      amount: 'Cantidad',
      sendButton: 'Enviar Donación',
      onlinePlayers: 'Jugadores en Línea',
      noPlayers: 'No hay otros jugadores en línea',
      footer: 'Banco de Windows 11 - Transferencias de Créditos Seguras'
    },
    nl: {
      balance: 'Totaal Saldo',
      credits: 'Credits',
      incomeRate: 'Inkomstenpercentage',
      status: 'Status',
      active: 'Actief',
      accountCreated: 'Account Aangemaakt',
      highestBalance: 'Hoogste Saldo',
      totalTime: 'Totaal Tijd Actief',
      recentActivity: 'Recente Activiteit',
      noActivity: 'Geen recente activiteit',
      sendCredits: 'Credits Versturen',
      recipient: 'E-mail Ontvanger',
      amount: 'Bedrag',
      sendButton: 'Donatie Versturen',
      onlinePlayers: 'Online Spelers',
      noPlayers: 'Geen andere spelers online',
      footer: 'Bank van Windows 11 - Veilige Creditoverdrachten'
    },
    zh: {
      balance: '总余额',
      credits: '积分',
      incomeRate: '收入率',
      status: '状态',
      active: '活跃',
      accountCreated: '账户创建于',
      highestBalance: '最高余额',
      totalTime: '总在线时间',
      recentActivity: '近期活动',
      noActivity: '暂无近期活动',
      sendCredits: '发送积分',
      recipient: '收款人邮箱',
      amount: '金额',
      sendButton: '发送捐赠',
      onlinePlayers: '在线玩家',
      noPlayers: '暂无其他玩家在线',
      footer: 'Windows 11 银行 - 安全积分转账'
    }
  } as Record<string, any>)[language] || (language.startsWith('pt') ? {
    balance: 'Saldo Total',
    credits: 'Créditos',
    incomeRate: 'Taxa de Renda',
    status: 'Status',
    active: 'Ativo',
    accountCreated: 'Conta Criada',
    highestBalance: 'Saldo Mais Alto',
    totalTime: 'Tempo Total Ativo',
    recentActivity: 'Atividade Recente',
    noActivity: 'Nenhuma atividade recente',
    sendCredits: 'Enviar Créditos',
    recipient: 'E-mail do Destinatário',
    amount: 'Quantidade',
    sendButton: 'Enviar Doação',
    onlinePlayers: 'Jogadores Online',
    noPlayers: 'Nenhum outro jogador online',
    footer: 'Banco do Windows 11 - Transferências Seguras de Créditos'
  } : {
    balance: 'Total Balance',
    credits: 'Credits',
    incomeRate: 'Income Rate',
    status: 'Status',
    active: 'Active',
    accountCreated: 'Account Created',
    highestBalance: 'Highest Balance',
    totalTime: 'Total Time Active',
    recentActivity: 'Recent Activity',
    noActivity: 'No recent activity',
    sendCredits: 'Send Credits',
    recipient: 'Recipient Email',
    amount: 'Amount',
    sendButton: 'Send Donation',
    onlinePlayers: 'Online Players',
    noPlayers: 'No other players online',
    footer: 'Bank of Windows 11 - Secure Credit Transfers'
  });

  const formatTimeElapsed = (dateStr: string | null) => {
    if (!dateStr) return '...';
    const start = new Date(dateStr).getTime();
    const now = new Date().getTime();
    const diff = now - start;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const [timeElapsed, setTimeElapsed] = useState(formatTimeElapsed(createdAt));

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(formatTimeElapsed(createdAt));
    }, 1000);
    return () => clearInterval(timer);
  }, [createdAt]);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetEmail || !amount) return;

    setIsDonating(true);
    setMessage(null);

    const result = await donateCredits(targetEmail, parseInt(amount), targetUid);
    
    if (result.success) {
      setMessage({ text: language.startsWith('pt') ? `Doação de ${amount} créditos enviada com sucesso para ${targetEmail}!` : `Successfully donated ${amount} credits to ${targetEmail}!`, type: 'success' });
      setAmount('');
      setTargetEmail('');
      setTargetUid(undefined);
    } else {
      setMessage({ text: result.error || 'Donation failed', type: 'error' });
    }
    
    setIsDonating(false);
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <div className="h-full bg-zinc-50 flex flex-col">
      <div className="bg-blue-700 p-8 text-white">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-blue-200 text-sm font-medium mb-1">{t.balance}</p>
            <h1 className="text-4xl font-bold flex items-center gap-2">
              <Wallet size={32} />
              {credits.toLocaleString()} <span className="text-xl font-normal opacity-70">{t.credits}</span>
            </h1>
          </div>
          <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
            <TrendingUp className="text-green-400" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="text-green-400" size={20} />
            </div>
            <div>
              <p className="text-xs text-blue-200">{t.incomeRate}</p>
              <p className="font-bold">{incomingRate} {t.credits}/sec</p>
            </div>
          </div>
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Clock className="text-blue-300" size={20} />
            </div>
            <div>
              <p className="text-xs text-blue-200">{t.status}</p>
              <p className="font-bold">{t.active}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Activity & Stats */}
        <div className="flex-1 p-6 overflow-auto border-r border-zinc-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
              <p className="text-[10px] text-zinc-400 uppercase font-bold mb-1">{t.accountCreated}</p>
              <p className="text-xs font-medium text-zinc-700">
                {createdAt ? new Date(createdAt).toLocaleString(language) : 'Loading...'}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
              <p className="text-[10px] text-zinc-400 uppercase font-bold mb-1">{t.highestBalance}</p>
              <p className="text-xs font-bold text-blue-600">
                {highestCredits.toLocaleString()} {t.credits}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm col-span-full">
              <p className="text-[10px] text-zinc-400 uppercase font-bold mb-1">{t.totalTime}</p>
              <p className="text-sm font-bold text-zinc-800 flex items-center gap-2">
                <Clock size={14} className="text-blue-500" />
                {timeElapsed}
              </p>
            </div>
          </div>

          <h2 className="text-lg font-bold text-zinc-800 mb-4 flex items-center gap-2">
            <Clock size={18} className="text-zinc-400" />
            {t.recentActivity}
          </h2>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="bg-white p-4 rounded-xl border border-zinc-200 flex items-center justify-between shadow-sm animate-in slide-in-from-top duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500">
                      {activity.type === 'positive' ? <ArrowDownLeft size={20} className="text-green-500" /> : <ArrowUpRight size={20} className="text-red-500" />}
                    </div>
                    <div>
                      <p className="font-bold text-zinc-800 text-sm">{activity.title}</p>
                      <p className="text-[10px] text-zinc-500">{activity.subtitle}</p>
                    </div>
                  </div>
                  <p className={`${activity.type === 'positive' ? 'text-green-600' : 'text-red-600'} font-bold text-sm`}>
                    {activity.amount}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-zinc-400 text-sm">{t.noActivity}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Donations & Online Users */}
        <div className="w-80 p-6 bg-zinc-100/50 overflow-auto flex flex-col gap-6">
          {/* Donation Form */}
          <section>
            <h2 className="text-sm font-bold text-zinc-800 mb-4 flex items-center gap-2">
              <Send size={16} className="text-blue-600" />
              {t.sendCredits}
            </h2>
            <form onSubmit={handleDonate} className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                <input 
                  type="email"
                  placeholder={t.recipient}
                  value={targetEmail}
                  onChange={(e) => {
                    setTargetEmail(e.target.value);
                    setTargetUid(undefined); // Reset UID if typing manually
                  }}
                  className="w-full bg-white border border-zinc-200 rounded-lg py-2 pl-9 pr-4 text-xs outline-none focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <input 
                type="number"
                placeholder={t.amount}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-lg py-2 px-4 text-xs outline-none focus:border-blue-500 transition-all"
                required
                min="1"
              />
              <button 
                type="submit"
                disabled={isDonating || !targetEmail || !amount}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                {isDonating ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                {t.sendButton}
              </button>
              {message && (
                <p className={`text-[10px] text-center p-2 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {message.text}
                </p>
              )}
            </form>
          </section>

          {/* Online Users */}
          <section className="flex-1">
            <h2 className="text-sm font-bold text-zinc-800 mb-4 flex items-center gap-2">
              <Users size={16} className="text-green-600" />
              {t.onlinePlayers}
            </h2>
            <div className="space-y-2">
              {onlineUsers.length > 0 ? (
                onlineUsers.map((u) => (
                  <button
                    key={u.uid}
                    onClick={() => {
                      setTargetEmail(u.email);
                      setTargetUid(u.uid);
                    }}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all group border ${targetUid === u.uid ? 'bg-white border-blue-500 shadow-sm' : 'hover:bg-white border-transparent hover:border-zinc-200'}`}
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-[10px] font-bold">
                      {u.email.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="text-left overflow-hidden">
                      <p className="text-[11px] font-medium text-zinc-700 truncate">{u.email}</p>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-[9px] text-zinc-400">Online</span>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-[10px] text-zinc-400 italic text-center py-4">{t.noPlayers}</p>
              )}
            </div>
          </section>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-zinc-200">
        <p className="text-center text-zinc-400 text-[10px] italic">
          {t.footer}
        </p>
      </div>
    </div>
  );
}
