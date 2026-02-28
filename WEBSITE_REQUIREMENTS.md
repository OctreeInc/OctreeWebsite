# Octree Website Requirements & Do-Not-Touch List

**Site:** octree.ai (Webflow Site ID: `68fad1c2c749a636ac40734a`)
**Last Updated:** 2026-02-26

---

## Website Architecture Overview

### Page Categories

The Octree website is organized into two distinct categories with different design systems:

| Category | Pages | Design System |
|---|---|---|
| **Main Pages** | Home, Product, Terminal, Agent, Examples | Shared nav-links and footer design |
| **Documentation Pages** | All `/ueterminaldocs/*` pages | Independent nav-links and footer design |

### Key Principle

- **Main Pages** share a unified navigation and footer design. Changes to nav-links or footer on one main page propagate to ALL main pages unless explicitly requested otherwise.
- **Documentation Pages** have their own isolated design system - their nav-links and footers are completely separate from main pages.
- **Homepage** has independent section designs but shares nav-links and footer with other main pages.

---

## Change Isolation Rules

When editing the website, follow these rules to ensure changes affect only the intended elements:

### Default Rule: Change Only the Requested Item

**Unless explicitly stated otherwise, any change request applies ONLY to the specific element or page mentioned.**

Examples:
- "Change the hero title on the Product page" → Only Product page hero title changes
- "Update the feature cards on Agent page" → Only Agent page feature cards change
- "Change the color of the CTA button" → Only that specific button's color changes

### Exception: Shared Components Across Main Pages

The following components are **SHARED** across all Main Pages (Home, Product, Terminal, Agent, Examples):

| Component | Shared Across | Behavior When Edited |
|---|---|---|
| `nav-links` / Navigation Bar | All Main Pages | Changes apply to ALL main pages automatically |
| `page-footer` / Footer | All Main Pages | Changes apply to ALL main pages automatically |
| Site-Level Scripts | All pages (including docs) | Changes apply site-wide |

**When editing shared components:** If you edit nav-links or footer on ANY main page, the change MUST propagate to all other main pages to maintain consistency.

### Explicit Page-Only Override

If the user wants to edit a shared component on ONLY one specific page, they must explicitly state:
- "Change the footer **only on the Terminal page**"
- "Update nav-links **on Product page only**"

Without this explicit instruction, shared component edits apply globally to all main pages.

### Documentation Pages Are Isolated

Documentation pages (`/ueterminaldocs/*`) NEVER share nav-links or footers with main pages. They have their own:
- Separate navigation structure (docs-specific nav-links)
- Separate footer design
- Can use different styling, colors, or layouts

---

## DO NOT TOUCH - Protected Elements

These items have been finalized and must NEVER be modified without explicit user approval.
**Before editing ANY script or element, check this list first.**

### 1. Laser Beam Animation (Data Spark Core + Data Spark FX)

| Field | Details |
|---|---|
| **User's Name** | "The laser" / "laser animation" |
| **Webflow Script ID** | `data_spark_core` |
| **Webflow Display Name** | Data Spark Core |
| **Current Version** | 1.0.6 (restored original from v1.0.4 source) |
| **Location** | Footer (site-level) |
| **Webflow Element** | `.digital-beams-container` |
| **Description** | Canvas-based animated cyan light beams that trace geometric paths across a 400px-tall container. Each beam has a glowing white/cyan head with a fading trail, traveling along predefined line-segment paths. Beams launch every 1200ms. Uses `requestAnimationFrame` for smooth rendering. Exposes `window._SP` (spark positions) and `window._B` (binary particles) for the companion FX script. |
| **Why Protected** | User confirmed this has the perfect design they wanted. |

| Field | Details |
|---|---|
| **User's Name** | "The laser" / "laser animation" (companion script) |
| **Webflow Script ID** | `data_spark_fx` |
| **Webflow Display Name** | Data Spark FX |
| **Current Version** | 1.0.6 (restored original from v1.0.4 source) |
| **Location** | Footer (site-level) |
| **Webflow Element** | `.scifi-overlay-container` |
| **Description** | Companion to Data Spark Core. Spawns binary digit particles (`0`, `1`, `.`) at the current beam head positions with random velocity and fading opacity. Reads from `window._SP` and `window._B` globals set by Data Spark Core. Particles spawn every 50ms. |
| **Why Protected** | Part of the laser system - must stay in sync with Data Spark Core. |

---

## Active Scripts - Editable

These scripts CAN be modified when requested by the user.

### 2. Waterfall Digits (Cascading Numbers)

