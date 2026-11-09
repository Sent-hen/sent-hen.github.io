// The two 0 → 1 drawings on the About page: the Doppler effect on Sisyphus's mountain. The ball is the rock: it is
// pushed up from 0 to 1 (the uptime), growing with the effort, then rolls back down to 0 (the downtime) and the cycle
// starts anew. Going down there are no ripples, only the ball: self-reflection. Spent, the ball and the mountain flash
// like a stamina bar that needs rest, snapping between bright and dim, fast at the top and slower as they recover, and
// back on the ink by the time the ball is at 0.
// It keeps time with the coin above the tiramisu (assets/js/dot-coin.js): both read the page's clock with the same
// TRIP and DOWN, so the coin spins up while the ball climbs and holds its steady dot while the ball rolls back.
// It drops a ripple at the spot it has reached each time the coin finishes a turn, so ripples start far apart and come
// faster as the coin speeds up. Each ripple is a circle around that spot, spreading
// faster than the ball and fading as it goes, so rings pack together ahead of the ball and stretch apart behind it.
// A ring has faded out completely by the time it spreads back to 0, so the trail behind the ball fades into the 0.
// The trip is a crescendo with 0 as its source: ripples and ball start quiet at 0 and build all the way to 1.
// The top drawing shows the rings from above, on the flat. The side drawing shows the mountain: the same rings edge-on,
// with a crest on each, on a slope that starts nearly flat and curves up steeper and steeper, about 1 up for 6 across.
// In the corners, faint like a background, a pair with an arrow between: 0 → 1 at the top left and Y → Z at the bottom
// right of the top drawing, A → B at the top left and 1 → 0 at the bottom right of the side one. Going up every arrow
// points right; going down it flips to point left. The mark the arrow points at is lit, lighting up over BLINK seconds
// as its phase starts, and each rest belongs to the move before it.
// reads as three. An illusion, and the cheapest one: one modulo on the clock the ball already keeps.
// Lo (the `still` class on the page) holds one frame.
(function () {
  var canvases = document.querySelectorAll('canvas.ripples');
  if (!canvases.length || !canvases[0].getContext) return;

  var TRIP = 8;           // seconds for the ball to go from 0 to 1: slow enough to follow. Same as in dot-coin.js
  var DOWN = 3;           // seconds for the ball to roll back from 1 to 0. Same as in dot-coin.js
  var TOP = 1.2;          // seconds the ball rests at the summit before it rolls back. Same as in dot-coin.js
  var BOTTOM = 1.2;       // seconds the ball rests at the foot before it is pushed up again. Same as in dot-coin.js
  var CLEAR = 0.6;        // seconds for the ripples to clear once the ball starts rolling back
  var CYCLE = TRIP + TOP + DOWN + BOTTOM;
  // When the ball drops each ripple, in seconds into the trip: each time the coin finishes a turn (from dot-coin.js,
  // which loads first), or evenly if the coin isn't on the page.
  var DROPS = window.coinTurnTimes || Array.apply(null, Array(16)).map(function (_, j) { return j * TRIP / 16; });
  var SPEED = 1.5;        // ripple speed, as a multiple of the ball's speed; above 1, so rings stay ahead of the ball
  var LIFE = TRIP * 0.5;  // seconds until a ripple has faded out
  var STILL = TRIP * 0.9; // the moment Lo shows: the ball near 1, deep in the crescendo
  var QUIET = 0.1;        // how strong a ripple is at 0; at 1 it is full strength
  var HEIGHT = 20;        // the side wave's height at full strength, in CSS pixels
  var CEILING = 32;       // the side wave levels off below this, in CSS pixels, however many crests overlap
  var WIDTH = 7;          // how wide each crest is, in CSS pixels
  var SLOPE = 1 / 6;      // how high the mountain climbs from 0 to 1, as a share of its width: 2 up for 12 across
  var FOOT = 8;           // space below the foot of the mountain, in CSS pixels, so the ball and the dips stay in view
  var BLINK = 0.25;       // seconds for a corner mark to light up as its phase starts
  var UNLIT = 0.25;       // how faint the unlit corner mark is, as a share of the ink
  var GAP = 11;           // CSS pixels from one corner glyph to the next
  var root = document.documentElement;
  var FONT = '10px ' + (getComputedStyle(root).getPropertyValue('--font-ui').trim() || 'sans-serif');

  // How loud the crescendo is at a point on the way from 0 (0) to 1 (1).
  function loudness(along) { return QUIET + (1 - QUIET) * along; }

  // Where the ball is at time t, from 0 to 1: pushed up steadily for TRIP seconds, a moment's rest at the summit, then
  // rolling back down for DOWN seconds, slow at the top and faster and faster, as things fall, and a moment's rest at
  // the foot before the next push.
  function at(t) {
    var s = t % CYCLE;
    if (s < TRIP) return s / TRIP;
    if (s < TRIP + TOP) return 1;
    var u = (s - TRIP - TOP) / DOWN;
    return u < 1 ? 1 - u * u : 0;
  }

  // Each ripple still alive at time t: where it started, how far it has spread, how strong it still is.
  // Ripples are dropped only on the way up. Once the ball rolls back they clear within CLEAR seconds, and none are
  // left when the next climb starts.
  function ripples(t, w) {
    var speed = w / TRIP * SPEED, list = [], c = Math.floor(t / CYCLE), s = t - c * CYCLE;
    var quiet = s < TRIP ? 1 : Math.max(0, 1 - (s - TRIP) / CLEAR);
    if (!quiet) return list;
    for (var j = 0; j < DROPS.length; j++) {
      var age = s - DROPS[j];
      if (age < 0 || age >= LIFE) continue;
      var left = 1 - age / LIFE, along = DROPS[j] / TRIP;
      var x = along * w, r = speed * age;
      var back = x > 0 ? Math.max(0, 1 - r / x) : 0;   // 1 as it starts, 0 once it has spread back to 0
      list.push({ x: x, r: r, strength: left * left * loudness(along) * back * quiet });
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
    ctx.lineWidth = 0.8;
    return { ctx: ctx, w: w, h: h };
  }

  // The ball's and the mountain's flash at time t and the color for it: the coin's (dot-coin.js, which loads first), so
  // all three flash together while the ball rolls back. Plain ink if the coin isn't on the page.
  var stamina = window.zeroToOneStamina || function () { return 0; };
  var ink = window.zeroToOneInk || function (el) { return { color: getComputedStyle(el).color, alpha: 1 }; };

  function ball(ctx, x, y, along, light) {
    ctx.globalAlpha = light;
    ctx.beginPath();
    ctx.arc(x, y, 1.5 + 2.5 * loudness(along), 0, Math.PI * 2);
    ctx.fill();
  }

  // Whether the ball is going up at time t, and how far that phase's mark has lit up.
  function beat(t) {
    var c = Math.floor(t / CYCLE), s = t - c * CYCLE, up = s < TRIP + TOP;   // each rest belongs to the move before it
    return { up: up, on: Math.min(1, (up ? s : s - TRIP - TOP) / BLINK) };
  }

  // A corner, in the page's own ink and UI font, from (x, y): two marks with an arrow between that points right going
  // up and left going down. The arrow and the mark it points at light up; the other mark stays faint.
  function corner(f, marks, x, y, t) {
    var b = beat(t), lit = b.up ? 1 : 0, on = UNLIT + (1 - UNLIT) * b.on;
    f.ctx.font = FONT;
    f.ctx.textBaseline = 'alphabetic';
    f.ctx.textAlign = 'center';
    f.ctx.fillStyle = getComputedStyle(f.ctx.canvas).color;
    f.ctx.globalAlpha = lit === 0 ? on : UNLIT;
    f.ctx.fillText(marks[0], x, y);
    f.ctx.globalAlpha = on;
    f.ctx.fillText(b.up ? '→' : '←', x + GAP, y);
    f.ctx.globalAlpha = lit === 1 ? on : UNLIT;
    f.ctx.fillText(marks[1], x + 2 * GAP, y);
    f.ctx.globalAlpha = 1;
    f.ctx.textAlign = 'start';
  }

  function drawTop(canvas, t) {
    var f = fit(canvas), mid = f.h / 2;
    ripples(t, f.w).forEach(function (r) {
      f.ctx.globalAlpha = r.strength;
      f.ctx.beginPath();
      f.ctx.arc(r.x, mid, r.r, 0, Math.PI * 2);
      f.ctx.stroke();
    });
    var along = at(t);
    var k = ink(canvas, stamina(t));
    f.ctx.fillStyle = k.color;
    ball(f.ctx, along * f.w, mid, along, k.alpha);
    corner(f, '01', 4, 11, t);                          // top left
    corner(f, 'YZ', f.w - 4 - 2 * GAP, f.h - 3, t);     // bottom right
  }

  function drawSide(canvas, t) {
    var f = fit(canvas), list = ripples(t, f.w);
    // The mountain: from its foot at the bottom left it curves up, steeper and steeper, leaving room for the crests.
    var rise = Math.min(f.w * SLOPE, f.h - FOOT - CEILING);
    function slope(x) { var u = x / f.w; return f.h - FOOT - rise * u * u; }
    function height(x) {
      var y = 0;
      list.forEach(function (r) {
        y += r.strength * (crest(x - r.x - r.r) + crest(x - r.x + r.r));
      });
      return slope(x) - CEILING * Math.tanh(y * HEIGHT / CEILING);
    }
    var k = ink(canvas, stamina(t)), light = k.alpha;
    f.ctx.strokeStyle = f.ctx.fillStyle = k.color;
    f.ctx.globalAlpha = light;
    f.ctx.beginPath();
    for (var x = 0; x <= f.w; x += 1) f.ctx[x ? 'lineTo' : 'moveTo'](x, height(x));
    f.ctx.stroke();
    var along = at(t);
    ball(f.ctx, along * f.w, height(along * f.w), along, light);
    corner(f, 'AB', 4, 11, t);                          // top left
    corner(f, '10', f.w - 4 - 2 * GAP, f.h - 3, t);     // bottom right, under the summit, inside the mountain
  }

  function draw(t) {
    [].forEach.call(canvases, function (c) { (c.getAttribute('data-view') === 'side' ? drawSide : drawTop)(c, t); });
  }

  // The page's clock, not a start time of its own, so the coin and the ball stay in step.
  var running = false;
  function frame(now) {
    if (!running) return;
    draw(now / 1000);
    requestAnimationFrame(frame);
  }
  function apply() {
    if (root.classList.contains('still')) { running = false; draw(STILL); }
    else if (!running) { running = true; requestAnimationFrame(frame); }
  }
  new MutationObserver(apply).observe(root, { attributes: true, attributeFilter: ['class', 'data-theme'] });
  window.addEventListener('resize', function () { if (!running) draw(STILL); });
  apply();
})();
