import fs from 'fs';
import path from 'path';
import opentype from 'opentype.js';

const NAVY = '#0B1B3D';
const NAVY_LIGHT = '#162C5B';
const ORANGE = '#FF6B00';
const ORANGE_ROOF = '#FF9D54';
const ORANGE_LIGHT = '#FFA768';
const WHITE = '#FFFFFF';
const BLACK = '#000000';
const SLATE_GRAY = '#64748B';
const LIGHT_GRAY = '#94A3B8';

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// -------------------------------------------------------------------------
// 1. FONT PARSING & OPTICALLY COMPENSATED OPEN 'A'
// -------------------------------------------------------------------------
const fontPath = path.resolve('PlusJakartaSans-ExtraBold.ttf');
const font = opentype.parse(fs.readFileSync(fontPath).buffer);

function getCleanGlyphPath(glyph, x, y, size) {
  const p = glyph.getPath(x, y, size);
  p.commands.forEach(cmd => {
    ['x', 'y', 'x1', 'y1', 'x2', 'y2'].forEach(k => {
      if (typeof cmd[k] === 'number' && isNaN(cmd[k])) cmd[k] = 0;
    });
  });
  return p.toPathData(2);
}

function coordsToSvgPath(points, startX, baselineY, fontSize, unitsPerEm) {
  const scale = fontSize / unitsPerEm;
  return points.map((pt, idx) => {
    const px = (startX + pt[0] * scale).toFixed(2);
    const py = (baselineY - pt[1] * scale).toFixed(2);
    return (idx === 0 ? 'M' : 'L') + ' ' + px + ' ' + py;
  }).join(' ') + ' Z';
}

/**
 * Builds pure vector path for AGILE wordmark with:
 * - 'A' without crossbar, optically thickened by +22% to eliminate thinning illusion
 * - 'G', 'I', 'L', 'E' from Plus Jakarta Sans ExtraBold
 * - Calibrated geometric kerning
 */
function buildAgileWordmarkPaths(startX = 0, baselineY = 100, fontSize = 100, tracking = 28) {
  const scale = fontSize / 1000;
  let curX = startX;
  const paths = [];

  // 1. Optically Thickened Open 'A'
  // Base leg width = 208 units (+24% over standard 168 to match perceived mass of G, I, L, E)
  const legW = 208;
  const outerW = 730;
  const topW = 220;
  const topX1 = (outerW - topW) / 2;
  const topX2 = topX1 + topW;
  const apexY = 745 - (legW * 0.96); // 545.3 units

  const ptsA = [
    [0, 0],
    [topX1, 745],
    [topX2, 745],
    [outerW, 0],
    [outerW - legW, 0],
    [outerW / 2, apexY],
    [legW, 0]
  ];
  paths.push(coordsToSvgPath(ptsA, curX, baselineY, fontSize, 1000));
  curX += (outerW * scale) + (tracking * scale * 0.85); // slight kerning compensation for diagonal A

  // 2. G, I, L, E from Plus Jakarta Sans ExtraBold
  const chars = ['G', 'I', 'L', 'E'];
  chars.forEach((ch, idx) => {
    const g = font.charToGlyph(ch);
    const bb = g.getBoundingBox();
    const glyphVisibleWidth = (bb.x2 - bb.x1) * scale;
    const xOffset = bb.x1 * scale;
    
    const p = getCleanGlyphPath(g, curX - xOffset, baselineY, fontSize);
    paths.push(p);

    const isLast = (idx === chars.length - 1);
    curX += glyphVisibleWidth + (isLast ? 0 : tracking * scale);
  });

  return {
    pathData: paths.join(' '),
    totalWidth: curX - startX,
    capHeight: 745 * scale
  };
}

// -------------------------------------------------------------------------
// 2. OPTION C SYMBOL GEOMETRY (GAP 60px)
// -------------------------------------------------------------------------
function getOptionCSymbol(colorMode = 'color') {
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
    bRight = SLATE_GRAY;
    roof = LIGHT_GRAY;
    louver = WHITE;
  }

  return `
    <!-- Outer "A" Architectural Frame (Option C: Gap 60px) -->
    <polygon points="400,100 620,680 535,680 445,495 355,495 265,680 180,680" fill="${outerA}" />
    
    <!-- Central Isometric Building Structure -->
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
// 3. SVG LAYOUT GENERATORS
// -------------------------------------------------------------------------
function buildSymbolSvg(colorMode, width = 800, height = 800) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="${width}" height="${height}">
  <g id="agile-symbol">
    ${getOptionCSymbol(colorMode)}
  </g>
</svg>`;
}

function buildPrimaryLockup(colorMode = 'color') {
  let textColor = NAVY;
  if (colorMode === 'dark' || colorMode === 'white') textColor = WHITE;
  else if (colorMode === 'mono') textColor = BLACK;

  const fontSize = 106;
  const tracking = 30;
  const dummy = buildAgileWordmarkPaths(0, 0, fontSize, tracking);
  const startX = 400 - (dummy.totalWidth / 2);
  const baselineY = 770;
  const wordmark = buildAgileWordmarkPaths(startX, baselineY, fontSize, tracking);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 900" width="800" height="900">
  <!-- Símbolo Oficial Agile (Opção C Ampla) -->
  <g id="agile-symbol" transform="translate(400, 360) scale(0.92) translate(-400, -380)">
    ${getOptionCSymbol(colorMode)}
  </g>
  
  <!-- Tipografia Oficial AGILE (Caminho Vetorial Puro / 'A' Aberto Compensado) -->
  <path id="agile-wordmark" d="${wordmark.pathData}" fill="${textColor}" />
</svg>`;
}

function buildHorizontalLockup(colorMode = 'color') {
  let textColor = NAVY;
  if (colorMode === 'dark' || colorMode === 'white') textColor = WHITE;
  else if (colorMode === 'mono') textColor = BLACK;

  const fontSize = 96;
  const tracking = 28;
  const startX = 350;
  const baselineY = 214;
  const wordmark = buildAgileWordmarkPaths(startX, baselineY, fontSize, tracking);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 360" width="1000" height="360">
  <!-- Símbolo Oficial Agile -->
  <g id="agile-symbol" transform="translate(175, 180) scale(0.48) translate(-400, -380)">
    ${getOptionCSymbol(colorMode)}
  </g>
  
  <!-- Tipografia Oficial AGILE (Caminho Vetorial Puro / 'A' Aberto Compensado) -->
  <path id="agile-wordmark" d="${wordmark.pathData}" fill="${textColor}" />
</svg>`;
}

