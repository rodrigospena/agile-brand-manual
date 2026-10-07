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
// VARIANT GEOMETRIES (1 to 12)
// -------------------------------------------------------------

// Variant 1: Sharp Geometric Precision (5 louvers, isometric roof, upward apex)
function getVariant1Symbol(colorMode = 'color') {
  let outerColor = NAVY, bLeft = ORANGE, bRight = ORANGE_DARK, roof = '#FFA059', arrow = '#1D3B7A', louver = WHITE;
  if (colorMode === 'dark') { outerColor = WHITE; arrow = '#E2E8F0'; louver = NAVY; }
  else if (colorMode === 'white') { outerColor = WHITE; bLeft = WHITE; bRight = '#E2E8F0'; roof = '#CBD5E1'; arrow = '#94A3B8'; louver = NAVY; }
  else if (colorMode === 'mono') { outerColor = BLACK; bLeft = BLACK; bRight = '#475569'; roof = '#94A3B8'; arrow = '#334155'; louver = WHITE; }

  return `
    <polygon points="400,90 630,680 490,680 435,540 365,540 310,680 170,680" fill="${outerColor}" />
    <polygon points="400,160 445,260 400,240 355,260" fill="${arrow}" opacity="0.35" />
    <polygon points="400,280 470,325 400,365 330,325" fill="${roof}" />
    <polygon points="330,325 400,365 400,680 330,680" fill="${bLeft}" />
    <polygon points="400,365 470,325 470,680 400,680" fill="${bRight}" />
    <polygon points="330,375 400,415 400,430 330,390" fill="${louver}" />
    <polygon points="330,435 400,475 400,490 330,450" fill="${louver}" />
    <polygon points="330,495 400,535 400,550 330,510" fill="${louver}" />
    <polygon points="330,555 400,595 400,610 330,570" fill="${louver}" />
    <polygon points="330,615 400,655 400,670 330,630" fill="${louver}" />
  `;
}

// Variant 2: Minimalist Modern Louvers (4 bold floors, clean negative space)
function getVariant2Symbol(colorMode = 'color') {
  let outerColor = NAVY, bLeft = ORANGE, bRight = NAVY_LIGHT, roof = '#FF9D54', louver = WHITE;
  if (colorMode === 'dark') { outerColor = WHITE; bRight = '#FFA768'; roof = WHITE; louver = NAVY; }
  else if (colorMode === 'white') { outerColor = WHITE; bLeft = WHITE; bRight = '#CBD5E1'; roof = '#E2E8F0'; louver = NAVY; }
  else if (colorMode === 'mono') { outerColor = BLACK; bLeft = BLACK; bRight = '#64748B'; roof = '#94A3B8'; louver = WHITE; }

  return `
    <polygon points="400,100 620,680 495,680 435,530 365,530 305,680 180,680" fill="${outerColor}" />
    <polygon points="400,290 475,335 400,380 325,335" fill="${roof}" />
    <polygon points="325,335 400,380 400,680 325,680" fill="${bLeft}" />
    <polygon points="400,380 475,335 475,680 400,680" fill="${bRight}" />
    <polygon points="325,390 400,435 400,455 325,410" fill="${louver}" />
    <polygon points="325,465 400,510 400,530 325,485" fill="${louver}" />
    <polygon points="325,540 400,585 400,605 325,560" fill="${louver}" />
    <polygon points="325,615 400,660 400,678 325,633" fill="${louver}" />
  `;
}

