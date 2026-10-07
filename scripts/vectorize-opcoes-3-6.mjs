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
// OPÇÃO 3: ASYMMETRIC DYNAMIC APEX (VETORIZAÇÃO EXATA)
// -------------------------------------------------------------
function getOpcao3Symbol(colorMode = 'color') {
  let outerA = NAVY;
  let bLeft = ORANGE;
  let bRight = NAVY_LIGHT;
  let roof = ORANGE_LIGHT;
  let stripes = WHITE;

  if (colorMode === 'dark') {
    outerA = WHITE;
    bRight = '#1E3A8A';
  } else if (colorMode === 'white') {
    outerA = WHITE;
    bLeft = WHITE;
    bRight = '#CBD5E1';
    roof = '#E2E8F0';
    stripes = NAVY;
  } else if (colorMode === 'mono') {
    outerA = BLACK;
    bLeft = BLACK;
    bRight = '#475569';
    roof = '#94A3B8';
    stripes = WHITE;
  }

  return `
    <!-- Asymmetric Dynamic Crest Apex on Outer "A" -->
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
    
    <!-- Central Isometric Building -->
    <!-- Top Roof Diamond -->
    <polygon points="400,270 475,320 400,370 325,320" fill="${roof}" />
    
    <!-- Left Orange Facade -->
    <polygon points="325,320 400,370 400,680 325,680" fill="${bLeft}" />
    
    <!-- Right Navy Shaded Facade -->
    <polygon points="400,370 475,320 475,680 400,680" fill="${bRight}" />
    
    <!-- 4 Diagonal Slanted Louver Stripes on Left Facade -->
    <polygon points="325,385 365,360 400,430 360,455" fill="${stripes}" />
    <polygon points="325,465 365,440 400,510 360,535" fill="${stripes}" />
    <polygon points="325,545 365,520 400,590 360,615" fill="${stripes}" />
    <polygon points="325,625 365,600 400,670 360,680" fill="${stripes}" />
  `;
}

// -------------------------------------------------------------
// OPÇÃO 6: DYNAMIC CURVED RIBBONS (VETORIZAÇÃO EXATA)
// -------------------------------------------------------------
function getOpcao6Symbol(colorMode = 'color') {
  let outerA = NAVY;
  let bLeft = ORANGE;
  let bRight = NAVY_LIGHT;
  let roof = ORANGE_LIGHT;
  let ribbonFront = ORANGE;
  let ribbonBack = ORANGE_DARK;
  let stripes = WHITE;

  if (colorMode === 'dark') {
    outerA = WHITE;
    bRight = '#1E3A8A';
    ribbonFront = ORANGE;
    ribbonBack = ORANGE_DARK;
  } else if (colorMode === 'white') {
    outerA = WHITE;
    bLeft = WHITE;
    bRight = '#CBD5E1';
    roof = '#E2E8F0';
    ribbonFront = WHITE;
    ribbonBack = '#94A3B8';
    stripes = NAVY;
  } else if (colorMode === 'mono') {
    outerA = BLACK;
    bLeft = BLACK;
    bRight = '#475569';
    roof = '#94A3B8';
    ribbonFront = BLACK;
    ribbonBack = '#334155';
    stripes = WHITE;
  }

  return `
    <!-- Triangular Outer "A" Frame in Deep Navy -->
    <polygon points="400,90 630,680 500,680 440,540 360,540 300,680 170,680" fill="${outerA}" />
    
    <!-- Central Isometric Tower -->
    <!-- Top Roof Diamond -->
    <polygon points="400,270 475,320 400,370 325,320" fill="${roof}" />
    
    <!-- Left Orange Facade -->
    <polygon points="325,320 400,370 400,680 325,680" fill="${bLeft}" />
    
    <!-- Right Navy Shaded Facade -->
    <polygon points="400,370 475,320 475,680 400,680" fill="${bRight}" />
    
    <!-- 4 Diagonal Slanted Louver Stripes on Left Facade -->
    <polygon points="325,385 365,360 400,430 360,455" fill="${stripes}" />
    <polygon points="325,465 365,440 400,510 360,535" fill="${stripes}" />
    <polygon points="325,545 365,520 400,590 360,615" fill="${stripes}" />
    <polygon points="325,625 365,600 400,670 360,680" fill="${stripes}" />

    <!-- Left Dynamic Ribbon Swoosh -->
    <!-- Underside Shadow Curve -->
    <path d="M 325,500 C 270,490 230,550 170,680 L 230,680 C 270,590 300,540 325,525 Z" fill="${ribbonBack}" />
    <!-- Front Upper Highlight Ribbon -->
    <path d="M 325,450 C 250,460 210,540 170,680 L 250,680 C 280,560 310,500 325,475 Z" fill="${ribbonFront}" />

    <!-- Right Dynamic Ribbon Swoosh -->
    <!-- Underside Shadow Curve -->
    <path d="M 475,500 C 530,490 570,550 630,680 L 570,680 C 530,590 500,540 475,525 Z" fill="${ribbonBack}" />
    <!-- Front Upper Highlight Ribbon -->
    <path d="M 475,450 C 550,460 590,540 630,680 L 550,680 C 520,560 490,500 475,475 Z" fill="${ribbonFront}" />
  `;
}

// -------------------------------------------------------------
// COMPOSER FUNCTIONS
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
// EXECUTE EXPORTS
// -------------------------------------------------------------
function exportTargets() {
  console.log('--- Generating Option 3 and Option 6 Vectors ---');

  const targets = [
    { dir: 'assets/logos/raw/opcao-3-asymmetric-apex', fn: getOpcao3Symbol, prefix: 'agile-opcao-3' },
    { dir: 'assets/logos/raw/opcao-6-dynamic-ribbon', fn: getOpcao6Symbol, prefix: 'agile-opcao-6' }
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

    console.log(`Exported all lockups to ${t.dir}`);
  });

  // Also save to exports folder for quick access
  const exportsDir = path.resolve('assets/logos/exports');
  ensureDir(exportsDir);

  fs.writeFileSync(path.join(exportsDir, 'agile-opcao-3-primary.svg'), buildPrimaryLockup(getOpcao3Symbol, 'color'));
  fs.writeFileSync(path.join(exportsDir, 'agile-opcao-3-horizontal.svg'), buildHorizontalLockup(getOpcao3Symbol, 'color'));
  fs.writeFileSync(path.join(exportsDir, 'agile-opcao-3-symbol.svg'), buildSymbolSvg(getOpcao3Symbol, 'color'));

  fs.writeFileSync(path.join(exportsDir, 'agile-opcao-6-primary.svg'), buildPrimaryLockup(getOpcao6Symbol, 'color'));
  fs.writeFileSync(path.join(exportsDir, 'agile-opcao-6-horizontal.svg'), buildHorizontalLockup(getOpcao6Symbol, 'color'));
  fs.writeFileSync(path.join(exportsDir, 'agile-opcao-6-symbol.svg'), buildSymbolSvg(getOpcao6Symbol, 'color'));

  console.log('--- Option 3 & Option 6 Vectorization Completed Successfully ---');
}

exportTargets();
