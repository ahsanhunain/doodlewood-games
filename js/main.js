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

  /* Contact form — posts to Web3Forms, no page reload */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  if (form && note) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var key = form.querySelector('[name="access_key"]').value;
      if (!key || key.indexOf('REPLACE_') === 0) {
        note.className = 'fnote bad';
        note.innerHTML = 'The form is not connected yet. Email ' +
          '<a href="mailto:ahsanhunain322@gmail.com">ahsanhunain322@gmail.com</a> for now.';
        return;
      }

      var btn = form.querySelector('.fsend');
      var original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sending...';
      note.className = 'fnote';
      note.textContent = '';

      var payload = Object.fromEntries(new FormData(form).entries());

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
        .then(function (res) {
          if (res.ok && res.d.success) {
            form.reset();
            note.className = 'fnote ok';
            note.textContent = 'Message sent. We will reply within one business day.';
          } else {
            throw new Error(res.d && res.d.message ? res.d.message : 'send failed');
          }
        })
        .catch(function () {
          note.className = 'fnote bad';
          note.innerHTML = 'Could not send. Email <a href="mailto:ahsanhunain322@gmail.com">' +
                           'ahsanhunain322@gmail.com</a> instead.';
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = original;
        });
    });
  }

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