// Variant 3: Solid Institutional Monolith (Heavy engineering, portal cutout)
function getVariant3Symbol(colorMode = 'color') {
  let outerColor = NAVY, bLeft = ORANGE, bRight = ORANGE_DARK, roof = '#FFB076', portal = NAVY;
  if (colorMode === 'dark') { outerColor = WHITE; portal = WHITE; }
  else if (colorMode === 'white') { outerColor = WHITE; bLeft = WHITE; bRight = '#CBD5E1'; roof = '#F1F5F9'; portal = NAVY; }
  else if (colorMode === 'mono') { outerColor = BLACK; bLeft = BLACK; bRight = '#475569'; roof = '#94A3B8'; portal = BLACK; }

  return `
    <polygon points="400,90 640,680 500,680 440,540 360,540 300,680 160,680" fill="${outerColor}" />
    <polygon points="400,270 480,320 400,370 320,320" fill="${roof}" />
    <polygon points="320,320 400,370 400,680 320,680" fill="${bLeft}" />
    <polygon points="400,370 480,320 480,680 400,680" fill="${bRight}" />
    <polygon points="420,440 460,415 460,680 420,680" fill="${portal}" opacity="0.85" />
    <polygon points="335,360 385,392 385,425 335,393" fill="${WHITE}" />
  `;
}

// Variant 4: Hybrid Residence & Tower (Residential gable roof into commercial levels)
function getVariant4Symbol(colorMode = 'color') {
  let outerColor = NAVY, bLeft = ORANGE, bRight = ORANGE_DARK, roof = '#FF9544', detail = WHITE;
  if (colorMode === 'dark') { outerColor = WHITE; bRight = '#FFA05E'; detail = NAVY; }
  else if (colorMode === 'white') { outerColor = WHITE; bLeft = WHITE; bRight = '#CBD5E1'; roof = '#E2E8F0'; detail = NAVY; }
  else if (colorMode === 'mono') { outerColor = BLACK; bLeft = BLACK; bRight = '#64748B'; roof = '#94A3B8'; detail = WHITE; }

  return `
    <polygon points="400,80 635,680 500,680 435,530 365,530 300,680 165,680" fill="${outerColor}" />
    <polygon points="400,250 470,305 400,355 330,305" fill="${roof}" />
    <polygon points="330,305 400,355 400,680 330,680" fill="${bLeft}" />
    <polygon points="400,355 470,305 470,680 400,680" fill="${bRight}" />
    <polygon points="330,480 400,525 400,545 330,500" fill="${detail}" />
    <polygon points="330,560 400,605 400,625 330,580" fill="${detail}" />
    <polygon points="420,440 455,418 455,680 420,680" fill="${detail}" opacity="0.35" />
  `;
}

// Variant 5: Technical Blueprint & Compass (Precision Line-Weight)
function getVariant5Symbol(colorMode = 'color') {
  let strokeColor = NAVY, bFill = ORANGE;
  if (colorMode === 'dark') { strokeColor = WHITE; }
  else if (colorMode === 'white') { strokeColor = WHITE; bFill = WHITE; }
  else if (colorMode === 'mono') { strokeColor = BLACK; bFill = BLACK; }

  return `
    <polygon points="400,90 630,680 490,680 435,540 365,540 310,680 170,680" 
      fill="none" stroke="${strokeColor}" stroke-width="20" stroke-linejoin="round" />
    <polygon points="400,290 470,335 400,375 330,335" fill="${bFill}" opacity="0.9" />
    <polygon points="330,335 400,375 400,670 330,670" fill="${bFill}" />
    <polygon points="400,375 470,335 470,670 400,670" fill="${bFill}" opacity="0.8" />
    <line x1="330" y1="410" x2="400" y2="450" stroke="${WHITE}" stroke-width="12" />
    <line x1="330" y1="475" x2="400" y2="515" stroke="${WHITE}" stroke-width="12" />
    <line x1="330" y1="540" x2="400" y2="580" stroke="${WHITE}" stroke-width="12" />
    <line x1="330" y1="605" x2="400" y2="645" stroke="${WHITE}" stroke-width="12" />
  `;
}

