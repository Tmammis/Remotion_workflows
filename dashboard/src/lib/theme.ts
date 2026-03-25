/**
 * Design System — extracted from https://smartclick.se
 * Every token maps to a real value found on the site.
 * Comments note the source element / CSS variable.
 */

/* ─── Typography ──────────────────────────────────────────────── */

export const fonts = {
  /** Montserrat — used for all headings on the site */
  heading: "'Montserrat', sans-serif",
  /** Sora — primary body / content font */
  body: "'Sora', sans-serif",
  /** Mono fallback for code / data */
  mono: "'JetBrains Mono', 'Fira Code', monospace",
} as const;

export const fontSizes = {
  xs: '0.75rem',    // 12px — labels, input text
  sm: '0.875rem',   // 14px — small labels, badges
  base: '1rem',     // 16px — body paragraphs
  lg: '1.125rem',   // 18px — sub-headings, large body
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px — card titles
  '3xl': '1.9375rem', // 31px — section H2s
  '4xl': '2.5rem',  // 40px — page H1 on desktop
  '5xl': '4.0625rem', // 65px — hero H1
} as const;

export const fontWeights = {
  light: 300,   // input / placeholder text
  normal: 400,  // body paragraphs
  medium: 500,  // labels, nav items
  semibold: 600, // sub-headings, buttons
  bold: 700,    // section headings, CTA
  extrabold: 800, // hero H1
} as const;

export const lineHeights = {
  tight: 1.1,    // hero heading
  snug: 1.25,    // headings
  normal: 1.3,   // general headings — site uses 1.3em widely
  relaxed: 1.5,  // body text
  loose: 1.7,    // long-form content
} as const;

/* ─── Colors ──────────────────────────────────────────────── */

export const colors = {
  /* Primary brand — site's --primary & dark green CTA */
  primary: '#0c4a2d',          // dark green — buttons, nav bg, footer
  primaryLight: '#37ca37',     // --primary — bright green accents
  primaryLighter: '#50de89',   // hover / accent highlights
  primaryPale: '#bef7d0',      // --color-lz1u2dze — light green badges / backgrounds
  primaryPalest: '#f5fff5',    // --color-m9hcc3er — very subtle green tint bg

  /* Secondary — orange CTA / accent (seen in some cards) */
  secondary: '#ed6835',        // --color-lz1dhdyh — orange
  secondaryDark: '#f55900',    // --color-m77oer43
  secondaryPale: '#FEEFEA',    // --color-lzdrq9j7 — very light orange bg

  /* Neutrals — text & backgrounds */
  white: '#ffffff',
  gray50: '#f9f9f9',           // --color-lz1et5gs — lightest bg
  gray100: '#f5f5f5',          // --color-lz32xp95 — cards bg
  gray200: '#eaeaea',          // --color-lzdtodwx — borders
  gray300: '#D1D1D1',          // --color-lzdsmqut — dividers
  gray400: '#cbd5e0',          // --gray — muted borders
  gray500: '#797878',          // --color-m8iw7ifw border — input borders
  gray600: '#545250',          // --color-lz1gam34 — muted text
  gray700: '#414141',          // placeholder text
  gray800: '#323232',          // --color-lzdsgs94 — secondary text
  gray900: '#18192b',          // --color-m8iw7ifw — near-black text
  black: '#000000',

  /* Status colors */
  success: '#04b318',          // --color-m8liyxnt — green success
  warning: '#FFB92B',          // amber warning
  error: '#e93d3d',            // --red — destructive
  info: '#188bf6',             // --secondary — blue info

  /* Dark mode / dark surfaces */
  dark: '#0E182C',             // --color-lgf1duy4 — deep navy
  darkAlt: '#0B2147',          // --color-lz1dgjba
  darkSurface: '#070E1A',      // --color-lz1fmz9y — darkest bg

  /* Special */
  gold: '#d4af37',             // --color-m9mgw317
  teal: '#237b65',             // accent in some hero elements
  overlay: 'rgba(0, 0, 0, 0.5)', // --overlay
} as const;

/* ─── Gradients ───────────────────────────────────────────── */

export const gradients = {
  /** Hero / header gradient — teal-to-dark-teal */
  hero: 'linear-gradient(220deg, rgba(12,84,90,1) 30%, rgba(18,122,100,1) 70%)',
  /** Light green — used in "fördelar" / benefits cards bg */
  benefits: 'linear-gradient(210deg, rgba(123,229,159,1) 30%, rgba(176,249,172,1) 70%)',
  /** CTA button gradient */
  cta: 'linear-gradient(146deg, rgba(55,202,54,1) 0%, rgba(31,143,31,1) 100%)',
  /** Subtle light green card bg */
  cardLight: 'linear-gradient(0deg, #f5fff5 0%, #ffffff 100%)',
  /** Text gradient — green-to-white (used with background-clip) */
  textGreen: 'linear-gradient(180deg, rgba(123,229,159,1) 30%, white 70%)',
  /** Sidebar active item */
  sidebarActive: 'linear-gradient(135deg, #0c4a2d 0%, #127a64 100%)',
} as const;

