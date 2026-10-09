import fs from 'fs';
import path from 'path';
import opentype from 'opentype.js';

const fontPath = path.resolve('PlusJakartaSans-ExtraBold.ttf');
const font = opentype.parse(fs.readFileSync(fontPath).buffer);

const NAVY = '#0B1B3D';
const NAVY_LIGHT = '#162C5B';
const ORANGE = '#FF6B00';
const ORANGE_ROOF = '#FF9D54';
const ORANGE_LIGHT = '#FFA768';
const WHITE = '#FFFFFF';

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
 * Places glyphs along an arc as pure vector paths.
 * @param {string} text 
 * @param {number} cx Center X
 * @param {number} cy Center Y
 * @param {number} radius Radius of baseline
 * @param {number} fontSize Font size in px
 * @param {number} centerAngle Center angle in radians (-PI/2 for top, PI/2 for bottom)
 * @param {boolean} isTop True if text curves along the top (outward baseline), False if along bottom (upright)
 * @param {number} letterSpacingExtra Extra radian spacing between letters
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

  // Remove trailing spacing from total arc
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
    // Relative theta from start of word:
    const thetaRel = (glyphCenterArc / totalArcLength - 0.5) * totalTheta;
    // For top arc, increasing theta moves left to right (from -PI to 0).
    // For bottom arc, decreasing theta moves left to right (from PI to 0).
    const angle = isTop ? (centerAngle + thetaRel) : (centerAngle - thetaRel);

    // Position on circle:
    const gx = cx + radius * Math.cos(angle);
    const gy = cy + radius * Math.sin(angle);

    // Rotation angle in degrees:
    // For top arc: text is upright when angle=-PI/2, rotation = (angle + PI/2)
    // For bottom arc: text is upright when angle=PI/2, rotation = (angle - PI/2)
    const rotDeg = isTop ? (angle + Math.PI / 2) * (180 / Math.PI) : (angle - Math.PI / 2) * (180 / Math.PI);

    // In local space, baseline is at (0, 0), glyph is centered at X = 0:
    const p = item.glyph.getPath(-item.width / 2 - item.xOffset, 0, fontSize);
    const d = commandsToSvgPath(p.commands);

    paths.push(`<path d="${d}" transform="translate(${gx.toFixed(2)}, ${gy.toFixed(2)}) rotate(${rotDeg.toFixed(2)})" />`);

    currentArc += item.width + (letterSpacingExtra * radius);
  }

  return paths.join('\n');
}

function buildTestStamp() {
  const topTextPaths = buildArcTextPaths('AGILE', 300, 300, 222, 52, -Math.PI / 2, true, 0.05);
  const botTextPaths = buildArcTextPaths('ENGENHARIA CIVIL', 300, 300, 222, 24, Math.PI / 2, false, 0.025);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <!-- Precision Concentric Stamp Rings -->
  <circle cx="300" cy="300" r="284" fill="none" stroke="${NAVY}" stroke-width="5.5"/>
  <circle cx="300" cy="300" r="268" fill="none" stroke="${NAVY}" stroke-width="1.75"/>
  <circle cx="300" cy="300" r="168" fill="none" stroke="${NAVY}" stroke-width="2.5"/>
  
  <!-- Cardinal Architectural Markers (Exact East & West 0° and 180°) -->
  <g transform="translate(76, 300)">
    <polygon points="0,-7 7,0 0,7 -7,0" fill="${ORANGE}"/>
    <circle cx="0" cy="0" r="2" fill="${WHITE}"/>
  </g>
  <g transform="translate(524, 300)">
    <polygon points="0,-7 7,0 0,7 -7,0" fill="${ORANGE}"/>
    <circle cx="0" cy="0" r="2" fill="${WHITE}"/>
  </g>
  
  <!-- Top Arc: AGILE (Pure Vector Paths, Perfectly Centered) -->
  <g id="stamp-top-text" fill="${NAVY}">
    ${topTextPaths}
  </g>
  
  <!-- Bottom Arc: ENGENHARIA CIVIL (Pure Vector Paths, Upright & Perfectly Centered) -->
  <g id="stamp-bot-text" fill="${ORANGE}">
    ${botTextPaths}
  </g>
  
  <!-- Central Symbol (Centroid 400, 390 perfectly centered at 300, 300) -->
  <g transform="translate(300, 300) scale(0.42) translate(-400, -390)">
    ${getOptionCSymbol('color')}
  </g>
</svg>`;
}

import { execSync } from 'child_process';

const svg = buildTestStamp();
fs.writeFileSync('brand-manual/assets/logos/exports/agile-technical-stamp.svg', svg);

execSync(`npx -y @resvg/resvg-js-cli --fit-width 600 "brand-manual/assets/logos/exports/agile-technical-stamp.svg" "test-stamp-preview.png"`);
console.log('Stamp generated & rendered successfully!');
