---
layout: single
title: "Engineering Projects"
permalink: /engineering-projects/
classes: wide
---

<div id="projects-feed">
  <p>Loading your GitHub greatness...</p>
</div>

<script>
fetch("https://api.github.com/users/kennyspezi/repos")
  .then(response => response.json())
  .then(repos => {
    const container = document.getElementById("projects-feed");
    container.innerHTML = ""; // clear loading text

    repos
      .filter(repo => !repo.fork && !repo.archived) // skip forks & dead ones
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)) // most recently updated first
      .forEach(repo => {
        const updated = new Date(repo.updated_at).toLocaleDateString();
        const stars = repo.stargazers_count;
        container.innerHTML += `
          <div style="margin-bottom: 2rem;">
            <h2>${repo.name}</h2>
            <p>${repo.description || "No description provided."}</p>
            <p><strong>Last updated:</strong> ${updated} | ⭐ ${stars}</p>
            <a href="${repo.html_url}" target="_blank">View on GitHub →</a>
          </div>
        `;
      });
  })
  .catch(err => {
    document.getElementById("projects-feed").innerHTML = "<p>Error loading repos 💀</p>";
    console.error("GitHub API error:", err);
  });
</script>
