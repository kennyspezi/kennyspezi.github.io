---
title: PMD DECISIONS
date: "2026-03-14T02:31:20Z"
category: projects
projectSlug: medical-autonomous-streamlined-triage
tags:
  - github-sync
  - repo-journal
sourcePath: patient-monitoring-device/DECISIONS.md
sourceUrl: >-
  https://github.com/MAST-2026/medical-autonomous-streamlined-triage/blob/main/patient-monitoring-device/DECISIONS.md
generated: true
---

The PMD will be a wearable harness measuring HR, SpO₂, skin temp, and motion with an ESP32-C3.

Power-on will avoid exposed switches, using a pull-tab, magnetic, or strap-contact method handled by the mech team. Sensors/electrodes will have secure skin contact, adjustable for different sizes.

Electrodes are peripherals to the PCB, and will be placed in non-invasive areas (particularly for female patients.)

Communication to the ARD will use ESP-NOW, with unit tests simulating multiple PMDs sending randomized packets to ensure reliable many-to-one handling and proper device ID management.

Hardware design will consider antenna keep-out, decoupling, and stable power rails for robust operation.

## Electrical

Microcontroller: ESP32-C3 in module form like ESP32-C3-WROOM-02U. (to attach an external antenna to avoid signal shielding)
Monitors: Heart rate, respiration, skin temperature, blood oxygen.

The first choice was the MAX86178, which wouldve been the most power efficient and also handle synchronization at the hardware level. However this is locked behind NDA and is sold only to institutions.

| Vital                            | IC       | Justification                                                                                                                                                                                                            |
| :------------------------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Heart rate                       | MAX30001 | ECG and BioZ resp. 2 birds w/ one stone                                                                                                                                                                                  |
| Respiration                      | MAX30001 | Same as above                                                                                                                                                                                                            |
| Skin Temperature                 | TBD      | based on mech teams' electrode/sensor placements                                                                                                                                                                         |
| Blood Oxygen (Oxygen Saturation) | MAX86141 | ultra-low power, connected to external LEDs and photodiodes, suitable for more flexible electrode placement. MAX86141 also supports dual channel which can generate a differential signal to cancel out motion artifacts |

| Q: "Why are we not using the MAX32664 sensor hub"? | A: that's calibrated for finger and wrist configs. |
| :------------------------------------------------- | :------------------------------------------------- |

## Assembly

Mechanical team should decicde on a harness design and on electrode locations for vitals monitoring. (heart rate, breathing, temperature, etc).

Harness brainstorm:

- EMS should be able to rapidly strap onto a patient during triage
- To power on, the mechanical design should consider a reliable activation mechanism (e.g., pull-tab battery, magnetic activation, or strap-contact power) so the device powers on automatically during application without relying on an exposed switch.
- The harness should also provide secure skin contact points for sensors/electrodes (heart rate/SpO₂ and skin temperature) while remaining quick to apply and adjustable for different patient sizes.

<img src="https://technopackcorp.com/cdn/shop/products/3D-FALL-PROTECTION-SAFETY-BODY-HARNESS-S-HARN-03-JORESTECH-H_7.png?v=1630359895&width=1600)" width="50%" height="auto" alt="Harness example">
