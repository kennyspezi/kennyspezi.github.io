import { setupMusicPlayer, type Song } from '../lib/musicPlayer';

declare global {
  interface Window {
    __jukeboxSongs?: Song[];
  }
}

const songs = window.__jukeboxSongs;

if (!Array.isArray(songs) || songs.length === 0) {
  // eslint-disable-next-line no-console
  console.warn('[jukebox] musicPlayerClient: no songs found on window.__jukeboxSongs', {
    songsType: typeof songs,
    songs,
  });
} else {
  // eslint-disable-next-line no-console
  console.log('[jukebox] musicPlayerClient: starting with songs', {
    songsLength: songs.length,
    songsPreview: songs.slice(0, 3),
  });

  setupMusicPlayer(songs);
}
