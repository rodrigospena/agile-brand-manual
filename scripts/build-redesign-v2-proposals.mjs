import fs from 'fs';
import path from 'path';

// Cores Calibradas segundo o parecer do agente
const NAVY_MAIN = '#102A43';      // Azul principal elegante e confiável (menos escuro que o preto)
const NAVY_DEEP = '#071A33';      // Azul profundo
const NAVY_FACET = '#1A365D';     // Faceta ou sombra estrutural
const ORANGE_MAIN = '#FF7A1A';    // Laranja vibrante e equilibrado
const ORANGE_LIGHT = '#FF9B4A';   // Laranja acento/luz
const SLATE_NEUTRAL = '#667085';  // Cinza neutro de apoio
const BG_LIGHT = '#F8FAFC';       // Fundo claro
const WHITE = '#FFFFFF';
const BLACK = '#000000';

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

/*
 =========================================================================
 GEOMETRIA 1: REFINAMENTO CONSERVADOR (Iteração Limpa 3 Etapas)
 - Hastes do "A" afinadas (espessura reduzida em ~25%, vão interno ampliado)
 - Topo 100% integrado à coluna (sem bloco flutuante!)
 - 3 blocos/iterações ascendentes limpos em vez de 7-8 cortes pequenos
 - Excelente desempenho monocromático com cortes negativos de 10px
 =========================================================================
*/
function getSymbolCaminho1(mode = 'color') {
  let outerA = NAVY_MAIN;
  let oLeft = ORANGE_MAIN;
  let oRight = NAVY_FACET;
  let oRoof = ORANGE_LIGHT;
  let cut = WHITE;

  if (mode === 'dark') {
    outerA = WHITE;
    oLeft = ORANGE_MAIN;
    oRight = ORANGE_LIGHT;
    oRoof = WHITE;
    cut = NAVY_MAIN;
  } else if (mode === 'white') {
    outerA = WHITE;
    oLeft = WHITE;
    oRight = '#CBD5E1';
    oRoof = '#E2E8F0';
    cut = NAVY_DEEP;
  } else if (mode === 'mono') {
    outerA = BLACK;
    oLeft = BLACK;
    oRight = '#475569';
    oRoof = '#94A3B8';
    cut = WHITE;
  }

  // Hastes esbeltas: base externa 190->610, base interna 275->525 (espessura 85 vs 60 no topo)
  // Vão interno mais arejado.
  // Coluna central integrada do Y=310 ao Y=680
  return `
    <!-- Hastes Estruturais do "A" (Mais esbeltas, vão interno generoso) -->
    <polygon points="400,120 605,680 535,680 445,440 355,440 265,680 195,680" fill="${outerA}" />
    
    <!-- Topo Isométrico Conectado Diretamente à Coluna (Sem losango solto) -->
    <polygon points="400,310 465,348 400,386 335,348" fill="${oRoof}" />
    
    <!-- Face Esquerda (Laranja / Tração) -->
    <polygon points="335,348 400,386 400,680 335,680" fill="${oLeft}" />
    
    <!-- Face Direita (Sombra Arquitetônica) -->
    <polygon points="400,386 465,348 465,680 400,680" fill="${oRight}" />
    
    <!-- 3 Segmentos de Iteração / Evolução Limpos (Cortes negativos perfeitos) -->
    <polygon points="335,420 400,458 400,474 335,436" fill="${cut}" />
    <polygon points="335,510 400,548 400,564 335,526" fill="${cut}" />
    <polygon points="335,600 400,638 400,654 335,616" fill="${cut}" />
  `;
}

