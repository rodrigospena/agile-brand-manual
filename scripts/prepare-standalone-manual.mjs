import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('--- Copying assets into brand-manual standalone structure ---');

// 1. Copy icons
copyDirRecursive(path.resolve('assets/icons'), path.resolve('brand-manual/assets/icons'));

// 2. Copy showcase references
copyDirRecursive(path.resolve('assets/references'), path.resolve('brand-manual/assets/references'));

// 3. Copy logos exports
copyDirRecursive(path.resolve('assets/logos/exports'), path.resolve('brand-manual/assets/logos/exports'));
copyDirRecursive(path.resolve('assets/logos/official'), path.resolve('brand-manual/assets/logos/official'));

// 4. Create Master ZIP file of all downloads
const downloadsDir = path.resolve('brand-manual/downloads');
const zipOutput = path.join(downloadsDir, 'agile-brand-kit-completo.zip');

if (fs.existsSync(zipOutput)) {
  fs.unlinkSync(zipOutput);
}

try {
  console.log('--- Generating ZIP package ---');
  execSync(`powershell -Command "Compress-Archive -Path '${downloadsDir}\\svg\\*','${downloadsDir}\\png\\*','${downloadsDir}\\favicons\\*' -DestinationPath '${zipOutput}' -Force"`);
  console.log('--- Master ZIP created successfully at: ' + zipOutput);
} catch (e) {
  console.error('Error creating ZIP:', e.message);
}
