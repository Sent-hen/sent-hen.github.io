// The coin under the tiramisu, after the cover of Rick Rubin's The Creative Act: a thick ring with a dot in the
// middle on the front, the same ring with nothing in it on the back, spinning
// about its vertical axis. It starts slow enough to tell the dot face from the blank one, then speeds up until
// the dot looks like it is always there. Each frame is a short exposure, the way an eye or a camera sees a spinning
// coin: as the spin speeds up, one frame covers more of a turn, and at full speed a whole turn, so both faces
// blur together into one steady circle with a dot. Then it starts again, slow (0 → 1).
// It keeps time with the ball in the 0 → 1 drawings (assets/js/ripples.js): the coin spins up while the ball
// travels, reaches the steady dot as the ball reaches 1, and holds it while the ball rests; both restart together.
// Lo (the `still` class on the page) holds the coin face on, dot showing.
(function () {
  var canvas = document.querySelector('canvas.dot-coin');
  if (!canvas || !canvas.getContext) return;

  var SLOW = 0.25;      // turns per second at the start
  var FAST = 14;        // turns per second at full speed
  var RAMP = 8;         // seconds to get from SLOW to FAST: the ball's TRIP in ripples.js
  var HOLD = 3;         // seconds at full speed: the ball's REST in ripples.js
  var FADE = 0.5;       // seconds to fade out at the end and back in at the start
  var CYCLE = RAMP + HOLD;
  var EXPOSURE = 1 / FAST; // one frame's exposure: a whole turn at full speed, a sliver of one when slow
  var SAMPLES = 160;    // poses blended into one frame at full speed; enough that the blur is smooth, not banded
  var RING = 0.9;       // inside of the ring, as a fraction of the coin's radius: a ring a tenth as thick as the radius

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

  // Sharp at the tile's size on any screen; returns the drawing context, set to CSS pixels.
  function fit() {
    var w = canvas.clientWidth, h = canvas.clientHeight, dpr = window.devicePixelRatio || 1;
    var pw = Math.round(w * dpr), ph = Math.round(h * dpr);
    if (canvas.width !== pw || canvas.height !== ph) { canvas.width = pw; canvas.height = ph; }
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
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
    var fade = Math.min(1, t / FADE, (CYCLE - t) / FADE);
    // n poses spread across the exposure, each faint enough that what every pose shares builds to full ink
    f.ctx.globalAlpha = Math.max(0, fade) * (n === 1 ? 1 : Math.min(1, 2.5 / n));
    for (var i = 0; i < n; i++) pose(f, turns(Math.max(0, t - EXPOSURE * i / n)));
  }

  function still() { var f = fit(); f.ctx.globalAlpha = 1; pose(f, 0); }

  // The page's clock, not a start time of its own, so the coin and the ball stay in step.
  var running = false;
  function frame(now) {
    if (!running) return;
    draw((now / 1000) % CYCLE);
    requestAnimationFrame(frame);
  }
  function apply() {
    if (root.classList.contains('still')) { running = false; still(); }
    else if (!running) { running = true; requestAnimationFrame(frame); }
  }
  new MutationObserver(apply).observe(root, { attributes: true, attributeFilter: ['class', 'data-theme'] });
  window.addEventListener('resize', function () { if (!running) still(); });
  apply();
})();
