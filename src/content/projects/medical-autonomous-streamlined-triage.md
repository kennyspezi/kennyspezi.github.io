---
slug: medical-autonomous-streamlined-triage
title: medical-autonomous-streamlined-triage
description: or MAST for short
repo: MAST-2026/medical-autonomous-streamlined-triage
status: idea
contributorsWanted: false
tech:
  - C++
isFork: false
updatedAt: "2026-03-14T18:10:11Z"
stars: 0
forks: 0
commits:
  - sha: 5bfce7eaade3124c71552807eac4307cababe638
    message: kennym main merge
    date: "2026-03-14T18:10:05Z"
    url: >-
      https://github.com/MAST-2026/medical-autonomous-streamlined-triage/commit/5bfce7eaade3124c71552807eac4307cababe638
  - sha: 0e0632582c0c567bedc398cf918fa2f2c60c7a76
    message: Updated README.md
    date: "2026-03-14T18:08:11Z"
    url: >-
      https://github.com/MAST-2026/medical-autonomous-streamlined-triage/commit/0e0632582c0c567bedc398cf918fa2f2c60c7a76
  - sha: beb7e5a131a4306ec8c69602722ec42819032690
    message: Update README.md
    date: "2026-03-14T18:03:08Z"
    url: >-
      https://github.com/MAST-2026/medical-autonomous-streamlined-triage/commit/beb7e5a131a4306ec8c69602722ec42819032690
  - sha: 371b6e7a88517eef5ada5bb376ca5e9379c854ee
    message: "pmd: decisions.md: decided on ICs, moving onto schematic"
    date: "2026-03-14T02:31:20Z"
    url: >-
      https://github.com/MAST-2026/medical-autonomous-streamlined-triage/commit/371b6e7a88517eef5ada5bb376ca5e9379c854ee
  - sha: f103f6883ba0c5a1138a09d14f46777427911822
    message: restructured folders
    date: "2026-03-12T22:17:35Z"
    url: >-
      https://github.com/MAST-2026/medical-autonomous-streamlined-triage/commit/f103f6883ba0c5a1138a09d14f46777427911822
links:
  github: https://github.com/MAST-2026/medical-autonomous-streamlined-triage
manual: false
---

# MAST Hackathon Project

Shane Abbott, Justin Amaya, Tyler Marleton, Christian White, Karla "Kenny" Madrigal

## Overview

### Key Design Criteria

Continuous vitals monitoring from wearable patient devices.

Automatic triage status information when patient conditions change.

Real-time transmission of patient data to hospitals.

Reduced workload for EMS personnel, allowing responders to focus on treatment instead of communications.

## Components (Tentative)

### 1. Patient Monitoring Device

Strapped onto the patient as a harness, monitoring vitals such as heart rate, blood pressure, temperature, etc. The deivce would transmit information to the ARU in the vehicle automatically, no human input is necessary.

### 2. Ambulance Repeater Unit

Amplifies transmissions from the patient monitoring device to nearby hospitals. High wattage to counter urban RF environments. Pings the HTU for open beds and/or other qualifying information and services. Receives PMD data.

### 3. Hospital Transciever Unit

Located in the hospital, possibly near the radio equipment. Should have excellent RX capabilities. The final step in the process, this is what the hospital staff see, the end product of all incoming patients, in one place.

_Kenny: Question, could a filtering system allow doctors to subscribe to patient updates in real-time, receiving only information relevant to their assigned cases? Also, how do cases get assigned? I doubt whether any of these questions are within the scope of our project, and I think we're better off focusing on the existing components._

## Project Structure

I'd like for each project inside each directory (electrical/firmware/assembly) to have its own `DECISIONS.md` so we can keep track of... decisions.

I've initialized KiCad and PlatformIO projects in the electrical/firmware directories. Mech team (Christian, Justin, Shane) can decide how they want to structure the assembly directory.

```
├── patient-monitoring-device/
│   ├── electrical
│   ├── firmware
│   ├── assembly
│   └── DECISIONS.md
├── ambulance-repeater/
│   ├── electrical
│   ├── firmware
│   ├── assembly
│   └── DECISIONS.md
├── hospital-transciever/
│   ├── electrical
│   ├── firmware
│   ├── assembly
│   └── DECISIONS.md
│
└── README.md
```

## Getting Started

### Prerequisites

- PlatformIO is an extension for VSCode. Feel free to check out [this video on YouTube](https://www.youtube.com/watch?v=PYSy_PLjytQ)

## Contributing

1. CLONE the repository, not fork. i mean either way doesnt matter but for the sake of simplicit. yas.
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request. PRs are to merge from your `feature/` branches to the `main` branch

## TODO

- [ ] Define clear project outcome and success criteria
- [ ] [Add additional tasks]
