/**
 * Generation manifest (locked + rolled):
 *   archetype: G              gRenderMode: scrub-cinematic
 *   style: S11 (Architectural Product, light)
 *   color_variant: pearl-platinum (LOCKED — #FBFBFA/#EAEAEA/#9CA0A8/#3A3D45)
 *   typography: outfit-figtree (LOCKED — Outfit + Figtree)
 *   voice_family: V6 (Modern Tech, bold & futuristic)
 *   card_variant: CV7 (Bento)        cta_variant: CTA2 (split form — waitlist)
 *   header_variant: pill-floating    footer_variant: FT3 (Giant Wordmark)
 *   hero_overlay: HO5 big-stack      hero_text: H5         hero_entrance: E2
 *   scene_variant: S11.V2 architectural lattice
 *   motion_variant: M3 slow orbit    hero_treatment: scrubbed-frames
 *   narrative_shape: object-reveal   composition_pattern: right-third
 *   subject_position: mid             lighting_temperature: studio-controlled
 *   industry_video_tone: tech-precise camera_vocabulary: orbital
 *   motion_vocabulary: ease-cinematic glass_material: frosted-hairline
 *   background_treatment: solid-color-disciplined
 *   motion_bg_pattern: constellation  motion_bg_density: subtle
 *   industry: saas                   build_mode: landing
 *   auth_strategy: none              subscribers_enabled: true (waitlist)
 */

import assetManifest from "./asset-manifest.json";

const images = assetManifest.images as Record<string, string>;
const videos = assetManifest.videos as Record<string, string>;

