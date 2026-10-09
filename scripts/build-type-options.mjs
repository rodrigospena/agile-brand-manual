import fs from 'fs';
import path from 'path';

// 1. Corrected Optical Weight Lambda (Engrossado para ~26px perpendicular, base proporcional)
function getHeavyLambda(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  
  // Optical correction: diagonal thickness increased from 19px to 27px
  // Left leg: outer (35, 0) to (-4, 100). Inner (43, 26) to (23, 100) -> Leg horizontal width = 27px
  // Right leg: outer (51, 0) to (90, 100). Inner (43, 26) to (63, 100) -> Leg horizontal width = 27px
  const d = `M ${p(35, 0)} L ${p(51, 0)} L ${p(90, 100)} L ${p(63, 100)} L ${p(43, 26)} L ${p(23, 100)} L ${p(-4, 100)} Z`;
  return { d, width: 90 * scale };
}

// 2. Architectural High-Crossbar A (Traço elevado/fino estilo engenharia)
function getArchitecturalA(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  
  // Clean modern A with elevated geometric crossbar at y=64 (instead of middle y=50)
  const d = `M ${p(36, 0)} L ${p(50, 0)} L ${p(88, 100)} L ${p(66, 100)} L ${p(57, 72)} L ${p(29, 72)} L ${p(20, 100)} L ${p(-2, 100)} Z ` +
            `M ${p(34, 56)} L ${p(52, 56)} L ${p(43, 24)} Z`;
  return { d, width: 88 * scale };
}

// 3. Ultra-Clean Standard Geometric A
function getCleanGeometricA(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  
  // Standard golden balanced geometric A
  const d = `M ${p(36, 0)} L ${p(50, 0)} L ${p(88, 100)} L ${p(66, 100)} L ${p(58, 68)} L ${p(28, 68)} L ${p(20, 100)} L ${p(-2, 100)} Z ` +
            `M ${p(33, 50)} L ${p(53, 50)} L ${p(43, 22)} Z`;
  return { d, width: 88 * scale };
}

// G, I, L, E components
function getG(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  const d = `M ${p(88, 24)} L ${p(72, 34)} ` +
            `C ${p(65, 21)} ${p(56, 18)} ${p(45, 18)} ` +
            `C ${p(28, 18)} ${p(18, 32)} ${p(18, 50)} ` +
            `C ${p(18, 68)} ${p(28, 82)} ${p(45, 82)} ` +
            `C ${p(60, 82)} ${p(70, 73)} ${p(71, 63)} ` +
            `L ${p(47, 63)} L ${p(47, 46)} L ${p(90, 46)} L ${p(90, 71)} ` +
            `C ${p(82, 89)} ${p(66, 100)} ${p(45, 100)} ` +
            `C ${p(19, 100)} ${p(0, 78)} ${p(0, 50)} ` +
            `C ${p(0, 22)} ${p(19, 0)} ${p(45, 0)} ` +
            `C ${p(66, 0)} ${p(81, 10)} ${p(88, 24)} Z`;
  return { d, width: 90 * scale };
}

function getI(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  const stroke = 21;
  const d = `M ${p(0, 0)} L ${p(stroke, 0)} L ${p(stroke, 100)} L ${p(0, 100)} Z`;
  return { d, width: stroke * scale };
}

function getL(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  const stroke = 21;
  const width = 72;
  const d = `M ${p(0, 0)} L ${p(stroke, 0)} L ${p(stroke, 79)} L ${p(width, 79)} L ${p(width, 100)} L ${p(0, 100)} Z`;
  return { d, width: width * scale };
}

function getE(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  const stroke = 21;
  const width = 74;
  const midWidth = 62;
  const midY = 39.5;
  const midHeight = 21;
  const d = `M ${p(0, 0)} L ${p(width, 0)} L ${p(width, stroke)} ` +
            `L ${p(stroke, stroke)} L ${p(stroke, midY)} ` +
            `L ${p(midWidth, midY)} L ${p(midWidth, midY + midHeight)} ` +
            `L ${p(stroke, midY + midHeight)} L ${p(stroke, 100 - stroke)} ` +
            `L ${p(width, 100 - stroke)} L ${p(width, 100)} L ${p(0, 100)} Z`;
  return { d, width: width * scale };
}

// Build custom wordmark with specified 'A' function
function buildWordmarkWithA(aFn, fontSize = 100, baseTracking = 22, startX = 0, baselineY = 100) {
  const scale = fontSize / 100;
  let curX = startX;
  const paths = [];

  const l1 = aFn(curX, baselineY, scale);
  paths.push(l1.d);
  // kerning A-G
  curX += l1.width + (baseTracking - 10) * scale;

  const l2 = getG(curX, baselineY, scale);
  paths.push(l2.d);
  curX += l2.width + baseTracking * scale;

  const l3 = getI(curX, baselineY, scale);
  paths.push(l3.d);
  curX += l3.width + baseTracking * scale;

  const l4 = getL(curX, baselineY, scale);
  paths.push(l4.d);
  curX += l4.width + baseTracking * scale;

  const l5 = getE(curX, baselineY, scale);
  paths.push(l5.d);
  curX += l5.width;

  return {
    pathData: paths.join(' '),
    totalWidth: curX - startX,
    capHeight: fontSize
  };
}

