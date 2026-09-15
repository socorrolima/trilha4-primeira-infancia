// ---------- mobile sidebar toggle ----------
const navToggle = document.getElementById('navToggle');
const sidebar = document.getElementById('sidebar');
navToggle?.addEventListener('click', () => sidebar.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a =>
  a.addEventListener('click', () => sidebar.classList.remove('open'))
);

// ---------- scroll-spy: current + visited-in-session (in-memory only) ----------
// Intentionally not persisted (no localStorage): this material is meant for
// point-in-time consultation, not a course with saved progress.
const sections = document.querySelectorAll('section.block');
const navItems = document.querySelectorAll('#navList li');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const item = document.querySelector('#navList li[data-target="' + id + '"]');
    if (!item) return;
    if (entry.isIntersecting) {
      navItems.forEach(li => li.classList.remove('current'));
      item.classList.add('current');
      item.classList.add('visited');
    }
  });
}, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });

sections.forEach(s => observer.observe(s));

// ---------- tabs (Quadro 1 demo) ----------
const tabData = {
  renda: {
    title: 'Pobreza, instabilidade de renda e insegurança material do cuidado',
    body: 'Desproteções materiais decorrentes da insuficiência, irregularidade ou ausência de renda. Situações típicas: renda instável ou intermitente; dependência de benefícios eventuais; dificuldade de acesso a itens essenciais ao cuidado infantil.'
  },
  acesso: {
    title: 'Acesso insuficiente a direitos e serviços públicos essenciais',
    body: 'Ausência, precariedade ou descontinuidade do acesso a direitos sociais fundamentais. Situações típicas: insegurança alimentar; ausência de saneamento; crianças fora da escola; Cadastro Único desatualizado.'
  },
  cuidados: {
    title: 'Demanda ampliada por cuidados familiares',
    body: 'Organização da vida familiar atravessada por demandas contínuas e intensivas de cuidado. Situações típicas: cuidador solo sem rede de apoio; criança com deficiência; gestante adolescente.'
  },
  vinculos: {
    title: 'Vínculos familiares e comunitários fragilizados (sem ruptura ou violência)',
    body: 'Fragilidade nas relações familiares e comunitárias que afetam o pertencimento e a função protetiva da família, sem configurar violência explícita.'
  },
};
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const d = tabData[btn.dataset.tab];
    document.getElementById('tabPanel').innerHTML =
      '<p><strong>' + d.title + '.</strong></p><p style="margin:0;color:var(--ink-soft);">' + d.body + '</p>';
  });
});

// ---------- accordion ----------
document.querySelectorAll('.accordion-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.accordion-item').classList.toggle('open');
  });
});

// ---------- modal demo ----------
const modalOverlay = document.getElementById('modalOverlay');
document.querySelector('[data-modal="cf227"]')?.addEventListener('click', () => modalOverlay.classList.add('show'));
document.getElementById('modalClose')?.addEventListener('click', () => modalOverlay.classList.remove('show'));
modalOverlay?.addEventListener('click', (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.remove('show');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modalOverlay?.classList.remove('show');
});

// ---------- search: filters the sidebar to sections whose text matches ----------
// Real (not placeholder) — matches against each section's visible text.
const searchInput = document.getElementById('searchInput');
const searchHint = document.getElementById('searchHint');
const defaultHint = searchHint ? searchHint.textContent : '';

function normalize(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

searchInput?.addEventListener('input', () => {
  const query = normalize(searchInput.value.trim());

  if (!query) {
    navItems.forEach(li => li.classList.remove('hidden'));
    if (searchHint) searchHint.textContent = defaultHint;
    return;
  }

  let matches = 0;
  navItems.forEach(li => {
    const id = li.dataset.target;
    const section = document.getElementById(id);
    const text = normalize(section ? section.textContent : '');
    const isMatch = text.includes(query);
    li.classList.toggle('hidden', !isMatch);
    if (isMatch) matches++;
  });

  if (searchHint) {
    searchHint.textContent = matches
      ? matches + ' seção(ões) com esse termo'
      : 'nada encontrado — tente outro termo';
  }
});
