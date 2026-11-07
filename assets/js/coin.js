// The coin on the Quality of Life page: it lies flat, flips, and lands exactly on its edge, wobbles, and settles.
// It holds there, fades, and the flip begins again. A small 3D model drawn as line art in the page's colors.
// Lo (the `still` class on the page) shows it standing on its edge.
(function () {
  var canvas = document.querySelector('canvas.coin');
  if (!canvas || !canvas.getContext) return;

  var REST = 0.6, FLIGHT = 1.5, SETTLE = 1.9, HOLD = 2, FADE = 0.7;   // seconds in each part of the loop
  var LOOP = REST + FLIGHT + SETTLE + HOLD + FADE;
  var TURNS = 2.25;      // turns in the air; the quarter turn is what stands it on its edge
  var R = 36, T = 8;     // radius and thickness, in the drawing's units (320 wide, 220 tall)
  var APEX = 104;        // how high the flip rises
  var GROUND = 186;      // where the ground is, measured from the top
  var YAW = 0.6, PITCH = 0.3;   // the viewer's angle: a little to the side, a little above
  var STEPS = 48;
  var root = document.documentElement;

  // Coin coordinates to world: lean by `a` about the x axis, then turn by `b` about the vertical.
  function toWorld(p, a, b) {
    var y = p[1] * Math.cos(a) - p[2] * Math.sin(a), z = p[1] * Math.sin(a) + p[2] * Math.cos(a);
    return [p[0] * Math.cos(b) + z * Math.sin(b), y, -p[0] * Math.sin(b) + z * Math.cos(b)];
  }
  // World to screen: x right, y down from the coin's height on the ground, depth toward the viewer.
  function toView(p) {
    var x = p[0] * Math.cos(YAW) + p[2] * Math.sin(YAW), z = -p[0] * Math.sin(YAW) + p[2] * Math.cos(YAW);
    var y = p[1] * Math.cos(PITCH) - z * Math.sin(PITCH), d = p[1] * Math.sin(PITCH) + z * Math.cos(PITCH);
    return [160 + x, GROUND - y, d];
  }
  // How high the center must be for the lowest point of the coin to touch the ground.
  function contact(a) {
    var up = Math.abs(Math.cos(a));
    return R * Math.sqrt(1 - up * up) + T / 2 * up;
  }

  // Where the coin is at time t in the loop: lean a, turn b, height y, and how visible (for the fade).
  function pose(t) {
    var END = Math.PI * 2 * TURNS, a = 0, b = 0, y, alpha = 1;
    if (t < REST) {
      y = contact(0);
    } else if (t < REST + FLIGHT) {
      var s = (t - REST) / FLIGHT;
      a = END * s;
      y = contact(a) + 4 * APEX * s * (1 - s);
    } else {
      var q = t - REST - FLIGHT;       // time since landing; the wobble dies away to exactly upright
      var fade = Math.exp(-2.6 * q) * Math.max(0, 1 - q / SETTLE);
      a = END + 0.3 * fade * Math.cos(11 * q);
      b = 0.5 * fade * Math.sin(7 * q);
      y = contact(a);
      if (t > LOOP - FADE) alpha = (LOOP - t) / FADE;
    }
    return { a: a, b: b, y: y, alpha: alpha };
  }

  function draw(p) {
    var w = canvas.clientWidth, h = canvas.clientHeight, dpr = window.devicePixelRatio || 1;
    var pw = Math.round(w * dpr), ph = Math.round(h * dpr);
    if (canvas.width !== pw || canvas.height !== ph) { canvas.width = pw; canvas.height = ph; }
    var ctx = canvas.getContext('2d'), cs = getComputedStyle(canvas);
    ctx.setTransform(dpr * w / 320, 0, 0, dpr * h / 220, 0, 0);
    ctx.clearRect(0, 0, 320, 220);
    ctx.strokeStyle = cs.color;
    ctx.fillStyle = cs.backgroundColor;
    ctx.lineWidth = 1;
    ctx.lineJoin = 'round';

    function at(x, y, z) {
      var q = toWorld([x, y, z], p.a, p.b);
      q[1] += p.y;
      return toView(q);
    }
    function path(pts, close) {
      ctx.beginPath();
      pts.forEach(function (q, i) { ctx[i ? 'lineTo' : 'moveTo'](q[0], q[1]); });
      if (close) ctx.closePath();
    }
    function ring(y, r) {
      var pts = [];
      for (var i = 0; i < STEPS; i++) { var g = i / STEPS * Math.PI * 2; pts.push(at(r * Math.cos(g), y, r * Math.sin(g))); }
      return pts;
    }
    function facing(a, b, c) {   // does this surface face the viewer? (screen y points down)
      return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
    }

    // the ground, and a shadow that tightens as the coin comes down
    ctx.globalAlpha = 1;
    ctx.setLineDash([2, 3]);
    ctx.beginPath(); ctx.moveTo(20, GROUND); ctx.lineTo(300, GROUND); ctx.stroke();
    ctx.setLineDash([]);
    var lift = Math.max(0, Math.min(1, (p.y - contact(p.a)) / APEX));
    ctx.globalAlpha = p.alpha * (0.5 - 0.35 * lift);
    var rim = R * Math.sqrt(1 - Math.pow(Math.abs(Math.cos(p.a)), 2));
    ctx.beginPath();
    ctx.ellipse(160, GROUND, Math.max(R * Math.abs(Math.cos(p.a)), rim * 0.55) * (1 + 0.5 * lift), 3 + 3 * lift, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = p.alpha;

    // the rim first, then whichever face looks at the viewer; a coin is convex, so nothing else can overlap
    var top = ring(T / 2, R), bottom = ring(-T / 2, R);
    for (var i = 0; i < STEPS; i++) {
      var j = (i + 1) % STEPS, quad = [top[i], top[j], bottom[j], bottom[i]];
      if (facing(quad[0], quad[1], quad[2]) > 0) {
        path(quad, true); ctx.fill();
        ctx.beginPath(); ctx.moveTo(top[i][0], top[i][1]); ctx.lineTo(top[j][0], top[j][1]);
        ctx.moveTo(bottom[i][0], bottom[i][1]); ctx.lineTo(bottom[j][0], bottom[j][1]);
        if (i % 3 === 0) { ctx.moveTo(top[i][0], top[i][1]); ctx.lineTo(bottom[i][0], bottom[i][1]); }   // the reeded edge
        ctx.stroke();
      }
    }
    var showTop = facing(top[0], top[12], top[24]) < 0, y = showTop ? T / 2 : -T / 2, m = showTop ? 1 : -1;
    path(showTop ? top : bottom, true); ctx.fill(); ctx.stroke();
    path(ring(y, R * 0.8), true); ctx.stroke();
    // heads on one side, tails on the other, drawn on the coin so they turn with it
    var marks = showTop
      ? [[[-11, -13], [-11, 13]], [[11, -13], [11, 13]], [[-11, 0], [11, 0]]]    // H
      : [[[-12, -13], [12, -13]], [[0, -13], [0, 13]]];                          // T
    ctx.beginPath();
    marks.forEach(function (seg) {
      var a = at(m * seg[0][0], y, seg[0][1]), b = at(m * seg[1][0], y, seg[1][1]);
      ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]);
    });
    ctx.stroke();
  }

  var running = false, start = 0;
  function frame(now) {
    if (!running) return;
    draw(pose(((now - start) / 1000) % LOOP));
    requestAnimationFrame(frame);
  }
  function apply() {
    if (root.classList.contains('still')) { running = false; draw(pose(LOOP - FADE - 0.1)); }
    else if (!running) { running = true; start = performance.now(); requestAnimationFrame(frame); }
  }
  new MutationObserver(apply).observe(root, { attributes: true, attributeFilter: ['class', 'data-theme'] });
  window.addEventListener('resize', function () { if (!running) draw(pose(LOOP - FADE - 0.1)); });
  apply();
})();
