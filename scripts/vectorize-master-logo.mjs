import fs from 'fs';
import path from 'path';

const NAVY = '#0B1B3D';
const NAVY_DARK = '#061026';
const ORANGE = '#FF6B00';
const ORANGE_ROOF = '#FFA559';
const WHITE = '#FFFFFF';
const SLATE = '#64748B';
const BLACK = '#000000';

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// -------------------------------------------------------------
// EXACT MASTER VECTORIZATION
// -------------------------------------------------------------
function getMasterSymbol(colorMode = 'color') {
  let outerA = NAVY;
  let bLeft = ORANGE;
  let bRight = NAVY_DARK;
  let roof = ORANGE_ROOF;
  let stripe = WHITE;

  if (colorMode === 'dark') {
    outerA = WHITE;
    bRight = NAVY;
    stripe = NAVY;
  } else if (colorMode === 'white') {
    outerA = WHITE;
    bLeft = WHITE;
    bRight = '#CBD5E1';
    roof = '#E2E8F0';
    stripe = NAVY;
  } else if (colorMode === 'mono') {
    outerA = BLACK;
    bLeft = BLACK;
    bRight = '#475569';
    roof = '#94A3B8';
    stripe = WHITE;
  }

  return `
    <!-- Outer "A" Architectural Frame -->
    <polygon points="400,60 660,700 520,700 440,510 360,510 280,700 140,700" fill="${outerA}" />
    
    <!-- Central Isometric Tower -->
    <!-- Top Roof Diamond -->
    <polygon points="400,270 475,320 400,370 325,320" fill="${roof}" />
    
    <!-- Left Orange Facade (Divided by 4 Clean Diagonal White Bands) -->
    <!-- Segment 1 (Top) -->
    <polygon points="325,320 400,370 400,405 325,355" fill="${bLeft}" />
    <!-- Segment 2 -->
    <polygon points="325,380 400,430 400,480 325,430" fill="${bLeft}" />
    <!-- Segment 3 -->
    <polygon points="325,455 400,505 400,555 325,505" fill="${bLeft}" />
    <!-- Segment 4 (Bottom) -->
    <polygon points="325,530 400,580 400,680 325,630" fill="${bLeft}" />
    
    <!-- Right Solid Deep Navy Facade -->
    <polygon points="400,370 475,320 475,630 400,680" fill="${bRight}" />
  `;
}

// -------------------------------------------------------------
// COMPOSITIONS
// -------------------------------------------------------------
function buildSymbolSvg(colorMode) {
  let bg = colorMode === 'dark' ? NAVY : 'none';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  ${bg !== 'none' ? `<rect width="800" height="800" fill="${bg}" rx="32"/>` : ''}
  <g id="agile-symbol-master">
    ${getMasterSymbol(colorMode)}
  </g>
</svg>`;
}

function buildPrimaryLockup(colorMode = 'color') {
  let textColor = colorMode === 'dark' ? WHITE : NAVY;
  let tagColor = ORANGE;
  let bg = colorMode === 'dark' ? NAVY : 'none';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&amp;display=swap');
      .brand-title-master {
        font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
        font-weight: 800;
        font-size: 92px;
        letter-spacing: 0.18em;
        text-anchor: middle;
      }
      .brand-subtitle-master {
        font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
        font-weight: 700;
        font-size: 21px;
        letter-spacing: 0.28em;
        text-anchor: middle;
      }
    </style>
  </defs>
  ${bg !== 'none' ? `<rect width="800" height="1000" fill="${bg}"/>` : ''}
  
  <!-- Símbolo Centralizado -->
  <g transform="translate(400, 360) scale(0.85) translate(-400, -380)">
    ${getMasterSymbol(colorMode)}
  </g>
  
  <!-- Tipografia Oficial AGILE (Sem acento) -->
  <text x="400" y="780" class="brand-title-master" fill="${textColor}">AGILE</text>
  
  <!-- Linhas e Tagline -->
  <line x1="120" y1="835" x2="160" y2="835" stroke="${tagColor}" stroke-width="4" stroke-linecap="round" />
  <text x="400" y="842" class="brand-subtitle-master" fill="${tagColor}">REGULARIZAÇÃO DE IMÓVEIS</text>
  <line x1="640" y1="835" x2="680" y2="835" stroke="${tagColor}" stroke-width="4" stroke-linecap="round" />
</svg>`;
}

