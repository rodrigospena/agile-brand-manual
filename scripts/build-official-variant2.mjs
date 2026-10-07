import fs from 'fs';
import path from 'path';

const NAVY = '#0B1B3D';
const NAVY_LIGHT = '#162C5B';
const ORANGE = '#FF6B00';
const ORANGE_ROOF = '#FF9D54';
const ORANGE_LIGHT = '#FFA768';
const WHITE = '#FFFFFF';
const SLATE = '#64748B';
const BLACK = '#000000';

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// -------------------------------------------------------------------------
// VARIANTE 2: MINIMALIST LOUVERS (SYMBOL GEOMETRY)
// -------------------------------------------------------------------------
function getVariant2Symbol(colorMode = 'color') {
  let outerA = NAVY;
  let bLeft = ORANGE;
  let bRight = NAVY_LIGHT;
  let roof = ORANGE_ROOF;
  let louver = WHITE;

  if (colorMode === 'dark') {
    outerA = WHITE;
    bRight = ORANGE_LIGHT;
    roof = WHITE;
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
    bRight = '#64748B';
    roof = '#94A3B8';
    louver = WHITE;
  }

  return `
    <!-- Outer "A" Frame with Chamfered Modern Peak -->
    <polygon points="400,100 620,680 495,680 435,530 365,530 305,680 180,680" fill="${outerA}" />
    
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

// -------------------------------------------------------------------------
// OFFICIAL LOCKUPS WITHOUT SLOGAN (ONLY ICON + NAME)
// -------------------------------------------------------------------------
function buildOfficialSymbolSvg(colorMode, width = 800, height = 800) {
  let bg = colorMode === 'dark' ? NAVY : 'none';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="${width}" height="${height}">
  ${bg !== 'none' ? `<rect width="800" height="800" fill="${bg}" rx="32"/>` : ''}
  <g id="agile-symbol">
    ${getVariant2Symbol(colorMode)}
  </g>
</svg>`;
}

