import { loadingFunctions } from './admin/layout';

document.addEventListener('DOMContentLoaded', () => {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(async el => {
    const src = el.getAttribute('data-include');
    const html = await fetch(src).then(res => res.text());
    el.innerHTML = html;

    if (src === 'partials/sidebar.html') {
      import('/js/menu.js').then(({ loadSidebarMenu }) => {
        loadSidebarMenu();
        loadingFunctions();
      }).catch(console.error);
    }
  });
});