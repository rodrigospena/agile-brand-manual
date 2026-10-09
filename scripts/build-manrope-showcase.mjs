import fs from 'fs';
import opentype from 'opentype.js';

const fontManrope = opentype.parse(fs.readFileSync('Manrope-Bold.ttf').buffer);

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

function renderCard(fontObj, fontSize, tracking, strokeW, title, badge, desc, isRec = false) {
  const dummy = buildFontVector(fontObj, fontSize, tracking, 0, 0);
  const startX = 400 - (dummy.totalWidth / 2);
  const baselineY = 765;
  const wordmark = buildFontVector(fontObj, fontSize, tracking, startX, baselineY);

  const hStartX = 240;
  const hBaselineY = 162;
  const hWordmark = buildFontVector(fontObj, fontSize * 0.86, tracking * 0.85, hStartX, hBaselineY);

  const strokeAttr = strokeW > 0 
    ? `stroke="#0B1B3D" stroke-width="${strokeW}" stroke-linejoin="round" stroke-miterlimit="2"` 
    : '';

  return `
    <div class="card ${isRec ? 'highlight' : ''}">
      <div class="card-header">
        <span class="badge ${isRec ? 'rec' : ''}">${badge}</span>
        <h3>${title}</h3>
      </div>
      <p class="desc">${desc}</p>
      
      <div class="preview-box">
        <div class="preview-label">Vertical Lockup</div>
        <svg viewBox="0 0 800 860" width="100%">
          <g transform="translate(400, 360) scale(0.92) translate(-400, -380)">
            ${getSymbolSvg()}
          </g>
          <path d="${wordmark.pathData}" fill="#0B1B3D" ${strokeAttr} />
        </svg>
      </div>

      <div class="preview-box" style="margin-top: 14px; min-height: 120px; padding: 12px 20px;">
        <div class="preview-label">Horizontal Lockup</div>
        <svg viewBox="0 0 800 236" width="100%">
          <g transform="translate(125, 118) scale(0.25) translate(-400, -390)">
            ${getSymbolSvg()}
          </g>
          <path d="${hWordmark.pathData}" fill="#0B1B3D" ${strokeAttr} />
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
  <title>Manrope — Teste de Espessura & Robustez — Agile Engenharia</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #070F24; color: #fff; font-family: system-ui, -apple-system, sans-serif; padding: 40px 20px; }
    .container { max-width: 1350px; margin: 0 auto; }
    h1 { font-size: 2.3rem; color: #fff; margin-bottom: 8px; font-weight: 800; letter-spacing: -0.02em; }
    p.lead { color: #94A3B8; font-size: 1.1rem; margin-bottom: 30px; line-height: 1.6; max-width: 950px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 24px; margin-bottom: 40px; }
    .card { background: #0F1E3D; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; transition: transform 0.2s, border-color 0.2s; position: relative; }
    .card:hover { border-color: rgba(255,107,0,0.5); }
    .card.highlight { border: 2px solid #FF7A1A; background: linear-gradient(180deg, #132752 0%, #0F1E3D 100%); }
    .card-header { display: flex; flex-direction: column; gap: 8px; margin-bottom: 8px; }
    .card h3 { font-size: 1.2rem; color: #FFF; font-weight: 700; }
    .card .desc { font-size: 0.88rem; color: #94A3B8; margin-bottom: 16px; line-height: 1.45; min-height: 42px; }
    .badge { align-self: flex-start; background: rgba(255,255,255,0.1); color: #E2E8F0; padding: 4px 10px; border-radius: 99px; font-size: 0.72rem; font-weight: 700; }
    .badge.rec { background: rgba(255,107,0,0.25); color: #FF7A1A; border: 1px solid rgba(255,107,0,0.5); }
    .preview-box { background: #FFFFFF; border-radius: 10px; padding: 22px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 8px 30px rgba(0,0,0,0.25); position: relative; }
    .preview-label { align-self: flex-start; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 800; color: #64748B; margin-bottom: 6px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Manrope — Variações de Espessura & Peso</h1>
    <p class="lead">
      Aplicamos a família <strong>Manrope</strong> com 3 níveis graduais de espessura para você avaliar a harmonia exata com a força e proporção do símbolo da Agile.
    </p>

    <div class="grid">
      ${renderCard(fontManrope, 106, 22, 2.5, 'Nível 1: Manrope ExtraBold (+2.5px)', 'Opção 1 (Forte)', 'Ganho de +20% de espessura nos traços. Linhas firmes, elegantes e altamente legíveis.', false)}
      ${renderCard(fontManrope, 106, 22, 4.5, 'Nível 2: Manrope Black / Heavy (+4.5px)', 'Opção 2 (⭐ Equilíbrio Ideal)', 'Peso Black encorpado. Casa perfeitamente com a largura dos pilares e a massa do símbolo.', true)}
      ${renderCard(fontManrope, 106, 22, 6.8, 'Nível 3: Manrope Ultra Black (+6.8px)', 'Opção 3 (Mega Robusta)', 'Peso ultra denso com forte presença de engenharia pesada e infraestrutura.', false)}
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync('brand-manual/typography-showdown.html', html, 'utf8');
console.log('Saved brand-manual/typography-showdown.html with Manrope Heavy variations');
