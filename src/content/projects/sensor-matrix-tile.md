---
slug: sensor-matrix-tile
title: Sensor Matrix Tile
subtitle: Photodiode matrix with multiplexed readout to interface with MCU.
description: >-
  led matrices that are responsive to a photodiode matrix overlayed on top of
  them. started as a project for IEEE-UH, now it's a little exercise. I plan for
  the system to be able to scale up and have connectivity across multiple tiles.
repo: kennyspezi/sensor-matrix-tile
status: building-paused
contributorsWanted: false
tech:
  - C++
tags:
  - analog
  - hardware
  - peer-to-peer
  - photodiodes
  - sensors
isFork: false
updatedAt: "2026-09-16T19:06:56Z"
stars: 0
forks: 0
previewImage: >-
  https://raw.githubusercontent.com/kennyspezi/sensor-matrix-tile/main/docs/matrix.gif
images:
  - >-
    https://raw.githubusercontent.com/kennyspezi/sensor-matrix-tile/main/docs/matrix.gif
  - >-
    https://raw.githubusercontent.com/kennyspezi/sensor-matrix-tile/main/docs/schematic-9-tile-mux.png
  - >-
    https://raw.githubusercontent.com/kennyspezi/sensor-matrix-tile/main/docs/schematic-tile-definitions.png
  - >-
    https://raw.githubusercontent.com/kennyspezi/sensor-matrix-tile/main/docs/schematic-old-4x4-sensor-mux.png
commits:
  - sha: d26c3db05a819fc4a7b699032758af7c4c547673
    message: documentation upgrade
    date: "2026-09-16T19:03:41Z"
    url: >-
      https://github.com/kennyspezi/sensor-matrix-tile/commit/d26c3db05a819fc4a7b699032758af7c4c547673
  - sha: f0787011e996eea1fc3cbf2400fe98e918a88a09
    message: Merge branch 'kennyspezi-prototiles'
    date: "2026-02-19T22:02:40Z"
    url: >-
      https://github.com/kennyspezi/sensor-matrix-tile/commit/f0787011e996eea1fc3cbf2400fe98e918a88a09
  - sha: 863117563b62da8e87a55d41da745631af43d570
    message: >-
      Merge branch 'prototiles' of github.com:kennyspezi/ieee-cco-dancefloor
      into kennyspezi-prototiles
    date: "2026-02-19T22:01:55Z"
    url: >-
      https://github.com/kennyspezi/sensor-matrix-tile/commit/863117563b62da8e87a55d41da745631af43d570
  - sha: 201ae71b7bf9443bf2ce4386e858a75e853c656b
    message: "muxes and mcu || todo: clean up discarded files and improve documentation"
    date: "2026-02-19T21:57:50Z"
    url: >-
      https://github.com/kennyspezi/sensor-matrix-tile/commit/201ae71b7bf9443bf2ce4386e858a75e853c656b
  - sha: a77b0d1f386926db06d7d02beeb3dabadb56284d
    message: Merge branch 'feat-kenny-tilecode' to 'main'
    date: "2026-01-14T08:07:38Z"
    url: >-
      https://github.com/kennyspezi/sensor-matrix-tile/commit/a77b0d1f386926db06d7d02beeb3dabadb56284d
cardEmoji: 👽
startDate: Spring 2026
lessonsLearned: >-
  Multiplexers, transimpedance amplifiers, analog front ends, and logic-level
  translation.
pending: >-
  Revisit the matrix with a cleaner sensing target, improved analog validation,
  and a tested revision.
links:
  github: https://github.com/kennyspezi/sensor-matrix-tile
manual: false
---

# photodiode matrix

This was originally meant to be part of a larger, more ambitious collaborative project for IEEE-UH. This would have been the sensor array to detect footsteps for an interactive dancefloor similar to something like DDR.

The project struggled to find its footing but this is a compliation of my efforts for it.

![Behlool and I working on the light-up porition of the tile to start working on LED code](https://raw.githubusercontent.com/kennyspezi/sensor-matrix-tile/main/docs/matrix.gif)

## Architecture

The dance floor would've been made from 9 reactive tiles. Each tile would include a grid of 8x8 photodiodes to detect distance and therefore a person stepping on the tile.

![9 Tile Overview](https://raw.githubusercontent.com/kennyspezi/sensor-matrix-tile/main/docs/schematic-9-tile-mux.png)
![Tile Definition](https://raw.githubusercontent.com/kennyspezi/sensor-matrix-tile/main/docs/schematic-tile-definitions.png)

Of course, we don't have an MCU that can sample all 9x8x8=576 photodiodes at the same time. Each tile includes two muxes: 1 to apply voltage across one column, and another to read the voltage from a selected photodiode row. In between there would be a TIA (which I never got around to designing since life happens).

Originally the schematic was made for what would've been a demo 4x4 photodiode matrix, so that's what I've included below:

![4x4 Muxes to activate sensors](https://raw.githubusercontent.com/kennyspezi/sensor-matrix-tile/main/docs/schematic-old-4x4-sensor-mux.png)
