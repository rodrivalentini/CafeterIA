/**
 * CafeterIA — JavaScript principal
 * Navbar sticky, burger menu, scroll suave
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSmoothScroll();
  setActiveNavLink();
  setCurrentYear();
});

/**
 * Navbar sticky con cambio de opacidad al scroll
 */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const burger = document.querySelector('.navbar__burger');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');

  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/**
 * Scroll suave para enlaces internos
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = document.querySelector('.navbar')?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/**
 * Marca el link activo según la página actual
 */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/**
 * Año actual en el footer
 */
function setCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
