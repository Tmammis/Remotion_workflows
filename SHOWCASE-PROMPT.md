# Website → Remotion Showcase Video — System Prompt

Copy everything below the line, fill in the **URL** and adjust the **scales**, then paste as your prompt.

---

## 🔗 Website

URL: `___________________________`

## ⚙️ Tuning Scales

Adjust each value from **1–5**. Defaults shown in brackets.

```
DURATION        [3] ──────────────────────────────────────
                 1 = 8–10s    2 = 12–13s    3 = 15–16s    4 = 20–22s    5 = 28–30s

SCENE COUNT     [3] ──────────────────────────────────────
                 1 = 3 scenes    2 = 4    3 = 5    4 = 6    5 = 7–8 scenes

MOTION          [3] ──────────────────────────────────────
                 1 = Minimal (fade only)
                 2 = Subtle (fade + slight scale)
                 3 = Polished (spring fade/slide/scale)
                 4 = Dynamic (parallax, stagger, rotation)
                 5 = Cinematic (camera moves, 3D transforms, particle effects)

CONTENT DENSITY [3] ──────────────────────────────────────
                 1 = Logo + tagline + CTA only
                 2 = Add hero section
                 3 = Hero + features + CTA
                 4 = Hero + features + stats/proof + pricing + CTA
                 5 = Full page walkthrough (every section represented)

COLOR FIDELITY  [4] ──────────────────────────────────────
                 1 = Loose inspiration (pick a mood, reinterpret)
                 2 = Match primary + accent, freestyle the rest
                 3 = Match palette, allow creative gradients/backgrounds
                 4 = Exact extracted tokens, minimal creative liberty
                 5 = Pixel-perfect reproduction of site color usage

TYPOGRAPHY      [3] ──────────────────────────────────────
                 1 = System fonts only (fast render)
                 2 = Match primary font family only
                 3 = Match primary + headline fonts
                 4 = Full type scale (H1–H6, body, labels)
                 5 = Full type scale + letter-spacing + transforms

ASSET USAGE     [3] ──────────────────────────────────────
                 1 = No downloaded images (text + shapes only)
                 2 = Logo only
                 3 = Logo + hero image
                 4 = Logo + hero + feature images
                 5 = All discoverable images + icons + backgrounds

LANGUAGE        [2] ──────────────────────────────────────
                 1 = Keep original site language exactly
                 2 = Keep original, add English subtitle where helpful
                 3 = Translate all copy to English
                 4 = Rewrite copy (English, punchier/marketing-style)
                 5 = Custom copy (I will provide below)

TRANSITIONS     [2] ──────────────────────────────────────
                 1 = Hard cut (no transition)
                 2 = Cross-fade (overlap scenes)
                 3 = Slide / wipe
                 4 = Zoom + fade
                 5 = Mixed (vary per scene)

OUTPUT          [1] ──────────────────────────────────────
                 1 = MP4 to ~/Desktop
                 2 = MP4 + still frames (first frame of each scene)
                 3 = MP4 + GIF preview
                 4 = MP4 + individual scene MP4s
                 5 = MP4 + Lottie JSON export of motion data
```

## 📝 Custom Notes (optional)

```
CUSTOM_COPY:     (if LANGUAGE = 5, paste your copy here)
OUTPUT_FILENAME: (default: [website-name]-design-system.mp4)
MUSIC_MOOD:      (not rendered, but noted for post-production: e.g. "upbeat tech", "calm corporate")
BRAND_VOICE:     (e.g. "playful", "enterprise", "minimal luxury")
SKIP_SECTIONS:   (e.g. "skip pricing", "skip footer")
FOCUS_SECTIONS:  (e.g. "emphasize testimonials", "hero should be longest scene")
```

---

## System Instructions (paste everything below this line as your prompt)

---

Generate a Remotion showcase video from the provided website.

### Step 1 — Crawl & Extract

Fetch the URL and extract:
- **Copy**: all headings (H1–H6), body text, button labels, nav items, footer
- **Images**: all `<img>` src URLs, `og:image`, favicon, background images
- **Logo**: primary logo image + any variants
- **Colors**: every hex/rgba from CSS variables, inline styles, and stylesheets — map to: primary, secondary, accent, background, text, border, gradient tokens
- **Typography**: font-family declarations, font sizes, weights, line-heights, letter-spacing, text-transforms
- **Layout**: border-radius values, box-shadow definitions, spacing patterns, max-widths, container sizes
- **Components**: identify cards, buttons, inputs, nav, sections — note their styling patterns

### Step 2 — Generate Files

**`src/theme.ts`**
Export all extracted tokens as typed constants. Group by category. Add inline comments citing where each value was found (CSS variable name, element, etc.).

Sections:
```
fonts        — font families with role labels
typography   — H1–H6 + body + small + label (size, weight, lineHeight, letterSpacing)
colors       — named semantic tokens (primary, secondary, accent, text variants, backgrounds, borders)
gradients    — named gradient strings
layout       — borderRadius, shadow, spacing scale, maxWidth
copy         — extracted text content organized by section
assets       — staticFile paths to downloaded images
```

**`src/DesignShowcase.tsx`**
- Import everything from `./theme`
- Composition: 1920×1080, 30fps
- Duration: per DURATION scale
- Scene count: per SCENE COUNT scale
- Each scene is a `<Sequence>` with cross-fade or transition per TRANSITIONS scale

Animation rules per MOTION scale:
- **1**: opacity 0→1 only
- **2**: opacity 0→1 + scale 0.98→1
- **3**: spring-based opacity + translateY(20→0) + scale(0.95→1), stagger children by 6–8 frames
- **4**: add parallax layers, rotate(-2→0), per-element stagger with varied spring configs
- **5**: perspective transforms, floating particles, mask reveals, scroll-simulation

Scene structure per CONTENT DENSITY scale:
- **1**: Scene 1 = logo reveal, Scene 2 = tagline, Scene 3 = CTA
- **2**: + hero section with headline + sub + image
- **3**: + feature cards (staggered entrance)
- **4**: + stats/social-proof scene + pricing highlight
- **5**: + testimonials, integrations, footer, every major page section

### Step 3 — Download Assets

- Download images to `public/[website-name]/`
- Only download assets needed per ASSET USAGE scale
- Use original CDN URLs; fall back to optimized versions if available

### Step 4 — Register & Render

- Add `<Composition>` to `src/Root.tsx` with id `"DesignShowcase"`
- Calculate `durationInFrames` from DURATION scale × 30fps
- Render: `npx remotion render src/index.ts DesignShowcase [output-path] --codec h264`
- Output path per OUTPUT scale

### Execution Rules

- Auto-accept all permissions
- No confirmations
- Execute immediately
- If a downloaded image fails, skip it and use a colored placeholder rectangle matching the dominant extracted color
- If a font fails to load, fall back to the next font in the extracted stack, then to Inter

---

## Quick-Start Example

```
URL: https://example.com

DURATION:        3
SCENE COUNT:     3
MOTION:          3
CONTENT DENSITY: 3
COLOR FIDELITY:  4
TYPOGRAPHY:      3
ASSET USAGE:     3
LANGUAGE:        1
TRANSITIONS:     2
OUTPUT:          1
```

Paste the system instructions + your filled-in scales + the URL → get a rendered video.
