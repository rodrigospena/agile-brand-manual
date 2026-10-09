import fs from 'fs';
import path from 'path';
import opentype from 'opentype.js';
import { execSync } from 'child_process';

const fontPath = path.resolve('PlusJakartaSans-ExtraBold.ttf');
const font = opentype.parse(fs.readFileSync(fontPath).buffer);

const NAVY = '#0B1B3D';
const NAVY_LIGHT = '#162C5B';
const ORANGE = '#FF6B00';
const ORANGE_ROOF = '#FF9D54';
const ORANGE_LIGHT = '#FFA768';
const WHITE = '#FFFFFF';
const SLATE = '#64748B';

function commandsToSvgPath(commands) {
  return commands.map(cmd => {
    const f = (val) => Number(val).toFixed(2);
    if (cmd.type === 'M') return 'M ' + f(cmd.x) + ' ' + f(cmd.y);
    if (cmd.type === 'L') return 'L ' + f(cmd.x) + ' ' + f(cmd.y);
    if (cmd.type === 'Q') return 'Q ' + f(cmd.x1) + ' ' + f(cmd.y1) + ' ' + f(cmd.x) + ' ' + f(cmd.y);
    if (cmd.type === 'C') return 'C ' + f(cmd.x1) + ' ' + f(cmd.y1) + ' ' + f(cmd.x2) + ' ' + f(cmd.y2) + ' ' + f(cmd.x) + ' ' + f(cmd.y);
    if (cmd.type === 'Z') return 'Z';
    return '';
  }).join(' ');
}

