import fs from 'fs';
import opentype from 'opentype.js';

const fontFiles = {
  urbanistBlack: 'Urbanist-Black.ttf',
  urbanistBold: 'Urbanist-Bold.ttf',
  outfitBlack: 'Outfit-Black.ttf',
  sora: 'Sora-ExtraBold.ttf',
  spaceGrotesk: 'SpaceGrotesk.ttf',
  syne: 'Syne-ExtraBold.ttf',
  manrope: 'Manrope-Bold.ttf'
};

const loadedFonts = {};
for (const [key, file] of Object.entries(fontFiles)) {
  if (fs.existsSync(file)) {
    try {
      loadedFonts[key] = opentype.parse(fs.readFileSync(file).buffer);
      console.log('Loaded font:', key);
    } catch (e) {
      console.error('Error loading font:', key, e.message);
    }
  }
}

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

function renderFontCard(fontObj, fontSize, tracking, strokeW, keyId, title, badge, desc, isRec = false) {
  const dummy = buildFontVector(fontObj, fontSize, tracking, 0, 0);
  const startX = 400 - (dummy.totalWidth / 2);
  const baselineY = 765;
  const wordmark = buildFontVector(fontObj, fontSize, tracking, startX, baselineY);

  // Horizontal version
  const hStartX = 240;
  const hBaselineY = 162;
  const hWordmark = buildFontVector(fontObj, fontSize * 0.86, tracking * 0.85, hStartX, hBaselineY);

  const strokeAttr = strokeW > 0 
    ? `stroke="#0B1B3D" stroke-width="${strokeW}" stroke-linejoin="round" stroke-miterlimit="2"` 
    : '';

  return `
    <div class="card ${isRec ? 'highlight' : ''}" id="${keyId}">
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

const fontCards = [];

if (loadedFonts.urbanistBlack) {
  fontCards.push(renderFontCard(
    loadedFonts.urbanistBlack, 108, 22, 0,
    'opt-urbanist',
    'Opção A: Urbanist Black (⭐ Altamente Recomendada)',
    'Opção A — Elegância & Engenharia High-End',
    'Geometria afiada e sofisticada, proporções amplas e peso monumental. Usada por estúdios de arquitetura e grandes incorporadoras.',
    true
  ));
}

if (loadedFonts.outfitBlack) {
  fontCards.push(renderFontCard(
    loadedFonts.outfitBlack, 110, 20, 0,
    'opt-outfit',
    'Opção B: Outfit Black',
    'Opção B — Geométrica Pura & Robusta',
    'Círculos perfeitos (Bauhaus), traço encorpado de alto impacto e legibilidade rápida.',
    false
  ));
}

if (loadedFonts.sora) {
  fontCards.push(renderFontCard(
    loadedFonts.sora, 104, 20, 0,
    'opt-sora',
    'Opção C: Sora ExtraBold',
    'Opção C — Tech & Arquitetura Moderna',
    'Cortes angulares exclusivos com transições quadradas suaves. Sensação de tecnologia e precisão de engenharia.',
    false
  ));
}

if (loadedFonts.syne) {
  fontCards.push(renderFontCard(
    loadedFonts.syne, 106, 18, 0,
    'opt-syne',
    'Opção D: Syne ExtraBold',
    'Opção D — Escultural & Monumental',
    'Letras largas com presença dramática de monumentos e fachadas contemporâneas.',
    false
  ));
}

if (loadedFonts.spaceGrotesk) {
  fontCards.push(renderFontCard(
    loadedFonts.spaceGrotesk, 104, 20, 1.5,
    'opt-space',
    'Opção E: Space Grotesk Bold+',
    'Opção E — Estrutural & Industrial',
    'Estilo neo-grotesco geométrico com postura firme e rígida, remetendo a projetos de infraestrutura.',
    false
  ));
}

if (loadedFonts.manrope) {
  fontCards.push(renderFontCard(
    loadedFonts.manrope, 106, 20, 1.8,
    'opt-manrope',
    'Opção F: Manrope Heavy',
    'Opção F — Corporativa Solene',
    'Design sóbrio, equilibrado e direto ao ponto, com peso forte e máxima seriedade institucional.',
    false
  ));
}

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Galeria de Tipografia Definitiva — Agile Engenharia</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #070F24; color: #fff; font-family: system-ui, -apple-system, sans-serif; padding: 40px 20px; }
    .container { max-width: 1300px; margin: 0 auto; }
    h1 { font-size: 2.3rem; color: #fff; margin-bottom: 8px; font-weight: 800; letter-spacing: -0.02em; }
    p.lead { color: #94A3B8; font-size: 1.1rem; margin-bottom: 30px; line-height: 1.6; max-width: 950px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(390px, 1fr)); gap: 26px; margin-bottom: 40px; }
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
    <h1>Showcase de Tipografias de Alto Padrão (Substituindo a PJS)</h1>
    <p class="lead">
      Reunimos 6 fontes internacionais consagradas em marcas de <strong>engenharia civil, arquitetura e grandes incorporadoras</strong>, todas renderizadas em vetor de alta precisão com peso encorpado e proporções marcantes:
    </p>

    <div class="grid">
      ${fontCards.join('\n')}
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync('brand-manual/typography-showdown.html', html, 'utf8');
console.log('Saved updated brand-manual/typography-showdown.html with full font gallery');
