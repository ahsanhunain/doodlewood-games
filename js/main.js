/* DoodleWood Games — doodlewoodgames.com */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Fireflies drifting up through the grove */
  if (!reduced) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 14; i++) {
      var f = document.createElement('div');
      f.className = 'fly';
      f.style.left = (Math.random() * 100) + 'vw';
      f.style.top = (30 + Math.random() * 70) + 'vh';
      f.style.animation = 'drift ' + (9 + Math.random() * 8) + 's ' +
                          (Math.random() * 9) + 's ease-in-out infinite';
      frag.appendChild(f);
    }
    document.body.appendChild(frag);
  }

  /* Highlight the nav pill for whichever section is in view */
  var sections = [].slice.call(document.querySelectorAll('section[id]'));
  var buttons = [].slice.call(document.querySelectorAll('.nb'));
  var byId = {};
  buttons.forEach(function (b) {
    var href = b.getAttribute('href') || '';
    if (href.charAt(0) === '#') byId[href.slice(1)] = b;
  });

  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var active = byId[e.target.id];
        if (!active) return;
        buttons.forEach(function (b) { b.classList.remove('on'); });
        active.classList.add('on');
      });
    }, { threshold: 0.35 });
    sections.forEach(function (s) { obs.observe(s); });
  }
})();