/* ─── Layout ──────────────────────────────────────────────── */

export const radii = {
  none: '0',
  sm: '8px',       // small elements
  md: '12px',      // cards, badges, tags — site uses 12px widely
  lg: '15px',      // inputs, some cards — site input border-radius
  xl: '20px',      // large cards
  full: '50px',    // buttons — site CTA border-radius: 50px
  round: '9999px', // circular avatars / pills
} as const;

export const shadows = {
  none: 'none',
  sm: '0 1px 3px rgba(0,0,0,0.06)',
  /** Standard card shadow — from site's "0 2px 5px 2px #707070" mapped softer */
  card: '0 2px 8px rgba(0,0,0,0.08)',
  md: '0 4px 12px rgba(0,0,0,0.1)',
  /** Hover elevation — from "0 18px 40px rgba(0,0,0,0.14)" */
  lg: '0 12px 32px rgba(0,0,0,0.12)',
  xl: '0 18px 40px rgba(0,0,0,0.14)',
  /** Glass effect shadow — "0 4px 6px rgba(0,0,0,0.1)" */
  glass: '0 4px 6px rgba(0,0,0,0.1)',
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px — form field padding, gap
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px — button padding
  5: '1.25rem',   // 20px — column padding
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px — button horizontal padding
  10: '2.5rem',   // 40px — row padding
  12: '3rem',     // 48px
  16: '4rem',     // 64px — section vertical padding (≈60px)
  20: '5rem',     // 80px
} as const;

export const layout = {
  maxWidth: '1170px',           // site container max-width
  sidebarWidth: '260px',
  sidebarCollapsed: '72px',
  headerHeight: '64px',
  containerPadding: '1.5rem',   // 24px
} as const;

/* ─── Breakpoints ─────────────────────────────────────────── */

export const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;

/* ─── Transitions ─────────────────────────────────────────── */

export const transitions = {
  fast: '150ms ease',
  base: '200ms ease',
  slow: '350ms ease',         // site hover transitions are 0.35s
  spring: '350ms cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

/* ─── Component tokens ────────────────────────────────────── */

export const components = {
  button: {
    primary: {
      bg: colors.primary,
      text: colors.white,
      border: `3px solid ${colors.primary}`,
      hoverBg: 'transparent',
      hoverText: colors.primary,
      hoverBorder: `3px solid ${colors.primary}`,
      radius: radii.full,
      padding: `${spacing[4]} ${spacing[8]}`,
      fontWeight: fontWeights.bold,
      fontSize: fontSizes.base,
    },
    secondary: {
      bg: colors.primaryPale,
      text: colors.primary,
      border: `3px solid ${colors.primaryPale}`,
      hoverBg: colors.primaryLighter,
      hoverText: colors.white,
      hoverBorder: `3px solid ${colors.primaryLighter}`,
      radius: radii.full,
      padding: `${spacing[3]} ${spacing[5]}`,
      fontWeight: fontWeights.semibold,
      fontSize: fontSizes.sm,
    },
    ghost: {
      bg: 'transparent',
      text: colors.gray800,
      border: '1px solid transparent',
      hoverBg: colors.gray100,
      hoverText: colors.gray900,
      hoverBorder: '1px solid transparent',
      radius: radii.md,
      padding: `${spacing[2]} ${spacing[4]}`,
      fontWeight: fontWeights.medium,
      fontSize: fontSizes.sm,
    },
    destructive: {
      bg: colors.error,
      text: colors.white,
      border: `3px solid ${colors.error}`,
      hoverBg: 'transparent',
      hoverText: colors.error,
      hoverBorder: `3px solid ${colors.error}`,
      radius: radii.full,
      padding: `${spacing[3]} ${spacing[5]}`,
      fontWeight: fontWeights.semibold,
      fontSize: fontSizes.sm,
    },
  },
  input: {
    bg: colors.white,
    text: colors.gray900,
    border: `1px solid ${colors.gray500}`,
    focusBorder: `1px solid ${colors.primaryLight}`,
    errorBorder: `1px solid ${colors.error}`,
    placeholder: colors.gray700,
    radius: radii.lg,
    padding: `${spacing[2]} ${spacing[4]}`,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.light,
  },
  card: {
    bg: colors.white,
    border: `1px solid ${colors.gray200}`,
    radius: radii.xl,
    shadow: shadows.card,
    padding: spacing[6],
    hoverShadow: shadows.lg,
  },
} as const;
