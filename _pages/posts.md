---
title: "Posts"
permalink: /posts/
layout: single
sidebar:
  nav: sidebar
---

## LinkedIn

<div id="linkedin-feed">Loading LinkedIn posts...</div>

## ...but anyways

Here’s where I talk about whatever I want. Like Will Wood or Jinx.  
Eventually I’ll tag these posts as `rambles`, `music`, or `irl spiral`.

<script>
fetch("/assets/data/linkedin-posts.json")
  .then(res => res.json())
  .then(posts => {
    const container = document.getElementById("linkedin-feed");
    container.innerHTML = "";

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    posts.forEach(post => {
      container.innerHTML += `
        <div style="margin-bottom: 1.5rem;">
          <h3 style="margin-bottom:0.3rem;">${post.title}</h3>
          <p style="font-size:0.9rem;color:#ccc;">${post.date} — ${post.tags.join(", ")}</p>
          <a href="${post.url}" target="_blank">🔗 View on LinkedIn</a>
        </div>
      `;
    });
  });
</script>

<!-- You can manually add some links or keep this as blog post index -->
