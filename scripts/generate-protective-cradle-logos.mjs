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

// -------------------------------------------------------------
// DESIGN A: ARCHITECTURAL CRADLE (Sleek Cantilever Protection)
// -------------------------------------------------------------
function getCradleSymbol(colorMode = 'color') {
  let outerA = NAVY;
  let bLeft = ORANGE;
  let bRight = NAVY_LIGHT;
  let roof = ORANGE_LIGHT;
  let handFront = ORANGE;
  let handBack = ORANGE_DARK;
  let stripes = WHITE;

  if (colorMode === 'dark') {
    outerA = WHITE;
    bRight = '#1E3A8A';
    handFront = ORANGE;
    handBack = ORANGE_DARK;
  } else if (colorMode === 'white') {
    outerA = WHITE;
    bLeft = WHITE;
    bRight = '#CBD5E1';
    roof = '#E2E8F0';
    handFront = WHITE;
    handBack = '#94A3B8';
    stripes = NAVY;
  } else if (colorMode === 'mono') {
    outerA = BLACK;
    bLeft = BLACK;
    bRight = '#475569';
    roof = '#94A3B8';
    handFront = BLACK;
    handBack = '#334155';
    stripes = WHITE;
  }

  return `
    <!-- Outer "A" Frame with Architectural Precision -->
    <polygon points="400,85 635,680 500,680 440,540 360,540 300,680 165,680" fill="${outerA}" />
    
    <!-- Central Isometric Tower (Clean Proportions) -->
    <polygon points="400,250 470,295 400,340 330,295" fill="${roof}" />
    <polygon points="330,295 400,340 400,680 330,680" fill="${bLeft}" />
    <polygon points="400,340 470,295 470,680 400,680" fill="${bRight}" />
    
    <!-- 4 Clean Diagonal Louver Stripes on Left Facade -->
    <polygon points="330,360 370,335 400,400 360,425" fill="${stripes}" />
    <polygon points="330,440 370,415 400,480 360,505" fill="${stripes}" />
    <polygon points="330,520 370,495 400,560 360,585" fill="${stripes}" />
    <polygon points="330,600 370,575 400,640 360,665" fill="${stripes}" />

    <!-- Left Protective Hand / Foundation Cradle (Sleek Tapered Curve) -->
    <!-- Shadow Depth Layer -->
    <path d="M 330,560 
             C 275,540 220,600 165,680 
             L 245,680 
             C 285,620 310,580 330,575 Z" 
          fill="${handBack}" />
    <!-- Front Hand / Protective Palm Curve -->
    <path d="M 330,480 
             C 310,495 290,525 285,550 
             C 260,575 220,625 165,680 
             L 270,680 
             C 300,605 320,545 330,510 Z" 
          fill="${handFront}" />
    <!-- Palm Tip / Cradle Thumb Detail -->
    <path d="M 330,480 C 315,485 305,505 315,525 C 325,510 328,495 330,480 Z" fill="${handBack}" />

    <!-- Right Protective Hand / Foundation Cradle -->
    <!-- Shadow Depth Layer -->
    <path d="M 470,560 
             C 525,540 580,600 635,680 
             L 555,680 
             C 515,620 490,580 470,575 Z" 
          fill="${handBack}" />
    <!-- Front Hand / Protective Palm Curve -->
    <path d="M 470,480 
             C 490,495 510,525 515,550 
             C 540,575 580,625 635,680 
             L 530,680 
             C 500,605 480,545 470,510 Z" 
          fill="${handFront}" />
    <!-- Palm Tip / Cradle Thumb Detail -->
    <path d="M 470,480 C 485,485 495,505 485,525 C 475,510 472,495 470,480 Z" fill="${handBack}" />
  `;
}

