import fs from 'fs';
import path from 'path';

const NAVY = '#0B1B3D';
const NAVY_LIGHT = '#162C5B';
const ORANGE = '#FF6B00';
const ORANGE_DARK = '#E65100';
const WHITE = '#FFFFFF';
const SLATE = '#64748B';
const BLACK = '#000000';

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// -------------------------------------------------------------
// VARIANT GEOMETRIES (SYMBOL ONLY)
// -------------------------------------------------------------

// Variant 1: Sharp Geometric Precision (5 louvers, isometric roof, upward apex)
function getVariant1Symbol(colorMode = 'color') {
  let outerColor = NAVY;
  let buildingLeftColor = ORANGE;
  let buildingRightColor = ORANGE_DARK;
  let roofColor = '#FFA059';
  let arrowColor = '#1D3B7A';
  let louverColor = WHITE;

  if (colorMode === 'dark') {
    outerColor = WHITE;
    buildingLeftColor = ORANGE;
    buildingRightColor = ORANGE_DARK;
    roofColor = '#FFA059';
    arrowColor = '#E2E8F0';
    louverColor = NAVY;
  } else if (colorMode === 'white') {
    outerColor = WHITE;
    buildingLeftColor = WHITE;
    buildingRightColor = '#E2E8F0';
    roofColor = '#CBD5E1';
    arrowColor = '#94A3B8';
    louverColor = NAVY;
  } else if (colorMode === 'mono') {
    outerColor = BLACK;
    buildingLeftColor = BLACK;
    buildingRightColor = '#475569';
    roofColor = '#94A3B8';
    arrowColor = '#334155';
    louverColor = WHITE;
  } else if (colorMode === 'orange-bg') {
    outerColor = NAVY;
    buildingLeftColor = WHITE;
    buildingRightColor = '#E2E8F0';
    roofColor = WHITE;
    arrowColor = NAVY_LIGHT;
    louverColor = NAVY;
  }

  return `
    <!-- Outer "A" Architectural Frame -->
    <polygon points="400,90 630,680 490,680 435,540 365,540 310,680 170,680" fill="${outerColor}" />
    
    <!-- Subtle Upward Growth / Arrow in the Apex -->
    <polygon points="400,160 445,260 400,240 355,260" fill="${arrowColor}" opacity="0.35" />
    
    <!-- Isometric Roof / Cap -->
    <polygon points="400,280 470,325 400,365 330,325" fill="${roofColor}" />
    
    <!-- Left Isometric Facade (Technical Louvers) -->
    <polygon points="330,325 400,365 400,680 330,680" fill="${buildingLeftColor}" />
    
    <!-- Right Isometric Facade (Structural Solid Wall) -->
    <polygon points="400,365 470,325 470,680 400,680" fill="${buildingRightColor}" />
    
    <!-- 5 Horizontal Louver Slots -->
    <polygon points="330,375 400,415 400,430 330,390" fill="${louverColor}" />
    <polygon points="330,435 400,475 400,490 330,450" fill="${louverColor}" />
    <polygon points="330,495 400,535 400,550 330,510" fill="${louverColor}" />
    <polygon points="330,555 400,595 400,610 330,570" fill="${louverColor}" />
    <polygon points="330,615 400,655 400,670 330,630" fill="${louverColor}" />
  `;
}

// Variant 2: Minimalist Modern Louvers (4 bold floors, clean negative space)
function getVariant2Symbol(colorMode = 'color') {
  let outerColor = NAVY;
  let bLeft = ORANGE;
  let bRight = NAVY_LIGHT;
  let roof = '#FF9D54';
  let louver = WHITE;

  if (colorMode === 'dark') {
    outerColor = WHITE;
    bLeft = ORANGE;
    bRight = '#FFA768';
    roof = WHITE;
    louver = NAVY;
  } else if (colorMode === 'white') {
    outerColor = WHITE;
    bLeft = WHITE;
    bRight = '#CBD5E1';
    roof = '#E2E8F0';
    louver = NAVY;
  } else if (colorMode === 'mono') {
    outerColor = BLACK;
    bLeft = BLACK;
    bRight = '#64748B';
    roof = '#94A3B8';
    louver = WHITE;
  }

  return `
    <!-- Outer "A" Frame with Chamfered Modern Peak -->
    <polygon points="400,100 620,680 495,680 435,530 365,530 305,680 180,680" fill="${outerColor}" />
    
    <!-- Negative Space Cutout & Isometric Building -->
    <polygon points="400,290 475,335 400,380 325,335" fill="${roof}" />
    <polygon points="325,335 400,380 400,680 325,680" fill="${bLeft}" />
    <polygon points="400,380 475,335 475,680 400,680" fill="${bRight}" />
    
    <!-- 4 Clean Architectural Floor Slots -->
    <polygon points="325,390 400,435 400,455 325,410" fill="${louver}" />
    <polygon points="325,465 400,510 400,530 325,485" fill="${louver}" />
    <polygon points="325,540 400,585 400,605 325,560" fill="${louver}" />
    <polygon points="325,615 400,660 400,678 325,633" fill="${louver}" />
  `;
}

