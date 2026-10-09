import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Play, RotateCcw, CheckCircle2, AlertTriangle, X, Search } from 'lucide-react';
import { TurmaRanking } from '../data/quizQuestions';

interface RankingViewProps {
  turmas: TurmaRanking[];
  onJogarQuiz: () => void;
  onResetarPontos: (modo: 'zerar' | 'padrao') => void;
}

export const RankingView: React.FC<RankingViewProps> = ({
  turmas,
  onJogarQuiz,
  onResetarPontos,
}) => {
  const [modalResetAberto, setModalResetAberto] = useState(false);
  const [notificacao, setNotificacao] = useState<string | null>(null);
  const [filtroAba, setFiltroAba] = useState<'todos' | '1' | '2' | '3' | 'especial'>('todos');
  const [termoBusca, setTermoBusca] = useState('');

  useEffect(() => {
    if (notificacao) {
      const timer = setTimeout(() => setNotificacao(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notificacao]);

  // Ordenar turmas pela pontuação decrescente
  const turmasOrdenadas = [...turmas].sort((a, b) => b.pontos - a.pontos);
  const pontuacaoMaxima = turmasOrdenadas[0]?.pontos || 1000;

  // Filtragem por aba e texto
  const turmasFiltradas = turmasOrdenadas.filter((turma) => {
    if (filtroAba === '1' && !turma.nome.startsWith('1°')) return false;
    if (filtroAba === '2' && !turma.nome.startsWith('2°')) return false;
    if (filtroAba === '3' && !turma.nome.startsWith('3°')) return false;
    if (filtroAba === 'especial' && turma.nome.match(/^[123]°/)) return false;
    if (termoBusca.trim()) {
      const termo = termoBusca.toLowerCase();
      return turma.nome.toLowerCase().includes(termo) || turma.curso.toLowerCase().includes(termo);
    }
    return true;
  });

  const handleConfirmarReset = (modo: 'zerar' | 'padrao') => {
    onResetarPontos(modo);
    setModalResetAberto(false);
    if (modo === 'zerar') {
      setNotificacao('Placar zerado! Todas as turmas agora estão com 0 XP.');
    } else {
      setNotificacao('Pontuações padrão do CEEP restauradas com sucesso!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Notificação de sucesso ao resetar */}
      {notificacao && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-semibold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{notificacao}</span>
          </div>
          <button
            onClick={() => setNotificacao(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold px-2 py-1 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Cabeçalho */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Placar Geral das Turmas
        </h1>
        <p className="text-sm text-slate-600">
          Disputa acirrada do 1º ao 3º ano (A ao M), Visitantes e Avaliadores na EXPOCEEP 2026.
        </p>
      </div>

      {/* Pódio dos 3 Primeiros Colocados Gerais */}
      {turmasOrdenadas.length >= 3 && (
        <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
          {/* 2º Lugar */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 text-center flex flex-col justify-end items-center shadow-xs">
            <Medal className="w-6 h-6 text-slate-400 mb-1" />
            <span className="text-[11px] font-bold uppercase text-slate-400">2º Lugar</span>
            <span className="text-base sm:text-lg font-extrabold text-slate-900">
              {turmasOrdenadas[1].nome}
            </span>
            <span className="text-xs font-bold text-slate-600 mt-1">
              {turmasOrdenadas[1].pontos} XP
            </span>
          </div>

          {/* 1º Lugar (Destaque) */}
          <div className="bg-amber-50/70 rounded-2xl p-3 sm:p-5 border-2 border-amber-300 text-center flex flex-col justify-end items-center shadow-sm relative -top-2">
            <Trophy className="w-8 h-8 text-amber-500 mb-1 animate-bounce" />
            <span className="text-xs font-bold uppercase text-amber-700">1º Lugar 👑</span>
            <span className="text-lg sm:text-xl font-black text-slate-900">
              {turmasOrdenadas[0].nome}
            </span>
            <span className="text-sm font-extrabold text-amber-800 mt-1">
              {turmasOrdenadas[0].pontos} XP
            </span>
          </div>

          {/* 3º Lugar */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 text-center flex flex-col justify-end items-center shadow-xs">
            <Award className="w-6 h-6 text-amber-700 mb-1" />
            <span className="text-[11px] font-bold uppercase text-amber-700">3º Lugar</span>
            <span className="text-base sm:text-lg font-extrabold text-slate-900">
              {turmasOrdenadas[2].nome}
            </span>
            <span className="text-xs font-bold text-slate-600 mt-1">
              {turmasOrdenadas[2].pontos} XP
            </span>
          </div>
        </div>
      )}

      {/* Barra de Filtro e Busca */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs space-y-2.5">
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
          {/* Abas */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-bold w-full sm:w-auto overflow-x-auto">
            <button
              type="button"
              onClick={() => setFiltroAba('todos')}
              className={`py-1.5 px-2.5 rounded-lg transition whitespace-nowrap cursor-pointer ${
                filtroAba === 'todos' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas ({turmas.length})
            </button>
            <button
              type="button"
              onClick={() => setFiltroAba('1')}
              className={`py-1.5 px-2.5 rounded-lg transition whitespace-nowrap cursor-pointer ${
                filtroAba === '1' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1º Ano
            </button>
            <button
              type="button"
              onClick={() => setFiltroAba('2')}
              className={`py-1.5 px-2.5 rounded-lg transition whitespace-nowrap cursor-pointer ${
                filtroAba === '2' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2º Ano
            </button>
            <button
              type="button"
              onClick={() => setFiltroAba('3')}
              className={`py-1.5 px-2.5 rounded-lg transition whitespace-nowrap cursor-pointer ${
                filtroAba === '3' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3º Ano
            </button>
            <button
              type="button"
              onClick={() => setFiltroAba('especial')}
              className={`py-1.5 px-2.5 rounded-lg transition whitespace-nowrap cursor-pointer ${
                filtroAba === 'especial' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Especiais
            </button>
          </div>

          {/* Campo de Busca Rápida */}
          <div className="relative w-full sm:w-48">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              placeholder="Buscar turma..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-orange-500 bg-slate-50/50"
            />
          </div>
        </div>
      </div>

      {/* Tabela Completa */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Classificação ({turmasFiltradas.length} exibidas)
          </span>
          <span className="text-xs text-slate-500">Total: {turmas.length} participantes</span>
        </div>

        <div className="divide-y divide-slate-100 max-h-[520px] overflow-y-auto">
          {turmasFiltradas.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              Nenhuma turma encontrada para "{termoBusca}".
            </div>
          ) : (
            turmasFiltradas.map((turma) => {
              const posicaoGeral = turmasOrdenadas.findIndex((t) => t.id === turma.id) + 1;
              const porcentagem = Math.round((turma.pontos / pontuacaoMaxima) * 100);

              return (
                <div
                  key={turma.id}
                  className="px-4 sm:px-5 py-3 flex items-center gap-3 sm:gap-4 hover:bg-slate-50/80 transition-colors"
                >
                  {/* Posição Geral */}
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      posicaoGeral === 1
                        ? 'bg-amber-100 text-amber-800 font-extrabold'
                        : posicaoGeral === 2
                        ? 'bg-slate-200 text-slate-700'
                        : posicaoGeral === 3
                        ? 'bg-amber-50 text-amber-900'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {posicaoGeral}º
                  </span>

                  {/* Info da Turma */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 text-sm truncate">
                        {turma.nome}
                      </span>
                      <span className="font-extrabold text-sm text-slate-900 shrink-0">
                        {turma.pontos} XP
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full transition-all"
                          style={{ width: `${Math.max(porcentagem, 2)}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 shrink-0 truncate max-w-[140px] sm:max-w-none">
                        {turma.curso}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Ações inferiores */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={onJogarQuiz}
          className="flex-1 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Jogar Quizz para Somar Pontos</span>
        </button>

        <button
          type="button"
          onClick={() => setModalResetAberto(true)}
          className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
          title="Opções para resetar ou zerar pontos"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Resetar Pontos</span>
        </button>
      </div>

      {/* Modal de Confirmação e Opções de Reset */}
      {modalResetAberto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
          onClick={() => setModalResetAberto(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Topo do Modal */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Resetar Pontuação das Turmas
                  </h3>
                  <p className="text-xs text-slate-500">
                    Como você deseja redefinir o placar da EXPOCEEP?
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalResetAberto(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Opções */}
            <div className="space-y-3 pt-2">
              {/* Opção 1: Zerar Tudo (0 XP) */}
              <button
                type="button"
                onClick={() => handleConfirmarReset('zerar')}
                className="w-full p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100/70 text-left transition flex items-center justify-between group cursor-pointer"
              >
                <div className="pr-2">
                  <span className="block font-bold text-sm text-rose-950 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    Zerar todos os pontos (0 XP)
                  </span>
                  <span className="block text-xs text-rose-700 mt-0.5">
                    Deixa todas as turmas com 0 pontos para iniciar uma nova competição do zero.
                  </span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-rose-600 text-white shrink-0 shadow-xs">
                  0 XP
                </span>
              </button>

              {/* Opção 2: Restaurar Padrão de Demonstração */}
              <button
                type="button"
                onClick={() => handleConfirmarReset('padrao')}
                className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100/90 text-left transition flex items-center justify-between group cursor-pointer"
              >
                <div className="pr-2">
                  <span className="block font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <RotateCcw className="w-4 h-4 text-slate-600 shrink-0" />
                    Restaurar pontos iniciais padrão
                  </span>
                  <span className="block text-xs text-slate-500 mt-0.5">
                    Restaura os valores demonstrativos originais (3°M 1200 XP, 3°A 950 XP, etc.).
                  </span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700 shrink-0">
                  Padrão
                </span>
              </button>
            </div>

            {/* Rodapé do Modal */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setModalResetAberto(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
