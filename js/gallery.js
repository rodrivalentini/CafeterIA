/**
 * CafeterIA — Galería con filtros y lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilters();
  initLightbox();
});

function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-grid .gallery-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.filter;

      galleryItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const lightboxCaption = lightbox.querySelector('.lightbox__caption');
  const closeBtn = lightbox.querySelector('.lightbox__close');

  document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.gallery-card__img');
      const title = card.querySelector('.gallery-card__title')?.textContent || '';
      const desc = card.querySelector('.gallery-card__desc')?.textContent || '';

      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = `${title} — ${desc}`;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}