// Variant 3: Solid Institutional Monolith (Heavy civil engineering, portal cutout)
function getVariant3Symbol(colorMode = 'color') {
  let outerColor = NAVY;
  let bLeft = ORANGE;
  let bRight = ORANGE_DARK;
  let roof = '#FFB076';
  let portal = NAVY;

  if (colorMode === 'dark') {
    outerColor = WHITE;
    bLeft = ORANGE;
    bRight = ORANGE_DARK;
    roof = '#FFC59E';
    portal = WHITE;
  } else if (colorMode === 'white') {
    outerColor = WHITE;
    bLeft = WHITE;
    bRight = '#CBD5E1';
    roof = '#F1F5F9';
    portal = NAVY;
  } else if (colorMode === 'mono') {
    outerColor = BLACK;
    bLeft = BLACK;
    bRight = '#475569';
    roof = '#94A3B8';
    portal = BLACK;
  }

  return `
    <polygon points="400,90 640,680 500,680 440,540 360,540 300,680 160,680" fill="${outerColor}" />
    
    <!-- Solid Monolithic Prism -->
    <polygon points="400,270 480,320 400,370 320,320" fill="${roof}" />
    <polygon points="320,320 400,370 400,680 320,680" fill="${bLeft}" />
    <polygon points="400,370 480,320 480,680 400,680" fill="${bRight}" />
    
    <!-- High-Contrast Architectural Portal Cutout on Right Face -->
    <polygon points="420,440 460,415 460,680 420,680" fill="${portal}" opacity="0.85" />
    <!-- Single Top Floor Window on Left Face -->
    <polygon points="335,360 385,392 385,425 335,393" fill="${WHITE}" />
  `;
}

// Variant 4: Hybrid Residence & Commercial Tower (Residential gable roof into commercial levels)
function getVariant4Symbol(colorMode = 'color') {
  let outerColor = NAVY;
  let bLeft = ORANGE;
  let bRight = ORANGE_DARK;
  let roof = '#FF9544';
  let detail = WHITE;

  if (colorMode === 'dark') {
    outerColor = WHITE;
    bLeft = ORANGE;
    bRight = '#FFA05E';
    roof = WHITE;
    detail = NAVY;
  } else if (colorMode === 'white') {
    outerColor = WHITE;
    bLeft = WHITE;
    bRight = '#CBD5E1';
    roof = '#E2E8F0';
    detail = NAVY;
  } else if (colorMode === 'mono') {
    outerColor = BLACK;
    bLeft = BLACK;
    bRight = '#64748B';
    roof = '#94A3B8';
    detail = WHITE;
  }

  return `
    <polygon points="400,80 635,680 500,680 435,530 365,530 300,680 165,680" fill="${outerColor}" />
    
    <!-- Residential Pitched Roof Transitioning to Urban Core -->
    <polygon points="400,250 470,305 400,355 330,305" fill="${roof}" />
    <polygon points="330,305 400,355 400,680 330,680" fill="${bLeft}" />
    <polygon points="400,355 470,305 470,680 400,680" fill="${bRight}" />
    
    <!-- Residential Window Grid + Commercial Louvers -->
    <rect x="345" y="380" width="40" height="40" transform="matrix(0.9 0.45 0 1 0 -160)" fill="${detail}" />
    <polygon points="330,480 400,525 400,545 330,500" fill="${detail}" />
    <polygon points="330,560 400,605 400,625 330,580" fill="${detail}" />
    <polygon points="420,440 455,418 455,680 420,680" fill="${detail}" opacity="0.3" />
  `;
}

