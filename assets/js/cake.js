// The tiramisu as 0/1 rain (green). Columns of digits stream down the tile; a digit is bright only where the
// slice and plate are (the .tira-solid copy in _includes/cake.html): the slice bright, the plate dim.
// Digits are 0 at the top and 1 at the bottom, mixing in the middle; the rain falls, 0 → 1.
// Red (the `still` class on the page) shows the line drawing instead and stops the loop.
// The canvas is rebuilt whenever the tile's size or the screen's pixel density changes (browser zoom,
// moving to another screen), so the digits are always drawn at full resolution.

// The caption: each switch to red first picks the odds, 1 in 2 or 1 in 3 (even chance of either), then tosses with
// them (5 in 12 overall) whether "Tiramisù" splits into its parts and what they mean:
// tira = pull/pick, mi = me, su = up (data-tira="split" on the page). Green brings the word back.
(function () {
  var root = document.documentElement, red = null;
  function toss() {
    var now = root.getAttribute('data-theme') === 'dark';
    if (now === red) return;
    red = now;
    var odds = Math.random() < 0.5 ? 1 / 2 : 1 / 3;
    if (red && Math.random() < odds) root.setAttribute('data-tira', 'split');
    else root.removeAttribute('data-tira');
  }
  new MutationObserver(toss).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  toss();
})();

(function () {
  var fig = document.querySelector('.cake');
  var svg = fig && fig.querySelector('.cake-art');
  if (!svg || !document.createElement('canvas').getContext) return;

  var CELL = 4.5;   // character cell, CSS pixels (smaller = finer rain)
  var SPEED = 14;   // rows per second
  var TRAIL = 9;    // how many rows each falling head lights up behind it
  var PAD = 0.08;   // margin around the drawing, as a fraction of the tile

  var root = document.documentElement;
  var canvas = document.createElement('canvas');
  canvas.className = 'cake-rain';
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', svg.getAttribute('aria-label') + ', drawn in falling 0s and 1s');
  var ctx = canvas.getContext('2d');
  fig.appendChild(canvas);

  // The mask comes from the solid copy only: no frame, no dimension, no hatching.
  var solid = svg.cloneNode(true);
  var lines = solid.querySelector('.tira-lines');
  if (lines) lines.parentNode.removeChild(lines);
  solid.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  var pic = new Image();
  var picReady = false;
  pic.onload = function () { picReady = true; build(); };
  pic.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(solid.outerHTML.replace(/currentColor/g, '#000'));

  var size, dpr, cols, cell, mask, ones, heads, speeds, BG, INK;

  function readTheme() {
    var cs = getComputedStyle(fig);
    BG = cs.getPropertyValue('--cake-bg').trim() || '#100F0F';
    INK = cs.getPropertyValue('--cake-ink').trim() || '#66800B';
  }

  // (Re)build for the tile's current size and the screen's current pixel density.
  function build() {
    if (!picReady) return;
    size = fig.clientWidth;
    dpr = window.devicePixelRatio || 1;
    cols = Math.floor(size / CELL);
    var px = Math.round(size * dpr);
    canvas.width = canvas.height = px;
    canvas.style.width = canvas.style.height = size + 'px';
    cell = px / cols;

    // which cells the slice covers, sampled 4×4 per cell
    var off = document.createElement('canvas');
    off.width = off.height = cols * 4;
    var o = off.getContext('2d'), pad = off.width * PAD;
    o.drawImage(pic, pad, pad, off.width - 2 * pad, off.height - 2 * pad);
    var d = o.getImageData(0, 0, off.width, off.height).data;
    mask = new Float32Array(cols * cols);
    for (var r = 0; r < cols; r++) for (var c = 0; c < cols; c++) {
      var sum = 0, most = 0;
      for (var y = 0; y < 4; y++) for (var x = 0; x < 4; x++) {
        var a = d[(((r * 4 + y) * off.width) + (c * 4 + x)) * 4 + 3];
        sum += a; if (a > most) most = a;
      }
      // brightness follows the drawing's strength (slice bright, plate dim); a thin line still lights its cell
      mask[r * cols + c] = Math.min(1, Math.max(sum / (16 * 255) * 1.4, most / 255 * 0.85));
    }
    // each cell turns from 0 to 1 at its own depth, so the change is a soft band, not a line
    ones = new Uint8Array(cols * cols);
    for (var i = 0; i < ones.length; i++) ones[i] = (Math.floor(i / cols) + 0.5) / cols > 0.3 + 0.4 * Math.random() ? 1 : 0;
    heads = []; speeds = [];
    for (var k = 0; k < cols; k++) { heads.push(Math.random() * cols * 2); speeds.push(0.6 + Math.random() * 0.8); }
    readTheme();
    apply();
  }

  var running = false, last = 0;
  function frame(t) {
    if (!running) return;
    var dt = last ? Math.min(0.1, (t - last) / 1000) : 0;
    last = t;
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = INK;
    for (var c = 0; c < cols; c++) {
      heads[c] += dt * SPEED * speeds[c];
      if (heads[c] > cols + TRAIL) heads[c] = -Math.random() * cols;
    }
    // two passes, 0s then 1s: a 1 has less ink than a 0, so it is drawn larger to look as solid
    for (var digit = 0; digit < 2; digit++) {
      ctx.font = 'bold ' + Math.round(cell * (digit ? 1.5 : 1.15)) + 'px ui-monospace, "Cascadia Code", Menlo, Consolas, monospace';
      for (var col = 0; col < cols; col++) for (var row = 0; row < cols; row++) {
        if (ones[row * cols + col] !== digit) continue;
        var m = mask[row * cols + col];
        var behind = heads[col] - row;   // rows since the head passed this cell
        var glow = behind >= 0 && behind < TRAIL ? 1 - behind / TRAIL : 0;
        // the slice always shows; the rain brightens it as heads pass, and faintly fills the tile around it
        var alpha = m > 0 ? m * (0.7 + 0.3 * glow) : 0.1 * glow;
        if (alpha < 0.02) continue;
        ctx.globalAlpha = alpha;
        ctx.fillText(digit ? '1' : '0', Math.round((col + 0.5) * cell), Math.round((row + 0.5) * cell));
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }

  // Green shows the rain; red shows the line drawing.
  function apply() {
    var still = root.classList.contains('still');
    svg.style.display = still ? '' : 'none';
    canvas.style.display = still ? 'none' : '';
    if (!still && !running && mask) { running = true; last = 0; requestAnimationFrame(frame); }
    if (still) running = false;
  }

  new MutationObserver(function () { readTheme(); apply(); })
    .observe(root, { attributes: true, attributeFilter: ['class', 'data-theme'] });
  window.addEventListener('resize', function () {
    if (fig.clientWidth !== size || (window.devicePixelRatio || 1) !== dpr) build();
  });
  svg.style.display = root.classList.contains('still') ? '' : 'none';
  canvas.style.display = 'none';
})();
