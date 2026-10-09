import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const svgDir = path.resolve('brand-manual/downloads/svg');
const pngDir = path.resolve('brand-manual/downloads/png');
const favDir = path.resolve('brand-manual/downloads/favicons');
const zipDir = path.resolve('brand-manual/downloads');

[pngDir, favDir, zipDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const filesToExport = [
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
  'agile-technical-stamp.svg',
  'agile-technical-stamp-mono.svg',
  'agile-technical-stamp-dark.svg'
];

console.log('--- Rendering PNG assets with resvg-js ---');

filesToExport.forEach(svgFile => {
  const inputSvg = path.join(svgDir, svgFile);
  if (!fs.existsSync(inputSvg)) {
    console.warn(`Warning: File not found ${inputSvg}`);
    return;
  }
  const baseName = svgFile.replace('.svg', '');

  // 1. High-Res PNG @2048px (Master Ultra HD)
  const out2048 = path.join(pngDir, `${baseName}-2048px.png`);
  execSync(`npx -y @resvg/resvg-js-cli --fit-width 2048 "${inputSvg}" "${out2048}"`);

  // 2. High-Res PNG @1024px (Standard HD)
  const out1024 = path.join(pngDir, `${baseName}-1024px.png`);
  execSync(`npx -y @resvg/resvg-js-cli --fit-width 1024 "${inputSvg}" "${out1024}"`);

  // 3. Web PNG @512px
  const out512 = path.join(pngDir, `${baseName}-512px.png`);
  execSync(`npx -y @resvg/resvg-js-cli --fit-width 512 "${inputSvg}" "${out512}"`);

  // Also create default un-suffixed PNG (1024px) for quick direct downloads
  const outDefault = path.join(pngDir, `${baseName}.png`);
  fs.copyFileSync(out1024, outDefault);
});

// Generate Favicons from symbol
console.log('--- Generating Favicons ---');
const symbolSvg = path.join(svgDir, 'agile-symbol.svg');
execSync(`npx -y @resvg/resvg-js-cli --fit-width 32 "${symbolSvg}" "${path.join(favDir, 'favicon-32x32.png')}"`);
execSync(`npx -y @resvg/resvg-js-cli --fit-width 64 "${symbolSvg}" "${path.join(favDir, 'favicon-64x64.png')}"`);
execSync(`npx -y @resvg/resvg-js-cli --fit-width 192 "${symbolSvg}" "${path.join(favDir, 'favicon-192x192.png')}"`);
execSync(`npx -y @resvg/resvg-js-cli --fit-width 512 "${symbolSvg}" "${path.join(favDir, 'favicon-512x512.png')}"`);
fs.copyFileSync(path.join(favDir, 'favicon-32x32.png'), path.join(favDir, 'favicon.ico'));

// Mirror to assets/logos/exports and brand-manual/assets/logos/exports
const exportsDir = path.resolve('assets/logos/exports');
const brandAssetsDir = path.resolve('brand-manual/assets/logos/exports');
[exportsDir, brandAssetsDir].forEach(target => {
  if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });
  fs.readdirSync(pngDir).forEach(f => {
    fs.copyFileSync(path.join(pngDir, f), path.join(target, f));
  });
});

// Package ZIP archive
console.log('--- Packaging Master ZIP Brand Kit ---');
const tempZipSource = path.resolve('temp_brand_kit');
if (fs.existsSync(tempZipSource)) fs.rmSync(tempZipSource, { recursive: true, force: true });
fs.mkdirSync(path.join(tempZipSource, '01-Vetores-SVG'), { recursive: true });
fs.mkdirSync(path.join(tempZipSource, '02-Imagens-PNG-Alta-Resolucao'), { recursive: true });
fs.mkdirSync(path.join(tempZipSource, '03-Carimbos-Tecnicos'), { recursive: true });
fs.mkdirSync(path.join(tempZipSource, '04-Favicons'), { recursive: true });

// Copy SVGs
fs.readdirSync(svgDir).forEach(f => {
  if (f.endsWith('.svg')) {
    if (f.includes('stamp')) {
      fs.copyFileSync(path.join(svgDir, f), path.join(tempZipSource, '03-Carimbos-Tecnicos', f));
    } else {
      fs.copyFileSync(path.join(svgDir, f), path.join(tempZipSource, '01-Vetores-SVG', f));
    }
  }
});

// Copy PNGs
fs.readdirSync(pngDir).forEach(f => {
  if (f.endsWith('.png')) {
    if (f.includes('stamp')) {
      fs.copyFileSync(path.join(pngDir, f), path.join(tempZipSource, '03-Carimbos-Tecnicos', f));
    } else {
      fs.copyFileSync(path.join(pngDir, f), path.join(tempZipSource, '02-Imagens-PNG-Alta-Resolucao', f));
    }
  }
});

// Copy Favicons
fs.readdirSync(favDir).forEach(f => {
  fs.copyFileSync(path.join(favDir, f), path.join(tempZipSource, '04-Favicons', f));
});

// Create README.txt in ZIP
const readmeContent = `AGILE ENGENHARIA CIVIL — BRAND ASSETS KIT COMPLETO
=====================================================
Identidade Visual Oficial | Versão Final para Cliente

Estrutura de Pastas:
- 01-Vetores-SVG/ : Logotipos e símbolos em formato vetorial puro (SVG), escaláveis para qualquer tamanho sem perda de qualidade.
- 02-Imagens-PNG-Alta-Resolucao/ : Imagens com fundo transparente em 512px, 1024px e 2048px (Ultra HD).
- 03-Carimbos-Tecnicos/ : Selos e carimbos circulares oficiais (colorido e monocromático preto) para pranchas, plantas e prefeitura.
- 04-Favicons/ : Ícones para navegador, site e aplicativos (.ico e PNGs em múltiplas resoluções).

Cores Oficiais:
- Deep Navy: #0B1B3D (RGB: 11, 27, 61)
- Safety Orange: #FF6B00 (RGB: 255, 107, 0)
- Branco Puro: #FFFFFF
- Preto Monocromático: #000000

Manual de Marca Online: https://madebypx.com/agile/
`;
fs.writeFileSync(path.join(tempZipSource, 'LEIAME.txt'), readmeContent, 'utf8');

const zipDest = path.join(zipDir, 'agile-brand-kit-completo.zip');
if (fs.existsSync(zipDest)) fs.unlinkSync(zipDest);

try {
  execSync(`powershell -Command "Compress-Archive -Path '${tempZipSource}\\*' -DestinationPath '${zipDest}' -Force"`);
  console.log(`✅ Master ZIP criado com sucesso: ${zipDest}`);
} catch (err) {
  console.error('Erro ao compactar ZIP:', err.message);
}

if (fs.existsSync(tempZipSource)) fs.rmSync(tempZipSource, { recursive: true, force: true });

console.log('--- All PNGs, Favicons, and Master ZIP generated successfully! ---');
