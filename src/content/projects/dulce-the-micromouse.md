---
slug: dulce-the-micromouse
title: dulce-the-micromouse
description: >-
  my first EE hobby project: a micromouse with the guidance of a mentor at
  IEEE-UH. backlogged but i plan to return to this. i printed a new pcb but i
  haven't had the time for assembly :p.
repo: kennyspezi/dulce-the-micromouse
status: dormant
contributorsWanted: false
tech:
  - C++
tags:
  - beginner
  - embedded
  - hobby-project
  - micromouse
isFork: true
forkedFrom: IEEE-UniversityOfHouston/micromice
forkedFromUrl: https://github.com/IEEE-UniversityOfHouston/micromice
updatedAt: "2026-03-07T11:05:22Z"
stars: 1
forks: 0
previewImage: >-
  https://raw.githubusercontent.com/kennyspezi/dulce-the-micromouse/kenny24-25/2024-25-cohort/kennym/preview.jpg
images:
  - >-
    https://raw.githubusercontent.com/kennyspezi/dulce-the-micromouse/kenny24-25/docs/schematic.png
  - >-
    https://raw.githubusercontent.com/kennyspezi/dulce-the-micromouse/kenny24-25/docs/board.png
  - >-
    https://raw.githubusercontent.com/kennyspezi/dulce-the-micromouse/kenny24-25/docs/perfboard1.jpg
  - >-
    https://raw.githubusercontent.com/kennyspezi/dulce-the-micromouse/kenny24-25/docs/perfboard2.jpg
  - >-
    https://raw.githubusercontent.com/kennyspezi/dulce-the-micromouse/kenny24-25/docs/perfboard3.jpg
  - >-
    https://raw.githubusercontent.com/kennyspezi/dulce-the-micromouse/kenny24-25/docs/wiring.jpg
  - >-
    https://raw.githubusercontent.com/kennyspezi/dulce-the-micromouse/kenny24-25/docs/oldieeestation.jpg
  - >-
    https://raw.githubusercontent.com/kennyspezi/dulce-the-micromouse/kenny24-25/2024-25-cohort/kennym/preview.jpg
commits:
  - sha: d75030083b588852936276f21eb6540a95bf9b1d
    message: updated personal README
    date: "2026-01-10T08:50:15Z"
    url: >-
      https://github.com/kennyspezi/dulce-the-micromouse/commit/d75030083b588852936276f21eb6540a95bf9b1d
  - sha: dc00214f54cf4ac33fa334a6359820a8ea198a71
    message: "kenny m: dulce the micromouse"
    date: "2026-01-10T08:04:57Z"
    url: >-
      https://github.com/kennyspezi/dulce-the-micromouse/commit/dc00214f54cf4ac33fa334a6359820a8ea198a71
  - sha: b7f9552d365763c86081a14b6e1299eafc778131
    message: first commit
    date: "2026-01-10T07:31:00Z"
    url: >-
      https://github.com/kennyspezi/dulce-the-micromouse/commit/b7f9552d365763c86081a14b6e1299eafc778131
cardEmoji: 🐭
statusNote: >-
  i have not touched this since freshman year. my interests have moved on, but
  i'd like to revist anyhow.
links:
  github: https://github.com/kennyspezi/dulce-the-micromouse
manual: false
---

# Dulce - Micromouse Robot (Fall-Spring 2024-25; Backlog)

A micromouse robot project designed for autonomous maze navigation with comprehensive sensing and motor control capabilities. I would like to revisit this when I get the chance!

## Overview

Dulce is a micromouse robot built around the Adafruit Itsy Bitsy SAMD21 3.3V microcontroller. The design features multiple infrared sensors for wall detection, a 9-axis IMU for orientation tracking, and dual DC motors with encoders for precise movement control.

## Gallery

### PCB Design

