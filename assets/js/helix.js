// Time: two coil springs and the sands of time, in step with Sisyphus (ripples.js). Heights are shares of the tile, 0 at
// the bottom, 1 at the top, with a dotted line across the middle at 1/2. Both are fixed at the middle line, one
// reaching down, the other up, its mirror. As Sisyphus pushes the stone up the hill they stretch out from the middle,
// coming as close to the bottom and the top as they can just as he reaches the summit; then, while the coin is at full
// speed, blinking, and the stone rolls back, they let go of the ends, flash with the coin, and spring back, faster
// and faster, into the middle, pressed into a flat circle on the line. Sand pours from the top to the bottom,
// steady: on green it comes in wide like a Y, narrowing to the middle line, and falls from there as one thin line; on
// red it falls as one thin line to the middle line and spreads out from there like an upside-down Y. Wherever the
// springs reach, the sand has to pass through them, as through a tube, held inside the coils. See README.
(function () {
  var canvas = document.querySelector('canvas.helix');
  if (!canvas || !canvas.getContext) return;

  var TURNS = 4;        // turns in each spring
  var RADIUS = 0.42;    // the coil's radius, as a share of half the tile's width
  var PERIOD = 4;       // seconds for one full turn about the axis
  var NEAR = 0.97;      // as close to the bottom and the top as the springs reach, at the summit
  var VIEW = 6;         // the eye's distance, in tile widths: smaller is stronger perspective
  var STEPS = 360;
  var PAD = 6;          // px kept clear at the top and bottom
  var GRAINS = 70;      // grains of sand in the air at once
  var POUR = 2.4;       // seconds for one grain to go from top to bottom
  var root = document.documentElement;
  // The coin's cycle and flash (dot-coin.js, which loads first); plain ink and an 8 + 3.658 second cycle without it.
  var COIN = window.coinCycle || { ramp: 8, cycle: 11.658 };
  var TRIP = COIN.ramp, CYCLE = COIN.cycle;   // Sisyphus reaches the summit TRIP seconds into each cycle
  var stamina = window.zeroToOneStamina || function () { return 0; };
  var ink = window.zeroToOneInk || function (el) { return { color: getComputedStyle(el).color, alpha: 1 }; };

  // Each spring's length at t seconds, as a share of half the tile: out with Sisyphus, 0 → NEAR; then, through the
  // blink, pressed back onto 0.
  function height(t) {
    var s = (t % CYCLE + CYCLE) % CYCLE;
    if (s < TRIP) return NEAR * s / TRIP;
    var u = (s - TRIP) / (CYCLE - TRIP);
    return NEAR * (1 - u * u);
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
    var R = w / 2 * RADIUS, cx = w / 2, foot = h - PAD, inner = h - 2 * PAD, eye = VIEW * w;
    // Every short piece of both strands of a spring tall px long, as [from, to, depth, nearness of the coil's face
    // from -1 (behind) to 1 (in front)]; the second strand is half a turn round from the first. base is where it is
    // fixed, dir which way it reaches: 1 down, -1 up.
    function spring(tall, base, dir) {
      function at(s, off) {
        var a = s * TURNS * 2 * Math.PI - spin + off, z = Math.cos(a) * R, f = eye / (eye - z);
        return [cx + Math.sin(a) * R * f, base + dir * s * tall, z, Math.cos(a)];
      }
      var segs = [];
      [0, Math.PI].forEach(function (off) {
        var p = at(0, off);
        for (var i = 1; i <= STEPS; i++) {
          var q = at(i / STEPS, off);
          segs.push([p, q, (p[2] + q[2]) / 2, (p[3] + q[3]) / 2]);
          p = q;
        }
      });
      return segs.sort(function (u, v) { return u[2] - v[2]; });
    }
    // Both springs, far to near, the far side fainter, flashing with the coin while it is at full speed.
    var tall = inner / 2 * height(t), mid = PAD + inner / 2;
    spring(tall, mid, 1).concat(spring(tall, mid, -1)).sort(function (u, v) { return u[2] - v[2]; }).forEach(function (g) {
      var z = g[3];
      ctx.globalAlpha = (z >= 0 ? 0.55 + z * 0.45 : 0.18 + (1 + z) * 0.37) * L;
      ctx.beginPath(); ctx.moveTo(g[0][0], g[0][1]); ctx.lineTo(g[1][0], g[1][1]); ctx.stroke();
    });
    // The sand, falling faster and faster from the top to the bottom, steady, untouched by the springs or the flash.
    // Green: wide at the top like a Y, narrowing to the middle line, then one thin line. Red: one thin line to the
    // middle line, then spreading out like an upside-down Y.
    var red = root.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = ctx.strokeStyle;
    for (var g = 0; g < GRAINS; g++) {
      var seed = Math.sin(g * 12.9898) * 43758.5453, jit = seed - Math.floor(seed);   // 0..1, fixed per grain
      var u = (t / POUR + g / GRAINS) % 1, d = u * u;                                     // falling, faster and faster
      var spread = red ? Math.max(0, 2 * d - 1) : Math.max(0, 1 - 2 * d);                 // 0 on the thin line
      var y = PAD + inner * d, half = (w / 2 - PAD) * spread + 1.2;
      if (Math.abs(y - mid) <= tall) half = Math.min(half, R * 0.8);   // inside the springs: through them, as a tube
      var x = cx + (jit * 2 - 1) * half;
      ctx.globalAlpha = 0.85 * Math.min(1, (1 - u) * 8);                                  // gone as it lands
      ctx.beginPath(); ctx.arc(x, y, 0.9, 0, 2 * Math.PI); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // The page's clock, so it keeps time with the coin and the Sisyphus ball.
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
