// Rasterize each rotation onto a fixed 12 × 12 grid. Draw only whole pixels,
// rather than rotating the canvas, so every frame keeps crisp stepped edges.
export const starFrames = Array.from({ length: 24 }, (_, frame) => {
  const rotation = -frame * Math.PI * 2 / 24;
  const points = Array.from({ length: 10 }, (_, point) => {
    const angle = point * Math.PI / 5 - Math.PI / 2 + rotation;
    const radius = point % 2 === 0 ? 5.9 : 2.8;
    return [6 + Math.cos(angle) * radius, 6 + Math.sin(angle) * radius];
  });
  const mask = Array.from({ length: 12 }, (_, row) => Array.from({ length: 12 }, (_, column) => {
    const x = column + 0.5;
    const y = row + 0.5;
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const [xi, yi] = points[i];
      const [xj, yj] = points[j];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }));
  return mask.map((row, y) => row.map((filled, x) => {
    if (!filled) return ' ';
    if (!mask[y - 1]?.[x] || !mask[y + 1]?.[x] || !mask[y][x - 1] || !mask[y][x + 1]) return 'o';
    return x + y < 10 ? 'h' : 'g';
  }).join(''));
});

export const starPalette: Record<string, string> = {
  o: '#ad8e58', g: '#efd18a', h: '#fff0bd',
};