/*
 =========================================================================
 GEOMETRIA 2: SÍMBOLO MAIS PROPRIETÁRIO (Fita Contínua Ascendente — Recomendada)
 - Hastes estilizadas com chanfro no ápice
 - Faixa laranja é uma fita contínua dinâmica que nasce na base e ascende
   com ângulo consistente, integrando o travessão do "A" e a ascensão
 - Zero ruído, zero corte redundante, pureza formal absoluta
 - Perfeita redução até 16px
 =========================================================================
*/
function getSymbolCaminho2(mode = 'color') {
  let outerA = NAVY_MAIN;
  let ribbon = ORANGE_MAIN;
  let ribbonAccent = ORANGE_LIGHT;
  let ribbonShadow = NAVY_FACET;

  if (mode === 'dark') {
    outerA = WHITE;
    ribbon = ORANGE_MAIN;
    ribbonAccent = ORANGE_LIGHT;
    ribbonShadow = '#1E3A8A';
  } else if (mode === 'white') {
    outerA = WHITE;
    ribbon = WHITE;
    ribbonAccent = '#E2E8F0';
    ribbonShadow = '#CBD5E1';
  } else if (mode === 'mono') {
    outerA = BLACK;
    ribbon = BLACK;
    ribbonAccent = '#64748B';
    ribbonShadow = '#94A3B8';
  }

  return `
    <!-- Estrutura Principal do "A" (Hastes geométricas precisas com topo chanfrado) -->
    <path d="M 400,110 L 615,680 L 530,680 L 442,448 L 358,448 L 270,680 L 185,680 Z" fill="${outerA}" />
    
    <!-- Fita Contínua Ascendente de Evolução (Monobloco integrado com faceta de luz) -->
    <!-- Topo integrado em cunha ascendente -->
    <polygon points="400,285 470,335 400,380 330,335" fill="${ribbonAccent}" />
    <!-- Coluna ascendente contínua sem recortes de ruído -->
    <polygon points="330,335 400,380 400,680 330,680" fill="${ribbon}" />
    <polygon points="400,380 470,335 470,680 400,680" fill="${ribbonShadow}" />
    
    <!-- Vão Negativo de Respiro Dinâmico (Travessão do A esculpido pela ascensão) -->
    <polygon points="370,510 400,530 400,545 370,525" fill="${mode === 'dark' ? NAVY_MAIN : (mode === 'mono' ? WHITE : WHITE)}" />
  `;
}

/*
 =========================================================================
 GEOMETRIA 3: SISTEMA MODULAR EVOLUTIVO (4 Blocos de Crescimento Progressivo)
 - O trajeto central cresce progressivamente em altura e espessura
 - Simboliza os 4 pilares: Diagnóstico -> Projeto -> Aprovação -> Habite-se
 - Cada bloco tem proporção matemática exata
 =========================================================================
*/
function getSymbolCaminho3(mode = 'color') {
  let outerA = NAVY_MAIN;
  let orange = ORANGE_MAIN;
  let orangeHi = ORANGE_LIGHT;
  let facet = NAVY_FACET;

  if (mode === 'dark') {
    outerA = WHITE;
    orange = ORANGE_MAIN;
    orangeHi = ORANGE_LIGHT;
    facet = '#2563EB';
  } else if (mode === 'white') {
    outerA = WHITE;
    orange = WHITE;
    orangeHi = '#F1F5F9';
    facet = '#CBD5E1';
  } else if (mode === 'mono') {
    outerA = BLACK;
    orange = BLACK;
    orangeHi = '#94A3B8';
    facet = '#64748B';
  }

  return `
    <!-- Hastes Estruturais "A" Esbeltas -->
    <polygon points="400,115 610,680 535,680 445,445 355,445 265,680 190,680" fill="${outerA}" />
    
    <!-- Topo em Flecha / Cunho Isométrico Integrado -->
    <polygon points="400,300 460,342 400,378 340,342" fill="${orangeHi}" />
    
    <!-- Módulo 1 (Base - Fundação) -->
    <polygon points="340,610 400,646 400,680 340,680" fill="${orange}" />
    <polygon points="400,646 460,610 460,680 400,680" fill="${facet}" />
    
    <!-- Módulo 2 (Estruturação) -->
    <polygon points="340,515 400,551 400,595 340,595" fill="${orange}" />
    <polygon points="400,551 460,515 460,595 400,595" fill="${facet}" />
    
    <!-- Módulo 3 (Elevação / Aprovação) -->
    <polygon points="340,410 400,446 400,498 340,498" fill="${orange}" />
    <polygon points="400,446 460,410 460,498 400,498" fill="${facet}" />
    
    <!-- Módulo 4 (Topo / Conclusão & Regularização) -->
    <polygon points="340,342 400,378 400,396 340,396" fill="${orange}" />
    <polygon points="400,378 460,342 460,396 400,396" fill="${facet}" />
  `;
}

