// The two 0 → 1 drawings on the About page: the Doppler effect. A ball travels from 0 to 1, then starts again at 0.
// It drops a ripple every EMIT seconds at the spot it has reached. Each ripple is a circle around that spot, spreading
// faster than the ball and fading as it goes, so rings pack together ahead of the ball and stretch apart behind it.
// The trip is a crescendo with 0 as its source: ripples and ball start quiet at 0 and build all the way to 1.
// The top drawing shows the rings from above. The side drawing shows the same rings edge-on, with a crest on each.
// Lo (the `still` class on the page) holds one frame.
(function () {
  var canvases = document.querySelectorAll('canvas.ripples');
  if (!canvases.length || !canvases[0].getContext) return;

  var TRIP = 6;           // seconds for the ball to go from 0 to 1
  var PER_TRIP = 15;      // ripples the ball drops on each trip
  var EMIT = TRIP / PER_TRIP;
  var SPEED = 1.5;        // ripple speed, as a multiple of the ball's speed; above 1, so rings stay ahead of the ball
  var LIFE = TRIP * 0.6;  // seconds until a ripple has faded out; short, so the last trip's peak clears before 0 builds again
  var STILL = TRIP * 1.8; // the moment Lo shows: the ball near 1, deep in the crescendo
  var QUIET = 0.1;        // how strong a ripple is at 0; at 1 it is full strength
  var HEIGHT = 20;        // the side wave's height at full strength, in CSS pixels
  var CEILING = 32;       // the side wave levels off below this, in CSS pixels, however many crests overlap
  var WIDTH = 7;          // how wide each crest is, in CSS pixels

  var root = document.documentElement;

  // How loud the crescendo is at a point on the way from 0 (0) to 1 (1).
  function loudness(along) { return QUIET + (1 - QUIET) * along; }

  // Each ripple still alive at time t: where it started, how far it has spread, how strong it still is.
  function ripples(t, w) {
    var speed = w / TRIP * SPEED, list = [];
    for (var k = Math.floor(t / EMIT); k >= 0 && k * EMIT > t - LIFE; k--) {
      var left = 1 - (t - k * EMIT) / LIFE;
      var along = (k % PER_TRIP) / PER_TRIP;
      list.push({ x: along * w, r: speed * (t - k * EMIT), strength: left * left * loudness(along) });
    }
    return list;
  }

  // One crest with a small dip either side, centered on d = 0.
  function crest(d) {
    var u = d / WIDTH;
    return Math.exp(-u * u) * Math.cos(u * 2.4);
  }

  // Sharp at the tile's size on any screen; returns the drawing context, set to CSS pixels.
  function fit(canvas) {
    var w = canvas.clientWidth, h = canvas.clientHeight, dpr = window.devicePixelRatio || 1;
    var pw = Math.round(w * dpr), ph = Math.round(h * dpr);
    if (canvas.width !== pw || canvas.height !== ph) { canvas.width = pw; canvas.height = ph; }
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = ctx.fillStyle = getComputedStyle(canvas).color;
    ctx.lineWidth = 0.8;
    return { ctx: ctx, w: w, h: h };
  }

  function ball(ctx, x, y, along) {
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(x, y, 1.5 + 2.5 * loudness(along), 0, Math.PI * 2);
    ctx.fill();
  }

  function drawTop(canvas, t) {
    var f = fit(canvas), mid = f.h / 2;
    ripples(t, f.w).forEach(function (r) {
      f.ctx.globalAlpha = r.strength;
      f.ctx.beginPath();
      f.ctx.arc(r.x, mid, r.r, 0, Math.PI * 2);
      f.ctx.stroke();
    });
    var along = (t % TRIP) / TRIP;
    ball(f.ctx, along * f.w, mid, along);
  }

  function drawSide(canvas, t) {
    var f = fit(canvas), mid = f.h / 2, list = ripples(t, f.w);
    function height(x) {
      var y = 0;
      list.forEach(function (r) {
        y += r.strength * (crest(x - r.x - r.r) + crest(x - r.x + r.r));
      });
      return mid - CEILING * Math.tanh(y * HEIGHT / CEILING);
    }
    f.ctx.globalAlpha = 1;
    f.ctx.beginPath();
    for (var x = 0; x <= f.w; x += 1) f.ctx[x ? 'lineTo' : 'moveTo'](x, height(x));
    f.ctx.stroke();
    var along = (t % TRIP) / TRIP;
    ball(f.ctx, along * f.w, height(along * f.w), along);
  }

  function draw(t) {
    [].forEach.call(canvases, function (c) { (c.getAttribute('data-view') === 'side' ? drawSide : drawTop)(c, t); });
  }

  // Start one trip in, so the first frame already has ripples on it.
  var running = false, start = 0;
  function frame(now) {
    if (!running) return;
    draw((now - start) / 1000 + TRIP);
    requestAnimationFrame(frame);
  }
  function apply() {
    if (root.classList.contains('still')) { running = false; draw(STILL); }
    else if (!running) { running = true; start = performance.now(); requestAnimationFrame(frame); }
  }
  new MutationObserver(apply).observe(root, { attributes: true, attributeFilter: ['class', 'data-theme'] });
  window.addEventListener('resize', function () { if (!running) draw(STILL); });
  apply();
})();