export const siteConfig = {
  templateId: "saas-v1",
  industry: "saas",

  company: {
    name: "FlowSync",
    legalName: "FlowSync Labs Inc.",
    tagline: "AI workflows that actually ship.",
    description:
      "FlowSync is an AI workflow runtime that connects every tool your team already uses — tickets, code, docs, calendars — and lets agents execute multi-step work end-to-end. Pre-launch, building with design partners.",
    email: "hello@flowsync.dev",
    phone: "",
    location: "Global · Remote-first",
  },

  brand: {
    primary: "#3A3D45",
    accent: "#9CA0A8",
    bg: "#FBFBFA",
    surface: "#EAEAEA",
  },

  typography: {
    display: "Outfit",
    body: "Figtree",
    mono: "JetBrains Mono",
  },

  seo: {
    siteUrl: "https://flowsync.dev",
    locale: "en_US",
    htmlLang: "en",
    defaultTitle: "FlowSync — AI workflows that actually ship.",
    defaultDescription:
      "Connect every tool your team uses. Let AI agents execute multi-step work end-to-end. Pre-launch — join the waitlist for early access.",
    defaultOgImage: images["section-og"] || "/og-default.png",
    twitterHandle: "@flowsyncdev",
    noindexPaths: ["/admin", "/api"],
    googleSiteVerification: "",
  },

  socials: {
    instagram: "",
    twitter: "https://x.com/flowsyncdev",
    facebook: "",
    linkedin: "https://www.linkedin.com/company/flowsync",
    youtube: "",
    tiktok: "",
    whatsapp: "",
    github: "https://github.com/flowsync",
  } as Record<string, string>,

  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],

  hero: {
    eyebrow: "Pre-launch · Limited beta",
    h1: [
      { text: "AI workflows", accent: false },
      { text: "that actually", accent: false },
      { text: "ship.", accent: true },
    ],
    subline:
      "FlowSync runs multi-step AI work across your stack — tickets, code, docs, calendars. One workflow language, every tool, no glue scripts.",
  },

  cta: {
    primary: "Join waitlist",
    secondary: "See how it works",
    primaryHref: "/#waitlist",
    secondaryHref: "/#process",
  },

  // CTA section (CTA2 split form)
  ctaBlock: {
    eyebrow: "Limited beta · Early-access pricing locked",
    heading: "Get FlowSync before everyone else.",
    description:
      "Pre-launch cohort closes when we hit capacity. Design-partner slots include direct access to the engineering team, custom adapters, and lifetime founder pricing.",
    formHeading: "Reserve your spot",
    formNote: "We email twice a month. No spam. Unsubscribe with one click.",
  },

  // Feature list (sections 2 + 3)
  valueProps: {
    eyebrow: "What it does",
    heading: "One runtime. Every tool. Real outcomes.",
    body:
      "Most automation breaks when the work gets messy. FlowSync's runtime handles branching, retries, human approvals, and live data — the same way a senior engineer would.",
  },

  // Bento services (CV7 — homepage)
  servicesHeading: "Built for the work AI can actually finish.",
  servicesEyebrow: "Capabilities",

  services: [
    {
      name: "Multi-step agent runtime",
      slug: "agent-runtime",
      description:
        "Long-running agents that plan, branch, retry, and ask for approval — without falling over on the third tool call.",
      highlights: ["Stateful workflows", "Native human-in-the-loop", "Replay any step"],
    },
    {
      name: "Universal connectors",
      slug: "connectors",
      description:
        "Pre-built adapters for GitHub, Linear, Notion, Slack, Stripe, Postgres, plus a 30-second SDK for your internal APIs.",
      highlights: ["40+ first-party adapters", "Typed SDK", "OAuth + service accounts"],
    },
    {
      name: "Workflow studio",
      slug: "studio",
      description:
        "Drag, drop, branch, version. Edit in the UI or commit YAML — your call. Production runs are auditable line-by-line.",
      highlights: ["Visual + as-code", "Git-backed versions", "Step-level diffs"],
    },
    {
      name: "Live observability",
      slug: "observability",
      description:
        "See every prompt, tool call, retry, and decision in real time. Trace costs, latency, and outcomes per workflow.",
      highlights: ["Per-step traces", "Cost dashboard", "Slack + PagerDuty alerts"],
    },
    {
      name: "Approvals & guardrails",
      slug: "guardrails",
      description:
        "Pause for human approval on risky steps. Hard-block writes outside policy. Test in shadow before promoting.",
      highlights: ["Policy engine", "Shadow runs", "Granular role permissions"],
    },
    {
      name: "Self-improving evals",
      slug: "evals",
      description:
        "Capture every production run as an eval. Compare model versions, prompts, and tool choices against the real workload.",
      highlights: ["Auto-eval capture", "A/B prompts", "Regression alerts"],
    },
  ],

  // Process (T15 split-scroll — homepage)
  process: [
    {
      step: 1,
      title: "Connect",
      description:
        "Authenticate the tools your team already lives in. Five minutes, OAuth, no proxies.",
    },
    {
      step: 2,
      title: "Compose",
      description:
        "Describe the workflow in natural language or YAML. FlowSync wires the steps and proposes the data shape.",
    },
    {
      step: 3,
      title: "Run",
      description:
        "Trigger from a webhook, schedule, or chat. Watch the trace render in real time. Roll back any step.",
    },
  ],

  // Stats (set to null — pre-launch, no fabricated metrics)
  stats: null as Array<{ value: string; label: string }> | null,

  // Testimonials (null — pre-launch)
  testimonials: null as Array<{ quote: string; author: string; role: string }> | null,

  // About page
  about: {
    eyebrow: "About",
    heading: "We're building the runtime AI agents have been missing.",
    intro:
      "Most teams trying to put agents into production hit the same wall: brittle glue code, no replay, no observability, no way to keep humans in the loop. We've shipped agent platforms at scale before — this is the one we wished we'd had.",
    body: [
      "FlowSync started in late 2025 as an internal tool at a 12-person startup that was building too many one-off agent scripts and losing track of which ones worked.",
      "Six months in, we'd replaced thirty Python scripts with twelve FlowSync workflows. The team stopped writing glue code. We open-sourced the runtime in early 2026 and the waitlist hit 4,000 in a week.",
      "Now we're hiring, raising, and onboarding design partners. If you've been burned by agent frameworks before, we want to talk.",
    ],
    values: [
      {
        title: "Inspectable by default",
        description:
          "Every step is a record. You can replay it, diff it, evaluate it. No black boxes.",
      },
      {
        title: "Composable, not monolithic",
        description:
          "Use FlowSync for one workflow or all of them. We don't ask you to rewrite your stack.",
      },
      {
        title: "Humans in the loop",
        description:
          "Approvals, shadow runs, and policy gates are first-class. Agents work with people, not around them.",
      },
    ],
  },

  // Section themes
  sectionThemeWord: "Compose.",
  themeStatement: "Compose what your team already does. Then let agents finish it.",

  // Trust bar
  trustBar: [
    "Built on OpenAI · Anthropic · Google",
    "SOC 2 in progress",
    "Self-host available",
    "Open-source runtime",
  ],

  // Header variant id
  headerVariant: "pill-floating" as const,

  // Footer variant id (FT3 Giant Wordmark Aurora — adapted for light theme)
  footer: {
    variant: "FT3",
    ctaHeadline: "Build the workflow you've been hand-writing.",
    brandStatement:
      "FlowSync is an AI workflow runtime for teams who want to ship agents, not just demo them.",
    contactEmail: "hello@flowsync.dev",
    auroraBackground: false,
  },

  // Motion globals
  motion: {
    scrollProgress: true,
    cursorFollower: false,
    intensity: "medium" as "low" | "medium" | "high",
  },

  // Scrub-cinematic hero — assetMode set at scaffold time
  scrollHero: {
    archetype: "G" as const,
    styleId: "S11",
    assetMode: "live-generate" as "live-generate" | "prompt-only",
    imageUrl: "",
    frameCount: 0,
    scrollDistance: 3,
    eyebrow: "AI workflow runtime",
    chapters: [
      {
        at: 0,
        eyebrow: "Pre-launch · 2026",
        headlineLines: ["AI workflows", "that actually ship."],
        subline:
          "One runtime. Every tool. Multi-step agent work that doesn't fall over on the third call.",
        cta: { label: "Join waitlist", href: "#waitlist" },
      },
      {
        at: 0.35,
        eyebrow: "Composable",
        headlineLines: ["Drop in.", "Stay flexible."],
        subline:
          "Use FlowSync for one workflow or all of them. Native connectors for the tools your team already lives in.",
      },
      {
        at: 0.7,
        eyebrow: "Inspectable",
        headlineLines: ["Every step", "auditable."],
        subline:
          "Replay any run. Diff any prompt. Trace cost and latency per tool call. Production-grade from day one.",
        cta: { label: "Reserve a slot", href: "#waitlist" },
      },
    ],
  },

  // Manifest-derived asset accessors
  _assets: { images, videos },
} as const;

export type SiteConfig = typeof siteConfig;
