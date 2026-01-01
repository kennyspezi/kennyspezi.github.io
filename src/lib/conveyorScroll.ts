/**
 * Conveyor Belt Scroll Logic - GSAP ScrollTrigger Implementation
 * 
 * Handles the custom scroll behavior on the home page:
 * 1. Hero section (pinned at top)
 * 2. Scroll down reveals bento box grid with progressive fade-in
 * 3. Continue scrolling unlocks normal page scroll for footer
 * 
 * Uses GSAP ScrollTrigger for smooth, performant scroll animations
 * with built-in accessibility features and better UX.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

let scrollTriggerInstance: ScrollTrigger | null = null;
let resizeHandler: (() => void) | null = null;

// Animation distance constants (relative to viewport height)
const HERO_TRAVEL_FACTOR = 0.32;
const HERO_TRAVEL_MIN_PX = 220;

function getBodyPaddingTopPx(): number {
  const value = window.getComputedStyle(document.body).paddingTop;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function initConveyorScroll() {
  // Ensure we don't stack triggers/listeners on re-inits (HMR / view transitions)
  cleanupConveyorScroll();

  const homePage = document.querySelector('.home-page') as HTMLElement;
  const conveyorBelt = document.querySelector('.conveyor-belt') as HTMLElement;
  const heroSection = document.querySelector('.hero-content-section') as HTMLElement;
  const bentoBoxSection = document.querySelector('.bento-box-section') as HTMLElement;
  const previewSections = document.querySelectorAll('.preview-section') as NodeListOf<HTMLElement>;
  const heroContent = heroSection?.querySelector('.hero-content') as HTMLElement | null;

  if (!homePage || !conveyorBelt || !heroSection || !bentoBoxSection) {
    console.warn('Conveyor scroll elements not found');
    return;
  }

  // Accessibility: if the user prefers reduced motion, keep everything in normal flow
  // and skip pinning/scrubbing entirely.
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    gsap.set(bentoBoxSection, { opacity: 1, y: 0, clearProps: 'transform' });
    gsap.set(previewSections, { opacity: 1, y: 0, clearProps: 'transform' });
    if (heroContent) {
      gsap.set(heroContent, { opacity: 1, y: 0, clearProps: 'transform' });
    }
    return;
  }

  // Reset initial styles (JS-enhancement only; CSS should remain visible if JS doesn't run)
  gsap.set(previewSections, { opacity: 0, y: 30 });
  const heroTravelPx = Math.max(window.innerHeight * HERO_TRAVEL_FACTOR, HERO_TRAVEL_MIN_PX);

  // Position bento at the same vertical position as hero (y: 0) for direct crossfade replacement
  gsap.set(bentoBoxSection, { opacity: 0, y: 0 });
  if (heroContent) {
    gsap.set(heroContent, { opacity: 1, y: 0 });
  }

  // Create the main scroll timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      // The site applies a global top padding for the header. Align the start to that
      // so the trigger is at 0% progress on initial load.
      start: () => `top top+=${getBodyPaddingTopPx()}`,
      // Give enough scroll distance that this reads as a distinct “conveyor phase”,
      // not a tiny fade during normal scrolling.
      end: () => `+=${Math.max(window.innerHeight * 1.35, 800)}`,
      scrub: 0.35,
      pin: true,
      // Use spacing so the document continues to scroll normally under the pinned hero.
      // This avoids translating content out of its own layout box (which caused blank space).
      pinSpacing: true,
      anticipatePin: 1,
      // Better mobile handling
      invalidateOnRefresh: true,
    },
  });

  // Conveyor transition: hero fades out and moves up while bento fades in at the same position
  // This creates a direct crossfade replacement effect where the bento appears in the hero's position
  if (heroContent) {
    tl.to(heroContent, {
      opacity: 0,
      y: -heroTravelPx,
      ease: 'none',
      duration: 0.8,
    }, 0);
  }

  // Bento fades in at the same vertical position (y: 0) where hero started
  tl.to(bentoBoxSection, {
    opacity: 1,
    y: 0,
    ease: 'none',
    duration: 0.9,
  }, 0);

  // Fade in the bento boxes after the section itself starts appearing.
  tl.to(previewSections, {
    opacity: 1,
    y: 0,
    ease: 'none',
    duration: 0.8,
    stagger: 0.04,
  }, 0.35);

  // Store reference for cleanup
  scrollTriggerInstance = tl.scrollTrigger as ScrollTrigger;

  // Note: avoid verbose logging in production; keep this file focused on behavior.

  // Refresh ScrollTrigger on resize
  resizeHandler = () => {
    ScrollTrigger.refresh();
  };
  window.addEventListener('resize', resizeHandler);
}

/**
 * Cleanup function for SPA transitions or page navigation
 */
export function cleanupConveyorScroll() {
  // Kill all ScrollTrigger instances
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
    scrollTriggerInstance = null;
  }

  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
    resizeHandler = null;
  }
  
  // Kill all GSAP animations on conveyor elements
  gsap.killTweensOf('.conveyor-belt');
  gsap.killTweensOf('.preview-section');
  gsap.killTweensOf('.hero-content');
  gsap.killTweensOf('.bento-box-section');
  
  // Clear inline styles
  const homePage = document.querySelector('.home-page') as HTMLElement;
  const conveyorBelt = document.querySelector('.conveyor-belt') as HTMLElement;
  const heroContent = document.querySelector('.hero-content') as HTMLElement;
  const bentoBoxSection = document.querySelector('.bento-box-section') as HTMLElement;
  const previewSections = document.querySelectorAll('.preview-section');
  
  if (homePage) {
    gsap.set(homePage, { clearProps: 'all' });
  }
  if (conveyorBelt) {
    gsap.set(conveyorBelt, { clearProps: 'all' });
  }
  if (heroContent) {
    gsap.set(heroContent, { clearProps: 'all' });
  }
  if (bentoBoxSection) {
    gsap.set(bentoBoxSection, { clearProps: 'all' });
  }
  if (previewSections) {
    gsap.set(previewSections, { clearProps: 'all' });
  }
}
