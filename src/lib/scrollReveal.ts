/**
 * Scroll Reveal Animation
 * Triggers reveal animations when elements enter the viewport
 */

export interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function initScrollReveal(
  selector: string = '.preview-section',
  options: ScrollRevealOptions = {}
) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -100px 0px',
    once = false
  } = options;

  const observerOptions: IntersectionObserverInit = {
    root: null,
    threshold,
    rootMargin
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        if (once) {
          observer.unobserve(entry.target);
        }
      } else if (!once) {
        entry.target.classList.remove('revealed');
      }
    });
  }, observerOptions);

  // Observe all matching elements
  document.querySelectorAll(selector).forEach(element => {
    observer.observe(element);
  });

  return observer;
}
