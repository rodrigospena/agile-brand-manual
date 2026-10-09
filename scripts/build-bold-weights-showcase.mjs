import fs from 'fs';
import opentype from 'opentype.js';

const fontPJS = opentype.parse(fs.readFileSync('PlusJakartaSans-ExtraBold.ttf').buffer);

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
    <polygon points="400,100 620,680 535,680 445,495 355,495 265,680 180,680" fill="#0B1B3D" />
    <polygon points="400,290 475,335 400,380 325,335" fill="#FF9D54" />
    <polygon points="325,335 400,380 400,680 325,680" fill="#FF6B00" />
    <polygon points="400,380 475,335 475,680 400,680" fill="#162C5B" />
    <polygon points="325,390 400,435 400,455 325,410" fill="#FFFFFF" />
    <polygon points="325,465 400,510 400,530 325,485" fill="#FFFFFF" />
    <polygon points="325,540 400,585 400,605 325,560" fill="#FFFFFF" />
    <polygon points="325,615 400,660 400,678 325,633" fill="#FFFFFF" />
  `;
}

function renderVertical(fontObj, fontSize, tracking, strokeW, name, badge, desc, isRec = false) {
  const dummy = buildFontVector(fontObj, fontSize, tracking, 0, 0);
  const startX = 400 - (dummy.totalWidth / 2);
  const baselineY = 765;
  const wordmark = buildFontVector(fontObj, fontSize, tracking, startX, baselineY);

  const strokeAttr = strokeW > 0 
    ? `stroke="#0B1B3D" stroke-width="${strokeW}" stroke-linejoin="round" stroke-miterlimit="2"` 
    : '';

  return `
    <div class="card ${isRec ? 'highlight' : ''}">
      <div class="card-header">
        <span class="badge ${isRec ? 'rec' : ''}">${badge}</span>
        <h3>${name}</h3>
      </div>
      <p class="desc">${desc}</p>
      <div class="preview-box">
        <svg viewBox="0 0 800 860" width="100%">
          <g transform="translate(400, 360) scale(0.92) translate(-400, -380)">
            ${getSymbolSvg()}
          </g>
          <path d="${wordmark.pathData}" fill="#0B1B3D" ${strokeAttr} />
        </svg>
      </div>
    </div>
  `;
}

function renderHorizontal(fontObj, fontSize, tracking, strokeW, name, badge) {
  const startX = 240;
  const baselineY = 162;
  const wordmark = buildFontVector(fontObj, fontSize, tracking, startX, baselineY);

  const strokeAttr = strokeW > 0 
    ? `stroke="#0B1B3D" stroke-width="${strokeW}" stroke-linejoin="round" stroke-miterlimit="2"` 
    : '';

  return `
    <div class="card">
      <div class="card-header">
        <span class="badge">${badge}</span>
        <h3>${name}</h3>
      </div>
      <div class="preview-box">
        <svg viewBox="0 0 800 236" width="100%">
          <g transform="translate(125, 118) scale(0.25) translate(-400, -390)">
            ${getSymbolSvg()}
          </g>
          <path d="${wordmark.pathData}" fill="#0B1B3D" ${strokeAttr} />
        </svg>
      </div>
    </div>
  `;
}

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Opções de Espessura (Plus Jakarta Sans) — Agile Engenharia</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #070F24; color: #fff; font-family: system-ui, -apple-system, sans-serif; padding: 40px 20px; }
    .container { max-width: 1300px; margin: 0 auto; }
    h1 { font-size: 2.3rem; color: #fff; margin-bottom: 8px; font-weight: 800; letter-spacing: -0.02em; }
    p.lead { color: #94A3B8; font-size: 1.1rem; margin-bottom: 30px; line-height: 1.6; max-width: 900px; }
    .section-title { font-size: 1.4rem; color: #38BDF8; margin: 40px 0 20px; font-weight: 700; border-bottom: 1px solid rgba(56,189,248,0.2); padding-bottom: 8px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 24px; margin-bottom: 30px; }
    .card { background: #0F1E3D; border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 22px; transition: transform 0.2s, border-color 0.2s; }
    .card:hover { border-color: rgba(255,107,0,0.5); }
    .card.highlight { border: 2px solid #FF7A1A; background: linear-gradient(180deg, #132752 0%, #0F1E3D 100%); }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; gap: 10px; }
    .card h3 { font-size: 1.15rem; color: #FFF; font-weight: 700; }
    .card .desc { font-size: 0.88rem; color: #94A3B8; margin-bottom: 16px; line-height: 1.4; min-height: 38px; }
    .badge { background: rgba(255,255,255,0.1); color: #E2E8F0; padding: 4px 10px; border-radius: 99px; font-size: 0.72rem; font-weight: 700; white-space: nowrap; }
    .badge.rec { background: rgba(255,107,0,0.2); color: #FF7A1A; border: 1px solid rgba(255,107,0,0.5); }
    .preview-box { background: #FFFFFF; border-radius: 10px; padding: 25px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 30px rgba(0,0,0,0.25); }
  </style>
</head>
<body>
  <div class="container">
    <h1>Plus Jakarta Sans — Variações de Espessura & Robustez</h1>
    <p class="lead">
      Baseado na Opção 1 aprovada, criamos 3 níveis de peso e espessura para você escolher exatamente a robustez ideal que equilibra com a força da torre do símbolo.
    </p>

    <div class="section-title">1. Lockup Vertical Principal</div>
    <div class="grid">
      ${renderVertical(fontPJS, 106, 22, 2.0, 'Plus Jakarta Sans — Heavy (ExtraBold +)', 'Opção A (Forte)', 'Ganho sutil de +15% de espessura nos traços. Preserva os detalhes finos internos.', false)}
      ${renderVertical(fontPJS, 106, 22, 3.8, 'Plus Jakarta Sans — Black / Ultra (Recomendada)', 'Opção B (Impacto Máximo)', 'Espessura robusta de peso Black 900. Equilibra perfeitamente a massa visual da torre e dos pilares.', true)}
      ${renderVertical(fontPJS, 106, 22, 5.5, 'Plus Jakarta Sans — Heavy Bold Max', 'Opção C (Mega Robusta)', 'Peso ultra encorpado com traços bem largos para visual imponente de grande construtora.', false)}
    </div>

    <div class="section-title">2. Lockup Horizontal Correspondente</div>
    <div class="grid">
      ${renderHorizontal(fontPJS, 92, 20, 1.8, 'Opção A — Horizontal', 'Heavy')}
      ${renderHorizontal(fontPJS, 92, 20, 3.2, 'Opção B — Horizontal', 'Black (Recomendada)')}
      ${renderHorizontal(fontPJS, 92, 20, 4.8, 'Opção C — Horizontal', 'Mega Robusta')}
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync('brand-manual/typography-showdown.html', html, 'utf8');
console.log('Saved updated brand-manual/typography-showdown.html');
