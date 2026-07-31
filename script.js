/**
 * GAIA SMART EARTH — COMPLETE CLIENT ARCHITECTURE
 * Handles UI interactions, E-Commerce state, Dashboard telemetry,
 * Live Environmental API, Gaia AI Chatbot, Chart.js graphs, and accessibility.
 */

import './style.css';

// Global State
const state = {
  theme: localStorage.getItem('gaia-theme') || 'dark',
  highContrast: localStorage.getItem('gaia-contrast') === 'true',
  fontSize: localStorage.getItem('gaia-font-size') || 'normal',
  cart: JSON.parse(localStorage.getItem('gaia-cart') || '[]'),
  promoApplied: false,
  activeCategory: 'all',
  searchQuery: '',
  sortMode: 'featured',
  activeCity: { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  chatHistory: [],
  selectedProduct: null
};

// Eco-Tech Products Catalog Database (12 Certified Innovations)
const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Gaia Quantum Solar Nanofilm',
    category: 'solar',
    price: 499.00,
    impact: '1.8 Tons CO₂/Yr',
    rating: 4.9,
    reviewsCount: 184,
    stock: 24,
    delivery: 'Free Eco Shipping',
    icon: 'sun',
    color: 'bg-gradient-solar',
    description: 'Ultra-thin, 360° flexible photovoltaic nanofilm featuring 41.2% quantum solar conversion efficiency. Directly adheres to building glass and vehicle roofs.',
    specs: ['Efficiency: 41.2%', 'Weight: 180g/m²', 'Lifespan: 30 Years', 'Gaia Mesh Enabled']
  },
  {
    id: 'prod-2',
    name: 'Bio-Sensing Water Purifier Cell',
    category: 'water',
    price: 349.00,
    impact: '5,000L Pure Water/Day',
    rating: 4.8,
    reviewsCount: 128,
    stock: 15,
    delivery: '2-Day Shipping',
    icon: 'droplet',
    color: 'bg-gradient-water',
    description: 'Graphene-membrane water purification cell with embedded micro-sensors detecting and neutralizing 99.99% of heavy metals and microplastics.',
    specs: ['Purification Rate: 5,000L/Day', 'Power: Solar Micro-Capacitor', 'Filter Type: Graphene Nanopore', 'Telemetry: Real-time AQI/Water']
  },
  {
    id: 'prod-3',
    name: 'Atmospheric CO₂ Direct Synthesizer',
    category: 'air',
    price: 899.00,
    impact: '2.4 Tons CO₂/Yr',
    rating: 5.0,
    reviewsCount: 96,
    stock: 8,
    delivery: 'Express Air Freight',
    icon: 'wind',
    color: 'bg-gradient-air',
    description: 'Compact direct air capture unit that extracts ambient carbon dioxide and mineralizes it into solid, non-toxic building composite bricks.',
    specs: ['CO₂ Absorption: 2.4 Tons/Year', 'Power Draw: 45W (Solar Compatible)', 'Byproduct: Eco-Composite Bricks', 'Maintenance: Auto-Self Clean']
  },
  {
    id: 'prod-4',
    name: 'Ocean Cleantech Autonomous Rover',
    category: 'robotics',
    price: 1299.00,
    impact: '120kg Marine Waste/Wk',
    rating: 4.9,
    reviewsCount: 64,
    stock: 5,
    delivery: 'Freight Ship',
    icon: 'ship',
    color: 'bg-gradient-ocean',
    description: 'Solar-powered autonomous floating rover designed to scan coastlines, collect marine micro-debris, and monitor reef biodiversity.',
    specs: ['Range: Unlimited (Solar Powered)', 'AI Navigation: LiDAR + Satellite', 'Payload: 25kg Trash Bin', 'Data: Reef Health Stream']
  },
  {
    id: 'prod-5',
    name: 'Smart Agriculture Sensor Mesh Kit',
    category: 'sensors',
    price: 249.00,
    impact: '35% Water Saved/Crop',
    rating: 4.7,
    reviewsCount: 210,
    stock: 42,
    delivery: 'Free Eco Shipping',
    icon: 'cpu',
    color: 'bg-gradient-solar',
    description: 'A set of 6 subterranean soil chemistry probes analyzing nitrogen levels, soil moisture, and pH to optimize agricultural yield with zero runoff.',
    specs: ['Probes Count: 6 Mesh Nodes', 'Battery: 10-Year Kinetic Harvest', 'Wireless: Gaia Mesh LoRa', 'AI Insights: Daily Crop Advisory']
  },
  {
    id: 'prod-6',
    name: 'Decentralized Microgrid Solar Inverter',
    category: 'solar',
    price: 649.00,
    impact: 'Reduces Grid Waste 40%',
    rating: 4.8,
    reviewsCount: 115,
    stock: 19,
    delivery: '2-Day Shipping',
    icon: 'zap',
    color: 'bg-gradient-water',
    description: 'AI-managed bidirectional solar inverter allowing neighborhoods to automatically share surplus renewable power without transmission loss.',
    specs: ['Efficiency: 99.1%', 'Peak Capacity: 12kW', 'Grid AI: Autonomous Balancing', 'Encryption: Military Grade']
  },
  {
    id: 'prod-7',
    name: 'Solid-State Graphene Battery Bank',
    category: 'battery',
    price: 1199.00,
    impact: '30kWh Zero-Loss Storage',
    rating: 4.9,
    reviewsCount: 150,
    stock: 12,
    delivery: 'Hazmat Safe Express',
    icon: 'battery-charging',
    color: 'bg-gradient-solar',
    description: 'Ultra-safe solid-state graphene battery cell providing 30kWh residential clean energy storage with 10,000+ deep cycles and rapid 18-minute solar charging.',
    specs: ['Capacity: 30kWh Solid-State', 'Lifespan: 10,000+ Deep Cycles', 'Charge Time: 18 Mins', 'Safety: Zero Thermal Runaway']
  },
  {
    id: 'prod-8',
    name: 'Hydrogen Fuel Cell Micro-Generator',
    category: 'energy',
    price: 1499.00,
    impact: '8.5kW Clean H₂ Power',
    rating: 5.0,
    reviewsCount: 48,
    stock: 6,
    delivery: 'White Glove Installation',
    icon: 'flame',
    color: 'bg-gradient-air',
    description: 'Zero-emission quiet hydrogen generator utilizing solar-electrolyzed water to supply continuous baseline electricity with water vapor as the sole byproduct.',
    specs: ['Output: 8.5kW Baseline', 'Noise Level: 12dB (Silent)', 'Fuel Source: Pure Water/H₂', 'Emissions: Pure Water Vapor']
  },
  {
    id: 'prod-9',
    name: 'AI Bio-Dome Atmospheric Scrubber',
    category: 'air',
    price: 749.00,
    impact: '+350L Pure Oxygen/Hr',
    rating: 4.8,
    reviewsCount: 82,
    stock: 14,
    delivery: 'Free Eco Shipping',
    icon: 'leaf',
    color: 'bg-gradient-water',
    description: 'Vertical bio-scrubber utilizing genetically optimized micro-algae pods to absorb air toxins, particulates, and greenhouse gases while releasing fresh oxygen.',
    specs: ['Oxygen Yield: +350L/hr', 'VOC Capture: 99.97%', 'Pods: Auto-Refilling Algae', 'Lighting: Dynamic Solar LED']
  },
  {
    id: 'prod-10',
    name: 'Kinetic Eco-Tile Flooring Matrix',
    category: 'sensors',
    price: 399.00,
    impact: '7W Harvested per Step',
    rating: 4.6,
    reviewsCount: 175,
    stock: 30,
    delivery: 'Standard Shipping',
    icon: 'footprints',
    color: 'bg-gradient-ocean',
    description: 'Piezoelectric flooring tiles converting foot traffic energy into storeable electricity for public plazas, building lobbies, and smart eco-homes.',
    specs: ['Energy Yield: 7W per step', 'Durability: 50M Footsteps', 'Material: Recycled Ocean Plastic', 'Telemetry: Step Counter API']
  },
  {
    id: 'prod-11',
    name: 'Autonomous Reforestation Drone Pod',
    category: 'robotics',
    price: 1899.00,
    impact: '1,200 Seed Trees/Hr',
    rating: 5.0,
    reviewsCount: 39,
    stock: 4,
    delivery: 'Secure Freight',
    icon: 'plane',
    color: 'bg-gradient-solar',
    description: 'Heavy-lift hexacopter drone equipped with 3D LiDAR mapping to precisely plant nutrient-encapsulated native tree seeds across remote forest zones.',
    specs: ['Planting Speed: 1,200/hr', 'Flight Range: 60 Mins', 'Sensor: 3D LiDAR Mesh', 'Pods: Nutrient Gel Coated']
  },
  {
    id: 'prod-12',
    name: 'Deep Geothermal Thermal Converter',
    category: 'energy',
    price: 2100.00,
    impact: '15kW 24/7 Baseline Yield',
    rating: 4.9,
    reviewsCount: 29,
    stock: 3,
    delivery: 'Custom Delivery',
    icon: 'activity',
    color: 'bg-gradient-air',
    description: 'Commercial thermoelectric module generating continuous 24/7 baseline power from ground thermal gradient differentials without moving parts.',
    specs: ['Output: 15kW Baseline 24/7', 'Min Differential: 20°C Delta', 'Lifespan: 50 Years', 'Enclosure: Titanium Shell']
  }
];

