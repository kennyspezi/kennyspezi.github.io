/**
 * Music Player (Jukebox) Logic
 * Extracted from MusicPlayer.astro
 * 
 * Manages persistent music player state across page transitions
 * with Astro ViewTransitions
 */

export interface Song {
  name: string;
  artist: string;
  file: string;
}

export interface JukeboxState {
  songs: Song[];
  currentIndex: number;
  isPlaying: boolean;
  audio: HTMLAudioElement | null;
  history: number[];
  audioCache: Map<string, HTMLAudioElement>;
  didWarmCache: boolean;
  playOrder: number[];
  orderPos: number;
}

declare global {
  interface Window {
    jukebox?: JukeboxState;
  }
}

function jukeboxDebugEnabled() {
  // Keep this lightweight: always log in dev; allow forcing in prod via ?jukeboxDebug=1.
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.has("jukeboxDebug")) return true;
  } catch {
    // ignore
  }
  return true;
}

function jbLog(...args: unknown[]) {
  if (!jukeboxDebugEnabled()) return;
  // eslint-disable-next-line no-console
  console.log(...args);
}

function jbWarn(...args: unknown[]) {
  if (!jukeboxDebugEnabled()) return;
  // eslint-disable-next-line no-console
  console.warn(...args);
}

/**
 * Fix corrupted state on page load
 */
function fixCorruptedState(songs: Song[]) {
  if (window.jukebox && (
    window.jukebox.isPlaying === undefined || 
    window.jukebox.currentIndex === undefined ||
    window.jukebox.songs === undefined
  )) {
    // Preserve only the audio if it exists
    const existingAudio = window.jukebox.audio;
    const existingHistory = window.jukebox.history || [];
    // Reset to proper initial state
    const safeIndex = window.jukebox.currentIndex ?? Math.floor(Math.random() * songs.length);
    window.jukebox = {
      songs: songs,
      currentIndex: safeIndex,
      isPlaying: existingAudio ? !existingAudio.paused : false,
      audio: existingAudio || null,
      history: existingHistory,
      audioCache: new Map(),
      didWarmCache: false,
      playOrder: songs.map((_, i) => i),
      orderPos: Math.max(0, Math.min(songs.length - 1, safeIndex)),
    };
  }
}

function shuffleInPlace<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildPlayOrder(length: number, startIndex: number) {
  const start = Math.max(0, Math.min(length - 1, startIndex));
  const rest: number[] = [];
  for (let i = 0; i < length; i++) {
    if (i !== start) rest.push(i);
  }
  shuffleInPlace(rest);
  return [start, ...rest];
}

function ensurePlayOrder(songs: Song[]) {
  const jb = window.jukebox;
  if (!jb || !songs || songs.length === 0) return;

  const needsInit = !Array.isArray(jb.playOrder) || jb.playOrder.length !== songs.length;
  const hasInvalidIndex = Array.isArray(jb.playOrder)
    ? jb.playOrder.some((idx) => typeof idx !== "number" || idx < 0 || idx >= songs.length)
    : true;

  if (needsInit || hasInvalidIndex || jb.orderPos == null) {
    const startIndex = jb.currentIndex != null && jb.currentIndex >= 0 && jb.currentIndex < songs.length
      ? jb.currentIndex
      : Math.floor(Math.random() * songs.length);
    jb.playOrder = buildPlayOrder(songs.length, startIndex);
    jb.orderPos = 0;
    jb.currentIndex = jb.playOrder[0] ?? 0;
    jbLog("[jukebox] initialized playOrder", {
      songs: songs.length,
      startIndex: jb.currentIndex,
      orderPos: jb.orderPos,
      playOrder: jb.playOrder,
    });
    return;
  }

  // Keep orderPos and currentIndex consistent.
  if (jb.orderPos < 0 || jb.orderPos >= jb.playOrder.length) jb.orderPos = 0;
  const idxAtPos = jb.playOrder[jb.orderPos];
  if (idxAtPos !== jb.currentIndex) {
    const pos = jb.playOrder.indexOf(jb.currentIndex);
    if (pos >= 0) jb.orderPos = pos;
    else {
      jb.playOrder = buildPlayOrder(songs.length, jb.currentIndex);
      jb.orderPos = 0;
      jb.currentIndex = jb.playOrder[0] ?? 0;
    }
  }
}

