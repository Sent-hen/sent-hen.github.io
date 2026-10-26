// The tiramisu as Matrix rain: columns of digits stream down the tile, and the digits are bright only
// where the tiramisu drawing is (_includes/cake.html), so the tiramisu appears out of the rain.
// Digits are 0 at the top and 1 at the bottom, mixing in the middle. Dark mode rains down (0 → 1),
// light mode rains up (1 → 0), following --motion. Colors invert the page (--cake-bg/--cake-ink).
(function () {
  var fig = document.querySelector('.cake');
  var svg = fig && fig.querySelector('.cake-art');
  if (!svg || !document.createElement('canvas').getContext) return;

  var SIZE = 160;                 // CSS pixels
  var CELL = 4.5;                 // character cell, CSS pixels (smaller = sharper tiramisu)
  var PAD = 0.08;                 // margin around the drawing, as a fraction of the tile
  var SPEED = 14;                 // rows per second
  var TRAIL = 9;                  // how many rows each falling head lights up behind it
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var N = SIZE * dpr, C = CELL * dpr, COLS = Math.floor(SIZE / CELL), ROWS = COLS;

  var canvas = document.createElement('canvas');
  canvas.width = N; canvas.height = N;
  canvas.className = 'cake-rain';
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', svg.getAttribute('aria-label') + ', drawn in falling digits');
  var ctx = canvas.getContext('2d');

  // Theme: colors and direction come from the stylesheet so they follow light/dark.
  var BG, INK, UP;
  function readTheme() {
    var cs = getComputedStyle(fig);
    BG = cs.getPropertyValue('--cake-bg').trim() || '#100F0F';
    INK = cs.getPropertyValue('--cake-ink').trim() || '#FFFCF0';
    UP = cs.getPropertyValue('--motion').trim() === 'reverse';   // light: the rain rises
  }
  readTheme();
  new MutationObserver(readTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', readTheme);
  }

  // Mask: render the drawing once, in black, and record which cells it covers (and how much).
  var mask = new Float32Array(COLS * ROWS);
  var src = svg.outerHTML
    .replace(/currentColor/g, '#000')
    .replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg" width="' + N + '" height="' + N + '"');
  var pic = new Image();
  pic.onload = function () {
    var off = document.createElement('canvas');
    off.width = COLS * 4; off.height = ROWS * 4;              // 4×4 samples per cell
    var o = off.getContext('2d'), pad = off.width * PAD;
    o.drawImage(pic, pad, pad, off.width - 2 * pad, off.height - 2 * pad);
    var d = o.getImageData(0, 0, off.width, off.height).data;
    for (var r = 0; r < ROWS; r++) for (var c = 0; c < COLS; c++) {
      var hit = 0;
      for (var y = 0; y < 4; y++) for (var x = 0; x < 4; x++) {
        if (d[(((r * 4 + y) * off.width) + (c * 4 + x)) * 4 + 3] > 40) hit++;
      }
      mask[r * COLS + c] = Math.min(1, hit / 6);       // thin outlines still count as solid
    }
    svg.style.display = 'none';
    fig.appendChild(canvas);
    requestAnimationFrame(frame);
  };
  pic.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(src);

  // Digits: each cell turns from 0 to 1 at its own depth, so the change is a soft band, not a line.
  var ones = new Uint8Array(COLS * ROWS);
  for (var i = 0; i < COLS * ROWS; i++) ones[i] = (Math.floor(i / COLS) + 0.5) / ROWS > 0.3 + 0.4 * Math.random() ? 1 : 0;

  // Rain: each column has a moving head at its own speed and offset.
  var heads = [], speeds = [];
  for (var c = 0; c < COLS; c++) { heads.push(Math.random() * ROWS * 2); speeds.push(0.6 + Math.random() * 0.8); }
  var last = 0;

  function frame(t) {
    var dt = last ? Math.min(0.1, (t - last) / 1000) : 0;
    last = t;
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, N, N);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = INK;
    for (var c = 0; c < COLS; c++) {
      heads[c] += dt * SPEED * speeds[c];
      if (heads[c] > ROWS + TRAIL) heads[c] = -Math.random() * ROWS;
    }
    // two passes, 0s then 1s: a '1' has far less ink than a '0', so it is drawn larger to keep the tiramisu equally solid
    for (var d = 0; d < 2; d++) {
      ctx.font = 'bold ' + Math.round(C * (d ? 1.5 : 1.15)) + 'px ui-monospace, "Cascadia Code", Menlo, Consolas, monospace';
      for (var c = 0; c < COLS; c++) for (var r = 0; r < ROWS; r++) {
        if (ones[r * COLS + c] !== d) continue;
        var m = mask[r * COLS + c];
        var behind = heads[c] - (UP ? ROWS - 1 - r : r); // rows since the head passed this cell
        var glow = behind >= 0 && behind < TRAIL ? 1 - behind / TRAIL : 0;
        // the tiramisu always shows; the rain brightens it as heads pass, and faintly fills the tile around it
        var alpha = m > 0 ? m * (0.7 + 0.3 * glow) : 0.1 * glow;
        if (alpha < 0.02) continue;
        ctx.globalAlpha = alpha;
        ctx.fillText(d ? '1' : '0', (c + 0.5) * C, (r + 0.5) * C);
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
})();
