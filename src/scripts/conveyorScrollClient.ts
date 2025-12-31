import { cleanupConveyorScroll, initConveyorScroll } from '../lib/conveyorScroll';

declare global {
  interface Window {
    __conveyorScrollBound?: boolean;
  }
}

if (!window.__conveyorScrollBound) {
  window.__conveyorScrollBound = true;

  const init = () => {
    cleanupConveyorScroll();
    initConveyorScroll();
  };

  document.addEventListener('astro:page-load', init);
  document.addEventListener('astro:before-swap', () => cleanupConveyorScroll());

  // Ensure first-load init even if the script is evaluated after Astro fires events.
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  }
}