function getNextIndexInOrder(): number {
  const jb = window.jukebox;
  if (!jb || !Array.isArray(jb.playOrder) || jb.playOrder.length === 0) return 0;
  const nextPos = (jb.orderPos + 1) % jb.playOrder.length;
  return jb.playOrder[nextPos] ?? jb.currentIndex;
}

function stepOrder(delta: 1 | -1): number {
  const jb = window.jukebox;
  if (!jb || !Array.isArray(jb.playOrder) || jb.playOrder.length === 0) return 0;
  const len = jb.playOrder.length;
  jb.orderPos = (jb.orderPos + delta + len) % len;
  jb.currentIndex = jb.playOrder[jb.orderPos] ?? jb.currentIndex;
  return jb.currentIndex;
}

/**
 * Ensure jukebox state exists with proper defaults
 */
function ensureState(songs: Song[]) {
  if (!window.jukebox) {
    const initialIndex = Math.floor(Math.random() * songs.length);
    const playOrder = buildPlayOrder(songs.length, initialIndex);
    window.jukebox = {
      songs,
      currentIndex: playOrder[0] ?? initialIndex,
      isPlaying: false,
      audio: null,
      history: [],
      audioCache: new Map(),
      didWarmCache: false,
      playOrder,
      orderPos: 0,
    };
  } else if (songs && songs.length > 0) {
    // Preserve existing audio object if it exists
    const existingAudio = window.jukebox.audio;
    const existingIsPlaying = existingAudio ? !existingAudio.paused : false;
    
    window.jukebox.songs = songs; // in case HMR reloads this module
    
    // Always ensure audio and isPlaying have proper values
    if (existingAudio) {
      window.jukebox.audio = existingAudio;
      window.jukebox.isPlaying = existingIsPlaying;
    } else {
      // Ensure defaults if no audio exists
      window.jukebox.audio = null;
      window.jukebox.isPlaying = false;
    }

    // Ensure cache flags exist (older persisted state)
    if (!window.jukebox.audioCache) window.jukebox.audioCache = new Map();
    if (window.jukebox.didWarmCache == null) window.jukebox.didWarmCache = false;

    // Ensure queue state exists (older persisted state)
    if (!Array.isArray(window.jukebox.playOrder) || window.jukebox.playOrder.length !== songs.length) {
      window.jukebox.playOrder = buildPlayOrder(songs.length, window.jukebox.currentIndex ?? 0);
      window.jukebox.orderPos = 0;
    }
    if (window.jukebox.orderPos == null) window.jukebox.orderPos = 0;
    
    // Fix if currentIndex is invalid (undefined, null, or out of range)
    if (window.jukebox.currentIndex == null || 
        window.jukebox.currentIndex >= songs.length || 
        window.jukebox.currentIndex < 0) {
      window.jukebox.currentIndex = 0;
    }
  }
}

function encodeAudioSrc(file: string) {
  // Files include spaces/unicode; ensure a valid URL.
  return encodeURI(file);
}

function getCachedAudio(file: string): HTMLAudioElement {
  const jb = window.jukebox;
  if (!jb) return new Audio(encodeAudioSrc(file));

  const cached = jb.audioCache.get(file);
  if (cached) return cached;

  const audio = new Audio(encodeAudioSrc(file));
  audio.preload = "auto";
  jb.audioCache.set(file, audio);
  return audio;
}

function warmAudioCache(songs: Song[]) {
  const jb = window.jukebox;
  if (!jb || jb.didWarmCache || !songs || songs.length === 0) return;

  jb.didWarmCache = true;
  for (const song of songs) {
    try {
      const audio = getCachedAudio(song.file);
      audio.load();
    } catch {
      // ignore
    }
  }
}

