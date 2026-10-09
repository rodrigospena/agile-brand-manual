import fs from 'fs';
import { 
  buildRefinedWordmark, 
  getMonoSymbolStyle1, 
  getMonoSymbolStyle2, 
  getMonoSymbolStyle3,
  getRefinedLambda,
  getRefinedG,
  getRefinedI,
  getRefinedL,
  getRefinedE
} from './test-monochrome-and-kerning.mjs';

function buildLockupH(symbolSvgFn, colorMode, textColor) {
  const wordmark = buildRefinedWordmark(88, 24, 235, 162);
  const symbolScale = 0.25;
  const symbolCenterX = 125;
  const symbolCenterY = 118;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 236" width="100%">
    <g id="agile-symbol" transform="translate(${symbolCenterX}, ${symbolCenterY}) scale(${symbolScale}) translate(-400, -390)">
      ${symbolSvgFn}
    </g>
    <path d="${wordmark.pathData}" fill="${textColor}" />
  </svg>`;
}

function buildLockupV(symbolSvgFn, colorMode, textColor) {
  const wordmark = buildRefinedWordmark(96, 26, 0, 0);
  const startX = 400 - (wordmark.totalWidth / 2);
  const baselineY = 760;
  const centered = buildRefinedWordmark(96, 26, startX, baselineY);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 850" width="100%">
    <g id="agile-symbol" transform="translate(400, 360) scale(0.92) translate(-400, -380)">
      ${symbolSvgFn}
    </g>
    <path d="${centered.pathData}" fill="${textColor}" />
  </svg>`;
}

const s1_light = getMonoSymbolStyle1('#0B1B3D', '#FFFFFF');
const s1_dark = getMonoSymbolStyle1('#FFFFFF', '#0B1B3D');

const s2_light = getMonoSymbolStyle2('#0B1B3D', '#FFFFFF');
const s2_dark = getMonoSymbolStyle2('#FFFFFF', '#0B1B3D');

const s3_light = getMonoSymbolStyle3('light');
const s3_dark = getMonoSymbolStyle3('dark');

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Opções de Monocromático & Kerning Ajustado</title>
  <style>
    body { background: #070F24; color: #fff; font-family: system-ui, sans-serif; padding: 30px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 40px; }
    .card { background: #0E1C3B; padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); }
    .card.light { background: #FFFFFF; color: #0B1B3D; }
    h2 { font-size: 1.2rem; color: #FF6B00; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; }
    .desc { font-size: 0.85rem; color: #94A3B8; margin-bottom: 15px; }
  </style>
</head>
<body>
  <h1>Comparação: Estilos Monocromáticos + Kerning Ajustado do "ΛGILE"</h1>
  <p style="color: #CBD5E1; max-width: 800px; margin-bottom: 30px;">
    O espaçamento entre o <strong>Λ</strong> e o <strong>G</strong> foi corrigido com kerning óptico negativo (-12px) e o Λ teve sua largura ajustada para 84px, unificando a palavra e eliminando a sensação de desconexão.
  </p>

  <h2>Opção 1: Architectural Tonal (Tons de Cinza / Slate Arquitetônico) — RECOMENDADO</h2>
  <div class="desc">Preserva perfeitamente o volume 3D isométrico, o teto facetado e os 4 pavimentos, usando tons de cinza técnicos elegantes (sem ficar um bloco preto chapado).</div>
  <div class="grid">
    <div class="card light">
      <h3 style="color:#0B1B3D; font-size:0.95rem; margin-bottom:8px;">Horizontal Tonal Claro</h3>
      ${buildLockupH(s3_light, 'light', '#0B1B3D')}
    </div>
    <div class="card">
      <h3 style="color:#FFF; font-size:0.95rem; margin-bottom:8px;">Horizontal Tonal Noturno</h3>
      ${buildLockupH(s3_dark, 'dark', '#FFFFFF')}
    </div>
    <div class="card light">
      <h3 style="color:#0B1B3D; font-size:0.95rem; margin-bottom:8px;">Vertical Tonal Claro</h3>
      ${buildLockupV(s3_light, 'light', '#0B1B3D')}
    </div>
    <div class="card">
      <h3 style="color:#FFF; font-size:0.95rem; margin-bottom:8px;">Vertical Tonal Noturno</h3>
      ${buildLockupV(s3_dark, 'dark', '#FFFFFF')}
    </div>
  </div>

  <h2>Opção 2: Stencil Negativo (Preto & Branco Puro com Contraste Alto)</h2>
  <div class="desc">O edifício central se abre em espaço negativo branco e as lâminas dos pavimentos + teto são desenhados em preto.</div>
  <div class="grid">
    <div class="card light">
      <h3 style="color:#0B1B3D; font-size:0.95rem; margin-bottom:8px;">Horizontal Stencil Claro</h3>
      ${buildLockupH(s2_light, 'light', '#0B1B3D')}
    </div>
    <div class="card">
      <h3 style="color:#FFF; font-size:0.95rem; margin-bottom:8px;">Horizontal Stencil Noturno</h3>
      ${buildLockupH(s2_dark, 'dark', '#FFFFFF')}
    </div>
  </div>

  <h2>Opção 3: Linha Técnica & Canaleta de Isolação (Line Art / Blueprint)</h2>
  <div class="desc">O edifício possui canaletas brancas de isolamento estrutural separando as faces e o teto.</div>
  <div class="grid">
    <div class="card light">
      <h3 style="color:#0B1B3D; font-size:0.95rem; margin-bottom:8px;">Horizontal Linha Clara</h3>
      ${buildLockupH(s1_light, 'light', '#0B1B3D')}
    </div>
    <div class="card">
      <h3 style="color:#FFF; font-size:0.95rem; margin-bottom:8px;">Horizontal Linha Noturna</h3>
      ${buildLockupH(s1_dark, 'dark', '#FFFFFF')}
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync('brand-manual/compare-monochrome-styles.html', html, 'utf8');
console.log('Saved brand-manual/compare-monochrome-styles.html');
