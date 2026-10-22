// The cake: a slice of cake like the Portal icon (curved back, three dark layers on the cut face,
// a cherry on top), drawn flat in ink on paper with outlines.
// An optical illusion: the slice is rendered once in 3D (ray-traced per pixel, perspective camera),
// then that flat picture spins in the 2D plane forever. Colors are fixed for light and dark.
(function () {
  var canvas = document.getElementById('cake');
  if (!canvas || !canvas.getContext) return;

  var SIZE = 160;                      // CSS pixels; the canvas is square
  var SPEED = 0.55;                    // radians per second (2D spin)
  var POSE = 0.8;                      // which side faces us in the 3D render: curved back left, cut face right, like the icon
  var TILT = -0.52;                    // camera angle: looking down about 30 degrees, like the icon (negative = from above)
  var INK = [16, 15, 15];              // flexoki-black
  var PAPER = [255, 252, 240];         // flexoki-paper

  var N = Math.min(Math.round(SIZE * Math.min(window.devicePixelRatio || 1, 2)), 320);
  canvas.width = N;
  canvas.height = N;
  var ctx = canvas.getContext('2d');
  var img = ctx.createImageData(N, N);
  var ids = new Uint8Array(N * N);
  var LINE = Math.max(1, Math.round(N / 110));   // outline thickness in canvas pixels

  // Slice: wedge of radius R, opening angle W, height 2H; three dark layers on each cut face.
  var R = 1.0, W = 0.72, H = 0.42;
  var BANDS = [[0.17, 0.33], [-0.09, 0.07], [-0.35, -0.19]];
  var sW = Math.sin(W), cW = Math.cos(W);
  var cx = 0.58 * Math.cos(W / 2), cz = 0.58 * Math.sin(W / 2);       // turn around the slice's middle
  var CH = [0.78 * Math.cos(W * 0.5), H + 0.11, 0.78 * Math.sin(W * 0.5)], CR = 0.13;    // cherry
  var VIEW = 0.95;                     // half-width of the view at the cake, in cake units (smaller = bigger cake)
  var DIST = 5;                        // camera distance; smaller = stronger perspective
  var LIFT = 0.12;                     // move the camera a touch so the slice and cherry sit centered
  var PLANES = [[0, 1, 0, H, 1], [0, -1, 0, H, 2], [0, 0, -1, 0, 3], [-sW, 0, cW, 0, 4]];   // n·p <= c

  // Surface ids: 0 background, 1 top, 2 bottom, 3 cut face A, 4 cut face B, 5 curved back,
  // 6 dark layer, 7 cherry, 8 stem. Ink is drawn for 6-8 and along every boundary between ids.
  var hitId = 0, hitT = 1e9;
  function slice(ox, oy, oz, dx, dy, dz) {
    var tIn = -1e9, tOut = 1e9, face = 0, t, den, dist;
    hitId = 0; hitT = 1e9;
    for (var k = 0; k < 4; k++) {
      var n = PLANES[k];
      den = n[0] * dx + n[1] * dy + n[2] * dz;
      dist = n[3] - (n[0] * ox + n[1] * oy + n[2] * oz);
      if (Math.abs(den) < 1e-9) { if (dist < 0) return; continue; }
      t = dist / den;
      if (den < 0) { if (t > tIn) { tIn = t; face = n[4]; } } else if (t < tOut) tOut = t;
    }
    var a = dx * dx + dz * dz, b = 2 * (ox * dx + oz * dz), c = ox * ox + oz * oz - R * R;   // curved back
    if (a > 1e-12) {
      var disc = b * b - 4 * a * c;
      if (disc < 0) return;
      var sq = Math.sqrt(disc), t0 = (-b - sq) / (2 * a), t1 = (-b + sq) / (2 * a);
      if (t0 > tIn) { tIn = t0; face = 5; }
      if (t1 < tOut) tOut = t1;
    } else if (c > 0) return;
    if (tIn >= tOut || tOut < 0) return;
    hitId = face; hitT = tIn;
    if (face === 3 || face === 4) {
      var y = oy + tIn * dy;
      for (var j = 0; j < BANDS.length; j++) if (y > BANDS[j][0] && y < BANDS[j][1]) { hitId = 6; return; }
    }
  }
  function sphere(ox, oy, oz, dx, dy, dz, sx, sy, sz, r) {
    var px = ox - sx, py = oy - sy, pz = oz - sz;
    var b = px * dx + py * dy + pz * dz, c = px * px + py * py + pz * pz - r * r, disc = b * b - c;
    if (disc < 0) return 1e9;
    var t = -b - Math.sqrt(disc);
    return t > 0 ? t : 1e9;
  }
  function stem(ox, oy, oz, dx, dy, dz) {      // the stem: a short bent line of small beads
    var best = 1e9;
    for (var s = 0; s <= 8; s++) {
      var f = s / 8;
      var t = sphere(ox, oy, oz, dx, dy, dz,
        CH[0] - 0.06 * f, CH[1] + CR + 0.2 * f, CH[2] + 0.08 * f * f, 0.02);
      if (t < best) best = t;
    }
    return best;
  }

  // 1. Render the 3D slice once, at a fixed pose, into an offscreen picture with a clear background.
  function render(A) {
    var cA = Math.cos(A), sA = Math.sin(A), cB = Math.cos(TILT), sB = Math.sin(TILT);
    // Perspective camera: eye at (0, LIFT, -DIST) in view space looking along +z, image plane at z = 0.
    // A view-space vector (X, Y, Z) maps to object space by undoing the tilt (around x), then the turn (around y).
    var eyY = LIFT * cB - DIST * sB, eyZ = -LIFT * sB - DIST * cB;
    var ox = -eyZ * sA + cx, oy = eyY, oz = eyZ * cA + cz;
    for (var py = 0; py < N; py++) {
      var v = (0.5 - (py + 0.5) / N) * 2 * VIEW;
      for (var px = 0; px < N; px++) {
        var u = ((px + 0.5) / N - 0.5) * 2 * VIEW;
        var len = Math.sqrt(u * u + v * v + DIST * DIST);
        var X = u / len, Y = v / len, Z = DIST / len;
        var yT = Y * cB + Z * sB, zT = -Y * sB + Z * cB;
        var dx = X * cA - zT * sA, dy = yT, dz = X * sA + zT * cA;
        slice(ox, oy, oz, dx, dy, dz);
        var id = hitId, t = hitT;
        var tc = sphere(ox, oy, oz, dx, dy, dz, CH[0], CH[1], CH[2], CR);
        if (tc < t) { id = 7; t = tc; }
        var ts = stem(ox, oy, oz, dx, dy, dz);
        if (ts < t) { id = 8; }
        ids[py * N + px] = id;
      }
    }
    var data = img.data, minX = N, minY = N, maxX = 0, maxY = 0;
    for (var y = 0; y < N; y++) for (var x = 0; x < N; x++) {
      var i = y * N + x, id0 = ids[i], ink = id0 >= 6, o = i * 4;
      if (!id0) {                                  // background stays transparent so the tile shows through
        var near = false;
        for (var k = 1; k <= LINE && !near; k++) {
          if ((x + k < N && ids[i + k]) || (y + k < N && ids[i + k * N]) || (x - k >= 0 && ids[i - k]) || (y - k >= 0 && ids[i - k * N])) near = true;
        }
        if (!near) { data[o + 3] = 0; continue; }
        ink = true;                                // outline just outside the silhouette
      } else if (!ink) {
        for (var k2 = 1; k2 <= LINE && !ink; k2++) {
          if ((x + k2 < N && ids[i + k2] !== id0) || (y + k2 < N && ids[i + k2 * N] !== id0) ||
              (x - k2 >= 0 && ids[i - k2] !== id0) || (y - k2 >= 0 && ids[i - k2 * N] !== id0)) ink = true;
        }
      }
      var col = ink ? INK : PAPER;
      data[o] = col[0]; data[o + 1] = col[1]; data[o + 2] = col[2]; data[o + 3] = 255;
      if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
    var pic = document.createElement('canvas');
    pic.width = N; pic.height = N;
    pic.getContext('2d').putImageData(img, 0, 0);
    // Spin around the middle of the drawing, scaled so every corner stays inside the tile while it turns.
    var mx = (minX + maxX) / 2, my = (minY + maxY) / 2;
    var reach = Math.hypot((maxX - minX) / 2, (maxY - minY) / 2);
    return { pic: pic, mx: mx, my: my, scale: Math.min(1, (N / 2 - N * 0.06) / reach) };
  }

  var sprite = render(POSE);

  // 2. Spin the flat picture in the plane of the page.
  function frame(time) {
    var a = time / 1000 * SPEED;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = 'rgb(' + PAPER.join(',') + ')';
    ctx.fillRect(0, 0, N, N);
    ctx.translate(N / 2, N / 2);
    ctx.rotate(a);
    ctx.scale(sprite.scale, sprite.scale);
    ctx.drawImage(sprite.pic, -sprite.mx, -sprite.my);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
