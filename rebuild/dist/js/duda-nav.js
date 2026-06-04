/**
 * Duda mobile nav / hamburger toggle
 */
(function () {
  const BP = 1024;

  function findHamburger() {
    return document.querySelector('.hamburgerMenu, .dmNavigation, [data-nav-toggle], .mobile-nav-toggle, #hamburger');
  }

  function findNav() {
    return document.querySelector('.dmNavigation, #dmNav, nav.dmNav, .dmHeader nav');
  }

  function init() {
    const ham = findHamburger();
    const nav = findNav();
    if (!ham && !nav) return;

    let open = false;
    const backdrop = document.createElement('div');
    backdrop.className = 'cw-nav-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.appendChild(backdrop);

    function setOpen(v) {
      open = v;
      document.body.classList.toggle('cw-nav-open', open);
      backdrop.classList.toggle('is-visible', open);
      if (ham) ham.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    if (ham) {
      ham.addEventListener('click', (e) => {
        e.preventDefault();
        setOpen(!open);
      });
    }

    backdrop.addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });

    window.matchMedia(`(min-width: ${BP}px)`).addEventListener('change', (e) => {
      if (e.matches) setOpen(false);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
