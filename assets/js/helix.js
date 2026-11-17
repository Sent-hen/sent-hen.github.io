// Time: two mirrored double helixes, cylinders from the top and the bottom of the tile to 1/4 and 3/4 of the way down,
// then coiling into points that touch on the dotted line across the middle of the tile, in step with Sisyphus (ripples.js) but not tied to him, like the plunger on a pinball table. As he pushes the
// stone up the hill they are drawn back, pressed in toward the middle line, flat on it just as he reaches the summit.
// They stay held there, charged, blinking with the coin, while the stone rolls back down; the moment it reaches the
// foot they are let go, shoot back out toward the top and the bottom, overshoot and wobble, and that kick starts the
// cycle anew. It stands straight, never turning, on green and red alike. The sands of time pour down the tile as one
// straight line, top to bottom, through the points. As the
// springs are pressed in they become a magnet, a bar magnet standing upright, north above the middle, south below: the grains are drawn off the line onto its field lines, arcs looping out from the north pole and round into
// the south, like iron filings about a magnet, and flow along them; when the springs are let go the grains fall back
// into line. The straight line is itself a field line: the one along the magnet's axis. See README.
(function () {
  var canvas = document.querySelector('canvas.helix');
  if (!canvas || !canvas.getContext) return;

  var TURNS = 4;        // turns in each helix, from its wide end to its point
  var RADIUS = 0.42;    // the coil's radius at its wide end, as a share of half the tile's width
  var PERIOD = 4;       // seconds for one full turn about the axis
  var REACH = 0.92;     // how far each helix reaches from the middle line, as a share of half the tile's height
  var KICK = 7;         // how fast they shoot out when let go (per second)
  var WOBBLE = 13;      // how fast they wobble about full length once out (radians per second)
  var VIEW = 6;         // the eye's distance, in helix lengths: smaller is stronger perspective
  var STEPS = 240;
  var GRAINS = 560;     // grains of sand at once
  var POUR = 3;         // seconds for a grain to fall from the top to the bottom, or to flow once along its field line
  var POLES = 0.37;     // the magnet's poles: north this share of the way down the tile, south as far up from the bottom
  var ANGLES = [160, 140, 120, 100, 80, 60, 40, 22];   // where its field lines leave the north pole, degrees from
                                                       // straight up: the tight arcs near the magnet first, the wide ones last
  var root = document.documentElement;
  // The coin's cycle and flash (dot-coin.js, which loads first); plain ink and an 8 + 3.658 second cycle without it.
  var COIN = window.coinCycle || { ramp: 8, cycle: 11.658 };
  var TRIP = COIN.ramp, CYCLE = COIN.cycle;   // Sisyphus reaches the summit TRIP seconds into each cycle
  var stamina = window.zeroToOneStamina || function () { return 0; };
  var ink = window.zeroToOneInk || function (el) { return { color: getComputedStyle(el).color, alpha: 1 }; };

  // How far out the helixes are at t seconds, 1 (full) to 0 (flat on the middle line). Let go as the cycle starts,
  // they shoot out, overshooting and wobbling, while being drawn back in step with the climb, so that they are flat at
  // the summit, as flat as their coils stacked wire on wire allow; they are held there, charged, a magnet, until the
  // stone is back at the foot.
  function height(t) {
    var s = (t % CYCLE + CYCLE) % CYCLE;
    if (s >= TRIP) return 0;
    var out = 1 - Math.exp(-KICK * s) * Math.cos(WOBBLE * s);   // let go: out, past, and back
    return Math.max(0, Math.min(1.08, (1 - s / TRIP) * out));
  }

  // A bar magnet's field lines, traced once for each size of the tile: from the north pole, at each of the ANGLES on
  // either side, following the field of the two poles (each pulling as 1 / distance squared) until the line reaches
  // the south pole or goes out past every corner of the tile, however it is turned. Each is a list of points spaced evenly along it, and its rank, from 0 for the
  // line nearest the magnet to 1 for the farthest.
  var traced = null;
  function field(w, h) {
    if (traced && traced.w === w && traced.h === h) return traced.lines;
    // Traced out to a circle round the middle that holds the whole tile at any turn, so that as the magnet turns its
    // lines are whole wherever they show.
    var cx = w / 2, ny = h * POLES, sy = h * (1 - POLES), lines = [], reach = Math.hypot(w, h) / 2 + 2;
    ANGLES.forEach(function (deg, i) {
      [-1, 1].forEach(function (side) {
        var a = deg * Math.PI / 180, x = cx + side * Math.sin(a) * 2, y = ny - Math.cos(a) * 2, pts = [[x, y]];
        for (var n = 0; n < 4000; n++) {
          var dx1 = x - cx, dy1 = y - ny, d1 = Math.pow(dx1 * dx1 + dy1 * dy1, 1.5);
          var dx2 = x - cx, dy2 = y - sy, d2 = Math.pow(dx2 * dx2 + dy2 * dy2, 1.5);
          var bx = dx1 / d1 - dx2 / d2, by = dy1 / d1 - dy2 / d2, b = Math.hypot(bx, by), home = false;
          x += bx / b; y += by / b;                                     // one pixel along the field
          var home = Math.hypot(x - cx, y - sy) < 2;
          if (home || Math.hypot(x - cx, y - h / 2) > reach) break;
          pts.push([x, y]);
        }
        var rank = i / (ANGLES.length - 1);
        lines.push({ pts: pts, rank: rank });
        // A line that goes out before it comes round has a twin coming in from outside to the south pole: the
        // same line, upside down, run backwards.
        if (!home) lines.push({ pts: pts.map(function (p) { return [p[0], h - p[1]]; }).reverse(), rank: rank });
      });
    });
    traced = { w: w, h: h, lines: lines };
    return lines;
  }

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
    var R = w / 2 * RADIUS, cx = w / 2, mid = h / 2, span = h / 2 * REACH, eye = VIEW * span;
    // Pressed in, a spring can only go as flat as its coils stacked wire on wire: its solid height, TURNS turns of
    // both strands, each as thick as the line. So in the magnet stage each helix keeps that much height.
    var solid = 2 * TURNS * ctx.lineWidth, ct = Math.max(height(t), solid / span);
    // A point a share s of the way from a helix's wide end to its point, on the middle line; dir 1 is the lower helix,
    // -1 its mirror above; the second strand is half a turn round from the first.
    // [x, y on the tile, depth toward us in pixels, nearness of the coil's face from -1 (behind) to 1 (in front)]
    function put(x, y, z, near) {   // squeezed in height, then seen in perspective
      var f = eye / (eye - z);
      return [cx + x * f, mid + y * ct * f, z, near];
    }
    function at(s, off, dir) {
      var a = s * TURNS * 2 * Math.PI - spin + off, k = Math.min(1, 2 * (1 - s));   // k: a cylinder, then narrowing to the point
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
    segs.sort(function (u, v) { return u[2] - v[2]; });
    segs.forEach(function (g) {
      var z = g[3];
      ctx.globalAlpha = (z >= 0 ? 0.55 + z * 0.45 : 0.18 + (1 + z) * 0.37) * L;
      ctx.beginPath(); ctx.moveTo(g[0][0], g[0][1]); ctx.lineTo(g[1][0], g[1][1]); ctx.stroke();
    });
    // The sand. Each grain has a place on the straight line, falling steadily from the top to the bottom, and a place
    // on one of the field lines of a bar magnet standing upright, its north pole above the middle and its south pole as
    // far below, flowing from north to south as it would fall. The more the springs are pressed in, the more of the
    // grains leave the line for their field lines, those nearest the magnet first.
    var lines = field(w, h), pull = Math.max(0, Math.min(1, 1 - ct));
    ctx.fillStyle = ctx.strokeStyle;
    for (var g = 0; g < GRAINS; g++) {
      var r2 = Math.sin(g * 78.233) * 12543.123; r2 -= Math.floor(r2);              // 0..1, fixed per grain
      var n = g % lines.length, line = lines[n], near = line.rank;                   // its field line; 0 nearest
      var u = (t / POUR + g / GRAINS) % 1;
      var lx = cx, ly = (h - 2) * u + 1;                                            // on the straight line
      var f = line.pts[Math.floor(((u + r2) % 1) * (line.pts.length - 1))];          // on its field line
      var k = Math.max(0, Math.min(1, (pull - near * 0.5) / 0.5));
      k = k * k * (3 - 2 * k);
      ctx.globalAlpha = 0.8 * (k + (1 - k) * Math.min(1, u * 10, (1 - u) * 10));   // steady through the blinking
      ctx.beginPath(); ctx.arc(lx + (f[0] - lx) * k, ly + (f[1] - ly) * k, 0.9, 0, 2 * Math.PI); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // The page's clock, so it keeps time with the coin and Sisyphus.
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
