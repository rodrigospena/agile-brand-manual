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
 * MASTER SOLID RING CERTIFICATION SEAL (Selo Chancelado Oficial)
 */
function buildMasterSeal(colorMode = 'color') {
  let ringFill = NAVY;
  let textTopFill = WHITE;
  let textBotFill = ORANGE_LIGHT;
  let coreFill = WHITE;
  let strokeAccent = ORANGE;
  let markerFill = ORANGE;

  if (colorMode === 'dark') {
    ringFill = NAVY_LIGHT;
    textTopFill = WHITE;
    textBotFill = ORANGE;
    coreFill = NAVY;
    strokeAccent = ORANGE;
    markerFill = ORANGE;
  } else if (colorMode === 'mono') {
    ringFill = '#0B1B3D';
    textTopFill = WHITE;
    textBotFill = '#CBD5E1';
    coreFill = WHITE;
    strokeAccent = '#0B1B3D';
    markerFill = WHITE;
  }

  // Ring: outer radius 280, inner radius 195 (width = 85px)
  // Text sits in the center of the ring at radius 237.5
  const topText = buildArcTextPaths('AGILE', 300, 300, 237, 50, -Math.PI / 2, true, 0.08);
  const botText = buildArcTextPaths('ENGENHARIA CIVIL', 300, 300, 237, 24, Math.PI / 2, false, 0.04);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <!-- Technical Hatching Pattern for Inner Core -->
    <pattern id="sealGrid" width="16" height="16" patternUnits="userSpaceOnUse">
      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(11,27,61,0.05)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Outer Solid Precision Ring Band -->
  <circle cx="300" cy="300" r="286" fill="${ringFill}"/>
  <circle cx="300" cy="300" r="286" fill="none" stroke="${strokeAccent}" stroke-width="4"/>
  <circle cx="300" cy="300" r="278" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>

  <!-- Inner Core Disc -->
  <circle cx="300" cy="300" r="190" fill="${coreFill}"/>
  <circle cx="300" cy="300" r="190" fill="url(#sealGrid)"/>
  <circle cx="300" cy="300" r="190" fill="none" stroke="${strokeAccent}" stroke-width="3"/>
  <circle cx="300" cy="300" r="182" fill="none" stroke="${NAVY}" stroke-width="1" stroke-dasharray="3,3"/>

  <!-- Left/Right Architectural Diamond Badges on the Solid Ring -->
  <g transform="translate(68, 300)">
    <polygon points="0,-12 4,-4 12,0 4,4 0,12 -4,4 -12,0 -4,-4" fill="${markerFill}"/>
    <circle cx="0" cy="0" r="2" fill="${WHITE}"/>
  </g>
  <g transform="translate(532, 300)">
    <polygon points="0,-12 4,-4 12,0 4,4 0,12 -4,4 -12,0 -4,-4" fill="${markerFill}"/>
    <circle cx="0" cy="0" r="2" fill="${WHITE}"/>
  </g>

  <!-- Top Arc: AGILE in Solid Band -->
  <g fill="${textTopFill}">
    ${topText}
  </g>

  <!-- Bottom Arc: ENGENHARIA CIVIL in Solid Band -->
  <g fill="${textBotFill}">
    ${botText}
  </g>

  <!-- Central Agile Option C Symbol (Centroid 400, 390 perfectly centered at 300, 300, scale 0.44) -->
  <g transform="translate(300, 300) scale(0.44) translate(-400, -390)">
    ${getOptionCSymbol(colorMode)}
  </g>
</svg>`;
}

fs.writeFileSync('stamp-master-seal.svg', buildMasterSeal('color'));
execSync(`npx -y @resvg/resvg-js-cli --fit-width 600 "stamp-master-seal.svg" "stamp-master-seal.png"`);
console.log('Master Solid Seal rendered!');