| Field | Details |
|---|---|
| **User's Name** | "Waterfall digits" / "waterfall effect" / "the one that doesn't flicker" |
| **Webflow Script ID** | `cascading_numbers` |
| **Webflow Display Name** | Cascading Numbers |
| **Current Version** | 2.0.4 |
| **Location** | Footer |
| **Webflow Element** | `#cascading-numbers` (exists only on Home page) |
| **Description** | Canvas-based Matrix-style rain of binary digits (`0` and `1`) in cyan. Columns spaced 20px apart, each glyph fades over 8 frames. Digits enter from the top and exit through the bottom of the viewport. Only runs on the Home page (element only exists there). |
| **Recent Changes** | v2.0.4: Fixed digits not reaching bottom of screen by creating canvas wrapper directly on `document.body` instead of styling the existing Webflow parent element (avoids ancestor transform/overflow clipping). |

### 3. Product Dropdown Nav

| Field | Details |
|---|---|
| **User's Name** | "Product dropdown" |
| **Webflow Script ID** | `product_dropdown_nav` |
| **Webflow Display Name** | Product Dropdown Nav |
| **Current Version** | 1.0.0 |
| **Location** | Footer |
| **Description** | Handles click-to-navigate on `.dropdown-trigger` elements (navigates to `/product`). Also injects CSS so `.dropdown-wrapper:hover .dropdown-content` becomes visible. |

### 4. Dropdown Hover Fix

| Field | Details |
|---|---|
| **User's Name** | "Product dropdown" (companion) |
| **Webflow Script ID** | `dropdown_hover_fix` |
| **Webflow Display Name** | Dropdown Hover Fix |
| **Current Version** | 1.0.0 |
| **Location** | Footer |
| **Description** | JavaScript-based hover fix for the Product dropdown. Uses `mouseenter`/`mouseleave` on `.dropdown-wrapper` with a 300ms grace period so the dropdown stays visible while the user moves from the trigger across the gap to the dropdown menu. |

### 5. Flickering Digits (Fading Flicker Numbers)

| Field | Details |
|---|---|
| **User's Name** | "Flickering digits" / "the one that flickers" |
| **Webflow Script ID** | `fading_flicker_numbers` |
| **Webflow Display Name** | Fading Flicker Numbers |
| **Current Version** | 1.2.9 |
| **Location** | Footer |
| **Webflow Element** | Creates its own `#flicker-layer` div on `document.body` |
| **Description** | DOM-based falling binary digits in green (`rgba(0,255,136,0.1)`) with green text-shadow glow. Each character flickers opacity between `1` and `0.2` every 80ms while falling at 3px/30ms. New digit spawns every 60ms. The entire layer fades out as user scrolls down the page. Runs on ALL pages. |

---

## Script Deployment Summary

### Site-Level Scripts (apply to ALL pages)

| Script ID | Display Name | Version | Location |
|---|---|---|---|
| `fading_flicker_numbers` | Fading Flicker Numbers | 1.2.9 | Footer |
| `cascading_numbers` | Cascading Numbers | 2.0.4 | Footer |
| `data_spark_core` | Data Spark Core | 1.0.6 | Footer |
| `data_spark_fx` | Data Spark FX | 1.0.6 | Footer |
| `hero_glow_keyframes` | Hero Glow Keyframes | 1.0.0 | Header |
| `product_dropdown_nav` | Product Dropdown Nav | 1.0.0 | Footer |
| `dropdown_hover_fix` | Dropdown Hover Fix | 1.0.0 | Footer |

### Page-Level Scripts

None. (Legacy v1.0.0 page-level laser scripts were removed on 2026-02-21.)

---

## Shared Components (Main Pages)

The following components are **identical** across all Main Pages (Home, Product, Terminal, Agent, Examples):

### Navigation Bar (nav-links)

**Structure:** `page-header` > `nav-links`

- **Octree logo** image (class `nav-logo`, 32px height, order: -1) → links to `/`
- **Home** link (class `nav-link`) → `/`
- **Product Dropdown** (class `dropdown-wrapper`):
  - Trigger: "Product ▾"
  - Dropdown menu (class `dropdown-content`):
    - Terminal → `/terminal`
    - AI Agent → `/agent`
- **Examples** link (class `nav-link`) → `/examples`

### Footer (page-footer)

**Standard Footer Text:**
- **"© 2026 Octree, Inc.  All rights reserved."** (class `footer-text`)
- Note: There are two non-breaking spaces between "Inc." and "All"

> **Note:** All Main Pages must use this exact footer text. Documentation pages may use different footer content.

