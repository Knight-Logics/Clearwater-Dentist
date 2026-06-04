/** Clearwater Dentist replica — site hooks (CRM form, tracking placeholders) */
(function () {
  /* Sticky header shadow on scroll */
  const header = document.querySelector('.dmHeader');
  if (header) {
    window.addEventListener(
      'scroll',
      () => header.classList.toggle('is-scrolled', window.scrollY > 8),
      { passive: true }
    );
  }

  /* Phone click tracking placeholder — wire to GA4/GTM on deploy */
  document.querySelectorAll('a[href^="tel:"]').forEach((a) => {
    a.addEventListener('click', () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'phone_click', phone: a.getAttribute('href') });
    });
  });

  /* Booking click tracking */
  document.querySelectorAll('a[href*="dentrixascend"], a[href*="getweave"]').forEach((a) => {
    a.addEventListener('click', () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'booking_click', href: a.getAttribute('href') });
    });
  });
})();
