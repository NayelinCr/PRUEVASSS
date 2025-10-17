// main.js - funciones comunes para todas las páginas

document.addEventListener('DOMContentLoaded', () => {
  // 1) Smooth behavior for internal anchor links (si las hay)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) t.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
  });

  // 2) Small KPI demo: contemos archivos dentro de 'cards-grid' en cada unidad
  const cards = document.querySelectorAll('.cards-grid .card').length;
  const registeredElem = document.getElementById('kpi-registered');
  const progressElem = document.getElementById('kpi-progress');

  if (registeredElem) registeredElem.textContent = cards;
  if (progressElem) {
    // Suponiendo total 16 como ejemplo: ajustar según tu proyecto
    const total = 16;
    const pct = Math.round((cards / total) * 100);
    progressElem.textContent = pct + '%';
  }

  // 3) A11y: marcar enlaces sin archivo
  document.querySelectorAll('a[aria-disabled="true"]').forEach(el => {
    el.addEventListener('click', e => e.preventDefault());
  });

  // 4) (Opcional) Tiny animation: pulse on buttons when page loads
  document.querySelectorAll('.btn.big').forEach(btn => {
    btn.animate([
      { transform: 'translateY(0)', opacity: 1 },
      { transform: 'translateY(-6px)', opacity: 1 },
      { transform: 'translateY(0)', opacity: 1 }
    ], { duration: 900, easing: 'cubic-bezier(.2,.9,.2,1)' });
  });
});
