---
name: Daniyusk Portfolio
description: Minimalist cosmic-dark portfolio engineered for frictionless clarity and instant action
colors:
  background: "#0a0a0f"
  surface-terminal: "#08080c"
  surface-deep: "#0a0712"
  surface-card: "#09090b"
  primary: "#7c3aed"
  primary-hover: "#5b21b6"
  accent-light: "#c4b5fd"
  accent-mid: "#a78bfa"
  text-primary: "#ffffff"
  text-secondary: "#8a8aa3"
  text-muted: "#71717a"
  border-subtle: "rgba(255, 255, 255, 0.1)"
  terminal-red: "#ff5f57"
  terminal-yellow: "#febc2e"
  terminal-green: "#28c840"
typography:
  display:
    fontFamily: "Figtree, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Figtree, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Figtree, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(1.15rem, 2vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Figtree, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.72rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "14px"
  xl: "18px"
  "2xl": "22px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
  button-secondary:
    backgroundColor: "rgba(9, 9, 11, 0.45)"
    textColor: "{colors.accent-light}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
    height: "48px"
  card-project:
    backgroundColor: "rgba(9, 9, 11, 0.7)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    padding: "20px 24px"
  chip-tag:
    backgroundColor: "transparent"
    textColor: "{colors.accent-light}"
    typography: "{typography.label}"
    padding: "4px 8px"
  modal-surface:
    backgroundColor: "rgba(10, 10, 15, 0.94)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.2xl}"
    padding: "28px 32px"
---

# Design System: Daniyusk Portfolio

## Overview

**Creative North Star: "The Frictionless Cosmic Void"**

The design philosophy is uncompromisingly clean, direct, and intentional. Built upon a deep obsidian canvas with subtle cosmic gradients and specular violet illumination, the interface rejects decorative clutter, excessive prose, and non-essential UI artifacts. Every screen is designed so that first-time visitors immediately grasp what is in front of them and what action to take next within seconds.

Information density is deliberately kept lean: long explanatory paragraphs are replaced with concise 1-to-2 sentence value propositions, high-contrast typography, and scannable technical tags. Interactive affordances are immediately obvious—primary actions glow with tactile prominence, secondary pathways remain subtly accessible, and cognitive load is minimized at every viewport.

**Key Characteristics:**
- **Zero-Fluff Directness:** Minimal copy, concise headlines, and immediate clarity.
- **Uncluttered Canvas:** Generous negative space centered around high-impact focal points.
- **Obvious Affordances:** Primary call-to-actions (CTAs) are unmistakably actionable with specular lighting and high contrast.
- **Cosmic Restraint:** Deep background blacks (`#0a0a0f`) punctured only by surgical violet accents (`#7c3aed`).
- **Tactile Micro-interactions:** Fluid GSAP reveals and WebGL specular highlights that respond subtly without distracting from content.

## Colors

The color palette embraces an ultra-dark cosmic aesthetic where deep obsidian surfaces recede into the void, allowing high-clarity white typography and electric violet accents to guide the user's eye effortlessly.

### Primary
- **Electric Violet** (`#7c3aed`): The primary actionable accent. Reserved strictly for primary callouts, hero CTA buttons, and high-priority interactive highlights.
- **Deep Violet** (`#5b21b6`): Primary hover and active interaction state, grounding the user upon click or touch.

### Secondary
- **Soft Lavender** (`#c4b5fd`): Used for secondary interactive borders, focus rings, tag chips, and subtle metadata labels.
- **Vibrant Lilac** (`#a78bfa`): Ambient glow highlights and interactive icon emphasis.

### Neutral
- **Cosmic Void Background** (`#0a0a0f`): The root canvas color, providing maximum contrast and depth across all viewports.
- **Obsidian Surface** (`#08080c`): Dedicated terminal backdrop and recessed container fill.
- **Midnight Deep Surface** (`#0a0712`): Ambient underlays and deep gradient transitions.
- **Pure White** (`#ffffff`): Primary headings, brand marks, and high-emphasis labels.
- **Muted Slate** (`#8a8aa3`): Secondary text, supporting descriptions, and inactive states.
- **Subtle White Border** (`rgba(255, 255, 255, 0.1)`): Crisp, unobtrusive boundaries for glass containers and cards.

### Functional / Terminal
- **Terminal Red** (`#ff5f57`): Window control (close) indicator.
- **Terminal Yellow** (`#febc2e`): Window control (minimize) indicator.
- **Terminal Green / Status OK** (`#28c840`): Window control (maximize) and online/ready status badges.

