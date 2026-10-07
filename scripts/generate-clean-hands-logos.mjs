import fs from 'fs';
import path from 'path';

const NAVY = '#0B1B3D';
const NAVY_LIGHT = '#18316B';
const NAVY_DARK = '#060F24';
const ORANGE = '#FF6B00';
const ORANGE_DARK = '#D95200';
const ORANGE_LIGHT = '#FFA559';
const WHITE = '#FFFFFF';
const SLATE = '#64748B';
const BLACK = '#000000';

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// -------------------------------------------------------------------------
// 1. MÃOS DE PROTEÇÃO CLÁSSICAS (Sem losangos, mãos elegantes e limpas)
// -------------------------------------------------------------------------
function getCleanHandsSymbol(colorMode = 'color') {
  let outerA = NAVY;
  let bLeft = ORANGE;
  let bRight = NAVY_LIGHT;
  let roof = ORANGE_LIGHT;
  let hands = ORANGE;
  let handsShadow = ORANGE_DARK;

  if (colorMode === 'dark') {
    outerA = WHITE;
    bRight = '#1E3A8A';
    hands = ORANGE;
    handsShadow = ORANGE_DARK;
  } else if (colorMode === 'white') {
    outerA = WHITE;
    bLeft = WHITE;
    bRight = '#CBD5E1';
    roof = '#E2E8F0';
    hands = WHITE;
    handsShadow = '#94A3B8';
  } else if (colorMode === 'mono') {
    outerA = BLACK;
    bLeft = BLACK;
    bRight = '#475569';
    roof = '#94A3B8';
    hands = BLACK;
    handsShadow = '#334155';
  }

  return `
    <!-- Letra "A" Externa -->
    <polygon points="400,90 630,680 500,680 440,540 360,540 300,680 170,680" fill="${outerA}" />
    
    <!-- Edifício Central Limpo (Sem Losangos) -->
    <!-- Topo Isométrico -->
    <polygon points="400,260 470,305 400,350 330,305" fill="${roof}" />
    
    <!-- Fachada Esquerda em Laranja Puro com 3 frisos horizontais retos -->
    <polygon points="330,305 400,350 400,680 330,680" fill="${bLeft}" />
    <line x1="330" y1="400" x2="400" y2="445" stroke="${WHITE}" stroke-width="8" />
    <line x1="330" y1="470" x2="400" y2="515" stroke="${WHITE}" stroke-width="8" />
    <line x1="330" y1="540" x2="400" y2="585" stroke="${WHITE}" stroke-width="8" />
    
    <!-- Fachada Direita em Azul Sólido -->
    <polygon points="400,350 470,305 470,680 400,680" fill="${bRight}" />

    <!-- Mão Esquerda Elegante (Curvatura natural abraçando o prédio) -->
    <path d="M 170,680 
             C 210,630 250,560 300,520 
             C 315,505 325,480 330,460 
             C 330,490 325,520 310,545 
             C 275,600 240,650 220,680 Z" 
          fill="${hands}" />
    <path d="M 330,460 C 315,485 305,515 315,535 C 325,515 328,490 330,460 Z" fill="${handsShadow}" />

    <!-- Mão Direita Elegante (Simétrica abraçando o prédio) -->
    <path d="M 630,680 
             C 590,630 550,560 500,520 
             C 485,505 475,480 470,460 
             C 470,490 475,520 490,545 
             C 525,600 560,650 580,680 Z" 
          fill="${hands}" />
    <path d="M 470,460 C 485,485 495,515 485,535 C 475,515 472,490 470,460 Z" fill="${handsShadow}" />
  `;
}

// -------------------------------------------------------------------------
// 2. MÃOS MINIMALISTAS MODERNAS (Silhueta fluida e integrada ao "A")
// -------------------------------------------------------------------------
function getMinimalHandsSymbol(colorMode = 'color') {
  let outerA = NAVY;
  let bLeft = ORANGE;
  let bRight = NAVY_LIGHT;
  let roof = ORANGE_LIGHT;
  let hands = ORANGE;

  if (colorMode === 'dark') {
    outerA = WHITE;
    bRight = '#1E3A8A';
    hands = ORANGE;
  } else if (colorMode === 'white') {
    outerA = WHITE;
    bLeft = WHITE;
    bRight = '#CBD5E1';
    roof = '#E2E8F0';
    hands = WHITE;
  } else if (colorMode === 'mono') {
    outerA = BLACK;
    bLeft = BLACK;
    bRight = '#475569';
    roof = '#94A3B8';
    hands = BLACK;
  }

  return `
    <polygon points="400,90 630,680 500,680 440,540 360,540 300,680 170,680" fill="${outerA}" />
    
    <!-- Edifício Sólido Limpo -->
    <polygon points="400,260 470,305 400,350 330,305" fill="${roof}" />
    <polygon points="330,305 400,350 400,680 330,680" fill="${bLeft}" />
    <polygon points="400,350 470,305 470,680 400,680" fill="${bRight}" />
    
    <!-- Mãos Fluidas Minimalistas (Traçado Contínuo) -->
    <!-- Braço/Mão Esquerda -->
    <path d="M 170,680 
             Q 250,560 330,480 
             L 330,530 
             Q 270,590 220,680 Z" 
          fill="${hands}" />
          
    <!-- Braço/Mão Direita -->
    <path d="M 630,680 
             Q 550,560 470,480 
             L 470,530 
             Q 530,590 580,680 Z" 
          fill="${hands}" />
  `;
}

