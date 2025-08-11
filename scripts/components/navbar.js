// Navbar functionality
export function initializeNavbar() {
  const mobileMenuBtn = document.querySelector('[data-id="mobile-menu-btn"]');
  const mobileNav = document.querySelector('[data-id="mobile-nav"]');
  const orderBtns = document.querySelectorAll('[data-id="nav-order-btn"], [data-id="mobile-nav-order-btn"]');

  // Mobile menu toggle
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });
  }

  // Order Now button functionality
  orderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // If on homepage, scroll to order section
      if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const orderSection = document.querySelector('[data-id="order-section"]');
        if (orderSection) {
          orderSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to homepage order section
        window.location.href = 'index.html#order';
      }
    });
  });

  // Highlight active page
  highlightActivePage();
}

function highlightActivePage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a[href]');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('text-orange-600', 'font-medium');
      link.classList.remove('text-gray-700');
    }
  });
}