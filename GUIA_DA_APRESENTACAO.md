# 🎓 GUIA COMPLETO PARA A APRESENTAÇÃO AOS PROFESSORES
## Projeto: Rivalidade Escolar - Quizz EXPOCEEP 2026

Fique tranquilo! Este guia foi feito em linguagem simples para você e seu grupo explicarem o código com confiança e tirarem nota 10.

---

### 1. Resumo do Projeto (O que falar nos primeiros 30 segundos)

> *"Professores, o nosso projeto se chama **Rivalidade Escolar**. É uma plataforma de quiz onde cada aluno representa a sua turma do CEEP. Ele escolhe a turma e responde a perguntas técnicas ou de conhecimentos gerais. Conforme acerta, ele ganha pontos que são somados em tempo real ao placar geral da turma dele, criando uma competição pedagógica e saudável na escola."*

---

### 2. O que cada arquivo do projeto faz (Bem básico)

Toda a aplicação no Front-End tem apenas estes arquivos organizados:

| Arquivo | Para que serve? |
| :--- | :--- |
| **`src/App.tsx`** | É o "cérebro" do Front-End. Ele controla qual tela está aberta (**Quizz** ou **Ranking**) e guarda a pontuação das turmas no navegador (`localStorage`). |
| **`src/components/QuizView.tsx`** | É o jogo do Quizz. Pede o nome do aluno, a turma dele, mostra as 5 perguntas, confere se acertou (verde/vermelho) e soma 30 pontos por acerto. |
| **`src/components/RankingView.tsx`** | É a tela do placar. Mostra o pódio (1º, 2º e 3º lugar) e a lista ordenada de qual turma tem mais pontos. |
| **`src/components/Navbar.tsx`** | Barra superior com o logo e os dois botões: **Quizz** e **Ranking**. |
| **`src/components/Footer.tsx`** | Rodapé simples com a identificação da EXPOCEEP 2026 e do CEEP. |
| **`src/data/quizQuestions.ts`** | Banco unificado de **Raciocínio Lógico e Matemática Rápida** e cadastro de todas as 41 categorias (1º, 2º e 3º ano do A ao M, Visitantes e Avaliador). |
| **`html/index.html`** | A versão em **HTML5 puro** com CSS e JavaScript simples, pronta para rodar com dois cliques em qualquer computador. |
| **`html/ranking.html`** | A página do Ranking em HTML5 puro com todas as turmas. |

---

### 3. Como funciona a lógica do jogo (Passo a Passo)

1. **Escolha do Participante:** O competidor digita seu nome ou apelido e seleciona sua turma/categoria (1º, 2º ou 3º ano do A ao M, Visitantes ou Avaliador). O React guarda isso no `useState`.
2. **Quizz Unificado:** O sistema sorteia 5 perguntas do banco completo misturando desafios de lógica e cálculo rápido sem precisar escolher tema antes.
3. **Clique na alternativa:** 
   - A função compara: `letra === perguntaAtual.resposta_correta`.
   - Se for igual: a caixa fica **verde** e soma **+30 pontos**.
   - Se for diferente: a caixa clicada fica **vermelha** e a correta fica verde.
4. **Fim do Quiz:** Os pontos ganhos são somados à turma do aluno e salvos na memória do navegador (`localStorage.setItem`).

---

### 4. As Perguntas que os professores mais fazem e Como Responder:

#### ❓ 1. "Onde os dados e as perguntas estão guardados?"
> **Resposta:** *"As perguntas e as turmas estão estruturadas em um array de objetos no arquivo `quizQuestions.ts`. E para a pontuação não sumir quando atualizamos a página, usamos o `localStorage` do navegador."*

#### ❓ 2. "O que é esse tal de `useState` que aparece no código?"
> **Resposta:** *"O `useState` é uma função do React que guarda uma memória da tela. Por exemplo, a variável `fase` guarda se o aluno está no 'inicio', 'jogando' ou vendo o 'resultado'. Quando esse valor muda, o React atualiza a tela na hora sem precisar recarregar o navegador."*

#### ❓ 3. "Como você sabe se o aluno acertou ou errou?"
> **Resposta:** *"Nós comparamos a letra que o usuário clicou com a propriedade `resposta_correta` do objeto da pergunta. Se for igual, somamos 1 acerto e 30 pontos."*

#### ❓ 4. "Por que existem arquivos `.tsx` e arquivos `.html`?"
> **Resposta:** *"Os arquivos `.tsx` são os componentes modernos da nossa SPA em React. E para fins didáticos e demonstração dos fundamentos da disciplina de Programação Web, também criamos a versão em HTML5 semântico puro com tags `<header>`, `<main>`, `<form>` e JavaScript Vanilla na pasta `/html`."*

#### ❓ 5. "Como funciona o botão de resetar os pontos?"
> **Resposta:** *"Ele abre um modal interativo seguro sem travar o navegador, permitindo escolher entre Zerar todas as turmas (0 XP) para iniciar uma competição real do zero ou Restaurar os valores padrão de demonstração. Os dados são sincronizados no `localStorage` instantaneamente."*
