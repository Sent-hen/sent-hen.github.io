// The dot coin above the tiramisu (after The Creative Act's cover): spins up with the 0 → 1 ball, blurs into a steady
// dot, flashes while the ball rolls back, on green and red alike. Shares its clock, stamina() and ink() with
// ripples.js and helix.js. See README.
(function () {
  var canvas = document.querySelector('canvas.dot-coin');
  if (!canvas || !canvas.getContext) return;

  var SLOW = 0.25;      // turns per second at the start
  var FAST = 14;        // turns per second at full speed
  var RAMP = 8;         // seconds to get from SLOW to FAST: the ball's TRIP in ripples.js
  var TOP = 0;          // seconds the ball rests at the summit: TOP in ripples.js
  var ROLL = 3;         // seconds the ball rolls back: DOWN in ripples.js
  var BOTTOM = 0;       // seconds the ball rests at the foot: BOTTOM in ripples.js
  var HOLD = TOP + ROLL + BOTTOM; // seconds at full speed: from the summit until the next push
  var SPENT = TOP + ROLL;         // seconds of flashing: resting at the summit and rolling back; calm at the foot
  var FADE = 0.4;       // seconds to fade back in as each cycle starts
  var CYCLE = RAMP + HOLD;
  var EXPOSURE = 1 / FAST; // one frame's exposure: a whole turn at full speed, a sliver of one when slow
  var SAMPLES = 160;    // poses blended into one frame at full speed; enough that the blur is smooth, not banded
  var RING = 0.9;       // inside of the ring, as a fraction of the coin's radius: a ring a tenth as thick as the radius
  var GAUGE = 1.24;     // the speed gauge's radius, as a multiple of the coin's
  var BLINK_FAST = 4;   // flashes per second as the ball starts rolling back, spent
  var BLINK_SLOW = 1.2; // flashes per second as it reaches 0, recovered
  var SHARP = 8;        // how hard each flash snaps between bright and dim; higher spends less time on the ink between
  var LEAVE = 0.12;     // seconds after the roll back starts before the flashing is at full swing
  var SETTLE = 0.35;    // seconds before the ball is back at 0 that the flashing settles onto the ink
  var DIM = 0.15;       // how faint the dim side of a flash is, as a share of the ink

  var root = document.documentElement;
  var GROWTH = Math.log(FAST / SLOW);

  // Turns per second, and turns made so far, at time t into the cycle: speeding up exponentially, then steady.
  function speed(t) { return t < RAMP ? SLOW * Math.exp(GROWTH * t / RAMP) : FAST; }
  function turns(t) {
    if (t < RAMP) return SLOW * RAMP / GROWTH * (Math.exp(GROWTH * t / RAMP) - 1);
    return SLOW * RAMP / GROWTH * (FAST / SLOW - 1) + FAST * (t - RAMP);
  }

  // When the coin finishes each whole turn while speeding up, in seconds into the cycle. The ball in ripples.js drops
  // a ripple at each one, so the ripples come as the coin turns: far apart at first, closer as it speeds up.
  window.coinTurnTimes = (function () {
    var list = [], whole = Math.floor(turns(RAMP));
    for (var k = 1; k <= whole; k++) list.push(RAMP / GROWTH * Math.log(1 + k * GROWTH / (SLOW * RAMP)));
    return list;
  })();

  // The flash at time t (in seconds, any cycle), from -1 (dim) through 0 (the ink itself) to 1 (bright): 0 while the
  // ball climbs. While it rolls back the coin, the ball and the mountain flash like a stamina bar that needs rest,
  // snapping between bright and dim with little time on the ink between, fast at first and slowing down. They leave the
  // ink almost at once and come back to it only just before the ball is at 0.
  function stamina(t) {
    var s = ((t % CYCLE) + CYCLE) % CYCLE;
    if (s < RAMP || s >= RAMP + SPENT) return 0;
    var d = s - RAMP;
    var flashes = BLINK_FAST * d - (BLINK_FAST - BLINK_SLOW) * d * d / (2 * SPENT);   // flashes so far, slowing evenly
    var swing = Math.tanh(SHARP * Math.cos(flashes * 2 * Math.PI)) / Math.tanh(SHARP);
    return swing * Math.min(1, d / LEAVE, (SPENT - d) / SETTLE);
  }
  window.zeroToOneStamina = stamina;
  window.coinCycle = { ramp: RAMP, cycle: CYCLE };   // helix.js flattens to the coin's edge while it flashes

  // What to draw with for a flash value from stamina(), on an element whose color is the ink: toward the theme's
  // --flash color as it goes bright, and toward faint as it goes dim. Returns a color and an opacity.
  function rgb(s) {
    s = s.trim();
    if (s.charAt(0) === '#') return [1, 3, 5].map(function (i) { return parseInt(s.substr(i, 2), 16); });
    return s.match(/[\d.]+/g).slice(0, 3).map(Number);
  }
  function ink(el, v) {
    var cs = getComputedStyle(el), base = cs.color, flash = cs.getPropertyValue('--flash');
    if (v > 0 && flash) {
      var a = rgb(base), b = rgb(flash);
      return { color: 'rgb(' + a.map(function (x, i) { return Math.round(x + (b[i] - x) * v); }).join(',') + ')', alpha: 1 };
    }
    return { color: base, alpha: 1 + Math.min(0, v) * (1 - DIM) };
  }
  window.zeroToOneInk = ink;

  // Sharp at the tile's size on any screen; returns the drawing context, set to CSS pixels.
  function fit() {
    var box = canvas.getBoundingClientRect(), w = box.width, h = box.height, dpr = window.devicePixelRatio || 1;
    var pw = Math.round(w * dpr), ph = Math.round(h * dpr);
    if (canvas.width !== pw || canvas.height !== ph) { canvas.width = pw; canvas.height = ph; }
    var ctx = canvas.getContext('2d');
    // Clear every device pixel. Clearing in CSS pixels can miss the last column or row when the size rounds up, which
    // Chrome then keeps from frame to frame as a line along the edge.
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, pw, ph);
    ctx.setTransform(pw / w, 0, 0, ph / h, 0, 0);
    ctx.strokeStyle = ctx.fillStyle = getComputedStyle(canvas).color;
    ctx.lineWidth = 1;
    return { ctx: ctx, w: w, h: h };
  }

  // The coin turned by `turn` turns, after the cover of The Creative Act: a thick ring on both faces, a dot in the
  // middle of the front face only. The ring is squashed to as wide as the face shows; edge on, it is a thin bar.
  function pose(f, turn) {
    var c = Math.cos(turn * 2 * Math.PI), x = f.w / 2, y = f.h / 2, R = Math.min(f.w, f.h) * 0.34;
    var squash = Math.max(Math.abs(c), 0.03);
    f.ctx.beginPath();
    f.ctx.ellipse(x, y, R * squash, R, 0, 0, Math.PI * 2);
    f.ctx.ellipse(x, y, R * RING * squash, R * RING, 0, 0, Math.PI * 2);
    f.ctx.fill('evenodd');
    if (c > 0) {
      f.ctx.beginPath();
      f.ctx.ellipse(x, y, R * 0.13 * squash, R * 0.13, 0, 0, Math.PI * 2);
      f.ctx.fill();
    }
  }

  function draw(t) {
    var f = fit();
    var n = Math.max(1, Math.ceil(SAMPLES * speed(t) / FAST));
    var fade = Math.min(1, t / FADE), k = ink(canvas, stamina(t)), light = k.alpha;
    f.ctx.strokeStyle = f.ctx.fillStyle = k.color;
    // n poses spread across the exposure, each faint enough that what every pose shares builds to full ink
    f.ctx.globalAlpha = Math.max(0, fade) * light * (n === 1 ? 1 : Math.min(1, 2.5 / n));
    for (var i = 0; i < n; i++) pose(f, turns(Math.max(0, t - EXPOSURE * i / n)));
    // The speed gauge: an arc from the top, clockwise, as far round as the coin is toward top speed; a full circle at it.
    var R = Math.min(f.w, f.h) * 0.34, share = Math.min(1, t / RAMP);
    f.ctx.globalAlpha = Math.max(0, fade) * light;
    f.ctx.lineWidth = 1.5;
    f.ctx.beginPath();
    f.ctx.arc(f.w / 2, f.h / 2, R * GAUGE, -Math.PI / 2, -Math.PI / 2 + share * 2 * Math.PI);
    f.ctx.stroke();
  }

  function still() { var f = fit(); f.ctx.globalAlpha = 1; pose(f, 0); }

  // The page's clock, not a start time of its own, so the coin and the ball stay in step.
  var running = false;
  var calm = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  function frame(now) {
    if (!running) return;
    draw((now / 1000) % CYCLE);
    requestAnimationFrame(frame);
  }
  function apply() {
    if (calm.matches) { running = false; still(); }
    else if (!running) { running = true; requestAnimationFrame(frame); }
  }
  new MutationObserver(apply).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  if (calm.addEventListener) calm.addEventListener('change', apply);
  window.addEventListener('resize', function () { if (!running) still(); });
  apply();
})();
