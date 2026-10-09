import fs from 'fs';
import path from 'path';

const NAVY = '#102A43';
const NAVY_DEEP = '#071A33';
const NAVY_FACET = '#1A365D';
const ORANGE = '#FF7A1A';
const ORANGE_LIGHT = '#FF9B4A';
const SLATE = '#667085';
const WHITE = '#FFFFFF';
const BLACK = '#000000';

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

// -------------------------------------------------------------
// SÍMBOLO V2 OFICIAL: FITA CONTÍNUA DE EVOLUÇÃO (CAMINHO 2 REFINADO)
// -------------------------------------------------------------
function getSymbolSvgSnippet(mode = 'color') {
  let outerA = NAVY;
  let ribbon = ORANGE;
  let ribbonCap = ORANGE_LIGHT;
  let ribbonFacet = NAVY_FACET;
  let slotFill = WHITE;

  if (mode === 'dark') {
    outerA = WHITE;
    ribbon = ORANGE;
    ribbonCap = ORANGE_LIGHT;
    ribbonFacet = '#2B4C7E';
    slotFill = NAVY;
  } else if (mode === 'white') {
    outerA = WHITE;
    ribbon = WHITE;
    ribbonCap = '#E2E8F0';
    ribbonFacet = '#CBD5E1';
    slotFill = NAVY_DEEP;
  } else if (mode === 'mono') {
    outerA = BLACK;
    ribbon = BLACK;
    ribbonCap = '#94A3B8';
    ribbonFacet = '#475569';
    slotFill = WHITE;
  }

  return `
    <!-- Hastes Estruturais do "A" (Esbeltas, topo chanfrado moderno, vão interno amplo) -->
    <polygon points="400,105 615,680 535,680 445,445 355,445 265,680 185,680" fill="${outerA}" />
    
    <!-- Topo Isométrico 100% Integrado à Fita Ascendente (Sem bloco flutuante) -->
    <polygon points="400,285 470,332 400,378 330,332" fill="${ribbonCap}" />
    
    <!-- Coluna / Fita Contínua Ascendente de Evolução -->
    <polygon points="330,332 400,378 400,680 330,680" fill="${ribbon}" />
    <polygon points="400,378 470,332 470,680 400,680" fill="${ribbonFacet}" />
    
    <!-- Ranhura Negativa de Precisão Arquitetônica (Respiro dinâmico do travessão) -->
    <polygon points="330,490 400,532 400,548 330,506" fill="${slotFill}" />
    <polygon points="400,532 470,490 470,506 400,548" fill="${slotFill}" />
  `;
}

// -------------------------------------------------------------
// GERADORES DE ARQUIVOS
// -------------------------------------------------------------

// 1. Símbolo Isolado
function createSymbolFile(mode = 'color') {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <g id="agile-symbol-v2">
    ${getSymbolSvgSnippet(mode)}
  </g>
</svg>`;
}

// 2. Lockup Primário Vertical
function createPrimaryLockup(mode = 'color') {
  let textColor = NAVY;
  let tagColor = SLATE;
  if (mode === 'dark' || mode === 'white') {
    textColor = WHITE;
    tagColor = '#94A3B8';
  } else if (mode === 'mono') {
    textColor = BLACK;
    tagColor = '#475569';
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 900" width="800" height="900">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&amp;display=swap');
      .brand-title-v2 {
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        font-weight: 800;
        font-size: 92px;
        letter-spacing: 0.09em;
        text-anchor: middle;
      }
      .brand-tagline-v2 {
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        font-weight: 600;
        font-size: 20px;
        letter-spacing: 0.24em;
        text-anchor: middle;
      }
    </style>
  </defs>
  
  <!-- Símbolo Oficial V2 -->
  <g id="agile-symbol" transform="translate(400, 360) scale(0.90) translate(-400, -380)">
    ${getSymbolSvgSnippet(mode)}
  </g>
  
  <!-- Tipografia Refinada V2 -->
  <text x="400" y="755" class="brand-title-v2" fill="${textColor}">AGILE</text>
  <text x="400" y="800" class="brand-tagline-v2" fill="${tagColor}">ENGENHARIA E REGULARIZAÇÃO</text>
</svg>`;
}

