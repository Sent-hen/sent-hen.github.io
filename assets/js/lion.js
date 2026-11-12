// The Lion Capital of Ashoka on the About page, above Time: a 3D scan (by uttamg911 on Polycam) shown with Google's
// <model-viewer>. On green it turns slowly; red holds it as on the coins and notes, facing us, three lions showing.
// Drag to turn it by hand either way.
(function () {
  var mv = document.querySelector('model-viewer.lion');
  if (!mv) return;
  var root = document.documentElement;
  var FRONT = '0deg 80deg auto';
  function apply() {
    if (root.getAttribute('data-theme') === 'dark') {
      mv.removeAttribute('auto-rotate');
      mv.setAttribute('camera-orbit', FRONT);
      if (mv.resetTurntableRotation) mv.resetTurntableRotation(0);
      if (mv.jumpCameraToGoal) mv.jumpCameraToGoal();
    } else {
      mv.setAttribute('auto-rotate', '');
    }
  }
  new MutationObserver(apply).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  apply();
})();