function buildOfficialPrimaryLockup(colorMode = 'color') {
  let textColor = colorMode === 'dark' ? WHITE : NAVY;
  let bg = colorMode === 'dark' ? NAVY : 'none';

  if (colorMode === 'white') {
    textColor = WHITE;
    bg = NAVY;
  } else if (colorMode === 'mono') {
    textColor = BLACK;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 900" width="800" height="900">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&amp;display=swap');
      .brand-title-official {
        font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
        font-weight: 800;
        font-size: 96px;
        letter-spacing: 0.18em;
        text-anchor: middle;
      }
    </style>
  </defs>
  ${bg !== 'none' ? `<rect width="800" height="900" fill="${bg}"/>` : ''}
  
  <!-- Símbolo Variante 2 Minimalist Louvers -->
  <g transform="translate(400, 360) scale(0.92) translate(-400, -380)">
    ${getVariant2Symbol(colorMode)}
  </g>
  
  <!-- Nome Oficial AGILE (Sem Slogan) -->
  <text x="400" y="770" class="brand-title-official" fill="${textColor}">AGILE</text>
</svg>`;
}

function buildOfficialHorizontalLockup(colorMode = 'color') {
  let textColor = colorMode === 'dark' ? WHITE : NAVY;
  let bg = colorMode === 'dark' ? NAVY : 'none';

  if (colorMode === 'white') {
    textColor = WHITE;
    bg = NAVY;
  } else if (colorMode === 'mono') {
    textColor = BLACK;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 360" width="1000" height="360">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&amp;display=swap');
      .brand-title-h-official {
        font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
        font-weight: 800;
        font-size: 104px;
        letter-spacing: 0.16em;
        dominant-baseline: central;
      }
    </style>
  </defs>
  ${bg !== 'none' ? `<rect width="1000" height="360" fill="${bg}"/>` : ''}
  
  <!-- Símbolo à Esquerda -->
  <g transform="translate(180, 180) scale(0.48) translate(-400, -380)">
    ${getVariant2Symbol(colorMode)}
  </g>
  
  <!-- Nome Oficial AGILE à Direita (Sem Slogan) -->
  <text x="380" y="180" class="brand-title-h-official" fill="${textColor}">AGILE</text>
</svg>`;
}

function buildOfficialStamp(colorMode = 'color') {
  let mainColor = colorMode === 'dark' ? WHITE : NAVY;
  let accentColor = ORANGE;
  let bg = colorMode === 'dark' ? NAVY : 'none';

  if (colorMode === 'mono') {
    mainColor = BLACK;
    accentColor = BLACK;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&amp;display=swap');
      .stamp-text {
        font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
        font-weight: 800;
        font-size: 28px;
        letter-spacing: 0.28em;
        fill: ${mainColor};
      }
      .stamp-sub {
        font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
        font-weight: 700;
        font-size: 20px;
        letter-spacing: 0.25em;
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
    <textPath href="#cTop" startOffset="50%" text-anchor="middle">AGILE</textPath>
  </text>
  <text class="stamp-sub">
    <textPath href="#cBot" startOffset="50%" text-anchor="middle">ENGENHARIA CIVIL</textPath>
  </text>
  <circle cx="95" cy="300" r="6" fill="${accentColor}"/>
  <circle cx="505" cy="300" r="6" fill="${accentColor}"/>
  <g transform="translate(300, 305) scale(0.32) translate(-400, -380)">
    ${getVariant2Symbol(colorMode)}
  </g>
</svg>`;
}

// -------------------------------------------------------------
// MAIN PIPELINE
// -------------------------------------------------------------
function run() {
  console.log('--- Generating Official Agile Brand Package (Variant 2 Minimalist Louvers - No Slogan) ---');

  const officialDir = path.resolve('assets/logos/official');
  ensureDir(officialDir);

  // 1. Official Package
  fs.writeFileSync(path.join(officialDir, 'agile-logo-primary.svg'), buildOfficialPrimaryLockup('color'));
  fs.writeFileSync(path.join(officialDir, 'agile-logo-primary-dark.svg'), buildOfficialPrimaryLockup('dark'));
  fs.writeFileSync(path.join(officialDir, 'agile-logo-primary-white.svg'), buildOfficialPrimaryLockup('white'));
  fs.writeFileSync(path.join(officialDir, 'agile-logo-primary-mono.svg'), buildOfficialPrimaryLockup('mono'));

  fs.writeFileSync(path.join(officialDir, 'agile-logo-horizontal.svg'), buildOfficialHorizontalLockup('color'));
  fs.writeFileSync(path.join(officialDir, 'agile-logo-horizontal-dark.svg'), buildOfficialHorizontalLockup('dark'));
  fs.writeFileSync(path.join(officialDir, 'agile-logo-horizontal-white.svg'), buildOfficialHorizontalLockup('white'));
  fs.writeFileSync(path.join(officialDir, 'agile-logo-horizontal-mono.svg'), buildOfficialHorizontalLockup('mono'));

  fs.writeFileSync(path.join(officialDir, 'agile-symbol.svg'), buildOfficialSymbolSvg('color'));
  fs.writeFileSync(path.join(officialDir, 'agile-symbol-dark.svg'), buildOfficialSymbolSvg('dark'));
  fs.writeFileSync(path.join(officialDir, 'agile-symbol-white.svg'), buildOfficialSymbolSvg('white'));
  fs.writeFileSync(path.join(officialDir, 'agile-symbol-mono.svg'), buildOfficialSymbolSvg('mono'));

  fs.writeFileSync(path.join(officialDir, 'agile-favicon.svg'), buildOfficialSymbolSvg('color', 32, 32));
  fs.writeFileSync(path.join(officialDir, 'agile-technical-stamp.svg'), buildOfficialStamp('color'));

  // 2. Mirror into exports
  const exportsDir = path.resolve('assets/logos/exports');
  ensureDir(exportsDir);

  fs.writeFileSync(path.join(exportsDir, 'agile-logo-primary.svg'), buildOfficialPrimaryLockup('color'));
  fs.writeFileSync(path.join(exportsDir, 'agile-logo-primary-dark.svg'), buildOfficialPrimaryLockup('dark'));
  fs.writeFileSync(path.join(exportsDir, 'agile-logo-horizontal.svg'), buildOfficialHorizontalLockup('color'));
  fs.writeFileSync(path.join(exportsDir, 'agile-logo-horizontal-dark.svg'), buildOfficialHorizontalLockup('dark'));
  fs.writeFileSync(path.join(exportsDir, 'agile-symbol.svg'), buildOfficialSymbolSvg('color'));
  fs.writeFileSync(path.join(exportsDir, 'agile-favicon.svg'), buildOfficialSymbolSvg('color', 32, 32));
  fs.writeFileSync(path.join(exportsDir, 'agile-technical-stamp.svg'), buildOfficialStamp('color'));

  console.log('--- Official Variant 2 Package Generated Successfully ---');
}

run();