function buildStamp(colorMode = 'color') {
  let mainColor = NAVY;
  let accentColor = ORANGE;
  let subColor = ORANGE;

  if (colorMode === 'dark') {
    mainColor = WHITE;
    accentColor = ORANGE;
    subColor = ORANGE_LIGHT;
  } else if (colorMode === 'white') {
    mainColor = WHITE;
    accentColor = WHITE;
    subColor = WHITE;
  } else if (colorMode === 'mono') {
    mainColor = BLACK;
    accentColor = BLACK;
    subColor = BLACK;
  }

  // Expanded geometry:
  // Inner circle r=188, Outer r=280
  // Arc radius r=228
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <path id="stampTopArc" d="M 72,300 A 228,228 0 0,1 528,300" fill="none"/>
    <path id="stampBotArc" d="M 528,300 A 228,228 0 0,1 72,300" fill="none"/>
  </defs>
  
  <!-- Anéis Estruturais de Engenharia -->
  <circle cx="300" cy="300" r="282" fill="none" stroke="${mainColor}" stroke-width="6"/>
  <circle cx="300" cy="300" r="264" fill="none" stroke="${mainColor}" stroke-width="2" stroke-dasharray="9 6"/>
  <circle cx="300" cy="300" r="188" fill="none" stroke="${mainColor}" stroke-width="3"/>
  
  <!-- Tipografia Circular AGILE (Ampliada & Imponente) -->
  <text font-family="'Plus Jakarta Sans', Montserrat, system-ui, -apple-system, sans-serif" font-weight="900" font-size="42px" letter-spacing="0.26em" fill="${mainColor}">
    <textPath href="#stampTopArc" startOffset="50%" text-anchor="middle">AGILE</textPath>
  </text>
  
  <!-- Tipografia Circular ENGENHARIA CIVIL (Ampliada & Nítida) -->
  <text font-family="'Plus Jakarta Sans', Montserrat, system-ui, -apple-system, sans-serif" font-weight="800" font-size="22px" letter-spacing="0.20em" fill="${subColor}">
    <textPath href="#stampBotArc" startOffset="50%" text-anchor="middle">ENGENHARIA CIVIL</textPath>
  </text>
  
  <!-- Marcadores / Delimitadores de Eixo -->
  <circle cx="72" cy="300" r="7" fill="${accentColor}"/>
  <circle cx="528" cy="300" r="7" fill="${accentColor}"/>
  
  <!-- Símbolo Central Ampliado (scale 0.40 no núcleo) -->
  <g transform="translate(300, 304) scale(0.40) translate(-400, -380)">
    ${getOptionCSymbol(colorMode)}
  </g>
</svg>`;
}

// -------------------------------------------------------------------------
// 4. MAIN BUILD & DISTRIBUTION
// -------------------------------------------------------------------------
const targets = [
  path.resolve('assets/logos/exports'),
  path.resolve('assets/logos/official'),
  path.resolve('brand-manual/assets/logos/exports'),
  path.resolve('brand-manual/assets/logos/official'),
  path.resolve('brand-manual/downloads/svg')
];

targets.forEach(dir => ensureDir(dir));

const files = {
  // Lockup Principal Vertical
  'agile-logo-primary.svg': buildPrimaryLockup('color'),
  'agile-logo-primary-dark.svg': buildPrimaryLockup('dark'),
  'agile-logo-primary-white.svg': buildPrimaryLockup('white'),
  'agile-logo-primary-mono.svg': buildPrimaryLockup('mono'),

  // Lockup Horizontal
  'agile-logo-horizontal.svg': buildHorizontalLockup('color'),
  'agile-logo-horizontal-dark.svg': buildHorizontalLockup('dark'),
  'agile-logo-horizontal-white.svg': buildHorizontalLockup('white'),
  'agile-logo-horizontal-mono.svg': buildHorizontalLockup('mono'),

  // Símbolo Isolado
  'agile-symbol.svg': buildSymbolSvg('color'),
  'agile-symbol-dark.svg': buildSymbolSvg('dark'),
  'agile-symbol-white.svg': buildSymbolSvg('white'),
  'agile-symbol-mono.svg': buildSymbolSvg('mono'),

  // Favicons
  'agile-favicon.svg': buildSymbolSvg('color', 32, 32),

  // Selos e Carimbos Técnicos
  'agile-technical-stamp.svg': buildStamp('color'),
  'agile-technical-stamp-mono.svg': buildStamp('mono'),
  'agile-technical-stamp-dark.svg': buildStamp('dark')
};

targets.forEach(dir => {
  Object.entries(files).forEach(([name, content]) => {
    fs.writeFileSync(path.join(dir, name), content.trim(), 'utf8');
  });
});

console.log('✅ Todos os 15 SVGs oficiais (com A aberto compensado e carimbo ampliado) gerados com sucesso!');
