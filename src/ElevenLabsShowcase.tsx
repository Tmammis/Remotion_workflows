import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import {
  colors,
  fonts,
  typography,
  gradients,
  layout,
  copy,
  assets,
} from "./elevenlabs-theme";

/* ──────────────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────────────── */

const useSpring = (
  frame: number,
  fps: number,
  delay: number,
  config?: Partial<Parameters<typeof spring>[0]>
) =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, mass: 0.8, ...config },
    durationInFrames: 25,
  });

const fadeSlideUp = (frame: number, fps: number, delay: number) => {
  const progress = useSpring(frame, fps, delay);
  return {
    opacity: progress,
    transform: `translateY(${interpolate(progress, [0, 1], [30, 0])}px) scale(${interpolate(progress, [0, 1], [0.95, 1])})`,
  };
};

const fadeIn = (frame: number, fps: number, delay: number) => {
  const progress = useSpring(frame, fps, delay);
  return {
    opacity: progress,
    transform: `scale(${interpolate(progress, [0, 1], [0.96, 1])})`,
  };
};

const slideFromRight = (frame: number, fps: number, delay: number) => {
  const progress = useSpring(frame, fps, delay);
  return {
    opacity: progress,
    transform: `translateX(${interpolate(progress, [0, 1], [80, 0])}px)`,
  };
};

/* ──────────────────────────────────────────────────────────────────
   Scene 1: Logo Reveal + Tagline  (0–3s → frames 0–90)
   ────────────────────────────────────────────────────────────────── */

const SceneLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14 },
    durationInFrames: 30,
  });
  const taglineStyle = fadeSlideUp(frame, fps, 28);
  const subStyle = fadeSlideUp(frame, fps, 40);

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: colors.darkBg,
        justifyContent: "center",
        alignItems: "center",
        opacity: bgOpacity,
      }}
    >
      {/* Blue glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.chartBlue}18 0%, transparent 70%)`,
          opacity: interpolate(frame, [5, 30], [0, 0.8], {
            extrapolateRight: "clamp",
          }),
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* ElevenLabs wordmark */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            opacity: logoScale,
            fontFamily: fonts.headline,
            fontSize: 72,
            fontWeight: 800,
            color: colors.white,
            letterSpacing: -2,
          }}
        >
          ElevenLabs
        </div>
        <div
          style={{
            ...taglineStyle,
            fontFamily: fonts.primary,
            fontSize: 26,
            fontWeight: 400,
            color: colors.textMuted,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {copy.product}
        </div>
        <div
          style={{
            ...subStyle,
            fontFamily: fonts.primary,
            fontSize: 18,
            fontWeight: 400,
            color: colors.textLight,
            maxWidth: 500,
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          {copy.tagline}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ──────────────────────────────────────────────────────────────────
   Scene 2: Dashboard Analytics  (3–8s → frames 90–240)

   Shows the actual dashboard screenshot with animated metric
   overlays highlighting key stats.
   ────────────────────────────────────────────────────────────────── */

const MetricPill: React.FC<{
  label: string;
  value: string;
  delay: number;
  color: string;
}> = ({ label, value, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const style = fadeSlideUp(frame, fps, delay);

  return (
    <div
      style={{
        ...style,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        padding: "16px 20px",
        background: colors.darkCard,
        borderRadius: layout.borderRadius.md,
        border: `1px solid ${colors.darkSurface}`,
        minWidth: 140,
      }}
    >
      <div
        style={{
          fontFamily: fonts.primary,
          fontSize: 11,
          fontWeight: 500,
          color: colors.textMuted,
          textTransform: "uppercase",
          letterSpacing: 0.8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: fonts.headline,
          fontSize: 28,
          fontWeight: 700,
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
};

const SceneDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleStyle = fadeSlideUp(frame, fps, 5);
  const imgStyle = fadeIn(frame, fps, 12);
  const metricsVisible = frame > 30;

  // Subtle zoom on the screenshot
  const imgScale = interpolate(frame, [12, 150], [1.02, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: colors.darkBg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* Header glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 300,
          background: gradients.headerGlow,
        }}
      />

      {/* Title */}
      <div
        style={{
          ...titleStyle,
          fontFamily: fonts.headline,
          fontSize: typography.h3.size,
          fontWeight: typography.h3.weight,
          color: colors.white,
          marginBottom: 24,
          zIndex: 2,
        }}
      >
        {copy.dashboardTitle}
      </div>

      {/* Dashboard screenshot */}
      <div
        style={{
          ...imgStyle,
          position: "relative",
          borderRadius: layout.borderRadius.lg,
          overflow: "hidden",
          boxShadow: layout.shadow.elevated,
          border: `1px solid ${colors.darkSurface}`,
          maxHeight: 580,
        }}
      >
        <Img
          src={staticFile(assets.dashboard)}
          style={{
            width: 820,
            objectFit: "contain",
            transform: `scale(${imgScale})`,
          }}
        />
        {/* Overlay vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.3) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Floating metrics */}
      {metricsVisible && (
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 24,
            zIndex: 2,
          }}
        >
          <MetricPill
            label="Calls"
            value="54"
            delay={35}
            color={colors.chartBlue}
          />
          <MetricPill
            label="Success"
            value="72.2%"
            delay={42}
            color={colors.success}
          />
          <MetricPill
            label="Response"
            value="1.26s"
            delay={49}
            color={colors.chartPurple}
          />
          <MetricPill
            label="LLM Cost"
            value="$1.67"
            delay={56}
            color={colors.orbBlueLight}
          />
          <MetricPill
            label="Duration"
            value="54 min"
            delay={63}
            color={colors.chartPink}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};

/* ──────────────────────────────────────────────────────────────────
   Scene 3: Workflow Builder  (8–12s → frames 240–360)

   Shows the visual workflow editor screenshot.
   ────────────────────────────────────────────────────────────────── */

const SceneWorkflow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleStyle = fadeSlideUp(frame, fps, 5);
  const imgStyle = slideFromRight(frame, fps, 15);
  const labelStyle = fadeSlideUp(frame, fps, 35);

  return (
    <AbsoluteFill
      style={{
        background: colors.darkBg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* Subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `
            linear-gradient(${colors.white} 1px, transparent 1px),
            linear-gradient(90deg, ${colors.white} 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Title */}
      <div
        style={{
          ...titleStyle,
          fontFamily: fonts.headline,
          fontSize: typography.h3.size,
          fontWeight: typography.h3.weight,
          color: colors.white,
          marginBottom: 28,
          zIndex: 2,
        }}
      >
        Visual Workflow Builder
      </div>

      {/* Workflow screenshot */}
      <div
        style={{
          ...imgStyle,
          borderRadius: layout.borderRadius.lg,
          overflow: "hidden",
          boxShadow: layout.shadow.elevated,
          border: `1px solid ${colors.darkSurface}`,
        }}
      >
        <Img
          src={staticFile(assets.workflow)}
          style={{
            width: 1100,
            objectFit: "contain",
          }}
        />
      </div>

      {/* Feature labels */}
      <div
        style={{
          ...labelStyle,
          display: "flex",
          gap: 20,
          marginTop: 28,
          zIndex: 2,
        }}
      >
        {["Drag & Drop Nodes", "Conditional Branching", "Tool Integration"].map(
          (text, i) => {
            const s = fadeIn(frame, fps, 40 + i * 8);
            return (
              <div
                key={text}
                style={{
                  ...s,
                  padding: "10px 22px",
                  borderRadius: layout.borderRadius.full,
                  border: `1px solid ${colors.chartBlue}44`,
                  background: `${colors.chartBlue}11`,
                  fontFamily: fonts.primary,
                  fontSize: 14,
                  fontWeight: 500,
                  color: colors.orbBlueLight,
                }}
              >
                {text}
              </div>
            );
          }
        )}
      </div>
    </AbsoluteFill>
  );
};

/* ──────────────────────────────────────────────────────────────────
   Scene 4: Agent Configuration  (12–15s → frames 360–450)

   Shows the agent config interface — system prompt, first message,
   language settings.
   ────────────────────────────────────────────────────────────────── */

const SceneAgentConfig: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleStyle = fadeSlideUp(frame, fps, 5);
  const imgStyle = fadeIn(frame, fps, 12);

  // Config detail labels
  const details = [
    { label: "Agent", value: copy.agentName, color: colors.chartBlue },
    { label: "Language", value: "Swedish", color: colors.chartGreen },
    { label: "Status", value: "Live 100%", color: colors.success },
  ];

  return (
    <AbsoluteFill
      style={{
        background: colors.darkBg,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 80,
        gap: 60,
      }}
    >
      {/* Left side - text info */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          zIndex: 2,
        }}
      >
        <div
          style={{
            ...titleStyle,
            fontFamily: fonts.headline,
            fontSize: typography.h2.size,
            fontWeight: typography.h2.weight,
            color: colors.white,
            lineHeight: 1.1,
          }}
        >
          Agent{"\n"}Configuration
        </div>

        <div
          style={{
            ...fadeSlideUp(frame, fps, 18),
            fontFamily: fonts.primary,
            fontSize: 18,
            color: colors.textMuted,
            lineHeight: 1.6,
            maxWidth: 420,
          }}
        >
          Configure personality, voice, language, and system prompts for your AI
          agent — all from a single interface.
        </div>

        {/* Detail pills */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
          {details.map((d, i) => {
            const s = fadeSlideUp(frame, fps, 30 + i * 8);
            return (
              <div
                key={d.label}
                style={{
                  ...s,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: d.color,
                  }}
                />
                <span
                  style={{
                    fontFamily: fonts.primary,
                    fontSize: 14,
                    fontWeight: 500,
                    color: colors.textMuted,
                    minWidth: 80,
                  }}
                >
                  {d.label}
                </span>
                <span
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 14,
                    fontWeight: 500,
                    color: colors.white,
                  }}
                >
                  {d.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side - screenshot */}
      <div
        style={{
          flex: 1.3,
          ...imgStyle,
          borderRadius: layout.borderRadius.lg,
          overflow: "hidden",
          boxShadow: layout.shadow.elevated,
          border: `1px solid ${colors.darkSurface}`,
        }}
      >
        <Img
          src={staticFile(assets.agentConfig)}
          style={{
            width: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

/* ──────────────────────────────────────────────────────────────────
   Scene 5: Voice Orb + CTA  (15–18s → frames 450–540)

   Shows the iconic ElevenLabs conversational AI orb with a
   pulsing glow animation, plus branding/CTA.
   ────────────────────────────────────────────────────────────────── */

const SceneVoiceOrb: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const orbStyle = fadeIn(frame, fps, 8);
  const brandStyle = fadeSlideUp(frame, fps, 25);
  const ctaStyle = fadeSlideUp(frame, fps, 38);
  const footerStyle = fadeIn(frame, fps, 48);

  // Pulsing glow
  const pulsePhase = Math.sin((frame / fps) * Math.PI * 1.5) * 0.5 + 0.5;
  const glowSize = interpolate(pulsePhase, [0, 1], [60, 100]);
  const glowOpacity = interpolate(pulsePhase, [0, 1], [0.3, 0.6]);

  // Slow rotation for the orb image
  const rotation = interpolate(frame, [0, 90], [0, 15]);

  return (
    <AbsoluteFill
      style={{
        background: colors.bgPrimary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Diagonal lines bg (matching the orb screenshot) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            ${colors.textMuted} 10px,
            ${colors.textMuted} 11px
          )`,
        }}
      />

      {/* Glow behind orb */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.orbBlueMid}${Math.round(glowOpacity * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          filter: `blur(${glowSize}px)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
          zIndex: 1,
        }}
      >
        {/* Orb image */}
        <div
          style={{
            ...orbStyle,
            width: 280,
            height: 280,
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: layout.shadow.orbGlow,
          }}
        >
          <Img
            src={staticFile(assets.voiceOrb)}
            style={{
              width: 280,
              height: 280,
              objectFit: "cover",
              objectPosition: "center 40%",
              transform: `rotate(${rotation}deg) scale(1.4)`,
            }}
          />
        </div>

        {/* Brand name */}
        <div
          style={{
            ...brandStyle,
            fontFamily: fonts.headline,
            fontSize: typography.h2.size,
            fontWeight: typography.h2.weight,
            color: colors.textPrimary,
            textAlign: "center",
          }}
        >
          {copy.brand}
        </div>

        {/* CTA */}
        <div
          style={{
            ...ctaStyle,
            padding: "16px 44px",
            borderRadius: layout.borderRadius.full,
            background: colors.black,
            fontFamily: fonts.primary,
            fontSize: 18,
            fontWeight: 600,
            color: colors.white,
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}
        >
          Build your voice agent
        </div>

        {/* Footer */}
        <div
          style={{
            ...footerStyle,
            fontFamily: fonts.primary,
            fontSize: 14,
            color: colors.textMuted,
            marginTop: 8,
          }}
        >
          {copy.footer}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ──────────────────────────────────────────────────────────────────
   Cross-fade transition
   ────────────────────────────────────────────────────────────────── */

const CrossFade: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
  fadeFrames?: number;
}> = ({ children, durationInFrames, fadeFrames = 12 }) => {
  const frame = useCurrentFrame();

  const fadeOut = interpolate(
    frame,
    [durationInFrames - fadeFrames, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>{children}</AbsoluteFill>
  );
};

/* ──────────────────────────────────────────────────────────────────
   Main Composition

   Total: 540 frames = 18 seconds @ 30fps

   Scene 1 — Logo Reveal:       0–100   (0–3.3s)
   Scene 2 — Dashboard:         90–260  (3–8.7s)
   Scene 3 — Workflow Builder:   250–380 (8.3–12.7s)
   Scene 4 — Agent Config:      370–470 (12.3–15.7s)
   Scene 5 — Voice Orb + CTA:   460–540 (15.3–18s)
   ────────────────────────────────────────────────────────────────── */

export const ElevenLabsShowcase: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.darkBg }}>
      <Sequence from={0} durationInFrames={100}>
        <CrossFade durationInFrames={100}>
          <SceneLogo />
        </CrossFade>
      </Sequence>

      <Sequence from={90} durationInFrames={170}>
        <CrossFade durationInFrames={170}>
          <SceneDashboard />
        </CrossFade>
      </Sequence>

      <Sequence from={250} durationInFrames={130}>
        <CrossFade durationInFrames={130}>
          <SceneWorkflow />
        </CrossFade>
      </Sequence>

      <Sequence from={370} durationInFrames={100}>
        <CrossFade durationInFrames={100}>
          <SceneAgentConfig />
        </CrossFade>
      </Sequence>

      <Sequence from={460} durationInFrames={80}>
        <SceneVoiceOrb />
      </Sequence>
    </AbsoluteFill>
  );
};