function buildHorizontalLockup(colorMode = 'color') {
  let textColor = colorMode === 'dark' ? WHITE : NAVY;
  let tagColor = ORANGE;
  let bg = colorMode === 'dark' ? NAVY : 'none';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400" width="1200" height="400">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&amp;display=swap');
      .brand-title-h {
        font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
        font-weight: 800;
        font-size: 96px;
        letter-spacing: 0.16em;
      }
      .brand-subtitle-h {
        font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
        font-weight: 700;
        font-size: 22px;
        letter-spacing: 0.28em;
      }
    </style>
  </defs>
  ${bg !== 'none' ? `<rect width="1200" height="400" fill="${bg}"/>` : ''}
  
  <!-- Símbolo à Esquerda -->
  <g transform="translate(180, 200) scale(0.48) translate(-400, -380)">
    ${getMasterSymbol(colorMode)}
  </g>
  
  <!-- Divisor Vertical Técnico -->
  <line x1="390" y1="80" x2="390" y2="320" stroke="${SLATE}" stroke-width="2" opacity="0.35"/>
  
  <!-- Tipografia e Tagline à Direita -->
  <text x="440" y="210" class="brand-title-h" fill="${textColor}">AGILE</text>
  <text x="445" y="268" class="brand-subtitle-h" fill="${tagColor}">REGULARIZAÇÃO DE IMÓVEIS</text>
</svg>`;
}

function buildStampBadge(colorMode = 'color') {
  let mainColor = colorMode === 'dark' ? WHITE : NAVY;
  let accentColor = ORANGE;
  let bg = colorMode === 'dark' ? NAVY : 'none';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&amp;display=swap');
      .stamp-text {
        font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
        font-weight: 800;
        font-size: 26px;
        letter-spacing: 0.25em;
        fill: ${mainColor};
      }
      .stamp-sub {
        font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
        font-weight: 700;
        font-size: 19px;
        letter-spacing: 0.22em;
        fill: ${accentColor};
      }
    </style>
    <path id="cTop" d="M 100,300 A 200,200 0 0,1 500,300" fill="none"/>
    <path id="cBot" d="M 500,300 A 200,200 0 0,1 100,300" fill="none"/>
  </defs>
  ${bg !== 'none' ? `<rect width="600" height="600" fill="${bg}"/>` : ''}
  <circle cx="300" cy="300" r="280" fill="none" stroke="${mainColor}" stroke-width="5"/>
  <circle cx="300" cy="300" r="262" fill="none" stroke="${mainColor}" stroke-width="2" stroke-dasharray="8 6"/>
  <circle cx="300" cy="300" r="175" fill="none" stroke="${mainColor}" stroke-width="2.5"/>
  <text class="stamp-text">
    <textPath href="#cTop" startOffset="50%" text-anchor="middle">AGILE ENGENHARIA</textPath>
  </text>
  <text class="stamp-sub">
    <textPath href="#cBot" startOffset="50%" text-anchor="middle">REGULARIZAÇÃO DE IMÓVEIS</textPath>
  </text>
  <circle cx="95" cy="300" r="6" fill="${accentColor}"/>
  <circle cx="505" cy="300" r="6" fill="${accentColor}"/>
  <g transform="translate(300, 305) scale(0.32) translate(-400, -380)">
    ${getMasterSymbol(colorMode)}
  </g>
</svg>`;
}

// -------------------------------------------------------------
// EXECUTE EXPORTS
// -------------------------------------------------------------
function run() {
  console.log('--- Generating Exact Master Logo Vector Files ---');

  const rawDir = path.resolve('assets/logos/raw/opcao-oficial-master');
  ensureDir(rawDir);

  fs.writeFileSync(path.join(rawDir, 'symbol-color.svg'), buildSymbolSvg('color'));
  fs.writeFileSync(path.join(rawDir, 'symbol-dark.svg'), buildSymbolSvg('dark'));
  fs.writeFileSync(path.join(rawDir, 'symbol-white.svg'), buildSymbolSvg('white'));
  fs.writeFileSync(path.join(rawDir, 'symbol-mono.svg'), buildSymbolSvg('mono'));

  fs.writeFileSync(path.join(rawDir, 'lockup-primary.svg'), buildPrimaryLockup('color'));
  fs.writeFileSync(path.join(rawDir, 'lockup-primary-dark.svg'), buildPrimaryLockup('dark'));
  fs.writeFileSync(path.join(rawDir, 'lockup-horizontal.svg'), buildHorizontalLockup('color'));
  fs.writeFileSync(path.join(rawDir, 'lockup-horizontal-dark.svg'), buildHorizontalLockup('dark'));
  fs.writeFileSync(path.join(rawDir, 'stamp-badge.svg'), buildStampBadge('color'));

  // Update exports root
  const exportsDir = path.resolve('assets/logos/exports');
  ensureDir(exportsDir);

  fs.writeFileSync(path.join(exportsDir, 'agile-logo-primary.svg'), buildPrimaryLockup('color'));
  fs.writeFileSync(path.join(exportsDir, 'agile-logo-primary-dark.svg'), buildPrimaryLockup('dark'));
  fs.writeFileSync(path.join(exportsDir, 'agile-logo-horizontal.svg'), buildHorizontalLockup('color'));
  fs.writeFileSync(path.join(exportsDir, 'agile-logo-horizontal-dark.svg'), buildHorizontalLockup('dark'));
  fs.writeFileSync(path.join(exportsDir, 'agile-symbol.svg'), buildSymbolSvg('color'));
  fs.writeFileSync(path.join(exportsDir, 'agile-technical-stamp.svg'), buildStampBadge('color'));

  console.log('--- Master Vectorization Completed Successfully ---');
}

run();
