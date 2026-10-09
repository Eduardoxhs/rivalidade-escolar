export interface Question {
  id: number;
  categoria: 'logica' | 'matematica';
  enunciado: string;
  alternativas: {
    letra: 'A' | 'B' | 'C' | 'D';
    texto: string;
  }[];
  resposta_correta: 'A' | 'B' | 'C' | 'D';
  explicacao: string;
  pontos: number;
}

export interface TurmaRanking {
  id: number;
  nome: string;
  curso: string;
  pontos: number;
}

// Lista completa das turmas do CEEP: 1º, 2º e 3º ano (do A ao M), além de Visitantes e Avaliador
export const TURMAS_INICIAIS: TurmaRanking[] = [
  // --- 1º ANO (A ao M) ---
  { id: 1, nome: '1°A', curso: '1º Ano do Ensino Médio', pontos: 420 },
  { id: 2, nome: '1°B', curso: '1º Ano do Ensino Médio', pontos: 310 },
  { id: 3, nome: '1°C', curso: '1º Ano do Ensino Médio', pontos: 260 },
  { id: 4, nome: '1°D', curso: '1º Ano do Ensino Médio', pontos: 180 },
  { id: 5, nome: '1°E', curso: '1º Ano do Ensino Médio', pontos: 240 },
  { id: 6, nome: '1°F', curso: '1º Ano do Ensino Médio', pontos: 150 },
  { id: 7, nome: '1°G', curso: '1º Ano do Ensino Médio', pontos: 200 },
  { id: 8, nome: '1°H', curso: '1º Ano do Ensino Médio', pontos: 170 },
  { id: 9, nome: '1°I', curso: '1º Ano do Ensino Médio', pontos: 130 },
  { id: 10, nome: '1°J', curso: '1º Ano do Ensino Médio', pontos: 190 },
  { id: 11, nome: '1°K', curso: '1º Ano do Ensino Médio', pontos: 160 },
  { id: 12, nome: '1°L', curso: '1º Ano do Ensino Médio', pontos: 140 },
  { id: 13, nome: '1°M', curso: '1º Ano do Ensino Médio', pontos: 380 },

  // --- 2º ANO (A ao M) ---
  { id: 14, nome: '2°A', curso: '2º Ano do Ensino Médio', pontos: 540 },
  { id: 15, nome: '2°B', curso: '2º Ano do Ensino Médio', pontos: 470 },
  { id: 16, nome: '2°C', curso: '2º Ano do Ensino Médio', pontos: 390 },
  { id: 17, nome: '2°D', curso: '2º Ano do Ensino Médio', pontos: 330 },
  { id: 18, nome: '2°E', curso: '2º Ano do Ensino Médio', pontos: 410 },
  { id: 19, nome: '2°F', curso: '2º Ano do Ensino Médio', pontos: 290 },
  { id: 20, nome: '2°G', curso: '2º Ano do Ensino Médio', pontos: 360 },
  { id: 21, nome: '2°H', curso: '2º Ano do Ensino Médio', pontos: 310 },
  { id: 22, nome: '2°I', curso: '2º Ano do Ensino Médio', pontos: 270 },
  { id: 23, nome: '2°J', curso: '2º Ano do Ensino Médio', pontos: 350 },
  { id: 24, nome: '2°K', curso: '2º Ano do Ensino Médio', pontos: 300 },
  { id: 25, nome: '2°L', curso: '2º Ano do Ensino Médio', pontos: 280 },
  { id: 26, nome: '2°M', curso: '2º Ano do Ensino Médio', pontos: 680 },

  // --- 3º ANO (A ao M) ---
  { id: 27, nome: '3°A', curso: '3º Ano do Ensino Médio', pontos: 950 },
  { id: 28, nome: '3°B', curso: '3º Ano do Ensino Médio', pontos: 820 },
  { id: 29, nome: '3°C', curso: '3º Ano do Ensino Médio', pontos: 610 },
  { id: 30, nome: '3°D', curso: '3º Ano do Ensino Médio', pontos: 530 },
  { id: 31, nome: '3°E', curso: '3º Ano do Ensino Médio', pontos: 670 },
  { id: 32, nome: '3°F', curso: '3º Ano do Ensino Médio', pontos: 490 },
  { id: 33, nome: '3°G', curso: '3º Ano do Ensino Médio', pontos: 580 },
  { id: 34, nome: '3°H', curso: '3º Ano do Ensino Médio', pontos: 520 },
  { id: 35, nome: '3°I', curso: '3º Ano do Ensino Médio', pontos: 450 },
  { id: 36, nome: '3°J', curso: '3º Ano do Ensino Médio', pontos: 600 },
  { id: 37, nome: '3°K', curso: '3º Ano do Ensino Médio', pontos: 480 },
  { id: 38, nome: '3°L', curso: '3º Ano do Ensino Médio', pontos: 460 },
  { id: 39, nome: '3°M', curso: '3º Ano do Ensino Médio', pontos: 1200 },

  // --- PARTICIPAÇÕES ESPECIAIS ---
  { id: 40, nome: 'Visitantes', curso: 'Comunidade & Convidados da EXPOCEEP', pontos: 510 },
  { id: 41, nome: 'Avaliador', curso: 'Banca Avaliadora & Professores', pontos: 730 },
];

