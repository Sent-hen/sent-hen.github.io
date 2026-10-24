// The UTC time under the triangle on the home page, as YYYY MM DD HH:MM SS, ticking every second.
(function () {
  var el = document.querySelector('.utc-clock');
  if (!el) return;
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function tick() {
    var d = new Date();
    el.textContent = d.getUTCFullYear() + ' ' + pad(d.getUTCMonth() + 1) + ' ' + pad(d.getUTCDate()) + ' ' +
      pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ' ' + pad(d.getUTCSeconds());
    el.setAttribute('datetime', d.toISOString());
    setTimeout(tick, 1000 - d.getUTCMilliseconds());
  }
  tick();
})();
