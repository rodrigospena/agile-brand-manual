import fs from 'fs';
import path from 'path';

console.log('====================================================');
console.log('🔍 INICIANDO AUDITORIA GERAL PRÉ-ENTREGA AO CLIENTE');
console.log('====================================================\n');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = [];
let warnings = [];

function check(desc, condition, errorMsg = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✅ [PASS] ${desc}`);
  } else {
    failedChecks.push({ desc, errorMsg });
    console.log(`  ❌ [FAIL] ${desc} — ${errorMsg}`);
  }
}

// -------------------------------------------------------------------
// 1. AUDITORIA DE ATIVOS VETORIAIS (SVG)
// -------------------------------------------------------------------
console.log('📁 1. Checagem de Arquivos Vetoriais Oficiais (.SVG)...');

const expectedSvgs = [
  'agile-logo-primary.svg',
  'agile-logo-primary-dark.svg',
  'agile-logo-primary-white.svg',
  'agile-logo-primary-mono.svg',
  'agile-logo-horizontal.svg',
  'agile-logo-horizontal-dark.svg',
  'agile-logo-horizontal-white.svg',
  'agile-logo-horizontal-mono.svg',
  'agile-symbol.svg',
  'agile-symbol-dark.svg',
  'agile-symbol-white.svg',
  'agile-symbol-mono.svg',
  'agile-favicon.svg',
  'agile-technical-stamp.svg',
  'agile-technical-stamp-mono.svg',
  'agile-technical-stamp-dark.svg'
];

const svgLocations = [
  'assets/logos/official',
  'assets/logos/exports',
  'brand-manual/assets/logos/official',
  'brand-manual/assets/logos/exports',
  'brand-manual/downloads/svg'
];

svgLocations.forEach(loc => {
  expectedSvgs.forEach(svg => {
    const fullPath = path.resolve(loc, svg);
    const exists = fs.existsSync(fullPath);
    const size = exists ? fs.statSync(fullPath).size : 0;
    check(`SVG existe e válido: ${loc}/${svg}`, exists && size > 100, `Tamanho: ${size} bytes`);
    
    if (exists) {
      const content = fs.readFileSync(fullPath, 'utf8');
      check(`XML / viewBox válido em ${loc}/${svg}`, content.includes('<svg') && content.includes('viewBox'), 'Falta tag <svg> ou viewBox');
    }
  });
});

// -------------------------------------------------------------------
// 2. AUDITORIA DE IMAGENS EM ALTA RESOLUÇÃO (PNG)
// -------------------------------------------------------------------
console.log('\n📁 2. Checagem de Imagens PNG Transparentes (512px, 1024px, 2048px)...');

const pngBases = [
  'agile-logo-primary',
  'agile-logo-primary-dark',
  'agile-logo-primary-white',
  'agile-logo-primary-mono',
  'agile-logo-horizontal',
  'agile-logo-horizontal-dark',
  'agile-logo-horizontal-white',
  'agile-logo-horizontal-mono',
  'agile-symbol',
  'agile-symbol-dark',
  'agile-symbol-white',
  'agile-symbol-mono',
  'agile-technical-stamp',
  'agile-technical-stamp-mono'
];

const pngDir = path.resolve('brand-manual/downloads/png');
pngBases.forEach(base => {
  ['512px', '1024px', '2048px'].forEach(res => {
    const pngPath = path.join(pngDir, `${base}-${res}.png`);
    const exists = fs.existsSync(pngPath);
    const size = exists ? fs.statSync(pngPath).size : 0;
    check(`PNG renderizado: ${base}-${res}.png`, exists && size > 1000, `Tamanho: ${size} bytes`);
  });
  
  // Default un-suffixed PNG
  const defPath = path.join(pngDir, `${base}.png`);
  const defExists = fs.existsSync(defPath);
  check(`PNG default: ${base}.png`, defExists && fs.statSync(defPath).size > 1000);
});

// -------------------------------------------------------------------
// 3. AUDITORIA DE FAVICONS & PACOTE ZIP
// -------------------------------------------------------------------
console.log('\n📁 3. Checagem de Favicons & Pacote Mestre ZIP...');

const favDir = path.resolve('brand-manual/downloads/favicons');
['favicon.ico', 'favicon-32x32.png', 'favicon-64x64.png', 'favicon-192x192.png', 'favicon-512x512.png'].forEach(fav => {
  const fPath = path.join(favDir, fav);
  const exists = fs.existsSync(fPath);
  check(`Favicon presente: ${fav}`, exists && fs.statSync(fPath).size > 100);
});

const zipPath = path.resolve('brand-manual/downloads/agile-brand-kit-completo.zip');
const zipExists = fs.existsSync(zipPath);
const zipSize = zipExists ? fs.statSync(zipPath).size : 0;
check(`Master ZIP Kit existe e completo: agile-brand-kit-completo.zip`, zipExists && zipSize > 50000, `Tamanho: ${(zipSize/1024).toFixed(1)} KB`);

// -------------------------------------------------------------------
// 4. AUDITORIA DOS LINKS DE DOWNLOAD DO MANUAL DE MARCA (index.html)
// -------------------------------------------------------------------
console.log('\n🔗 4. Checagem de Links e Botões de Download em brand-manual/index.html...');

const htmlPath = path.resolve('brand-manual/index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Regex to extract all href attributes in a tags
const hrefRegex = /href="([^"#][^"]*)"/g;
let match;
const testedLinks = new Set();

while ((match = hrefRegex.exec(htmlContent)) !== null) {
  const href = match[1];
  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')) continue;
  if (href.startsWith('../')) continue; // Cross-manual link
  if (testedLinks.has(href)) continue;
  testedLinks.add(href);

  const cleanHref = href.split('?')[0];
  const targetFile = path.resolve('brand-manual', cleanHref);
  const exists = fs.existsSync(targetFile);
  check(`Link de download funcional: ${href}`, exists, `Arquivo não encontrado: ${targetFile}`);
}

// -------------------------------------------------------------------
// 5. AUDITORIA DE CONFORMIDADE DE MARCA (SEM ACENTO / CORES OFICIAIS)
// -------------------------------------------------------------------
console.log('\n📐 5. Checagem de Regras de Ouro e Conformidade de Marca...');

// Invariant INV-001: No "Ágile" with accent
const hasBadAccent = /Ágile|ágile/.test(htmlContent);
check('Regra INV-001: Nome da marca sem acento em index.html (Agile / AGILE)', !hasBadAccent, 'Encontrado "Ágile" com acento no texto!');

// Invariant INV-002: Official Colors
check('Regra INV-002: Deep Navy presente (#0B1B3D)', htmlContent.includes('#0B1B3D') || htmlContent.includes('0B1B3D'));
check('Regra INV-002: Safety Orange presente (#FF6B00)', htmlContent.includes('#FF6B00') || htmlContent.includes('FF6B00'));

// -------------------------------------------------------------------
// RELATÓRIO CONSOLIDADO
// -------------------------------------------------------------------
console.log('\n====================================================');
console.log('📊 RESUMO CONSOLIDADO DA AUDITORIA');
console.log('====================================================');
console.log(`Total de testes executados: ${totalChecks}`);
console.log(`Testes aprovados: ${passedChecks}`);
console.log(`Falhas encontradas: ${failedChecks.length}`);

if (failedChecks.length === 0) {
  console.log('\n🎉 STATUS: 100% APROVADO PARA ENTREGA AO CLIENTE! ZERO INCONSISTÊNCIAS.');
} else {
  console.log('\n⚠️ STATUS: ATENÇÃO! Existem falhas que precisam ser corrigidas antes do envio:');
  failedChecks.forEach(f => console.log(`  - ${f.desc}: ${f.errorMsg}`));
}

// Salvar relatório em .ai/audits/
const auditDir = path.resolve('.ai/audits');
if (!fs.existsSync(auditDir)) fs.mkdirSync(auditDir, { recursive: true });

const auditReport = `# Relatório de Auditoria — Pré-Entrega ao Cliente

- **Data:** ${new Date().toLocaleString('pt-BR')}
- **Branch:** master
- **Status:** ${failedChecks.length === 0 ? '✅ 100% APROVADO' : '❌ PENDENTE'}
- **Total de Verificações:** ${totalChecks}
- **Aprovadas:** ${passedChecks}
- **Falhas:** ${failedChecks.length}

---

## Detalhamento das Verificações

1. **Ativos Vetoriais (16 SVGs por diretório):** ${failedChecks.filter(f => f.desc.includes('SVG')).length === 0 ? '100% Válidos' : 'Falhas detectadas'}
2. **Imagens PNG (512px, 1024px, 2048px):** ${failedChecks.filter(f => f.desc.includes('PNG')).length === 0 ? '100% Válidos' : 'Falhas detectadas'}
3. **Favicons e Pacote Mestre ZIP:** ${failedChecks.filter(f => f.desc.includes('ZIP') || f.desc.includes('Favicon')).length === 0 ? '100% Válidos' : 'Falhas detectadas'}
4. **Links de Download no Manual Web:** ${failedChecks.filter(f => f.desc.includes('Link')).length === 0 ? '100% Válidos e Testados' : 'Falhas detectadas'}
5. **Conformidade de Marca (INV-001 / INV-002):** ${failedChecks.filter(f => f.desc.includes('INV')).length === 0 ? '100% Conforme (Sem acento, Paleta Oficial)' : 'Falhas detectadas'}

${failedChecks.length > 0 ? '## Falhas:\n' + failedChecks.map(f => `- ${f.desc}: ${f.errorMsg}`).join('\n') : ''}
`;

fs.writeFileSync(path.join(auditDir, 'AUDIT-CLIENT-DELIVERY.md'), auditReport, 'utf8');
console.log(`\n📄 Relatório salvo em: .ai/audits/AUDIT-CLIENT-DELIVERY.md`);
