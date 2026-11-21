// Stuff: a poster with more than one image fades to the next every few seconds, each starting at its own moment.
// It waits while someone is hovering or has just tapped it, so the text under it doesn't change while being read; but
// only for a while after a tap or focus, and not for the hover a touch screen leaves behind after a tap, so it never
// gets stuck until the page is reloaded. Red holds the first image.
(function () {
  var root = document.documentElement;
  var READ = 12000;   // ms a tap or focus holds it
  var mouse = window.matchMedia ? matchMedia('(hover: hover) and (pointer: fine)') : { matches: true };
  [].forEach.call(document.querySelectorAll('.covers li.has-alt'), function (li, n) {
    var imgs = li.querySelectorAll('.cover-stack img');
    var notes = li.querySelectorAll('.cover-meta');
    var at = 0, seen = 0;
    li.addEventListener('focusin', function () { seen = Date.now(); });
    li.addEventListener('pointerdown', function () { seen = Date.now(); });
    function reading() {
      return (mouse.matches && li.matches(':hover')) || (li.matches(':focus-within') && Date.now() - seen < READ);
    }
    function show(next) {
      var old = imgs[at];
      notes[at].classList.remove('on');
      notes[next].classList.add('on');
      imgs[next].classList.add('on');
      at = next;
      // the old image leaves once the new one has faded in over it, so nothing dips in between
      if (next > 0) setTimeout(function () { if (old !== imgs[at]) old.classList.remove('on'); }, 900);
      else [].forEach.call(imgs, function (img) { img.classList.remove('on'); });
    }
    setTimeout(function () {
      setInterval(function () {
        if (root.classList.contains('still')) { if (at) show(0); }
        else if (!reading()) show((at + 1) % imgs.length);
      }, 6000);
    }, n * 1100);
  });
})();

