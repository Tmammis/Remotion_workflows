/**
 * ElevenLabs Conversational AI Design System
 * Extracted from: ElevenLabs dashboard screenshots
 *
 * AI Voice Agent platform — dashboard analytics & agent builder
 */

// ─── Typography ────────────────────────────────────────────────────
export const fonts = {
  primary: "Inter",
  headline: "Inter",
  mono: "JetBrains Mono",
};

export const typography = {
  h1: { size: 56, weight: 800, lineHeight: 1.1, letterSpacing: -1.5 },
  h2: { size: 42, weight: 700, lineHeight: 1.15, letterSpacing: -0.5 },
  h3: { size: 30, weight: 600, lineHeight: 1.25, letterSpacing: 0 },
  h4: { size: 22, weight: 600, lineHeight: 1.35, letterSpacing: 0 },
  body: { size: 16, weight: 400, lineHeight: 1.6, letterSpacing: 0 },
  small: { size: 14, weight: 400, lineHeight: 1.5, letterSpacing: 0 },
  label: { size: 12, weight: 500, lineHeight: 1.4, letterSpacing: 0.5 },
};

// ─── Colors ────────────────────────────────────────────────────────
export const colors = {
  /** ElevenLabs doesn't have a single brand color — uses dark/monochrome + blue accents */
  black: "#000000",
  white: "#FFFFFF",

  /** Dashboard background */
  bgPrimary: "#FAFAFA",
  bgSecondary: "#F5F5F5",
  bgCard: "#FFFFFF",

  /** Sidebar - dark */
  sidebarBg: "#1A1A1A",
  sidebarText: "#A0A0A0",
  sidebarActive: "#FFFFFF",

  /** Chart colors from dashboard */
  chartBlue: "#4F6BF6",
  chartGreen: "#34D399",
  chartPurple: "#8B5CF6",
  chartPink: "#EC4899",

  /** Accent - the blue orb gradient */
  orbBlueLight: "#38BDF8",
  orbBlueMid: "#1E6FD9",
  orbBlueDark: "#0A3A7D",

  /** UI elements */
  border: "#E5E5E5",
  borderLight: "#F0F0F0",

  /** Text hierarchy */
  textPrimary: "#111111",
  textSecondary: "#666666",
  textMuted: "#999999",
  textLight: "#CCCCCC",

  /** Status colors */
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",

  /** Dark backgrounds for cinematic scenes */
  darkBg: "#0A0A0A",
  darkCard: "#1A1A1A",
  darkSurface: "#222222",
};

// ─── Gradients ─────────────────────────────────────────────────────
export const gradients = {
  /** The conversational AI orb gradient */
  orb: "conic-gradient(from 180deg, #0A3A7D, #1E6FD9, #38BDF8, #7DD3FC, #1E6FD9, #0A3A7D)",
  /** Dark cinematic background */
  darkHero: "linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 50%, #0A0A0A 100%)",
  /** Blue accent gradient */
  blueAccent: "linear-gradient(135deg, #4F6BF6 0%, #38BDF8 100%)",
  /** Card shimmer */
  cardShimmer: "linear-gradient(135deg, #1A1A1A 0%, #2A2A3A 50%, #1A1A1A 100%)",
  /** Dashboard header */
  headerGlow: "radial-gradient(ellipse at 50% 0%, #4F6BF622 0%, transparent 70%)",
};

// ─── Layout & Spacing ──────────────────────────────────────────────
export const layout = {
  maxWidth: 1200,
  borderRadius: {
    sm: 6,
    md: 10,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  shadow: {
    card: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
    elevated: "0 10px 40px rgba(0,0,0,0.15)",
    glow: "0 0 60px rgba(79,107,246,0.3)",
    orbGlow: "0 0 80px rgba(30,111,217,0.5), 0 0 160px rgba(56,189,248,0.2)",
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

// ─── Copy ──────────────────────────────────────────────────────────
export const copy = {
  brand: "ElevenLabs",
  product: "Conversational AI",
  tagline: "The most realistic AI voice agents",
  heroHeadline: "Build Conversational\nAI Voice Agents",
  heroSub: "Deploy intelligent voice agents that handle calls, route conversations, and resolve tasks — powered by the world's most realistic AI voices.",

  dashboardTitle: "Agent Analytics",
  metrics: [
    { label: "Number of calls", value: "54" },
    { label: "Average duration", value: "1:00" },
    { label: "Total cost", value: "28.9K credits" },
    { label: "Average cost", value: "534 credits" },
    { label: "Total LLM cost", value: "1,67 $" },
  ],
  successRate: "72.2%",
  responseTime: "1.26 s",
  conversationDuration: "54 m",

  agentName: "05 Smartclick - GHL",
  agentGreeting: "Hej, jag är AI-Receptionisten Astrid, hur kan jag hjälpa till?",

  features: [
    { title: "Voice Agents", desc: "Natural-sounding AI agents that handle phone calls 24/7" },
    { title: "Workflow Builder", desc: "Visual workflow editor for complex conversation routing" },
    { title: "Analytics Dashboard", desc: "Real-time metrics on calls, costs, and success rates" },
    { title: "Multi-language", desc: "Support for 29+ languages with native-level fluency" },
  ],

  footer: "elevenlabs.io",
};

// ─── Assets ────────────────────────────────────────────────────────
export const assets = {
  dashboard: "elevenlabs/dashboard.png",
  workflow: "elevenlabs/workflow.png",
  agentConfig: "elevenlabs/agent-config.png",
  voiceOrb: "elevenlabs/voice-orb.png",
};
