---
slug: sensor-matrix-tile
title: sensor-matrix-tile
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
updatedAt: "2026-03-07T10:55:49Z"
stars: 0
forks: 0
commits:
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
  - sha: 31e2979bd6e21e1bb17069bdb7ee4720b788f401
    message: "initial prototype idea: ESPNOW for tile-to-tile comms"
    date: "2026-01-14T08:01:27Z"
    url: >-
      https://github.com/kennyspezi/sensor-matrix-tile/commit/31e2979bd6e21e1bb17069bdb7ee4720b788f401
cardEmoji: 👽
statusNote: >-
  more fun than I expected! learned about MUXes, TIAs, and logic-level
  translation. pausing to focus on other projects.
links:
  github: https://github.com/kennyspezi/sensor-matrix-tile
manual: false
---

# interactive-dance-floor

An interactive dance floor to showcase at IEEE@UH's annual Chili Cook Off. Set for Spring 2026.

## 📁 Tentative File Structure

```
interactive-dance-floor/
├── wiring/                     # will start with a rough sketch, then a KiCad project.
├── code/                       # more detailed contribution process outlined below
│   ├── "filename_YOURNAME.ino"
│   └── main.ino
├── assembly/                   # All relevant CAD files.
└── README.md                   # This file.

```

## Contribution Workflow (for IEEE@UH PW Committee Members)

Before we leave for Winter Break, we will provide you all with Arduinos and your own proto-tile.

### Programming

When you want to start programming your proto-tile(s), create a fork of this repository. Please use a branch name like `feat-yourname-tilecode`.

To begin modifying files in your fork, enter this in your terminal:

```
git clone <url-to-your-fork>
cd interactive-dance-floor
```

and create a new file under `code/` named `filename_YOURNAME.ino`, where `filename` is a name of your choosing (please be appropriate).

Then, you can create a pull request to add your own file to this main repository.

Note: `main.ino` is the unified file that will eventually merge all contributions. Individual `.ino` files remain separate until integration.

### Wiring, Assembly, etc.

Similar to Programming workflow, just make sure your branch name is relevant.

Examples: `feat-yourname-schematic`, `feat-yourname-pcb`, `feat-yourname-assembly`. If you want to contribute to these aspects, please contact kennyspezi on discord.

## TODO:

- Add proto-tile wiring diagram
- Add template `main.ino`
- Decide on a microcontroller?

If you have questions, please contact kennyspezi on discord.
