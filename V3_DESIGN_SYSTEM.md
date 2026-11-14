# MULTIPATH V3 — Design System Specification
**Philosophy:** Premium Futuristic Scientific Minimalism  
**Document:** `V3_DESIGN_SYSTEM.md`  
**Version:** 3.0.0-StageA  
**Status:** Living Standard  

---

## 1. Core Design Philosophy

MULTIPATH is an interactive learning platform centered on one transformative principle:
> **One concept. Multiple ways to understand it.**

MULTIPATH V3 transforms this vision into a sophisticated scientific learning environment. The interface balances the **cinematic gravitas of a space observatory** (NASA Eyes, Lusion) with the **curiosity and approachability of an advanced research incubator** (Google Labs).

### Key Architectural Tenets:
1. **Dual-Surface Equilibrium:**
   - **Deep Observatory Surfaces (Cosmic Graphite):** Frame the cosmos, interactive 3D models, telemetry HUDs, and navigation.
   - **Warm Ivory Surfaces (Scientific Parchment):** Host dense explanatory reading, mathematical derivations, and pedagogical dialogues to maximize legibility and minimize cognitive fatigue.
2. **Restrained Instrument Accents:**
   - High-contrast, mathematically placed **Scientific Lime (`#B8FF00` / `#C8F36B`)** and **Quantum Cyan (`#38BDF8`)** for interactive affordances and telemetry vectors.
   - Zero tacky cyberpunk tropes, neon gradients, or blinding glowing borders.
3. **Structured Telemetry & Micro-Typography:**
   - Monospace brackets (`[ CBSE · CL-10 ]`, `[ 10.ALG.01 ]`, `[ TELEMETRY: ACTIVE ]`) anchor data points into precise architectural coordinates.
4. **Purposeful, Physics-Informed Motion:**
   - Smooth, deterministic transitions with zero scroll-jacking. Full compliance with `prefers-reduced-motion`.

---

## 2. Color Palette & Token Architecture

### 2.1. Dark Observatory Surfaces (Base Canvas & Containers)
| Token Name | Hex Code | Tailwind / CSS Variable | Primary Application |
| :--- | :--- | :--- | :--- |
| `surface-void` | `#080A0E` | `--color-surface-void` | Root background for immersive sections |
| `surface-obsidian`| `#0D1117` | `--color-surface-obsidian` | Hero wrapper, 3D viewport canvas backdrop |
| `surface-graphite`| `#141A22` | `--color-surface-graphite` | Primary telemetry cards, modals, headers |
| `surface-elevated`| `#1C2430` | `--color-surface-elevated` | Hover states, inner containers, nested cards |
| `surface-border` | `rgba(255, 255, 255, 0.08)` | `--color-border-dark` | 1px hairline border on dark surfaces |
| `surface-border-subtle`| `rgba(255, 255, 255, 0.04)` | `--color-border-subtle-dark` | Subtle dividers, grid coordinate lines |

### 2.2. Warm Reading Surfaces (Pedagogical Explanations & Content)
| Token Name | Hex Code | Tailwind / CSS Variable | Primary Application |
| :--- | :--- | :--- | :--- |
| `reading-ivory` | `#FAF9F5` | `--color-reading-ivory` | Reading canvas, derivation backgrounds |
| `reading-paper` | `#F3F2EB` | `--color-reading-paper` | Explanatory cards, derivation steps |
| `reading-card` | `#E8E7DF` | `--color-reading-card` | Secondary reading containers, callout boxes |
| `reading-border`| `rgba(18, 23, 20, 0.08)`| `--color-border-light` | 1px hairline border on reading cards |

### 2.3. Typographic Ink & Contrast Tokens
| Token Name | Hex Code | Primary Application |
| :--- | :--- | :--- |
| `text-white-pure` | `#FFFFFF` | Primary headlines on dark surfaces |
| `text-white-soft` | `#E5E7EB` | Body text and subheadings on dark surfaces |
| `text-muted-telemetry` | `#8B9DAE` | Monospace tags, coordinates, timestamps |
| `text-ink-pure` | `#111613` | Primary headlines on reading surfaces |
| `text-ink-soft` | `#2D3748` | Body paragraphs and step explanations |
| `text-ink-muted` | `#5E6D77` | Metadata, unit descriptions on reading surfaces |

### 2.4. Scientific Accents & Diagnostic Spectrum
| Token Name | Hex Code | Usage & Meaning |
| :--- | :--- | :--- |
| `accent-lime` | `#B8FF00` / `#C8F36B` | Primary interactive trigger, active path marker, CTA |
| `accent-lime-hover` | `#A3E635` / `#BCEB58` | Hover state for primary action buttons |
| `accent-lime-glow` | `rgba(184, 255, 0, 0.15)` | Controlled back-glow for active 3D nodes |
| `accent-cyan` | `#38BDF8` | Scientific telemetry, coordinate vectors, 3D camera status |
| `accent-amber` | `#F59E0B` | Reassessment warnings, developing skills |
| `accent-emerald` | `#10B981` | Verified official curriculum provenance, correct reasoning |

---

## 3. Typography Hierarchy

