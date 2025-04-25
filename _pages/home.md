---
layout: splash
permalink: /
title: null
classes: wide
sidebar:
  nav: sidebar
header:
  overlay_image: /assets/gif/my-gif.gif
  overlay_filter: "0.4"
  overlay_color: "#000"
  actions:
    - label: "get to know me"
      url: /about-meee/
---

<!-- splash overlay section -->
<div class="splash-overlay-container">

  <div class="splash-status">
    <p>a-a-a-among us a-a-a-among us</p>
  </div>

  <div class="splash-socials">
    <a href="mailto:youremail@example.com"><i class="fa-solid fa-envelope"></i></a>
    <a href="https://github.com/kennyspezi" target="_blank"><i class="fa-brands fa-github"></i></a>
    <a href="https://instagram.com/kentrolysis" target="_blank"><i class="fa-brands fa-instagram"></i></a>
    <a href="https://facebook.com/profile.php?id=61558371479932" target="_blank"><i class="fa-brands fa-facebook"></i></a>
    <a href="https://pinterest.com/kleinekrinkldil" target="_blank"><i class="fa-brands fa-pinterest"></i></a>
  </div>

  <div class="splash-spotify">
    <iframe style="border-radius:12px"
      src="https://open.spotify.com/embed/playlist/03AV66ETCcJNXWXbQiWWTq?utm_source=generator&theme=0"
      width="100%" height="80" frameBorder="0" allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">
    </iframe>
  </div>

</div>

<!-- welcome blurb below splash -->
<div class="home-blurb">
  welcome to my digital house. it's where i post updates, projects, and random stuff i care about. get cozy.
</div>

<style>
/* main container */
.splash-overlay-container {
  position: absolute;
  bottom: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 10;
}

/* status text */
.splash-status p {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 1rem;
  pointer-events: auto;
}

/* social icons */
.splash-socials {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  pointer-events: auto;
}

.splash-socials a {
  color: white;
  text-shadow: 0 0 6px #000;
  transition: transform 0.2s ease;
}

.splash-socials a:hover {
  transform: scale(1.2);
}

/* spotify cube */
.splash-spotify {
  position: fixed;
  bottom: 1.25rem;
  right: 1.25rem;
  width: 280px;
  pointer-events: auto;
  z-index: 11;
}

/* welcome text */
.home-blurb {
  text-align: center;
  margin-top: 2rem;
  padding: 0 2rem;
  font-size: 1.1rem;
  color: white;
}
</style>