// -------------------------------------------------------------
// DESIGN B: GEOMETRIC HANDS OF SECURITY (Faceted Architectural Hands)
// -------------------------------------------------------------
function getGeometricHandsSymbol(colorMode = 'color') {
  let outerA = NAVY;
  let bLeft = ORANGE;
  let bRight = NAVY_LIGHT;
  let roof = ORANGE_LIGHT;
  let handLight = ORANGE;
  let handDark = ORANGE_DARK;
  let stripes = WHITE;

  if (colorMode === 'dark') {
    outerA = WHITE;
    bRight = '#1E3A8A';
    handLight = ORANGE;
    handDark = ORANGE_DARK;
  } else if (colorMode === 'white') {
    outerA = WHITE;
    bLeft = WHITE;
    bRight = '#CBD5E1';
    roof = '#E2E8F0';
    handLight = WHITE;
    handDark = '#94A3B8';
    stripes = NAVY;
  } else if (colorMode === 'mono') {
    outerA = BLACK;
    bLeft = BLACK;
    bRight = '#475569';
    roof = '#94A3B8';
    handLight = BLACK;
    handDark = '#334155';
    stripes = WHITE;
  }

  return `
    <!-- Letter "A" Silhouette -->
    <polygon points="400,90 630,680 500,680 440,540 360,540 300,680 170,680" fill="${outerA}" />
    
    <!-- Central Tower -->
    <polygon points="400,260 475,310 400,360 325,310" fill="${roof}" />
    <polygon points="325,310 400,360 400,680 325,680" fill="${bLeft}" />
    <polygon points="400,360 475,310 475,680 400,680" fill="${bRight}" />
    
    <!-- Louvers -->
    <polygon points="325,375 365,350 400,420 360,445" fill="${stripes}" />
    <polygon points="325,455 365,430 400,500 360,525" fill="${stripes}" />
    <polygon points="325,535 365,510 400,580 360,605" fill="${stripes}" />
    <polygon points="325,615 365,590 400,660 360,680" fill="${stripes}" />

    <!-- Left Faceted Geometric Hand (Cupping Upward) -->
    <polygon points="325,470 280,520 220,680 285,680 325,530" fill="${handLight}" />
    <polygon points="325,530 285,680 330,680 330,590" fill="${handDark}" />
    <polygon points="325,470 305,485 300,510 325,500" fill="${handDark}" />

    <!-- Right Faceted Geometric Hand (Cupping Upward) -->
    <polygon points="475,470 520,520 580,680 515,680 475,530" fill="${handLight}" />
    <polygon points="475,530 515,680 470,680 470,590" fill="${handDark}" />
    <polygon points="475,470 495,485 500,510 475,500" fill="${handDark}" />
  `;
}

