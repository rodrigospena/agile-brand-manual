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
// 1. FONT PARSING & CUSTOM ROBUST PATH SERIALIZER (ZERO NaN)
// -------------------------------------------------------------------------
const fontPath = path.resolve('PlusJakartaSans-ExtraBold.ttf');
const font = opentype.parse(fs.readFileSync(fontPath).buffer);

function commandsToSvgPath(commands) {
  return commands.map(cmd => {
    const f = (val) => Number(val).toFixed(2);
    if (cmd.type === 'M') return 'M ' + f(cmd.x) + ' ' + f(cmd.y);
    if (cmd.type === 'L') return 'L ' + f(cmd.x) + ' ' + f(cmd.y);
    if (cmd.type === 'Q') return 'Q ' + f(cmd.x1) + ' ' + f(cmd.y1) + ' ' + f(cmd.x) + ' ' + f(cmd.y);
    if (cmd.type === 'C') return 'C ' + f(cmd.x1) + ' ' + f(cmd.y1) + ' ' + f(cmd.x2) + ' ' + f(cmd.y2) + ' ' + f(cmd.x) + ' ' + f(cmd.y);
    if (cmd.type === 'Z') return 'Z';
    return '';
  }).filter(Boolean).join(' ');
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
// -------------------------------------------------------------------------
// 1. TYPOGRAPHY: OFFICIAL CUSTOM GEOMETRIC WORDMARK 'AGILE'
// -------------------------------------------------------------------------
/**
 * Wordmark Generator:
 * - 'A' with open chevron geometry, calibrated to exact stroke weight (155 upm, matching I, L, E stems)
 * - Optical kerning calibrated across diagonal and straight pairs
 * - Exact logometric span: width matches the base of the symbol icon (404.8px)
 */
function buildVerticalAlignedWordmark(targetStartX = 197.6, targetTotalWidth = 404.8, baselineY = 775, fontSize = 96) {
  const scale = fontSize / 1000;
  
  // Calibrated stroke weight: 155 upm matches Plus Jakarta Sans ExtraBold stems
  const legW = 155;
  const outerW_A = 690;
  const topW = 175;
  const topX1 = (outerW_A - topW) / 2;
  const topX2 = topX1 + topW;
  const apexY = 745 - (legW * 0.98);

  const glyphA_w = outerW_A * scale;
  
  const glyphG = font.charToGlyph('G');
  const bbG = glyphG.getBoundingBox();
  const glyphG_w = (bbG.x2 - bbG.x1) * scale;
  
  const glyphI = font.charToGlyph('I');
  const bbI = glyphI.getBoundingBox();
  const glyphI_w = (bbI.x2 - bbI.x1) * scale;

  const glyphL = font.charToGlyph('L');
  const bbL = glyphL.getBoundingBox();
  const glyphL_w = (bbL.x2 - bbL.x1) * scale;

  const glyphE = font.charToGlyph('E');
  const bbE = glyphE.getBoundingBox();
  const glyphE_w = (bbE.x2 - bbE.x1) * scale;

  const totalGlyphsWidth = glyphA_w + glyphG_w + glyphI_w + glyphL_w + glyphE_w;
  const totalGapSpace = targetTotalWidth - totalGlyphsWidth;
  const baseGap = totalGapSpace / 4;

  // Optical Kerning offsets:
  // Diagonal 'A' creates a large triangular void at top right, so A-G needs tighter spacing.
  // Straight stems 'I' and 'L' need more breathing room so they don't look cramped.
  // Sum of offsets = -16 + 4 + 9 + 3 = 0, perfectly preserving targetTotalWidth (404.8px).
  const gapAG = baseGap - 16;
  const gapGI = baseGap + 4;
  const gapIL = baseGap + 9;
  const gapLE = baseGap + 3;

  let curX = targetStartX;
  const paths = [];

  // 1. A (Custom open architectural chevron matching Option C)
  const ptsA = [
    [0, 0],
    [topX1, 745],
    [topX2, 745],
    [outerW_A, 0],
    [outerW_A - legW, 0],
    [outerW_A / 2, apexY],
    [legW, 0]
  ];
  paths.push(coordsToSvgPath(ptsA, curX, baselineY, fontSize, 1000));
  curX += glyphA_w + gapAG;

  // 2. G
  const pG = glyphG.getPath(curX - (bbG.x1 * scale), baselineY, fontSize);
  paths.push(commandsToSvgPath(pG.commands));
  curX += glyphG_w + gapGI;

  // 3. I
  const pI = glyphI.getPath(curX - (bbI.x1 * scale), baselineY, fontSize);
  paths.push(commandsToSvgPath(pI.commands));
  curX += glyphI_w + gapIL;

  // 4. L
  const pL = glyphL.getPath(curX - (bbL.x1 * scale), baselineY, fontSize);
  paths.push(commandsToSvgPath(pL.commands));
  curX += glyphL_w + gapLE;

  // 5. E
  const pE = glyphE.getPath(curX - (bbE.x1 * scale), baselineY, fontSize);
  paths.push(commandsToSvgPath(pE.commands));

  return paths.join(' ');
}

function buildHorizontalWordmark(startX = 340, baselineY = 215, fontSize = 98, tracking = 38) {
  const scale = fontSize / 1000;
  let curX = startX;
  const paths = [];

  const legW = 155;
  const outerW_A = 690;
  const topW = 175;
  const topX1 = (outerW_A - topW) / 2;
  const topX2 = topX1 + topW;
  const apexY = 745 - (legW * 0.98);

  const ptsA = [
    [0, 0],
    [topX1, 745],
    [topX2, 745],
    [outerW_A, 0],
    [outerW_A - legW, 0],
    [outerW_A / 2, apexY],
    [legW, 0]
  ];
  paths.push(coordsToSvgPath(ptsA, curX, baselineY, fontSize, 1000));
  curX += (outerW_A * scale) + (tracking - 16);

  const glyphChars = ['G', 'I', 'L', 'E'];
  const trackingOffsets = [4, 9, 3, 0];

  glyphChars.forEach((ch, idx) => {
    const g = font.charToGlyph(ch);
    const bb = g.getBoundingBox();
    const glyphVisibleWidth = (bb.x2 - bb.x1) * scale;
    const xOffset = bb.x1 * scale;
    
    const p = g.getPath(curX - xOffset, baselineY, fontSize);
    paths.push(commandsToSvgPath(p.commands));

    const isLast = (idx === 3);
    curX += glyphVisibleWidth + (isLast ? 0 : tracking + trackingOffsets[idx]);
  });

  return paths.join(' ');
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

  const wordmarkPath = buildVerticalAlignedWordmark(197.6, 404.8, 775, 96);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 900" width="800" height="900">
  <!-- Símbolo Oficial Agile (Opção C Ampla) -->
  <g id="agile-symbol" transform="translate(400, 360) scale(0.92) translate(-400, -380)">
    ${getOptionCSymbol(colorMode)}
  </g>
  
  <!-- Tipografia Oficial AGILE com Kerning Óptico e Alinhamento à Base (404.8px) -->
  <path id="agile-wordmark" d="${wordmarkPath}" fill="${textColor}" />
</svg>`;
}

function buildHorizontalLockup(colorMode = 'color') {
  let textColor = NAVY;
  if (colorMode === 'dark' || colorMode === 'white') textColor = WHITE;
  else if (colorMode === 'mono') textColor = BLACK;

  const wordmarkPath = buildHorizontalWordmark(340, 215, 98, 42);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 360" width="1000" height="360">
  <!-- Símbolo Oficial Agile -->
  <g id="agile-symbol" transform="translate(170, 180) scale(0.48) translate(-400, -380)">
    ${getOptionCSymbol(colorMode)}
  </g>
  
  <!-- Tipografia Oficial AGILE com Kerning Óptico -->
  <path id="agile-wordmark" d="${wordmarkPath}" fill="${textColor}" />
</svg>`;
}

/**
 * Places glyphs along an arc as pure vector paths with exact trigonometry.
 */
function buildArcTextPaths(text, cx, cy, radius, fontSize, centerAngle, isTop = true, letterSpacingExtra = 0) {
  const scale = fontSize / 1000;
  const glyphs = [];
  let totalArcLength = 0;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === ' ') {
      glyphs.push({ ch, isSpace: true, width: 280 * scale });
      totalArcLength += (280 * scale) + (letterSpacingExtra * radius);
      continue;
    }
    const g = font.charToGlyph(ch);
    const bb = g.getBoundingBox();
    const w = (bb.x2 - bb.x1) * scale;
    const xOffset = bb.x1 * scale;
    glyphs.push({ ch, glyph: g, width: w, xOffset, isSpace: false });
    totalArcLength += w + (letterSpacingExtra * radius);
  }

  totalArcLength -= (letterSpacingExtra * radius);
  const totalTheta = totalArcLength / radius;

  let currentArc = 0;
  const paths = [];

  for (let i = 0; i < glyphs.length; i++) {
    const item = glyphs[i];
    if (item.isSpace) {
      currentArc += item.width + (letterSpacingExtra * radius);
      continue;
    }

    const glyphCenterArc = currentArc + (item.width / 2);
    const thetaRel = (glyphCenterArc / totalArcLength - 0.5) * totalTheta;
    const angle = isTop ? (centerAngle + thetaRel) : (centerAngle - thetaRel);

    const gx = cx + radius * Math.cos(angle);
    const gy = cy + radius * Math.sin(angle);

    const rotDeg = isTop ? (angle + Math.PI / 2) * (180 / Math.PI) : (angle - Math.PI / 2) * (180 / Math.PI);

    const p = item.glyph.getPath(-item.width / 2 - item.xOffset, 0, fontSize);
    const d = commandsToSvgPath(p.commands);

    paths.push(`<path d="${d}" transform="translate(${gx.toFixed(2)}, ${gy.toFixed(2)}) rotate(${rotDeg.toFixed(2)})" />`);

    currentArc += item.width + (letterSpacingExtra * radius);
  }

  return paths.join('\n');
}