// Variant 5: Technical Blueprint & Compass (Precision Line-Weight & Vector Drafting)
function getVariant5Symbol(colorMode = 'color') {
  let strokeColor = NAVY;
  let bFill = ORANGE;
  let bgFill = 'none';

  if (colorMode === 'dark') {
    strokeColor = WHITE;
    bFill = ORANGE;
  } else if (colorMode === 'white') {
    strokeColor = WHITE;
    bFill = WHITE;
  } else if (colorMode === 'mono') {
    strokeColor = BLACK;
    bFill = BLACK;
  }

  return `
    <!-- Drafting Compass A Outline with Technical Linework -->
    <polygon points="400,90 630,680 490,680 435,540 365,540 310,680 170,680" 
      fill="${bgFill}" stroke="${strokeColor}" stroke-width="20" stroke-linejoin="round" />
    
    <!-- Inner Technical Isometric Solid -->
    <polygon points="400,290 470,335 400,375 330,335" fill="${bFill}" opacity="0.9" />
    <polygon points="330,335 400,375 400,670 330,670" fill="${bFill}" />
    <polygon points="400,375 470,335 470,670 400,670" fill="${bFill}" opacity="0.8" />
    
    <!-- Precision Louver Lines in White -->
    <line x1="330" y1="410" x2="400" y2="450" stroke="${WHITE}" stroke-width="12" />
    <line x1="330" y1="475" x2="400" y2="515" stroke="${WHITE}" stroke-width="12" />
    <line x1="330" y1="540" x2="400" y2="580" stroke="${WHITE}" stroke-width="12" />
    <line x1="330" y1="605" x2="400" y2="645" stroke="${WHITE}" stroke-width="12" />
  `;
}

// Variant 6: Dynamic Fast-Track Agility (Forward Velocity Louvers & Speed Approval)
function getVariant6Symbol(colorMode = 'color') {
  let outerColor = NAVY;
  let bLeft = ORANGE;
  let bRight = ORANGE_DARK;
  let roof = '#FFA25B';
  let louver = WHITE;

  if (colorMode === 'dark') {
    outerColor = WHITE;
    bLeft = ORANGE;
    bRight = '#FFA768';
    roof = WHITE;
    louver = NAVY;
  } else if (colorMode === 'white') {
    outerColor = WHITE;
    bLeft = WHITE;
    bRight = '#CBD5E1';
    roof = '#E2E8F0';
    louver = NAVY;
  } else if (colorMode === 'mono') {
    outerColor = BLACK;
    bLeft = BLACK;
    bRight = '#64748B';
    roof = '#94A3B8';
    louver = WHITE;
  }

  return `
    <!-- Dynamic Agility "A" with subtle forward apex sweep -->
    <polygon points="415,85 640,680 505,680 445,535 375,535 305,680 170,680" fill="${outerColor}" />
    
    <!-- Dynamic Isometric Building -->
    <polygon points="410,270 480,320 405,365 335,320" fill="${roof}" />
    <polygon points="335,320 405,365 405,680 335,680" fill="${bLeft}" />
    <polygon points="405,365 480,320 480,680 405,680" fill="${bRight}" />
    
    <!-- Aerodynamic Fast Louvers with Angled Forward Cut -->
    <polygon points="335,380 405,425 405,445 335,400" fill="${louver}" />
    <polygon points="335,445 405,490 405,510 335,465" fill="${louver}" />
    <polygon points="335,510 405,555 405,575 335,530" fill="${louver}" />
    <polygon points="335,575 405,620 405,640 335,595" fill="${louver}" />
    <polygon points="335,640 405,680 405,680 335,660" fill="${louver}" />
  `;
}

// Map of variant generator functions
const VARIANTS = {
  1: { name: 'Sharp Precision', fn: getVariant1Symbol },
  2: { name: 'Minimalist Louvers', fn: getVariant2Symbol },
  3: { name: 'Solid Monolith', fn: getVariant3Symbol },
  4: { name: 'Hybrid Residence', fn: getVariant4Symbol },
  5: { name: 'Technical Compass', fn: getVariant5Symbol },
  6: { name: 'Dynamic Agility', fn: getVariant6Symbol }
};

