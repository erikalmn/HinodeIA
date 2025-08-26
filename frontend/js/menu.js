import { loadPage } from "./router";

// Função para interceptar cliques e usar History API
function setupLinkNavigation(link, route) {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigateTo(route);
  });
}

export async function loadSidebarMenu() {
  try {
    const res = await fetch('/config/routes.json');
    const { sections } = await res.json();
    const container = document.getElementById('accordionSidebarContent');

    for (const section of sections) {
      // Divider
      if (section.divider) {
        const hr = document.createElement('hr');
        hr.className = 'sidebar-divider';
        container.appendChild(hr);
        continue;
      }

      // Heading
      if (section.heading) {
        const heading = document.createElement('div');
        heading.className = 'sidebar-heading';
        heading.textContent = section.heading;
        container.appendChild(heading);
        continue;
      }

      // Item padrão com ícone
      if (section.item) {
        const li = document.createElement('li');
        li.className = 'nav-item';

        const a = document.createElement('a');
        a.className = 'nav-link';
        a.href = `/${section.item.hash}`; // URL limpa sem #
        a.innerHTML = `
          <i class="${section.item.icon}"></i>
          <span>${section.item.label}</span>
        `;

        setupLinkNavigation(a, section.item.hash);
        li.appendChild(a);
        container.appendChild(li);
        continue;
      }

      // Collapse com itens simples e grupos
      if (section.collapse) {
        const { id, icon, label, items, groups } = section.collapse;

        const li = document.createElement('li');
        li.className = 'nav-item';

        const a = document.createElement('a');
        a.className = 'nav-link collapsed';
        a.href = '#';  // Link de toggle, não navega
        a.setAttribute('data-toggle', 'collapse');
        a.setAttribute('data-target', `#${id}`);
        a.setAttribute('aria-expanded', 'false');
        a.setAttribute('aria-controls', id);
        a.innerHTML = `
          <i class="${icon}"></i>
          <span>${label}</span>
        `;

        const collapseDiv = document.createElement('div');
        collapseDiv.className = 'collapse';
        collapseDiv.id = id;
        collapseDiv.setAttribute('aria-labelledby', `heading-${id}`);
        collapseDiv.setAttribute('data-parent', '#accordionSidebar');

        const inner = document.createElement('div');
        inner.className = 'bg-white py-2 collapse-inner rounded';

        // Itens simples
        if (items) {
          for (const item of items) {
            const link = document.createElement('a');
            link.className = 'collapse-item';
            link.href = `/${item.hash}`;  // URL limpa
            link.textContent = item.label;
            setupLinkNavigation(link, item.hash);
            inner.appendChild(link);
          }
        }

        // Grupos
        if (groups) {
          groups.forEach((group, idx) => {
            const h6 = document.createElement('h6');
            h6.className = 'collapse-header';
            h6.textContent = group.header;
            inner.appendChild(h6);

            group.items.forEach(item => {
              const link = document.createElement('a');
              link.className = 'collapse-item';
              link.href = `/${item.hash}`;  // URL limpa
              link.textContent = item.label;
              setupLinkNavigation(link, item.hash);
              inner.appendChild(link);
            });

            if (idx < groups.length - 1) {
              const divider = document.createElement('div');
              divider.className = 'collapse-divider';
              inner.appendChild(divider);
            }
          });
        }

        collapseDiv.appendChild(inner);
        li.appendChild(a);
        li.appendChild(collapseDiv);
        container.appendChild(li);
      }
    }
  } catch (err) {
    console.error('Erro ao carregar o menu:', err.message);
  }
}
function navigateTo(route) {
  history.pushState(null, null, `/${route}`);
  loadPage();
}