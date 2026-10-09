import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Sparkles,
  School,
  Users,
  GraduationCap,
  Brain,
  Calculator,
} from 'lucide-react';
import { Question, TurmaRanking, PERGUNTAS_QUIZ } from '../data/quizQuestions';

interface QuizViewProps {
  turmas: TurmaRanking[];
  onAdicionarPontos: (turmaId: number, pontos: number) => void;
  onVerRanking: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  turmas,
  onAdicionarPontos,
  onVerRanking,
}) => {
  // ==============================================================
  // 1. VARIÁVEIS DE ESTADO (Guardam as informações da partida)
  // ==============================================================
  
  // Em qual tela do jogo estamos? ('inicio', 'jogando' ou 'resultado')
  const [fase, setFase] = useState<'inicio' | 'jogando' | 'resultado'>('inicio');

  // Nome do aluno que está jogando
  const [nomeAluno, setNomeAluno] = useState('');
  const [erroNome, setErroNome] = useState(false);

  // ID da turma que o aluno escolheu para pontuar (padrão inicial no 1°A ou primeiro existente)
  const [turmaSelecionadaId, setTurmaSelecionadaId] = useState<number>(() => {
    return turmas[0]?.id || 1;
  });

  // Aba ativa de escolha rápida de turmas: 1º Ano, 2º Ano, 3º Ano, Especiais
  const [abaAno, setAbaAno] = useState<'1' | '2' | '3' | 'especial'>('1');

  // Perguntas selecionadas para esta rodada (5 perguntas do banco unificado)
  const [perguntasRodada, setPerguntasRodada] = useState<Question[]>([]);

  // Número da pergunta atual (começa em 0 para a 1ª pergunta)
  const [indiceAtual, setIndiceAtual] = useState(0);

  // Qual alternativa o aluno clicou ('A', 'B', 'C' ou 'D')
  const [respostaSelecionada, setRespostaSelecionada] = useState<'A' | 'B' | 'C' | 'D' | null>(null);

  // Controla se o aluno já respondeu a pergunta atual (para bloquear novos cliques)
  const [respondido, setRespondido] = useState(false);

  // Total de acertos da rodada (0 a 5)
  const [acertos, setAcertos] = useState(0);

  // Total de pontos somados na rodada
  const [pontosGanhos, setPontosGanhos] = useState(0);

  // Turma selecionada atualmente
  const turmaAtual = turmas.find((t) => t.id === turmaSelecionadaId) || turmas[0];

  // Pergunta que está sendo exibida no momento
  const perguntaAtual = perguntasRodada[indiceAtual];

  // ==============================================================
  // 2. FUNÇÕES DO JOGO
  // ==============================================================

  // Inicia o Quiz quando o aluno clica no botão "Começar" (perguntas unificadas de raciocínio lógico e matemática)
  const handleIniciarQuiz = (e: React.FormEvent) => {
    e.preventDefault(); // Impede a página de recarregar
    if (!nomeAluno.trim()) {
      setErroNome(true);
      return;
    }
    setErroNome(false);

    // Sem separação de tema: sorteia 5 perguntas do banco completo misturando lógica e matemática
    const sorteadas = [...PERGUNTAS_QUIZ]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    setPerguntasRodada(sorteadas);
    setIndiceAtual(0);
    setAcertos(0);
    setPontosGanhos(0);
    setRespostaSelecionada(null);
    setRespondido(false);
    setFase('jogando'); // Muda a tela para o jogo
  };

  // Verifica a resposta quando o aluno clica em uma alternativa (A, B, C ou D)
  const handleSelecionarAlternativa = (letra: 'A' | 'B' | 'C' | 'D') => {
    if (respondido) return; // Se já respondeu, não faz nada

    setRespostaSelecionada(letra);
    setRespondido(true);

    // Se acertou, soma acertos e pontos
    const acertou = letra === perguntaAtual.resposta_correta;
    if (acertou) {
      setAcertos((total) => total + 1);
      setPontosGanhos((pontos) => pontos + perguntaAtual.pontos);
    }
  };

  // Avança para a próxima pergunta ou encerra o jogo
  const handleProximaPergunta = () => {
    if (indiceAtual + 1 < perguntasRodada.length) {
      // Vai para a próxima pergunta
      setIndiceAtual((indice) => indice + 1);
      setRespostaSelecionada(null);
      setRespondido(false);
    } else {
      // Chegou na última pergunta: salva os pontos na turma do aluno!
      if (pontosGanhos > 0) {
        onAdicionarPontos(turmaSelecionadaId, pontosGanhos);
      }

      // Solta efeito visual de confetes de comemoração
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      setFase('resultado'); // Mostra a tela final
    }
  };

  // Reinicia o jogo para o aluno poder jogar novamente
  const handleJogarNovamente = () => {
    setFase('inicio');
    setRespostaSelecionada(null);
    setRespondido(false);
  };

  // Filtra turmas por ano para renderizar botões rápidos
  const turmas1Ano = turmas.filter((t) => t.nome.startsWith('1°'));
  const turmas2Ano = turmas.filter((t) => t.nome.startsWith('2°'));
  const turmas3Ano = turmas.filter((t) => t.nome.startsWith('3°'));
  const turmasEspeciais = turmas.filter((t) => !t.nome.match(/^[123]°/));

  const turmasExibidasAba =
    abaAno === '1'
      ? turmas1Ano
      : abaAno === '2'
      ? turmas2Ano
      : abaAno === '3'
      ? turmas3Ano
      : turmasEspeciais;

  // ==============================================================
  // 3. TELA 1: FORMULÁRIO DE INÍCIO (NOME E TURMA)
  // ==============================================================
  if (fase === 'inicio') {
    return (
      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          {/* Cabeçalho */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Desafio Escolar 2026
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Quizz Entre Turmas
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Desafios rápidos de <strong>Raciocínio Lógico & Matemática</strong>. Ganhe pontos e coloque sua turma no topo!
            </p>
          </div>

          <form onSubmit={handleIniciarQuiz} className="space-y-5">
            {/* Campo: Nome do Aluno */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Seu Nome ou Apelido
              </label>
              <input
                type="text"
                value={nomeAluno}
                onChange={(e) => {
                  setNomeAluno(e.target.value);
                  if (erroNome) setErroNome(false);
                }}
                placeholder="Ex: Lucas Silva"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm font-medium transition ${
                  erroNome
                    ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30 bg-rose-50/30'
                    : 'border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
                }`}
                required
              />
              {erroNome && (
                <p className="text-xs text-rose-600 font-semibold mt-1.5">
                  Por favor, digite seu nome ou apelido para começar o quiz!
                </p>
              )}
            </div>

            {/* Campo: Escolha da Turma / Participação */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Sua Turma ou Categoria
                </label>
                <span className="text-[11px] text-slate-500">
                  {turmas.length} opções disponíveis
                </span>
              </div>

              {/* Abas de Navegação Rápida: 1º Ano, 2º Ano, 3º Ano, Especiais */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setAbaAno('1')}
                  className={`py-2 px-1 rounded-lg transition text-center cursor-pointer ${
                    abaAno === '1'
                      ? 'bg-white text-orange-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  1º Ano (A-M)
                </button>
                <button
                  type="button"
                  onClick={() => setAbaAno('2')}
                  className={`py-2 px-1 rounded-lg transition text-center cursor-pointer ${
                    abaAno === '2'
                      ? 'bg-white text-orange-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  2º Ano (A-M)
                </button>
                <button
                  type="button"
                  onClick={() => setAbaAno('3')}
                  className={`py-2 px-1 rounded-lg transition text-center cursor-pointer ${
                    abaAno === '3'
                      ? 'bg-white text-orange-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  3º Ano (A-M)
                </button>
                <button
                  type="button"
                  onClick={() => setAbaAno('especial')}
                  className={`py-2 px-1 rounded-lg transition text-center cursor-pointer ${
                    abaAno === 'especial'
                      ? 'bg-white text-orange-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Especiais
                </button>
              </div>

              {/* Botões Rápidos da Aba Ativa */}
              {abaAno !== 'especial' ? (
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 pt-1">
                  {turmasExibidasAba.map((t) => {
                    const selecionada = t.id === turmaSelecionadaId;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTurmaSelecionadaId(t.id)}
                        className={`py-2.5 px-2 rounded-xl border text-center transition cursor-pointer font-extrabold text-sm sm:text-base ${
                          selecionada
                            ? 'border-orange-600 bg-orange-500 text-white shadow-xs ring-2 ring-orange-500/20'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800 hover:bg-slate-50'
                        }`}
                        title={`${t.nome} - ${t.curso} (${t.pontos} XP)`}
                      >
                        {t.nome}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {turmasEspeciais.map((t) => {
                    const selecionada = t.id === turmaSelecionadaId;
                    const ehAvaliador = t.nome === 'Avaliador';
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTurmaSelecionadaId(t.id)}
                        className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                          selecionada
                            ? 'border-orange-600 bg-orange-50/80 ring-2 ring-orange-500/20'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 mb-1">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              selecionada
                                ? 'bg-orange-600 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {ehAvaliador ? (
                              <GraduationCap className="w-4 h-4" />
                            ) : (
                              <Users className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <span className="block font-bold text-sm text-slate-900">
                              {t.nome}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {t.pontos} XP acumulados
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-1">{t.curso}</p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Indicador visual da turma selecionada */}
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                  <span className="truncate">
                    Pontuando para:{' '}
                    <strong className="text-orange-950 font-black text-sm sm:text-base">
                      {turmaAtual.nome}
                    </strong>
                    <span className="text-slate-500 ml-1.5 hidden sm:inline text-xs">
                      • {turmaAtual.curso}
                    </span>
                  </span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white text-orange-700 border border-orange-200 shrink-0">
                  {turmaAtual.pontos} XP
                </span>
              </div>

              {/* Menu suspenso (select) alternativo para acesso direto */}
              <div className="pt-1">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Ou selecione pela lista completa:
                </label>
                <select
                  value={turmaSelecionadaId}
                  onChange={(e) => {
                    const id = Number(e.target.value);
                    setTurmaSelecionadaId(id);
                    const sel = turmas.find((t) => t.id === id);
                    if (sel) {
                      if (sel.nome.startsWith('1°')) setAbaAno('1');
                      else if (sel.nome.startsWith('2°')) setAbaAno('2');
                      else if (sel.nome.startsWith('3°')) setAbaAno('3');
                      else setAbaAno('especial');
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-orange-500 cursor-pointer"
                >
                  <optgroup label="1º Ano do Ensino Médio (A ao M)">
                    {turmas1Ano.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nome} — {t.curso} ({t.pontos} XP)
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="2º Ano do Ensino Médio (A ao M)">
                    {turmas2Ano.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nome} — {t.curso} ({t.pontos} XP)
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="3º Ano do Ensino Médio (A ao M)">
                    {turmas3Ano.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nome} — {t.curso} ({t.pontos} XP)
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Participações Especiais">
                    {turmasEspeciais.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nome} — {t.curso} ({t.pontos} XP)
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Destaque do Quizz Unificado */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                <Brain className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-600">
                <strong className="text-slate-900 block font-bold">Quizz Unificado</strong>
                5 perguntas sorteadas aleatoriamente combinando Raciocínio Lógico e Matemática (+30 XP cada acerto).
              </div>
            </div>

            {/* Botão para Iniciar */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-base shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Começar o Quizz agora 🚀
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==============================================================
  // 4. TELA 2: JOGANDO O QUIZZ (PERGUNTAS E ALTERNATIVAS)
  // ==============================================================
  if (fase === 'jogando' && perguntaAtual) {
    const totalPerguntas = perguntasRodada.length;
    const progressoPercentual = ((indiceAtual + 1) / totalPerguntas) * 100;

    return (
      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          {/* Barra de Progresso */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <div className="flex items-center gap-2">
                <span>
                  Pergunta <strong className="text-slate-900">{indiceAtual + 1}</strong> de{' '}
                  {totalPerguntas}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-800">
                  {perguntaAtual.categoria === 'logica' ? '🧩 Lógica' : '🔢 Matemática'}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                Pontuando para: <strong className="text-orange-600">{turmaAtual.nome}</strong>
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-600 transition-all duration-300"
                style={{ width: `${progressoPercentual}%` }}
              />
            </div>
          </div>

          {/* Enunciado da Pergunta */}
          <div className="py-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {perguntaAtual.enunciado}
            </h2>
          </div>

          {/* As 4 Alternativas de Resposta */}
          <div className="space-y-2.5">
            {perguntaAtual.alternativas.map((alt) => {
              const selecionada = respostaSelecionada === alt.letra;
              const ehCorreta = alt.letra === perguntaAtual.resposta_correta;

              // Cores do botão: Verde se acertou, Vermelho se errou
              let estiloBotao = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800';

              if (respondido) {
                if (ehCorreta) {
                  estiloBotao = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                } else if (selecionada) {
                  estiloBotao = 'border-rose-400 bg-rose-50 text-rose-950 line-through';
                } else {
                  estiloBotao = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={alt.letra}
                  onClick={() => handleSelecionarAlternativa(alt.letra)}
                  disabled={respondido}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${estiloBotao}`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      respondido && ehCorreta
                        ? 'bg-emerald-600 text-white'
                        : respondido && selecionada
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {alt.letra}
                  </span>
                  <span className="text-sm font-medium pt-0.5 leading-snug flex-1">
                    {alt.texto}
                  </span>
                  {respondido && ehCorreta && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {respondido && selecionada && !ehCorreta && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Caixa de Explicação que aparece após responder */}
          {respondido && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
              <span className="font-bold text-slate-900 block">
                {respostaSelecionada === perguntaAtual.resposta_correta
                  ? '✅ Resposta certa! +30 Pontos'
                  : '❌ Resposta incorreta!'}
              </span>
              <p>{perguntaAtual.explicacao}</p>
            </div>
          )}

          {/* Botão de Próxima Pergunta */}
          {respondido && (
            <button
              onClick={handleProximaPergunta}
              className="w-full py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>
                {indiceAtual + 1 < totalPerguntas ? 'Próxima Pergunta' : 'Finalizar Quizz e Ver Pontos'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ==============================================================
  // 5. TELA 3: RESULTADO FINAL (PONTUAÇÃO E PARABÉNS)
  // ==============================================================
  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto text-orange-600">
          <Trophy className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Quizz Concluído!
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            Parabéns, {nomeAluno}!
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Você representou: <strong className="text-slate-900">{turmaAtual.nome}</strong> ({turmaAtual.curso}).
          </p>
        </div>

        {/* Mostrador de Acertos e Pontos */}
        <div className="grid grid-cols-2 gap-3 py-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 block">Acertos</span>
            <span className="text-2xl font-extrabold text-slate-900">
              {acertos} / {perguntasRodada.length}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
            <span className="text-xs text-orange-600 font-bold block">Pontos Somados</span>
            <span className="text-2xl font-extrabold text-orange-700">
              +{pontosGanhos} XP
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          Esses pontos já foram somados ao placar da sua turma no Ranking Geral!
        </p>

        {/* Botões de Ação */}
        <div className="space-y-2 pt-2">
          <button
            onClick={onVerRanking}
            className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Trophy className="w-4 h-4" />
            <span>Ver Ranking Geral das Turmas</span>
          </button>

          <button
            onClick={handleJogarNovamente}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Jogar Outro Quizz</span>
          </button>
        </div>
      </div>
    </div>
  );
};