---

## Homepage Content Structure

The Home page (`/`) contains the following sections as of 2026-02-20:

### Navigation Bar
Uses shared **nav-links** component (see Shared Components section above).

### Logo Section
- Octree logo image (asset ID: `69730cfb8146632737a5c0be`, alt: "Octree Logo")
- Logo text: **"Octree"** (class `logo-text`)
- Logo subtitle: **"Tools to Power UE with AI"** (class `logo-subtitle`)

### Hero Section
- Tagline: **"Stop Alt-Tabbing. Start Creating."** (class `tagline`)
- Hero title: **"Bring the power of AI directly into your Unreal Engine editor"** (class `hero-title`)
- Hero description: paragraph about Octree/Terminal with bold "Terminal" text (class `hero-description`)
- CTA buttons:
  - **"Get it on Fab Marketplace"** (primary)
  - **"Learn more about Terminal"** (secondary)

### Features Section (3 cards)
| Feature | Title | Description |
|---|---|---|
| Lightning Fast | Lightning Fast | Execute complex commands in milliseconds with optimized AI processing |
| AI-Powered | AI-Powered | Smart suggestions and automated workflows powered by advanced AI |
| UE Native | UE Native | Built from the ground up for Unreal Engine developers |

> **Note:** Emoji icons (⚡, 🤖, 🎯) are present but have class `hidden` - feature icons may be using custom Webflow styling or images instead.

### Call-to-Action Section
- Title: **"Ready to Transform Your Workflow?"** (class `cta-title`)
- Description: **"Join other developers already using Octree to supercharge their Unreal Engine projects."** (class `cta-description`)
- Button: **"Get Started Today"**

### Footer
Uses shared **footer** component (see Shared Components section above).

---

## Product Page Content Structure

The Product page (`/product`, Page ID: `69744fe564ed715437863081`) contains:

### Navigation Bar
Uses shared **nav-links** component (see Shared Components section above).

### Footer
Uses shared **footer** component (see Shared Components section above).

---

## Terminal Page Content Structure

The Terminal page (`/terminal`, Page ID: `696c1aa4f756295ba617c6fb`) contains the following sections as of 2026-02-22:

### Background

- Fixed full-screen dark gradient overlay (class `bg-dark-gradient`): `linear-gradient(135deg, #0a0a0f, #1a1a2e)`, z-index: -1

### Navigation Bar (page-header)

Uses shared **nav-links** component (see Shared Components section above).

### Hero Section

Visual order controlled by CSS `order` property:

1. **Hero logo container** (class `hero-logo-container`, position: relative, z-index: 1):
   - Terminal logo image (class `terminal-logo`, 150px wide) — asset: `contentW.trimmed.png` (ID: `6909aad62e207b5dce29be5e`)
   - Logo text wrapper (class `logo-text-wrapper`, flex column):
     - H2: **"Terminal"** (class `logo-title-text`, 4.2rem gradient text)
     - H3: **"Octree"** (class `logo-subtitle-text`, 1.8rem gradient text)
2. **Tagline** (class `terminal-tagline`, order: 1, position: relative, z-index: 1): **"Intelligent Command System for Unreal Engine"**
3. **Hero title** H1 (class `hero-title`, order: 2): **"The Missing Terminal for Unreal Engine."** — gradient text, 3rem
4. **Hero description** (class `hero-description`, order: 3): Long paragraph about Octree Terminal filling the gap for integrated terminal in UE
5. **CTA buttons** (class `cta-buttons`, order: 4):
   - **"Get on Fab"** (class `btn-primary`) → `https://fab.com/s/055b2490cfb5`
   - **"Join Discord"** (class `btn-secondary`) → `https://discord.gg/p5Dgevwr9H`
6. **Hero glow container** (class `hero-glow-container`): Animated gradient glow effect behind hero content — position: absolute, blur(40px), animation: `heroWaveGlow` 8s infinite (powered by site-level `hero_glow_keyframes` script)

### Features Section (3 cards)

Container: class `features-section` (rounded, semi-transparent dark bg: `rgba(15, 15, 25, 0.45)`, 30px border-radius)

| Icon | Title | Description |
|---|---|---|
| Box/package SVG (25x25) | Native Integration | A fully functional terminal window that lives and docks natively inside the Unreal Editor. |
| Table/grid SVG (40x40) | Workflow-First Design | Freely drag, dock, and arrange the terminal pane to complement your layout. |
| Robot SVG (40x40) | AI-Ready Hub | Any AI tool, script, or command line utility that runs in a standard terminal can run inside Octree Terminal. |

