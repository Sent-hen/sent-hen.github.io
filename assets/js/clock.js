// The clocks above and below the helix on the About page, as YYYY-MM-DD HH:MM SS ZONE, ticking every second.
// Above, UTC, the time the world keeps; below, TAI, International Atomic Time, the time the atomic clocks keep, with no
// leap seconds. TAI is UTC plus 37 seconds, since the leap second at the end of 2016; IERS Bulletin C announces any
// new one about six months ahead. If one is added, raise TAI_UTC by one.
(function () {
  var els = document.querySelectorAll('.clock');
  if (!els.length) return;
  var TAI_UTC = 37;   // seconds TAI is ahead of UTC
  var fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC', hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
  function tick() {
    var now = Date.now();
    for (var i = 0; i < els.length; i++) {
      var zone = els[i].getAttribute('data-zone'), d = new Date(now + (zone === 'TAI' ? TAI_UTC * 1000 : 0)), p = {};
      fmt.formatToParts(d).forEach(function (part) { p[part.type] = part.value; });
      els[i].textContent = p.year + '-' + p.month + '-' + p.day + ' ' + p.hour + ':' + p.minute + ' ' + p.second + ' ' + zone;
      els[i].setAttribute('datetime', d.toISOString());
    }
    setTimeout(tick, 1000 - now % 1000 + 5);   // the next whole second, on both clocks at once
  }
  tick();
})();
