---
title: tile specs (out-dated)
date: "2026-02-19T21:57:50Z"
category: projects
projectSlug: sensor-matrix-tile
tags:
  - github-sync
  - repo-journal
sourcePath: electrical/DESIGN.md
sourceUrl: >-
  https://github.com/kennyspezi/sensor-matrix-tile/blob/main/electrical/DESIGN.md
generated: true
---

## Dimensions

3x3 grid of reactive tiles
Each tile is 1' by 1'.
Each tile is made up of a 19 strips of 19 WS2812 LEDs. (19x19 LED Matrix)
Each tile also has an 8x8 grid of IR Emitter + photodiode pairs

### Sensors

Infrared Emitter + Photodiode pairs
Spectral Range | 800 nm ~ 1100 nm
Response Time | 5 ns
Dark Current | 1 nA