### Named Rules
**The Signal-over-Noise Rule.** The electric violet accent (`#7c3aed`) must never cover more than 10% of any viewport. Its scarcity is what creates immediate cognitive focus.

**The Contrast-First Rule.** All body text and functional icons must maintain a minimum contrast ratio of 4.5:1 against their underlying surfaces. Inactive or decorative elements must never compete with actionable targets.

## Typography

The type system pairs **Figtree**—a contemporary, friendly geometric sans-serif for crystal-clear headings and readable body text—with **JetBrains Mono** for technical tags, commands, and metadata.

**Display Font:** Figtree (fallback: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif)
**Body Font:** Figtree
**Mono / Label Font:** JetBrains Mono (fallback: monospace)

**Character:** Bold, authoritative, and stripped of unnecessary ornament. Headlines deliver instant context; monospace accents convey engineering precision.

### Hierarchy
- **Display** (Weight: 900, Size: `clamp(2.5rem, 5vw, 4.5rem)`, Line-Height: 1.05, Tracking: -0.03em): Reserved for hero headlines and key brand statements.
- **Headline** (Weight: 800, Size: `clamp(1.75rem, 3.5vw, 3rem)`, Line-Height: 1.15, Tracking: -0.025em): Section titles (e.g., "Featured Projects", "Let's build something together").
- **Title** (Weight: 700, Size: `clamp(1.15rem, 2vw, 1.5rem)`, Line-Height: 1.25, Tracking: -0.02em): Card headings and modal titles.
- **Body** (Weight: 400, Size: `0.95rem` (15px), Line-Height: 1.6, Color: `#8a8aa3` / `text-zinc-300`): Concise explanatory copy (strictly limited to 1–3 lines).
- **Label / Tag** (Weight: 500, Size: `0.72rem` (11.5px), Line-Height: 1.4, Tracking: 0.1em, Uppercase/Mono): Status chips, technology tags, and navigation breadcrumbs.

### Named Rules
**The Three-Line Brevity Rule.** No single paragraph of body text should exceed 3 lines on desktop (max line length 65ch). If a message cannot be communicated in 3 lines, compress the language or convert it to structured bullet points.

**The Single Type Pairing Rule.** Never introduce a third font family. Figtree handles communication; JetBrains Mono handles code and metadata.

## Layout

Layouts prioritize spacious, uncluttered grids that funnel visitor attention toward core outcomes without distraction.

- **Grid System:** 12-column responsive fluid grid with maximum container width of `80rem` (1280px / `max-w-7xl`).
- **Hero Stance:** Asymmetrical two-column hero layout (`lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]`) placing direct value propositions on the left and a tactile interactive element on the right.
- **Vertical Spacing:** Generous breathing room between sections (`py-24` / `py-32` on desktop) ensuring that each section functions as an isolated, distraction-free stage.
- **Responsive Adaptability:** Mobile viewports stack vertically into a single column with full-width tap targets (min height 48px), while desktop expands horizontal density cleanly.

### Named Rules
**The Single Focus Rule.** Each screen section must have one dominant visual centerpiece (e.g., Hero CTA group, Project 3D Gallery, Contact Icon Bar). Competing sidebars or secondary carousels in the same viewport are strictly prohibited.

## Elevation & Depth

Depth is established through soft dark glassmorphism, radial glow lighting, and multi-layered translucent backdrops rather than harsh opaque drop shadows.

- **Background Glows:** Soft ambient radial glows (`radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)`) that emanate from behind key interactive zones.
- **Glassmorphism:** `backdrop-blur-xl` / `backdrop-blur-2xl` coupled with subtle translucent borders (`border-white/10` to `border-white/15`) and 1px inset highlights (`shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`).
- **Specular Highlights:** WebGL-driven specular rim lighting on primary CTA buttons that tracks cursor proximity and angle.

### Shadow Vocabulary
- **Card Ambient** (`box-shadow: 0 18px 45px rgba(0, 0, 0, 0.25)`): Grounding shadow for floating project cards and containers.
- **Button Glow** (`box-shadow: 0 18px 45px rgba(91, 33, 182, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.18)`): Radiant violet projection for primary action links.
- **Modal Deep Elevation** (`box-shadow: 0 35px 70px rgba(0, 0, 0, 0.65)`): High-elevation overlay treatment for dialogs and media viewports.

### Named Rules
**The Light-from-Above Rule.** All glass surfaces and container borders place their 1px white specular highlight strictly along the top edge (`inset_0_1px_0_rgba(255,255,255,...)`) to simulate directional lighting across the dark void.

## Shapes

Form language balances smooth geometric radii with architectural precision.

