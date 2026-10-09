import fs from 'fs';
import path from 'path';

/**
 * ARCHITECTURAL CUSTOM GEOMETRIC WORDMARK: "A G I L E"
 * 
 * - Letter 'A': Custom Architectural 'A' with subtle elevated crossbar matching engineering blueprints.
 * - Letter 'G': Pure circular geometric sans with crisp horizontal terminal.
 * - Letter 'I': Crisp vertical structural column.
 * - Letter 'L': Balanced geometric right angle.
 * - Letter 'E': Three balanced structural cantilever arms.
 */

// Custom Architectural 'A' with elevated crossbar
export function getArchitecturalA(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  
  // Clean modern architectural A: outer chamfer, elevated crossbar at y=70 (perpendicular stroke 21px)
  const d = `M ${p(36, 0)} L ${p(50, 0)} L ${p(88, 100)} L ${p(66, 100)} L ${p(57, 72)} L ${p(29, 72)} L ${p(20, 100)} L ${p(-2, 100)} Z ` +
            `M ${p(34, 56)} L ${p(52, 56)} L ${p(43, 24)} Z`;
  return { d, width: 88 * scale };
}

export function getLetterG(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  
  const d = `M ${p(88, 24)} L ${p(72, 34)} ` +
            `C ${p(65, 21)} ${p(56, 18)} ${p(45, 18)} ` +
            `C ${p(28, 18)} ${p(18, 32)} ${p(18, 50)} ` +
            `C ${p(18, 68)} ${p(28, 82)} ${p(45, 82)} ` +
            `C ${p(60, 82)} ${p(70, 73)} ${p(71, 63)} ` +
            `L ${p(47, 63)} L ${p(47, 46)} L ${p(90, 46)} L ${p(90, 71)} ` +
            `C ${p(82, 89)} ${p(66, 100)} ${p(45, 100)} ` +
            `C ${p(19, 100)} ${p(0, 78)} ${p(0, 50)} ` +
            `C ${p(0, 22)} ${p(19, 0)} ${p(45, 0)} ` +
            `C ${p(66, 0)} ${p(81, 10)} ${p(88, 24)} Z`;
            
  return { d, width: 90 * scale };
}

export function getLetterI(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  const stroke = 21;
  const d = `M ${p(0, 0)} L ${p(stroke, 0)} L ${p(stroke, 100)} L ${p(0, 100)} Z`;
  return { d, width: stroke * scale };
}

export function getLetterL(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  const stroke = 21;
  const width = 72;
  const d = `M ${p(0, 0)} L ${p(stroke, 0)} L ${p(stroke, 79)} L ${p(width, 79)} L ${p(width, 100)} L ${p(0, 100)} Z`;
  return { d, width: width * scale };
}

export function getLetterE(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  const stroke = 21;
  const width = 74;
  const midWidth = 62;
  const midY = 39.5;
  const midHeight = 21;
  
  const d = `M ${p(0, 0)} L ${p(width, 0)} L ${p(width, stroke)} ` +
            `L ${p(stroke, stroke)} L ${p(stroke, midY)} ` +
            `L ${p(midWidth, midY)} L ${p(midWidth, midY + midHeight)} ` +
            `L ${p(stroke, midY + midHeight)} L ${p(stroke, 100 - stroke)} ` +
            `L ${p(width, 100 - stroke)} L ${p(width, 100)} ` +
            `L ${p(0, 100)} Z`;
            
  return { d, width: width * scale };
}

