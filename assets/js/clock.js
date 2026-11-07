// The clocks above and below the triangle on the About page, as YYYY-MM-DD HH:MM SS ZONE, ticking every second.
// Each <time> names its zone in data-zone: UTC, the global time, above; Dallas-Fort Worth below (CST or CDT, whichever is in effect).
(function () {
  var els = document.querySelectorAll('.clock');
  if (!els.length) return;
  var formats = [].map.call(els, function (el) {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: el.getAttribute('data-zone'), hourCycle: 'h23', timeZoneName: 'short',
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  });
  function tick() {
    var d = new Date();
    for (var i = 0; i < els.length; i++) {
      var p = {};
      formats[i].formatToParts(d).forEach(function (part) { p[part.type] = part.value; });
      els[i].textContent = p.year + '-' + p.month + '-' + p.day + ' ' + p.hour + ':' + p.minute + ' ' + p.second + ' ' + p.timeZoneName;
      els[i].setAttribute('datetime', d.toISOString());
    }
    setTimeout(tick, 1000 - d.getMilliseconds());
  }
  tick();
})();