// Offline Gaia AI Knowledge Base for Graceful Fallback
const GAIA_OFFLINE_KNOWLEDGE = {
  solar: "Our Quantum Solar Nanofilms utilize multi-junction perovskite-silicon layers to achieve over 41% energy conversion. When paired with Gaia Microgrids, excess energy is automatically routed to nearby battery banks.",
  water: "Gaia Bio-Sensing Water Cells use multi-layer graphene nanopores. Micro-sensors measure particle density every second and automatically flush impelling contaminants.",
  carbon: "Direct Air Capture units accelerate natural carbon mineralization. Trapped ambient CO₂ reacts with calcium silicate to form stable carbonates, safely isolating carbon for centuries.",
  general: "I am Gaia AI, operating securely via local environmental telemetry. I can guide you through sustainable technology hardware, smart solar integration, and carbon footprint reduction strategies."
};

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initAccessibility();
  initCustomCursor();
  initPreloader();
  initHeaderAndScroll();
  initGlobalSearch();
  initAppleSidebar();
  initStore();
  initCart();
  initDashboard();
  initLiveData();
  initGaiaChat();
  initAnalyticsCharts();
  initFAQ();
  initStatsCounter();
  initContactForm();
  
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/* --------------------------------------------------------------------------
   PRELOADER & HEADER SCROLL
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const status = document.getElementById('preloader-status');

  setTimeout(() => {
    if (status) status.textContent = "Connecting to Gaia Mesh...";
  }, 400);

  setTimeout(() => {
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }
  }, 900);
}

function initHeaderAndScroll() {
  const header = document.getElementById('main-header');
  const progressBar = document.getElementById('scroll-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const clock = document.getElementById('hero-clock');

  // Update Live UTC Clock
  setInterval(() => {
    if (clock) {
      const now = new Date();
      clock.textContent = now.toUTCString().split(' ')[4] + ' UTC';
    }
  }, 1000);

  // Scroll Progress and Sticky Navigation
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    if (progressBar) progressBar.style.width = `${progress}%`;

    if (scrollTop > 50) {
      header?.classList.add('scrolled');
      backToTopBtn?.classList.remove('hidden');
    } else {
      header?.classList.remove('scrolled');
      backToTopBtn?.classList.add('hidden');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Mobile Menu Drawer
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  mobileBtn?.addEventListener('click', () => {
    mobileDrawer?.classList.toggle('hidden');
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer?.classList.add('hidden');
    });
  });
}

/* --------------------------------------------------------------------------
   THEME & ACCESSIBILITY CONTROLS
   -------------------------------------------------------------------------- */
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  const themeBtn = document.getElementById('theme-toggle-btn');

  themeBtn?.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('gaia-theme', state.theme);
    showToast(`Switched to ${state.theme.toUpperCase()} theme`);
  });
}

