---
description: Create a showcase video of a service, tool, or product by crawling a URL
---

# Showcase Service / Tool / Product from URL

Generate a cinematic Remotion showcase video by extracting design tokens, copy, and assets from a website.

## Required Input

- **URL** — the website to showcase
- **Tuning Scales** (optional, defaults in brackets) — see `SHOWCASE-PROMPT.md` for full scale definitions:
  - `DURATION [3]` — video length (8s–30s)
  - `SCENE COUNT [3]` — number of scenes (3–8)
  - `MOTION [3]` — animation complexity
  - `CONTENT DENSITY [3]` — how much content to include
  - `COLOR FIDELITY [4]` — how closely to match site colors
  - `TYPOGRAPHY [3]` — font matching depth
  - `ASSET USAGE [3]` — how many images to download
  - `LANGUAGE [2]` — keep original or translate
  - `TRANSITIONS [2]` — scene transition style
  - `OUTPUT [1]` — output format

## Step 1 — Crawl & Extract

Fetch the URL and extract:

- **Copy**: headings (H1–H6), body text, button labels, nav items, footer
- **Images**: all `<img>` src URLs, `og:image`, favicon, background images
- **Logo**: primary logo + variants
- **Colors**: hex/rgba from CSS variables, inline styles, stylesheets → map to semantic tokens (primary, secondary, accent, background, text, border, gradient)
- **Typography**: font-family, sizes, weights, line-heights, letter-spacing, text-transforms
- **Layout**: border-radius, box-shadow, spacing, max-widths
- **Components**: cards, buttons, inputs, nav, sections — note styling patterns

## Step 2 — Generate Theme File

Create/update `src/theme.ts` with all extracted tokens as typed constants:

```
fonts        — font families with role labels
typography   — H1–H6 + body + small + label
colors       — named semantic tokens
gradients    — named gradient strings
layout       — borderRadius, shadow, spacing scale, maxWidth
copy         — extracted text organized by section
assets       — staticFile paths to downloaded images
```

Add inline comments citing where each value was found (CSS variable name, element, etc.).

## Step 3 — Download Assets

Download images to `public/[website-name]/`:

- Only download assets needed per `ASSET USAGE` scale
- Use original CDN URLs; fall back to optimized versions if available
- If a download fails, note it — the component will use colored placeholder rectangles

## Step 4 — Generate Showcase Component

Create/update `src/DesignShowcase.tsx`:

- Import everything from `./theme`
- Composition: 1920×1080, 30fps
- Duration per `DURATION` scale
- Scene count per `SCENE COUNT` scale
- Each scene is a `<Sequence>` with cross-fade transitions (adjustable per `TRANSITIONS` scale)
- Apply animation rules per `MOTION` scale

### Scene Structure (per CONTENT DENSITY)

| Scale | Scenes |
|-------|--------|
| 1     | Logo reveal → Tagline → CTA |
| 2     | + Hero section with headline + sub + image |
| 3     | + Feature cards (staggered entrance) |
| 4     | + Stats/social-proof + pricing |
| 5     | + Testimonials, integrations, footer |

## Step 5 — Register & Render

1. Ensure `<Composition>` is registered in `src/Root.tsx` with id `"DesignShowcase"`
2. Calculate `durationInFrames` from DURATION scale × 30fps
3. Render:

```bash
npx remotion render src/index.ts DesignShowcase ~/Desktop/[website-name]-showcase.mp4 --codec h264
```

---

## Key Files

- `SHOWCASE-PROMPT.md` — full tuning scale reference
- `src/theme.ts` — extracted design tokens
- `src/DesignShowcase.tsx` — 5-scene showcase component with spring animations
- `src/Root.tsx` — composition registration
- `public/[website-name]/` — downloaded assets (logo, hero, features, bg)

## Edge Cases

- If a font fails to load, fall back to next font in the stack, then to Inter
- If a downloaded image fails, use a colored placeholder rectangle matching the dominant extracted color
- Non-Latin websites may need `LANGUAGE` scale adjustment
- Sites behind auth walls cannot be crawled — ask user for screenshots or manual input instead
