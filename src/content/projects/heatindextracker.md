---
slug: heatindextracker
title: heatindextracker
description: >-
  a heat index & surface temperature tracker that compares change in the urban
  heat island effect between zipcodes. provides potential explanations for the
  rate of change. made in matlab as a freshman project
repo: kennyspezi/heatindextracker
status: dormant
contributorsWanted: false
isFork: true
forkedFrom: ForkTheCity/heatindextracker
forkedFromUrl: https://github.com/ForkTheCity/heatindextracker
updatedAt: "2026-03-07T11:49:05Z"
stars: 0
forks: 0
previewImage: https://raw.githubusercontent.com/kennyspezi/heatindextracker/main/preview.gif
images:
  - >-
    https://raw.githubusercontent.com/kennyspezi/heatindextracker/main/preview.gif
commits:
  - sha: e11f8c400955aa50992d0acff85b17ba45d36a1e
    message: Fix help wanted issues link in README
    date: "2025-12-01T06:58:28Z"
    url: >-
      https://github.com/kennyspezi/heatindextracker/commit/e11f8c400955aa50992d0acff85b17ba45d36a1e
  - sha: 6cb5c0c71b1a0a8e367059fa022f2d78b24b1f7c
    message: Update README with proposed functionality and plans
    date: "2025-12-01T06:54:55Z"
    url: >-
      https://github.com/kennyspezi/heatindextracker/commit/6cb5c0c71b1a0a8e367059fa022f2d78b24b1f7c
  - sha: 557b87ed3b230ebed066cb10618e3ece958a114b
    message: Update README with future plans and help wanted section
    date: "2025-12-01T06:52:15Z"
    url: >-
      https://github.com/kennyspezi/heatindextracker/commit/557b87ed3b230ebed066cb10618e3ece958a114b
  - sha: 1d84eeaba8956059298a327b5326e8591b1c676b
    message: >-
      Merge pull request #3 from
      TheRealThomasFraser/improve-readme-and-structure
    date: "2025-11-30T20:31:32Z"
    url: >-
      https://github.com/kennyspezi/heatindextracker/commit/1d84eeaba8956059298a327b5326e8591b1c676b
  - sha: 7d4548c4e09150ad4f5201c29b8d94c43c002699
    message: "- Reworked file structure by organising files into folders"
    date: "2025-11-30T20:20:41Z"
    url: >-
      https://github.com/kennyspezi/heatindextracker/commit/7d4548c4e09150ad4f5201c29b8d94c43c002699
cardEmoji: 🏙️
statusNote: >-
  only exists as a MATLAB app. would like a web version. may be a good hackathon
  project. pick it up if interested.
links:
  github: https://github.com/kennyspezi/heatindextracker
manual: false
---

# Urban Heat Island Effect Tracker

A heat index & surface temperature tracker that compares temperature changes over time between ZIP codes in urban areas. Currently semi-functional for Houston, TX.

## Data Sources

I pulled granules from NASA Earthdata's satellite data and mapped it to coordinates representing zip codes using QGIS. The processed data is stored as .csv files in the `data/` directory.

## Future Plans

Check out these issues and their associated sub-issues:
[![help wanted issues](https://img.shields.io/github/issues/ForkTheCity/heatindextracker/help%20wanted)](https://github.com/ForkTheCity/heatindextracker/issues?q=is%3Aissue%20state%3Aopen%20sort%3Acreated-asc%20label%3A%22help%20wanted%22)

Proposed app functionality: Download satellite data -> Attach to ZIP codes -> Analyze ZIP codes -> Webapp

I plan to add support for urbanized areas in North America with a more automated process, more accurate readings, and maybe even implement an AI or API to generate a summary about what infrastructure or policies could be contributed to the rate of change in the urban heat island effect, quality of life, and then an overall summary for the most effective practices.

## Project Origin

This started as a project for ENGI 1331 at the University of Houston in Spring 2025.
