// Agile Logo Elimination Board & Selector (All Vector Options including Protective Hands / Cradle)
document.addEventListener('DOMContentLoaded', () => {
  const state = {
    globalBg: 'bg-light',
    lockupMode: 'primary', // 'symbol', 'primary', 'horizontal', 'stamp'
    filter: 'all', // 'all', 'favorite', 'review', 'eliminated'
    variants: {
      'cradle-protecao': { 
        name: 'Design A — Architectural Cradle', 
        styleTag: '🌟 Mãos de Proteção Refinadas', 
        status: 'favorite', 
        pathDir: 'opcao-cradle-protecao',
        notes: 'Curvatura elegante e precisa que abraça o edifício como mãos de proteção patrimonial e fundação estrutural.' 
      },
      'maos-seguranca': { 
        name: 'Design B — Geometric Hands of Security', 
        styleTag: '🌟 Mãos Facetadas / Segurança', 
        status: 'favorite', 
        pathDir: 'opcao-maos-seguranca',
        notes: 'Mãos geométricas com planos facetados de luz e sombra abraçando a torre com autoridade de engenharia.' 
      },
      'asas-suporte': { 
        name: 'Design C — Foundation Wings', 
        styleTag: '🌟 Asas de Sustentação & Cuidado', 
        status: 'favorite', 
        pathDir: 'opcao-asas-suporte',
        notes: 'Asas aerodinâmicas ascendentes que sustentam a base da edificação transmitindo agilidade e suporte.' 
      },
      'opcao-3': { 
        name: 'Opção 3 — Asymmetric Dynamic Apex', 
        styleTag: 'Vetorizada Oficial (Opção 3)', 
        status: 'review', 
        pathDir: 'opcao-3-asymmetric-apex',
        notes: 'Ápice assimétrico com caimento dinâmico em vela/asa e torre isométrica com 4 frisos.' 
      },
      'opcao-6': { 
        name: 'Opção 6 — Dynamic Ribbon Swoosh', 
        styleTag: 'Vetorizada Oficial (Opção 6)', 
        status: 'review', 
        pathDir: 'opcao-6-dynamic-ribbon',
        notes: 'Fitas dinâmicas em laranja envolvendo o edifício e formando a travessa do A com efeito 3D.' 
      },
      1: { name: 'Variante 1 — Sharp Precision', styleTag: 'Geometria Clássica', status: 'review', pathDir: 'variant-1', notes: '5 frisos técnicos, equilíbrio e proporção áurea clássica de engenharia.' },
      2: { name: 'Variante 2 — Minimalist Louvers', styleTag: 'Contemporâneo', status: 'review', pathDir: 'variant-2', notes: '4 pavimentos com respiros generosos e ar arquitetônico moderno.' },
      3: { name: 'Variante 3 — Solid Monolith', styleTag: 'Solidez Estrutural', status: 'review', pathDir: 'variant-3', notes: 'Solidez e peso estrutural de engenharia pesada com recorte portal.' },
      4: { name: 'Variante 4 — Hybrid Residence', styleTag: 'Residencial & Comercial', status: 'review', pathDir: 'variant-4', notes: 'Mescla cobertura residencial e corpo vertical comercial.' },
      5: { name: 'Variante 5 — Technical Compass', styleTag: 'Linhas de Compasso', status: 'review', pathDir: 'variant-5', notes: 'Linhas técnicas de compasso e prancha de desenho arquitetônico.' },
      6: { name: 'Variante 6 — Dynamic Agility', styleTag: 'Agilidade & Velocidade', status: 'review', pathDir: 'variant-6', notes: 'Inclinação aerodinâmica ágil simbolizando rapidez no alvará.' },
      7: { name: 'Variante 7 — Swiss Monogram', styleTag: 'Ultra-Minimalista', status: 'review', pathDir: 'variant-7', notes: 'Estilo suíço puro com recorte do prédio em espaço negativo.' },
      8: { name: 'Variante 8 — Wireframe Interlock', styleTag: 'Isometria 3D', status: 'review', pathDir: 'variant-8', notes: 'Cubo isométrico 3D interligado à letra A estrutural.' },
      9: { name: 'Variante 9 — Skyline Monoline', styleTag: 'Linhas Finas / Skyline', status: 'review', pathDir: 'variant-9', notes: 'Torre de arranha-céu vertical com frisos lineares finos.' },
      10: { name: 'Variante 10 — Hexagonal Prism', styleTag: 'Prisma Hexagonal', status: 'review', pathDir: 'variant-10', notes: 'Prisma hexagonal de engenharia com 3 pavimentos iluminados.' },
      11: { name: 'Variante 11 — Apex Ascent Arrow', styleTag: 'Seta de Ascensão', status: 'review', pathDir: 'variant-11', notes: 'Seta de ascensão central dominante ladeada por duas torres.' },
      12: { name: 'Variante 12 — Origami Faceted 3D', styleTag: 'Maximalista 3D', status: 'review', pathDir: 'variant-12', notes: 'Facetação geométrica 3D lapidada de alto impacto visual.' }
    }
  };

  const saved = localStorage.getItem('agile_logo_selector_state_v4');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.variants) Object.assign(state.variants, parsed.variants);
    } catch (e) {
      console.warn('Could not parse saved selector state', e);
    }
  }

  function saveState() {
    localStorage.setItem('agile_logo_selector_state_v4', JSON.stringify(state));
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

    Object.entries(state.variants).forEach(([key, v]) => {
      if (state.filter !== 'all' && v.status !== state.filter) {
        return;
      }

      const card = document.createElement('div');
      card.className = `glass-card selector-card status-${v.status}`;
      card.id = `card-var-${key}`;

      let svgPath = '';
      if (state.lockupMode === 'symbol') {
        svgPath = `../assets/logos/raw/${v.pathDir}/symbol-color.svg`;
        if (state.globalBg === 'bg-navy') svgPath = `../assets/logos/raw/${v.pathDir}/symbol-dark.svg`;
        if (state.globalBg === 'bg-slate') svgPath = `../assets/logos/raw/${v.pathDir}/symbol-white.svg`;
      } else if (state.lockupMode === 'horizontal') {
        svgPath = `../assets/logos/raw/${v.pathDir}/lockup-horizontal.svg`;
        if (state.globalBg === 'bg-navy' || state.globalBg === 'bg-slate') {
          svgPath = `../assets/logos/raw/${v.pathDir}/lockup-horizontal-dark.svg`;
        }
      } else if (state.lockupMode === 'stamp') {
        svgPath = `../assets/logos/raw/${v.pathDir}/stamp-badge.svg`;
      } else {
        // primary
        svgPath = `../assets/logos/raw/${v.pathDir}/lockup-primary.svg`;
        if (state.globalBg === 'bg-navy' || state.globalBg === 'bg-slate') {
          svgPath = `../assets/logos/raw/${v.pathDir}/lockup-primary-dark.svg`;
        }
      }

      card.innerHTML = `
        <div class="card-header">
          <div class="card-title-group">
            <span class="style-tag-pill">${v.styleTag}</span>
            <h3>${v.name}</h3>
            <span class="badge badge-${v.status}">${getStatusLabel(v.status)}</span>
          </div>
          <div class="status-actions">
            <button class="btn-icon btn-fav ${v.status === 'favorite' ? 'active' : ''}" title="Marcar como Favorita" data-id="${key}" data-action="favorite">⭐️</button>
            <button class="btn-icon btn-rev ${v.status === 'review' ? 'active' : ''}" title="Deixar em Análise" data-id="${key}" data-action="review">🔍</button>
            <button class="btn-icon btn-elim ${v.status === 'eliminated' ? 'active' : ''}" title="Eliminar Opção" data-id="${key}" data-action="eliminated">❌</button>
          </div>
        </div>

        <div class="logo-display-box ${state.globalBg} preview-stage" id="preview-${key}">
          <img src="${svgPath}" alt="${v.name}" class="preview-svg-img" />
        </div>

        <div class="card-footer">
          <p class="notes-text">${v.notes}</p>
          <div class="card-btn-group">
            <a href="${svgPath}" download="agile-${key}.svg" class="btn btn-secondary btn-sm">📥 Baixar SVG</a>
            <a href="${svgPath}" target="_blank" class="btn btn-secondary btn-sm">🔍 Abrir</a>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    attachCardEvents();
    updateCounters();
  }

  function getStatusLabel(status) {
    if (status === 'favorite') return '⭐️ Favorita';
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
        report += `[${getStatusLabel(v.status).toUpperCase()}] ${v.name} (${v.styleTag})\n`;
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
