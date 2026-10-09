import fs from 'fs';
import { buildCustomWordmark } from './design-custom-wordmark.mjs';

function getOptionCSymbol(colorMode = 'color') {
  const NAVY = '#0B1B3D';
  const NAVY_LIGHT = '#162C5B';
  const ORANGE = '#FF6B00';
  const ORANGE_ROOF = '#FF9D54';
  const ORANGE_LIGHT = '#FFA768';
  const WHITE = '#FFFFFF';
  const BLACK = '#000000';

  let outerA = NAVY;
  let bLeft = ORANGE;
  let bRight = NAVY_LIGHT;
  let roof = ORANGE_ROOF;
  let louver = WHITE;

  if (colorMode === 'dark') {
    outerA = WHITE;
    bLeft = ORANGE;
    bRight = ORANGE_LIGHT;
    roof = ORANGE_ROOF;
    louver = NAVY;
  } else if (colorMode === 'white') {
    outerA = WHITE;
    bLeft = WHITE;
    bRight = '#CBD5E1';
    roof = '#E2E8F0';
    louver = NAVY;
  } else if (colorMode === 'mono') {
    outerA = BLACK;
    bLeft = BLACK;
    bRight = '#475569';
    roof = '#94A3B8';
    louver = WHITE;
  } else if (colorMode === 'pure-mono-black') {
    outerA = BLACK;
    bLeft = BLACK;
    bRight = BLACK;
    roof = BLACK;
    louver = WHITE;
  } else if (colorMode === 'pure-mono-white') {
    outerA = WHITE;
    bLeft = WHITE;
    bRight = WHITE;
    roof = WHITE;
    louver = '#0B1B3D';
  }

  return `
    <!-- Outer "A" Frame with Modern Chamfered Peak (Option C Gap 60px) -->
    <polygon points="400,100 620,680 535,680 445,495 355,495 265,680 180,680" fill="${outerA}" />
    
    <!-- Central Isometric Building -->
    <polygon points="400,290 475,335 400,380 325,335" fill="${roof}" />
    <polygon points="325,335 400,380 400,680 325,680" fill="${bLeft}" />
    <polygon points="400,380 475,335 475,680 400,680" fill="${bRight}" />
    
    <!-- 4 Clean Architectural Floor Louver Slots -->
    <polygon points="325,390 400,435 400,455 325,410" fill="${louver}" />
    <polygon points="325,465 400,510 400,530 325,485" fill="${louver}" />
    <polygon points="325,540 400,585 400,605 325,560" fill="${louver}" />
    <polygon points="325,615 400,660 400,678 325,633" fill="${louver}" />
  `;
}

// 1. VERTICAL LOCKUP (800 x 860)
function buildVerticalLockup(colorMode = 'color') {
  const NAVY = '#0B1B3D';
  const WHITE = '#FFFFFF';
  const BLACK = '#000000';

  let textColor = NAVY;
  if (colorMode === 'dark' || colorMode === 'white' || colorMode === 'pure-mono-white') textColor = WHITE;
  else if (colorMode === 'mono' || colorMode === 'pure-mono-black') textColor = BLACK;

  const wordmark = buildCustomWordmark(105, 30, 0, 0);
  const startX = 400 - (wordmark.totalWidth / 2);
  const baselineY = 770;
  const centeredWordmark = buildCustomWordmark(105, 30, startX, baselineY);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 860" width="800" height="860">
  <g id="agile-symbol" transform="translate(400, 360) scale(0.92) translate(-400, -380)">
    ${getOptionCSymbol(colorMode)}
  </g>
  <path d="${centeredWordmark.pathData}" fill="${textColor}" />
</svg>`;
}

// 2. HORIZONTAL LOCKUP (800 x 240) - Refined Proportions
// Symbol height = 150px (scale = 0.258), Wordmark capHeight = 90px (ratio: 1.66)
function buildHorizontalLockup(colorMode = 'color') {
  const NAVY = '#0B1B3D';
  const WHITE = '#FFFFFF';
  const BLACK = '#000000';

  let textColor = NAVY;
  if (colorMode === 'dark' || colorMode === 'white' || colorMode === 'pure-mono-white') textColor = WHITE;
  else if (colorMode === 'mono' || colorMode === 'pure-mono-black') textColor = BLACK;

  const symbolScale = 0.26; // height = 580 * 0.26 = 150.8px
  const symbolCenterX = 130;
  const symbolCenterY = 120;

  const wordmarkStartX = 245;
  const wordmarkBaselineY = 165;
  const wordmark = buildCustomWordmark(92, 28, wordmarkStartX, wordmarkBaselineY);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 240" width="820" height="240">
  <g id="agile-symbol" transform="translate(${symbolCenterX}, ${symbolCenterY}) scale(${symbolScale}) translate(-400, -390)">
    ${getOptionCSymbol(colorMode)}
  </g>
  <path d="${wordmark.pathData}" fill="${textColor}" />
</svg>`;
}

// Generate test HTML page
const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Preview Custom Wordmark & Proportions</title>
  <style>
    body { background: #0A1428; color: #fff; font-family: sans-serif; padding: 40px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px; }
    .card { background: #132244; padding: 25px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); }
    .card.light { background: #F8FAFC; color: #0B1B3D; }
    .card svg { max-width: 100%; height: auto; display: block; margin: 0 auto; }
    h2 { font-size: 1.1rem; margin-bottom: 15px; }
  </style>
</head>
<body>
  <h1>Testes: Nova Tipografia Customizada (Open Chevron Λ) & Proporções</h1>
  
  <h2>1. Lockup Horizontal Aperfeiçoado (Proporções Harmonizadas)</h2>
  <div class="grid">
    <div class="card light">
      <h2>Horizontal Claro</h2>
      ${buildHorizontalLockup('color')}
    </div>
    <div class="card">
      <h2>Horizontal Noturno</h2>
      ${buildHorizontalLockup('dark')}
    </div>
    <div class="card light">
      <h2>Horizontal Monocromático Preto Puro (Minimalista)</h2>
      ${buildHorizontalLockup('pure-mono-black')}
    </div>
    <div class="card">
      <h2>Horizontal Monocromático Branco Puro (Minimalista)</h2>
      ${buildHorizontalLockup('pure-mono-white')}
    </div>
  </div>

  <h2>2. Lockup Vertical</h2>
  <div class="grid">
    <div class="card light">
      <h2>Vertical Claro</h2>
      ${buildVerticalLockup('color')}
    </div>
    <div class="card">
      <h2>Vertical Noturno</h2>
      ${buildVerticalLockup('dark')}
    </div>
    <div class="card light">
      <h2>Vertical Monocromático Preto Puro</h2>
      ${buildVerticalLockup('pure-mono-black')}
    </div>
    <div class="card">
      <h2>Vertical Monocromático Branco Puro</h2>
      ${buildVerticalLockup('pure-mono-white')}
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync('brand-manual/test-custom-wordmark.html', html, 'utf8');
console.log('Saved brand-manual/test-custom-wordmark.html');
