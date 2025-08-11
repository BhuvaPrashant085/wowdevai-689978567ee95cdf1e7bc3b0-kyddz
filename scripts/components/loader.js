export async function loadComponent(selector) {
  try {
    const container = document.querySelector(selector);
    if (!container) {
      console.warn(`Container ${selector} not found`);
      return;
    }
    
    const sourceFile = container.dataset.source;
    if (!sourceFile) {
      console.warn(`No data-source attribute found for ${selector}`);
      return;
    }
    
    // Use the correct base path for the project
    const basePath = window.location.origin + '/api/preview-689978567ee95cdf1e7bc3b0/';
    const response = await fetch(basePath + sourceFile);
    
    if (!response.ok) {
      throw new Error(`Failed to load ${sourceFile}: ${response.statusText}`);
    }
    
    const html = await response.text();
    container.innerHTML = html;
    
    // Initialize any component-specific scripts
    initializeComponentScripts(container, sourceFile);
    
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

function initializeComponentScripts(container, sourceFile) {
  // Handle navbar specific functionality
  if (sourceFile.includes('navbar')) {
    initializeNavbar(container);
  }
}

function initializeNavbar(container) {
  const mobileMenuBtn = container.querySelector('[data-id="mobile-menu-btn"]');
  const mobileNav = container.querySelector('[data-id="mobile-nav"]');
  const navOrderBtn = container.querySelector('[data-id="nav-order-btn"]');
  const mobileNavOrderBtn = container.querySelector('[data-id="mobile-nav-order-btn"]');
  
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
      const icon = mobileMenuBtn.querySelector('i');
      if (mobileNav.classList.contains('hidden')) {
        icon.setAttribute('data-lucide', 'menu');
      } else {
        icon.setAttribute('data-lucide', 'x');
      }
      // Reinitialize icons
      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  }
  
  // Handle order buttons in navbar
  [navOrderBtn, mobileNavOrderBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        // Trigger the order modal if on home page
        const orderModal = document.getElementById('order-modal');
        if (orderModal) {
          orderModal.classList.remove('hidden');
          orderModal.classList.add('flex');
          document.body.style.overflow = 'hidden';
        } else {
          // If not on home page, redirect to home page
          window.location.href = 'index.html';
        }
      });
    }
  });
}