// Variant 6: Dynamic Fast-Track Agility (Forward Speedcut Louvers)
function getVariant6Symbol(colorMode = 'color') {
  let outerColor = NAVY, bLeft = ORANGE, bRight = ORANGE_DARK, roof = '#FFA25B', louver = WHITE;
  if (colorMode === 'dark') { outerColor = WHITE; bRight = '#FFA768'; louver = NAVY; }
  else if (colorMode === 'white') { outerColor = WHITE; bLeft = WHITE; bRight = '#CBD5E1'; roof = '#E2E8F0'; louver = NAVY; }
  else if (colorMode === 'mono') { outerColor = BLACK; bLeft = BLACK; bRight = '#64748B'; roof = '#94A3B8'; louver = WHITE; }

  return `
    <polygon points="415,85 640,680 505,680 445,535 375,535 305,680 170,680" fill="${outerColor}" />
    <polygon points="410,270 480,320 405,365 335,320" fill="${roof}" />
    <polygon points="335,320 405,365 405,680 335,680" fill="${bLeft}" />
    <polygon points="405,365 480,320 480,680 405,680" fill="${bRight}" />
    <polygon points="335,380 405,425 405,445 335,400" fill="${louver}" />
    <polygon points="335,445 405,490 405,510 335,465" fill="${louver}" />
    <polygon points="335,510 405,555 405,575 335,530" fill="${louver}" />
    <polygon points="335,575 405,620 405,640 335,595" fill="${louver}" />
    <polygon points="335,640 405,680 405,680 335,660" fill="${louver}" />
  `;
}

// Variant 7: Ultra-Minimalist Swiss Monogram (Pure Clean Negative Space)
function getVariant7Symbol(colorMode = 'color') {
  let outerColor = NAVY, accentColor = ORANGE;
  if (colorMode === 'dark') { outerColor = WHITE; accentColor = ORANGE; }
  else if (colorMode === 'white') { outerColor = WHITE; accentColor = '#CBD5E1'; }
  else if (colorMode === 'mono') { outerColor = BLACK; accentColor = '#64748B'; }

  return `
    <!-- Ultra Clean Solid "A" with precise negative building cutout -->
    <polygon points="400,90 640,680 510,680 440,520 360,520 290,680 160,680" fill="${outerColor}" />
    <!-- Negative Space Cutout for Building -->
    <polygon points="400,280 460,320 460,680 340,680 340,320" fill="${WHITE}" />
    <!-- Orange Accent Cube inside Cutout -->
    <polygon points="400,310 445,340 400,370 355,340" fill="${accentColor}" />
    <polygon points="355,340 400,370 400,680 355,680" fill="${accentColor}" />
    <polygon points="400,370 445,340 445,680 400,680" fill="${ORANGE_DARK}" />
  `;
}

// Variant 8: Wireframe Isometric Cube Interlock (Inspired by Concept 4)
function getVariant8Symbol(colorMode = 'color') {
  let strokeA = NAVY, strokeBox = ORANGE;
  if (colorMode === 'dark') { strokeA = WHITE; strokeBox = ORANGE; }
  else if (colorMode === 'white') { strokeA = WHITE; strokeBox = '#CBD5E1'; }
  else if (colorMode === 'mono') { strokeA = BLACK; strokeBox = '#475569'; }

  return `
    <!-- Isometric Orange Frame Behind -->
    <polygon points="400,160 560,260 560,520 400,620 240,520 240,260" 
      fill="none" stroke="${strokeBox}" stroke-width="22" stroke-linejoin="round" />
    <line x1="400" y1="160" x2="400" y2="620" stroke="${strokeBox}" stroke-width="16" stroke-dasharray="16 12" />
    <!-- Dominant Interlocking A in Front -->
    <polygon points="400,100 630,680 500,680 440,530 360,530 300,680 170,680" 
      fill="${strokeA}" />
    <polygon points="400,250 445,360 355,360" fill="${WHITE}" />
  `;
}

