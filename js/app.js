// ---------- mobile sidebar toggle ----------
try {
  const navToggle = document.getElementById('navToggle');
  const sidebar = document.getElementById('sidebar');
  navToggle?.addEventListener('click', () => sidebar.classList.toggle('open'));
  document.querySelectorAll('.nav a').forEach(a =>
    a.addEventListener('click', () => sidebar.classList.remove('open'))
  );
} catch (err) {
  console.error('Falha ao iniciar o menu mobile:', err);
}

// ---------- scroll-spy: current + visited-in-session (in-memory only) ----------
// Intentionally not persisted (no localStorage): this material is meant for
// point-in-time consultation, not a course with saved progress.
// Feature-detected and isolated in its own try/catch: if the browser lacks
// IntersectionObserver (older/locked-down corporate browsers), this block
// simply does nothing instead of throwing and killing every section below
// it — which is what broke the tabs, modal and search before this fix.
try {
  if ('IntersectionObserver' in window) {
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
  } else {
    console.warn('IntersectionObserver indisponível neste navegador — destaque de seção atual desativado.');
  }
} catch (err) {
  console.error('Falha ao iniciar o scroll-spy:', err);
}

// ---------- Quadro 1: as 6 dimensões de vulnerabilidade e risco ----------
try {
  const dimensoes = {
    renda: {
      label: 'Pobreza, instabilidade de renda e insegurança material do cuidado',
      caracterizacao: 'Desproteções materiais decorrentes da insuficiência, irregularidade ou ausência de renda, que comprometem a satisfação das necessidades básicas e as condições de cuidado. Incide de forma desigual sobre as famílias, afetando com maior intensidade mulheres, mães solo e cuidadoras principais.',
      situacoes: [
        'Famílias em situação de pobreza antes ou após acesso ao PBF e ao BPC',
        'Renda do trabalho instável, intermitente ou insuficiente',
        'Ausência de renda regular',
        'Dependência recorrente de benefícios eventuais',
        'Informalidade persistente',
        'Dificuldade de acesso a itens essenciais ao cuidado infantil (alimentação, moradia, insumos básicos)',
      ],
      sensitive: false,
    },
    acesso: {
      label: 'Acesso insuficiente a direitos e serviços públicos essenciais',
      caracterizacao: 'Ausência, precariedade, descontinuidade ou inadequação do acesso a direitos sociais fundamentais, evidenciando desigualdades territoriais e barreiras institucionais. Impacta diretamente a proteção integral e o desenvolvimento pleno das crianças.',
      situacoes: [
        'Insegurança alimentar e nutricional',
        'Moradia improvisada ou com renda familiar comprometida pelo aluguel',
        'Ausência ou precariedade de saneamento básico',
        'Crianças fora da escola ou sem cumprimento de condicionalidades educacionais',
        'Demanda não atendida por creche/pré-escola',
        'Criança com deficiência sem acesso a cuidados e educação inclusiva',
        'Não cumprimento de condicionalidades de saúde (pré-natal, vacinação, acompanhamento nutricional)',
        'Ausência de documentação civil; Cadastro Único desatualizado',
        'Famílias de grupos tradicionais sem reconhecimento institucional ou acesso a políticas',
      ],
      sensitive: false,
    },
    cuidados: {
      label: 'Demanda ampliada por cuidados familiares',
      caracterizacao: 'Situações em que a organização da vida familiar é atravessada por demandas contínuas e intensivas de cuidado, gerando sobrecarga material, emocional e relacional — sobretudo sobre mulheres. Restringe acesso ao trabalho, à renda e à convivência comunitária.',
      situacoes: [
        'Criança com deficiência ou atraso no desenvolvimento',
        'Cuidador responsável por múltiplos dependentes',
        'Cuidador com deficiência, transtorno mental ou adoecimento',
        'Cuidador solo, adolescente e/ou sem rede de apoio',
        'Gestante criança ou adolescente',
        'Crianças ou adolescentes assumindo cuidados',
        'Criança sem supervisão frequente',
        'Sobrecarga e isolamento do cuidador',
        'Cuidadores sem vínculo legal com a criança',
      ],
      sensitive: false,
    },
    vinculos: {
      label: 'Vínculos familiares e comunitários fragilizados (sem ruptura ou violência)',
      caracterizacao: 'Fragilidade nas relações familiares e comunitárias que afeta o pertencimento e o exercício da função protetiva da família, sem que estejam configuradas, naquele momento, situações explícitas de violência. Quando não enfrentadas preventivamente, tendem a se aprofundar.',
      situacoes: [
        'Óbito ou abandono recente do cuidador principal',
        'Vínculos familiares frágeis, instáveis ou com conflitos recorrentes',
        'Ambiente domiciliar pouco protetivo ou pouco estimulante',
        'Práticas parentais baseadas em punições excessivas, indiferença ou desatenção',
        'Ausência ou fragilidade de convivência comunitária',
        'Famílias de povos e comunidades tradicionais deslocadas recentemente',
        'Crianças migrantes ou refugiadas com dificuldade de integração sociocultural',
      ],
      sensitive: false,
    },
    discriminacao: {
      label: 'Exposição a discriminações e preconceitos',
      caracterizacao: 'Situações em que marcadores estruturais de desigualdade — gênero, raça/etnia, deficiência, orientação sexual, identidade de gênero, origem territorial ou condição migratória — produzem violências simbólicas, institucionais e materiais, incidindo de forma cumulativa sobre as famílias.',
      situacoes: [
        'Famílias com pessoas com deficiência expostas a estigmas e barreiras atitudinais',
        'Famílias negras submetidas ao racismo estrutural e institucional',
        'Famílias indígenas, quilombolas e de GPTE afetadas por discriminações territoriais e étnico-raciais',
        'Famílias com integrantes LGBTQIAPN+ expostas à LGBTfobia',
        'Mães solo e mães adolescentes estigmatizadas e responsabilizadas individualmente pelo cuidado',
        'Famílias migrantes, refugiadas e apátridas submetidas a xenofobia e barreiras linguísticas',
      ],
      sensitive: false,
    },
    risco: {
      label: 'Risco social e pessoal',
      caracterizacao: 'Ocorrência, suspeita ou iminência de violência, violação de direitos ou ruptura grave dos vínculos familiares e comunitários — cenários de alta complexidade que exigem resposta imediata, protetiva e articulada entre a Proteção Social Básica, a Proteção Social Especial e o Sistema de Garantia de Direitos.',
      situacoes: [
        'Violência intrafamiliar confirmada ou suspeita contra crianças ou outros membros da família',
        'Acolhimento institucional da criança ou de outros integrantes do núcleo familiar',
        'Retorno recente de membro da família do sistema prisional ou de medidas socioeducativas',
        'Trabalho infantil, inclusive em suas piores formas',
        'Situações de tráfico de pessoas ou trabalho análogo à escravidão',
        'Crianças e famílias em situação de rua ou com ameaça iminente de ruptura de vínculos',
      ],
      sensitive: true,
    },
  };

  function renderDimensao(key) {
    const d = dimensoes[key];
    const panel = document.getElementById('tabPanel');
    panel.classList.toggle('is-sensitive', d.sensitive);
    const sensitiveNote = d.sensitive
      ? '<p class="sober-note" style="margin:0 0 12px;">Conteúdo sensível — envolve situações de violência e violação de direitos. Exige acionamento imediato da Proteção Social Especial, conforme protocolo do território.</p>'
      : '';
    panel.innerHTML =
      sensitiveNote +
      '<h3>' + d.label + '</h3>' +
      '<p>' + d.caracterizacao + '</p>' +
      '<p class="situacoes-label">Principais situações</p>' +
      '<ul>' + d.situacoes.map(s => '<li>' + s + '</li>').join('') + '</ul>';
  }

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderDimensao(btn.dataset.tab);
    });
  });
  renderDimensao('renda'); // initial state
} catch (err) {
  console.error('Falha ao iniciar as abas do Quadro 1:', err);
}