Each card: class `feature-card` (flex column, 33.33% width), icon in `feature-icon` (60x60 gradient container), title in H2 `feature-title`, text in `feature-text`.

### Call-to-Action Section

- Container: class `cta-section` (rounded dark bg: `rgba(15, 15, 25, 0.95)`, 30px border-radius)
- Title H2: **"Reclaim Your Focus"** (class `cta-title`, 2.8rem)
- Description: **"Supercharge your pipeline. Get Octree Terminal..."** (class `cta-description`)
- Button: **"Get Started"** (class `btn-primary`) → `https://fab.com/s/055b2490cfb5`

### Footer

Uses shared **footer** component (see Shared Components section above).

### Hidden/Deprecated Elements on Terminal Page

| Element ID | Type | Style | Location | Notes |
|---|---|---|---|---|
| `4179aa3c-...` | Block | `hidden` | Body-level | Empty deprecated block |
| `682a8bbc-...` | Block | `hidden` | page-header | Old legacy nav links (Home, Terminal+active, Examples) |
| `eb5dfcb7-...` | Block | `hidden-block` | logo-container | Empty deprecated block |
| `3f82b0f8-...` | Block | `hidden` | logo-text-wrapper | Placeholder text block |
| `1abc0df6-...` | Block | `hidden` | logo-text-wrapper | Placeholder text block |
| `40604e4e-...` | Image | `hidden` | hero-section | Duplicate terminal logo |
| `a253aa97-...` | Block | `hidden` | hero-section | Extra glow container (accidental double-creation) |
| `2958e6d9-...` | Block | `hidden-block` | feature-icon card 1 | Placeholder |
| `e82abb1d-...` | Block | `hidden-block` | feature-icon card 2 | Placeholder |
| `5f8a8bca-...` | Block | `hidden-block` | feature-icon card 3 | Placeholder |

---

## Agent Page Content Structure

The Agent page (`/agent`, Page ID: `696c1dd79355ef1699dcf9f7`) contains:

### Navigation Bar
Uses shared **nav-links** component (see Shared Components section above).

### Footer
Uses shared **footer** component (see Shared Components section above).

---

## Examples Page Content Structure

The Examples page (`/examples`, Page ID: `6909c78d4cd8b7125f19bbd7`) contains:

### Navigation Bar
Uses shared **nav-links** component (see Shared Components section above).

### Footer
Uses shared **footer** component (see Shared Components section above).

---

## Documentation Pages Content Structure

Documentation pages follow a **separate and independent design system** from Main Pages.

### Key Characteristics

| Aspect | Documentation Pages | Main Pages |
|---|---|---|
| **URL Pattern** | `/ueterminaldocs/*` (e.g., `/ueterminaldocs/installation`, `/ueterminaldocs/faq`) | `/`, `/product`, `/terminal`, `/agent`, `/examples` |
| **Nav-links** | Docs-specific navigation | Shared across all main pages |
| **Footer** | Docs-specific footer | Shared across all main pages |
| **Styling** | Optimized for documentation (sidebar, search, etc.) | Marketing-focused design |

### Documentation Navigation (docs-nav)

Documentation pages have their own navigation structure:

- **Logo** → links to `/`
- **Introduction** → `/ueterminaldocs/introduction`
- **Installation** → `/ueterminaldocs/installation`
- **Getting Started** → `/ueterminaldocs/getting-started`
- **Configuration** → `/ueterminaldocs/configuration`
- **Integrations** → `/ueterminaldocs/integrations`
- **FAQ** → `/ueterminaldocs/faq`
- **Support** → `/ueterminaldocs/support`
- **Back to Main Site** link

> **Note:** Docs nav-links are NOT shared with main pages and have a different design optimized for documentation browsing.

### Documentation Footer (docs-footer)

Documentation pages use a simplified footer:
- **"© 2025 Octree. Documentation"** or similar docs-specific text
- Links to doc sections
- Version information (if applicable)

> **Note:** Docs footer is NOT shared with main pages. Changes to the main page footer do NOT affect docs pages.

### Documentation Layout

Typical documentation page structure:
- **Sidebar** (left): Navigation tree for doc sections
- **Main content area** (center/right): Documentation content
- **Table of contents** (optional, right): In-page navigation

---

## Pages

