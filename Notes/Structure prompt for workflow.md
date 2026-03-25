INPUT
Video file:
/Users/terrymammis/Documents/ANTIGRAVITY/Remotion Video Editing/Videos_for_editing/Build an AI Phone Agent with ElevenLabs_2.mp4

Step 1 — Remotion Caption Engine

Create a React component with the following caption system:

Typography
• Font: Inter (via @remotion/google-fonts)
• Size: 72px
• Weight: 800
• Letter spacing: 0.02em
• Word gap: 24px

Chunking
Display 4 words per chunk


Styling Logic
Word State
Style
Current
#BFF549 (neon green) + glow 0 4px 40px rgba(191,245,73,0.8) + scale(1.1)
Past
#FFFFFF
Future
rgba(255,255,255,0.5)



Additional effects:

• Text shadow: 0 4px 20px rgba(0,0,0,0.8)
• Position: Bottom, 120px

Gradient overlay:
• Height: 40%
• Fade: transparent → rgba(0,0,0,0.85)

Audio

• Mute original video
• Use original audio track

Cleanup Rules

• Remove trailing punctuation (., ,)  
• Preserve contractions (don't, it's, etc.)

Step 2 — Render

npx remotion render [CompositionName] output.mp4 --codec h264

• Output location: Desktop


📁 Project Structure

/project-root
  /public
    video.mp4
  Root.tsx
  index.ts

Dependencies
• remotion
• @remotion/google-fonts

Root.tsx registers the composition and wires everything together.

⚡ Execution Rules
• Auto-accept all permissions
• No prompts
• No confirmations
• Just execute

This is a hands-off, deterministic pipeline from raw footage → cinematic, captioned MP4.