// ---------- accordion ----------
try {
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.accordion-item').classList.toggle('open');
    });
  });
} catch (err) {
  console.error('Falha ao iniciar os accordions:', err);
}

// ---------- marcos legais: modal genérico ----------
try {
  const lawTexts = {
    cf227: {
      title: 'Constituição Federal de 1988, art. 227',
      meta: 'Marco constitucional',
      body: '"É dever da família, da sociedade e do Estado assegurar à criança, ao adolescente e ao jovem, com absoluta prioridade, o direito à vida, à saúde, à alimentação, à educação, ao lazer, à profissionalização, à cultura, à dignidade, ao respeito, à liberdade e à convivência familiar e comunitária, além de colocá-los a salvo de toda forma de fragilidade de vínculos, discriminação, exploração, violência, crueldade e opressão."',
    },
    eca: {
      title: 'Estatuto da Criança e do Adolescente — Lei 8.069/1990',
      meta: 'Doutrina da Proteção Integral',
      body: 'Descreve os direitos fundamentais, as provisões das políticas sociais, a política de atendimento, as medidas de proteção, a estrutura e competências do Conselho Tutelar, o acesso à Justiça e as infrações administrativas. Exige do Estado respostas intersetoriais, universais e não discriminatórias, superando os legados excludentes do passado.',
    },
    mlpi: {
      title: 'Marco Legal da Primeira Infância — Lei 13.257/2016',
      meta: 'Diretrizes para políticas de 0 a 6 anos',
      body: 'Estabelece princípios e diretrizes para a formulação e implementação de políticas públicas voltadas ao desenvolvimento integral de crianças de 0 a 6 anos, definindo áreas prioritárias: saúde, nutrição, educação infantil, convivência familiar e comunitária, assistência social à família, cultura, direito ao brincar e proteção contra violências e pressões consumistas.',
    },
    parentalidade: {
      title: 'Lei da Parentalidade Positiva — 2024',
      meta: 'Cuidado e criação das crianças',
      body: 'Orienta o cuidado e a criação das crianças com base no direito ao brincar, na prevenção da violência e na promoção de uma convivência familiar pautada pelo respeito, acolhimento e estímulo ao pleno desenvolvimento.',
    },
    decreto: {
      title: 'Decreto nº 12.574/2025',
      meta: 'Política Nacional Integrada para a Primeira Infância',
      body: 'Institui a Política Nacional Integrada para a Primeira Infância, reforçando a articulação intersetorial entre saúde, educação, assistência social e direitos humanos.',
    },
    spsbd: {
      title: 'Resolução CIT nº 30/2025',
      meta: 'Serviço de Proteção Social Básica no Domicílio',
      body: 'Institui formalmente o Serviço de Proteção Social Básica no Domicílio para Gestantes e Crianças de 0 a 6 anos (SPSBD-GC), conferindo à visita domiciliar papel estruturante na Proteção Social Básica. Entra em vigor em 1º de janeiro de 2027, substituindo o Programa Primeira Infância no SUAS/Criança Feliz, com intervenções articuladas ao CRAS, ao PAIF, ao SCFV e às demais políticas locais.',
    },
  };

  const modalOverlay = document.getElementById('modalOverlay');
  const modalBox = document.getElementById('modalBox');

  function openModal(key) {
    const law = lawTexts[key];
    if (!law) return;
    modalBox.innerHTML =
      '<h3>' + law.title + '</h3>' +
      '<p class="modal-meta">' + law.meta + '</p>' +
      '<p>' + law.body + '</p>' +
      '<button class="modal-close" id="modalCloseBtn">Fechar</button>';
    document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
    modalOverlay.classList.add('show');
  }
  function closeModal() { modalOverlay.classList.remove('show'); }

  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.modal));
  });
  modalOverlay?.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
} catch (err) {
  console.error('Falha ao iniciar os modais dos marcos legais:', err);
}

// ---------- search: filters the sidebar to sections whose text matches ----------
try {
  const navItems = document.querySelectorAll('#navList li');
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
} catch (err) {
  console.error('Falha ao iniciar a busca:', err);
}