![Schematic](https://raw.githubusercontent.com/kennyspezi/dulce-the-micromouse/kenny24-25/docs/schematic.png)
_Circuit schematic_

![PCB Layout](https://raw.githubusercontent.com/kennyspezi/dulce-the-micromouse/kenny24-25/docs/board.png)
_PCB board layout_

### Hardware Build (before PCB design)

![Perfboard Assembly 1](https://raw.githubusercontent.com/kennyspezi/dulce-the-micromouse/kenny24-25/docs/perfboard1.jpg)
_Perfboard prototype - top view_

![Perfboard Assembly 2](https://raw.githubusercontent.com/kennyspezi/dulce-the-micromouse/kenny24-25/docs/perfboard2.jpg)
_Perfboard prototype - side view_

![Perfboard Assembly 3](https://raw.githubusercontent.com/kennyspezi/dulce-the-micromouse/kenny24-25/docs/perfboard3.jpg)
_Perfboard prototype - detailed view_

![Wiring](https://raw.githubusercontent.com/kennyspezi/dulce-the-micromouse/kenny24-25/docs/wiring.jpg)
_Wiring connections_

![IEEE@UH Station](https://raw.githubusercontent.com/kennyspezi/dulce-the-micromouse/kenny24-25/docs/oldieeestation.jpg)
_Soldering setup at IEEE station_

## Bill of Materials

| Component               | Part Number/Model               | Quantity | Description                             |
| ----------------------- | ------------------------------- | -------- | --------------------------------------- |
| Microcontroller         | Adafruit Itsy Bitsy SAMD21 3.3V | 1        | Main controller (SAMD21 ARM Cortex-M0+) |
| IR Reflective Sensors   | 475-2649-ND                     | 7        | Wall detection and positioning          |
| IMU                     | BNO-055                         | 1        | 9-axis absolute orientation sensor      |
| DC Motors with Encoders | -                               | 2        | Differential drive system               |
| Motor Driver            | DRV8833                         | 1        | Dual H-bridge motor controller          |
| Battery Connector       | 2-pin connector                 | 1        | Main power supply                       |
| Misc. Connectors        | 2-pin connectors                | Various  | Modular connections                     |

## Project Status

### Current Implementation

- ✅ Hardware schematic design (imported from EasyEDA)
- ✅ Pin definitions configured in firmware
- ✅ Basic Arduino framework setup with PlatformIO

### Future Work

#### Documentation Improvements

- My schematic-drafting skills have improved since I last touched this project. I would like to clean up my schematic exports.

#### Hardware Improvements

- **Sensor Optimization**: Evaluate whether fewer IR sensors can be used while maintaining diagonal movement capability
- **Mode Selection**: Add toggle button to switch between different operating modes
- **Status Indicator**: Integrate RGB LED to display current operational mode

#### Mechanical Design

- Design and CAD a custom chassis optimized for the electronic components
- Ensure proper sensor placement for accurate wall detection
- Optimize weight distribution and center of gravity

#### Software Development

- Implement multiple operational modes:
  - Object-following
  - IMU + PID "Compass" - inspired by [Haridev](https://github.com/haribood)
  - Wall-following algorithm
  - Maze solving
- Develop sensor calibration routines
- Implement PID control for motor control
- Add mode-switching logic with visual feedback

## Development Setup

### Prerequisites

- PlatformIO installed (via VS Code extension or CLI)
- USB cable for programming the Itsy Bitsy

### Building the Firmware

```bash
cd firmware
pio run
```

### Uploading to Device

```bash
pio run --target upload
```

## Pin Configuration

### IR Sensors

| Sensor Position | Pin    |
| --------------- | ------ |
| Front Left      | A1     |
| Front Center    | A0     |
| Front Right     | A2     |
| Mid Left        | A3     |
| Mid Right       | A4     |
| Back Left       | A5     |
| Back Right      | 0 (RX) |

### IMU (BNO-055)

| Function  | Pin |
| --------- | --- |
| Reset     | D7  |
| Interrupt | D9  |

### Motor Control

| Motor       | Pin A     | Pin B     |
| ----------- | --------- | --------- |
| Left Motor  | 30 (SCK)  | 29 (MOSI) |
| Right Motor | 28 (MISO) | 2         |

### Encoders

| Encoder | Channel A | Channel B |
| ------- | --------- | --------- |
| Left    | D10       | D11       |
| Right   | D12       | D13       |

See [firmware/src/main.cpp](https://github.com/kennyspezi/dulce-the-micromouse/blob/kenny24-25/firmware/src/main.cpp) for complete pin definitions.

## Project Structure

```
dulce/
├── electrical/          # KiCad PCB design files
│   ├── dulce_easyeda.kicad_sch
│   └── dulce_easyeda.kicad_pcb
├── firmware/           # Arduino/PlatformIO firmware
│   ├── src/
│   │   └── main.cpp
│   └── platformio.ini
└── README.md
```

## License

See [LICENSE](https://github.com/kennyspezi/dulce-the-micromouse/blob/kenny24-25/LICENSE) file for details.

## Contributing

This is a personal project :P
