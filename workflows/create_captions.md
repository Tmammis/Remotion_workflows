---
description: Create cinematic captions overlay on a video using Remotion
---

# Create Captions

Generate a captioned video with animated word-by-word highlights rendered via Remotion.

## Required Input

- **Video file path** — absolute path to the source `.mp4` file

## Step 1 — Generate Captions JSON

Transcribe the video to produce word-level timestamps. Output format:

```json
[
  { "text": "word", "start": 0.0, "end": 0.32 },
  ...
]
```

- Save to `src/captions.json`
- Preserve contractions (don't, it's, etc.)
- Trailing punctuation (`.` `,`) will be stripped at render time by `cleanWord()`

## Step 2 — Copy Video to Public

Copy the source video into `public/video.mp4` so Remotion can access it via `staticFile()`.

```bash
cp "<source_video_path>" public/video.mp4
```

## Step 3 — Update Composition Duration

Open `src/Root.tsx` and update the `durationInFrames` for the `CaptionedVideo` composition.

Calculate: `durationInFrames = video_duration_seconds × 30` (fps is 30).

## Step 4 — Render

```bash
npx remotion render src/index.ts CaptionedVideo ~/Desktop/output.mp4 --codec h264
```

Output goes to `~/Desktop/`.

---

## Caption Design Spec

| Property         | Value                                      |
|------------------|--------------------------------------------|
| Font             | Inter (via `@remotion/google-fonts`)        |
| Size             | 72px                                       |
| Weight           | 800                                        |
| Letter spacing   | 0.02em                                     |
| Words per chunk  | 4                                          |
| Current word     | `#2CB262` (green) + glow + `scale(1.1)`    |
| Past words       | `#FFFFFF`                                  |
| Future words     | `rgba(255,255,255,0.5)`                    |
| Text shadow      | `0 4px 20px rgba(0,0,0,0.8)`              |
| Position         | Bottom, 120px padding                      |
| Gradient overlay | 40% height, transparent → `rgba(0,0,0,0.85)` |

## Key Files

- `src/CaptionedVideo.tsx` — React component with caption rendering logic
- `src/captions.json` — word-level transcript data
- `src/Root.tsx` — composition registration
- `public/video.mp4` — source video

## Edge Cases

- If transcription produces empty words, filter them out before saving
- If video has no audio track, captions cannot be auto-generated — provide `captions.json` manually
- Very long videos may need increased Node memory: `NODE_OPTIONS=--max-old-space-size=8192`
