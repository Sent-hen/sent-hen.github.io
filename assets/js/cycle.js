// The box under "Currently mastering" on the home page: flicks through the words in data-words so fast,
// blurred (style.scss), that they can't be read. Forever.
// Without JavaScript it stays an empty box.
(function () {
  var box = document.querySelector('.cycle-box');
  if (!box) return;
  var words = box.getAttribute('data-words').split('|');
  var i = 0;
  function show() {
    box.textContent = words[i];
    i = (i + 1) % words.length;
  }
  show();
  setInterval(show, 70);   // milliseconds per word
})();
