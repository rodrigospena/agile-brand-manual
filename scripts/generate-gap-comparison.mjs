import fs from 'fs';
import path from 'path';

const NAVY = '#0B1B3D';
const NAVY_LIGHT = '#162C5B';
const ORANGE = '#FF6B00';
const ORANGE_ROOF = '#FF9D54';
const ORANGE_LIGHT = '#FFA768';
const WHITE = '#FFFFFF';

function getSymbol(innerLeft, innerRight, crotchY = 510, crotchLeft = 360, crotchRight = 440, isDark = false) {
  const outerA = isDark ? WHITE : NAVY;
  const bLeft = ORANGE;
  const bRight = isDark ? ORANGE_LIGHT : NAVY_LIGHT;
  const roof = isDark ? WHITE : ORANGE_ROOF;
  const louver = isDark ? NAVY : WHITE;

  return `
    <!-- Outer "A" Frame with Chamfered Modern Peak -->
    <polygon points="400,100 620,680 ${innerRight},680 ${crotchRight},${crotchY} ${crotchLeft},${crotchY} ${innerLeft},680 180,680" fill="${outerA}" />
    
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

function buildLockup(innerLeft, innerRight, crotchY, crotchLeft, crotchRight, isDark = false) {
  const textColor = isDark ? WHITE : NAVY;
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
  
  <g transform="translate(400, 360) scale(0.92) translate(-400, -380)">
    ${getSymbol(innerLeft, innerRight, crotchY, crotchLeft, crotchRight, isDark)}
  </g>
  
  <text x="400" y="770" class="brand-title-official" fill="${textColor}">AGILE</text>
</svg>`;
}

const outDir = path.resolve('assets/logos/exports');

// Opção A: Atual (Gap 20px)
fs.writeFileSync(path.join(outDir, 'agile-preview-gap20.svg'), buildLockup(305, 495, 530, 365, 435, false));
fs.writeFileSync(path.join(outDir, 'agile-preview-gap20-dark.svg'), buildLockup(305, 495, 530, 365, 435, true));

// Opção B: Abertura Moderada Balanceada (Gap 45px) — RECOMENDADA
fs.writeFileSync(path.join(outDir, 'agile-preview-gap45.svg'), buildLockup(280, 520, 510, 360, 440, false));
fs.writeFileSync(path.join(outDir, 'agile-preview-gap45-dark.svg'), buildLockup(280, 520, 510, 360, 440, true));

// Opção C: Abertura Ampla (Gap 60px)
fs.writeFileSync(path.join(outDir, 'agile-preview-gap60.svg'), buildLockup(265, 535, 495, 355, 445, false));
fs.writeFileSync(path.join(outDir, 'agile-preview-gap60-dark.svg'), buildLockup(265, 535, 495, 355, 445, true));

console.log('Comparison SVGs created successfully!');
