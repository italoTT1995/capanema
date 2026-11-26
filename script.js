// Capanema Executive - Interactive Engine
document.addEventListener('DOMContentLoaded', () => {

  // 0. Preloader Splash Screen (Referência Prime)
  const preloader = document.getElementById('capanema-preloader');
  const preloaderMsg = document.getElementById('preloader-msg');
  if (preloader) {
    if (preloaderMsg) {
      setTimeout(() => {
        preloaderMsg.textContent = 'A Capanema Executive te deseja uma ótima viagem';
      }, 750);
    }
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 1550);
  }

  // 0b. Marquee B2B Pause / Play Toggle
  const marqueeToggleBtn = document.getElementById('marquee-toggle-btn');
  const marqueeTrack = document.getElementById('b2b-marquee-track');
  const marqueeStatusText = document.getElementById('marquee-status-text');
  const marqueeIconPause = document.getElementById('marquee-icon-pause');
  const marqueeIconPlay = document.getElementById('marquee-icon-play');
  if (marqueeToggleBtn && marqueeTrack) {
    marqueeToggleBtn.addEventListener('click', () => {
      const isPaused = marqueeTrack.classList.toggle('paused');
      if (marqueeStatusText) {
        marqueeStatusText.textContent = isPaused ? 'PAUSADO' : 'EM MOVIMENTO';
      }
      if (marqueeIconPause && marqueeIconPlay) {
        marqueeIconPause.classList.toggle('hidden', isPaused);
        marqueeIconPlay.classList.toggle('hidden', !isPaused);
      }
    });
  }

  // 0c. FAQ Accordion (Single-open behavior like reference)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      faqItems.forEach(other => {
        other.classList.remove('open');
        const btn = other.querySelector('.faq-trigger');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 1. Mobile Menu Drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileDrawer.classList.remove('translate-x-full');
    drawerBackdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.add('translate-x-full');
    drawerBackdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMobileMenu);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // 2. Navbar Shadow on Scroll
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (header && window.scrollY > 30) {
      header.classList.add('shadow-2xl', 'border-[#c5a059]/30', 'bg-[#121419]/98');
      header.classList.remove('border-white/10', 'bg-[#121419]/92');
    } else if (header) {
      header.classList.remove('shadow-2xl', 'border-[#c5a059]/30', 'bg-[#121419]/98');
      header.classList.add('border-white/10', 'bg-[#121419]/92');
    }
  });

  // 3. Hospitalidade / Experiência a Bordo (Tabs Dinâmicas)
  const bordoData = [
    {
      title: "Bebidas & Refresco Climatizado",
      tagline: "Hidratação de alto padrão para quem valoriza cada momento",
      desc: "Águas minerais com e sem gás mantidas na temperatura ideal, além de opções personalizadas de bebidas para refrescar sua chegada e tornar cada quilômetro suave e revigorante.",
      quote: "O cuidado começa antes mesmo de você fechar a porta.",
      image: "assets/images/bordo/servico-bordo-1.jpeg",
      label: "Foto Real: Climatização & Bebidas a Bordo"
    },
    {
      title: "Café Especial & Mimos Selecionados",
      tagline: "Uma pausa gastronômica acolhedora no meio da sua rotina",
      desc: "Doces finos, chocolates selecionados, bombons e aperitivos rigorosamente escolhidos para proporcionar uma experiência doce e reconfortante durante trajetos urbanos ou viagens intermunicipais.",
      quote: "Mais que um trajeto, uma experiência de boas-vindas.",
      image: "assets/images/bordo/servico-bordo-2.jpeg",
      label: "Foto Real: Seleção de Guloseimas & Mimos"
    },
    {
      title: "Conectividade & Carregador Rápido",
      tagline: "Seu escritório itinerante com energia e velocidade contínuas",
      desc: "Wi-Fi dedicado para trabalhar ou relaxar sem oscilações, e cabos universais com carregamento ultra-rápido (Lightning, USB-C e Micro-USB) compatíveis com todos os smartphones e notebooks.",
      quote: "Nunca fique desconectado entre um compromisso e outro.",
      image: "assets/images/bordo/servico-bordo-3.jpeg",
      label: "Foto Real: Conectividade & Cabos no Apoio Central"
    },
    {
      title: "Higienização & Aromatização Exclusiva",
      tagline: "Ambiente asséptico, fragrância sobriedade e isolamento acústico",
      desc: "Todos os veículos passam por limpeza e sanitização minuciosa antes de cada atendimento. Fragrância exclusiva suave e cabines com isolamento térmico e acústico de última geração para absoluto silêncio ou reuniões confidenciais.",
      quote: "Discrição, serenidade e privacidade sem concessões.",
      image: "assets/images/bordo/servico-bordo-4.jpeg",
      label: "Foto Real: Cabine Executiva Higienizada"
    }
  ];

  const bordoTabs = document.querySelectorAll('.bordo-tab');
  const bordoTitle = document.getElementById('bordo-title');
  const bordoTagline = document.getElementById('bordo-tagline');
  const bordoDesc = document.getElementById('bordo-desc');
  const bordoQuote = document.getElementById('bordo-quote');
  const bordoImg = document.getElementById('bordo-img');
  const bordoLabel = document.getElementById('bordo-label');

  function updateBordoTab(index) {
    bordoTabs.forEach((tab, i) => {
      if (i === index) {
        tab.classList.add('border-[#c5a059]', 'bg-[#c5a059]/10', 'text-white');
        tab.classList.remove('border-white/10', 'bg-[#111115]/60', 'text-gray-400');
        const num = tab.querySelector('.tab-num');
        if (num) num.classList.add('text-[#c5a059]');
      } else {
        tab.classList.remove('border-[#c5a059]', 'bg-[#c5a059]/10', 'text-white');
        tab.classList.add('border-white/10', 'bg-[#111115]/60', 'text-gray-400');
        const num = tab.querySelector('.tab-num');
        if (num) num.classList.remove('text-[#c5a059]');
      }
    });

    const data = bordoData[index];
    if (data && bordoTitle) {
      bordoTitle.textContent = data.title;
      bordoTagline.textContent = data.tagline;
      bordoDesc.textContent = data.desc;
      bordoQuote.textContent = `"${data.quote}"`;
      bordoImg.src = data.image;
      bordoLabel.textContent = data.label;
    }
  }

  bordoTabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => updateBordoTab(idx));
  });

  // 4. Fleet Filter by Category
  const fleetFilterBtns = document.querySelectorAll('.fleet-filter-btn');
  const fleetCards = document.querySelectorAll('.fleet-card');

  fleetFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      fleetFilterBtns.forEach(b => {
        b.classList.remove('bg-gold-gradient', 'text-black', 'font-semibold', 'shadow-lg');
        b.classList.add('bg-[#1B1F27]', 'text-gray-300', 'hover:border-[#c5a059]/50');
      });
      btn.classList.add('bg-gold-gradient', 'text-black', 'font-semibold', 'shadow-lg');
      btn.classList.remove('bg-[#1B1F27]', 'text-gray-300', 'hover:border-[#c5a059]/50');

      fleetCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.classList.remove('hidden');
          card.classList.add('hero-animate');
        } else {
          card.classList.add('hidden');
          card.classList.remove('hero-animate');
        }
      });
    });
  });

  // 5. WhatsApp Fast Quote Form Generator
  const quoteForm = document.getElementById('vip-quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const service = document.getElementById('quote-service').value;
      const origin = document.getElementById('quote-origin').value || 'Não informado';
      const destination = document.getElementById('quote-destination').value || 'Não informado';
      const vehicle = document.getElementById('quote-vehicle').value;
      const date = document.getElementById('quote-date').value || 'A definir';
      const time = document.getElementById('quote-time').value || 'A definir';
      const notes = document.getElementById('quote-notes').value || 'Nenhuma';

      const message = `Olá, Capanema Executive! Gostaria de solicitar um orçamento VIP:\n\n` +
                      `📋 *Serviço:* ${service}\n` +
                      `📍 *Origem:* ${origin}\n` +
                      `🏁 *Destino:* ${destination}\n` +
                      `🚘 *Veículo Desejado:* ${vehicle}\n` +
                      `📅 *Data:* ${date} às ${time}\n` +
                      `📝 *Observações:* ${notes}\n\n` +
                      `Poderiam me informar disponibilidade e valores?`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/5531993008300?text=${encodedMsg}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // 6. Smooth Scroll on Internal Anchor Clicks
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

});

// 7. Google Translate Integration (Clean PT / EN / ES)
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'pt',
    includedLanguages: 'en,es,pt',
    autoDisplay: false
  }, 'google_translate_element');
}

function changeLanguage(langCode) {
  const select = document.querySelector('.goog-te-combo');
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event('change'));
  }
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === langCode) {
      btn.classList.add('border-[#c5a059]', 'text-[#c5a059]', 'bg-[#c5a059]/10');
      btn.classList.remove('text-gray-400', 'border-transparent');
    } else {
      btn.classList.remove('border-[#c5a059]', 'text-[#c5a059]', 'bg-[#c5a059]/10');
      btn.classList.add('text-gray-400', 'border-transparent');
    }
  });
  localStorage.setItem('capanema_pref_lang', langCode);
}
