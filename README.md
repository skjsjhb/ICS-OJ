# The ICS Online Judging System

This repository contains code for the deployed online judging system for the ICS course, built with Next.js (NextUI).

Technically this is only a frontend which forwards requests from the user to the judge backend. See [LC3XT](https://github.com/skjsjhb/lc3xt) for details.

## Build

You'll need Node.js (probably the latest LTS) with NPM to build. If running under a common architecture, no native toolchain (e.g. MSVC) is required.

You'll need the backend, LC3XT, to run the frontend. See the build instructions for details.

1. Clone the project:
   
   ```
   git clone --filter=tree:0 https://github.com/skjsjhb/ics-oj.git
   ```

2. Install dependencies:
   
   ```
   npm install
   ```

3. Start the development server:
   
   ```
   npm run dev
   ```

## Languages

The system is provided in **Simplified Chinese** for now. However, more languages are planned.

## Copying

Copyright (C) 2024 Ted "skjsjhb" Gao.

This project is licensed under [GNU Affero General Public License (Version 3)](https://www.gnu.org/licenses/agpl-3.0.en.html).

There is no warranty for the program, to the extent permitted by applicable law.
