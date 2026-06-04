/**
 * Duda-style scroll reveal: fadeInUp and related entrance classes.
 */
(function () {
  const REVEAL = ['fadeInUp', 'fadeInDown', 'fadeInLeft', 'fadeInRight', 'fadeIn', 'zoomIn'];

  function isHeroOrNav(el) {
    return !!(
      el.closest('.dmHeader') ||
      el.closest('.flexslider') ||
      el.closest('.dmImageSlider') ||
      el.closest('[data-widget-type="imageSlider"]') ||
      el.closest('.dmHomeSection')
    );
  }

  function pickAnim(el) {
    for (const a of REVEAL) {
      if (el.classList.contains(a)) return a;
    }
    const parent = el.closest('[class*="fadeIn"]');
    if (parent) {
      for (const a of REVEAL) if (parent.classList.contains(a)) return a;
    }
    return 'fadeInUp';
  }

  function prep(el) {
    if (el.dataset.revealReady || isHeroOrNav(el)) return;
    el.dataset.revealReady = '1';
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  }

  function reveal(el) {
    const anim = pickAnim(el);
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.classList.add('revealed', anim);
  }

  const targets = [];
  REVEAL.forEach((cls) => {
    document.querySelectorAll('.' + cls).forEach((el) => {
      if (!el.classList.contains('revealed') && !isHeroOrNav(el)) targets.push(el);
    });
  });
  document.querySelectorAll('[data-anim]').forEach((el) => targets.push(el));

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  targets.forEach(prep);

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        reveal(e.target);
        io.unobserve(e.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
  );
  targets.forEach((el) => io.observe(el));

  /* Hero flexslider */
  function initSlider() {
    const slider = document.querySelector('.flexslider, .dmImageSlider');
    if (!slider || slider.dataset.init) return;
    slider.dataset.init = '1';

    const slides = slider.querySelectorAll('.slides > li');
    slides.forEach((s) => {
      s.style.display = 'block';
      s.style.opacity = '1';
    });
    if (slides.length < 2) return;

    let idx = 0;
    slides.forEach((s, i) => {
      s.style.display = i === 0 ? 'block' : 'none';
      s.style.transition = 'opacity 0.6s ease';
    });

    setInterval(() => {
      slides[idx].style.opacity = '0';
      setTimeout(() => {
        slides[idx].style.display = 'none';
        idx = (idx + 1) % slides.length;
        slides[idx].style.display = 'block';
        requestAnimationFrame(() => {
          slides[idx].style.opacity = '1';
        });
      }, 400);
    }, 5000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSlider);
  else initSlider();
})();
