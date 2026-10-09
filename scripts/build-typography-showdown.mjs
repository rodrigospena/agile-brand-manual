import fs from 'fs';
import opentype from 'opentype.js';

// Load fonts
const fontPJS = opentype.parse(fs.readFileSync('PlusJakartaSans.ttf').buffer);
const fontOutfit = opentype.parse(fs.readFileSync('Outfit.ttf').buffer);
const fontMont = opentype.parse(fs.readFileSync('Montserrat-ExtraBold.ttf').buffer);

function getCleanGlyphPath(glyph, x, y, size) {
  const p = glyph.getPath(x, y, size);
  p.commands.forEach(cmd => {
    ['x', 'y', 'x1', 'y1', 'x2', 'y2'].forEach(k => {
      if (typeof cmd[k] === 'number' && isNaN(cmd[k])) cmd[k] = 0;
    });
  });
  return p.toPathData(2);
}

function buildFontVector(fontObj, fontSize, tracking, startX = 0, baselineY = 0) {
  const text = 'AGILE';
  let currentX = startX;
  const pathParts = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const glyph = fontObj.charToGlyph(char);
    const pData = getCleanGlyphPath(glyph, currentX, baselineY, fontSize);
    pathParts.push(pData);
    const isLast = (i === text.length - 1);
    currentX += (glyph.advanceWidth / fontObj.unitsPerEm) * fontSize + (isLast ? 0 : tracking);
  }

  return {
    pathData: pathParts.join(' '),
    totalWidth: currentX - startX,
    capHeight: (fontObj.tables.os2.sCapHeight / fontObj.unitsPerEm) * fontSize
  };
}

function getSymbolSvg() {
  return `
    <!-- Outer "A" Frame -->
    <polygon points="400,100 620,680 535,680 445,495 355,495 265,680 180,680" fill="#0B1B3D" />
    <!-- Central Building -->
    <polygon points="400,290 475,335 400,380 325,335" fill="#FF9D54" />
    <polygon points="325,335 400,380 400,680 325,680" fill="#FF6B00" />
    <polygon points="400,380 475,335 475,680 400,680" fill="#162C5B" />
    <!-- Louvers -->
    <polygon points="325,390 400,435 400,455 325,410" fill="#FFFFFF" />
    <polygon points="325,465 400,510 400,530 325,485" fill="#FFFFFF" />
    <polygon points="325,540 400,585 400,605 325,560" fill="#FFFFFF" />
    <polygon points="325,615 400,660 400,678 325,633" fill="#FFFFFF" />
  `;
}

function renderVertical(fontObj, fontSize, tracking, name, badge) {
  const dummy = buildFontVector(fontObj, fontSize, tracking, 0, 0);
  const startX = 400 - (dummy.totalWidth / 2);
  const baselineY = 765;
  const wordmark = buildFontVector(fontObj, fontSize, tracking, startX, baselineY);

  return `
    <div class="card">
      <div class="card-header">
        <span class="badge">${badge}</span>
        <h3>${name}</h3>
      </div>
      <div class="preview-box">
        <svg viewBox="0 0 800 860" width="100%">
          <g id="agile-symbol" transform="translate(400, 360) scale(0.92) translate(-400, -380)">
            ${getSymbolSvg()}
          </g>
          <path d="${wordmark.pathData}" fill="#0B1B3D" />
        </svg>
      </div>
    </div>
  `;
}

function renderHorizontal(fontObj, fontSize, tracking, name) {
  const startX = 240;
  const baselineY = 162;
  const wordmark = buildFontVector(fontObj, fontSize, tracking, startX, baselineY);

  return `
    <div class="card">
      <div class="card-header">
        <h3>${name} — Horizontal</h3>
      </div>
      <div class="preview-box">
        <svg viewBox="0 0 800 236" width="100%">
          <g id="agile-symbol" transform="translate(125, 118) scale(0.25) translate(-400, -390)">
            ${getSymbolSvg()}
          </g>
          <path d="${wordmark.pathData}" fill="#0B1B3D" />
        </svg>
      </div>
    </div>
  `;
}

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Seleção Tipográfica Oficial — Agile Engenharia</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #070F24; color: #fff; font-family: system-ui, -apple-system, sans-serif; padding: 40px 20px; }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { font-size: 2.2rem; color: #fff; margin-bottom: 8px; }
    p.lead { color: #94A3B8; font-size: 1.05rem; margin-bottom: 30px; line-height: 1.5; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; margin-bottom: 40px; }
    .card { background: #0F1E3D; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 22px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
    .card h3 { font-size: 1.1rem; color: #FF9D54; }
    .badge { background: rgba(255,107,0,0.2); color: #FF7A1A; border: 1px solid rgba(255,107,0,0.4); padding: 4px 10px; border-radius: 99px; font-size: 0.75rem; font-weight: 700; }
    .badge.rec { background: rgba(56,189,248,0.2); color: #38BDF8; border-color: rgba(56,189,248,0.4); }
    .preview-box { background: #FFFFFF; border-radius: 8px; padding: 25px; display: flex; align-items: center; justify-content: center; min-height: 250px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
  </style>
</head>
<body>
  <div class="container">
    <h1>Tipografia Definitiva: Fontes Profissionais para a Agile</h1>
    <p class="lead">
      Comparamos abaixo as melhores tipografias geométricas internacionais renderizadas em vetor puro (sem distorções manuais), com proporções milimétricas e kerning perfeito.
    </p>

    <h2 style="font-size: 1.4rem; color: #38BDF8; margin-bottom: 16px;">1. Lockup Vertical Principal</h2>
    <div class="grid">
      ${renderVertical(fontPJS, 105, 24, "Plus Jakarta Sans (ExtraBold)", "Opção 1 — Recomendada (Moderna & Corporativa)")}
      ${renderVertical(fontOutfit, 108, 22, "Outfit (Bold)", "Opção 2 — Geométrica Pura")}
      ${renderVertical(fontMont, 106, 22, "Montserrat (ExtraBold)", "Opção 3 — Clássica Robusta")}
    </div>

    <h2 style="font-size: 1.4rem; color: #38BDF8; margin-bottom: 16px;">2. Lockup Horizontal</h2>
    <div class="grid">
      ${renderHorizontal(fontPJS, 92, 22, "Plus Jakarta Sans")}
      ${renderHorizontal(fontOutfit, 94, 20, "Outfit")}
      ${renderHorizontal(fontMont, 92, 20, "Montserrat")}
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync('brand-manual/typography-showdown.html', html, 'utf8');
console.log('Saved brand-manual/typography-showdown.html');