function initAccessibility() {
  const a11yToggleBtn = document.getElementById('a11y-toggle-btn');
  const a11yMenu = document.getElementById('a11y-menu');
  const fontDec = document.getElementById('font-dec-btn');
  const fontReset = document.getElementById('font-reset-btn');
  const fontInc = document.getElementById('font-inc-btn');
  const contrastBtn = document.getElementById('high-contrast-btn');

  a11yToggleBtn?.addEventListener('click', () => {
    a11yMenu?.classList.toggle('hidden');
  });

  fontDec?.addEventListener('click', () => setFontSize('small'));
  fontReset?.addEventListener('click', () => setFontSize('normal'));
  fontInc?.addEventListener('click', () => setFontSize('large'));

  contrastBtn?.addEventListener('click', () => {
    state.highContrast = !state.highContrast;
    document.documentElement.setAttribute('data-high-contrast', state.highContrast ? 'true' : 'false');
    localStorage.setItem('gaia-contrast', state.highContrast);
    if (contrastBtn) contrastBtn.textContent = `High Contrast: ${state.highContrast ? 'ON' : 'OFF'}`;
    showToast(`High Contrast Mode: ${state.highContrast ? 'ON' : 'OFF'}`);
  });
}

function setFontSize(size) {
  state.fontSize = size;
  document.documentElement.setAttribute('data-font-size', size);
  localStorage.setItem('gaia-font-size', size);
  showToast(`Font size set to ${size}`);
}

/* --------------------------------------------------------------------------
   CUSTOM CURSOR
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Add hover effect on interactive elements
  document.querySelectorAll('a, button, input, select, textarea, .glass-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
}

/* --------------------------------------------------------------------------
   E-COMMERCE STORE CATALOG
   -------------------------------------------------------------------------- */