// 3. Lockup Horizontal
function createHorizontalLockup(mode = 'color') {
  let textColor = NAVY;
  let tagColor = SLATE;
  if (mode === 'dark' || mode === 'white') {
    textColor = WHITE;
    tagColor = '#94A3B8';
  } else if (mode === 'mono') {
    textColor = BLACK;
    tagColor = '#475569';
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 240" width="820" height="240">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&amp;display=swap');
      .brand-title-h-v2 {
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        font-weight: 800;
        font-size: 78px;
        letter-spacing: 0.08em;
      }
      .brand-tagline-h-v2 {
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        font-weight: 600;
        font-size: 17px;
        letter-spacing: 0.22em;
      }
    </style>
  </defs>
  
  <!-- Símbolo Redimensionado -->
  <g id="agile-symbol-h" transform="translate(130, 115) scale(0.25) translate(-400, -390)">
    ${getSymbolSvgSnippet(mode)}
  </g>
  
  <!-- Naming & Tagline -->
  <text x="250" y="122" class="brand-title-h-v2" fill="${textColor}">AGILE</text>
  <text x="253" y="158" class="brand-tagline-h-v2" fill="${tagColor}">ENGENHARIA E REGULARIZAÇÃO</text>
</svg>`;
}

// 4. Favicon
function createFaviconFile() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="112" fill="${NAVY_DEEP}"/>
  <g transform="translate(256, 256) scale(0.68) translate(-400, -385)">
    ${getSymbolSvgSnippet('dark')}
  </g>
</svg>`;
}

// 5. Carimbo Técnico
function createTechnicalStampFile(mode = 'color') {
  let border = mode === 'mono' ? BLACK : NAVY;
  let textPrimary = mode === 'mono' ? BLACK : NAVY;
  let textMuted = mode === 'mono' ? '#475569' : SLATE;
  let accent = mode === 'mono' ? BLACK : ORANGE;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 280" width="650" height="280">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&amp;display=swap');
      .stamp-text { font-family: 'Plus Jakarta Sans', monospace, sans-serif; }
    </style>
  </defs>
  
  <!-- Borda Dupla Padrão ABNT / CREA -->
  <rect x="4" y="4" width="642" height="272" rx="6" fill="#FFFFFF" stroke="${border}" stroke-width="3"/>
  <rect x="10" y="10" width="630" height="260" rx="3" fill="none" stroke="${border}" stroke-width="1" stroke-dasharray="6 3"/>
  
  <!-- Divisória Vertical -->
  <line x1="200" y1="10" x2="200" y2="270" stroke="${border}" stroke-width="1.5"/>
  
  <!-- Bloco Símbolo -->
  <g transform="translate(105, 115) scale(0.24) translate(-400, -380)">
    ${getSymbolSvgSnippet(mode)}
  </g>
  <text x="105" y="210" class="stamp-text" font-weight="800" font-size="20" letter-spacing="0.1em" text-anchor="middle" fill="${textPrimary}">AGILE</text>
  <text x="105" y="230" class="stamp-text" font-weight="600" font-size="10" letter-spacing="0.15em" text-anchor="middle" fill="${accent}">ENGENHARIA</text>
  
  <!-- Bloco Dados Técnicos -->
  <text x="220" y="45" class="stamp-text" font-weight="800" font-size="14" fill="${textPrimary}">AGILE ENGENHARIA &amp; REGULARIZAÇÃO LTDA.</text>
  <line x1="220" y1="55" x2="620" y2="55" stroke="${border}" stroke-width="0.75"/>
  
  <text x="220" y="80" class="stamp-text" font-weight="700" font-size="11" fill="${textMuted}">PROJETO / FINALIDADE:</text>
  <text x="365" y="80" class="stamp-text" font-weight="700" font-size="11" fill="${textPrimary}">LEGALIZAÇÃO &amp; HABITE-SE</text>
  
  <text x="220" y="110" class="stamp-text" font-weight="700" font-size="11" fill="${textMuted}">RESPONSÁVEL TÉCNICO:</text>
  <text x="365" y="110" class="stamp-text" font-weight="700" font-size="11" fill="${textPrimary}">ENG. CIVIL / CREA-SP</text>
  
  <text x="220" y="140" class="stamp-text" font-weight="700" font-size="11" fill="${textMuted}">REGISTRO CREA / ART:</text>
  <text x="365" y="140" class="stamp-text" font-weight="700" font-size="11" fill="${textPrimary}">AUTENTICAÇÃO DIGITAL</text>
  
  <line x1="220" y1="160" x2="620" y2="160" stroke="${border}" stroke-width="0.75"/>
  
  <text x="220" y="185" class="stamp-text" font-weight="700" font-size="10" fill="${textMuted}">ETAPA: REGULARIZAÇÃO PATRIMONIAL</text>
  <text x="480" y="185" class="stamp-text" font-weight="700" font-size="10" fill="${accent}">APROVAÇÃO ÁGIL</text>
  
  <rect x="220" y="205" width="400" height="45" rx="4" fill="${mode === 'mono' ? '#F1F5F9' : '#F0F4FC'}" stroke="${border}" stroke-width="0.75"/>
  <text x="420" y="232" class="stamp-text" font-weight="700" font-size="11" letter-spacing="0.08em" text-anchor="middle" fill="${textPrimary}">AUTORIZADO PARA USO EM PRANCHA TÉCNICA</text>
</svg>`;
}

// -------------------------------------------------------------
// GRAVAÇÃO DE ARQUIVOS
// -------------------------------------------------------------
const targets = [
  'assets/logos/v2',
  'brand-manual-v2/assets/logos/official',
  'brand-manual-v2/assets/logos/exports',
  'brand-manual-v2/downloads/svg'
];

targets.forEach(dir => ensureDir(dir));

const files = {
  'agile-symbol.svg': createSymbolFile('color'),
  'agile-symbol-dark.svg': createSymbolFile('dark'),
  'agile-symbol-white.svg': createSymbolFile('white'),
  'agile-symbol-mono.svg': createSymbolFile('mono'),
  'agile-logo-primary.svg': createPrimaryLockup('color'),
  'agile-logo-primary-dark.svg': createPrimaryLockup('dark'),
  'agile-logo-primary-white.svg': createPrimaryLockup('white'),
  'agile-logo-primary-mono.svg': createPrimaryLockup('mono'),
  'agile-logo-horizontal.svg': createHorizontalLockup('color'),
  'agile-logo-horizontal-dark.svg': createHorizontalLockup('dark'),
  'agile-logo-horizontal-white.svg': createHorizontalLockup('white'),
  'agile-logo-horizontal-mono.svg': createHorizontalLockup('mono'),
  'agile-favicon.svg': createFaviconFile(),
  'agile-technical-stamp.svg': createTechnicalStampFile('color'),
  'agile-technical-stamp-mono.svg': createTechnicalStampFile('mono')
};

for (const dir of targets) {
  for (const [filename, content] of Object.entries(files)) {
    const fullPath = path.join(dir, filename);
    fs.writeFileSync(fullPath, content.trim(), 'utf-8');
  }
}

console.log(`✅ ${Object.keys(files).length} arquivos vetoriais V2 gerados com sucesso para:`);
targets.forEach(t => console.log(`   - ${t}`));
