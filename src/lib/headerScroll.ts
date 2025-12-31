/**
 * Header Scroll Logic
 * Extracted from Header.astro
 * 
 * Handles header hide/show on scroll with smooth animations
 * and mobile menu toggle functionality
 */

let lastScrollY = 0;
let ticking = false;

/**
 * Update header visibility based on scroll direction
 */
function updateHeaderVisibility() {
  const header = document.querySelector('.site-header') as HTMLElement;
  if (!header) return;

  const currentScrollY = window.pageYOffset;
  
  // Show header when scrolling up, hide when scrolling down
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    // Scrolling down & past threshold
    header.classList.add('hidden');
  } else {
    // Scrolling up or at top
    header.classList.remove('hidden');
  }
  
  lastScrollY = currentScrollY;
  ticking = false;
}

/**
 * Request animation frame for performance
 */
function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateHeaderVisibility);
    ticking = true;
  }
}

/**
 * Toggle mobile menu visibility
 */
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const menuBtn = document.getElementById('menuBtn');
  
  if (!mobileMenu || !menuBtn) return;
  
  const isOpen = mobileMenu.classList.contains('open');
  
  if (isOpen) {
    mobileMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    // Re-enable body scroll
    document.body.style.overflow = '';
  } else {
    mobileMenu.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Close mobile menu (used when clicking links)
 */
function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const menuBtn = document.getElementById('menuBtn');
  
  if (!mobileMenu || !menuBtn) return;
  
  mobileMenu.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

/**
 * Initialize header scroll behavior
 */
export function initHeaderScroll() {
  // Listen to scroll events with RAF for performance
  window.addEventListener('scroll', requestTick, { passive: true });
  
  // Initialize lastScrollY
  lastScrollY = window.pageYOffset;
}

/**
 * Initialize mobile menu functionality
 */
export function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenuLinks = document.querySelectorAll('#mobileMenu a');
  
  if (menuBtn) {
    // Toggle menu on button click
    menuBtn.addEventListener('click', toggleMobileMenu);
  }
  
  // Close menu when clicking any link
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });
}

/**
 * Initialize both header scroll and mobile menu
 */
export function initHeader() {
  initHeaderScroll();
  initMobileMenu();
}

/**
 * Setup header with proper event listeners for Astro transitions
 */
export function setupHeader() {
  const init = () => initHeader();
  
  document.addEventListener("DOMContentLoaded", init);
  document.addEventListener("astro:page-load", init);
  
  // Initialize immediately if DOM is already ready
  if (document.readyState === "complete" || document.readyState === "interactive") {
    init();
  }
}

/**
 * Cleanup function (for SPA transitions)
 */
export function cleanupHeader() {
  // Remove scroll listener
  window.removeEventListener('scroll', requestTick);
  
  // Reset body overflow
  document.body.style.overflow = '';
}
