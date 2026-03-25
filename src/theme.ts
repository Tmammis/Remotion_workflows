/**
 * SmartClick AI-Receptionist Design System
 * Extracted from: https://ai.smartclick.se
 *
 * Swedish AI receptionist service — "Din Digitala Receptionist"
 */

// ─── Typography ────────────────────────────────────────────────────
export const fonts = {
  /** Primary font used across all body text, inputs, labels */
  primary: "Inter",
  /** Used for headlines / hero sections */
  headline: "DM Sans",
  /** Alternate body font (some sections) */
  secondary: "Roboto",
  /** Serif option seen in some areas */
  serif: "Merriweather",
};

export const typography = {
  h1: { size: 56, weight: 900, lineHeight: 1.1, letterSpacing: -1 },
  h2: { size: 42, weight: 700, lineHeight: 1.15, letterSpacing: -0.5 },
  h3: { size: 30, weight: 600, lineHeight: 1.25, letterSpacing: 0 },
  h4: { size: 22, weight: 600, lineHeight: 1.35, letterSpacing: 0 },
  body: { size: 16, weight: 400, lineHeight: 1.6, letterSpacing: 0 },
  small: { size: 14, weight: 400, lineHeight: 1.5, letterSpacing: 0 },
  label: { size: 12, weight: 300, lineHeight: 1.4, letterSpacing: 0.5 },
};

// ─── Colors ────────────────────────────────────────────────────────
export const colors = {
  /** --primary: main brand green CTA */
  primary: "#37ca37",
  /** Dark green used in hero buttons & footer */
  primaryDark: "#0c3d1b",
  /** Deep green footer background --color-hzqjydpv */
  footerBg: "#0c4a2dff",
  /** Mid-green accent --color-66c5b55bdd3b410c1ea85652 */
  greenAccent: "#1ca35b",
  /** Bright green --color-vfborjfr */
  greenBright: "#3cc659",

  /** --secondary: brand blue */
  secondary: "#188bf6",
  /** Deep navy --color-lx2prsc2 */
  navy: "#000321",
  /** Vivid blue --color-lx2py304 */
  blueVivid: "#0038FF",
  /** Button blue --color-wgfxyzdf */
  blueCta: "#2456f3",

  /** Purple accent --color-mcj2josf (CTA buttons) */
  purple: "#653dbb",
  /** Magenta --color-aafmcepn */
  magenta: "#a72bba",
  /** Light purple token */
  purpleLight: "#d6bcfa",

  /** Mint / light green backgrounds --color-rvmyirhm */
  mintLight: "#bdffd1",
  /** Very light green --color-66c5b55bdd3b41989aa85651 */
  mintPale: "#d4ffd9",
  /** Soft green bg --color-m5mgzuv5 */
  greenSoft: "#d8e8db",

  /** Warm beige background --color-m5mb9qd2 */
  beige: "#f6f4ef",
  /** Warm gray --color-m5mbhai6 */
  warmGray: "#c2b8a9",
  /** Off-white --color-m5mcc1x4 */
  offWhite: "#f1edeb",
  /** Cool gray bg --color-m5mcu849 */
  coolGray: "#e9edef",

  /** Text colors */
  textPrimary: "#000000",
  textSecondary: "#544350", // --color-m5m9v9lg
  textMuted: "#6b727a", // --color-m5m6at85
  textLight: "#8c8c8c",

  /** Background darks */
  darkBg: "#0E182C", // --color-lgf1duy4
  darkCard: "#222639", // --color-lx3d0bih
  darkSlate: "#40464e", // --color-m5mcv109

  white: "#ffffff",
  black: "#000000",
  overlay: "rgba(0, 0, 0, 0.5)",
};

// ─── Gradients ─────────────────────────────────────────────────────
export const gradients = {
  /** Purple CTA gradient */
  purple: "linear-gradient(180deg, #653dbb 0%, #d6bcfa 100%)",
  /** Green hero gradient */
  green: "linear-gradient(180deg, #0c4a2d 0%, #9ae6b4 100%)",
  /** Subtle card gradient */
  card: "linear-gradient(180deg, #C9D8E0 0%, #40464e 100%)",
  /** Dark footer gradient */
  footer: "linear-gradient(180deg, #0c4a2d 0%, #0c3d1b 100%)",
};

// ─── Layout & Spacing ──────────────────────────────────────────────
export const layout = {
  maxWidth: 1170,
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 25,
    full: 9999,
  },
  shadow: {
    card: "0 4px 24px rgba(0,0,0,0.08)",
    elevated: "0 8px 32px rgba(0,0,0,0.12)",
    subtle: "2px 2px 2px 0px #707070",
  },
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    xxl: 64,
  },
};

// ─── Copy (Swedish — original site language) ───────────────────────
export const copy = {
  brand: "Smartclick",
  product: "AI-Receptionist",
  tagline: "Din Digitala Receptionist",
  heroHeadline: "Din Digitala Receptionist,\nRedo att sköta snacket — dygnet runt.",
  heroSub:
    "Din digitala kollega som besvarar era telefonsamtal på ett mänskligt vis.",
  heroCta: "Snacka med vår AI Astrid",
  features: [
    {
      title: "Svarar direkt",
      desc: "Ingen väntetid — varje samtal besvaras direkt.",
    },
    {
      title: "Kopplar rätt",
      desc: "Smidig koppling till rätt avdelning.",
    },
    {
      title: "Utför ärenden",
      desc: "Bokar möten och skickar meddelanden.",
    },
  ],
  availability: "Tillgänglig 24/7",
  availabilityDesc:
    "Alltid tillgänglig för dina kunder. Service och jour som arbetar dygnet runt.",
  simultaneous: "Fler samtal, samtidigt",
  simultaneousDesc:
    "Ingen väntetid — varje samtal besvaras direkt, oavsett hur många som ringer.",
  resolves: "Löser ärenden",
  resolvesDesc:
    "Inte bara en mästare på dialog, utan också på att få saker gjort.",
  ctaFree: "Testa gratis i 14 dagar",
  pricingLabel: "PRO",
  pricingHighlight: "BÄST VÄRDE",
  footer: "©2026 Smartclick AB. Alla rättigheter förbehållna.",
  badges: ["GDPR-anpassad", "SSL-krypterad", "Servrar inom EU"],
};

// ─── Assets ────────────────────────────────────────────────────────
export const assets = {
  logo: "smartclick/logo.png",
  hero: "smartclick/hero.png",
  feature1: "smartclick/feature1.png",
  feature2: "smartclick/feature2.png",
  feature3: "smartclick/feature3.png",
  bg: "smartclick/bg.jpg",
};