// Variant 9: Skyscraper Monoline Skyline (Inspired by Concept 2)
function getVariant9Symbol(colorMode = 'color') {
  let strokeColor = NAVY, accentColor = ORANGE;
  if (colorMode === 'dark') { strokeColor = WHITE; accentColor = ORANGE; }
  else if (colorMode === 'white') { strokeColor = WHITE; accentColor = WHITE; }
  else if (colorMode === 'mono') { strokeColor = BLACK; accentColor = BLACK; }

  return `
    <!-- Sharp Tower Skyline Inside A Silhouette -->
    <polygon points="400,80 630,680 510,680 440,530 360,530 290,680 170,680" 
      fill="none" stroke="${strokeColor}" stroke-width="24" stroke-linejoin="round" />
    <!-- Vertical High-Rise Tower Spine -->
    <polygon points="400,180 450,260 450,680 350,680 350,260" fill="${accentColor}" />
    <polygon points="400,180 450,260 400,290 350,260" fill="#FFA566" />
    <!-- Window Grid Louvers -->
    <line x1="370" y1="360" x2="430" y2="360" stroke="${WHITE}" stroke-width="8" />
    <line x1="370" y1="430" x2="430" y2="430" stroke="${WHITE}" stroke-width="8" />
    <line x1="370" y1="500" x2="430" y2="500" stroke="${WHITE}" stroke-width="8" />
    <line x1="370" y1="570" x2="430" y2="570" stroke="${WHITE}" stroke-width="8" />
  `;
}

// Variant 10: Hexagonal Engineering Prism
function getVariant10Symbol(colorMode = 'color') {
  let outerColor = NAVY, leftFacet = ORANGE, rightFacet = ORANGE_DARK, topFacet = '#FFA768';
  if (colorMode === 'dark') { outerColor = WHITE; }
  else if (colorMode === 'white') { outerColor = WHITE; leftFacet = WHITE; rightFacet = '#CBD5E1'; topFacet = '#E2E8F0'; }
  else if (colorMode === 'mono') { outerColor = BLACK; leftFacet = BLACK; rightFacet = '#475569'; topFacet = '#94A3B8'; }

  return `
    <!-- Outer Arch Frame -->
    <polygon points="400,90 620,680 490,680 440,540 360,540 310,680 180,680" fill="${outerColor}" />
    <!-- 3D Hexagonal Solid Prism -->
    <polygon points="400,260 480,310 400,360 320,310" fill="${topFacet}" />
    <polygon points="320,310 400,360 400,680 320,630" fill="${leftFacet}" />
    <polygon points="400,360 480,310 480,630 400,680" fill="${rightFacet}" />
    <!-- 3 Clean Technical Windows -->
    <polygon points="340,360 385,390 385,420 340,390" fill="${WHITE}" />
    <polygon points="340,440 385,470 385,500 340,470" fill="${WHITE}" />
    <polygon points="340,520 385,550 385,580 340,550" fill="${WHITE}" />
  `;
}

// Variant 11: Ascending Apex Arrow (Dominant Growth Arrow + Twin Tower Wings)
function getVariant11Symbol(colorMode = 'color') {
  let leftWing = NAVY, rightWing = NAVY, centerArrow = ORANGE, arrowCap = '#FFA768';
  if (colorMode === 'dark') { leftWing = WHITE; rightWing = WHITE; centerArrow = ORANGE; }
  else if (colorMode === 'white') { leftWing = WHITE; rightWing = '#CBD5E1'; centerArrow = WHITE; }
  else if (colorMode === 'mono') { leftWing = BLACK; rightWing = BLACK; centerArrow = '#475569'; }

  return `
    <!-- Left Architectural Wing -->
    <polygon points="360,200 360,680 200,680 320,200" fill="${leftWing}" />
    <!-- Right Architectural Wing -->
    <polygon points="440,200 440,680 600,680 480,200" fill="${rightWing}" />
    <!-- Center Ascending Arrow Pillar -->
    <polygon points="400,90 460,210 425,210 425,680 375,680 375,210 340,210" fill="${centerArrow}" />
    <polygon points="400,90 460,210 400,180 340,210" fill="${arrowCap}" />
  `;
}

