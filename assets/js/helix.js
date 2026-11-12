// The spirals on the About page, between the clocks under Time: two 3D double helixes, each two strands half a turn
// apart like DNA, stood upright and seen from the side, projected onto the flat tile. The lower one is full width at the
// bottom (UTC) and narrows to a point in the middle; the upper one is its mirror, full width at the top (CST), narrowing
// down to the same point, so their tips touch. Each is the size of one square tile. They turn about their upright
// axis, so the lower coil seems to climb from bottom to top and the upper one to sink from top to bottom, meeting in the
// middle. The half of each turn that is behind is drawn fainter.
// The whole figure also tumbles end over end about its horizontal axis, through the point in the middle: once the two
// ends have swapped places, top for bottom, it slows, stops and turns back the other way, and so on, rocking.
// Like an hourglass: a round plinth capping each end, a base under the lower one and a top over the upper one, tumbling with it, and sand that always
// trickles from top to bottom, whichever end is up: grains funnel in from above to the point in the middle and fall
// from there, faster and faster, to the end below. On red it runs the other way, bottom to top.
// It keeps moving on green and red alike; only a reduced-motion setting holds one frame.
(function () {
  var canvas = document.querySelector('canvas.helix');
  if (!canvas || !canvas.getContext) return;

  var TURNS = 3;        // turns in each helix, from its wide end to its point
  var RADIUS = 0.42;    // the coil's radius at its wide end, as a share of half the tile's width
  var PERIOD = 6;       // seconds for one full turn about the axis
  var TUMBLE = 10;      // seconds for the ends to swap places, before it turns back
  var VIEW = 6;         // the eye's distance, in helix lengths: smaller is stronger perspective
  var STEPS = 240;
  var BASE = 1.2;       // the base's radius, as a multiple of the coil's at its wide end
  var BASE_H = 0.07;    // the base's thickness, as a share of a helix's length
  var GRAINS = 70;      // grains of sand in the air at once
  var POUR = 2.4;       // seconds for one grain to go from top to bottom
  var root = document.documentElement;

  function draw(t) {
    var box = canvas.getBoundingClientRect(), w = box.width, h = box.height, dpr = window.devicePixelRatio || 1;
    var pw = Math.round(w * dpr), ph = Math.round(h * dpr);
    if (canvas.width !== pw || canvas.height !== ph) { canvas.width = pw; canvas.height = ph; }
    var ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, pw, ph);
    ctx.setTransform(pw / w, 0, 0, ph / h, 0, 0);
    ctx.strokeStyle = getComputedStyle(canvas).color;
    ctx.lineWidth = 1.2;
    ctx.lineCap = 'round';

    var spin = (t / PERIOD) % 1 * 2 * Math.PI;
    // The tumble: 0 upright, π with the ends swapped; easing in and out, there and back, every 2 × TUMBLE seconds.
    var tilt = Math.PI / 2 * (1 - Math.cos(Math.PI * t / TUMBLE)), ct = Math.cos(tilt), st = Math.sin(tilt);
    var R = w / 2 * RADIUS, cx = w / 2, mid = h / 2, span = w * 0.8;   // each helix as tall as it was in a square tile
    var eye = VIEW * span;
    // A point a share s of the way from a helix's wide end to its point, in the middle; dir 1 is the lower helix,
    // -1 its mirror above; the second strand is half a turn round from the first.
    // [x, y on the tile, depth toward us in pixels, nearness of the coil's face from -1 (behind) to 1 (in front)]
    function put(x, y, z, near) {   // turned about the horizontal axis, then seen in perspective
      var yy = y * ct - z * st, zz = y * st + z * ct, f = eye / (eye - zz);
      return [cx + x * f, mid + yy * f, zz, near];
    }
    function at(s, off, dir) {
      var a = s * TURNS * 2 * Math.PI - spin + off, k = 1 - s;   // k: narrowing to the point
      return put(Math.sin(a) * k * R, dir * (1 - s) * span, Math.cos(a) * k * R, Math.cos(a) * ct);
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
    // The base under the lower end and the top over the upper one: two rims each, and their sides where they turn away.
    var rb = R * BASE, M = 64;
    function rim(y, a) { return put(Math.sin(a) * rb, y, Math.cos(a) * rb, Math.cos(a) * ct - Math.sin(tilt) * 0.5); }
    [1, -1].forEach(function (dir) {
      var y0 = dir * span * 1.02, y1 = y0 + dir * span * BASE_H;
      [y0, y1].forEach(function (y) {
        for (var j = 0; j < M; j++) {
          var p = rim(y, j / M * 2 * Math.PI), q = rim(y, (j + 1) / M * 2 * Math.PI);
          segs.push([p, q, (p[2] + q[2]) / 2, (p[3] + q[3]) / 2]);
        }
      });
      [Math.PI / 2, -Math.PI / 2].forEach(function (a) { var p = rim(y0, a), q = rim(y1, a); segs.push([p, q, (p[2] + q[2]) / 2, 0.6]); });
    });
    segs.sort(function (u, v) { return u[2] - v[2]; });
    segs.forEach(function (g) {
      var z = g[3];
      ctx.globalAlpha = z >= 0 ? 0.55 + z * 0.45 : 0.18 + (1 + z) * 0.37;
      ctx.beginPath(); ctx.moveTo(g[0][0], g[0][1]); ctx.lineTo(g[1][0], g[1][1]); ctx.stroke();
    });

    // The sand: always top to bottom on the tile, however the glass is turned. Each grain funnels in from the upper
    // end toward the point in the middle, then falls from it, faster and faster, to the lower end.
    var reach = Math.max(span * Math.abs(ct), R) * 0.92;   // how far the glass reaches up and down just now
    var fall = root.getAttribute('data-theme') === 'dark' ? -1 : 1;   // down on green, up on red
    ctx.fillStyle = ctx.strokeStyle;
    for (var g = 0; g < GRAINS; g++) {
      var seed = Math.sin(g * 12.9898) * 43758.5453, jit = seed - Math.floor(seed);           // 0..1, fixed per grain
      var u = (t / POUR + g / GRAINS) % 1, x, y;
      if (u < 0.5) { var v = u / 0.5, left = 1 - v * v;                                        // funneling in
        x = cx + (jit * 2 - 1) * R * 0.8 * left; y = mid - fall * reach * left; ctx.globalAlpha = 0.35 + 0.5 * v; }
      else { var d = (u - 0.5) / 0.5;                                                           // falling
        x = cx + (jit * 2 - 1) * 1.2; y = mid + fall * reach * d * d; ctx.globalAlpha = 0.85; }
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
    if (calm.matches) { running = false; draw(0); }
    else if (!running) { running = true; requestAnimationFrame(frame); }
  }
  if (calm.addEventListener) calm.addEventListener('change', apply);
  new MutationObserver(function () { if (!running) draw(0); }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  window.addEventListener('resize', function () { if (!running) draw(0); });
  apply();
})();
