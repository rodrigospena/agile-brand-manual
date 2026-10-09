import fs from 'fs';
import path from 'path';

/**
 * Geometric Vector Wordmark: "Λ G I L E"
 * 
 * Target Cap-Height: 100 units
 * Target Base Stroke Thickness: 19 units (Bold / Architectural Medium-Heavy)
 * Tracking / Kerning: custom optical kerning
 * 
 * Letter "Λ":
 * - Open triangular apex matching Agile symbol outer frame
 * - Chamfered top flat width = 10 units (from x=40 to x=50 at y=0)
 * - Left leg: outside edge goes from (40, 0) to (0, 100).
 * - Right leg: outside edge goes from (50, 0) to (90, 100).
 * - Inside apex: from (45, 22) down to (25, 100) on left, and (65, 100) on right.
 * - Leg thickness: ~19.5 units.
 */

export function getLetterLambda(startX = 0, baselineY = 100, scale = 1) {
  // Cap-height 100: y goes from 0 (top) to 100 (bottom)
  // We offset by (startX, baselineY - 100*scale)
  const topY = baselineY - 100 * scale;
  const botY = baselineY;
  
  // Coordinates at 100 scale:
  // Outer contour: (40, 0) -> (50, 0) -> (92, 100) -> (72, 100) -> (45, 26) -> (18, 100) -> (-2, 100) -> (40, 0)
  // With chamfered apex:
  // Points (x, y):
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  
  // Path data for Λ (Open A)
  const d = `M ${p(41, 0)} L ${p(51, 0)} L ${p(93, 100)} L ${p(72, 100)} L ${p(46, 26)} L ${p(20, 100)} L ${p(-1, 100)} Z`;
  const width = 94 * scale;
  return { d, width };
}

export function getLetterG(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  
  // Modern geometric G with crisp structural cut
  // Outer ellipse/circle with flat horizontal bar:
  // Outer bounds: width ~92, height 100
  // Starts top right (88, 22), curves around to (46, 0), (0, 50), (46, 100), (90, 100), (90, 52), (48, 52), (48, 70), (71, 70), (71, 82), (46, 82), (19, 50), (46, 18), (82, 18), (88, 22)
  // Let's create clean SVG arc commands or smooth bezier curves for G
  
  const outerWidth = 94;
  const stroke = 19;
  
  // SVG Path with precise Bezier curves:
  const d = `M ${p(90, 24)} ` +
            `L ${p(74, 34)} ` +
            `C ${p(67, 22)} ${p(57, 18)} ${p(47, 18)} ` +
            `C ${p(30, 18)} ${p(19, 32)} ${p(19, 50)} ` +
            `C ${p(19, 68)} ${p(30, 82)} ${p(47, 82)} ` +
            `C ${p(62, 82)} ${p(72, 73)} ${p(73, 64)} ` +
            `L ${p(50, 64)} ` +
            `L ${p(50, 48)} ` +
            `L ${p(92, 48)} ` +
            `L ${p(92, 72)} ` +
            `C ${p(84, 89)} ${p(68, 100)} ${p(47, 100)} ` +
            `C ${p(20, 100)} ${p(0, 78)} ${p(0, 50)} ` +
            `C ${p(0, 22)} ${p(20, 0)} ${p(47, 0)} ` +
            `C ${p(68, 0)} ${p(83, 10)} ${p(90, 24)} Z`;
            
  return { d, width: outerWidth * scale };
}

export function getLetterI(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  const stroke = 19;
  const d = `M ${p(0, 0)} L ${p(stroke, 0)} L ${p(stroke, 100)} L ${p(0, 100)} Z`;
  return { d, width: stroke * scale };
}

export function getLetterL(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  const stroke = 19;
  const width = 74;
  const d = `M ${p(0, 0)} L ${p(stroke, 0)} L ${p(stroke, 82)} L ${p(width, 82)} L ${p(width, 100)} L ${p(0, 100)} Z`;
  return { d, width: width * scale };
}

export function getLetterE(startX = 0, baselineY = 100, scale = 1) {
  const topY = baselineY - 100 * scale;
  const p = (x, y) => `${(startX + x * scale).toFixed(2)},${(topY + y * scale).toFixed(2)}`;
  const stroke = 19;
  const width = 76;
  const midWidth = 66;
  const midY = 41;
  const midHeight = 18;
  
  const d = `M ${p(0, 0)} ` +
            `L ${p(width, 0)} L ${p(width, stroke)} ` +
            `L ${p(stroke, stroke)} L ${p(stroke, midY)} ` +
            `L ${p(midWidth, midY)} L ${p(midWidth, midY + midHeight)} ` +
            `L ${p(stroke, midY + midHeight)} L ${p(stroke, 100 - stroke)} ` +
            `L ${p(width, 100 - stroke)} L ${p(width, 100)} ` +
            `L ${p(0, 100)} Z`;
            
  return { d, width: width * scale };
}

export function buildCustomWordmark(fontSize = 100, tracking = 24, startX = 0, baselineY = 100) {
  const scale = fontSize / 100;
  let curX = startX;
  const paths = [];

  // Letter Λ
  const l1 = getLetterLambda(curX, baselineY, scale);
  paths.push(l1.d);
  curX += l1.width + tracking * scale;

  // Letter G
  const l2 = getLetterG(curX, baselineY, scale);
  paths.push(l2.d);
  curX += l2.width + tracking * scale;

  // Letter I
  const l3 = getLetterI(curX, baselineY, scale);
  paths.push(l3.d);
  curX += l3.width + tracking * scale;

  // Letter L
  const l4 = getLetterL(curX, baselineY, scale);
  paths.push(l4.d);
  curX += l4.width + tracking * scale;

  // Letter E
  const l5 = getLetterE(curX, baselineY, scale);
  paths.push(l5.d);
  curX += l5.width; // last letter no tracking

  return {
    pathData: paths.join(' '),
    totalWidth: curX - startX,
    capHeight: fontSize
  };
}
