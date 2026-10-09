import fs from 'fs';

// Refined letters with optical kerning
export function getRefinedLambda(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  
  // Compact architectural chevron: width = 84 (instead of 94)
  // Left leg: (37, 0) to (0, 100). Right leg: (47, 0) to (84, 100).
  // Inner apex: (42, 24) to (18, 100) and (66, 100).
  // Stroke: 20px
  const d = `M ${p(37, 0)} L ${p(47, 0)} L ${p(84, 100)} L ${p(65, 100)} L ${p(42, 24)} L ${p(19, 100)} L ${p(0, 100)} Z`;
  return { d, width: 84 * scale };
}

export function getRefinedG(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  
  // Refined circular geometric G
  const d = `M ${p(86, 24)} ` +
            `L ${p(71, 34)} ` +
            `C ${p(64, 21)} ${p(55, 18)} ${p(44, 18)} ` +
            `C ${p(28, 18)} ${p(18, 32)} ${p(18, 50)} ` +
            `C ${p(18, 68)} ${p(28, 82)} ${p(44, 82)} ` +
            `C ${p(58, 82)} ${p(68, 73)} ${p(69, 64)} ` +
            `L ${p(46, 64)} ` +
            `L ${p(46, 48)} ` +
            `L ${p(88, 48)} ` +
            `L ${p(88, 70)} ` +
            `C ${p(80, 88)} ${p(65, 100)} ${p(44, 100)} ` +
            `C ${p(19, 100)} ${p(0, 78)} ${p(0, 50)} ` +
            `C ${p(0, 22)} ${p(19, 0)} ${p(44, 0)} ` +
            `C ${p(64, 0)} ${p(79, 10)} ${p(86, 24)} Z`;
            
  return { d, width: 88 * scale };
}

export function getRefinedI(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  const stroke = 20;
  const d = `M ${p(0, 0)} L ${p(stroke, 0)} L ${p(stroke, 100)} L ${p(0, 100)} Z`;
  return { d, width: stroke * scale };
}

export function getRefinedL(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  const stroke = 20;
  const width = 72;
  const d = `M ${p(0, 0)} L ${p(stroke, 0)} L ${p(stroke, 80)} L ${p(width, 80)} L ${p(width, 100)} L ${p(0, 100)} Z`;
  return { d, width: width * scale };
}

export function getRefinedE(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  const stroke = 20;
  const width = 74;
  const midWidth = 62;
  const midY = 40;
  const midHeight = 20;
  
  const d = `M ${p(0, 0)} ` +
            `L ${p(width, 0)} L ${p(width, stroke)} ` +
            `L ${p(stroke, stroke)} L ${p(stroke, midY)} ` +
            `L ${p(midWidth, midY)} L ${p(midWidth, midY + midHeight)} ` +
            `L ${p(stroke, midY + midHeight)} L ${p(stroke, 100 - stroke)} ` +
            `L ${p(width, 100 - stroke)} L ${p(width, 100)} ` +
            `L ${p(0, 100)} Z`;
            
  return { d, width: width * scale };
}

export function buildRefinedWordmark(fontSize = 100, baseTracking = 24, startX = 0, baselineY = 100) {
  const scale = fontSize / 100;
  let curX = startX;
  const paths = [];

  // 1. Letter Λ
  const l1 = getRefinedLambda(curX, baselineY, scale);
  paths.push(l1.d);
  // OPTICAL KERNING: Λ-G needs tighter spacing because of diagonal leg
  const kerningLambdaG = (baseTracking - 12) * scale;
  curX += l1.width + kerningLambdaG;

  // 2. Letter G
  const l2 = getRefinedG(curX, baselineY, scale);
  paths.push(l2.d);
  curX += l2.width + baseTracking * scale;

  // 3. Letter I
  const l3 = getRefinedI(curX, baselineY, scale);
  paths.push(l3.d);
  curX += l3.width + baseTracking * scale;

  // 4. Letter L
  const l4 = getRefinedL(curX, baselineY, scale);
  paths.push(l4.d);
  curX += l4.width + baseTracking * scale;

  // 5. Letter E
  const l5 = getRefinedE(curX, baselineY, scale);
  paths.push(l5.d);
  curX += l5.width;

  return {
    pathData: paths.join(' '),
    totalWidth: curX - startX,
    capHeight: fontSize
  };
}

