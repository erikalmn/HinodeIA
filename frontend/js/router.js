let routes = {};
const allScripts = import.meta.glob('/src/pages/**/*.js', { eager: false });

async function loadRoutes() {
  const res = await fetch('config/routes.json');
  const data = await res.json();

  for (const section of data.sections) {
    if (section.item) {
      const { hash, path } = section.item;
      if (hash && path) {
        routes[hash] = path;
      }
    } else if (section.collapse) {
      if (section.collapse.items) {
        for (const item of section.collapse.items) {
          const { hash, path } = item;
          if (hash && path) {
            routes[hash] = path;
          }
        }
      }
      if (section.collapse.groups) {
        for (const group of section.collapse.groups) {
          for (const item of group.items) {
            const { hash, path } = item;
            if (hash && path) {
              routes[hash] = path;
            }
          }
        }
      }
    }
  }

  await loadPage();
}

const pageCache = new Map();

function clearDynamicScripts() {
  document.querySelectorAll('script[data-dynamic]').forEach(s => s.remove());
}

async function loadScriptsFromFolder(folderPath) {
  clearDynamicScripts();

  for (const scriptPath in allScripts) {
    if (scriptPath.startsWith(folderPath)) {
      const script = document.createElement('script');
      script.src = scriptPath;
      script.defer = true;
      script.setAttribute('data-dynamic', '');
      document.body.appendChild(script);
    }
  }
}

export async function loadPage() {
  let path = location.pathname;
  if (path === '/' || path === '') path = '/home';

  const routeKey = path.startsWith('/') ? path.slice(1) : path;
  const pagePath = routes[routeKey] || null;
  const container = document.getElementById('app-content');

  if (!pagePath) {
    container.innerHTML = `<div class="p-4">
                              <h1 class="text-danger">Erro 404</h1>
                              <p>A página não foi encontrada.</p>
                          </div>`;
    return;
  }

  try {
    let html;

    if (pageCache.has(pagePath)) {
      html = pageCache.get(pagePath);
    } else {
      const res = await fetch(pagePath);
      if (!res.ok) throw new Error('Página não encontrada');
      html = await res.text(); // Corrigido aqui
      pageCache.set(pagePath, html);
    }

    const doc = new DOMParser().parseFromString(html, 'text/html');
    const expectedElement = doc.querySelector('#app-content.container-fluid.person-content');

    if (expectedElement) {
      container.innerHTML = `<div class="p-4">
                                <h1 class="text-danger">Erro 404</h1>
                                <p>A página não foi encontrada.</p>
                             </div>`;
      return;
    }

    const bodyContent = doc.body?.innerHTML || '';

    if (!bodyContent.trim()) {
      container.innerHTML = `<div class="p-4"><h1 class="text-danger">Erro 404</h1></div>`;
      return;
    }

    container.innerHTML = bodyContent;

    const folderPath = '/' + pagePath.replace(/\/?index\.html$/, '');

    await loadScriptsFromFolder(folderPath);

  } catch (err) {
    console.error(`Erro ao carregar página ${pagePath}`, err);
    container.innerHTML = `<div class="p-4"><h1 class="text-danger">Erro ao carregar</h1></div>`;
  }
}


window.addEventListener('DOMContentLoaded', loadRoutes);
window.addEventListener('popstate', loadPage);
