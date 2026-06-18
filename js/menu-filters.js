/**
 * CafeterIA — Filtros del menú por categoría
 */

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.menu-filters .filter-btn');
  const menuItems = document.querySelectorAll('.menu-grid .menu-card');

  if (!filterBtns.length || !menuItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.filter;

      menuItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = '';
          item.style.animation = 'fadeIn 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});