### 3.1. Font Families
- **Display Font:** `Space Grotesk`, `Inter`, sans-serif. Used for bold cinematic headlines, hero titles, and section markers.
- **Body Font:** `Inter`, system-ui, -apple-system, sans-serif. Optimized for dense reading, mathematical explanations, and UI labels.
- **Monospace Font:** `JetBrains Mono`, `Fira Code`, monospace. Used for telemetry coordinates, curriculum codes (`10.ALG.01`), bracketed tags, and data tables.

### 3.2. Hierarchy & Type Scale
| Role | Font Family | Size / Line Height | Tracking | Weight |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | Space Grotesk | `text-4xl sm:text-5xl lg:text-6xl / 1.08` | `-0.03em` | Bold (`700`) |
| **Section Title**| Space Grotesk | `text-2xl sm:text-3xl lg:text-4xl / 1.15` | `-0.025em`| Bold (`700`) |
| **Card Heading** | Space Grotesk | `text-lg sm:text-xl / 1.25` | `-0.02em` | SemiBold (`600`) |
| **Body Large** | Inter | `text-base sm:text-lg / 1.6` | `0` | Regular (`400`) |
| **Body Regular**| Inter | `text-sm sm:text-base / 1.55` | `0` | Regular (`400`) |
| **Caption / UI** | Inter | `text-xs / 1.4` | `+0.01em` | Medium (`500`) |
| **Telemetry Tag**| JetBrains Mono| `text-[10px] sm:text-xs / 1.2` | `+0.08em` | Bold (`700`), Uppercase |

---

## 4. Layout, Spacing & Container Radii

### 4.1. Radii Hierarchy
- **Pill Capsule:** `rounded-full` (`9999px`) — Used for floating navigation, action buttons, filter chips.
- **Hero / Primary Card:** `rounded-3xl` (`24px` / `1.5rem`) — Used for main viewports, 3D visualizer frames, section banners.
- **Standard Card:** `rounded-2xl` (`16px` / `1rem`) — Used for topic cards, feature showcases, dialog containers.
- **Inner Micro-Card:** `rounded-xl` (`12px` / `0.75rem`) — Used for input fields, derivation step containers, badges.

### 4.2. Glassmorphism & Depth Standards
- **Floating Header Navigation:**
  - Background: `rgba(13, 17, 23, 0.82)`
  - Backdrop Blur: `backdrop-blur-xl` (`20px`)
  - Border: `1px solid rgba(255, 255, 255, 0.09)`
  - Shadow: `0 8px 32px -4px rgba(0, 0, 0, 0.35)`
- **Telemetry HUD Overlays:**
  - Background: `rgba(20, 26, 34, 0.78)`
  - Backdrop Blur: `backdrop-blur-md` (`12px`)
  - Border: `1px solid rgba(255, 255, 255, 0.08)`

---

## 5. Architectural Schematics & Scientific Accents

### 5.1. Instrument L-Brackets
To evoke the precision of scientific instruments and astronomical HUDs without decorative clutter, container cards can feature subtle 1px corner markers:
```css
/* Instrument Corner Reticle */
.corner-reticle {
  position: relative;
}
.corner-reticle::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  width: 8px;
  height: 8px;
  border-top: 2px solid #B8FF00;
  border-left: 2px solid #B8FF00;
  border-top-left-radius: 4px;
}
```

### 5.2. Telemetry Status Badges
Consistent syntax for live system and curriculum status:
- `[ CBSE · CL-10 · VERIFIED ]` — Green check badge
- `[ CISCE · CL-9 · 2028 EXAM ]` — Green check badge
- `[ TELEMETRY: 3D WEBGL ACTIVE ]` — Pulsing green dot
- `[ 4 PATHS CONVERGENT ]` — Micro orbital icon

---

## 6. Motion & Accessibility Invariants

### 6.1. Motion Timing
- **Micro-interactions (buttons, pills, tabs):** `150ms cubic-bezier(0.16, 1, 0.3, 1)`
- **Card hover & elevation transitions:** `250ms cubic-bezier(0.16, 1, 0.3, 1)`
- **Drawer / Modal expansion:** `300ms cubic-bezier(0.16, 1, 0.3, 1)`
- **Camera dollies (Three.js):** Linear interpolation with damping (`lerp(current, target, 0.05)`)

### 6.2. Reduced Motion Safeguard
Every animated component must respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
In 3D components, canvas rotation and impulse physics freeze to static equilibrium when `useReducedMotion()` returns `true`.

---

## 7. Responsive Breakpoint Matrix
- **Mobile (`< 640px`):** Single column, touch-optimized floating bar with compact drawer, 3D canvas bounded with 1:1 or 4:3 aspect ratio, full-bleed touch targets (min 44px).
- **Tablet (`640px – 1023px`):** 2-column grid, compact search pill, adaptive telemetry drawer.
- **Desktop (`1024px – 1279px`):** Asymmetrical hero (7 cols editorial / 5 cols 3D interactive core), persistent top navigation, multi-column curriculum matrix.
- **Wide Display (`≥ 1280px`):** Max container width `1280px` (`max-w-7xl`), generous negative margins, full HUD controls.
