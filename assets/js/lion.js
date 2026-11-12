// The Lion Capital of Ashoka: a 3D scan (uttamg911, Polycam) in Google's <model-viewer>, which loads only as the tile
// nears the screen. Drag it any way, about any axis (a virtual trackball: drag across the middle to tip and turn it,
// round the rim to roll it); let go and it keeps the spin you gave it.
// Friction eases that spin back to the base state, a slow turn about the upright axis, and gravity stands it back up:
// on green the base turn runs right to left, on red left to right.
(function () {
  var mv = document.querySelector('model-viewer.lion');
  if (!mv) return;
  var root = document.documentElement;
  var LIB = 'https://cdn.jsdelivr.net/npm/@google/model-viewer@3.5.0/dist/model-viewer.min.js';
  var BASE = 20 * Math.PI / 180;   // the base state: radians per second about the upright axis (+ is left to right)
  var FRICTION = 1.2;              // how fast a spin eases back to the base (per second)
  var GRAVITY = 6;                 // how hard it is stood back up (per second squared)
  var calm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Rotation as a quaternion [x, y, z, w]; spin as an angular velocity [x, y, z] in radians per second, in view space
  // (x right, y up, z toward us), which is the world here: the camera stays put in front.
  function base() { return calm ? 0 : root.getAttribute('data-theme') === 'dark' ? BASE : -BASE; }
  var q = [0, 0, 0, 1], w = [0, base(), 0];
  function mul(a, b) {
    return [a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1], a[3] * b[1] - a[0] * b[2] + a[1] * b[3] + a[2] * b[0],
            a[3] * b[2] + a[0] * b[1] - a[1] * b[0] + a[2] * b[3], a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2]];
  }
  function turn(v, dt) {   // q turned by angular velocity v for dt seconds
    var n = Math.hypot(v[0], v[1], v[2]), a = n * dt;
    if (a < 1e-9) return;
    var s = Math.sin(a / 2) / n, r = mul([v[0] * s, v[1] * s, v[2] * s, Math.cos(a / 2)], q);
    var m = Math.hypot(r[0], r[1], r[2], r[3]);
    q = [r[0] / m, r[1] / m, r[2] / m, r[3] / m];
  }
  // model-viewer takes "roll pitch yaw", applied as a three.js Euler (pitch, yaw, roll) in 'YXZ' order.
  function show() {
    var x = q[0], y = q[1], z = q[2], s = q[3];
    var m13 = 2 * (x * z + y * s), m23 = 2 * (y * z - x * s), m33 = 1 - 2 * (x * x + y * y);
    var m21 = 2 * (x * y + z * s), m22 = 1 - 2 * (x * x + z * z), m31 = 2 * (x * z - y * s), m11 = 1 - 2 * (y * y + z * z);
    var pitch = Math.asin(-Math.max(-1, Math.min(1, m23))), yaw, roll;
    if (Math.abs(m23) < 0.9999999) { yaw = Math.atan2(m13, m33); roll = Math.atan2(m21, m22); }
    else { yaw = Math.atan2(-m31, m11); roll = 0; }
    var d = 180 / Math.PI;
    mv.setAttribute('orientation', (roll * d).toFixed(3) + 'deg ' + (pitch * d).toFixed(3) + 'deg ' + (yaw * d).toFixed(3) + 'deg');
  }

  // The trackball: a point on the tile, as a point on a ball filling it.
  var held = null, last = 0;
  function ball(e) {
    var b = mv.getBoundingClientRect(), x = (e.clientX - b.left) / b.width * 2 - 1, y = 1 - (e.clientY - b.top) / b.height * 2;
    var r = x * x + y * y;
    return r < 1 ? [x, y, Math.sqrt(1 - r)] : [x / Math.sqrt(r), y / Math.sqrt(r), 0];
  }
  mv.addEventListener('pointerdown', function (e) {
    held = ball(e); last = e.timeStamp; w = [0, 0, 0];
    mv.setPointerCapture(e.pointerId);
  });
  mv.addEventListener('pointermove', function (e) {
    if (!held) return;
    var p = ball(e), dt = Math.max(1e-3, (e.timeStamp - last) / 1000);
    var ax = [held[1] * p[2] - held[2] * p[1], held[2] * p[0] - held[0] * p[2], held[0] * p[1] - held[1] * p[0]];
    var n = Math.hypot(ax[0], ax[1], ax[2]);
    if (n > 1e-9) {
      var a = Math.atan2(n, held[0] * p[0] + held[1] * p[1] + held[2] * p[2]), f = a / dt / n;
      var v = [ax[0] * f, ax[1] * f, ax[2] * f];
      turn(v, dt);
      w = [w[0] * 0.5 + v[0] * 0.5, w[1] * 0.5 + v[1] * 0.5, w[2] * 0.5 + v[2] * 0.5];   // the fling, smoothed
    }
    held = p; last = e.timeStamp;
  });
  function release(e) {
    if (!held) return;
    if (e.timeStamp - last > 80) w = [0, 0, 0];   // held still before letting go: no fling
    held = null;
  }
  mv.addEventListener('pointerup', release);
  mv.addEventListener('pointercancel', release);

  var then = 0;
  function frame(now) {
    var dt = then ? Math.min(0.05, (now - then) / 1000) : 0;
    then = now;
    if (!held && dt) {
      var b0 = base(), k = Math.exp(-FRICTION * dt);
      w = [w[0] * k, b0 + (w[1] - b0) * k, w[2] * k];
      // gravity: turn the model's up toward the world's up, harder the further it leans
      var x = q[0], y = q[1], z = q[2], s = q[3];
      var u = [2 * (x * y - z * s), 1 - 2 * (x * x + z * z), 2 * (y * z + x * s)];
      var ax = [-u[2], 0, u[0]], n = Math.hypot(ax[0], ax[2]), lean = Math.acos(Math.max(-1, Math.min(1, u[1])));
      if (n < 1e-6 && u[1] < 0) { ax = [1, 0, 0]; n = 1; }
      if (n > 1e-6) { w[0] += GRAVITY * lean * ax[0] / n * dt; w[2] += GRAVITY * lean * ax[2] / n * dt; }
      turn(w, dt);
    }
    show();
    requestAnimationFrame(frame);
  }

  function load() {
    var s = document.createElement('script');
    s.type = 'module'; s.src = LIB;
    document.head.appendChild(s);
    requestAnimationFrame(frame);
  }
  if (!('IntersectionObserver' in window)) return load();
  var io = new IntersectionObserver(function (e) {
    if (e[0].isIntersecting) { io.disconnect(); load(); }
  }, { rootMargin: '400px' });
  io.observe(mv);
})();
