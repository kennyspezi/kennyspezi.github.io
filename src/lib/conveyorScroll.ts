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

function getBodyPaddingTopPx(): number {
  const value = window.getComputedStyle(document.body).paddingTop;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getFrameHeightPx(): number {
  return Math.max(window.innerHeight - getBodyPaddingTopPx(), 1);
}

function setFrameHeightVar(conveyorBelt: HTMLElement) {
  conveyorBelt.style.setProperty('--conveyor-frame-height', `${getFrameHeightPx()}px`);
}

export function initConveyorScroll() {
  // Ensure we don't stack triggers/listeners on re-inits (HMR / view transitions)
  cleanupConveyorScroll();

  const homePage = document.querySelector('.home-page') as HTMLElement;
  const conveyorBelt = document.querySelector('.conveyor-belt') as HTMLElement;
  const conveyorTrack = document.querySelector('.conveyor-track') as HTMLElement;
  const heroSection = document.querySelector('.hero-content-section') as HTMLElement;
  const bentoBoxSection = document.querySelector('.bento-box-section') as HTMLElement;
  const heroContent = heroSection?.querySelector('.hero-content') as HTMLElement | null;

  if (!homePage || !conveyorBelt || !conveyorTrack || !heroSection || !bentoBoxSection) {
    console.warn('Conveyor scroll elements not found');
    return;
  }

  // Ensure the frame height CSS var is correct for the current viewport.
  setFrameHeightVar(conveyorBelt);

  // Accessibility: if the user prefers reduced motion, keep everything in normal flow
  // and skip pinning/scrubbing entirely.
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    conveyorBelt.classList.remove('is-frame');
    conveyorBelt.classList.add('is-unlocked');
    gsap.set(conveyorTrack, { clearProps: 'transform' });
    gsap.set(bentoBoxSection, { opacity: 1, clearProps: 'transform' });
    if (heroContent) {
      gsap.set(heroContent, { opacity: 1, clearProps: 'transform' });
    }
    return;
  }

  // Slideshow starts in "frame" mode.
  conveyorBelt.classList.add('is-frame');
  conveyorBelt.classList.remove('is-unlocked');

  const refreshAfterLayout = () => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  // Reset initial styles (JS-enhancement only; CSS should remain visible if JS doesn't run)
  gsap.set(conveyorTrack, { y: 0 });
  gsap.set(bentoBoxSection, { opacity: 0 });
  if (heroContent) {
    gsap.set(heroContent, { opacity: 1 });
  }

  // Create the main scroll timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: conveyorBelt,
      // The site applies a global top padding for the header. Align the start to that
      // so the trigger is at 0% progress on initial load.
      start: () => `top top+=${getBodyPaddingTopPx()}`,
      // One "slide" worth of scroll: hero -> bento.
      end: () => `+=${getFrameHeightPx()}`,
      scrub: 0.35,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      // Better mobile handling
      invalidateOnRefresh: true,
      onEnter: () => {
        setFrameHeightVar(conveyorBelt);
        conveyorBelt.classList.add('is-frame');
        conveyorBelt.classList.remove('is-unlocked');
        // Ensure spacer measurements match the frame mode.
        refreshAfterLayout();
      },
      onEnterBack: () => {
        setFrameHeightVar(conveyorBelt);
        conveyorBelt.classList.add('is-frame');
        conveyorBelt.classList.remove('is-unlocked');
        // When re-entering from below, ensure the track is at the end state.
        gsap.set(conveyorTrack, { y: -getFrameHeightPx() });
        gsap.set(bentoBoxSection, { opacity: 1 });
        if (heroContent) {
          gsap.set(heroContent, { opacity: 0 });
        }
        refreshAfterLayout();
      },
      onLeave: () => {
        // End of slideshow: return to normal flow so the bento can scroll naturally.
        conveyorBelt.classList.remove('is-frame');
        conveyorBelt.classList.add('is-unlocked');
        // Reset the track so bento is in normal document flow.
        gsap.set(conveyorTrack, { y: 0 });
        gsap.set(bentoBoxSection, { opacity: 1 });
        refreshAfterLayout();
      },
      onLeaveBack: () => {
        // Back in slideshow mode.
        conveyorBelt.classList.add('is-frame');
        conveyorBelt.classList.remove('is-unlocked');
        refreshAfterLayout();
      },
    },
  });

  // Slideshow transition:
  // - Move the track up by one frame height (hero slide out, bento slide in)
  // - Fade hero out and bento in during the same scroll
  tl.to(conveyorTrack, {
    y: () => -getFrameHeightPx(),
    ease: 'none',
    duration: 1,
  }, 0);

  if (heroContent) {
    tl.to(heroContent, {
      opacity: 0,
      ease: 'none',
      duration: 1,
    }, 0);
  }

  tl.to(bentoBoxSection, {
    opacity: 1,
    ease: 'none',
    duration: 1,
  }, 0);

  // Store reference for cleanup
  scrollTriggerInstance = tl.scrollTrigger as ScrollTrigger;

  // Note: avoid verbose logging in production; keep this file focused on behavior.

  // Refresh ScrollTrigger on resize
  resizeHandler = () => {
    setFrameHeightVar(conveyorBelt);
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
  gsap.killTweensOf('.conveyor-track');
  gsap.killTweensOf('.hero-content');
  gsap.killTweensOf('.bento-box-section');
  
  // Clear inline styles
  const homePage = document.querySelector('.home-page') as HTMLElement;
  const conveyorBelt = document.querySelector('.conveyor-belt') as HTMLElement;
  const conveyorTrack = document.querySelector('.conveyor-track') as HTMLElement;
  const heroContent = document.querySelector('.hero-content') as HTMLElement;
  const bentoBoxSection = document.querySelector('.bento-box-section') as HTMLElement;
  const heroSection = document.querySelector('.hero-content-section') as HTMLElement;
  
  if (homePage) {
    gsap.set(homePage, { clearProps: 'all' });
  }
  if (conveyorBelt) {
    conveyorBelt.classList.remove('is-frame');
    conveyorBelt.classList.remove('is-unlocked');
    conveyorBelt.style.removeProperty('--conveyor-frame-height');
    gsap.set(conveyorBelt, { clearProps: 'all' });
  }
  if (conveyorTrack) {
    gsap.set(conveyorTrack, { clearProps: 'all' });
  }
  if (heroContent) {
    gsap.set(heroContent, { clearProps: 'all' });
  }
  if (heroSection) {
    heroSection.style.removeProperty('display');
  }
  if (bentoBoxSection) {
    gsap.set(bentoBoxSection, { clearProps: 'all' });
  }
}