// -------------------------------------------------------------
// DESIGN C: MODERN PROTECTIVE WINGS (Aerodynamic Foundation Support)
// -------------------------------------------------------------
function getProtectiveWingsSymbol(colorMode = 'color') {
  let outerA = NAVY;
  let bLeft = ORANGE;
  let bRight = NAVY_LIGHT;
  let roof = ORANGE_LIGHT;
  let wingGrad1 = ORANGE;
  let wingGrad2 = ORANGE_DARK;
  let stripes = WHITE;

  if (colorMode === 'dark') {
    outerA = WHITE;
    bRight = '#1E3A8A';
  } else if (colorMode === 'white') {
    outerA = WHITE;
    bLeft = WHITE;
    bRight = '#CBD5E1';
    roof = '#E2E8F0';
    wingGrad1 = WHITE;
    wingGrad2 = '#94A3B8';
    stripes = NAVY;
  } else if (colorMode === 'mono') {
    outerA = BLACK;
    bLeft = BLACK;
    bRight = '#475569';
    roof = '#94A3B8';
    wingGrad1 = BLACK;
    wingGrad2 = '#334155';
    stripes = WHITE;
  }

  return `
    <!-- Structural Letter A -->
    <polygon points="400,80 635,680 500,680 440,540 360,540 300,680 165,680" fill="${outerA}" />
    
    <!-- Central Tower -->
    <polygon points="400,240 470,285 400,330 330,285" fill="${roof}" />
    <polygon points="330,285 400,330 400,680 330,680" fill="${bLeft}" />
    <polygon points="400,330 470,285 470,680 400,680" fill="${bRight}" />
    
    <!-- Louvers -->
    <polygon points="330,350 370,325 400,390 360,415" fill="${stripes}" />
    <polygon points="330,430 370,405 400,470 360,495" fill="${stripes}" />
    <polygon points="330,510 370,485 400,550 360,575" fill="${stripes}" />
    <polygon points="330,590 370,565 400,630 360,655" fill="${stripes}" />

    <!-- Left Aerodynamic Foundation Wing -->
    <path d="M 330,450 
             C 260,460 210,540 165,680 
             L 260,680 
             C 290,580 315,510 330,470 Z" 
          fill="${wingGrad1}" />
    <path d="M 330,530 C 280,540 240,600 200,680 L 260,680 C 290,620 310,570 330,545 Z" fill="${wingGrad2}" />

    <!-- Right Aerodynamic Foundation Wing -->
    <path d="M 470,450 
             C 540,460 590,540 635,680 
             L 540,680 
             C 510,580 485,510 470,470 Z" 
          fill="${wingGrad1}" />
    <path d="M 470,530 C 520,540 560,600 600,680 L 540,680 C 510,620 490,570 470,545 Z" fill="${wingGrad2}" />
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
// MAIN EXECUTION
// -------------------------------------------------------------
function run() {
  console.log('--- Generating Premium Protective Hands & Cradle Vectors ---');

  const list = [
    { dir: 'assets/logos/raw/opcao-cradle-protecao', fn: getCradleSymbol, name: 'Cradle Proteção' },
    { dir: 'assets/logos/raw/opcao-maos-seguranca', fn: getGeometricHandsSymbol, name: 'Mãos de Segurança' },
    { dir: 'assets/logos/raw/opcao-asas-suporte', fn: getProtectiveWingsSymbol, name: 'Asas de Fundação' }
  ];

  list.forEach(item => {
    const targetDir = path.resolve(item.dir);
    ensureDir(targetDir);

    fs.writeFileSync(path.join(targetDir, 'symbol-color.svg'), buildSymbolSvg(item.fn, 'color'));
    fs.writeFileSync(path.join(targetDir, 'symbol-dark.svg'), buildSymbolSvg(item.fn, 'dark'));
    fs.writeFileSync(path.join(targetDir, 'symbol-white.svg'), buildSymbolSvg(item.fn, 'white'));
    fs.writeFileSync(path.join(targetDir, 'symbol-mono.svg'), buildSymbolSvg(item.fn, 'mono'));

    fs.writeFileSync(path.join(targetDir, 'lockup-primary.svg'), buildPrimaryLockup(item.fn, 'color'));
    fs.writeFileSync(path.join(targetDir, 'lockup-primary-dark.svg'), buildPrimaryLockup(item.fn, 'dark'));
    fs.writeFileSync(path.join(targetDir, 'lockup-horizontal.svg'), buildHorizontalLockup(item.fn, 'color'));
    fs.writeFileSync(path.join(targetDir, 'lockup-horizontal-dark.svg'), buildHorizontalLockup(item.fn, 'dark'));
    fs.writeFileSync(path.join(targetDir, 'stamp-badge.svg'), buildStampBadge(item.fn, 'color'));

    console.log(`Generated ${item.name} in ${item.dir}`);
  });

  // Save to exports folder for quick access
  const exportsDir = path.resolve('assets/logos/exports');
  ensureDir(exportsDir);

  fs.writeFileSync(path.join(exportsDir, 'agile-cradle-protecao-primary.svg'), buildPrimaryLockup(getCradleSymbol, 'color'));
  fs.writeFileSync(path.join(exportsDir, 'agile-cradle-protecao-horizontal.svg'), buildHorizontalLockup(getCradleSymbol, 'color'));
  fs.writeFileSync(path.join(exportsDir, 'agile-cradle-protecao-symbol.svg'), buildSymbolSvg(getCradleSymbol, 'color'));

  console.log('--- Protective Hands & Cradle Vectors Completed Successfully ---');
}

run();