- **Small Controls (Buttons, Inputs, Chips):** Rounded corners with `12px` to `14px` radius (`rounded-[14px]`).
- **Cards and Containers:** Rounded corners with `18px` to `20px` radius (`rounded-[20px]`).
- **Modals and Display Windows:** Softened large envelopes with `22px` radius (`rounded-[22px]`).
- **Avatar & Social Badges:** Pure circular silhouettes (`rounded-full`) to create organic focal anchors against structured grid cards.
- **Borders:** Crisp, 1px translucent strokes (`border border-white/10` to `border-white/20`), avoiding solid heavy outlines.

## Components

### Buttons

Buttons provide unmistakable affordances with generous hit targets and instant feedback.

- **Primary Button (`ButtonLink` / `SpecularButton`):**
  - **Shape:** Rounded rectangle (`14px` radius), minimum height `48px` (`min-h-12`).
  - **Fill & Color:** Electric Violet (`#7c3aed`/90) with white text, top inset highlight, and WebGL specular edge light.
  - **Hover / Active:** Deepens to Violet-500 (`#5b21b6`), with a subtle active press scale (`active:scale-[0.97]`).
  - **Purpose:** The unambiguous primary destination on the page (e.g., "View Projects").

- **Secondary / Ghost Button:**
  - **Shape:** Rounded rectangle (`14px` radius), minimum height `48px`.
  - **Fill & Color:** Translucent zinc (`bg-zinc-950/45`), text in Soft Lavender (`#c4b5fd`), 1px white border (`border-white/10`), backdrop blur.
  - **Hover / Active:** Shifts to `bg-violet-950/45` with enhanced border illumination.
  - **Purpose:** Supporting alternative action (e.g., "Contact me", "Back to Home").

### Project Cards

- **Shape & Surface:** `rounded-[20px]`, `bg-zinc-950/70`, `backdrop-blur-xl`.
- **Media Presentation:** Full-bleed 16:9 media preview at top, with automatic fallback when media is absent.
- **Typography & Details:** Bold title with animated top-right arrow (`ArrowUpRight`), concise 2-3 line description, and mono tag chips.
- **Hover State:** Smooth translation upward (`motion-safe:hover:-translate-y-1`), subtle background lightening (`hover:bg-zinc-950/85`), and ambient violet glow trigger.

### Social & Contact Icons

- **Shape:** Pure circular buttons (`h-16 w-16 rounded-full`), centered border (`border-zinc-700/70`).
- **Hover Feedback:** Platform-specific glowing color wash (LinkedIn blue, GitHub violet, Discord indigo, Email emerald) with smooth scale (`scale-110`).
- **Tooltip:** Clean floating dark card showing platform name and handle, rendered with `backdrop-blur-md` and instant opacity fade.

### Project Details Modal

- **Backdrop:** Deep dark scrim (`bg-black/75 backdrop-blur-xl`) isolating the viewport.
- **Surface:** `rounded-[22px]`, `bg-[#0a0a0f]/94`, `backdrop-blur-2xl`.
- **Layout:** Two-column split layout on desktop (Media Viewer on the left, details and direct action buttons on the right). No nested scrolling.
- **Close Trigger:** High-contrast circular close button (`h-11 w-11`) in top right, rotating 90° on hover.

## Do's and Don'ts

### Do:
- **Do keep copy short, direct, and actionable.** Replace paragraphs with single punchy sentences and scannable bullet points.
- **Do make the next step instantly obvious.** Ensure the primary action stands out from across the room using size, contrast, and specular illumination.
- **Do maintain clean, open negative space.** Allow UI components to breathe with generous margins and padding.
- **Do use JetBrains Mono strictly for technical metadata, tags, and commands.**
- **Do provide instant visual and tactile feedback** on hover, focus-visible, and active states for every interactive control.
- **Do preserve high contrast (≥ 4.5:1)** between all text elements and the dark cosmic background.

### Don'ts:
- **Don't clutter the screen with decorative badges, banners, or redundant widgets.** If an element does not help the user decide or act, remove it.
- **Don't write long wall-of-text explanations.** Avoid jargon, marketing fluff, or repetitive narratives.
- **Don't use multiple conflicting primary buttons in the same container.** Maintain one clear primary call-to-action per section.
- **Don't use low-contrast text colors** (e.g., dark gray on black) that force the user to strain to read.
- **Don't introduce arbitrary accent colors** outside the established violet/lavender system (except for standard brand icons like LinkedIn/Discord).
- **Don't create multi-tiered nested scroll areas.** Keep views fixed and structured to prevent layout confusion.