export function buildArchitecturalWordmark(fontSize = 100, baseTracking = 22, startX = 0, baselineY = 100) {
  const scale = fontSize / 100;
  let curX = startX;
  const paths = [];

  // 1. Letter A (Architectural with elevated crossbar)
  const l1 = getArchitecturalA(curX, baselineY, scale);
  paths.push(l1.d);
  curX += l1.width + (baseTracking - 8) * scale;

  // 2. Letter G
  const l2 = getLetterG(curX, baselineY, scale);
  paths.push(l2.d);
  curX += l2.width + baseTracking * scale;

  // 3. Letter I
  const l3 = getLetterI(curX, baselineY, scale);
  paths.push(l3.d);
  curX += l3.width + baseTracking * scale;

  // 4. Letter L
  const l4 = getLetterL(curX, baselineY, scale);
  paths.push(l4.d);
  curX += l4.width + baseTracking * scale;

  // 5. Letter E
  const l5 = getLetterE(curX, baselineY, scale);
  paths.push(l5.d);
  curX += l5.width;

  return {
    pathData: paths.join(' '),
    totalWidth: curX - startX,
    capHeight: fontSize
  };
}

// Option C Símbolo Oficial (60px Wide Base Gap)
export function getOptionCSymbol(colorMode = 'color') {
  const NAVY = '#0B1B3D';
  const NAVY_LIGHT = '#162C5B';
  const ORANGE = '#FF6B00';
  const ORANGE_ROOF = '#FF9D54';
  const ORANGE_LIGHT = '#FFA768';
  const WHITE = '#FFFFFF';

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
    bLeft = '#CBD5E1';
    bRight = '#94A3B8';
    roof = '#E2E8F0';
    louver = '#0B1B3D';
  } else if (colorMode === 'mono' || colorMode === 'mono-black') {
    // Architectural Tonal Slate Monochrome
    outerA = '#0B1B3D';
    roof = '#64748B';
    bLeft = '#1E293B';
    bRight = '#475569';
    louver = WHITE;
  } else if (colorMode === 'mono-dark') {
    outerA = WHITE;
    roof = '#E2E8F0';
    bLeft = '#CBD5E1';
    bRight = '#94A3B8';
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
export function buildVerticalLockup(colorMode = 'color') {
  const NAVY = '#0B1B3D';
  const WHITE = '#FFFFFF';

  let textColor = NAVY;
  if (colorMode === 'dark' || colorMode === 'white' || colorMode === 'mono-dark') textColor = WHITE;
  else if (colorMode === 'mono' || colorMode === 'mono-black') textColor = NAVY;

  const wordmark = buildArchitecturalWordmark(98, 22, 0, 0);
  const startX = 400 - (wordmark.totalWidth / 2);
  const baselineY = 765;
  const centeredWordmark = buildArchitecturalWordmark(98, 22, startX, baselineY);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 860" width="800" height="860">
  <g id="agile-symbol" transform="translate(400, 360) scale(0.92) translate(-400, -380)">
    ${getOptionCSymbol(colorMode)}
  </g>
  <path d="${centeredWordmark.pathData}" fill="${textColor}" />
</svg>`;
}

// 2. HORIZONTAL LOCKUP (780 x 236)
export function buildHorizontalLockup(colorMode = 'color') {
  const NAVY = '#0B1B3D';
  const WHITE = '#FFFFFF';

  let textColor = NAVY;
  if (colorMode === 'dark' || colorMode === 'white' || colorMode === 'mono-dark') textColor = WHITE;
  else if (colorMode === 'mono' || colorMode === 'mono-black') textColor = NAVY;

  const symbolScale = 0.25;
  const symbolCenterX = 125;
  const symbolCenterY = 118;

  const wordmarkStartX = 235;
  const wordmarkBaselineY = 160;
  const wordmark = buildArchitecturalWordmark(88, 22, wordmarkStartX, wordmarkBaselineY);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 236" width="780" height="236">
  <g id="agile-symbol" transform="translate(${symbolCenterX}, ${symbolCenterY}) scale(${symbolScale}) translate(-400, -390)">
    ${getOptionCSymbol(colorMode)}
  </g>
  <path d="${wordmark.pathData}" fill="${textColor}" />
</svg>`;
}

// 3. SÍMBOLO ISOLADO (800 x 800)
export function buildSymbolSvg(colorMode = 'color', width = 800, height = 800) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="${width}" height="${height}">
  <g id="agile-symbol">
    ${getOptionCSymbol(colorMode)}
  </g>
</svg>`;
}

// 4. CARIMBO TÉCNICO
export function buildStampSvg(colorMode = 'color') {
  const NAVY = '#0B1B3D';
  const ORANGE = '#FF6B00';
  const WHITE = '#FFFFFF';

  let mainColor = NAVY;
  let accentColor = ORANGE;
  if (colorMode === 'dark' || colorMode === 'white' || colorMode === 'mono-dark') {
    mainColor = WHITE;
    accentColor = ORANGE;
  }
  if (colorMode === 'mono' || colorMode === 'mono-black') {
    mainColor = NAVY;
    accentColor = '#475569';
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <path id="cTop" d="M 95,300 A 205,205 0 0,1 505,300" fill="none"/>
    <path id="cBot" d="M 505,300 A 205,205 0 0,1 95,300" fill="none"/>
  </defs>
  <circle cx="300" cy="300" r="280" fill="none" stroke="${mainColor}" stroke-width="5"/>
  <circle cx="300" cy="300" r="262" fill="none" stroke="${mainColor}" stroke-width="2" stroke-dasharray="8 6"/>
  <circle cx="300" cy="300" r="175" fill="none" stroke="${mainColor}" stroke-width="2.5"/>
  <text font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="34px" letter-spacing="0.28em" fill="${mainColor}">
    <textPath href="#cTop" startOffset="50%" text-anchor="middle">AGILE</textPath>
  </text>
  <text font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="20px" letter-spacing="0.24em" fill="${accentColor}">
    <textPath href="#cBot" startOffset="50%" text-anchor="middle">ENGENHARIA CIVIL</textPath>
  </text>
  <circle cx="95" cy="300" r="6" fill="${accentColor}"/>
  <circle cx="505" cy="300" r="6" fill="${accentColor}"/>
  <g transform="translate(300, 305) scale(0.32) translate(-400, -380)">
    ${getOptionCSymbol(colorMode)}
  </g>
</svg>`;
}