function scheduleWarmAudioCache(root: HTMLElement, songs: Song[]) {
  if (!root || root.dataset.preloadBound === "1") return;
  root.dataset.preloadBound = "1";

  // 1) Try to warm immediately when the browser is idle.
  const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => void }).requestIdleCallback;
  if (typeof ric === "function") {
    ric(() => warmAudioCache(songs), { timeout: 2000 });
  } else {
    setTimeout(() => warmAudioCache(songs), 1200);
  }

  // 2) Also warm on first user interaction to maximize chance it actually fetches.
  const onFirstInteract = () => warmAudioCache(songs);
  root.addEventListener("pointerdown", onFirstInteract, { once: true });
  root.addEventListener("keydown", onFirstInteract, { once: true });
}

/**
 * Update the jukebox display UI
 */
function updateDisplay(root: HTMLElement) {
  if (!root) return;
  
  const title = root.querySelector("#songTitle") as HTMLElement;
  const artist = root.querySelector("#artistName") as HTMLElement;
  const upNext = root.querySelector("#upNext") as HTMLElement | null;
  const playBtn = root.querySelector("#playBtn") as HTMLElement;
  
  if (!title || !artist || !playBtn) {
    if (root.dataset.displayDebugMissing !== "1") {
      root.dataset.displayDebugMissing = "1";
      jbWarn("[jukebox] missing UI elements", {
        hasTitle: Boolean(title),
        hasArtist: Boolean(artist),
        hasPlayBtn: Boolean(playBtn),
        hasUpNext: Boolean(upNext),
      });
    }
    return;
  }

  const jb = window.jukebox;
  if (!jb) {
    jbWarn("[jukebox] no window.jukebox state yet");
    return;
  }
  if (!jb.songs || jb.songs.length === 0) {
    jbWarn("[jukebox] no songs in state", { songs: jb.songs });
    return;
  }
  
  // Sync isPlaying state with actual audio state only if audio exists
  if (jb.audio) {
    jb.isPlaying = !jb.audio.paused;
  }
  
  const song = jb.songs[jb.currentIndex];
  title.textContent = song?.name ?? "";
  artist.textContent = song?.artist ?? "";

  if (upNext) {
    const nextIndex = getNextIndexInOrder();
    const nextSong = jb.songs[nextIndex];
    upNext.textContent = nextSong ? `${nextSong.name} — ${nextSong.artist}` : "";
  }

  if (root.dataset.displayDebugLogged !== "1") {
    root.dataset.displayDebugLogged = "1";
    const nextIndex = getNextIndexInOrder();
    jbLog("[jukebox] display computed", {
      songs: jb.songs.length,
      currentIndex: jb.currentIndex,
      currentSong: jb.songs[jb.currentIndex],
      orderPos: jb.orderPos,
      playOrder: jb.playOrder,
      nextIndex,
      nextSong: jb.songs[nextIndex],
      isPlaying: jb.isPlaying,
      hasAudio: Boolean(jb.audio),
    });
  }
  
  // Force the button to show pause if audio is actively playing
  const shouldShowPause = jb.audio && !jb.audio.paused;
  playBtn.textContent = shouldShowPause ? "⏸ Pause" : "▶ Play";
  if (shouldShowPause) {
    playBtn.classList.add("playing");
  } else {
    playBtn.classList.remove("playing");
  }
}

/**
 * Play a specific song by index
 */
function playSong(index: number, root: HTMLElement) {
  const jb = window.jukebox;
  if (!jb || !jb.songs || !jb.songs[index]) {
    console.error('Cannot play song:', { jb, index });
    return;
  }

  // Ensure we've at least started warming the cache once playback begins.
  warmAudioCache(jb.songs);

  // Add current song to history before changing
  if (jb.currentIndex !== index && jb.history) {
    jb.history.push(jb.currentIndex);
    // Keep history to a reasonable size (last 20 songs)
    if (jb.history.length > 20) {
      jb.history.shift();
    }
  }

  jb.currentIndex = index;
  if (Array.isArray(jb.playOrder)) {
    const pos = jb.playOrder.indexOf(index);
    if (pos >= 0) jb.orderPos = pos;
  }

  const nextAudio = getCachedAudio(jb.songs[index].file);

  if (jb.audio && jb.audio !== nextAudio) jb.audio.pause();
  jb.audio = nextAudio;
  jb.audio.preload = "auto";
  try {
    jb.audio.currentTime = 0;
  } catch {
    // ignore
  }
  jb.audio.load();

  jb.isPlaying = true;
  jb.audio.play().catch((err) => {
    console.error('Audio play failed:', err);
    console.error('File path:', jb.songs[index].file);
  });
  
  // Play next queued song when current one ends
  jb.audio.onended = () => {
    const nextIndex = stepOrder(1);
    playSong(nextIndex, root);
  };

  updateDisplay(root);
}

