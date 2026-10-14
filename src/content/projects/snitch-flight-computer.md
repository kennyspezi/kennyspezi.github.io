---
slug: snitch-flight-computer
title: Snitch the Flight Computer
subtitle: >-
  Low-power STM32WLE5 based flight computer to communicate with a ground control
  station connected to my laptop to track and log telemetry from a rocket
  flight.
checklist:
  "1":
    status: done
    title: Select RF ICs, MCU, Sensors, and create schematic
  "2":
    status: done
    title: >-
      PCB Stackup, Layout, and Routing. Calculate trace impedance. Resolve DRC
      errors
  "3":
    status: todo
    title: TRL Calibration Board. Clone PCB variant with high-power IPD.
  "4":
    status: todo
    title: Assemble and test S11/S21 of each FCU variant.
  "5":
    status: todo
    title: mLRS firmware and test sensor readings with mLRS USB ground station.
  "6":
    status: todo
    title: Test flight with L1 Rocket!!!
description: Snitch FCU for UAV + Omnimouse
repo: kennyspezi/snitch-flight-computer
status: building-now
contributorsWanted: false
isFork: false
updatedAt: "2026-08-18T08:39:38Z"
stars: 0
forks: 0
previewImage: >-
  https://raw.githubusercontent.com/kennyspezi/snitch-flight-computer/main/docs/boardspecs.png
images:
  - >-
    https://raw.githubusercontent.com/kennyspezi/snitch-flight-computer/main/docs/schematic-pg-1.png
  - >-
    https://raw.githubusercontent.com/kennyspezi/snitch-flight-computer/main/docs/schematic-pg-2.png
  - >-
    https://raw.githubusercontent.com/kennyspezi/snitch-flight-computer/main/docs/pcb-3d-front.png
  - >-
    https://raw.githubusercontent.com/kennyspezi/snitch-flight-computer/main/docs/pcb-3d-back.png
  - >-
    https://raw.githubusercontent.com/kennyspezi/snitch-flight-computer/main/docs/pcb-top.png
  - >-
    https://raw.githubusercontent.com/kennyspezi/snitch-flight-computer/main/docs/pcb-signals.png
  - >-
    https://raw.githubusercontent.com/kennyspezi/snitch-flight-computer/main/docs/pcb-pwr-gnd-plane.png
  - >-
    https://raw.githubusercontent.com/kennyspezi/snitch-flight-computer/main/docs/pcb-back.png
  - >-
    https://raw.githubusercontent.com/kennyspezi/snitch-flight-computer/main/docs/boardspecs.png
commits:
  - sha: 22602f73c73b5bcc967d9d08a855a6ddecba95d4
    message: "pcb v2 update: test points, stickers, labeling"
    date: "2026-08-18T08:32:54Z"
    url: >-
      https://github.com/kennyspezi/snitch-flight-computer/commit/22602f73c73b5bcc967d9d08a855a6ddecba95d4
  - sha: e8d210323816b5ce812b1dd7b43c6faf66169490
    message: better pcb route (no test pads)
    date: "2026-08-17T07:12:37Z"
    url: >-
      https://github.com/kennyspezi/snitch-flight-computer/commit/e8d210323816b5ce812b1dd7b43c6faf66169490
  - sha: 20110ccf908ff0878d1a29b02e5511ea13e99d93
    message: schematic update and pcb route v1
    date: "2026-08-15T07:10:43Z"
    url: >-
      https://github.com/kennyspezi/snitch-flight-computer/commit/20110ccf908ff0878d1a29b02e5511ea13e99d93
  - sha: 3e16b1131559caedb5a01f74130282334c49b972
    message: "first commit: schematic and footprints for every part"
    date: "2026-08-06T22:37:28Z"
    url: >-
      https://github.com/kennyspezi/snitch-flight-computer/commit/3e16b1131559caedb5a01f74130282334c49b972
cardEmoji: 🛰️
startDate: Summer 2026
endDate: Current
links:
  github: https://github.com/kennyspezi/snitch-flight-computer
manual: false
---

# Flight Compute Unit (FCU)

For future UAV and upcoming Omnimouse build (continuation of Micromouse)

## Schematics

![Pg 1](https://raw.githubusercontent.com/kennyspezi/snitch-flight-computer/main/docs/schematic-pg-1.png)
![Pg 2](https://raw.githubusercontent.com/kennyspezi/snitch-flight-computer/main/docs/schematic-pg-2.png)

## PCB (as of 08/18/2026)

![3D Front](https://raw.githubusercontent.com/kennyspezi/snitch-flight-computer/main/docs/pcb-3d-front.png)
![3D Back](https://raw.githubusercontent.com/kennyspezi/snitch-flight-computer/main/docs/pcb-3d-back.png)

![Top Layer](https://raw.githubusercontent.com/kennyspezi/snitch-flight-computer/main/docs/pcb-top.png)
![Signals](https://raw.githubusercontent.com/kennyspezi/snitch-flight-computer/main/docs/pcb-signals.png)
![Power + GND Distribution](https://raw.githubusercontent.com/kennyspezi/snitch-flight-computer/main/docs/pcb-pwr-gnd-plane.png)
![Bottom Layer](https://raw.githubusercontent.com/kennyspezi/snitch-flight-computer/main/docs/pcb-back.png)

![BoardSpecs](https://raw.githubusercontent.com/kennyspezi/snitch-flight-computer/main/docs/boardspecs.png)
