// Time: a coil spring under the sands of time, in step with Sisyphus (ripples.js). Heights are shares of the tile, 0
// at the bottom, 1 at the top; the dotted line across the middle, at 1/2, is only a gag. A phantom spring always
// reaches from the bottom to the top, very faint, fading as it climbs. The real spring stretches up along it as
// Sisyphus pushes the stone up the hill, coming as close to the top as it can just as he reaches the summit; then,
// while the coin blinks and the stone rolls back, it is pressed down, faster and faster, flat onto 0 just as the stone
// reaches the foot, ready for the next push. Sand pours
// from the top to the bottom, steady: one thin line at the top, spreading as it falls. See README.
(function () {
  var canvas = document.querySelector('canvas.helix');
  if (!canvas || !canvas.getContext) return;

  var TURNS = 7;        // turns in each spring
  var RADIUS = 0.42;    // the coil's radius, as a share of half the tile's width
  var PERIOD = 6;       // seconds for one full turn about the axis
  var NEAR = 0.97;      // as close to the top as the real spring comes, at the summit
  var GHOST = 0.28;     // how faint the phantom is at the bottom; it fades to almost nothing at the top
  var VIEW = 6;         // the eye's distance, in tile widths: smaller is stronger perspective
  var STEPS = 360;
  var PAD = 6;          // px kept clear at the top and bottom
  var GRAINS = 70;      // grains of sand in the air at once
  var POUR = 2.4;       // seconds for one grain to go from top to bottom
  var root = document.documentElement;
  // The coin's cycle and flash (dot-coin.js, which loads first); plain ink and a 12 + 3.658 second cycle without it.
  var COIN = window.coinCycle || { ramp: 12, cycle: 15.658 };
  var TRIP = COIN.ramp, CYCLE = COIN.cycle;   // Sisyphus reaches the summit TRIP seconds into each cycle
  var stamina = window.zeroToOneStamina || function () { return 0; };
  var ink = window.zeroToOneInk || function (el) { return { color: getComputedStyle(el).color, alpha: 1 }; };

  // The real spring's height at t seconds: up with Sisyphus, 0 → NEAR; then, through the blink, pressed down onto 0.
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
    // Every short piece of both strands of a spring tall px tall, as [from, to, depth, nearness of the coil's face
    // from -1 (behind) to 1 (in front)]; the second strand is half a turn round from the first.
    function spring(tall) {
      function at(s, off) {
        var a = s * TURNS * 2 * Math.PI - spin + off, z = Math.cos(a) * R, f = eye / (eye - z);
        return [cx + Math.sin(a) * R * f, foot - s * tall, z, Math.cos(a)];
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
    function stroke(segs, alpha, flash) {   // far to near, the far side fainter; alpha(y): how solid at a height
      segs.forEach(function (g) {
        var z = g[3], y = (g[0][1] + g[1][1]) / 2;
        ctx.globalAlpha = (z >= 0 ? 0.55 + z * 0.45 : 0.18 + (1 + z) * 0.37) * (flash ? L : 1) * alpha(y);
        ctx.beginPath(); ctx.moveTo(g[0][0], g[0][1]); ctx.lineTo(g[1][0], g[1][1]); ctx.stroke();
      });
    }
    // The phantom: bottom to top, always, even through the flashing; faint, fading to almost nothing as it climbs.
    stroke(spring(inner), function (y) { var k = (foot - y) / inner; return GHOST * Math.pow(1 - k, 1.6) + 0.03; }, false);
    // The real spring, solid.
    stroke(spring(inner * height(t)), function () { return 1; }, true);
    // The sand: a funnel turned the other way. It starts as one thin line at the top, in the middle, and spreads apart
    // as it falls, faster and faster, to the bottom; steady, untouched by the spring or the flash.
    ctx.fillStyle = ctx.strokeStyle;
    for (var g = 0; g < GRAINS; g++) {
      var seed = Math.sin(g * 12.9898) * 43758.5453, jit = seed - Math.floor(seed);   // 0..1, fixed per grain
      var u = (t / POUR + g / GRAINS) % 1, d = u * u;                                     // falling, faster and faster
      var x = cx + (jit * 2 - 1) * (w / 2 - PAD) * d, y = PAD + inner * d;
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
