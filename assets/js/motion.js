// Flips the golden spiral, the Sierpinski triangle, and the ripple between dark (forward) and light (backward) without restarting them.
// CSS alone would jump to a different frame when animation-direction changes, so the animations always run
// forward in CSS and this script plays them at rate 1 or -1, which keeps the current frame.
(function () {
  var els = document.querySelectorAll('.golden-spiral .zoom, .sierpinski .zoom, .infinity-arrow .ripples .wave');
  if (!els.length || !els[0].getAnimations) return;    // no JS support: the CSS --motion direction still applies
  var LOOPS = 100000;                                  // a backward animation stops at time 0, so start it far from 0

  function apply() {
    var rate = getComputedStyle(document.documentElement).getPropertyValue('--motion').trim() === 'reverse' ? -1 : 1;
    els.forEach(function (el) {
      el.style.animationDirection = 'normal';
      el.getAnimations().forEach(function (a) {
        if (a.playbackRate === rate) return;
        var d = a.effect.getComputedTiming().duration;
        if (rate < 0 && a.currentTime < d * LOOPS) a.currentTime += d * LOOPS;
        a.playbackRate = rate;
      });
    });
  }
  apply();
  new MutationObserver(apply).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', apply);
  }
})();
