import fs from 'fs';

const NAVY = '#102A43';
const NAVY_DARK = '#071A33';
const NAVY_FACET = '#162C5B';
const ORANGE = '#FF7A1A';
const ORANGE_LIGHT = '#FF9B4A';
const WHITE = '#FFFFFF';
const SLATE = '#667085';

// V1 base: haste do A
function getOuterA(fill = NAVY) {
  return `<polygon points="400,105 615,680 535,680 445,445 355,445 265,680 185,680" fill="${fill}" />`;
}

// 1. Original com Linha Branca (Referência)
function getBuildingOriginalWhite() {
  return `
    <polygon points="400,285 470,332 400,378 330,332" fill="${ORANGE_LIGHT}" />
    <polygon points="330,332 400,378 400,680 330,680" fill="${ORANGE}" />
    <polygon points="400,378 470,332 470,680 400,680" fill="${NAVY_FACET}" />
    <!-- Faixa Branca -->
    <polygon points="330,490 400,532 400,548 330,506" fill="${WHITE}" />
    <polygon points="400,532 470,490 470,506 400,548" fill="${WHITE}" />
  `;
}

// 2. Proposta do Usuário A: Faixa Invertida (Esq: Azul, Dir: Laranja) - Espessura Fina (16px)
function getBuildingInvertedThin() {
  return `
    <polygon points="400,285 470,332 400,378 330,332" fill="${ORANGE_LIGHT}" />
    <polygon points="330,332 400,378 400,680 330,680" fill="${ORANGE}" />
    <polygon points="400,378 470,332 470,680 400,680" fill="${NAVY_FACET}" />
    <!-- Faixa com Cores Invertidas: Esq = Azul, Dir = Laranja -->
    <polygon points="330,490 400,532 400,548 330,506" fill="${NAVY_FACET}" />
    <polygon points="400,532 470,490 470,506 400,548" fill="${ORANGE}" />
  `;
}

// 3. Proposta do Usuário B: Faixa Invertida Marcante (32px - Travessão Arquitetônico)
function getBuildingInvertedMedium() {
  return `
    <polygon points="400,285 470,332 400,378 330,332" fill="${ORANGE_LIGHT}" />
    <polygon points="330,332 400,378 400,680 330,680" fill="${ORANGE}" />
    <polygon points="400,378 470,332 470,680 400,680" fill="${NAVY_FACET}" />
    <!-- Faixa Invertida 32px -->
    <polygon points="330,480 400,522 400,554 330,512" fill="${NAVY_FACET}" />
    <polygon points="400,522 470,480 470,512 400,554" fill="${ORANGE}" />
  `;
}

// 4. Proposta C: Inversão Total dos Blocos (Top vs Bottom)
// Topo: Laranja na esq, Azul na dir.
// Base (abaixo do chevron): Azul na esq, Laranja na dir!
function getBuildingInvertedHalf() {
  return `
    <polygon points="400,285 470,332 400,378 330,332" fill="${ORANGE_LIGHT}" />
    <!-- Bloco Superior -->
    <polygon points="330,332 400,378 400,520 330,478" fill="${ORANGE}" />
    <polygon points="400,378 470,332 470,478 400,520" fill="${NAVY_FACET}" />
    <!-- Bloco Inferior com Cores Invertidas -->
    <polygon points="330,478 400,520 400,680 330,680" fill="${NAVY_FACET}" />
    <polygon points="400,520 470,478 470,680 400,680" fill="${ORANGE}" />
  `;
}