| Page Name | Page ID | Path | Category | Notes |
|---|---|---|---|---|
| Home | `6901ebf7e76d4e13d1b71f2e` | `/` | Main | Main landing page, has `#cascading-numbers` element |
| Product | `69744fe564ed715437863081` | `/product` | Main | Product details page |
| Agent | `696c1dd79355ef1699dcf9f7` | `/agent` | Main | Agent feature page |
| Terminal | `696c1aa4f756295ba617c6fb` | `/terminal` | Main | Terminal feature page |
| Examples | `6909c78d4cd8b7125f19bbd7` | `/examples` | Main | Examples/showcase page |
| 404 | `6901ec2d9dfd986c174c6617` | `/404` | System | Not found page |
| Password | `6901ec28536ef66b87700896` | `/401` | System | Protected page |

### Documentation Pages

| Page Name | Path | Category | Notes |
|---|---|---|---|
| Introduction | `/ueterminaldocs/introduction` | Documentation | Overview and welcome |
| Installation | `/ueterminaldocs/installation` | Documentation | How to install the plugin |
| Getting Started | `/ueterminaldocs/getting-started` | Documentation | Quick start guide |
| Configuration | `/ueterminaldocs/configuration` | Documentation | Configuration options |
| Integrations | `/ueterminaldocs/integrations` | Documentation | Integration guides |
| FAQ | `/ueterminaldocs/faq` | Documentation | Frequently asked questions |
| Support | `/ueterminaldocs/support` | Documentation | Support and contact info |

---

## Terminology Map

This maps how the user describes things to the Webflow names, so future conversations are clear.

| User Says | Webflow Name / ID | Type |
|---|---|---|
| "waterfall digits" / "waterfall effect" | `cascading_numbers` (Cascading Numbers) | Script |
| "flickering digits" / "the one that flickers" | `fading_flicker_numbers` (Fading Flicker Numbers) | Script |
| "the laser" / "laser animation" | `data_spark_core` + `data_spark_fx` (Data Spark Core + Data Spark FX) | Script pair |
| "product dropdown" | `product_dropdown_nav` + `dropdown_hover_fix` | Script pair |
| "home page" | Page ID `6901ebf7e76d4e13d1b71f2e`, path `/` | Page |
| "terminal page" | Page ID `696c1aa4f756295ba617c6fb`, path `/terminal` | Page |
| "agent page" | Page ID `696c1dd79355ef1699dcf9f7`, path `/agent` | Page |
| "main pages" | Home, Product, Terminal, Agent, Examples | Page Group |
| "documentation pages" | All `/ueterminaldocs/*` paths | Page Group |
| "shared components" | nav-links, page-footer | Components |

---

## Change Log

| Date | Script | Change | Version |
|---|---|---|---|
| 2026-02-26 | (All Main Pages) | Standardized footer text to "© 2025 Octree. All rights reserved." across all main pages per shared component rule | — |
| 2026-02-26 | (docs) | Added Documentation Pages section and Change Isolation Rules to WEBSITE_REQUIREMENTS.md | — |
| 2026-02-22 | (Home page) | Fixed AI Agent dropdown link: updated href from `#` to `/agent` on all 4 instances (desktop nav, mobile nav, duplicates) | — |
| 2026-02-22 | (Terminal page) | Restructured Terminal nav-links: created new nav-links as direct child of page-header (matching Agent page structure), hidden old nav-links that was nested inside logo-container | — |
| 2026-02-22 | (Terminal page) | Added hero-glow-container with animated gradient glow effect behind hero title/description, updated hero-logo-container and terminal-tagline with position:relative + z-index:1 | — |
| 2026-02-22 | (docs) | Added Terminal page content structure section to WEBSITE_REQUIREMENTS.md | — |
| 2026-02-21 | product_dropdown_nav | Added script to restore Product dropdown click-to-navigate (`/product`) and CSS hover-to-show behavior | v1.0.0 |
| 2026-02-21 | dropdown_hover_fix | Added JS hover fix with 300ms grace period so dropdown stays visible while mouse crosses gap to menu | v1.0.0 |
| 2026-02-21 | data_spark_core, data_spark_fx | Removed legacy page-level scripts (v1.0.0) from Home page; site-level v1.0.6 remains | — |
| 2026-02-20 | (docs) | Updated WEBSITE_REQUIREMENTS.md to match current Webflow homepage state: added homepage content structure, script deployment summary | — |
| 2026-02-11 | cascading_numbers | Fixed waterfall digits not reaching bottom of screen (moved canvas to body) | v2.0.1 -> v2.0.4 |
| 2026-02-11 | data_spark_core | RESTORED to original after accidental modification | v1.0.4 -> v1.0.6 (same source) |
| 2026-02-11 | data_fx_core | RESTORED to original after accidental modification | v1.0.4 -> v1.0.6 (same source) |