function getSymbolSvg() {
  return `
    <!-- Outer "A" Frame -->
    <polygon points="400,100 620,680 535,680 445,495 355,495 265,680 180,680" fill="#0B1B3D" />
    <!-- Building -->
    <polygon points="400,290 475,335 400,380 325,335" fill="#FF9D54" />
    <polygon points="325,335 400,380 400,680 325,680" fill="#FF6B00" />
    <polygon points="400,380 475,335 475,680 400,680" fill="#162C5B" />
    <!-- Louvers -->
    <polygon points="325,390 400,435 400,455 325,410" fill="#FFFFFF" />
    <polygon points="325,465 400,510 400,530 325,485" fill="#FFFFFF" />
    <polygon points="325,540 400,585 400,605 325,560" fill="#FFFFFF" />
    <polygon points="325,615 400,660 400,678 325,633" fill="#FFFFFF" />
  `;
}

function renderVertical(aFn, title) {
  const wordmark = buildWordmarkWithA(aFn, 98, 24, 0, 0);
  const startX = 400 - (wordmark.totalWidth / 2);
  const baselineY = 765;
  const centered = buildWordmarkWithA(aFn, 98, 24, startX, baselineY);

  return `
    <div class="card">
      <h3>${title}</h3>
      <div class="preview-box">
        <svg viewBox="0 0 800 860" width="100%">
          <g id="agile-symbol" transform="translate(400, 360) scale(0.92) translate(-400, -380)">
            ${getSymbolSvg()}
          </g>
          <path d="${centered.pathData}" fill="#0B1B3D" />
        </svg>
      </div>
    </div>
  `;
}

function renderHorizontal(aFn, title) {
  const wordmark = buildWordmarkWithA(aFn, 88, 22, 235, 160);
  return `
    <div class="card">
      <h3>${title}</h3>
      <div class="preview-box">
        <svg viewBox="0 0 780 236" width="100%">
          <g id="agile-symbol" transform="translate(125, 118) scale(0.25) translate(-400, -390)">
            ${getSymbolSvg()}
          </g>
          <path d="${wordmark.pathData}" fill="#0B1B3D" />
        </svg>
      </div>
    </div>
  `;
}

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Ajustes Tipográficos da Logo Agile</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #070F24; color: #fff; font-family: system-ui, -apple-system, sans-serif; padding: 40px 20px; }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { font-size: 2rem; color: #fff; margin-bottom: 8px; }
    p.lead { color: #94A3B8; font-size: 1rem; margin-bottom: 30px; line-height: 1.5; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px; margin-bottom: 40px; }
    .card { background: #0F1E3D; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; }
    .card h3 { font-size: 1.05rem; color: #FF9D54; margin-bottom: 12px; }
    .preview-box { background: #FFFFFF; border-radius: 8px; padding: 20px; display: flex; align-items: center; justify-content: center; min-height: 240px; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 99px; font-size: 0.75rem; font-weight: 700; margin-bottom: 8px; }
    .badge-opt { background: rgba(255,107,0,0.2); color: #FF7A1A; border: 1px solid rgba(255,107,0,0.4); }
  </style>
</head>
<body>
  <div class="container">
    <h1>Ajustes do 'A' e Tipografia da Agile</h1>
    <p class="lead">
      <strong>Diagnóstico do que você notou:</strong> Linhas diagonais inclinadas sofrem uma ilusão de óptica — se tiverem a mesma largura matemática de uma linha reta (20px), a espessura perpendicular aparente cai para 15px, parecendo mais fina que o resto da palavra.<br/>
      Abaixo preparamos as soluções corrigidas:
    </p>

    <h2 style="font-size: 1.4rem; color: #38BDF8; margin-bottom: 16px;">1. Comparação no Lockup Vertical</h2>
    <div class="grid">
      <div>
        <span class="badge badge-opt">Opção 1</span>
        ${renderVertical(getHeavyLambda, "Λ com Peso Óptico Corrigido (Engrossado p/ 27px)")}
        <p style="font-size: 0.85rem; color: #94A3B8; margin-top: 10px;">O chevron foi engrossado para ter exatamente a mesma massa visual das hastes retas de I, L, E e do G.</p>
      </div>
      <div>
        <span class="badge badge-opt">Opção 2 — Recomendada</span>
        ${renderVertical(getArchitecturalA, "A Arquitetônico (Traço Elevado & Proporção Perfeita)")}
        <p style="font-size: 0.85rem; color: #94A3B8; margin-top: 10px;">Possui o traço horizontal elevado e sutil, trazendo equilíbrio perfeito, solidez corporativa e sem o efeito de vazio.</p>
      </div>
      <div>
        <span class="badge badge-opt">Opção 3</span>
        ${renderVertical(getCleanGeometricA, "A Geométrico Clássico (Equilíbrio Central)")}
        <p style="font-size: 0.85rem; color: #94A3B8; margin-top: 10px;">Tipografia geométrica corporativa padrão com leitura 100% natural e atemporal.</p>
      </div>
    </div>

    <h2 style="font-size: 1.4rem; color: #38BDF8; margin-bottom: 16px;">2. Comparação no Lockup Horizontal</h2>
    <div class="grid">
      <div>
        <span class="badge badge-opt">Opção 1</span>
        ${renderHorizontal(getHeavyLambda, "Horizontal com Λ Engrossado")}
      </div>
      <div>
        <span class="badge badge-opt">Opção 2 — Recomendada</span>
        ${renderHorizontal(getArchitecturalA, "Horizontal com A Arquitetônico")}
      </div>
      <div>
        <span class="badge badge-opt">Opção 3</span>
        ${renderHorizontal(getCleanGeometricA, "Horizontal com A Geométrico")}
      </div>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync('brand-manual/compare-type-options.html', html, 'utf8');
console.log('Saved brand-manual/compare-type-options.html');