// 5. Proposta D: Faixa Invertida com Respiro Sutil (Linha de junta arquitetônica)
function getBuildingInvertedWithGroove() {
  return `
    <polygon points="400,285 470,332 400,378 330,332" fill="${ORANGE_LIGHT}" />
    <polygon points="330,332 400,378 400,680 330,680" fill="${ORANGE}" />
    <polygon points="400,378 470,332 470,680 400,680" fill="${NAVY_FACET}" />
    <!-- Faixa Invertida com Contraste Vivo -->
    <polygon points="330,482 400,524 400,550 330,508" fill="${NAVY_DARK}" />
    <polygon points="400,524 470,482 470,508 400,550" fill="${ORANGE_LIGHT}" />
  `;
}

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Estudo: Inversão Cromática na Faixa Central</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #071A33;
      color: #F8FAFC;
      font-family: 'Plus Jakarta Sans', sans-serif;
      padding: 3rem 2rem;
    }
    .container { max-width: 1360px; margin: 0 auto; }
    .header {
      background: rgba(16, 42, 67, 0.75);
      border: 1px solid rgba(255, 122, 26, 0.35);
      border-radius: 16px;
      padding: 2rem 2.5rem;
      margin-bottom: 2.5rem;
    }
    h1 { font-size: 2.2rem; font-weight: 800; margin-bottom: 0.5rem; }
    p { color: #94A3B8; font-size: 1.05rem; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
      gap: 1.75rem;
      margin-bottom: 3rem;
    }
    .card {
      background: rgba(16, 42, 67, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 14px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: all 0.25s ease;
    }
    .card.highlight {
      border-color: #FF7A1A;
      box-shadow: 0 0 30px rgba(255, 122, 26, 0.25);
    }
    .stage {
      background: #FFFFFF;
      border-radius: 10px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 250px;
    }
    .stage.dark { background: #102A43; }
    .stage svg { width: 100%; max-width: 210px; height: auto; }
    .card-title { font-size: 1.2rem; font-weight: 700; color: #fff; }
    .card-desc { font-size: 0.88rem; color: #94A3B8; line-height: 1.5; }
    .pill {
      display: inline-block;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: #FF7A1A;
      color: #fff;
      margin-bottom: 0.5rem;
    }
    .subgrid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="pill">Estudo Visual Específico</span>
      <h1>Inversão Cromática da Faixa do Edifício</h1>
      <p>Ideia do usuário: <em>"e se essa parte branca do prédio, na verdade só fosse as cores ao contrário? tipo, onde seria laranja ser azul, e onde seria azul ser laranja."</em></p>
    </div>

    <div class="grid">

      <!-- OPÇÃO 1: ORIGINAL (BRANCA) -->
      <div class="card">
        <span class="pill" style="background: #64748B;">Referência Anterior</span>
        <h3 class="card-title">1. Linha Branca (Original)</h3>
        <p class="card-desc">Corte negativo puro em branco, funcionando como respiro arquitetônico.</p>
        <div class="subgrid">
          <div class="stage">
            <svg viewBox="0 0 800 800">
              ${getOuterA()}
              ${getBuildingOriginalWhite()}
            </svg>
          </div>
          <div class="stage dark">
            <svg viewBox="0 0 800 800">
              ${getOuterA(WHITE)}
              ${getBuildingOriginalWhite()}
            </svg>
          </div>
        </div>
      </div>

      <!-- OPÇÃO 2: FAIXA INVERTIDA FINA -->
      <div class="card highlight">
        <span class="pill">Sua Ideia (Faixa Fina)</span>
        <h3 class="card-title">2. Faixa Chevron Invertida (Fina)</h3>
        <p class="card-desc">Onde era branco agora inverte as cores: no lado laranja fica Azul, e no lado azul fica Laranja. Cria um anel de contraste contínuo sem introduzir cor estranha!</p>
        <div class="subgrid">
          <div class="stage">
            <svg viewBox="0 0 800 800">
              ${getOuterA()}
              ${getBuildingInvertedThin()}
            </svg>
          </div>
          <div class="stage dark">
            <svg viewBox="0 0 800 800">
              ${getOuterA(WHITE)}
              ${getBuildingInvertedThin()}
            </svg>
          </div>
        </div>
      </div>

      <!-- OPÇÃO 3: FAIXA INVERTIDA MÉDIA (TRAVESSÃO DO A) -->
      <div class="card highlight" style="border-width: 2px;">
        <span class="pill" style="background: #10B981;">Muito Forte • Travessão Áureo</span>
        <h3 class="card-title">3. Faixa Invertida Média (32px)</h3>
        <p class="card-desc">A faixa tem altura proporcional que coincide com o travessão do "A". O entrelaçamento óptico fica marcante mesmo em tamanhos pequenos!</p>
        <div class="subgrid">
          <div class="stage">
            <svg viewBox="0 0 800 800">
              ${getOuterA()}
              ${getBuildingInvertedMedium()}
            </svg>
          </div>
          <div class="stage dark">
            <svg viewBox="0 0 800 800">
              ${getOuterA(WHITE)}
              ${getBuildingInvertedMedium()}
            </svg>
          </div>
        </div>
      </div>

      <!-- OPÇÃO 4: METADES OPOSTAS (SPLIT BLOCK) -->
      <div class="card">
        <span class="pill" style="background: #3B82F6;">Variação em Bloco</span>
        <h3 class="card-title">4. Inversão em Metades (Split)</h3>
        <p class="card-desc">A metade superior é Laranja/Azul e a metade inferior inteira inverte para Azul/Laranja. Elimina a linha e divide o prisma em dois blocos de encaixe.</p>
        <div class="subgrid">
          <div class="stage">
            <svg viewBox="0 0 800 800">
              ${getOuterA()}
              ${getBuildingInvertedHalf()}
            </svg>
          </div>
          <div class="stage dark">
            <svg viewBox="0 0 800 800">
              ${getOuterA(WHITE)}
              ${getBuildingInvertedHalf()}
            </svg>
          </div>
        </div>
      </div>

    </div>

    <!-- ANÁLISE DE IMPACTO -->
    <div style="background: rgba(16, 42, 67, 0.7); border-radius: 14px; padding: 2rem; border-left: 5px solid #FF7A1A;">
      <h3 style="margin-bottom: 0.75rem; color: #fff;">💡 Análise do Designer sobre a sua sugestão:</h3>
      <ul style="color: #CBD5E1; font-size: 0.95rem; line-height: 1.8; margin-left: 1.5rem;">
        <li><strong>Elimina o "corte branco":</strong> A faixa branca anterior podia dar a sensação de que o prédio estava "fatiado" ou quebrado ao meio. Com as cores invertidas, ele parece <strong>um volume sólido contínuo com um anel de contraste inteligente</strong>.</li>
        <li><strong>Propriedade Visual Exclusiva:</strong> O cruzamento de cores (onde o laranja tem azul e o azul tem laranja) é um recurso clássico de design corporativo de alto nível (lembra a sofisticação da marca FedEx ou da Mastercard), criando um entrelaçamento que nenhuma marca genérica tem.</li>
        <li><strong>Excelente no fundo branco e no fundo escuro:</strong> Como não há uma linha branca dependendo do fundo, o símbolo fica 100% nítido em qualquer aplicação!</li>
      </ul>
      <div style="margin-top: 1.5rem;">
        <a href="index.html" style="color: #FF7A1A; font-weight: 700; text-decoration: none;">← Voltar para o Manual de Marca v2.0</a>
      </div>
    </div>

  </div>
</body>
</html>
`;

fs.writeFileSync('brand-manual-v2/test-inverted-crossbar.html', html, 'utf-8');
console.log('✅ Estudo de cores invertidas gerado em: brand-manual-v2/test-inverted-crossbar.html');
