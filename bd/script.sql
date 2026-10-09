-- ==========================================================
-- PROJETO INTEGRADOR: EXPOCEEP 2026
-- Rivalidade Escolar - Plataforma de Desafios entre Turmas
-- Etapa 1: Banco de Dados Relacional (SQLite)
-- Arquivo: bd/script.sql
-- ==========================================================

-- Ativa o suporte a chaves estrangeiras no SQLite
PRAGMA foreign_keys = ON;

-- ----------------------------------------------------------
-- 1. TABELA DE TURMAS
-- Guarda as turmas da escola que competem no ranking
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS turmas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,                 -- Ex: '3°M', '2°A'
    ano TEXT NOT NULL,                         -- Ex: '3º Ano'
    curso TEXT NOT NULL,                       -- Ex: 'Desenvolvimento de Sistemas'
    pontuacao_total INTEGER NOT NULL DEFAULT 0 -- Pontos somados da turma
);

-- ----------------------------------------------------------
-- 2. TABELA DE USUÁRIOS (ALUNOS E ADMIN)
-- Guarda quem acessa o sistema. Cada aluno pertence a uma turma.
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    tipo TEXT NOT NULL DEFAULT 'aluno',        -- 'aluno' ou 'admin'
    pontuacao INTEGER NOT NULL DEFAULT 0,      -- Pontos individuais do aluno
    turma_id INTEGER NOT NULL,                 -- Chave Estrangeira: liga o aluno à sua turma
    FOREIGN KEY (turma_id) REFERENCES turmas(id)
);

-- ----------------------------------------------------------
-- 3. TABELA DE DESAFIOS (QUIZZES)
-- Guarda os quizzes disponíveis para os alunos responderem
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS desafios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    categoria TEXT NOT NULL,                   -- Ex: 'Tecnologia', 'Lógica'
    pontuacao INTEGER NOT NULL DEFAULT 100     -- Pontos concedidos ao acertar
);

-- ----------------------------------------------------------
-- 4. TABELA DE PERGUNTAS DO DESAFIO
-- Guarda as questões de múltipla escolha de cada desafio
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS perguntas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    desafio_id INTEGER NOT NULL,               -- Chave Estrangeira: liga a pergunta ao desafio
    enunciado TEXT NOT NULL,
    alternativa_a TEXT NOT NULL,
    alternativa_b TEXT NOT NULL,
    alternativa_c TEXT NOT NULL,
    alternativa_d TEXT NOT NULL,
    resposta_correta TEXT NOT NULL,            -- 'A', 'B', 'C' ou 'D'
    FOREIGN KEY (desafio_id) REFERENCES desafios(id)
);

-- ----------------------------------------------------------
-- 5. TABELA DE PARTICIPAÇÕES
-- Guarda o histórico de quando um aluno responde um desafio
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS participacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,               -- Chave Estrangeira: qual aluno jogou
    turma_id INTEGER NOT NULL,                 -- Chave Estrangeira: turma que ganha os pontos
    desafio_id INTEGER NOT NULL,               -- Chave Estrangeira: qual desafio foi respondido
    pontuacao INTEGER NOT NULL DEFAULT 0,      -- Quantos pontos foram obtidos
    data TEXT NOT NULL,                        -- Data em que jogou
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (turma_id) REFERENCES turmas(id),
    FOREIGN KEY (desafio_id) REFERENCES desafios(id)
);

-- ----------------------------------------------------------
-- 6. TABELA DE CONQUISTAS (MEDALHAS)
-- Guarda as medalhas que os alunos podem desbloquear
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS conquistas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT NOT NULL,
    icone TEXT NOT NULL
);

-- ----------------------------------------------------------
-- DADOS INICIAIS PARA TESTE (SEEDS)
-- ----------------------------------------------------------
INSERT OR IGNORE INTO turmas (id, nome, ano, curso, pontuacao_total) VALUES
(1, '3°M', '3º Ano', 'Técnico em Desenvolvimento de Sistemas', 1200),
(2, '2°A', '2º Ano', 'Técnico em Informática', 850);

INSERT OR IGNORE INTO usuarios (id, nome, email, senha, tipo, pontuacao, turma_id) VALUES
(1, 'Admin EXPOCEEP', 'admin@ceep.pr.gov.br', 'admin123', 'admin', 0, 1),
(2, 'Lucas Silva', 'lucas@ceep.pr.gov.br', 'senha123', 'aluno', 450, 1);

INSERT OR IGNORE INTO desafios (id, titulo, descricao, categoria, pontuacao) VALUES
(1, 'Desafio de Algoritmos', 'Teste seus conhecimentos em lógica de programação', 'Tecnologia', 150);

INSERT OR IGNORE INTO perguntas (id, desafio_id, enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, resposta_correta) VALUES
(1, 1, 'Qual estrutura de dados segue o padrão LIFO (Last In, First Out)?', 'Fila', 'Pilha', 'Lista', 'Árvore', 'B');

INSERT OR IGNORE INTO conquistas (id, nome, descricao, icone) VALUES
(1, 'Primeiro Passo', 'Concluiu seu primeiro desafio', 'award');
