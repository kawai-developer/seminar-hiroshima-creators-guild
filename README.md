# Hiroshima Creators Guild Seminar Slides

Static slide deck and bonus pages for the Hiroshima Creators Guild AI seminar.

## Deploy Target

This repository is intended for deployment on Cloudflare Pages via Git integration.

Recommended Cloudflare Pages settings:

- Production branch: `main`
- Framework preset: `None`
- Root directory: `slides`
- Build command: leave empty (`exit 0` if the dashboard requires a value)
- Build output directory: `.`

If you do not use `Root directory`, you can also leave the repository root as-is and set:

- Build output directory: `slides`

## Local Structure

- `slides/`: public static site for the seminar
- `tokuten/`: source markdown for participant bonus materials
- `2603_Agenda.md`: agenda draft
- `slide_generation_prompt.md`: slide generation memo
