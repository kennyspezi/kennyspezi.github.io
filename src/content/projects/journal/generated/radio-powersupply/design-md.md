---
title: Initial BMS Design
date: "2025-12-21T07:44:19Z"
category: projects
projectSlug: radio-powersupply
tags:
  - github-sync
  - repo-journal
sourcePath: DESIGN.md
sourceUrl: https://github.com/kennyspezi/radio-powersupply/blob/main/DESIGN.md
generated: true
---

# Design/Documentation

Due Date: December 19, 2025 → December 20, 2025
Projects: Ham Radio Powersupply (https://www.notion.so/Ham-Radio-Powersupply-2ccc50d201c2803da44de30d1e2cf3a4?pvs=21)
Status: Ready for review

## About the Radio

| Model           | [RT95](https://www.retevis.com/products/rt95-dual-band-ham-mobile-radio-us-version)                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Dimensions (mm) | 124 (W) x 163(D) x 39 (H)                                                                                              |
| Weight          | about 0.64 kg                                                                                                          |
| Manual          | [right here!](https://res.retevis.com/t_file/archive/20251104/rt95-user-manual-multi-language_20251104152727_8319.pdf) |

## Requirements

| Average Amperage             | 1.735 A       |
| ---------------------------- | ------------- |
| Peak Amperage                | 6 A           |
| Recommended Current Capacity | 12 A          |
| Minimum A/H Capacity         | 10.35 Ah      |
| A/H Capacity + Reserve       | 20.7 Ah       |
| Operating Voltage            | 13.8V DC ±15% |

BMS must balance all cells. Pick BMS rated at least 12 A,

Pick a charger that matches the pack voltage and the charge current

## Assumptions

To check max continuous and/or peak discharge (greater than or equal to 12 A), check cell discharge rating x parallel count, BMS continuous current rating, wire/fuse ratings.

## Calculation

## Configurations

| [BMS](https://batteryhookup.com/products/li-ion-lifepo4-3s-20s-30a-bms-with-balance?variant=42283333714082)                                            | $16.00         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| Overcharge voltage per cell                                                                                                                            | 4.2 V          |
| Overdischarge voltage per cell                                                                                                                         | 2.8 V          |
| Discharge Continuous Amps                                                                                                                              | 30 A           |
| 10 second Discharge Burst                                                                                                                              | 60 A           |
| Charge Continuous Amps                                                                                                                                 | 30 A           |
| Balancing Current                                                                                                                                      | 50 mA          |
| [Li-Ion Cell](https://batteryhookup.com/collections/frontpage/products/new-3-6v-5000mah-bak-n21700cg-50-2170-lithium-ion-cells?variant=46196788756642) | $2.50 per cell |
| Nominal Voltage                                                                                                                                        | 3.6 V          |
| Fully Charged Voltage                                                                                                                                  | 4.2 V          |
| Fully Discharged Voltage                                                                                                                               | 2.5 V          |
| Capacity                                                                                                                                               | 5 Ah           |
| Max Continuous Charge                                                                                                                                  | 1C / 5A        |
| Max Continuous Discharge                                                                                                                               | 3C / 15A       |

So, I propose a 3S3P (12.6 V, 15 Ah) configuration (with no accessories)

16 AWG

| Charger specs     |                            |
| ----------------- | -------------------------- |
| Chem & Series Ct. | Li-ion 3S, or 12.6 V CC/CV |
| Charge Current    | 9 A (~1.3 hr charge time)  |

t_ideal = [Ah]/[A]

~1.1 h = [10 Ah]/[9 A] |
| Power connectors | Mini-Tamiya 2-pin connector |

| Fuse           | i didnt realise there alr was a fuse |
| -------------- | ------------------------------------ |
| Current rating | 10 A                                 |
| Voltage rating | > 12.6 V                             |

## Fun Accessories!

### TFT Screen (Sunlight Readable)

| Links:                                                                                             | Price  | Notes                                                                           |
| -------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------- |
| [TFT Screen](https://newhavendisplay.com/2-4-inch-sunlight-readable-tft-without-touchscreen/)      | $16.64 |                                                                                 |
| [IDC Cable](https://newhavendisplay.com/6-inch-long-idc-ribbon-cable-for-the-nhdev-board/)         | $20.00 |                                                                                 |
| [IDC Cable + 2x20 Pin Headers](https://newhavendisplay.com/idc-ribbon-cable-with-2x20-connectors/) | $12.00 | most likely covers both the idc cable listing above, and the pin headers below. |
| [2x20 Pin Headers](https://newhavendisplay.com/2x20-dual-row-pin-header-connector/)                | $5.00  |                                                                                 |

Note: I need some time to decide what accessories I want to use.

[NHD Github profile](https://github.com/newhavendisplay)

## Personal Notes

| Current Capacity (A) | Ability to deliver # A of current at a point in time. |
| -------------------- | ----------------------------------------------------- |
| Ah or Wh             | Like volume of fuel tank.                             |
| C-Rate               | this is trying to tell you the CURRENT.               |

C-rate is an expression for the allowable charge/discharge current relative to the battery’s capacity.

A_output= [C-Rate]\*[Ah Rating]

This is a constraint for how fast the battery can be charged or discharged safely. |
