// Agile Brand Manual — Interactive Engine
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Toast Notification System
  const toast = document.getElementById('toast');
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  // 2. Click to Copy Color Tokens & Code Snippets
  document.querySelectorAll('.copyable, .swatch-color').forEach(el => {
    el.addEventListener('click', () => {
      const code = el.getAttribute('data-copy') || el.textContent.trim();
      if (!code) return;
      
      navigator.clipboard.writeText(code).then(() => {
        showToast(`📋 Copiado para a área de transferência: ${code}`);
      }).catch(() => {
        showToast(`Código: ${code}`);
      });
    });
  });

  // 3. Typography Live Test Playground
  const typoInput = document.getElementById('typo-input');
  const typoPreview1 = document.getElementById('typo-preview-1');
  const typoPreview2 = document.getElementById('typo-preview-2');

  if (typoInput) {
    typoInput.addEventListener('input', (e) => {
      const val = e.target.value.trim() || 'AGILE';
      if (typoPreview1) typoPreview1.textContent = val.toUpperCase();
      if (typoPreview2) typoPreview2.textContent = e.target.value || 'Engenharia Civil & Legalização';
    });
  }

  // 4. Hero Master Showcase Stage Switcher
  const heroStageCanvas = document.getElementById('hero-stage-canvas');
  const heroLogoImg = document.getElementById('main-hero-logo');
  const heroBgBtns = document.querySelectorAll('.hero-bg-btn');

  heroBgBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const bgClass = btn.getAttribute('data-bg');
      const isDark = (bgClass === 'stage-bg-navy' || bgClass === 'stage-bg-blueprint' || bgClass === 'stage-bg-slate');
      const isMono = (bgClass === 'stage-bg-mono');

      // Update active button state
      heroBgBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update Canvas Background Class
      if (heroStageCanvas) {
        heroStageCanvas.className = `hero-stage-canvas ${bgClass}`;
      }

      // Dynamically Swap SVG Source based on background contrast
      if (heroLogoImg) {
        heroLogoImg.style.opacity = '0';
        setTimeout(() => {
          if (isMono) {
            heroLogoImg.src = 'assets/logos/exports/agile-logo-primary-mono.svg';
          } else if (isDark) {
            heroLogoImg.src = 'assets/logos/exports/agile-logo-primary-dark.svg';
          } else {
            heroLogoImg.src = 'assets/logos/exports/agile-logo-primary.svg';
          }
          heroLogoImg.style.opacity = '1';
        }, 150);
      }
    });
  });

  // 5. Applications Section Background Switchers (Vertical & Horizontal Lockups)
  document.querySelectorAll('.btn-bg-switch').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetBoxId = btn.getAttribute('data-target');
      const bgClass = btn.getAttribute('data-bg');
      const lockupType = btn.getAttribute('data-lockup'); // 'vertical' or 'horizontal'
      const targetBox = document.getElementById(targetBoxId);
      
      if (!targetBox) return;

      // Update button group active state
      btn.parentElement.querySelectorAll('.btn-bg-switch').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update background class
      targetBox.className = `logo-display-box ${bgClass}`;

      // Swap image source
      const img = targetBox.querySelector('img');
      if (img) {
        img.style.opacity = '0';
        setTimeout(() => {
          const isDark = (bgClass === 'bg-navy' || bgClass === 'bg-slate' || bgClass === 'bg-blueprint');
          if (lockupType === 'horizontal') {
            img.src = isDark 
              ? 'assets/logos/exports/agile-logo-horizontal-dark.svg'
              : 'assets/logos/exports/agile-logo-horizontal.svg';
          } else {
            img.src = isDark 
              ? 'assets/logos/exports/agile-logo-primary-dark.svg'
              : 'assets/logos/exports/agile-logo-primary.svg';
          }
          img.style.opacity = '1';
        }, 120);
      }
    });
  });

});