// -------------------------------------------------------------------------
// 3. OPÇÃO 6 CORRIGIDA (Dynamic Ribbon SEM losangos)
// -------------------------------------------------------------------------
function getCleanRibbonSymbol(colorMode = 'color') {
  let outerA = NAVY;
  let bLeft = ORANGE;
  let bRight = NAVY_LIGHT;
  let roof = ORANGE_LIGHT;
  let ribbon = ORANGE;
  let ribbonDark = ORANGE_DARK;

  if (colorMode === 'dark') {
    outerA = WHITE;
    bRight = '#1E3A8A';
    ribbon = ORANGE;
    ribbonDark = ORANGE_DARK;
  } else if (colorMode === 'white') {
    outerA = WHITE;
    bLeft = WHITE;
    bRight = '#CBD5E1';
    roof = '#E2E8F0';
    ribbon = WHITE;
    ribbonDark = '#94A3B8';
  } else if (colorMode === 'mono') {
    outerA = BLACK;
    bLeft = BLACK;
    bRight = '#475569';
    roof = '#94A3B8';
    ribbon = BLACK;
    ribbonDark = '#334155';
  }

  return `
    <polygon points="400,90 630,680 500,680 440,540 360,540 300,680 170,680" fill="${outerA}" />
    
    <!-- Edifício Limpo -->
    <polygon points="400,260 470,305 400,350 330,305" fill="${roof}" />
    <polygon points="330,305 400,350 400,680 330,680" fill="${bLeft}" />
    <polygon points="400,350 470,305 470,680 400,680" fill="${bRight}" />
    
    <!-- 3 Linhas Horizontais Limpas na Fachada -->
    <line x1="330" y1="400" x2="400" y2="445" stroke="${WHITE}" stroke-width="8" />
    <line x1="330" y1="470" x2="400" y2="515" stroke="${WHITE}" stroke-width="8" />
    <line x1="330" y1="540" x2="400" y2="585" stroke="${WHITE}" stroke-width="8" />

    <!-- Fitas Curvas em 3D Suaves -->
    <path d="M 330,520 C 270,510 220,570 170,680 L 230,680 C 270,600 300,560 330,545 Z" fill="${ribbonDark}" />
    <path d="M 330,470 C 260,480 210,550 170,680 L 240,680 C 270,580 300,530 330,500 Z" fill="${ribbon}" />

    <path d="M 470,520 C 530,510 580,570 630,680 L 570,680 C 530,600 500,560 470,545 Z" fill="${ribbonDark}" />
    <path d="M 470,470 C 540,480 590,550 630,680 L 560,680 C 530,580 500,530 470,500 Z" fill="${ribbon}" />
  `;
}

// -------------------------------------------------------------------------
// 4. OPÇÃO 3 CORRIGIDA (Asymmetric Apex SEM losangos)
// -------------------------------------------------------------------------
function getCleanOpcao3Symbol(colorMode = 'color') {
  let outerA = NAVY;
  let bLeft = ORANGE;
  let bRight = NAVY_LIGHT;
  let roof = ORANGE_LIGHT;

  if (colorMode === 'dark') {
    outerA = WHITE;
    bRight = '#1E3A8A';
  } else if (colorMode === 'white') {
    outerA = WHITE;
    bLeft = WHITE;
    bRight = '#CBD5E1';
    roof = '#E2E8F0';
  } else if (colorMode === 'mono') {
    outerA = BLACK;
    bLeft = BLACK;
    bRight = '#475569';
    roof = '#94A3B8';
  }

  return `
    <path d="M 175,680 
             L 360,180 
             L 460,90 
             C 455,140 435,170 425,200 
             L 625,680 
             L 500,680 
             L 440,540 
             L 360,540 
             L 300,680 Z" 
          fill="${outerA}" />
    
    <!-- Edifício Limpo -->
    <polygon points="400,260 470,305 400,350 330,305" fill="${roof}" />
    <polygon points="330,305 400,350 400,680 330,680" fill="${bLeft}" />
    <polygon points="400,350 470,305 470,680 400,680" fill="${bRight}" />
    
    <!-- 3 Frisos Horizontais Retos -->
    <line x1="330" y1="400" x2="400" y2="445" stroke="${WHITE}" stroke-width="8" />
    <line x1="330" y1="470" x2="400" y2="515" stroke="${WHITE}" stroke-width="8" />
    <line x1="330" y1="540" x2="400" y2="585" stroke="${WHITE}" stroke-width="8" />
  `;
}

