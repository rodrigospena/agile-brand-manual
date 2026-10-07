// Agile Brand Manual Interactivity
document.addEventListener('DOMContentLoaded', () => {
  // 1. Toast Notification System
  const toast = document.getElementById('toast');
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // 2. Click to Copy Color Tokens
  document.querySelectorAll('.copyable, .swatch-color').forEach(el => {
    el.addEventListener('click', () => {
      const code = el.getAttribute('data-copy') || el.textContent.trim();
      navigator.clipboard.writeText(code).then(() => {
        showToast(`Copiado: ${code}`);
      }).catch(() => {
        showToast(`Valor: ${code}`);
      });
    });
  });

  // 3. Typography Live Test Playground
  const typoInput = document.getElementById('typo-input');
  const typoPreview1 = document.getElementById('typo-preview-1');
  const typoPreview2 = document.getElementById('typo-preview-2');
  const typoPreview3 = document.getElementById('typo-preview-3');

  if (typoInput) {
    typoInput.addEventListener('input', (e) => {
      const val = e.target.value || 'Agile Engenharia';
      if (typoPreview1) typoPreview1.textContent = val.toUpperCase();
      if (typoPreview2) typoPreview2.textContent = val;
      if (typoPreview3) typoPreview3.textContent = val;
    });
  }

  // 4. Background Color Switcher for Logos
  document.querySelectorAll('.btn-bg-switch').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetBoxId = btn.getAttribute('data-target');
      const bgClass = btn.getAttribute('data-bg');
      const targetBox = document.getElementById(targetBoxId);
      
      if (targetBox) {
        targetBox.className = `logo-display-box ${bgClass}`;
        // Update active button state within group
        btn.parentElement.querySelectorAll('.btn-bg-switch').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    });
  });

  // 5. Download SVG Helper
  window.downloadSvg = function(svgId, fileName) {
    const svgEl = document.getElementById(svgId);
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `${fileName}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    showToast(`Download iniciado: ${fileName}.svg`);
  };
});