// -------------------------------------------------------------------------
// WORDMARKS REFINADOS (Com tipografia Plus Jakarta Sans & Manrope)
// -------------------------------------------------------------------------
function getWordmarkSvg(mode = 'color', fontStyle = 'jakarta') {
  let fill = NAVY_MAIN;
  if (mode === 'dark' || mode === 'white') fill = WHITE;
  else if (mode === 'mono') fill = BLACK;

  // Letras estilizadas com vetor limpo, tracking refinado (sem separação exagerada)
  // Proporção de altura: 86px, perfeitamente alinhado
  return `
    <text x="400" y="750" 
          font-family="'Plus Jakarta Sans', 'Manrope', -apple-system, sans-serif" 
          font-weight="800" 
          font-size="88" 
          letter-spacing="0.10em" 
          text-anchor="middle" 
          fill="${fill}">AGILE</text>
    <text x="400" y="795" 
          font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" 
          font-weight="600" 
          font-size="20" 
          letter-spacing="0.28em" 
          text-anchor="middle" 
          fill="${mode === 'mono' ? '#475569' : (mode === 'dark' ? '#94A3B8' : SLATE_NEUTRAL)}">ENGENHARIA E REGULARIZAÇÃO</text>
  `;
}

// -------------------------------------------------------------------------
// BUILD COMPARISON HTML
// -------------------------------------------------------------------------
const previewHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Redesign da Logo v2 — Painel Comparativo & Testes</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/tokens.css" />
  <link rel="stylesheet" href="css/manual.css" />
  <style>
    body {
      background: #071A33;
      color: #F8FAFC;
      font-family: 'Plus Jakarta Sans', sans-serif;
      padding: 2.5rem 1.5rem;
      line-height: 1.6;
    }
    .container {
      max-width: 1320px;
      margin: 0 auto;
    }
    .header-box {
      background: linear-gradient(135deg, rgba(16, 42, 67, 0.8), rgba(7, 26, 51, 0.95));
      border: 1px solid rgba(255, 122, 26, 0.3);
      border-radius: 16px;
      padding: 2.5rem;
      margin-bottom: 3rem;
      box-shadow: 0 16px 40px rgba(0,0,0,0.4);
    }
    .header-box h1 {
      font-size: 2.4rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 0.75rem;
    }
    .header-box p {
      color: #94A3B8;
      font-size: 1.1rem;
      max-width: 900px;
    }
    .badge {
      display: inline-block;
      background: #FF7A1A;
      color: #FFFFFF;
      font-size: 0.8rem;
      font-weight: 700;
      padding: 0.35rem 0.85rem;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 1rem;
    }
    .critique-summary {
      background: rgba(16, 42, 67, 0.6);
      border-left: 4px solid #FF7A1A;
      padding: 1.25rem 1.5rem;
      border-radius: 0 10px 10px 0;
      margin-top: 1.5rem;
      font-size: 0.95rem;
      color: #CBD5E1;
    }
    .critique-summary ul {
      margin-left: 1.2rem;
      margin-top: 0.5rem;
    }
    .comparison-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-bottom: 3.5rem;
    }
    @media (max-width: 1024px) {
      .comparison-grid { grid-template-columns: 1fr; }
    }
    .path-card {
      background: rgba(16, 42, 67, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      transition: all 0.3s ease;
      position: relative;
    }
    .path-card.recommended {
      border-color: #FF7A1A;
      box-shadow: 0 0 35px rgba(255, 122, 26, 0.25);
    }
    .path-card:hover {
      transform: translateY(-4px);
    }
    .stage {
      background: #FFFFFF;
      border-radius: 12px;
      padding: 1.5rem;
      min-height: 280px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 0 0 1px rgba(0,0,0,0.06);
    }
    .stage.dark {
      background: #102A43;
    }
    .stage.mono {
      background: #F1F5F9;
    }
    .stage svg {
      max-width: 100%;
      height: 220px;
    }
    .path-meta h3 {
      font-size: 1.4rem;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 0.5rem;
    }
    .path-meta p {
      color: #94A3B8;
      font-size: 0.92rem;
      line-height: 1.5;
    }
    .checklist {
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: 0.88rem;
    }
    .checklist li {
      padding: 0.3rem 0;
      color: #CBD5E1;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .checklist li::before {
      content: "✔";
      color: #FF7A1A;
      font-weight: 800;
    }
    .reduction-section {
      background: rgba(16, 42, 67, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 2.5rem;
      margin-bottom: 3.5rem;
    }
    .reduction-section h2 {
      font-size: 1.8rem;
      font-weight: 800;
      margin-bottom: 1rem;
    }
    .reduction-row {
      display: flex;
      align-items: flex-end;
      gap: 2.5rem;
      flex-wrap: wrap;
      margin-top: 1.5rem;
      background: #F8FAFC;
      padding: 2rem;
      border-radius: 12px;
    }
    .reduction-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: #102A43;
      font-size: 0.8rem;
      font-weight: 700;
    }
    .horizontal-section {
      background: rgba(16, 42, 67, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 2.5rem;
      margin-bottom: 3.5rem;
    }
    .horizontal-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-top: 1.5rem;
    }
    @media (max-width: 900px) {
      .horizontal-grid { grid-template-columns: 1fr; }
    }
    .h-card {
      border-radius: 12px;
      padding: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .h-card.light { background: #FFFFFF; }
    .h-card.dark { background: #102A43; }
    .btn-action {
      background: #FF7A1A;
      color: #fff;
      font-weight: 700;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      border: none;
      cursor: pointer;
      font-size: 0.95rem;
      transition: background 0.2s;
    }
    .btn-action:hover {
      background: #E6660F;
    }
  </style>
</head>
<body>
  <div class="container">
    
    <div class="header-box">
      <span class="badge">Evolução de Marca & Identidade Visual</span>
      <h1>Redesign da Logo Agile — Propostas & Validação</h1>
      <p>Desenvolvido para atender rigorosamente às recomendações de maturidade de marca: redução do ruído visual, hastes esbeltas e arejadas, eliminação do bloco flutuante no topo, faixa de ascensão proprietária e tipografia contemporânea <strong>Plus Jakarta Sans</strong>.</p>
      
      <div class="critique-summary">
        <strong>Pontos Críticos Resolvidos do Diagnóstico:</strong>
        <ul>
          <li><strong>Peso Visual Excessivo:</strong> Hastes do "A" reduzidas em largura, aumentando o respiro e o espaço negativo central.</li>
          <li><strong>Eliminação do Losango Desconectado:</strong> O topo do prisma agora é integrado organicamente ao fluxo da coluna, sem efeito de "peça colada".</li>
          <li><strong>Faixa Laranja Proprietária:</strong> Transformada em um sistema de evolução claro (3 a 4 iterações limpas ou fita contínua sem ruído).</li>
          <li><strong>Tipografia & Tracking:</strong> Substituição do sans-serif genérico e disperso pela família Plus Jakarta Sans com tracking calibrado e harmonia métrica.</li>
          <li><strong>Escalabilidade & Versatilidade:</strong> Testes completos de redução (16px a 96px), lockup horizontal e compatibilidade monocromática 100%.</li>
        </ul>
      </div>
      
      <div style="margin-top: 1.5rem;">
        <a href="index.html" class="btn-action">← Acessar Manual v2 Completo</a>
      </div>
    </div>

    <!-- 3 CAMINHOS DE REDESIGN -->
    <h2 style="font-size: 1.8rem; margin-bottom: 1.5rem;">Caminhos de Redesign em Comparação</h2>
    <div class="comparison-grid">
      
      <!-- CAMINHO 1 -->
      <div class="path-card">
        <span style="font-size: 0.75rem; text-transform: uppercase; color: #94A3B8; font-weight: 700; letter-spacing: 0.05em;">Caminho 1</span>
        <div class="stage">
          <svg viewBox="0 0 800 860">
            <g transform="translate(400, 360) scale(0.92) translate(-400, -380)">
              ${getSymbolCaminho1('color')}
            </g>
            ${getWordmarkSvg('color')}
          </svg>
        </div>
        <div class="path-meta">
          <h3>Refinamento Conservador</h3>
          <p>Mantém a leitura arquitetônica reconhecível da marca original, mas substitui as 8 listras antigas por <strong>3 fases de regularização imobiliária</strong> limpas e integra o topo diretamente à coluna.</p>
          <ul class="checklist" style="margin-top: 1rem;">
            <li>Hastes laterais 25% mais esbeltas</li>
            <li>Topo totalmente integrado à coluna</li>
            <li>3 iterações claras (Diagnóstico, Projeto, Alvará)</li>
            <li>Excelente contraste positivo/negativo</li>
          </ul>
        </div>
      </div>

      <!-- CAMINHO 2 (RECOMENDADO) -->
      <div class="path-card recommended">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.75rem; text-transform: uppercase; color: #FF7A1A; font-weight: 700; letter-spacing: 0.05em;">Caminho 2 • Recomendado pelo Parecer</span>
          <span class="badge" style="margin-bottom: 0; padding: 0.2rem 0.6rem; font-size: 0.7rem;">Mais Proprietário</span>
        </div>
        <div class="stage">
          <svg viewBox="0 0 800 860">
            <g transform="translate(400, 360) scale(0.92) translate(-400, -380)">
              ${getSymbolCaminho2('color')}
            </g>
            ${getWordmarkSvg('color')}
          </svg>
        </div>
        <div class="path-meta">
          <h3>Fita Contínua de Evolução</h3>
          <p>O símbolo atinge pureza máxima: a faixa laranja atua como uma <strong>fita contínua ascendente</strong> que esculpe o interior do "A", comunicando agilidade, fluidez de processo e tecnologia de ponta.</p>
          <ul class="checklist" style="margin-top: 1rem;">
            <li>Zero ruído visual — fita contínua e imponente</li>
            <li>Símbolo 100% autônomo (funciona sem wordmark)</li>
            <li>Respiro arquitetônico generoso</li>
            <li>Leitura instantânea em favicons e mobile</li>
          </ul>
        </div>
      </div>

      <!-- CAMINHO 3 -->
      <div class="path-card">
        <span style="font-size: 0.75rem; text-transform: uppercase; color: #94A3B8; font-weight: 700; letter-spacing: 0.05em;">Caminho 3</span>
        <div class="stage">
          <svg viewBox="0 0 800 860">
            <g transform="translate(400, 360) scale(0.92) translate(-400, -380)">
              ${getSymbolCaminho3('color')}
            </g>
            ${getWordmarkSvg('color')}
          </svg>
        </div>
        <div class="path-meta">
          <h3>Sistema Modular Progressivo</h3>
          <p>Explora os <strong>4 pilares fundamentais</strong> da Agile em módulos de ascensão geométrica. As hastes do "A" sustentam o crescimento dos volumes até a cumeeira.</p>
          <ul class="checklist" style="margin-top: 1rem;">
            <li>4 blocos modulares matematicamente calibrados</li>
            <li>Conceito direto de etapas de construção</li>
            <li>Topo angular em flecha integrada</li>
            <li>Ótimo para animação e motion design</li>
          </ul>
        </div>
      </div>

    </div>

    <!-- TESTE DE REDUÇÃO OBRIGATÓRIO (16px a 96px) -->
    <div class="reduction-section">
      <h2>1. Teste de Redução Extrema (16px, 24px, 32px, 48px, 96px)</h2>
      <p style="color: #94A3B8;">O teste de redução avalia se a marca preserva legibilidade e reconhecimento mesmo nas menores interfaces digitais (favicons, headers mobile, ícones de sistema).</p>
      
      <div class="reduction-row">
        <!-- 96px -->
        <div class="reduction-item">
          <svg width="96" height="96" viewBox="0 0 800 800">
            ${getSymbolCaminho2('color')}
          </svg>
          <span>96px</span>
        </div>
        <!-- 64px -->
        <div class="reduction-item">
          <svg width="64" height="64" viewBox="0 0 800 800">
            ${getSymbolCaminho2('color')}
          </svg>
          <span>64px</span>
        </div>
        <!-- 48px -->
        <div class="reduction-item">
          <svg width="48" height="48" viewBox="0 0 800 800">
            ${getSymbolCaminho2('color')}
          </svg>
          <span>48px</span>
        </div>
        <!-- 32px -->
        <div class="reduction-item">
          <svg width="32" height="32" viewBox="0 0 800 800">
            ${getSymbolCaminho2('color')}
          </svg>
          <span>32px</span>
        </div>
        <!-- 24px -->
        <div class="reduction-item">
          <svg width="24" height="24" viewBox="0 0 800 800">
            ${getSymbolCaminho2('color')}
          </svg>
          <span>24px</span>
        </div>
        <!-- 16px -->
        <div class="reduction-item">
          <svg width="16" height="16" viewBox="0 0 800 800">
            ${getSymbolCaminho2('color')}
          </svg>
          <span>16px (Favicon)</span>
        </div>
      </div>
    </div>

    <!-- TESTE MONOCROMÁTICO & CONTRASTE -->
    <div class="reduction-section">
      <h2>2. Teste Monocromático & Contraste (Preto Puro & Noturno)</h2>
      <p style="color: #94A3B8;">O teste monocromático comprova que a identidade não depende de truques de cor: sua estrutura geométrica pura é reconhecível em carimbos, plotagens monocromáticas e uniformes bordados.</p>
      
      <div class="comparison-grid" style="margin-top: 1.5rem; margin-bottom: 0;">
        <div class="stage mono" style="min-height: 240px;">
          <svg viewBox="0 0 800 860">
            <g transform="translate(400, 360) scale(0.92) translate(-400, -380)">
              ${getSymbolCaminho2('mono')}
            </g>
            ${getWordmarkSvg('mono')}
          </svg>
        </div>
        <div class="stage dark" style="min-height: 240px;">
          <svg viewBox="0 0 800 860">
            <g transform="translate(400, 360) scale(0.92) translate(-400, -380)">
              ${getSymbolCaminho2('dark')}
            </g>
            ${getWordmarkSvg('dark')}
          </svg>
        </div>
        <div class="stage" style="background: #071A33; min-height: 240px;">
          <svg viewBox="0 0 800 860">
            <g transform="translate(400, 360) scale(0.92) translate(-400, -380)">
              ${getSymbolCaminho2('white')}
            </g>
            ${getWordmarkSvg('white')}
          </svg>
        </div>
      </div>
    </div>

    <!-- LOCKUPS HORIZONTAIS -->
    <div class="horizontal-section">
      <h2>3. Aplicação Horizontal Aperfeiçoada</h2>
      <p style="color: #94A3B8;">Essencial para cabeçalhos de sites institucionais, pranchas de prefeitura, assinaturas de e-mail e cartões de visita.</p>
      
      <div class="horizontal-grid">
        <div class="h-card light">
          <svg viewBox="0 0 760 220" width="100%" height="auto">
            <g transform="translate(130, 110) scale(0.24) translate(-400, -390)">
              ${getSymbolCaminho2('color')}
            </g>
            <text x="240" y="118" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="74" letter-spacing="0.08em" fill="${NAVY_MAIN}">AGILE</text>
            <text x="244" y="152" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="16" letter-spacing="0.22em" fill="${SLATE_NEUTRAL}">ENGENHARIA E REGULARIZAÇÃO</text>
          </svg>
        </div>
        <div class="h-card dark">
          <svg viewBox="0 0 760 220" width="100%" height="auto">
            <g transform="translate(130, 110) scale(0.24) translate(-400, -390)">
              ${getSymbolCaminho2('dark')}
            </g>
            <text x="240" y="118" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="74" letter-spacing="0.08em" fill="${WHITE}">AGILE</text>
            <text x="244" y="152" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="16" letter-spacing="0.22em" fill="#94A3B8}">ENGENHARIA E REGULARIZAÇÃO</text>
          </svg>
        </div>
      </div>
    </div>

  </div>
</body>
</html>
`;

// Salvar o preview comparativo dentro de brand-manual-v2
fs.writeFileSync('brand-manual-v2/redesign-preview.html', previewHtml, 'utf-8');
console.log('✅ Painel comparativo gerado em: brand-manual-v2/redesign-preview.html');