// -------------------------------------------------------------
// SVG COMPOSITIONS (LOCKUPS)
// -------------------------------------------------------------

function generateSymbolSvg(variantNum, colorMode, width = 800, height = 800) {
  const content = VARIANTS[variantNum].fn(colorMode);
  let bg = 'none';
  if (colorMode === 'dark') bg = NAVY;
  if (colorMode === 'orange-bg') bg = ORANGE;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="${width}" height="${height}">
  ${bg !== 'none' ? `<rect width="800" height="800" fill="${bg}" rx="32"/>` : ''}
  <g id="agile-symbol-v${variantNum}">
    ${content}
  </g>
</svg>`;
}

function generatePrimaryLockupSvg(variantNum, colorMode = 'color') {
  const symbolContent = VARIANTS[variantNum].fn(colorMode);
  let textColor = NAVY;
  let tagColor = ORANGE;
  let bg = 'none';

  if (colorMode === 'dark') {
    textColor = WHITE;
    tagColor = ORANGE;
    bg = NAVY;
  } else if (colorMode === 'white') {
    textColor = WHITE;
    tagColor = WHITE;
    bg = NAVY;
  } else if (colorMode === 'mono') {
    textColor = BLACK;
    tagColor = BLACK;
  }

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
  
  <!-- Símbolo Centralizado (Escala 0.78) -->
  <g transform="translate(400, 370) scale(0.85) translate(-400, -380)">
    ${symbolContent}
  </g>
  
  <!-- Logotipo Oficial Agile (SEM ACENTO) -->
  <text x="400" y="780" class="brand-title" fill="${textColor}">AGILE</text>
  
  <!-- Linhas de Apoio e Tagline -->
  <line x1="120" y1="835" x2="220" y2="835" stroke="${tagColor}" stroke-width="2.5" opacity="0.7"/>
  <text x="400" y="842" class="brand-subtitle" fill="${tagColor}">REGULARIZAÇÃO DE IMÓVEIS</text>
  <line x1="580" y1="835" x2="680" y2="835" stroke="${tagColor}" stroke-width="2.5" opacity="0.7"/>
</svg>`;
}

function generateHorizontalLockupSvg(variantNum, colorMode = 'color') {
  const symbolContent = VARIANTS[variantNum].fn(colorMode);
  let textColor = NAVY;
  let tagColor = ORANGE;
  let bg = 'none';

  if (colorMode === 'dark') {
    textColor = WHITE;
    tagColor = ORANGE;
    bg = NAVY;
  } else if (colorMode === 'white') {
    textColor = WHITE;
    tagColor = WHITE;
    bg = NAVY;
  } else if (colorMode === 'mono') {
    textColor = BLACK;
    tagColor = BLACK;
  }

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
  
  <!-- Símbolo à Esquerda -->
  <g transform="translate(180, 200) scale(0.48) translate(-400, -380)">
    ${symbolContent}
  </g>
  
  <!-- Divisor Vertical Técnico -->
  <line x1="390" y1="80" x2="390" y2="320" stroke="${SLATE}" stroke-width="2" opacity="0.35"/>
  
  <!-- Texto à Direita -->
  <text x="440" y="210" class="brand-title-h" fill="${textColor}">AGILE</text>
  <text x="445" y="268" class="brand-subtitle-h" fill="${tagColor}">ENGENHARIA E REGULARIZAÇÃO</text>
</svg>`;
}

function generateTechnicalStampSvg(variantNum, colorMode = 'color') {
  const symbolContent = VARIANTS[variantNum].fn(colorMode);
  let mainColor = NAVY;
  let accentColor = ORANGE;
  let bg = 'none';

  if (colorMode === 'dark') {
    mainColor = WHITE;
    accentColor = ORANGE;
    bg = NAVY;
  } else if (colorMode === 'mono') {
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
    <!-- Trajetos Circulares para Texto em Curva -->
    <path id="circleTop" d="M 100,300 A 200,200 0 0,1 500,300" fill="none"/>
    <path id="circleBottom" d="M 500,300 A 200,200 0 0,1 100,300" fill="none"/>
  </defs>
  ${bg !== 'none' ? `<rect width="600" height="600" fill="${bg}"/>` : ''}
  
  <!-- Círculos de Carimbo Técnico -->
  <circle cx="300" cy="300" r="280" fill="none" stroke="${mainColor}" stroke-width="5"/>
  <circle cx="300" cy="300" r="262" fill="none" stroke="${mainColor}" stroke-width="2" stroke-dasharray="8 6"/>
  <circle cx="300" cy="300" r="175" fill="none" stroke="${mainColor}" stroke-width="2.5"/>
  
  <!-- Textos Circulares -->
  <text class="stamp-text">
    <textPath href="#circleTop" startOffset="50%" text-anchor="middle">
      AGILE ENGENHARIA
    </textPath>
  </text>
  
  <text class="stamp-sub">
    <textPath href="#circleBottom" startOffset="50%" text-anchor="middle">
      REGULARIZAÇÃO DE IMÓVEIS
    </textPath>
  </text>
  
  <!-- Pontos Decorativos -->
  <circle cx="95" cy="300" r="6" fill="${accentColor}"/>
  <circle cx="505" cy="300" r="6" fill="${accentColor}"/>
  
  <!-- Símbolo Central -->
  <g transform="translate(300, 305) scale(0.32) translate(-400, -380)">
    ${symbolContent}
  </g>
</svg>`;
}

