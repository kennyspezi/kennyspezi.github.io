---
layout: splash
permalink: /
title: null
classes: wide home
sidebar:
  nav: sidebar
header:
  overlay_image: /assets/gif/my-gif.gif
  overlay_filter: "0.3"
  overlay_color: "#000"
  actions:
    - label: "get to know me"
      url: /about-meee/
---

<!-- Overlay Content -->
<div class="splash-overlay">
  <div class="splash-status">🌩️ currently overthinking the universe</div>

  <div class="splash-socials">
    <a href="mailto:kmadrigal@uh.edu"><i class="fa-solid fa-envelope"></i></a>
    <a href="https://github.com/kennyspezi" target="_blank"><i class="fa-brands fa-github"></i></a>
    <a href="https://instagram.com/kentrolysis" target="_blank"><i class="fa-brands fa-instagram"></i></a>
    <a href="https://facebook.com/profile.php?id=61558371479932" target="_blank"><i class="fa-brands fa-facebook"></i></a>
    <a href="https://pinterest.com/kleinekrinkldil" target="_blank"><i class="fa-brands fa-pinterest"></i></a>
  </div>

  <div class="splash-spotify">
    <iframe style="border-radius: 12px"
      src="https://open.spotify.com/embed/playlist/03AV66ETCcJNXWXbQiWWTq?utm_source=generator&theme=0"
      width="300" height="80" frameBorder="0"
      allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy">
    </iframe>
  </div>
</div>

<!-- Welcome Blurb -->
<div class="splash-welcome">
  <p>welcome to my digital house. it's where i post updates, projects, and random stuff i care about. get cozy.</p>
</div>

<style>
body, html {
  overflow-x: hidden;
  max-width: 100%;
}

.splash-overlay {
  position: absolute;
  bottom: 3rem;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 99;
  pointer-events: none;
}

/* Status one-liner */
.splash-status {
  background: rgba(0, 0, 0, 0.5);
  display: inline-block;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.6rem 1.2rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
  pointer-events: auto;
}

/* Social icons */
.splash-socials {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  pointer-events: auto;
}

.splash-socials a {
  color: white;
  transition: transform 0.2s ease;
}

.splash-socials a:hover {
  transform: scale(1.2);
}

/* Spotify */
.splash-spotify {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  pointer-events: auto;
}

/* Welcome Blurb */
.splash-welcome {
  margin-top: 4rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
  color: #eee;
  padding: 0 2rem;
}

/* Semi-transparent nav (home page only) */
body.home nav#site-nav {
  background-color: rgba(18, 0, 26, 0.85) !important;
  backdrop-filter: blur(8px);
}
</style>