/**
 * RECONSTRUCTED HIGH-IMPACT TECHNICAL STAMP (100% MATHEMATICAL & OPTICAL PERFECTION)
 * - Pure vector paths for both text arcs, eliminating browser font drift
 * - Centered central symbol (centroid 400, 390 -> 300, 300)
 * - Precision architectural double ring and cardinal diamond markers
 */
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

  const topTextPaths = buildArcTextPaths('AGILE', 300, 300, 222, 52, -Math.PI / 2, true, 0.05);
  const botTextPaths = buildArcTextPaths('ENGENHARIA CIVIL', 300, 300, 222, 24, Math.PI / 2, false, 0.025);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <!-- Precision Concentric Stamp Rings -->
  <circle cx="300" cy="300" r="284" fill="none" stroke="${mainColor}" stroke-width="5.5"/>
  <circle cx="300" cy="300" r="268" fill="none" stroke="${mainColor}" stroke-width="1.75"/>
  <circle cx="300" cy="300" r="168" fill="none" stroke="${mainColor}" stroke-width="2.5"/>
  
  <!-- Cardinal Architectural Markers (Exact East & West 0° and 180°) -->
  <g transform="translate(76, 300)">
    <polygon points="0,-7 7,0 0,7 -7,0" fill="${accentColor}"/>
    <circle cx="0" cy="0" r="2" fill="${WHITE}"/>
  </g>
  <g transform="translate(524, 300)">
    <polygon points="0,-7 7,0 0,7 -7,0" fill="${accentColor}"/>
    <circle cx="0" cy="0" r="2" fill="${WHITE}"/>
  </g>
  
  <!-- Top Arc: AGILE (Pure Vector Paths, Perfectly Centered) -->
  <g id="stamp-top-text" fill="${mainColor}">
    ${topTextPaths}
  </g>
  
  <!-- Bottom Arc: ENGENHARIA CIVIL (Pure Vector Paths, Upright & Perfectly Centered) -->
  <g id="stamp-bot-text" fill="${subColor}">
    ${botTextPaths}
  </g>
  
  <!-- Central Symbol (Centroid 400, 390 perfectly centered at 300, 300) -->
  <g transform="translate(300, 300) scale(0.42) translate(-400, -390)">
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

console.log('✅ SVGs atualizados com alinhamento na largura do ícone e novo carimbo imponente!');
