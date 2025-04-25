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

<!-- Social media bar -->
<div class="social-links">
  <a href="mailto:kmadrigal@uh.edu" aria-label="Email"><i class="fas fa-envelope"></i></a>
  <a href="https://github.com/kennyspezi" aria-label="GitHub"><i class="fab fa-github"></i></a>
  <a href="https://instagram.com/kentrolysis" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
  <a href="https://www.facebook.com/profile.php?id=61558371479932" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
  <a href="https://pinterest.com/kleinekrinkldil" aria-label="Pinterest"><i class="fab fa-pinterest"></i></a>
</div>

<!-- Blurb -->
<div class="home-blurb">
  welcome to my digital house. it's where i post updates, projects, and random stuff i care about. get cozy.
</div>

<style>
/* Splash layout fixes */
.page__hero--overlay {
  min-height: 85vh; /* takes up more vertical space */
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

/* Social icons bar */
.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
  font-size: 1.6rem;
}

.social-links a {
  color: white;
  transition: 0.2s ease-in-out;
}

.social-links a:hover {
  color: #ff9fff;
}

/* Lower blurb spacing */
.home-blurb {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: white;
  max-width: 700px;
  margin: 0 auto;
}
</style>
