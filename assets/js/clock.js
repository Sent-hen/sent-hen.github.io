// The clocks above and below the helix on the About page, as YYYY-MM-DD HH:MM SS ZONE, ticking every second.
// Above, UTC, the time the world keeps; below, UT1, the time the Earth keeps by its turning. UT1 is UTC plus DUT1,
// under a second either way, from IERS Bulletin A (5 November 2026): -0.0661 s on MJD 61356 (12 November 2026),
// drifting about -0.00044 s a day. Update DUT1_AT and DUT1_RATE from a new bulletin now and then.
(function () {
  var els = document.querySelectorAll('.clock');
  if (!els.length) return;
  var DUT1_MJD = 61356, DUT1_AT = -0.0661, DUT1_RATE = -0.00044;
  var fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC', hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
  function dut1(ms) {   // seconds UT1 is ahead of UTC
    var mjd = ms / 86400000 + 40587;
    return Math.max(-0.9, Math.min(0.9, DUT1_AT + DUT1_RATE * (mjd - DUT1_MJD)));
  }
  function offset(el) { return el.getAttribute('data-zone') === 'UT1' ? dut1(Date.now()) * 1000 : 0; }
  function tick() {
    var now = Date.now(), next = 1000;
    for (var i = 0; i < els.length; i++) {
      var off = offset(els[i]), d = new Date(now + off), p = {};
      fmt.formatToParts(d).forEach(function (part) { p[part.type] = part.value; });
      els[i].textContent = p.year + '-' + p.month + '-' + p.day + ' ' + p.hour + ':' + p.minute + ' ' + p.second + ' ' + els[i].getAttribute('data-zone');
      els[i].setAttribute('datetime', d.toISOString());
      next = Math.min(next, 1000 - (((now + off) % 1000) + 1000) % 1000);   // the next second on either clock
    }
    setTimeout(tick, next + 5);
  }
  tick();
})();