// Variant 12: Chiseled 3D Origami Facet (Maximalist Luxury Engineering)
function getVariant12Symbol(colorMode = 'color') {
  let f1 = NAVY, f2 = '#1E3A8A', f3 = ORANGE, f4 = ORANGE_DARK, f5 = '#FF9E59';
  if (colorMode === 'dark') { f1 = WHITE; f2 = '#E2E8F0'; }
  else if (colorMode === 'white') { f1 = WHITE; f2 = '#CBD5E1'; f3 = WHITE; f4 = '#94A3B8'; f5 = '#E2E8F0'; }
  else if (colorMode === 'mono') { f1 = BLACK; f2 = '#334155'; f3 = '#64748B'; f4 = '#1E293B'; f5 = '#94A3B8'; }

  return `
    <!-- Left A Leg Facets -->
    <polygon points="400,90 400,320 280,680 170,680" fill="${f1}" />
    <polygon points="400,320 400,540 330,680 280,680" fill="${f2}" />
    <!-- Right A Leg Facets -->
    <polygon points="400,90 520,680 630,680 400,320" fill="${f3}" />
    <polygon points="400,320 470,680 520,680 400,540" fill="${f4}" />
    <!-- Central Rising Facet Diamond -->
    <polygon points="400,240 445,360 400,420 355,360" fill="${f5}" />
  `;
}

// Map of all 12 variants
const VARIANTS = {
  1: { name: 'Sharp Precision', desc: '5 frisos técnicos, equilíbrio e proporção áurea clássica.', fn: getVariant1Symbol },
  2: { name: 'Minimalist Louvers', desc: '4 pavimentos com respiros generosos e ar contemporâneo.', fn: getVariant2Symbol },
  3: { name: 'Solid Monolith', desc: 'Solidez e peso estrutural de engenharia pesada com recorte portal.', fn: getVariant3Symbol },
  4: { name: 'Hybrid Residence', desc: 'Mescla cobertura residencial e corpo vertical comercial.', fn: getVariant4Symbol },
  5: { name: 'Technical Compass', desc: 'Linhas técnicas de compasso e prancha de desenho arquitetônico.', fn: getVariant5Symbol },
  6: { name: 'Dynamic Agility', desc: 'Inclinação aerodinâmica ágil simbolizando rapidez no alvará.', fn: getVariant6Symbol },
  7: { name: 'Swiss Monogram', desc: 'Ultra-minimalista suíço com recorte em espaço negativo puro.', fn: getVariant7Symbol },
  8: { name: 'Wireframe Interlock', desc: 'Cubo isométrico 3D interligado à letra A estrutural.', fn: getVariant8Symbol },
  9: { name: 'Skyline Monoline', desc: 'Torre de arranha-céu vertical com frisos lineares finos.', fn: getVariant9Symbol },
  10: { name: 'Hexagonal Prism', desc: 'Prisma hexagonal de engenharia com 3 pavimentos iluminados.', fn: getVariant10Symbol },
  11: { name: 'Apex Ascent Arrow', desc: 'Seta de ascensão central dominante ladeada por duas torres.', fn: getVariant11Symbol },
  12: { name: 'Origami Faceted 3D', desc: 'Facetação geométrica 3D lapidada de alto impacto visual.', fn: getVariant12Symbol }
};

// -------------------------------------------------------------
// SVG COMPOSITIONS
// -------------------------------------------------------------

function generateSymbolSvg(variantNum, colorMode, width = 800, height = 800) {
  const content = VARIANTS[variantNum].fn(colorMode);
  let bg = 'none';
  if (colorMode === 'dark') bg = NAVY;

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
  let textColor = NAVY, tagColor = ORANGE, bg = 'none';

  if (colorMode === 'dark') { textColor = WHITE; tagColor = ORANGE; bg = NAVY; }
  else if (colorMode === 'white') { textColor = WHITE; tagColor = WHITE; bg = NAVY; }
  else if (colorMode === 'mono') { textColor = BLACK; tagColor = BLACK; }

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
    ${symbolContent}
  </g>
  
  <text x="400" y="780" class="brand-title" fill="${textColor}">AGILE</text>
  <line x1="120" y1="835" x2="220" y2="835" stroke="${tagColor}" stroke-width="2.5" opacity="0.7"/>
  <text x="400" y="842" class="brand-subtitle" fill="${tagColor}">REGULARIZAÇÃO DE IMÓVEIS</text>
  <line x1="580" y1="835" x2="680" y2="835" stroke="${tagColor}" stroke-width="2.5" opacity="0.7"/>
</svg>`;
}

function generateHorizontalLockupSvg(variantNum, colorMode = 'color') {
  const symbolContent = VARIANTS[variantNum].fn(colorMode);
  let textColor = NAVY, tagColor = ORANGE, bg = 'none';

  if (colorMode === 'dark') { textColor = WHITE; tagColor = ORANGE; bg = NAVY; }
  else if (colorMode === 'white') { textColor = WHITE; tagColor = WHITE; bg = NAVY; }
  else if (colorMode === 'mono') { textColor = BLACK; tagColor = BLACK; }

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
    ${symbolContent}
  </g>
  
  <line x1="390" y1="80" x2="390" y2="320" stroke="${SLATE}" stroke-width="2" opacity="0.35"/>
  <text x="440" y="210" class="brand-title-h" fill="${textColor}">AGILE</text>
  <text x="445" y="268" class="brand-subtitle-h" fill="${tagColor}">ENGENHARIA E REGULARIZAÇÃO</text>
</svg>`;
}

