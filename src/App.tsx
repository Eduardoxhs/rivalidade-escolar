import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { QuizView } from './components/QuizView';
import { RankingView } from './components/RankingView';
import { Footer } from './components/Footer';
import { TURMAS_INICIAIS, TurmaRanking } from './data/quizQuestions';

// Chave para guardar os pontos no navegador (v2 com todas as turmas A-M, Visitantes e Avaliador)
const CHAVE_STORAGE = 'rivalidade_turmas_v2';

export default function App() {
  // 1. Controle da aba ativa: apenas 'quiz' ou 'ranking'
  const [abaAtiva, setAbaAtiva] = useState<'quiz' | 'ranking'>('quiz');

  // 2. Estado das turmas e seus pontos
  const [turmas, setTurmas] = useState<TurmaRanking[]>(() => {
    const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);
    if (dadosSalvos) {
      try {
        const parsed = JSON.parse(dadosSalvos);
        // Garante que todas as 41 categorias/turmas estejam presentes
        if (Array.isArray(parsed) && parsed.length === TURMAS_INICIAIS.length) {
          return parsed;
        }
      } catch (erro) {
        return TURMAS_INICIAIS;
      }
    }
    return TURMAS_INICIAIS;
  });

  // 3. Salva no localStorage sempre que as pontuações mudam
  useEffect(() => {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(turmas));
  }, [turmas]);

  // 4. Soma os pontos conquistados no quizz para a turma escolhida
  const somarPontosParaTurma = (idTurma: number, pontosGanhos: number) => {
    setTurmas((turmasAnteriores) =>
      turmasAnteriores.map((turma) => {
        if (turma.id === idTurma) {
          return { ...turma, pontos: turma.pontos + pontosGanhos };
        }
        return turma;
      })
    );
  };

  // 5. Reseta as pontuações (zerar para 0 XP ou restaurar valores padrão)
  const resetarPontos = (modo: 'zerar' | 'padrao' = 'padrao') => {
    if (modo === 'zerar') {
      const zeradas = turmas.map((turma) => ({ ...turma, pontos: 0 }));
      setTurmas(zeradas);
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(zeradas));
    } else {
      setTurmas(TURMAS_INICIAIS);
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(TURMAS_INICIAIS));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Barra superior com Quizz e Ranking */}
      <Navbar activeTab={abaAtiva} setActiveTab={setAbaAtiva} />

      {/* Conteúdo dinâmico */}
      <main className="flex-1 py-4 sm:py-6">
        {abaAtiva === 'quiz' && (
          <QuizView
            turmas={turmas}
            onAdicionarPontos={somarPontosParaTurma}
            onVerRanking={() => setAbaAtiva('ranking')}
          />
        )}

        {abaAtiva === 'ranking' && (
          <RankingView
            turmas={turmas}
            onJogarQuiz={() => setAbaAtiva('quiz')}
            onResetarPontos={resetarPontos}
          />
        )}
      </main>

      {/* Rodapé simples da EXPOCEEP 2026 */}
      <Footer />
    </div>
  );
}