// -------------------------------------------------------------
// BRAND PILLAR ICONS
// -------------------------------------------------------------

function generatePillarIcons() {
  const icons = {
    'icon-agilidade.svg': `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" rx="36" fill="${NAVY}"/>
  <!-- Velocímetro e Cronômetro de Desburocratização Ágil -->
  <path d="M 40,135 A 65,65 0 1,1 160,135" fill="none" stroke="${WHITE}" stroke-width="10" stroke-linecap="round"/>
  <line x1="100" y1="110" x2="145" y2="65" stroke="${ORANGE}" stroke-width="10" stroke-linecap="round"/>
  <circle cx="100" cy="110" r="14" fill="${ORANGE}"/>
  <circle cx="100" cy="110" r="6" fill="${WHITE}"/>
  <!-- Traços de Escala -->
  <line x1="50" y1="120" x2="60" y2="115" stroke="${SLATE}" stroke-width="4" stroke-linecap="round"/>
  <line x1="60" y1="80" x2="70" y2="88" stroke="${SLATE}" stroke-width="4" stroke-linecap="round"/>
  <line x1="100" y1="55" x2="100" y2="67" stroke="${SLATE}" stroke-width="4" stroke-linecap="round"/>
  <line x1="140" y1="80" x2="130" y2="88" stroke="${ORANGE}" stroke-width="4" stroke-linecap="round"/>
</svg>`,

    'icon-confianca.svg': `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" rx="36" fill="${NAVY}"/>
  <!-- Escudo de Proteção com Check de Segurança Jurídica -->
  <path d="M 100,35 L 155,60 C 155,115 100,165 100,165 C 100,165 45,115 45,60 Z" 
        fill="none" stroke="${WHITE}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M 75,100 L 93,118 L 132,78" 
        fill="none" stroke="${ORANGE}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

    'icon-conhecimento-tecnico.svg': `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" rx="36" fill="${NAVY}"/>
  <!-- Compasso de Precisão e Esquadro de Engenharia -->
  <circle cx="100" cy="50" r="14" fill="${ORANGE}"/>
  <path d="M 100,50 L 55,160 M 100,50 L 145,160" stroke="${WHITE}" stroke-width="10" stroke-linecap="round"/>
  <!-- Arco Graduado do Compasso -->
  <path d="M 70,125 A 45,45 0 0,1 130,125" fill="none" stroke="${ORANGE}" stroke-width="8" stroke-linecap="round"/>
  <circle cx="100" cy="125" r="5" fill="${WHITE}"/>
</svg>`,

    'icon-regularizacao-total.svg': `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" rx="36" fill="${NAVY}"/>
  <!-- Prancha / Memorial com Selo de Aprovação de Prefeitura -->
  <rect x="45" y="35" width="85" height="125" rx="8" fill="none" stroke="${WHITE}" stroke-width="10"/>
  <!-- Linhas do Projeto Técnico -->
  <line x1="65" y1="65" x2="105" y2="65" stroke="${SLATE}" stroke-width="6" stroke-linecap="round"/>
  <line x1="65" y1="90" x2="105" y2="90" stroke="${SLATE}" stroke-width="6" stroke-linecap="round"/>
  <line x1="65" y1="115" x2="90" y2="115" stroke="${SLATE}" stroke-width="6" stroke-linecap="round"/>
  <!-- Selo Circular de Habite-se / Aprovação -->
  <circle cx="140" cy="140" r="28" fill="${ORANGE}"/>
  <path d="M 130,140 L 138,148 L 152,132" fill="none" stroke="${WHITE}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
  };

  const iconsDir = path.resolve('assets/icons');
  ensureDir(iconsDir);

  for (const [filename, content] of Object.entries(icons)) {
    fs.writeFileSync(path.join(iconsDir, filename), content.trim());
    console.log(`Created icon: ${filename}`);
  }
}

