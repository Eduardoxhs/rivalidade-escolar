import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
      <div className="max-w-4xl mx-auto px-4 space-y-1">
        <p className="font-semibold text-slate-700">
          🏆 Rivalidade Escolar — Plataforma de Quizz entre Turmas
        </p>
        <p>
          Projeto Integrador • EXPOCEEP 2026 • CEEP Pedro Boaretto Neto • Cascavel - PR
        </p>
      </div>
    </footer>
  );
};
