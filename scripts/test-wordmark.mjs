import fs from 'fs';
import path from 'path';
import opentype from 'opentype.js';

const fontPath = path.resolve('node_modules/@fontsource/montserrat/files/montserrat-latin-800-normal.woff');
const buffer = fs.readFileSync(fontPath);
const font = opentype.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));

function getWordmarkPath(fontSize = 100, tracking = 18) {
  const text = 'AGILE';
  let currentX = 0;
  const pathList = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const glyph = font.charToGlyph(char);
    const p = glyph.getPath(currentX, 0, fontSize);
    pathList.push(p.toPathData(2));
    const isLast = (i === text.length - 1);
    currentX += (glyph.advanceWidth / font.unitsPerEm) * fontSize + (isLast ? 0 : tracking);
  }

  return {
    pathData: pathList.join(' '),
    width: currentX,
    capHeight: (font.tables.os2.sCapHeight / font.unitsPerEm) * fontSize
  };
}

console.log('Wordmark at 100px:', getWordmarkPath(100, 18));
console.log('Wordmark at 120px:', getWordmarkPath(120, 22));
console.log('Wordmark at 130px:', getWordmarkPath(130, 24));