// Banco focado exclusivamente em Raciocínio Lógico e Matemática Rápida
export const PERGUNTAS_QUIZ: Question[] = [
  // ==========================================
  // RACIOCÍNIO LÓGICO & DESAFIOS MENTAIS
  // ==========================================
  {
    id: 1,
    categoria: 'logica',
    enunciado: 'Em uma corrida de rua, você ultrapassa o competidor que estava em 2º lugar. Em qual posição você fica?',
    alternativas: [
      { letra: 'A', texto: '1º lugar' },
      { letra: 'B', texto: '2º lugar' },
      { letra: 'C', texto: '3º lugar' },
      { letra: 'D', texto: '4º lugar' },
    ],
    resposta_correta: 'B',
    explicacao: 'Ao ultrapassar quem estava em 2º lugar, você assume o posto dele, ficando em 2º lugar!',
    pontos: 30,
  },
  {
    id: 2,
    categoria: 'logica',
    enunciado: 'Se 3 gatos caçam 3 ratos em 3 minutos, quanto tempo 100 gatos levam para caçar 100 ratos trabalhando juntos?',
    alternativas: [
      { letra: 'A', texto: '100 minutos' },
      { letra: 'B', texto: '3 minutos' },
      { letra: 'C', texto: '30 minutos' },
      { letra: 'D', texto: '1 minuto' },
    ],
    resposta_correta: 'B',
    explicacao: 'Cada gato leva 3 minutos para caçar 1 rato. Em paralelo, 100 gatos caçam 100 ratos nos mesmos 3 minutos!',
    pontos: 30,
  },
  {
    id: 3,
    categoria: 'logica',
    enunciado: 'Um tijolo pesa 1 kg mais meio tijolo. Quanto pesa 1 tijolo inteiro?',
    alternativas: [
      { letra: 'A', texto: '1,5 kg' },
      { letra: 'B', texto: '2 kg' },
      { letra: 'C', texto: '3 kg' },
      { letra: 'D', texto: '2,5 kg' },
    ],
    resposta_correta: 'B',
    explicacao: 'Se 1 tijolo = 1 kg + meio tijolo, então o meio tijolo que falta pesa 1 kg. Logo, o tijolo inteiro pesa 2 kg.',
    pontos: 30,
  },
  {
    id: 4,
    categoria: 'logica',
    enunciado: 'Qual número completa a sequência lógica: 2, 6, 12, 20, 30, ... ?',
    alternativas: [
      { letra: 'A', texto: '40' },
      { letra: 'B', texto: '42' },
      { letra: 'C', texto: '36' },
      { letra: 'D', texto: '44' },
    ],
    resposta_correta: 'B',
    explicacao: 'As diferenças aumentam de 2 em 2: +4, +6, +8, +10, e a próxima é +12 (30 + 12 = 42).',
    pontos: 30,
  },
  {
    id: 5,
    categoria: 'logica',
    enunciado: 'Em uma gaveta no escuro há 10 meias pretas e 10 meias azuis soltas. Qual o número MÍNIMO de meias que você deve retirar para garantir 1 par da mesma cor?',
    alternativas: [
      { letra: 'A', texto: '11 meias' },
      { letra: 'B', texto: '3 meias' },
      { letra: 'C', texto: '2 meias' },
      { letra: 'D', texto: '5 meias' },
    ],
    resposta_correta: 'B',
    explicacao: 'Se pegar 2, podem ser 1 preta e 1 azul. A 3ª meia obrigatoriamente fará par com uma das duas!',
    pontos: 30,
  },
  {
    id: 6,
    categoria: 'logica',
    enunciado: 'Se amanhã for quarta-feira, que dia da semana foi anteontem?',
    alternativas: [
      { letra: 'A', texto: 'Domingo' },
      { letra: 'B', texto: 'Segunda-feira' },
      { letra: 'C', texto: 'Sábado' },
      { letra: 'D', texto: 'Terça-feira' },
    ],
    resposta_correta: 'A',
    explicacao: 'Se amanhã é quarta, hoje é terça. Ontem foi segunda e anteontem foi domingo!',
    pontos: 30,
  },
  {
    id: 7,
    categoria: 'logica',
    enunciado: 'Um caracol sobe um muro de 10 metros. De dia sobe 3 metros e de noite desce 2 metros. Em quantos dias chega ao topo?',
    alternativas: [
      { letra: 'A', texto: '10 dias' },
      { letra: 'B', texto: '8 dias' },
      { letra: 'C', texto: '7 dias' },
      { letra: 'D', texto: '9 dias' },
    ],
    resposta_correta: 'B',
    explicacao: 'No final do 7º dia ele está na marca de 7 metros. No 8º dia, sobe 3 metros e atinge os 10 metros no topo sem escorregar!',
    pontos: 30,
  },
  {
    id: 8,
    categoria: 'logica',
    enunciado: 'Cinco amigos se encontram e todos apertam as mãos entre si exatamente uma vez. Quantos apertos de mão aconteceram?',
    alternativas: [
      { letra: 'A', texto: '25' },
      { letra: 'B', texto: '10' },
      { letra: 'C', texto: '20' },
      { letra: 'D', texto: '15' },
    ],
    resposta_correta: 'B',
    explicacao: 'Combinação de 5 tomados 2 a 2: (5 x 4) / 2 = 10 apertos de mão.',
    pontos: 30,
  },
  {
    id: 9,
    categoria: 'logica',
    enunciado: 'Qual número completa a sequência lógica dos quadrados: 1, 4, 9, 16, 25, ... ?',
    alternativas: [
      { letra: 'A', texto: '30' },
      { letra: 'B', texto: '36' },
      { letra: 'C', texto: '32' },
      { letra: 'D', texto: '49' },
    ],
    resposta_correta: 'B',
    explicacao: 'São os quadrados perfeitos: 1² = 1, 2² = 4, 3² = 9, 4² = 16, 5² = 25, e o próximo é 6² = 36.',
    pontos: 30,
  },
  {
    id: 10,
    categoria: 'logica',
    enunciado: 'Três pessoas entram em um restaurante: dois pais e dois filhos. Cada um pediu 1 lanche e a conta veio com exatamente 3 lanches. Como?',
    alternativas: [
      { letra: 'A', texto: 'O caixa errou' },
      { letra: 'B', texto: 'São avô, pai e filho' },
      { letra: 'C', texto: 'Um não comeu' },
      { letra: 'D', texto: 'Pediram combo' },
    ],
    resposta_correta: 'B',
    explicacao: 'O avô é pai, o pai é filho do avô e pai do filho. São 3 pessoas que somam dois pais e dois filhos!',
    pontos: 30,
  },
  {
    id: 11,
    categoria: 'logica',
    enunciado: 'Uma vela inteira queima em 60 minutos. Se você acender as DUAS pontas da vela ao mesmo tempo, em quanto tempo ela queima?',
    alternativas: [
      { letra: 'A', texto: '60 minutos' },
      { letra: 'B', texto: '30 minutos' },
      { letra: 'C', texto: '15 minutos' },
      { letra: 'D', texto: '45 minutos' },
    ],
    resposta_correta: 'B',
    explicacao: 'Queimando pelas duas pontas simultaneamente, a velocidade dobra e o tempo cai pela metade: 30 minutos.',
    pontos: 30,
  },
  {
    id: 12,
    categoria: 'logica',
    enunciado: 'Em uma família, cada um dos 4 irmãos homens tem exatamente 1 irmã mulher. Quantos filhos os pais têm ao todo?',
    alternativas: [
      { letra: 'A', texto: '8 filhos' },
      { letra: 'B', texto: '5 filhos' },
      { letra: 'C', texto: '6 filhos' },
      { letra: 'D', texto: '4 filhos' },
    ],
    resposta_correta: 'B',
    explicacao: 'São os 4 irmãos homens e 1 única irmã mulher, que é irmã de todos eles: 4 + 1 = 5 filhos.',
    pontos: 30,
  },
  {
    id: 13,
    categoria: 'logica',
    enunciado: 'Se você tem 5 caixas e dentro de cada uma há 2 caixas menores, quantas caixas existem no total?',
    alternativas: [
      { letra: 'A', texto: '10 caixas' },
      { letra: 'B', texto: '15 caixas' },
      { letra: 'C', texto: '12 caixas' },
      { letra: 'D', texto: '7 caixas' },
    ],
    resposta_correta: 'B',
    explicacao: 'As 5 caixas grandes mais as 10 caixas pequenas (5 x 2) = 15 caixas no total.',
    pontos: 30,
  },
  {
    id: 14,
    categoria: 'logica',
    enunciado: 'Complete a sequência lógica rápida: 3, 6, 12, 24, 48, ... Qual é o próximo número?',
    alternativas: [
      { letra: 'A', texto: '72' },
      { letra: 'B', texto: '96' },
      { letra: 'C', texto: '84' },
      { letra: 'D', texto: '60' },
    ],
    resposta_correta: 'B',
    explicacao: 'Cada termo é o dobro do anterior: 48 x 2 = 96.',
    pontos: 30,
  },
  {
    id: 15,
    categoria: 'logica',
    enunciado: 'Em uma balança de pratos, 3 maçãs equilibram exatamente 2 laranjas. Quantas laranjas equilibram 6 maçãs?',
    alternativas: [
      { letra: 'A', texto: '3 laranjas' },
      { letra: 'B', texto: '4 laranjas' },
      { letra: 'C', texto: '5 laranjas' },
      { letra: 'D', texto: '6 laranjas' },
    ],
    resposta_correta: 'B',
    explicacao: 'Se o dobro de maçãs é colocado (3 x 2 = 6), é necessário o dobro de laranjas (2 x 2 = 4 laranjas).',
    pontos: 30,
  },

  // ==========================================
  // MATEMÁTICA RÁPIDA & CÁLCULO MENTAL
  // ==========================================
  {
    id: 16,
    categoria: 'matematica',
    enunciado: 'Quanto é 15% de 200 reais?',
    alternativas: [
      { letra: 'A', texto: 'R$ 25,00' },
      { letra: 'B', texto: 'R$ 30,00' },
      { letra: 'C', texto: 'R$ 20,00' },
      { letra: 'D', texto: 'R$ 35,00' },
    ],
    resposta_correta: 'B',
    explicacao: '10% de 200 = R$ 20. 5% de 200 = R$ 10. Somando ambos: R$ 20 + R$ 10 = R$ 30,00.',
    pontos: 30,
  },
  {
    id: 17,
    categoria: 'matematica',
    enunciado: 'Um casaco que custa R$ 80,00 está com 25% de desconto. Qual é o valor final a pagar?',
    alternativas: [
      { letra: 'A', texto: 'R$ 60,00' },
      { letra: 'B', texto: 'R$ 55,00' },
      { letra: 'C', texto: 'R$ 65,00' },
      { letra: 'D', texto: 'R$ 70,00' },
    ],
    resposta_correta: 'A',
    explicacao: '25% equivale a um quarto (1/4). 80 dividido por 4 = R$ 20 de desconto. 80 - 20 = R$ 60,00.',
    pontos: 30,
  },
  {
    id: 18,
    categoria: 'matematica',
    enunciado: 'Se 4 cadernos iguais custam R$ 28,00 no total, quanto custam 7 desses mesmos cadernos?',
    alternativas: [
      { letra: 'A', texto: 'R$ 42,00' },
      { letra: 'B', texto: 'R$ 49,00' },
      { letra: 'C', texto: 'R$ 56,00' },
      { letra: 'D', texto: 'R$ 35,00' },
    ],
    resposta_correta: 'B',
    explicacao: 'Cada caderno custa 28 / 4 = R$ 7,00. Logo, 7 cadernos custam 7 x 7 = R$ 49,00.',
    pontos: 30,
  },
  {
    id: 19,
    categoria: 'matematica',
    enunciado: 'Qual é o resultado correto da expressão: 10 + 10 x 0 + 10 ?',
    alternativas: [
      { letra: 'A', texto: '0' },
      { letra: 'B', texto: '20' },
      { letra: 'C', texto: '10' },
      { letra: 'D', texto: '30' },
    ],
    resposta_correta: 'B',
    explicacao: 'A multiplicação é feita primeiro: 10 x 0 = 0. Depois a soma: 10 + 0 + 10 = 20.',
    pontos: 30,
  },
  {
    id: 20,
    categoria: 'matematica',
    enunciado: 'Uma caixa d\'água de 500 litros está com 60% da sua capacidade preenchida. Quantos litros há nela?',
    alternativas: [
      { letra: 'A', texto: '250 litros' },
      { letra: 'B', texto: '300 litros' },
      { letra: 'C', texto: '350 litros' },
      { letra: 'D', texto: '200 litros' },
    ],
    resposta_correta: 'B',
    explicacao: '10% de 500 = 50 litros. Multiplicando por 6: 50 x 6 = 300 litros.',
    pontos: 30,
  },
  {
    id: 21,
    categoria: 'matematica',
    enunciado: 'Quantos minutos há no total em um período de 2 horas e 45 minutos?',
    alternativas: [
      { letra: 'A', texto: '145 minutos' },
      { letra: 'B', texto: '165 minutos' },
      { letra: 'C', texto: '150 minutos' },
      { letra: 'D', texto: '175 minutos' },
    ],
    resposta_correta: 'B',
    explicacao: '2 horas têm 120 minutos (2 x 60). Somando 45 minutos: 120 + 45 = 165 minutos.',
    pontos: 30,
  },
  {
    id: 22,
    categoria: 'matematica',
    enunciado: 'Uma sala retangular tem 12 metros de comprimento e 5 metros de largura. Qual é a sua ÁREA?',
    alternativas: [
      { letra: 'A', texto: '34 m²' },
      { letra: 'B', texto: '60 m²' },
      { letra: 'C', texto: '50 m²' },
      { letra: 'D', texto: '17 m²' },
    ],
    resposta_correta: 'B',
    explicacao: 'A área do retângulo é calculada multiplicando base por altura: 12 x 5 = 60 m².',
    pontos: 30,
  },
  {
    id: 23,
    categoria: 'matematica',
    enunciado: 'E qual é o PERÍMETRO dessa mesma sala de 12 metros por 5 metros?',
    alternativas: [
      { letra: 'A', texto: '60 metros' },
      { letra: 'B', texto: '34 metros' },
      { letra: 'C', texto: '17 metros' },
      { letra: 'D', texto: '24 metros' },
    ],
    resposta_correta: 'B',
    explicacao: 'O perímetro é a soma de todos os lados: 12 + 12 + 5 + 5 = 34 metros.',
    pontos: 30,
  },
  {
    id: 24,
    categoria: 'matematica',
    enunciado: 'Em uma sala com 40 alunos, 75% deles foram aprovados no teste. Quantos alunos foram aprovados?',
    alternativas: [
      { letra: 'A', texto: '25 alunos' },
      { letra: 'B', texto: '30 alunos' },
      { letra: 'C', texto: '32 alunos' },
      { letra: 'D', texto: '28 alunos' },
    ],
    resposta_correta: 'B',
    explicacao: '75% equivale a três quartos (3/4). 40 dividido por 4 = 10; 10 x 3 = 30 alunos aprovados.',
    pontos: 30,
  },
  {
    id: 25,
    categoria: 'matematica',
    enunciado: 'Qual é a raiz quadrada exata do número 144?',
    alternativas: [
      { letra: 'A', texto: '11' },
      { letra: 'B', texto: '12' },
      { letra: 'C', texto: '13' },
      { letra: 'D', texto: '14' },
    ],
    resposta_correta: 'B',
    explicacao: '12 multiplicado por 12 resulta exatamente em 144.',
    pontos: 30,
  },
  {
    id: 26,
    categoria: 'matematica',
    enunciado: 'Qual é o próximo número primo imediatamente após o número 13?',
    alternativas: [
      { letra: 'A', texto: '15' },
      { letra: 'B', texto: '17' },
      { letra: 'C', texto: '19' },
      { letra: 'D', texto: '14' },
    ],
    resposta_correta: 'B',
    explicacao: '14, 15 e 16 têm múltiplos. O número 17 só é divisível por 1 e por ele mesmo (é primo).',
    pontos: 30,
  },
  {
    id: 27,
    categoria: 'matematica',
    enunciado: 'Se 5 pedreiros constroem um muro em 6 dias, em quantos dias 10 pedreiros (mesmo ritmo) fariam o mesmo muro?',
    alternativas: [
      { letra: 'A', texto: '12 dias' },
      { letra: 'B', texto: '3 dias' },
      { letra: 'C', texto: '4 dias' },
      { letra: 'D', texto: '5 dias' },
    ],
    resposta_correta: 'B',
    explicacao: 'Regra de três inversa: dobrando o número de trabalhadores, o tempo cai pela metade: 6 / 2 = 3 dias.',
    pontos: 30,
  },
  {
    id: 28,
    categoria: 'matematica',
    enunciado: 'Ao lançar um dado comum de 6 faces, qual é a probabilidade de tirar um número PAR (2, 4 ou 6)?',
    alternativas: [
      { letra: 'A', texto: '1 em 6 (16%)' },
      { letra: 'B', texto: '3 em 6 (50%)' },
      { letra: 'C', texto: '2 em 6 (33%)' },
      { letra: 'D', texto: '4 em 6 (66%)' },
    ],
    resposta_correta: 'B',
    explicacao: 'Há 3 números pares em 6 faces possíveis: 3/6 = 1/2 = 50%.',
    pontos: 30,
  },
  {
    id: 29,
    categoria: 'matematica',
    enunciado: 'Quanto é a terça parte de 90 somada com a metade de 40?',
    alternativas: [
      { letra: 'A', texto: '45' },
      { letra: 'B', texto: '50' },
      { letra: 'C', texto: '55' },
      { letra: 'D', texto: '40' },
    ],
    resposta_correta: 'B',
    explicacao: 'Terça parte de 90 (90 / 3 = 30) + metade de 40 (40 / 2 = 20): 30 + 20 = 50.',
    pontos: 30,
  },
  {
    id: 30,
    categoria: 'matematica',
    enunciado: 'Uma pizza foi fatiada em 8 pedaços iguais. Se você comeu 2 pedaços, que fração da pizza ainda SOBROU?',
    alternativas: [
      { letra: 'A', texto: '1/4' },
      { letra: 'B', texto: '3/4' },
      { letra: 'C', texto: '1/2' },
      { letra: 'D', texto: '5/8' },
    ],
    resposta_correta: 'B',
    explicacao: 'Sobraram 6 pedaços de 8 (6/8). Simplificando por 2, a fração é 3/4 (75% da pizza).',
    pontos: 30,
  },
];
