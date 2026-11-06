// The UTC time above and below the triangle on the About page, as YYYY-MM-DD HH:MM SS UTC, ticking every second.
(function () {
  var els = document.querySelectorAll('.utc-clock');
  if (!els.length) return;
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function tick() {
    var d = new Date();
    var text = d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + ' ' +
      pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ' ' + pad(d.getUTCSeconds()) + ' UTC';
    for (var i = 0; i < els.length; i++) {
      els[i].textContent = text;
      els[i].setAttribute('datetime', d.toISOString());
    }
    setTimeout(tick, 1000 - d.getUTCMilliseconds());
  }
  tick();
})();
