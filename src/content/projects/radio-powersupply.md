---
slug: radio-powersupply
title: radio-powersupply
description: >-
  for AIAA-UH | Amateur Radio Club: designing a BMS for a portable Ham-Pack with
  more accessories.
repo: kennyspezi/radio-powersupply
status: building-paused
contributorsWanted: false
tags:
  - battery-management-system
  - bms
  - electronics
  - power
  - radio
isFork: false
updatedAt: "2026-03-07T11:36:44Z"
stars: 2
forks: 0
commits:
  - sha: 1635d667317bfe2777e4053371b7d5a2cc438fc9
    message: "initial commit: kicad and design.md"
    date: "2025-12-21T07:44:19Z"
    url: >-
      https://github.com/kennyspezi/radio-powersupply/commit/1635d667317bfe2777e4053371b7d5a2cc438fc9
cardEmoji: 🔋
statusNote: >-
  selected battery size and BMS. just double checking that it satisfies criteria
  when i get the chance.
links:
  github: https://github.com/kennyspezi/radio-powersupply
  homepage: https://aiaa-uh.com/
manual: false
---

# Ham Radio Power Supply

A custom battery pack power supply project for portable ham radio operations, featuring a 3S3P lithium-ion configuration designed to power the Retevis RT95 dual-band mobile ham radio. Thank you AIAA@UH and Shane :D

## What's Included

### Core Power System

- **Battery Configuration**: 3S3P lithium-ion pack (12.6V, 15Ah)
  - 9x BAK N21700CG-50 cells (5Ah per cell, 15A max continuous discharge)
  - Provides 10.35Ah minimum capacity
- **Battery Management System (BMS)**: 3S-20S 30A BMS with cell balancing
  - 30A continuous discharge, 60A burst capability
  - 50mA balancing current per cell
  - Overcharge protection (4.2V/cell), overdischarge protection (2.8V/cell)
- **Wiring**: 16 AWG for safe current handling
- **Charging**: 9A Li-ion 3S charger (12.6V CC/CV) for ~1.1 hour charge time (TBD)

### Target Radio

- **Model**: [Retevis RT95](https://www.retevis.com/products/rt95-dual-band-ham-mobile-radio-us-version)
- **Power Requirements**: 1.735A average, 6A peak (12A recommended capacity), 13.8V DC ±15% operating voltage
- **Weight**: 0.64 kg
- **Dimensions**: 124mm (W) × 163mm (D) × 39mm (H)

### Optional Accessories

- **2.4" Sunlight-Readable TFT Display** (TBD): To decorate the hampack!
  - Integration via NHD development board with ribbon cable
  - Perfect for outdoor operations and battery status display

## KiCad Design Plans

This project uses KiCad for circuit design, PCB layout, and simulation:

### Circuit Simulation

- **Power Distribution Simulation**: Just for fun, exploring circuit behavior and validation
  - Verifying voltage regulation under various load conditions
  - Modeling discharge characteristics and runtime estimates
  - Testing protection circuit responses (BMS, fuses, etc.)
  - Learning experience with KiCad's simulation capabilities

The `hampack/` directory contains all KiCad project files including schematics, PCB layouts, and custom symbols.

## Project Status

Currently in progress. Next steps include:

1. Finalizing component sourcing
2. Designing the TFT display interface Schmematic and PCB in KiCad
3. Running circuit simulations for validation
4. Assembly and testing

## Safety Notes

- BMS balances all cells for safe operation
- System includes overcharge/overdischarge protection
- Proper fusing and wire gauge for current handling
- Operating within manufacturer-specified voltage range (13.8V DC ±15%)

---

_For detailed calculations and component specifications, see [DESIGN.md](https://github.com/kennyspezi/radio-powersupply/blob/main/DESIGN.md)_
