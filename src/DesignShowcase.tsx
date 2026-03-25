import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  Sequence,
} from "remotion";
import { colors, fonts, typography, gradients, layout, copy, assets } from "./theme";

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
    transform: `scale(${interpolate(progress, [0, 1], [0.95, 1])})`,
  };
};

/* ──────────────────────────────────────────────────────────────────
   Scene 1: Logo Reveal  (0–3s → frames 0–90)
   ────────────────────────────────────────────────────────────────── */

const SceneLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame: frame - 10, fps, config: { damping: 14 }, durationInFrames: 30 });
  const taglineStyle = fadeSlideUp(frame, fps, 30);

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.footerBg} 50%, ${colors.darkBg} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity: bgOpacity,
      }}
    >
      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.greenBright}22 0%, transparent 70%)`,
          opacity: interpolate(frame, [5, 30], [0, 0.6], { extrapolateRight: "clamp" }),
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <Img
          src={staticFile(assets.logo)}
          style={{
            width: 220,
            objectFit: "contain",
            transform: `scale(${logoScale})`,
            opacity: logoScale,
          }}
        />
        <div
          style={{
            ...taglineStyle,
            fontFamily: fonts.headline,
            fontSize: 28,
            fontWeight: 500,
            color: colors.mintLight,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          {copy.brand}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ──────────────────────────────────────────────────────────────────
   Scene 2: Hero Headline  (3–7s → frames 90–210)
   ────────────────────────────────────────────────────────────────── */

const SceneHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineStyle = fadeSlideUp(frame, fps, 5);
  const subStyle = fadeSlideUp(frame, fps, 18);
  const ctaStyle = fadeSlideUp(frame, fps, 32);
  const imgStyle = fadeIn(frame, fps, 20);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.primaryDark} 0%, ${colors.footerBg} 100%)`,
        padding: 80,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 60,
      }}
    >
      {/* Text column */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            ...headlineStyle,
            fontFamily: fonts.headline,
            fontSize: typography.h1.size,
            fontWeight: typography.h1.weight,
            color: colors.white,
            lineHeight: 1.05,
            letterSpacing: -1,
          }}
        >
          Din Digitala{"\n"}Receptionist
        </div>
        <div
          style={{
            ...subStyle,
            fontFamily: fonts.primary,
            fontSize: 22,
            fontWeight: 400,
            color: colors.mintLight,
            lineHeight: 1.5,
            maxWidth: 500,
          }}
        >
          {copy.heroSub}
        </div>
        <div
          style={{
            ...ctaStyle,
            display: "inline-flex",
            alignSelf: "flex-start",
            padding: "16px 36px",
            borderRadius: layout.borderRadius.lg,
            background: colors.purple,
            fontFamily: fonts.primary,
            fontSize: 18,
            fontWeight: 600,
            color: colors.white,
            boxShadow: "0 8px 30px rgba(101,61,187,0.4)",
          }}
        >
          {copy.heroCta}
        </div>
      </div>

      {/* Hero image */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", ...imgStyle }}>
        <Img
          src={staticFile(assets.hero)}
          style={{
            width: 580,
            borderRadius: layout.borderRadius.md,
            boxShadow: layout.shadow.elevated,
            objectFit: "cover",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

/* ──────────────────────────────────────────────────────────────────
   Scene 3: Features (3 cards)  (7–11s → frames 210–330)
   ────────────────────────────────────────────────────────────────── */

const FeatureCard: React.FC<{
  title: string;
  desc: string;
  icon: string;
  delay: number;
  accentColor: string;
}> = ({ title, desc, icon, delay, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const style = fadeSlideUp(frame, fps, delay);

  return (
    <div
      style={{
        ...style,
        flex: 1,
        background: colors.white,
        borderRadius: layout.borderRadius.md,
        padding: 36,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        boxShadow: layout.shadow.card,
        border: `1px solid ${colors.coolGray}`,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: layout.borderRadius.sm,
          background: accentColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: fonts.headline,
          fontSize: typography.h4.size,
          fontWeight: typography.h4.weight,
          color: colors.textPrimary,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: fonts.primary,
          fontSize: typography.body.size,
          fontWeight: 400,
          color: colors.textMuted,
          lineHeight: 1.6,
        }}
      >
        {desc}
      </div>
    </div>
  );
};

const SceneFeatures: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleStyle = fadeSlideUp(frame, fps, 5);

  return (
    <AbsoluteFill
      style={{
        background: colors.beige,
        padding: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 48,
      }}
    >
      <div
        style={{
          ...titleStyle,
          fontFamily: fonts.headline,
          fontSize: typography.h2.size,
          fontWeight: typography.h2.weight,
          color: colors.primaryDark,
          textAlign: "center",
        }}
      >
        AI-receptionist anpassad för ditt företag
      </div>
      <div style={{ display: "flex", gap: 28 }}>
        <FeatureCard
          icon="⚡"
          title={copy.features[0].title}
          desc={copy.features[0].desc}
          delay={15}
          accentColor={colors.mintPale}
        />
        <FeatureCard
          icon="🔀"
          title={copy.features[1].title}
          desc={copy.features[1].desc}
          delay={22}
          accentColor={colors.purpleLight + "44"}
        />
        <FeatureCard
          icon="✅"
          title={copy.features[2].title}
          desc={copy.features[2].desc}
          delay={29}
          accentColor={colors.greenSoft}
        />
      </div>
    </AbsoluteFill>
  );
};

/* ──────────────────────────────────────────────────────────────────
   Scene 4: Stats / Social Proof  (11–14s → frames 330–420)
   ────────────────────────────────────────────────────────────────── */

const StatBlock: React.FC<{
  value: string;
  label: string;
  delay: number;
}> = ({ value, label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const style = fadeSlideUp(frame, fps, delay);

  return (
    <div style={{ ...style, textAlign: "center", flex: 1 }}>
      <div
        style={{
          fontFamily: fonts.headline,
          fontSize: 64,
          fontWeight: 900,
          color: colors.greenBright,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: fonts.primary,
          fontSize: 18,
          fontWeight: 500,
          color: colors.white,
          marginTop: 12,
          opacity: 0.85,
        }}
      >
        {label}
      </div>
    </div>
  );
};

const SceneStats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleStyle = fadeSlideUp(frame, fps, 5);
  const badgeDelay = 50;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.darkBg} 0%, ${colors.primaryDark} 100%)`,
        padding: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 56,
      }}
    >
      <div
        style={{
          ...titleStyle,
          fontFamily: fonts.headline,
          fontSize: typography.h2.size,
          fontWeight: typography.h2.weight,
          color: colors.white,
          textAlign: "center",
        }}
      >
        Tillgänglig 24/7 — utan väntetid
      </div>

      <div style={{ display: "flex", gap: 64, width: "100%", maxWidth: 900 }}>
        <StatBlock value="24/7" label="Alltid tillgänglig" delay={12} />
        <StatBlock value="∞" label="Samtal samtidigt" delay={20} />
        <StatBlock value="<1s" label="Svarstid" delay={28} />
      </div>

      {/* Trust badges */}
      <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
        {copy.badges.map((badge, i) => {
          const s = fadeIn(frame, fps, badgeDelay + i * 6);
          return (
            <div
              key={badge}
              style={{
                ...s,
                padding: "10px 24px",
                borderRadius: layout.borderRadius.full,
                border: `1px solid ${colors.greenBright}66`,
                background: `${colors.greenBright}11`,
                fontFamily: fonts.primary,
                fontSize: 14,
                fontWeight: 500,
                color: colors.mintLight,
                letterSpacing: 0.5,
              }}
            >
              {badge}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ──────────────────────────────────────────────────────────────────
   Scene 5: CTA / Outro  (14–16s → frames 420–480)
   ────────────────────────────────────────────────────────────────── */

const SceneCta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoStyle = fadeIn(frame, fps, 5);
  const headlineStyle = fadeSlideUp(frame, fps, 12);
  const ctaStyle = fadeSlideUp(frame, fps, 24);
  const footerStyle = fadeIn(frame, fps, 35);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.primaryDark} 0%, ${colors.footerBg} 60%, ${colors.darkBg} 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.purple}33 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          zIndex: 1,
        }}
      >
        <Img
          src={staticFile(assets.logo)}
          style={{
            width: 140,
            objectFit: "contain",
            ...logoStyle,
          }}
        />
        <div
          style={{
            ...headlineStyle,
            fontFamily: fonts.headline,
            fontSize: typography.h2.size,
            fontWeight: typography.h2.weight,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          {copy.ctaFree}
        </div>
        <div
          style={{
            ...ctaStyle,
            padding: "18px 48px",
            borderRadius: layout.borderRadius.lg,
            background: `linear-gradient(135deg, ${colors.purple} 0%, ${colors.magenta} 100%)`,
            fontFamily: fonts.primary,
            fontSize: 20,
            fontWeight: 700,
            color: colors.white,
            boxShadow: "0 8px 30px rgba(101,61,187,0.5)",
          }}
        >
          Prova SmartDemo™
        </div>
        <div
          style={{
            ...footerStyle,
            fontFamily: fonts.primary,
            fontSize: 14,
            color: colors.mintLight,
            opacity: 0.6,
            marginTop: 16,
          }}
        >
          ai.smartclick.se
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
    <AbsoluteFill style={{ opacity: fadeOut }}>
      {children}
    </AbsoluteFill>
  );
};

/* ──────────────────────────────────────────────────────────────────
   Main Composition

   Total: 480 frames = 16 seconds @ 30fps

   Scene 1 — Logo Reveal:     0–90   (0–3s)
   Scene 2 — Hero Headline:   80–210 (2.67–7s)
   Scene 3 — Features:        200–330 (6.67–11s)
   Scene 4 — Stats:           320–420 (10.67–14s)
   Scene 5 — CTA Outro:       410–480 (13.67–16s)
   ────────────────────────────────────────────────────────────────── */

export const DesignShowcase: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.black }}>
      <Sequence from={0} durationInFrames={100}>
        <CrossFade durationInFrames={100}>
          <SceneLogo />
        </CrossFade>
      </Sequence>

      <Sequence from={80} durationInFrames={140}>
        <CrossFade durationInFrames={140}>
          <SceneHero />
        </CrossFade>
      </Sequence>

      <Sequence from={200} durationInFrames={140}>
        <CrossFade durationInFrames={140}>
          <SceneFeatures />
        </CrossFade>
      </Sequence>

      <Sequence from={320} durationInFrames={110}>
        <CrossFade durationInFrames={110}>
          <SceneStats />
        </CrossFade>
      </Sequence>

      <Sequence from={410} durationInFrames={70}>
        <SceneCta />
      </Sequence>
    </AbsoluteFill>
  );
};
