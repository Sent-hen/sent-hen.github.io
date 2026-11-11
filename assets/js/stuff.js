// Stuff: a poster with more than one image fades to the next every few seconds, each starting at its own moment.
// It waits while someone is hovering or has tapped it, so the text under it doesn't change while being read.
// Red holds the first image.
(function () {
  var root = document.documentElement;
  [].forEach.call(document.querySelectorAll('.covers li.has-alt'), function (li, n) {
    var imgs = li.querySelectorAll('.cover-stack img');
    var notes = li.querySelectorAll('.cover-meta');
    var at = 0;
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
        else if (!li.matches(':hover, :focus-within')) show((at + 1) % imgs.length);
      }, 6000);
    }, n * 1100);
  });
})();

// The empty box after "Listening to the symphony of" takes you somewhere on this page at random: a poster, scrolled
// to the middle of the screen and focused, so its title shows. Red jumps instead of gliding.
(function () {
  var box = document.querySelector('.stuff-random');
  if (!box) return;
  box.addEventListener('click', function (e) {
    e.preventDefault();
    var all = document.querySelectorAll('.covers .cover-stack');
    if (!all.length) return;
    var pick = all[Math.floor(Math.random() * all.length)];
    var still = document.documentElement.classList.contains('still');
    pick.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'center' });
    pick.focus({ preventScroll: true });
  });
})();
