// Agile Logo Elimination Board & Selector
document.addEventListener('DOMContentLoaded', () => {
  const state = {
    globalBg: 'bg-light',
    lockupMode: 'primary', // 'symbol', 'primary', 'horizontal', 'stamp'
    filter: 'all', // 'all', 'favorite', 'review', 'eliminated'
    variants: {
      1: { name: 'Variante 1 — Sharp Precision', status: 'favorite', notes: 'Geometria clássica 5 frisos, equilíbrio e precisão milimétrica' },
      2: { name: 'Variante 2 — Minimalist Louvers', status: 'review', notes: '4 pavimentos com respiros generosos e ar contemporâneo' },
      3: { name: 'Variante 3 — Solid Monolith', status: 'review', notes: 'Solidez e peso estrutural de engenharia pesada com recorte portal' },
      4: { name: 'Variante 4 — Hybrid Residence', status: 'review', notes: 'Mescla cobertura residencial e corpo comercial' },
      5: { name: 'Variante 5 — Technical Compass', status: 'review', notes: 'Linhas técnicas de compasso e prancha de desenho' },
      6: { name: 'Variante 6 — Dynamic Agility', status: 'review', notes: 'Inclinação aerodinâmica ágil simbolizando rapidez' }
    }
  };

  // Load saved state from LocalStorage if available
  const saved = localStorage.getItem('agile_logo_selector_state');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.variants) Object.assign(state.variants, parsed.variants);
    } catch (e) {
      console.warn('Could not parse saved selector state', e);
    }
  }

  function saveState() {
    localStorage.setItem('agile_logo_selector_state', JSON.stringify(state));
    updateCounters();
  }

  function updateCounters() {
    let fav = 0, rev = 0, elim = 0;
    Object.values(state.variants).forEach(v => {
      if (v.status === 'favorite') fav++;
      else if (v.status === 'eliminated') elim++;
      else rev++;
    });

    const elFav = document.getElementById('count-fav');
    const elRev = document.getElementById('count-rev');
    const elElim = document.getElementById('count-elim');
    const elTotal = document.getElementById('count-total');

    if (elFav) elFav.textContent = fav;
    if (elRev) elRev.textContent = rev;
    if (elElim) elElim.textContent = elim;
    if (elTotal) elTotal.textContent = fav + rev + elim;
  }

  function renderGrid() {
    const container = document.getElementById('cards-container');
    if (!container) return;

    container.innerHTML = '';

    for (let i = 1; i <= 6; i++) {
      const v = state.variants[i];
      if (state.filter !== 'all' && v.status !== state.filter) {
        continue;
      }

      const card = document.createElement('div');
      card.className = `glass-card selector-card status-${v.status}`;
      card.id = `card-var-${i}`;

      let svgPath = '';
      if (state.lockupMode === 'symbol') {
        svgPath = `../assets/logos/raw/variant-${i}/symbol-color.svg`;
        if (state.globalBg === 'bg-navy') svgPath = `../assets/logos/raw/variant-${i}/symbol-dark.svg`;
        if (state.globalBg === 'bg-slate') svgPath = `../assets/logos/raw/variant-${i}/symbol-white.svg`;
      } else if (state.lockupMode === 'horizontal') {
        svgPath = `../assets/logos/raw/variant-${i}/lockup-horizontal.svg`;
        if (state.globalBg === 'bg-navy' || state.globalBg === 'bg-slate') {
          svgPath = `../assets/logos/raw/variant-${i}/lockup-horizontal-dark.svg`;
        }
      } else if (state.lockupMode === 'stamp') {
        svgPath = `../assets/logos/raw/variant-${i}/stamp-badge.svg`;
      } else {
        // primary
        svgPath = `../assets/logos/raw/variant-${i}/lockup-primary.svg`;
        if (state.globalBg === 'bg-navy' || state.globalBg === 'bg-slate') {
          svgPath = `../assets/logos/raw/variant-${i}/lockup-primary-dark.svg`;
        }
      }

      card.innerHTML = `
        <div class="card-header">
          <div class="card-title-group">
            <h3>${v.name}</h3>
            <span class="badge badge-${v.status}">${getStatusLabel(v.status)}</span>
          </div>
          <div class="status-actions">
            <button class="btn-icon btn-fav ${v.status === 'favorite' ? 'active' : ''}" title="Marcar como Favorita" data-id="${i}" data-action="favorite">⭐️</button>
            <button class="btn-icon btn-rev ${v.status === 'review' ? 'active' : ''}" title="Deixar em Análise" data-id="${i}" data-action="review">🔍</button>
            <button class="btn-icon btn-elim ${v.status === 'eliminated' ? 'active' : ''}" title="Eliminar Opção" data-id="${i}" data-action="eliminated">❌</button>
          </div>
        </div>

        <div class="logo-display-box ${state.globalBg} preview-stage" id="preview-${i}">
          <img src="${svgPath}" alt="${v.name}" class="preview-svg-img" />
        </div>

        <div class="card-footer">
          <p class="notes-text">${v.notes}</p>
          <div class="card-btn-group">
            <a href="${svgPath}" download="agile-variant-${i}.svg" class="btn btn-secondary btn-sm">📥 Baixar SVG</a>
            <a href="${svgPath}" target="_blank" class="btn btn-secondary btn-sm">🔍 Abrir</a>
          </div>
        </div>
      `;

      container.appendChild(card);
    }

    attachCardEvents();
    updateCounters();
  }

  function getStatusLabel(status) {
    if (status === 'favorite') return '⭐️ Favorita / Finalista';
    if (status === 'eliminated') return '❌ Eliminada';
    return '🔍 Em Análise';
  }

  function attachCardEvents() {
    document.querySelectorAll('.status-actions button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        const action = btn.getAttribute('data-action');
        if (state.variants[id]) {
          state.variants[id].status = action;
          saveState();
          renderGrid();
        }
      });
    });
  }

  // Global Background Switcher
  document.querySelectorAll('.global-bg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.global-bg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.globalBg = btn.getAttribute('data-bg');
      renderGrid();
    });
  });

  // Lockup Switcher
  document.querySelectorAll('.lockup-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lockup-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.lockupMode = btn.getAttribute('data-mode');
      renderGrid();
    });
  });

  // Filter Buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.filter = btn.getAttribute('data-filter');
      renderGrid();
    });
  });

  // Export Report Button
  const btnExport = document.getElementById('btn-export-report');
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      let report = `RELATÓRIO DE SELEÇÃO DE LOGOTIPO — AGILE ENGENHARIA\nData: ${new Date().toLocaleDateString('pt-BR')}\n=======================================================\n\n`;
      Object.entries(state.variants).forEach(([num, v]) => {
        report += `[${getStatusLabel(v.status).toUpperCase()}] ${v.name}\n`;
        report += `Notas: ${v.notes}\n\n`;
      });
      const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'relatorio-escolha-logo-agile.txt';
      a.click();
    });
  }

  // Initial render
  renderGrid();
});