// -------------------------------------------------------------
// MAIN GENERATOR PIPELINE
// -------------------------------------------------------------

function run() {
  console.log('--- Generating Agile Brand Vector Assets ---');

  // 1. Generate Raw Variants
  for (let v = 1; v <= 6; v++) {
    const varDir = path.resolve(`assets/logos/raw/variant-${v}`);
    ensureDir(varDir);

    // Symbols
    fs.writeFileSync(path.join(varDir, 'symbol-color.svg'), generateSymbolSvg(v, 'color'));
    fs.writeFileSync(path.join(varDir, 'symbol-dark.svg'), generateSymbolSvg(v, 'dark'));
    fs.writeFileSync(path.join(varDir, 'symbol-white.svg'), generateSymbolSvg(v, 'white'));
    fs.writeFileSync(path.join(varDir, 'symbol-mono.svg'), generateSymbolSvg(v, 'mono'));

    // Lockups
    fs.writeFileSync(path.join(varDir, 'lockup-primary.svg'), generatePrimaryLockupSvg(v, 'color'));
    fs.writeFileSync(path.join(varDir, 'lockup-primary-dark.svg'), generatePrimaryLockupSvg(v, 'dark'));
    fs.writeFileSync(path.join(varDir, 'lockup-horizontal.svg'), generateHorizontalLockupSvg(v, 'color'));
    fs.writeFileSync(path.join(varDir, 'lockup-horizontal-dark.svg'), generateHorizontalLockupSvg(v, 'dark'));
    fs.writeFileSync(path.join(varDir, 'stamp-badge.svg'), generateTechnicalStampSvg(v, 'color'));

    console.log(`Generated Variant ${v}: ${VARIANTS[v].name}`);
  }

  // 2. Generate Consolidated Exports (Using Variant 1 as prime flagship)
  const exportsDir = path.resolve('assets/logos/exports');
  ensureDir(exportsDir);

  fs.writeFileSync(path.join(exportsDir, 'agile-logo-primary.svg'), generatePrimaryLockupSvg(1, 'color'));
  fs.writeFileSync(path.join(exportsDir, 'agile-logo-primary-dark.svg'), generatePrimaryLockupSvg(1, 'dark'));
  fs.writeFileSync(path.join(exportsDir, 'agile-logo-horizontal.svg'), generateHorizontalLockupSvg(1, 'color'));
  fs.writeFileSync(path.join(exportsDir, 'agile-logo-horizontal-dark.svg'), generateHorizontalLockupSvg(1, 'dark'));
  fs.writeFileSync(path.join(exportsDir, 'agile-symbol.svg'), generateSymbolSvg(1, 'color'));
  fs.writeFileSync(path.join(exportsDir, 'agile-favicon.svg'), generateSymbolSvg(1, 'color', 32, 32));
  fs.writeFileSync(path.join(exportsDir, 'agile-technical-stamp.svg'), generateTechnicalStampSvg(1, 'color'));

  console.log('Generated Consolidated Exports in assets/logos/exports/');

  // 3. Generate Pillar Icons
  generatePillarIcons();

  console.log('--- Vector Asset Generation Completed Successfully ---');
}

run();
