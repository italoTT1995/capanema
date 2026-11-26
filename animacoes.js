// Capanema Executive - Animacoes: scroll reveal, lightbox e abas de galeria
document.addEventListener('DOMContentLoaded', () => {

  // Scroll Reveal Animations
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));
  }

  // Lightbox
  const lightbox = document.getElementById('galeria-lightbox');
  const lightboxImg = document.getElementById('galeria-lightbox-img');
  const lightboxCloseBtn = document.getElementById('galeria-lightbox-close');
  const lightboxPrevBtn = document.getElementById('galeria-lightbox-prev');
  const lightboxNextBtn = document.getElementById('galeria-lightbox-next');
  let galeriaCurrentItems = [];
  let galeriaCurrentIndex = 0;

  function openGaleriaLightbox(src, items) {
    if (!lightbox || !lightboxImg) return;
    galeriaCurrentItems = items;
    galeriaCurrentIndex = items.findIndex(i => i.src === src);
    if (galeriaCurrentIndex < 0) galeriaCurrentIndex = 0;
    lightboxImg.src = src;
    lightbox.classList.add('open');
  }

  function closeGaleriaLightbox() {
    if (lightbox) lightbox.classList.remove('open');
  }

  function stepGaleriaLightbox(dir) {
    if (!lightboxImg || !galeriaCurrentItems.length) return;
    galeriaCurrentIndex = (galeriaCurrentIndex + dir + galeriaCurrentItems.length) % galeriaCurrentItems.length;
    lightboxImg.src = galeriaCurrentItems[galeriaCurrentIndex].src;
  }

  document.addEventListener('click', (e) => {
    const galImg = e.target && e.target.closest ? e.target.closest('.galeria-panel img.galeria-img') : null;
    if (galImg) {
      const galleryId = galImg.getAttribute('data-galeria');
      const items = Array.from(document.querySelectorAll('.galeria-panel[data-galeria="' + galleryId + '"] img.galeria-img'))
        .map(img => ({ src: img.getAttribute('src') }))
        .filter(i => i.src);
      openGaleriaLightbox(galImg.getAttribute('src'), items);
      return;
    }
    if (lightbox) {
      if (e.target && e.target.closest) {
        if (e.target.closest('#galeria-lightbox-close')) { closeGaleriaLightbox(); return; }
        if (e.target.closest('#galeria-lightbox-prev')) { stepGaleriaLightbox(-1); return; }
        if (e.target.closest('#galeria-lightbox-next')) { stepGaleriaLightbox(1); return; }
      }
      if (e.target === lightbox) { closeGaleriaLightbox(); return; }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeGaleriaLightbox();
    if (e.key === 'ArrowRight') stepGaleriaLightbox(1);
    if (e.key === 'ArrowLeft') stepGaleriaLightbox(-1);
  });

  // Galeria tabs
  document.querySelectorAll('.galeria-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const id = tab.getAttribute('data-galeria');
      document.querySelectorAll('.galeria-tab').forEach(t => {
        t.classList.remove('bg-gold-gradient', 'text-black', 'border-[#C5A059]', 'shadow-lg');
        t.classList.add('bg-[#141419]', 'text-gray-300', 'border', 'border-white/10', 'hover:border-[#c5a059]/50');
      });
      tab.classList.add('bg-gold-gradient', 'text-black', 'border-[#C5A059]', 'shadow-lg');
      tab.classList.remove('bg-[#141419]', 'text-gray-300', 'border-white/10', 'hover:border-[#c5a059]/50');
      document.querySelectorAll('.galeria-panel').forEach(p => p.classList.remove('active'));
      const panel = document.querySelector('.galeria-panel[data-galeria="' + id + '"]');
      if (panel) panel.classList.add('active');
    });
  });

});