// Monochromatic Symbol Options:
// Style 1: Architectural Negative Space (Crisp white channel cutouts separating roof & facets)
export function getMonoSymbolStyle1(color = '#000000', bg = '#FFFFFF') {
  return `
    <!-- Outer "A" Frame -->
    <polygon points="400,100 620,680 535,680 445,495 355,495 265,680 180,680" fill="${color}" />
    
    <!-- White Isolation Halo Gap around building -->
    <polygon points="400,278 488,330 488,680 475,680 475,340 400,296 325,340 325,680 312,680 312,330" fill="${bg}" />
    
    <!-- Isometric Building Roof (White with crisp stroke) -->
    <polygon points="400,290 475,335 400,380 325,335" fill="${bg}" stroke="${color}" stroke-width="6" />
    
    <!-- Left Face (Solid Color with Louvers) -->
    <polygon points="325,335 400,380 400,680 325,680" fill="${color}" />
    
    <!-- Right Face (Architectural Hatching / Clean Shaded Facet) -->
    <polygon points="400,380 475,335 475,680 400,680" fill="${bg}" stroke="${color}" stroke-width="6" />
    
    <!-- Vertical dividing channel -->
    <line x1="400" y1="380" x2="400" y2="680" stroke="${bg}" stroke-width="6" />
    
    <!-- 4 Louver Slots (Clean background cutouts) -->
    <polygon points="325,390 400,435 400,455 325,410" fill="${bg}" />
    <polygon points="325,465 400,510 400,530 325,485" fill="${bg}" />
    <polygon points="325,540 400,585 400,605 325,560" fill="${bg}" />
    <polygon points="325,615 400,660 400,678 325,633" fill="${bg}" />
  `;
}

// Style 2: Pure Solid Contrast (Outer A solid, Building in Negative White, Louvers & Facet in Black)
export function getMonoSymbolStyle2(color = '#000000', bg = '#FFFFFF') {
  return `
    <!-- Outer "A" Frame -->
    <polygon points="400,100 620,680 535,680 445,495 355,495 265,680 180,680" fill="${color}" />
    
    <!-- Central Building Negative Space Cavity -->
    <polygon points="400,290 475,335 475,680 325,680 325,335" fill="${bg}" />
    
    <!-- Roof in Solid Black -->
    <polygon points="400,290 475,335 400,380 325,335" fill="${color}" />
    
    <!-- Right Shaded Face in Solid Black -->
    <polygon points="400,380 475,335 475,680 400,680" fill="${color}" />
    
    <!-- Left Face 4 Louver Bars in Solid Black -->
    <polygon points="325,390 400,435 400,455 325,410" fill="${color}" />
    <polygon points="325,465 400,510 400,530 325,485" fill="${color}" />
    <polygon points="325,540 400,585 400,605 325,560" fill="${color}" />
    <polygon points="325,615 400,660 400,678 325,633" fill="${color}" />
  `;
}

// Style 3: Architectural Greyscale Tonal (Deep Navy/Black, Slate Greys, White Louvers)
export function getMonoSymbolStyle3(colorMode = 'dark') {
  const isDark = colorMode === 'dark';
  const outer = isDark ? '#FFFFFF' : '#0B1B3D';
  const roof = isDark ? '#E2E8F0' : '#64748B';
  const bLeft = isDark ? '#CBD5E1' : '#1E293B';
  const bRight = isDark ? '#94A3B8' : '#475569';
  const louver = isDark ? '#0F172A' : '#FFFFFF';

  return `
    <!-- Outer "A" Frame -->
    <polygon points="400,100 620,680 535,680 445,495 355,495 265,680 180,680" fill="${outer}" />
    
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

console.log('--- Mono & Kerning functions loaded ---');
