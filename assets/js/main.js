/* ============================================================
   OSRS GUIDE LIBRARY — APP SCRIPT
   ============================================================ */

/* ---------------- HOMEPAGE: render guide cards ---------------- */
function renderGuideGrid(filter = 'All', search = '') {
  const grid = document.getElementById('guide-grid');
  if (!grid) return;

  const search_lc = search.trim().toLowerCase();
  const filtered = GUIDES.filter(g => {
    const cat_ok = filter === 'All' || g.category === filter;
    const search_ok = !search_lc ||
      g.title.toLowerCase().includes(search_lc) ||
      g.description.toLowerCase().includes(search_lc) ||
      g.tags.some(t => t.toLowerCase().includes(search_lc));
    return cat_ok && search_ok;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;">
      No guides match your search. The library is still growing — check back soon.
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(g => {
    const diffClass = DIFFICULTY_CLASS[g.difficulty] || '';
    const memberClass = MEMBERSHIP_CLASS[g.membership] || '';
    const tagsHtml = [
      `<span class="tag ${memberClass}">${g.membership}</span>`,
      `<span class="tag ${diffClass}">${g.difficulty}</span>`,
      ...g.tags.filter(t => t !== g.membership && t !== g.difficulty)
              .slice(0, 2)
              .map(t => `<span class="tag">${t}</span>`),
    ].join('');

    return `
      <a class="guide-card" href="${g.file}">
        <div class="guide-card-thumb">
          <span class="guide-card-thumb-emoji">${g.thumbEmoji}</span>
        </div>
        <div class="guide-card-body">
          <div class="guide-card-cat">${g.category}</div>
          <div class="guide-card-title">${g.title}</div>
          <div class="guide-card-desc">${g.description}</div>
          <div class="guide-card-tags">${tagsHtml}</div>
        </div>
      </a>
    `;
  }).join('');
}

function renderFilters() {
  const filterBar = document.getElementById('filter-bar');
  if (!filterBar) return;

  // Build category list from registered guides + standard order
  const usedCategories = new Set(GUIDES.map(g => g.category));
  const categories = CATEGORY_ORDER.filter(c => c === 'All' || usedCategories.has(c));

  filterBar.innerHTML = categories.map((cat, i) =>
    `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-cat="${cat}">${cat}</button>`
  ).join('');

  filterBar.addEventListener('click', e => {
    if (!e.target.classList.contains('filter-btn')) return;
    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    const cat = e.target.dataset.cat;
    const search = document.getElementById('search-input')?.value || '';
    renderGuideGrid(cat, search);
  });
}

function setupSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;
  input.addEventListener('input', () => {
    const activeBtn = document.querySelector('.filter-btn.active');
    const cat = activeBtn ? activeBtn.dataset.cat : 'All';
    renderGuideGrid(cat, input.value);
  });
}

/* ---------------- LIGHTBOX (image zoom) ---------------- */
function setupLightbox() {
  const viewers = document.querySelectorAll('[data-zoomable]');
  const lightbox = document.getElementById('lightbox');
  if (!viewers.length || !lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const zoomInBtn   = lightbox.querySelector('[data-action="zoom-in"]');
  const zoomOutBtn  = lightbox.querySelector('[data-action="zoom-out"]');
  const resetBtn    = lightbox.querySelector('[data-action="reset"]');
  const closeBtn    = lightbox.querySelector('.lightbox-close');
  const zoomDisplay = lightbox.querySelector('.lightbox-zoom-display');

  let scale = 1;
  let translateX = 0, translateY = 0;
  let isDragging = false;
  let dragStartX = 0, dragStartY = 0;

  const apply = () => {
    lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    zoomDisplay.textContent = `${Math.round(scale * 100)}%`;
  };
  const reset = () => { scale = 1; translateX = 0; translateY = 0; apply(); };

  viewers.forEach(v => {
    v.addEventListener('click', () => {
      const img = v.querySelector('img');
      if (!img) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      reset();
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const close = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === '+' || e.key === '=') { scale = Math.min(scale + 0.25, 5); apply(); }
    if (e.key === '-') { scale = Math.max(scale - 0.25, 0.5); apply(); }
    if (e.key === '0') reset();
  });

  zoomInBtn.addEventListener('click', () => { scale = Math.min(scale + 0.25, 5); apply(); });
  zoomOutBtn.addEventListener('click', () => { scale = Math.max(scale - 0.25, 0.5); apply(); });
  resetBtn.addEventListener('click', reset);

  // Wheel zoom
  lightbox.addEventListener('wheel', e => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    scale = Math.max(0.5, Math.min(5, scale + delta));
    apply();
  }, { passive: false });

  // Drag pan when zoomed
  lightboxImg.addEventListener('mousedown', e => {
    if (scale <= 1) return;
    isDragging = true;
    dragStartX = e.clientX - translateX;
    dragStartY = e.clientY - translateY;
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    translateX = e.clientX - dragStartX;
    translateY = e.clientY - dragStartY;
    apply();
  });
  document.addEventListener('mouseup', () => { isDragging = false; });
}

/* ---------------- FAQ ACCORDION ---------------- */
function setupFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      // Optional: close all others — comment out if you want multiple open at once
      // document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      item.classList.toggle('open', !wasOpen);
    });
  });
}

/* ---------------- TABS ---------------- */
function setupTabs() {
  document.querySelectorAll('[data-tabs]').forEach(group => {
    const buttons = group.querySelectorAll('.tab-btn');
    const panes   = group.querySelectorAll('.tab-pane');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.toggle('active', b === btn));
        panes.forEach(p => p.classList.toggle('active', p.dataset.tab === target));
      });
    });
  });
}

/* ---------------- TOC ACTIVE STATE ---------------- */
function setupTOC() {
  const tocLinks = document.querySelectorAll('.guide-toc a');
  if (!tocLinks.length) return;
  const sections = [...tocLinks].map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);

  const onScroll = () => {
    const y = window.scrollY + 120;
    let activeIdx = 0;
    sections.forEach((s, i) => { if (s.offsetTop <= y) activeIdx = i; });
    tocLinks.forEach((l, i) => l.classList.toggle('active', i === activeIdx));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------------- INIT ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  // Homepage
  if (document.getElementById('guide-grid')) {
    renderFilters();
    setupSearch();
    renderGuideGrid('All', '');
  }
  // Guide pages
  setupLightbox();
  setupFAQ();
  setupTabs();
  setupTOC();
});