// Generate & write all SVG assets
const exportList = {
  // 1. Primary Vertical
  'agile-logo-primary.svg': buildVerticalLockup('color'),
  'agile-logo-primary-dark.svg': buildVerticalLockup('dark'),
  'agile-logo-primary-white.svg': buildVerticalLockup('white'),
  'agile-logo-primary-mono.svg': buildVerticalLockup('mono'),

  // 2. Horizontal
  'agile-logo-horizontal.svg': buildHorizontalLockup('color'),
  'agile-logo-horizontal-dark.svg': buildHorizontalLockup('dark'),
  'agile-logo-horizontal-white.svg': buildHorizontalLockup('white'),
  'agile-logo-horizontal-mono.svg': buildHorizontalLockup('mono'),

  // 3. Isolated Symbol
  'agile-symbol.svg': buildSymbolSvg('color'),
  'agile-symbol-dark.svg': buildSymbolSvg('dark'),
  'agile-symbol-white.svg': buildSymbolSvg('white'),
  'agile-symbol-mono.svg': buildSymbolSvg('mono'),

  // 4. Favicon & Stamp
  'agile-favicon.svg': buildSymbolSvg('color', 32, 32),
  'agile-technical-stamp.svg': buildStampSvg('color'),
  'agile-technical-stamp-mono.svg': buildStampSvg('mono')
};

const targetDirs = [
  path.resolve('assets/logos/exports'),
  path.resolve('assets/logos/official'),
  path.resolve('brand-manual/assets/logos/exports'),
  path.resolve('brand-manual/assets/logos/official'),
  path.resolve('brand-manual/downloads/svg')
];

targetDirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  Object.entries(exportList).forEach(([fileName, content]) => {
    fs.writeFileSync(path.join(d, fileName), content, 'utf8');
  });
});

console.log('--- All SVGs generated with Approved Architectural Typography (Option 2)! ---');