/**
 * Initialize and bind event handlers to jukebox controls
 */
export function initMusicPlayer(songs: Song[]) {
  const root = document.getElementById("jukebox");
  if (!root) {
    jbWarn("[jukebox] root #jukebox not found; skipping init");
    return;
  }

  if (root.dataset.initDebugLogged !== "1") {
    root.dataset.initDebugLogged = "1";
    jbLog("[jukebox] initMusicPlayer called", {
      songsType: typeof songs,
      songsLength: Array.isArray(songs) ? songs.length : null,
      songsPreview: Array.isArray(songs) ? songs.slice(0, 3) : songs,
    });
  }

  // Fix any corrupted state first
  fixCorruptedState(songs);
  
  // Ensure state is properly initialized
  ensureState(songs);
  ensurePlayOrder(songs);
  updateDisplay(root);

  jbLog("[jukebox] state after init", {
    currentIndex: window.jukebox?.currentIndex,
    orderPos: window.jukebox?.orderPos,
    playOrderLength: window.jukebox?.playOrder?.length,
    songsLength: window.jukebox?.songs?.length,
  });

  // Preload/warm audio cache (safe to call even if already bound)
  scheduleWarmAudioCache(root, songs);

  // IMPORTANT: avoid duplicate bindings after swaps/HMR
  if (root.dataset.bound === "1") return;
  root.dataset.bound = "1";

  // Event delegation for all control buttons
  root.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest("button");
    if (!btn) return;

    const jb = window.jukebox;
    if (!jb) return;

    // Play/Pause button
    if (btn.id === "playBtn") {
      if (!jb.audio) {
        return playSong(jb.currentIndex, root);
      }

      if (jb.audio.paused) {
        jb.audio.play().catch(console.error);
        jb.isPlaying = true;
      } else {
        jb.audio.pause();
        jb.isPlaying = false;
      }
      updateDisplay(root);
    }

    // Next/Previous buttons
    if (btn.id === "nextBtn" || btn.id === "prevBtn") {
      let newIndex: number;
      
      if (btn.id === "prevBtn" && jb.history && jb.history.length > 0) {
        // Go to previous song from history
        newIndex = jb.history.pop()!;
        if (Array.isArray(jb.playOrder)) {
          const pos = jb.playOrder.indexOf(newIndex);
          if (pos >= 0) jb.orderPos = pos;
        }
      } else {
        // Go to next in the predetermined queue
        newIndex = stepOrder(btn.id === "nextBtn" ? 1 : -1);
      }
      
      if (jb.isPlaying) {
        playSong(newIndex, root);
      } else {
        jb.currentIndex = newIndex;
        updateDisplay(root);
      }
    }
  });
}

/**
 * Setup music player with proper event listeners for Astro transitions
 */
export function setupMusicPlayer(songs: Song[]) {
  const init = () => initMusicPlayer(songs);

  jbLog("[jukebox] setupMusicPlayer", {
    songsType: typeof songs,
    songsLength: Array.isArray(songs) ? songs.length : null,
  });
  
  document.addEventListener("DOMContentLoaded", init);
  document.addEventListener("astro:page-load", init);
  document.addEventListener("astro:after-swap", init);
  
  // Initialize immediately if DOM is already ready
  if (document.readyState === "complete" || document.readyState === "interactive") {
    init();
  }
}
