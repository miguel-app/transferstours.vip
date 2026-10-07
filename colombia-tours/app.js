/**
 * Transfers & Tours Colombia - Master English Hub Application Logic
 * Lightweight, Vanilla JS for interactive fare calculations, category filtering, and WhatsApp integrations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Tour Pricing Data Configuration (Base USD Rates)
  const toursData = {
    'zipaquira-salt': {
      name: 'Zipaquirá Salt Cathedral Day Tour',
      sharedPrice: 99,
      privatePrice: 140,
      lunchCost: 15
    },
    'bogota-3day': {
      name: '3-Day Bogotá Capital Essential Tour',
      sharedPrice: 220,
      privatePrice: 290,
      lunchCost: 40
    },
    'medellin-4day': {
      name: '4-Day Medellín & Guatapé Rock Tour',
      sharedPrice: 320,
      privatePrice: 450,
      lunchCost: 50
    },
    'coffee-5day': {
      name: '5-Day Bogotá & Coffee Triangle Adventure',
      sharedPrice: 480,
      privatePrice: 650,
      lunchCost: 75
    },
    'cartagena-5day': {
      name: '5-Day Bogotá & Cartagena Caribbean Express',
      sharedPrice: 550,
      privatePrice: 720,
      lunchCost: 80
    },
    'tatacoa-5day': {
      name: '5-Day Ancestors Route: Tatacoa & San Agustín',
      sharedPrice: 460,
      privatePrice: 620,
      lunchCost: 70
    },
    'parque-cafe': {
      name: 'Coffee Park & Quindío Day Tour',
      sharedPrice: 110,
      privatePrice: 160,
      lunchCost: 20
    },
    'grand-10day': {
      name: '10-Day Grand Colombia Highlights Tour',
      sharedPrice: 990,
      privatePrice: 1350,
      lunchCost: 150
    }
  };

  // State Management
  let selectedTourKey = 'zipaquira-salt';
  let travelersCount = 1;
  let isPrivate = false;
  let includeLunch = true;

  // DOM Elements
  const tourSelect = document.getElementById('calc-tour-select');
  const travelersDisplay = document.getElementById('calc-travelers-count');
  const btnMinus = document.getElementById('btn-minus');
  const btnPlus = document.getElementById('btn-plus');
  const optShared = document.getElementById('opt-shared');
  const optPrivate = document.getElementById('opt-private');
  const optLunchYes = document.getElementById('opt-lunch-yes');
  const optLunchNo = document.getElementById('opt-lunch-no');
  const priceValue = document.getElementById('price-value');
  const totalPriceValue = document.getElementById('total-price-value');
  const calcPackageTitle = document.getElementById('calc-package-title');
  const calcBookBtn = document.getElementById('calc-book-btn');

  // Helper: COP Exchange Rate (Approximate 4000 COP = 1 USD)
  const USD_TO_COP = 4000;

  function updateCalculator() {
    const tour = toursData[selectedTourKey] || toursData['zipaquira-salt'];
    
    // Calculate per person base
    let basePricePerPerson = isPrivate ? tour.privatePrice : tour.sharedPrice;
    if (!includeLunch) {
      basePricePerPerson = Math.max(20, basePricePerPerson - tour.lunchCost);
    }

    // Total Calculation
    const totalUSD = basePricePerPerson * travelersCount;
    const totalCOP = totalUSD * USD_TO_COP;

    // Formatting
    const formatUSD = (val) => `$${val.toLocaleString('en-US')} USD`;
    const formatCOP = (val) => `(~ $${val.toLocaleString('es-CO')} COP)`;

    if (calcPackageTitle) {
      calcPackageTitle.textContent = `${tour.name} (${travelersCount} Traveler${travelersCount > 1 ? 's' : ''})`;
    }

    if (priceValue) {
      priceValue.textContent = `${formatUSD(basePricePerPerson)} ${formatCOP(basePricePerPerson * USD_TO_COP)}`;
    }

    if (totalPriceValue) {
      totalPriceValue.textContent = `${formatUSD(totalUSD)} ${formatCOP(totalCOP)}`;
    }

    // Update WhatsApp Direct Link
    if (calcBookBtn) {
      const modeText = isPrivate ? 'Private Vehicle' : 'Shared Service';
      const lunchText = includeLunch ? 'With Traditional Lunch' : 'Without Lunch';
      const message = encodeURIComponent(
        `Hi Transfers & Tours Colombia! I would like to book: ${tour.name}.\n` +
        `- Travelers: ${travelersCount}\n` +
        `- Service Type: ${modeText}\n` +
        `- Meal Option: ${lunchText}\n` +
        `- Estimated Total: $${totalUSD} USD.\n` +
        `Please confirm availability and pick-up details.`
      );
      calcBookBtn.href = `https://api.whatsapp.com/send?phone=573146644303&text=${message}`;
    }
  }

  // Event Listeners for Calculator
  if (tourSelect) {
    tourSelect.addEventListener('change', (e) => {
      selectedTourKey = e.target.value;
      updateCalculator();
    });
  }

  if (btnMinus) {
    btnMinus.addEventListener('click', () => {
      if (travelersCount > 1) {
        travelersCount--;
        if (travelersDisplay) travelersDisplay.textContent = travelersCount;
        updateCalculator();
      }
    });
  }

  if (btnPlus) {
    btnPlus.addEventListener('click', () => {
      travelersCount++;
      if (travelersDisplay) travelersDisplay.textContent = travelersCount;
      updateCalculator();
    });
  }

  if (optShared && optPrivate) {
    optShared.addEventListener('click', () => {
      isPrivate = false;
      optShared.classList.add('selected');
      optPrivate.classList.remove('selected');
      updateCalculator();
    });

    optPrivate.addEventListener('click', () => {
      isPrivate = true;
      optPrivate.classList.add('selected');
      optShared.classList.remove('selected');
      updateCalculator();
    });
  }

  if (optLunchYes && optLunchNo) {
    optLunchYes.addEventListener('click', () => {
      includeLunch = true;
      optLunchYes.classList.add('selected');
      optLunchNo.classList.remove('selected');
      updateCalculator();
    });

    optLunchNo.addEventListener('click', () => {
      includeLunch = false;
      optLunchNo.classList.add('selected');
      optLunchYes.classList.remove('selected');
      updateCalculator();
    });
  }

  // 2. Category Tab Filtering
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tourCards = document.querySelectorAll('.tour-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      tourCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. FAQ Accordion Handler
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // Hero Lead Form Submission (WhatsApp Redirect)
  const heroForm = document.getElementById('hero-lead-form');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('hero-name')?.value || '';
      const email = document.getElementById('hero-email')?.value || '';
      const phone = document.getElementById('hero-phone')?.value || '';
      const tour = document.getElementById('hero-tour')?.value || 'Colombia Tour Package';
      const date = document.getElementById('hero-date')?.value || 'Flexible';

      const msg = encodeURIComponent(
        `Hi Transfers & Tours! My name is ${name} (${email}, ${phone}).\n` +
        `I want to book/quote the following tour: ${tour}.\n` +
        `Target Travel Date: ${date}. Please provide booking instructions.`
      );

      window.open(`https://api.whatsapp.com/send?phone=573146644303&text=${msg}`, '_blank');
    });
  }

  // Initialize Calculator on load
  updateCalculator();
});