// -------------------------------------------------------------
// COMPOSERS
// -------------------------------------------------------------
function buildSymbolSvg(fn, colorMode) {
  let bg = colorMode === 'dark' ? NAVY : 'none';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  ${bg !== 'none' ? `<rect width="800" height="800" fill="${bg}" rx="32"/>` : ''}
  <g id="symbol">
    ${fn(colorMode)}
  </g>
</svg>`;
}

function buildPrimaryLockup(fn, colorMode) {
  let textColor = colorMode === 'dark' ? WHITE : NAVY;
  let tagColor = ORANGE;
  let bg = colorMode === 'dark' ? NAVY : 'none';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&amp;display=swap');
      .brand-title {
        font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
        font-weight: 800;
        font-size: 88px;
        letter-spacing: 0.16em;
        text-anchor: middle;
      }
      .brand-subtitle {
        font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
        font-weight: 700;
        font-size: 23px;
        letter-spacing: 0.28em;
        text-anchor: middle;
      }
    </style>
  </defs>
  ${bg !== 'none' ? `<rect width="800" height="1000" fill="${bg}"/>` : ''}
  <g transform="translate(400, 370) scale(0.85) translate(-400, -380)">
    ${fn(colorMode)}
  </g>
  <text x="400" y="780" class="brand-title" fill="${textColor}">AGILE</text>
  <line x1="120" y1="835" x2="220" y2="835" stroke="${tagColor}" stroke-width="2.5" opacity="0.7"/>
  <text x="400" y="842" class="brand-subtitle" fill="${tagColor}">REGULARIZAÇÃO DE IMÓVEIS</text>
  <line x1="580" y1="835" x2="680" y2="835" stroke="${tagColor}" stroke-width="2.5" opacity="0.7"/>
</svg>`;
}

function buildHorizontalLockup(fn, colorMode) {
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
        letter-spacing: 0.14em;
      }
      .brand-subtitle-h {
        font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
        font-weight: 700;
        font-size: 23px;
        letter-spacing: 0.28em;
      }
    </style>
  </defs>
  ${bg !== 'none' ? `<rect width="1200" height="400" fill="${bg}"/>` : ''}
  <g transform="translate(180, 200) scale(0.48) translate(-400, -380)">
    ${fn(colorMode)}
  </g>
  <line x1="390" y1="80" x2="390" y2="320" stroke="${SLATE}" stroke-width="2" opacity="0.35"/>
  <text x="440" y="210" class="brand-title-h" fill="${textColor}">AGILE</text>
  <text x="445" y="268" class="brand-subtitle-h" fill="${tagColor}">REGULARIZAÇÃO DE IMÓVEIS</text>
</svg>`;
}

function buildStampBadge(fn, colorMode) {
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
    ${fn(colorMode)}
  </g>
</svg>`;
}

// -------------------------------------------------------------
// EXECUTE
// -------------------------------------------------------------
function run() {
  console.log('--- Generating Clean (No-Rhombus) Vector Versions ---');

  const targets = [
    { dir: 'assets/logos/raw/opcao-maos-limpas', fn: getCleanHandsSymbol, name: 'Mãos de Proteção Limpas' },
    { dir: 'assets/logos/raw/opcao-maos-minimalistas', fn: getMinimalHandsSymbol, name: 'Mãos Minimalistas' },
    { dir: 'assets/logos/raw/opcao-6-dynamic-ribbon', fn: getCleanRibbonSymbol, name: 'Opção 6 Clean Ribbon' },
    { dir: 'assets/logos/raw/opcao-3-asymmetric-apex', fn: getCleanOpcao3Symbol, name: 'Opção 3 Clean Apex' }
  ];

  targets.forEach(t => {
    const targetDir = path.resolve(t.dir);
    ensureDir(targetDir);

    fs.writeFileSync(path.join(targetDir, 'symbol-color.svg'), buildSymbolSvg(t.fn, 'color'));
    fs.writeFileSync(path.join(targetDir, 'symbol-dark.svg'), buildSymbolSvg(t.fn, 'dark'));
    fs.writeFileSync(path.join(targetDir, 'symbol-white.svg'), buildSymbolSvg(t.fn, 'white'));
    fs.writeFileSync(path.join(targetDir, 'symbol-mono.svg'), buildSymbolSvg(t.fn, 'mono'));

    fs.writeFileSync(path.join(targetDir, 'lockup-primary.svg'), buildPrimaryLockup(t.fn, 'color'));
    fs.writeFileSync(path.join(targetDir, 'lockup-primary-dark.svg'), buildPrimaryLockup(t.fn, 'dark'));
    fs.writeFileSync(path.join(targetDir, 'lockup-horizontal.svg'), buildHorizontalLockup(t.fn, 'color'));
    fs.writeFileSync(path.join(targetDir, 'lockup-horizontal-dark.svg'), buildHorizontalLockup(t.fn, 'dark'));
    fs.writeFileSync(path.join(targetDir, 'stamp-badge.svg'), buildStampBadge(t.fn, 'color'));

    console.log(`Exported ${t.name} to ${t.dir}`);
  });

  console.log('--- Completed Clean Vector Exports ---');
}

run();
