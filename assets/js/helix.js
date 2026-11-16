// Time: two mirrored double helixes, cylinders from the top and the bottom of the tile to 1/4 and 3/4 of the way down,
// then coiling into points that touch on the dotted line across the middle of the tile, in step with Sisyphus (ripples.js) but not tied to him, like the plunger on a pinball table. As he pushes the
// stone up the hill they are drawn back, pressed in toward the middle line, flat on it just as he reaches the summit.
// They stay held there, charged, blinking with the coin, while the stone rolls back down; the moment it reaches the
// foot they are let go, shoot back out toward the top and the bottom, overshoot and wobble, and that kick starts the
// cycle anew. See README.
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
  var root = document.documentElement;
  // The coin's cycle and flash (dot-coin.js, which loads first); plain ink and an 8 + 3.658 second cycle without it.
  var COIN = window.coinCycle || { ramp: 8, cycle: 11.658 };
  var TRIP = COIN.ramp, CYCLE = COIN.cycle;   // Sisyphus reaches the summit TRIP seconds into each cycle
  var stamina = window.zeroToOneStamina || function () { return 0; };
  var ink = window.zeroToOneInk || function (el) { return { color: getComputedStyle(el).color, alpha: 1 }; };

  // How far out the helixes are at t seconds, 1 (full) to 0 (flat on the middle line). Let go as the cycle starts,
  // they shoot out, overshooting and wobbling, while being drawn back in step with the climb, so that they are flat at
  // the summit; they are held there, charged, until the stone is back at the foot.
  function height(t) {
    var s = (t % CYCLE + CYCLE) % CYCLE;
    if (s >= TRIP) return 0;
    var out = 1 - Math.exp(-KICK * s) * Math.cos(WOBBLE * s);   // let go: out, past, and back
    return Math.max(0, Math.min(1.08, (1 - s / TRIP) * out));
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

    var spin = (t / PERIOD) % 1 * 2 * Math.PI, ct = height(t);
    var R = w / 2 * RADIUS, cx = w / 2, mid = h / 2, span = h / 2 * REACH, eye = VIEW * span;
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