function initStore() {
  const grid = document.getElementById('product-grid');
  const searchInput = document.getElementById('store-search-input');
  const searchClear = document.getElementById('search-clear-btn');
  const sortSelect = document.getElementById('store-sort-select');
  const categoryTabs = document.querySelectorAll('.category-tab');
  const emptyState = document.getElementById('store-empty-state');
  const resetFilterBtn = document.getElementById('reset-filter-btn');

  function renderProducts() {
    let filtered = PRODUCTS.filter(p => {
      const matchesCat = state.activeCategory === 'all' || p.category === state.activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(state.searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });

    if (state.sortMode === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (state.sortMode === 'price-high') filtered.sort((a, b) => b.price - a.price);

    if (filtered.length === 0) {
      if (grid) grid.innerHTML = '';
      emptyState?.classList.remove('hidden');
      return;
    }

    emptyState?.classList.add('hidden');
    if (!grid) return;

    grid.innerHTML = filtered.map(p => `
      <div class="product-card glass-card" data-id="${p.id}">
        <div class="product-card-img ${p.color}">
          <i data-lucide="${p.icon}" class="product-card-icon"></i>
          <span class="impact-badge-tag"><i data-lucide="leaf"></i> ${p.impact}</span>
          <span class="stock-badge-tag ${p.stock < 10 ? 'low' : ''}">${p.stock} Units Left</span>
        </div>
        <div class="product-card-body">
          <div class="product-meta-row">
            <span class="product-cat-label">${p.category.toUpperCase()}</span>
            <span class="product-rating-box"><i data-lucide="star" class="star-icon"></i> <strong>${p.rating}</strong> (${p.reviewsCount})</span>
          </div>
          <h3 class="product-card-title">${p.name}</h3>
          <p class="product-card-desc">${p.description}</p>
          <div class="product-delivery-info">
            <i data-lucide="truck"></i> <span>${p.delivery}</span>
          </div>
        </div>
        <div class="product-card-footer">
          <div class="price-wrap">
            <span class="product-card-price">$${p.price.toFixed(2)}</span>
            <span class="tax-included-label">Tax & Carbon Credit Included</span>
          </div>
          <button class="btn btn-primary btn-sm add-cart-btn" data-id="${p.id}">
            <i data-lucide="shopping-cart"></i>
            <span>Add</span>
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    // Attach click listeners for card detail modal and add to cart buttons
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.add-cart-btn')) return;
        const prodId = card.getAttribute('data-id');
        openProductModal(prodId);
      });
    });

    document.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const prodId = btn.getAttribute('data-id');
        addToCart(prodId, 1);
      });
    });
  }

  // Category Tab Selection
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeCategory = tab.getAttribute('data-category') || 'all';
      renderProducts();
    });
  });

  // Search Input Listener
  searchInput?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    if (state.searchQuery) {
      searchClear?.classList.remove('hidden');
    } else {
      searchClear?.classList.add('hidden');
    }
    renderProducts();
  });

  searchClear?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    state.searchQuery = '';
    searchClear?.classList.add('hidden');
    renderProducts();
  });

  sortSelect?.addEventListener('change', (e) => {
    state.sortMode = e.target.value;
    renderProducts();
  });

  resetFilterBtn?.addEventListener('click', () => {
    state.activeCategory = 'all';
    state.searchQuery = '';
    if (searchInput) searchInput.value = '';
    categoryTabs.forEach(t => t.classList.remove('active'));
    categoryTabs[0]?.classList.add('active');
    renderProducts();
  });

  renderProducts();
}

/* Modal Dialog Details */
function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  state.selectedProduct = product;
  let modalQty = 1;

  const modal = document.getElementById('product-modal');
  const title = document.getElementById('modal-title');
  const categoryTag = document.getElementById('modal-category-tag');
  const price = document.getElementById('modal-price');
  const desc = document.getElementById('modal-description');
  const impactText = document.getElementById('modal-impact-text');
  const specsList = document.getElementById('modal-specs-list');
  const qtyVal = document.getElementById('modal-qty-val');
  const imgBox = document.getElementById('modal-img-placeholder');
  const icon = document.getElementById('modal-icon');

  if (title) title.textContent = product.name;
  if (categoryTag) categoryTag.textContent = product.category.toUpperCase();
  if (price) price.textContent = `$${product.price.toFixed(2)}`;
  if (desc) desc.textContent = product.description;
  if (impactText) impactText.textContent = product.impact;
  if (qtyVal) qtyVal.textContent = '1';

  if (imgBox) {
    imgBox.className = `modal-img-box ${product.color}`;
  }
  if (icon) icon.setAttribute('data-lucide', product.icon);

  if (specsList) {
    specsList.innerHTML = product.specs.map(s => `<li>• ${s}</li>`).join('');
  }

  if (window.lucide) window.lucide.createIcons();

  modal?.classList.remove('hidden');

  // Quantity pickers inside modal
  const qtyDec = document.getElementById('modal-qty-dec');
  const qtyInc = document.getElementById('modal-qty-inc');
  const addCartBtn = document.getElementById('modal-add-cart-btn');
  const closeBtn = document.getElementById('modal-close-btn');

  const updateQty = (val) => {
    modalQty = Math.max(1, modalQty + val);
    if (qtyVal) qtyVal.textContent = modalQty;
  };

  qtyDec?.replaceWith(qtyDec.cloneNode(true));
  qtyInc?.replaceWith(qtyInc.cloneNode(true));
  addCartBtn?.replaceWith(addCartBtn.cloneNode(true));
  closeBtn?.replaceWith(closeBtn.cloneNode(true));

  document.getElementById('modal-qty-dec')?.addEventListener('click', () => updateQty(-1));
  document.getElementById('modal-qty-inc')?.addEventListener('click', () => updateQty(1));

  document.getElementById('modal-add-cart-btn')?.addEventListener('click', () => {
    addToCart(product.id, modalQty);
    modal?.classList.add('hidden');
  });

  document.getElementById('modal-close-btn')?.addEventListener('click', () => {
    modal?.classList.add('hidden');
  });
}

/* --------------------------------------------------------------------------
   SHOPPING CART DRAWER
   -------------------------------------------------------------------------- */
function initCart() {
  const triggerBtn = document.getElementById('cart-trigger-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const closeBtn = document.getElementById('cart-close-btn');
  const checkoutBtn = document.getElementById('cart-checkout-btn');
  const applyPromoBtn = document.getElementById('apply-promo-btn');
  const promoInput = document.getElementById('cart-promo-input');

  triggerBtn?.addEventListener('click', () => {
    cartDrawer?.classList.remove('hidden');
    renderCart();
  });

  closeBtn?.addEventListener('click', () => {
    cartDrawer?.classList.add('hidden');
  });

  applyPromoBtn?.addEventListener('click', () => {
    const code = promoInput?.value.trim().toUpperCase();
    if (code === 'SMARTEARTH2026') {
      state.promoApplied = true;
      showToast('Promo code SMARTEARTH2026 applied (20% OFF)!');
      renderCart();
    } else {
      showToast('Invalid promo code. Use SMARTEARTH2026 for 20% OFF.');
    }
  });

  checkoutBtn?.addEventListener('click', () => {
    if (state.cart.length === 0) {
      showToast('Your cart is empty!');
      return;
    }

    if (window.confetti) {
      window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }

    showToast('Order confirmed! Thank you for supporting Future Smart Earth.');
    state.cart = [];
    state.promoApplied = false;
    saveCart();
    renderCart();
    cartDrawer?.classList.add('hidden');
  });

  renderCart();
}

function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    state.cart.push({ ...product, quantity: qty });
  }

  saveCart();
  renderCart();
  showToast(`Added ${product.name} to cart!`);
}

function saveCart() {
  localStorage.setItem('gaia-cart', JSON.stringify(state.cart));
}

function renderCart() {
  const badge = document.getElementById('cart-count-badge');
  const list = document.getElementById('cart-items-list');
  const subtotalEl = document.getElementById('cart-subtotal-val');
  const discountRow = document.getElementById('cart-discount-row');
  const discountVal = document.getElementById('cart-discount-val');
  const finalTotalEl = document.getElementById('cart-final-total-val');
  const impactSummary = document.getElementById('cart-impact-summary');

  const totalItems = state.cart.reduce((sum, i) => sum + i.quantity, 0);
  if (badge) badge.textContent = totalItems.toString();

  if (!list) return;

  if (state.cart.length === 0) {
    list.innerHTML = `
      <div class="empty-state-box">
        <p>Your eco-hardware cart is empty.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    if (finalTotalEl) finalTotalEl.textContent = '$0.00';
    if (impactSummary) impactSummary.textContent = 'Total CO₂ Impact Offset: 0.0 Tons';
    discountRow?.classList.add('hidden');
    return;
  }

  list.innerHTML = state.cart.map(item => `
    <div class="cart-item-row">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)} × ${item.quantity}</div>
      </div>
      <div class="qty-picker">
        <button onclick="changeCartQty('${item.id}', -1)" class="qty-btn">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeCartQty('${item.id}', 1)" class="qty-btn">+</button>
      </div>
    </div>
  `).join('');

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = state.promoApplied ? subtotal * 0.20 : 0;
  const finalTotal = subtotal - discount;

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (finalTotalEl) finalTotalEl.textContent = `$${finalTotal.toFixed(2)}`;

  if (state.promoApplied) {
    discountRow?.classList.remove('hidden');
    if (discountVal) discountVal.textContent = `-$${discount.toFixed(2)}`;
  } else {
    discountRow?.classList.add('hidden');
  }

  if (impactSummary) {
    impactSummary.textContent = `Total CO₂ Impact Offset: ${(totalItems * 1.4).toFixed(1)} Tons/Yr`;
  }
}

window.changeCartQty = function(id, delta) {
  const item = state.cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(i => i.id !== id);
  }
  saveCart();
  renderCart();
};

/* --------------------------------------------------------------------------
   INTERACTIVE DASHBOARD
   -------------------------------------------------------------------------- */
function initDashboard() {
  const sliderSolar = document.getElementById('slider-solar-priority');
  const sliderCarbon = document.getElementById('slider-carbon-capture');
  const sliderDrone = document.getElementById('slider-drone-patrol');

  const valSolar = document.getElementById('val-slider-solar');
  const valCarbon = document.getElementById('val-slider-carbon');
  const valDrone = document.getElementById('val-slider-drone');

  const valGridShare = document.getElementById('val-grid-share');
  const barGridShare = document.getElementById('bar-grid-share');

  const simBtn = document.getElementById('dash-sim-btn');
  const resetBtn = document.getElementById('dash-reset-btn');

  function updateDashboardMetrics() {
    const sVal = parseInt(sliderSolar?.value || '85');
    const cVal = parseInt(sliderCarbon?.value || '70');
    const dVal = parseInt(sliderDrone?.value || '90');

    if (valSolar) valSolar.textContent = `${sVal}%`;
    if (valCarbon) valCarbon.textContent = `${cVal}%`;
    if (valDrone) valDrone.textContent = `${dVal}%`;

    const gridShareCalculated = ((sVal * 0.6) + (cVal * 0.2) + (dVal * 0.2)).toFixed(1);
    if (valGridShare) valGridShare.textContent = `${gridShareCalculated}%`;
    if (barGridShare) barGridShare.style.width = `${gridShareCalculated}%`;
  }

  sliderSolar?.addEventListener('input', updateDashboardMetrics);
  sliderCarbon?.addEventListener('input', updateDashboardMetrics);
  sliderDrone?.addEventListener('input', updateDashboardMetrics);

  simBtn?.addEventListener('click', () => {
    showToast('AI Optimizing Grid Strategy Across Active Nodes...');
    if (sliderSolar) sliderSolar.value = '95';
    if (sliderCarbon) sliderCarbon.value = '88';
    if (sliderDrone) sliderDrone.value = '98';
    updateDashboardMetrics();
  });

  resetBtn?.addEventListener('click', () => {
    if (sliderSolar) sliderSolar.value = '85';
    if (sliderCarbon) sliderCarbon.value = '70';
    if (sliderDrone) sliderDrone.value = '90';
    updateDashboardMetrics();
    showToast('Telemetry reset to baseline values.');
  });
}

/* --------------------------------------------------------------------------
   LIVE ENVIRONMENTAL PUBLIC API DATA
   -------------------------------------------------------------------------- */
function initLiveData() {
  const cityChips = document.querySelectorAll('.city-chip');
  const refreshBtn = document.getElementById('api-refresh-btn');

  cityChips.forEach(chip => {
    chip.addEventListener('click', () => {
      cityChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.activeCity = {
        name: chip.getAttribute('data-city'),
        lat: parseFloat(chip.getAttribute('data-lat')),
        lon: parseFloat(chip.getAttribute('data-lon'))
      };
      fetchLiveEnvironmentalData();
    });
  });

  refreshBtn?.addEventListener('click', fetchLiveEnvironmentalData);
  fetchLiveEnvironmentalData();
}

async function fetchLiveEnvironmentalData() {
  const tempVal = document.getElementById('live-temp');
  const tempSub = document.getElementById('live-temp-sub');
  const windVal = document.getElementById('live-wind');
  const windSub = document.getElementById('live-wind-sub');
  const uvVal = document.getElementById('live-uv');
  const updatedTime = document.getElementById('api-updated-time');
  const statusVal = document.getElementById('live-status');

  try {
    if (statusVal) statusVal.textContent = 'FETCHING API...';

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${state.activeCity.lat}&longitude=${state.activeCity.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,uv_index`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('API Response Error');

    const data = await res.json();
    const current = data.current;

    if (tempVal) tempVal.textContent = `${current.temperature_2m}°C`;
    if (tempSub) tempSub.textContent = `Humidity: ${current.relative_humidity_2m}%`;
    if (windVal) windVal.textContent = `${current.wind_speed_10m} km/h`;
    if (windSub) windSub.textContent = `Optimized Wind Energy Yield`;
    if (uvVal) uvVal.textContent = `${current.uv_index || 4.2} UV`;
    if (statusVal) statusVal.textContent = 'LIVE OK';
    if (updatedTime) updatedTime.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;

  } catch (err) {
    console.warn('Live API fetch failed, loading offline fallback data:', err);
    // Graceful Fallback Offline Data
    if (tempVal) tempVal.textContent = '22.4°C';
    if (tempSub) tempSub.textContent = 'Humidity: 58% (Offline Data)';
    if (windVal) windVal.textContent = '14.2 km/h';
    if (windSub) windSub.textContent = 'Stable Coastal Breeze';
    if (uvVal) uvVal.textContent = '5.1 UV';
    if (statusVal) statusVal.textContent = 'OFFLINE MODE';
    if (updatedTime) updatedTime.textContent = `Updated: Offline Environmental Base`;
  }
}

/* --------------------------------------------------------------------------
   GAIA AI CHATBOT CENTERPIECE
   -------------------------------------------------------------------------- */
function initGaiaChat() {
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');
  const messagesContainer = document.getElementById('chat-messages');
  const typingIndicator = document.getElementById('typing-indicator');
  const promptChips = document.querySelectorAll('.prompt-chip');
  const clearBtn = document.getElementById('clear-chat-btn');
  const quickAiBtn = document.getElementById('quick-ai-btn');

  quickAiBtn?.addEventListener('click', () => {
    document.getElementById('gaia-ai')?.scrollIntoView({ behavior: 'smooth' });
  });

  sendBtn?.addEventListener('click', handleUserSend);

  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUserSend();
    }
  });

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.getAttribute('data-prompt');
      if (text && input) {
        input.value = text;
        handleUserSend();
      }
    });
  });

  clearBtn?.addEventListener('click', () => {
    if (messagesContainer) {
      messagesContainer.innerHTML = `
        <div class="chat-msg msg-assistant">
          <div class="msg-avatar"><i data-lucide="bot"></i></div>
          <div class="msg-bubble">
            <div class="msg-content">
              <p>Greetings! I am <strong>Gaia AI</strong>. Chat history cleared. How can I assist you with eco-hardware or clean energy queries?</p>
            </div>
            <div class="msg-time">Just now</div>
          </div>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
    }
  });

  async function handleUserSend() {
    const text = input?.value.trim();
    if (!text) return;

    if (input) input.value = '';

    // Append User Message
    appendMessage(text, 'user');

    // Show Typing Indicator
    typingIndicator?.classList.remove('hidden');
    scrollToBottom();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      typingIndicator?.classList.add('hidden');

      if (data && data.reply) {
        appendMessage(data.reply, 'assistant');
      } else {
        fallbackGaiaResponse(text);
      }
    } catch (err) {
      console.warn('Backend Gaia AI fetch error, activating local knowledge base:', err);
      typingIndicator?.classList.add('hidden');
      fallbackGaiaResponse(text);
    }
  }

  function fallbackGaiaResponse(query) {
    const qLower = query.toLowerCase();
    let reply = GAIA_OFFLINE_KNOWLEDGE.general;

    if (qLower.includes('solar') || qLower.includes('grid')) reply = GAIA_OFFLINE_KNOWLEDGE.solar;
    if (qLower.includes('water') || qLower.includes('purif')) reply = GAIA_OFFLINE_KNOWLEDGE.water;
    if (qLower.includes('carbon') || qLower.includes('air')) reply = GAIA_OFFLINE_KNOWLEDGE.carbon;

    appendMessage(`*[Offline Gaia Mode]* ${reply}`, 'assistant');
  }

  function appendMessage(content, sender) {
    if (!messagesContainer) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg msg-${sender}`;

    const formattedContent = (window.marked && sender === 'assistant') ? window.marked.parse(content) : `<p>${content}</p>`;

    msgDiv.innerHTML = `
      <div class="msg-avatar">
        <i data-lucide="${sender === 'user' ? 'user' : 'bot'}"></i>
      </div>
      <div class="msg-bubble">
        <div class="msg-content">${formattedContent}</div>
        <div class="msg-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      </div>
    `;

    messagesContainer.appendChild(msgDiv);
    if (window.lucide) window.lucide.createIcons();
    scrollToBottom();
  }

  function scrollToBottom() {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
}

/* --------------------------------------------------------------------------
   DATA VISUALIZATION (CHART.JS)
   -------------------------------------------------------------------------- */
function initAnalyticsCharts() {
  const energyCtx = document.getElementById('chart-energy-mix');
  const carbonCtx = document.getElementById('chart-carbon-trend');

  if (energyCtx && window.Chart) {
    new window.Chart(energyCtx, {
      type: 'doughnut',
      data: {
        labels: ['Solar Nanofilm', 'Smart Micro-Wind', 'Hydro & Marine', 'Geothermal', 'Legacy Fossil'],
        datasets: [{
          data: [42, 28, 18, 8, 4],
          backgroundColor: ['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#374151'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#9ca3af', font: { family: 'Plus Jakarta Sans' } } }
        }
      }
    });
  }

  if (carbonCtx && window.Chart) {
    new window.Chart(carbonCtx, {
      type: 'line',
      data: {
        labels: ['2022', '2023', '2024', '2025', '2026 (Now)', '2028 (Proj)'],
        datasets: [{
          label: 'Direct Carbon Absorbed (Mt)',
          data: [0.8, 1.4, 2.3, 3.8, 4.85, 8.2],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(255,255,255,0.05)' } },
          y: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(255,255,255,0.05)' } }
        },
        plugins: {
          legend: { labels: { color: '#9ca3af' } }
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question?.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';

      // Close other accordion items
      items.forEach(i => {
        i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        i.querySelector('.faq-answer')?.classList.add('hidden');
      });

      if (!isExpanded) {
        question.setAttribute('aria-expanded', 'true');
        answer?.classList.remove('hidden');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   ANIMATED STATS COUNTER
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target') || '0');
        let count = 0;
        const step = target / 60;

        const updateCount = () => {
          count += step;
          if (count < target) {
            el.textContent = Math.ceil(count).toLocaleString();
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = target.toLocaleString();
          }
        };
        updateCount();
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => observer.observe(num));
}

/* --------------------------------------------------------------------------
   CONTACT FORM VALIDATION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('eco-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const message = document.getElementById('contact-message');

    let valid = true;

    if (!name?.value.trim()) {
      showFieldError('error-name');
      valid = false;
    } else hideFieldError('error-name');

    if (!email?.value.trim() || !email.value.includes('@')) {
      showFieldError('error-email');
      valid = false;
    } else hideFieldError('error-email');

    if (!message?.value.trim()) {
      showFieldError('error-message');
      valid = false;
    } else hideFieldError('error-message');

    if (valid) {
      showToast('Consultation request sent successfully! An eco engineer will contact you shortly.');
      form.reset();
    }
  });

  function showFieldError(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'block';
  }
  function hideFieldError(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  }
}

/* --------------------------------------------------------------------------
   TOAST NOTIFICATION UTILITY
   -------------------------------------------------------------------------- */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i data-lucide="info" style="color: var(--accent-cyan);"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* --------------------------------------------------------------------------
   GLOBAL SEARCH MODAL (CMD+K / CTRL+K FEATURE & STORE SEARCH)
   -------------------------------------------------------------------------- */
function initGlobalSearch() {
  const openBtn = document.getElementById('global-search-btn');
  const sidebarSearchTrigger = document.getElementById('sidebar-search-trigger');
  const modal = document.getElementById('global-search-modal');
  const closeBtn = document.getElementById('global-search-close-btn');
  const input = document.getElementById('global-search-input');
  const resultsContainer = document.getElementById('global-search-results');

  const FEATURES_CATALOG = [
    { title: 'About Gaia Smart Earth Mission', category: 'Section', icon: 'globe-2', link: '#about' },
    { title: 'Hardware & Software Key Specs', category: 'Section', icon: 'cpu', link: '#features' },
    { title: 'Future Smart Hardware Eco-Store', category: 'Store', icon: 'shopping-bag', link: '#store' },
    { title: 'Planetary Health Control Room', category: 'Dashboard', icon: 'layout-dashboard', link: '#dashboard' },
    { title: 'Live Open-Meteo Telemetry Stream', category: 'Live API', icon: 'radio', link: '#live-data' },
    { title: 'Gaia AI Interactive Intelligence', category: 'AI Assistant', icon: 'sparkles', link: '#gaia-ai' },
    { title: 'Chart.js Renewable Analytics', category: 'Analytics', icon: 'line-chart', link: '#analytics' },
    { title: '2030 Sustainability Roadmap', category: 'Roadmap', icon: 'compass', link: '#timeline' },
    { title: 'Frequently Asked Questions', category: 'FAQ', icon: 'help-circle', link: '#faq' },
    { title: 'Consultation & Contact Engineers', category: 'Contact', icon: 'mail', link: '#contact' },
    { title: 'Gaia AI Prompt: Quantum Solar Conversion', category: 'AI Prompt', icon: 'zap', aiQuery: 'Explain how Quantum Solar Nanofilm converts energy at 41% efficiency' },
    { title: 'Gaia AI Prompt: Direct Air CO₂ Capture', category: 'AI Prompt', icon: 'wind', aiQuery: 'Calculate the total atmospheric CO₂ captured by 10 Direct Synthesizers' },
    { title: 'Gaia AI Prompt: Smart Microgrid Optimization', category: 'AI Prompt', icon: 'battery-charging', aiQuery: 'How does the solid-state graphene battery integrate with local microgrids?' }
  ];

  function openModal() {
    modal?.classList.remove('hidden');
    setTimeout(() => input?.focus(), 100);
    renderSearchResults('');
  }

  function closeModal() {
    modal?.classList.add('hidden');
    if (input) input.value = '';
  }

  openBtn?.addEventListener('click', openModal);
  sidebarSearchTrigger?.addEventListener('click', () => {
    if (window.closeAppleSidebar) window.closeAppleSidebar();
    openModal();
  });
  closeBtn?.addEventListener('click', closeModal);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Global Keyboard listener for Cmd+K / Ctrl+K and Esc
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal?.classList.contains('hidden')) {
        openModal();
      } else {
        closeModal();
      }
    }
    if (e.key === 'Escape' && !modal?.classList.contains('hidden')) {
      closeModal();
    }
  });

  input?.addEventListener('input', (e) => {
    renderSearchResults(e.target.value.trim().toLowerCase());
  });

  function renderSearchResults(query) {
    if (!resultsContainer) return;

    let matchedProducts = PRODUCTS.filter(p => 
      !query || p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
    );

    let matchedFeatures = FEATURES_CATALOG.filter(f => 
      !query || f.title.toLowerCase().includes(query) || f.category.toLowerCase().includes(query)
    );

    if (matchedProducts.length === 0 && matchedFeatures.length === 0) {
      resultsContainer.innerHTML = `
        <div class="no-search-results">
          <i data-lucide="search-x"></i>
          <p>No features or products found matching "<strong>${query}</strong>"</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    let html = '';

    if (matchedFeatures.length > 0) {
      html += `<div class="search-group-title">FEATURES & PLATFORM</div>`;
      html += matchedFeatures.slice(0, 5).map(f => `
        <div class="search-result-item" data-type="feature" data-link="${f.link || ''}" data-ai="${f.aiQuery || ''}">
          <div class="result-icon-box">
            <i data-lucide="${f.icon}"></i>
          </div>
          <div class="result-info">
            <span class="result-title">${f.title}</span>
            <span class="result-sub">${f.category}</span>
          </div>
          <i data-lucide="chevron-right" class="result-arrow"></i>
        </div>
      `).join('');
    }

    if (matchedProducts.length > 0) {
      html += `<div class="search-group-title">ECO-STORE PRODUCTS (${matchedProducts.length})</div>`;
      html += matchedProducts.slice(0, 6).map(p => `
        <div class="search-result-item" data-type="product" data-prod-id="${p.id}">
          <div class="result-icon-box ${p.color}">
            <i data-lucide="${p.icon}"></i>
          </div>
          <div class="result-info">
            <span class="result-title">${p.name}</span>
            <span class="result-sub">$${p.price.toFixed(2)} • ${p.impact} • ${p.rating}★</span>
          </div>
          <span class="result-action-tag">View Hardware</span>
        </div>
      `).join('');
    }

    resultsContainer.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();

    // Attach click handlers
    document.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const type = item.getAttribute('data-type');
        closeModal();

        if (type === 'product') {
          const prodId = item.getAttribute('data-prod-id');
          openProductModal(prodId);
        } else if (type === 'feature') {
          const link = item.getAttribute('data-link');
          const aiQuery = item.getAttribute('data-ai');

          if (aiQuery) {
            const chatInput = document.getElementById('chat-user-input');
            const chatSection = document.getElementById('gaia-ai');
            if (chatInput) chatInput.value = aiQuery;
            chatSection?.scrollIntoView({ behavior: 'smooth' });
          } else if (link) {
            const targetEl = document.querySelector(link);
            targetEl?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   APPLE-STYLE SCROLLABLE SIDEBAR DRAWER
   -------------------------------------------------------------------------- */
function initAppleSidebar() {
  const trigger = document.getElementById('topbar-sidebar-trigger');
  const drawer = document.getElementById('apple-sidebar-drawer');
  const closeBtn = document.getElementById('sidebar-close-btn');

  function openSidebar() {
    drawer?.classList.remove('hidden');
  }

  window.closeAppleSidebar = function() {
    drawer?.classList.add('hidden');
  };

  trigger?.addEventListener('click', openSidebar);
  closeBtn?.addEventListener('click', window.closeAppleSidebar);

  drawer?.addEventListener('click', (e) => {
    if (e.target === drawer) window.closeAppleSidebar();
  });

  // Sidebar links with category filter capability
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const catFilter = link.getAttribute('data-cat-filter');
      window.closeAppleSidebar();

      if (catFilter) {
        state.activeCategory = catFilter;
        document.querySelectorAll('.category-tab').forEach(t => {
          t.classList.toggle('active', t.getAttribute('data-category') === catFilter);
        });
        const storeSection = document.getElementById('store');
        storeSection?.scrollIntoView({ behavior: 'smooth' });
        
        // Trigger filter refresh
        const searchInput = document.getElementById('store-search-input');
        if (searchInput) searchInput.dispatchEvent(new Event('input'));
      }
    });
  });
}