function getOptionCSymbol(colorMode = 'color') {
  let outerA = NAVY;
  let bLeft = ORANGE;
  let bRight = NAVY_LIGHT;
  let roof = ORANGE_ROOF;
  let louver = WHITE;

  if (colorMode === 'dark' || colorMode === 'white') {
    outerA = WHITE;
    bLeft = ORANGE;
    bRight = ORANGE_LIGHT;
    roof = ORANGE_ROOF;
    louver = NAVY;
  } else if (colorMode === 'mono') {
    outerA = '#000000';
    bLeft = '#000000';
    bRight = '#475569';
    roof = '#94A3B8';
    louver = WHITE;
  }

  return `
    <polygon points="400,100 620,680 535,680 445,495 355,495 265,680 180,680" fill="${outerA}" />
    <polygon points="400,290 475,335 400,380 325,335" fill="${roof}" />
    <polygon points="325,335 400,380 400,680 325,680" fill="${bLeft}" />
    <polygon points="400,380 475,335 475,680 400,680" fill="${bRight}" />
    <polygon points="325,390 400,435 400,455 325,410" fill="${louver}" />
    <polygon points="325,465 400,510 400,530 325,485" fill="${louver}" />
    <polygon points="325,540 400,585 400,605 325,560" fill="${louver}" />
    <polygon points="325,615 400,660 400,678 325,633" fill="${louver}" />
  `;
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
 * GENERATE 3 DISTINCT STAMP CONCEPTS TO FIND THE ULTIMATE MASTERPIECE
 */

// 1. CONCEPT 1: ARCHITECTURAL COMPASS SEAL (Selo Topográfico & Bússola Técnica)
function buildStampConcept1(colorMode = 'color') {
  const topText = buildArcTextPaths('AGILE', 300, 300, 218, 48, -Math.PI / 2, true, 0.06);
  const botText = buildArcTextPaths('ENGENHARIA CIVIL', 300, 300, 218, 22, Math.PI / 2, false, 0.03);

  // Generate 72 precision perimeter tick marks (theodolite dial)
  const ticks = [];
  for (let i = 0; i < 72; i++) {
    const angle = (i * 5) * (Math.PI / 180);
    const isMajor = (i % 6 === 0);
    const r1 = 282;
    const r2 = isMajor ? 266 : 273;
    const x1 = (300 + r1 * Math.cos(angle)).toFixed(2);
    const y1 = (300 + r1 * Math.sin(angle)).toFixed(2);
    const x2 = (300 + r2 * Math.cos(angle)).toFixed(2);
    const y2 = (300 + r2 * Math.sin(angle)).toFixed(2);
    const sw = isMajor ? 2.5 : 1;
    ticks.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${NAVY}" stroke-width="${sw}" />`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <!-- Dial Notches & Outer Ring -->
  <circle cx="300" cy="300" r="286" fill="none" stroke="${NAVY}" stroke-width="6"/>
  <circle cx="300" cy="300" r="264" fill="none" stroke="${NAVY}" stroke-width="1.5"/>
  <g>${ticks.join('\n')}</g>

  <!-- Typography Tracks -->
  <circle cx="300" cy="300" r="172" fill="none" stroke="${NAVY}" stroke-width="2.5"/>
  <circle cx="300" cy="300" r="164" fill="none" stroke="${NAVY}" stroke-width="1"/>

  <!-- Texts -->
  <g fill="${NAVY}">${topText}</g>
  <g fill="${ORANGE}">${botText}</g>

  <!-- Cardinal Elements -->
  <g transform="translate(68, 300)"><polygon points="0,-8 8,0 0,8 -8,0" fill="${ORANGE}"/><circle cx="0" cy="0" r="2.5" fill="${WHITE}"/></g>
  <g transform="translate(532, 300)"><polygon points="0,-8 8,0 0,8 -8,0" fill="${ORANGE}"/><circle cx="0" cy="0" r="2.5" fill="${WHITE}"/></g>

  <!-- Central Symbol -->
  <g transform="translate(300, 300) scale(0.40) translate(-400, -390)">
    ${getOptionCSymbol('color')}
  </g>
</svg>`;
}

// 2. CONCEPT 2: PREMIUM EMBOSSED OCTAGON / BADGE SEAL (Selo Nobre de Chancelaria & Regularização)
function buildStampConcept2(colorMode = 'color') {
  const topText = buildArcTextPaths('AGILE ENGENHARIA', 300, 300, 224, 34, -Math.PI / 2, true, 0.04);
  const botText = buildArcTextPaths('PROJETOS • LAUDOS • REGULARIZAÇÃO', 300, 300, 224, 18, Math.PI / 2, false, 0.025);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <!-- Bold Outer Ring -->
  <circle cx="300" cy="300" r="286" fill="none" stroke="${NAVY}" stroke-width="7"/>
  <circle cx="300" cy="300" r="274" fill="none" stroke="${ORANGE}" stroke-width="2.5"/>
  <circle cx="300" cy="300" r="176" fill="none" stroke="${NAVY}" stroke-width="3"/>
  <circle cx="300" cy="300" r="168" fill="none" stroke="${ORANGE}" stroke-width="1.5"/>

  <!-- Texts -->
  <g fill="${NAVY}">${topText}</g>
  <g fill="${ORANGE}">${botText}</g>

  <!-- Stars / Diamond accents -->
  <g transform="translate(68, 300)">
    <polygon points="0,-10 3,-3 10,0 3,3 0,10 -3,3 -10,0 -3,-3" fill="${ORANGE}"/>
  </g>
  <g transform="translate(532, 300)">
    <polygon points="0,-10 3,-3 10,0 3,3 0,10 -3,3 -10,0 -3,-3" fill="${ORANGE}"/>
  </g>

  <!-- Central Symbol -->
  <g transform="translate(300, 300) scale(0.42) translate(-400, -390)">
    ${getOptionCSymbol('color')}
  </g>
</svg>`;
}

// 3. CONCEPT 3: MODERN BLUEPRINT SOLID BADGE (Carimbo Moderno com Faixa e Geometria Pura)
function buildStampConcept3(colorMode = 'color') {
  const topText = buildArcTextPaths('AGILE', 300, 300, 218, 56, -Math.PI / 2, true, 0.07);
  const botText = buildArcTextPaths('ENGENHARIA CIVIL', 300, 300, 218, 25, Math.PI / 2, false, 0.035);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <!-- Outer Triple Precision Frame -->
  <circle cx="300" cy="300" r="288" fill="none" stroke="${NAVY}" stroke-width="8"/>
  <circle cx="300" cy="300" r="272" fill="none" stroke="${NAVY}" stroke-width="2"/>
  <circle cx="300" cy="300" r="162" fill="none" stroke="${NAVY}" stroke-width="3.5"/>
  <circle cx="300" cy="300" r="154" fill="none" stroke="${ORANGE}" stroke-width="1.5"/>

  <!-- Texts -->
  <g fill="${NAVY}">${topText}</g>
  <g fill="${ORANGE}">${botText}</g>

  <!-- Left/Right Precision Wings -->
  <g transform="translate(70, 300)">
    <rect x="-18" y="-2" width="36" height="4" fill="${NAVY}"/>
    <circle cx="0" cy="0" r="5" fill="${ORANGE}"/>
  </g>
  <g transform="translate(530, 300)">
    <rect x="-18" y="-2" width="36" height="4" fill="${NAVY}"/>
    <circle cx="0" cy="0" r="5" fill="${ORANGE}"/>
  </g>

  <!-- Central Symbol with optimal scale -->
  <g transform="translate(300, 300) scale(0.38) translate(-400, -390)">
    ${getOptionCSymbol('color')}
  </g>
</svg>`;
}

fs.writeFileSync('stamp-c1.svg', buildStampConcept1());
fs.writeFileSync('stamp-c2.svg', buildStampConcept2());
fs.writeFileSync('stamp-c3.svg', buildStampConcept3());

execSync(`npx -y @resvg/resvg-js-cli --fit-width 600 "stamp-c1.svg" "stamp-c1.png"`);
execSync(`npx -y @resvg/resvg-js-cli --fit-width 600 "stamp-c2.svg" "stamp-c2.png"`);
execSync(`npx -y @resvg/resvg-js-cli --fit-width 600 "stamp-c3.svg" "stamp-c3.png"`);

console.log('All 3 stamp concepts rendered!');