function generateTechnicalStampSvg(variantNum, colorMode = 'color') {
  const symbolContent = VARIANTS[variantNum].fn(colorMode);
  let mainColor = NAVY, accentColor = ORANGE, bg = 'none';

  if (colorMode === 'dark') { mainColor = WHITE; accentColor = ORANGE; bg = NAVY; }
  else if (colorMode === 'mono') { mainColor = BLACK; accentColor = BLACK; }

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
    <path id="circleTop" d="M 100,300 A 200,200 0 0,1 500,300" fill="none"/>
    <path id="circleBottom" d="M 500,300 A 200,200 0 0,1 100,300" fill="none"/>
  </defs>
  ${bg !== 'none' ? `<rect width="600" height="600" fill="${bg}"/>` : ''}
  
  <circle cx="300" cy="300" r="280" fill="none" stroke="${mainColor}" stroke-width="5"/>
  <circle cx="300" cy="300" r="262" fill="none" stroke="${mainColor}" stroke-width="2" stroke-dasharray="8 6"/>
  <circle cx="300" cy="300" r="175" fill="none" stroke="${mainColor}" stroke-width="2.5"/>
  
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
  
  <circle cx="95" cy="300" r="6" fill="${accentColor}"/>
  <circle cx="505" cy="300" r="6" fill="${accentColor}"/>
  
  <g transform="translate(300, 305) scale(0.32) translate(-400, -380)">
    ${symbolContent}
  </g>
</svg>`;
}

// -------------------------------------------------------------
// MAIN GENERATOR PIPELINE
// -------------------------------------------------------------

function run() {
  console.log('--- Generating Agile 12-Variant Vector Library ---');

  for (let v = 1; v <= 12; v++) {
    const varDir = path.resolve(`assets/logos/raw/variant-${v}`);
    ensureDir(varDir);

    fs.writeFileSync(path.join(varDir, 'symbol-color.svg'), generateSymbolSvg(v, 'color'));
    fs.writeFileSync(path.join(varDir, 'symbol-dark.svg'), generateSymbolSvg(v, 'dark'));
    fs.writeFileSync(path.join(varDir, 'symbol-white.svg'), generateSymbolSvg(v, 'white'));
    fs.writeFileSync(path.join(varDir, 'symbol-mono.svg'), generateSymbolSvg(v, 'mono'));

    fs.writeFileSync(path.join(varDir, 'lockup-primary.svg'), generatePrimaryLockupSvg(v, 'color'));
    fs.writeFileSync(path.join(varDir, 'lockup-primary-dark.svg'), generatePrimaryLockupSvg(v, 'dark'));
    fs.writeFileSync(path.join(varDir, 'lockup-horizontal.svg'), generateHorizontalLockupSvg(v, 'color'));
    fs.writeFileSync(path.join(varDir, 'lockup-horizontal-dark.svg'), generateHorizontalLockupSvg(v, 'dark'));
    fs.writeFileSync(path.join(varDir, 'stamp-badge.svg'), generateTechnicalStampSvg(v, 'color'));

    console.log(`Generated Variant ${v}: ${VARIANTS[v].name}`);
  }

  console.log('--- 12 Vector Variants Successfully Generated ---');
}

run();
