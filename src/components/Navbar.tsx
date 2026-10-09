import React from 'react';
import { Trophy, HelpCircle } from 'lucide-react';

interface NavbarProps {
  activeTab: 'quiz' | 'ranking';
  setActiveTab: (tab: 'quiz' | 'ranking') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo simples */}
        <button
          type="button"
          onClick={() => setActiveTab('quiz')}
          aria-label="Voltar para o quiz"
          className="flex min-w-0 items-center gap-2.5 text-left cursor-pointer select-none"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900">
                RIVALIDADE ESCOLAR
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold text-blue-700 bg-blue-100 rounded">
                EXPOCEEP 2026
              </span>
            </div>
            <p className="hidden xs:block text-xs text-slate-500 sm:block">Quizz entre Turmas do CEEP</p>
          </div>
        </button>

        {/* Abas simples: Apenas Quizz e Ranking */}
        <nav aria-label="Navegação principal" className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Quizz</span>
          </button>

          <button
            onClick={() => setActiveTab('ranking')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'ranking'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Ranking</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
