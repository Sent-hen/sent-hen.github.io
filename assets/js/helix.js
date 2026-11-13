// Time: two mirrored double helixes, points touching, base pairs labelled in binary (green) or letters (red), sand
// trickling down (up on red). In step with the coin, like a spring: it springs
// to full height as the coin starts, is pressed down as the ball climbs 0 → 1, and is a line, the coin seen edge on,
// flashing with it, while the ball rolls back. See README.
(function () {
  var canvas = document.querySelector('canvas.helix');
  if (!canvas || !canvas.getContext) return;

  var TURNS = 3;        // turns in each helix, from its wide end to its point
  var RADIUS = 0.42;    // the coil's radius at its wide end, as a share of half the tile's width
  var PERIOD = 6;       // seconds for one full turn about the axis
  var OPEN = 0.4;       // seconds to grow back to full height as the coin starts again (its FADE)
  var VIEW = 6;         // the eye's distance, in helix lengths: smaller is stronger perspective
  var STEPS = 240;
  var GRAINS = 70;      // grains of sand in the air at once
  var POUR = 2.4;       // seconds for one grain to go from top to bottom
  var RUNGS = 4;        // base pairs in each turn
  var PAIRS = ['GC', 'AT', 'CG', 'TA'];
  var BITS = { A: '00', C: '01', G: '10', T: '11' };
  var root = document.documentElement;
  var FONT = getComputedStyle(root).getPropertyValue('--font-ui').trim() || 'sans-serif';
  // The coin's cycle and flash (dot-coin.js, which loads first); plain ink and an 11-second cycle without it.
  var COIN = window.coinCycle || { ramp: 8, cycle: 11 };
  var stamina = window.zeroToOneStamina || function () { return 0; };
  var ink = window.zeroToOneInk || function (el) { return { color: getComputedStyle(el).color, alpha: 1 }; };
  function ease(x) { return x * x * (3 - 2 * x); }

  function draw(t) {
    var box = canvas.getBoundingClientRect(), w = box.width, h = box.height, dpr = window.devicePixelRatio || 1;
    var pw = Math.round(w * dpr), ph = Math.round(h * dpr);
    if (canvas.width !== pw || canvas.height !== ph) { canvas.width = pw; canvas.height = ph; }
    var ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, pw, ph);
    ctx.setTransform(pw / w, 0, 0, ph / h, 0, 0);
    var k0 = ink(canvas, stamina(t)), L = k0.alpha;   // the coin's flash: its color, and how faint
    ctx.strokeStyle = k0.color;
    ctx.lineWidth = 1.2;
    ctx.lineCap = 'round';

    var spin = (t / PERIOD) % 1 * 2 * Math.PI;
    // Height, from 1 (full) to 0 (a line through the middle): springing up as the coin starts, pressed down steadily
    // as the ball climbs 0 → 1, flat while it rolls back and the coin flashes.
    var c = t % COIN.cycle;
    var ct = c < COIN.ramp ? ease(Math.min(1, c / OPEN)) * (1 - c / COIN.ramp) : 0;
    var R = w / 2 * RADIUS, cx = w / 2, mid = h / 2, span = w * 0.8;   // each helix as tall as it was in a square tile
    var eye = VIEW * span;
    // A point a share s of the way from a helix's wide end to its point, in the middle; dir 1 is the lower helix,
    // -1 its mirror above; the second strand is half a turn round from the first.
    // [x, y on the tile, depth toward us in pixels, nearness of the coil's face from -1 (behind) to 1 (in front)]
    function put(x, y, z, near) {   // squeezed in height, then seen in perspective
      var yy = y * ct, zz = z, f = eye / (eye - zz);
      return [cx + x * f, mid + yy * f, zz, near];
    }
    function at(s, off, dir) {
      var a = s * TURNS * 2 * Math.PI - spin + off, k = 1 - s;   // k: narrowing to the point
      return put(Math.sin(a) * k * R, dir * (1 - s) * span, Math.cos(a) * k * R, Math.cos(a));
    }
    // Every short piece of every strand, drawn far to near, so the near ones draw over the far ones.
    var segs = [];
    [1, -1].forEach(function (dir) { [0, Math.PI].forEach(function (off) {
      var p = at(0, off, dir);
      for (var i = 1; i <= STEPS; i++) {
        var q = at(i / STEPS, off, dir);
        segs.push([p, q, (p[2] + q[2]) / 2, (p[3] + q[3]) / 2]);
        p = q;
      }
    }); });
    // The base pairs: a rung from strand to strand through the axis, faint, and each half's base written on it.
    var red = root.getAttribute('data-theme') === 'dark', labels = [], n = TURNS * RUNGS;
    [1, -1].forEach(function (dir) {
      for (var j = 0; j < n; j++) {
        var s = (j + 0.5) / n, a = s * TURNS * 2 * Math.PI - spin, k = 1 - s, y = dir * (1 - s) * span;
        var pair = PAIRS[(j * 7 + (dir > 0 ? 0 : 3)) % PAIRS.length];
        [0, 1].forEach(function (side) {
          var b = a + side * Math.PI, sx = Math.sin(b) * k * R, sz = Math.cos(b) * k * R, near = Math.cos(b);
          var end = put(sx, y, sz, near), axis = put(0, y, 0, near), half = put(sx / 2, y, sz / 2, near);
          segs.push([axis, end, (axis[2] + end[2]) / 2, near, 0.35]);
          var size = 8 * k * (eye / (eye - half[2]));
          if (size >= 3.5) labels.push({ p: half, size: size, near: near, side: Math.abs(Math.sin(b)), text: red ? pair.charAt(side) : BITS[pair.charAt(side)] });
        });
      }
    });

    segs.sort(function (u, v) { return u[2] - v[2]; });
    segs.forEach(function (g) {
      var z = g[3];
      ctx.globalAlpha = (z >= 0 ? 0.55 + z * 0.45 : 0.18 + (1 + z) * 0.37) * (g[4] || 1) * L;
      ctx.beginPath(); ctx.moveTo(g[0][0], g[0][1]); ctx.lineTo(g[1][0], g[1][1]); ctx.stroke();
    });
    labels.sort(function (u, v) { return u.p[2] - v.p[2]; });
    ctx.fillStyle = ctx.strokeStyle;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    labels.forEach(function (l) {
      // faded as the rung turns end on to us, where its two labels would sit on top of each other
      ctx.globalAlpha = (l.near >= 0 ? 0.5 + l.near * 0.5 : 0.12 + (1 + l.near) * 0.3) * (0.15 + 0.85 * l.side) * ct * L;
      ctx.font = l.size.toFixed(1) + 'px ' + FONT;
      ctx.fillText(l.text, l.p[0], l.p[1]);
    });

    // The sand: always top to bottom on the tile, however the glass is turned. Each grain funnels in from the upper
    // end toward the point in the middle, then falls from it, faster and faster, to the lower end.
    var reach = span * ct * 0.92;   // how far the glass reaches up and down just now
    var fall = root.getAttribute('data-theme') === 'dark' ? -1 : 1;   // down on green, up on red
    ctx.fillStyle = ctx.strokeStyle;
    for (var g = 0; g < GRAINS; g++) {
      var seed = Math.sin(g * 12.9898) * 43758.5453, jit = seed - Math.floor(seed);           // 0..1, fixed per grain
      var u = (t / POUR + g / GRAINS) % 1, x, y;
      if (u < 0.5) { var v = u / 0.5, left = 1 - v * v;                                        // funneling in
        x = cx + (jit * 2 - 1) * R * 0.8 * left; y = mid - fall * reach * left; ctx.globalAlpha = (0.35 + 0.5 * v) * ct * L; }
      else { var d = (u - 0.5) / 0.5;                                                           // falling
        x = cx + (jit * 2 - 1) * 1.2; y = mid + fall * reach * d * d; ctx.globalAlpha = 0.85 * ct * L; }
      ctx.beginPath(); ctx.arc(x, y, 0.9, 0, 2 * Math.PI); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // The page's clock, so it keeps time with the coin and the ball.
  var running = false;
  var calm = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  function frame(now) {
    if (!running) return;
    draw(now / 1000);
    requestAnimationFrame(frame);
  }
  function apply() {
    if (calm.matches) { running = false; draw(COIN.ramp / 2); }
    else if (!running) { running = true; requestAnimationFrame(frame); }
  }
  if (calm.addEventListener) calm.addEventListener('change', apply);
  new MutationObserver(function () { if (!running) draw(COIN.ramp / 2); }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  window.addEventListener('resize', function () { if (!running) draw(COIN.ramp / 2); });
  apply();
})();
