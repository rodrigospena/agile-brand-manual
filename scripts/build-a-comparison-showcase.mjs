import fs from 'fs';
import opentype from 'opentype.js';

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

// Convert font-unit coordinates to SVG path string for custom glyph
function coordsToSvgPath(points, startX, baselineY, fontSize, unitsPerEm) {
  const scale = fontSize / unitsPerEm;
  return points.map((pt, idx) => {
    const px = (startX + pt[0] * scale).toFixed(2);
    const py = (baselineY - pt[1] * scale).toFixed(2);
    return `${idx === 0 ? 'M' : 'L'} ${px} ${py}`;
  }).join(' ') + ' Z';
}

function buildWordmarkWithCustomA(fontObj, fontSize, tracking, startX, baselineY, customAType = 'standard') {
  const text = 'AGILE';
  let currentX = startX;
  const pathParts = [];
  const upe = fontObj.unitsPerEm;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const glyph = fontObj.charToGlyph(char);
    const isLast = (i === text.length - 1);

    if (char === 'A' && customAType !== 'standard') {
      if (customAType === 'open-exact') {
        // Exact mathematical open A derived from Plus Jakarta Sans stroke geometry
        const pts = [
          [11, 0],
          [283, 745],
          [369, 745],
          [641, 0],
          [557, 0],
          [326, 632.7],
          [95, 0]
        ];
        pathParts.push(coordsToSvgPath(pts, currentX, baselineY, fontSize, upe));
      } else if (customAType === 'open-sharp-apex') {
        // Pointed top (apex) matching building symbol angle, but with exact leg thickness
        const pts = [
          [11, 0],
          [326, 755],
          [641, 0],
          [557, 0],
          [326, 615],
          [95, 0]
        ];
        pathParts.push(coordsToSvgPath(pts, currentX, baselineY, fontSize, upe));
      } else if (customAType === 'open-bold-compensated') {
        // Extra 12% optical stroke thickness to eliminate any visual thinning illusion
        const pts = [
          [0, 0],
          [275, 745],
          [377, 745],
          [652, 0],
          [548, 0],
          [326, 608],
          [104, 0]
        ];
        pathParts.push(coordsToSvgPath(pts, currentX, baselineY, fontSize, upe));
      }
      currentX += (glyph.advanceWidth / upe) * fontSize + tracking;
    } else {
      const pData = getCleanGlyphPath(glyph, currentX, baselineY, fontSize);
      pathParts.push(pData);
      currentX += (glyph.advanceWidth / upe) * fontSize + (isLast ? 0 : tracking);
    }
  }

  return {
    pathData: pathParts.join(' '),
    totalWidth: currentX - startX
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

function renderVerticalCard(fontObj, fontSize, tracking, customAType, title, badge, desc, isRec = false) {
  const dummy = buildWordmarkWithCustomA(fontObj, fontSize, tracking, 0, 0, customAType);
  const startX = 400 - (dummy.totalWidth / 2);
  const baselineY = 765;
  const wordmark = buildWordmarkWithCustomA(fontObj, fontSize, tracking, startX, baselineY, customAType);

  return `
    <div class="card ${isRec ? 'highlight' : ''}">
      <div class="card-header">
        <span class="badge ${isRec ? 'rec' : ''}">${badge}</span>
        <h3>${title}</h3>
      </div>
      <p class="desc">${desc}</p>
      <div class="preview-box">
        <svg viewBox="0 0 800 860" width="100%">
          <g transform="translate(400, 360) scale(0.92) translate(-400, -380)">
            ${getSymbolSvg()}
          </g>
          <path d="${wordmark.pathData}" fill="#0B1B3D" />
        </svg>
      </div>
    </div>
  `;
}

function renderHorizontalCard(fontObj, fontSize, tracking, customAType, title, badge) {
  const startX = 240;
  const baselineY = 162;
  const wordmark = buildWordmarkWithCustomA(fontObj, fontSize, tracking, startX, baselineY, customAType);

  return `
    <div class="card">
      <div class="card-header">
        <span class="badge">${badge}</span>
        <h3>${title}</h3>
      </div>
      <div class="preview-box">
        <svg viewBox="0 0 800 236" width="100%">
          <g transform="translate(125, 118) scale(0.25) translate(-400, -390)">
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ajuste Fino de Tipografia & Letra 'A' — Agile Engenharia</title>
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
    
    .zoom-box { background: #0A1633; border: 1px solid #1E293B; border-radius: 12px; padding: 24px; margin-top: 30px; }
    .zoom-title { font-size: 1.2rem; color: #FF9D54; margin-bottom: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Ajuste de Tipografia & Estilo da Letra 'A'</h1>
    <p class="lead">
      Analisamos o feedback: quando o 'A' é feito manualmente com traço reto, cria-se uma <strong>ilusão óptica de afinamento</strong> ou desconexão com o restante da palavra. Abaixo você pode comparar 4 soluções milimétricas para escolher a mais harmônica e sólida.
    </p>

    <div class="section-title">1. Variações do 'A' no Lockup Vertical Principal</div>
    <div class="grid">
      ${renderVerticalCard(fontPJS, 105, 24, 'standard', 'Opção 1: Fonte Natural Completa', 'Opção 1 (Máxima Solidez)', 'Tipografia Plus Jakarta Sans ExtraBold pura com traço horizontal clássico. Peso 100% equilibrado e leitura instantânea.', true)}
      ${renderVerticalCard(fontPJS, 105, 24, 'open-bold-compensated', 'Opção 2: Letra A Aberta (Compensada)', 'Opção 2 (Recomendada p/ A aberto)', 'Sem traço horizontal, mas com espessura reforçada (+12%) e topo plano para casar perfeitamente com a robustez do GILE.', false)}
      ${renderVerticalCard(fontPJS, 105, 24, 'open-exact', 'Opção 3: Letra A Aberta (Geometria Exata)', 'Opção 3 (Geometria 1:1)', 'Sem traço horizontal, extraído direto da matriz de curvas do font file sem alterar espessura.', false)}
      ${renderVerticalCard(fontOutfit, 108, 22, 'standard', 'Opção 4: Outfit Geométrica Pura', 'Opção 4 (Alternativa)', 'Fonte Outfit Bold com traço natural. Círculos perfeitos e estética contemporânea de tecnologia e engenharia.', false)}
    </div>

    <div class="section-title">2. Lockups Horizontais Correspondentes</div>
    <div class="grid">
      ${renderHorizontalCard(fontPJS, 92, 22, 'standard', 'Opção 1 — Horizontal', 'Plus Jakarta (Natural)')}
      ${renderHorizontalCard(fontPJS, 92, 22, 'open-bold-compensated', 'Opção 2 — Horizontal', 'Plus Jakarta (A Aberto Compensado)')}
      ${renderHorizontalCard(fontOutfit, 94, 20, 'standard', 'Opção 4 — Horizontal', 'Outfit Bold (Natural)')}
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync('brand-manual/typography-showdown.html', html, 'utf8');
console.log('Saved brand-manual/typography-showdown.html');
