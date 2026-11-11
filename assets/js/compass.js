// The compass on the About page, above Time, after the Lion Capital on Indian coins and rupee notes: four lions back
// to back, facing N, E, S, and W, on a round drum. Here each lion is a point of a four-point star, lying flat and
// extruded upward into a solid, set on the drum, the whole spinning about its upright axis. As on the notes it is seen
// from the front, at about eye level, so no more than three show at once: anything turned far enough away is hidden
// behind. On the drum, under each lion, a small wheel. Red (the `still` class on the page) holds it as on the notes:
// N facing us, E and W in profile, S hidden.
(function () {
  var canvas = document.querySelector('canvas.compass');
  if (!canvas || !canvas.getContext) return;

  var PERIOD = 12;         // seconds for one turn
  var WAIST = 0.36;        // the corners between the points, as a share of a point's reach
  var TALL = 0.55;         // the star's height, extruded upward
  var DRUM = 0.82;         // the drum's radius
  var DRUM_H = 0.34;       // the drum's height, below the star
  var TILT = 0.12;         // how far we look down on it, in radians
  var VIEW = 5;            // the eye's distance, in reaches: smaller is stronger perspective
  var MARKS = ['N', 'E', 'S', 'W'];
  var root = document.documentElement;
  var FONT = getComputedStyle(root).getPropertyValue('--font-ui').trim() || 'sans-serif';

  function draw(t) {
    var box = canvas.getBoundingClientRect(), w = box.width, h = box.height, dpr = window.devicePixelRatio || 1;
    var pw = Math.round(w * dpr), ph = Math.round(h * dpr);
    if (canvas.width !== pw || canvas.height !== ph) { canvas.width = pw; canvas.height = ph; }
    var ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, pw, ph);
    ctx.setTransform(pw / w, 0, 0, ph / h, 0, 0);
    ctx.strokeStyle = ctx.fillStyle = getComputedStyle(canvas).color;
    ctx.lineWidth = 0.8;
    ctx.lineJoin = 'round';

    var turn = (t / PERIOD) % 1 * 2 * Math.PI;
    var R = Math.min(w, h) * 0.3, cx = w / 2, cy = h / 2 + R * 0.05;
    var ct = Math.cos(TILT), st = Math.sin(TILT);
    // A point at angle a (0 toward us, clockwise seen from above), reach r, height y (up): [x, y, nearness]
    function at(a, r, y) {
      var b = a + turn, x = Math.sin(b) * r, z = Math.cos(b) * r;   // z toward us
      var yy = y * ct - z * st, zz = z * ct + y * st, f = VIEW / (VIEW - zz);
      return [cx + x * R * f, cy - yy * R * f, zz];
    }
    function seg(p, q, alpha) {
      ctx.globalAlpha = alpha;
      ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke();
    }
    // How strongly a part shows, from how near it is: the far side fades behind.
    // Anything turned more than about a third of the way back is hidden, so at most three points ever show.
    function shade(z) { return z < -0.35 ? 0 : Math.max(0.15, Math.min(1, 0.6 + z * 0.8)); }

    // The drum: its top and bottom rims, its two sides, and a small wheel under each lion.
    var N = 48;
    for (var rim = 0; rim < 2; rim++) {
      var y = rim ? 0 : -DRUM_H;
      for (var i = 0; i < N; i++) {
        var p = at(i / N * 2 * Math.PI, DRUM, y), q = at((i + 1) / N * 2 * Math.PI, DRUM, y);
        seg(p, q, rim ? shade((p[2] + q[2]) / 2) : (p[2] + q[2] > 0 ? 0.9 : 0));
      }
    }
    // the drum's sides: where it turns away from us, straight up from the bottom rim to the top
    [-1, 1].forEach(function (side) {
      var a = side * Math.PI / 2 - turn;
      seg(at(a, DRUM, -DRUM_H), at(a, DRUM, 0), 0.9);
    });
    for (var k = 0; k < 4; k++) {
      var a = k * Math.PI / 2, c = at(a, DRUM, -DRUM_H / 2);
      if (c[2] < 0.05) continue;   // only the wheels on the near side
      var rr = R * DRUM_H * 0.32, squash = Math.abs(Math.cos(a + turn));
      ctx.globalAlpha = shade(c[2]);
      ctx.beginPath();
      ctx.ellipse(c[0], c[1], Math.max(0.5, rr * squash), rr, 0, 0, Math.PI * 2);
      for (var s = 0; s < 4; s++) {
        var u = s * Math.PI / 4;
        ctx.moveTo(c[0] + Math.cos(u) * rr * squash, c[1] + Math.sin(u) * rr);
        ctx.lineTo(c[0] - Math.cos(u) * rr * squash, c[1] - Math.sin(u) * rr);
      }
      ctx.stroke();
    }

    // The star: four points facing N E S W, with a waist corner between each, extruded upward.
    var pts = [];
    for (var j = 0; j < 8; j++) pts.push({ a: j * Math.PI / 4, r: j % 2 ? WAIST : 1 });
    var base = pts.map(function (p) { return at(p.a, p.r, 0); });
    var top = pts.map(function (p) { return at(p.a, p.r, TALL); });
    var mid = at(0, 0, TALL);
    for (j = 0; j < 8; j++) {
      var n = (j + 1) % 8;
      seg(base[j], base[n], Math.min(shade(base[j][2]), shade(base[n][2])) * 0.8);
      seg(base[j], top[j], shade(base[j][2]));
      seg(top[j], top[n], Math.min(shade(top[j][2]), shade(top[n][2])));
      if (j % 2 === 0) seg(mid, top[j], shade(top[j][2]) * 0.7);   // a ridge along each point, from the center
    }

    // The marks, just past each point, fading as it turns away.
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '9px ' + FONT;
    for (var m = 0; m < 4; m++) {
      var q2 = at(m * Math.PI / 2, 1.18, TALL / 2);
      ctx.globalAlpha = shade(q2[2]);
      ctx.fillText(MARKS[m], q2[0], q2[1]);
    }
    ctx.globalAlpha = 1;
  }

  // The page's clock, so it keeps time with the coin and the ball.
  var running = false;
  function frame(now) {
    if (!running) return;
    draw(now / 1000);
    requestAnimationFrame(frame);
  }
  function apply() {
    if (root.classList.contains('still')) { running = false; draw(0); }
    else if (!running) { running = true; requestAnimationFrame(frame); }
  }
  new MutationObserver(apply).observe(root, { attributes: true, attributeFilter: ['class', 'data-theme'] });
  window.addEventListener('resize', function () { if (!running) draw(0); });
  apply();
})();
