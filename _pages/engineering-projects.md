---
layout: single
title: "Engineering Projects"
permalink: /engineering-projects/
toc: true
toc_sticky: true
sidebar:
  custom: sidebar_status
---

## Robots & Hardware

## School Projects

## Personal / Other

<div id="projects-feed">
  <p>Loading your GitHub greatness...</p>
</div>

<style>
.project-card {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 1rem;
  color: white;
}
.project-card:nth-child(even) {
  background-color: #37003c;
  flex-direction: row-reverse;
}
.project-card:nth-child(odd) {
  background-color: #540066;
  flex-direction: row;
}
.project-text {
  flex: 1;
}
.project-preview {
  width: 200px;
  height: auto;
  object-fit: contain;
  border-radius: 1rem;
  border: 2px solid white;
}
</style>

<script>
fetch("https://api.github.com/users/kennyspezi/repos")
  .then(response => response.json())
  .then(repos => {
    // 👻 filter out your website repo
    repos = repos.filter(r => r.name !== "kennyspezi.github.io");

    const categories = {
      "Robots & Hardware": ["bangboo-bot", "sprunki4lumen", "micromice"],
      "School Projects": ["matlabRhythm", "heatindextracker"],
      "Personal / Other": []
    };

    for (const [category, repoNames] of Object.entries(categories)) {
      const sectionId = category.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const header = document.querySelector(`h2[id="${sectionId}"]`) || document.querySelector(`h2:contains("${category}")`);

      let sectionEl = header?.nextElementSibling;
      if (!sectionEl || !sectionEl.classList.contains("injected-group")) {
        sectionEl = document.createElement("div");
        sectionEl.className = "injected-group";
        header?.insertAdjacentElement("afterend", sectionEl);
      }

      repoNames.forEach(name => {
        const repo = repos.find(r => r.name === name);
        if (!repo) return;

        const updated = new Date(repo.updated_at).toLocaleDateString();
        const stars = repo.stargazers_count;
        const previewURL = `https://raw.githubusercontent.com/kennyspezi/${repo.name}/main/preview.gif`;

        sectionEl.innerHTML += `
          <div class="project-card">
            <img class="project-preview" src="${previewURL}" onerror="this.style.display='none';">
            <div class="project-text">
              <h3>${repo.name}</h3>
              <p>${repo.description || "No description provided."}</p>
              <p><strong>Last updated:</strong> ${updated} | ⭐ ${stars}</p>
              <a href="${repo.html_url}" target="_blank">View on GitHub →</a>
            </div>
          </div>
        `;
      });
    }
  })
  .catch(err => {
    document.getElementById("projects-feed").innerHTML = "<p>Error loading repos 💀</p>";
    console.error(err);
  });
</script>
