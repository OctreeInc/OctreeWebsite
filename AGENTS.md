# VS Code → Webflow Workflow Plan

Always use the Chrome Devtools MCP tools to verify your work.

## Context

We want to do most frontend development in VS Code (HTML, CSS, JS for marketing pages, content sites, and a component library with scroll animations), then push/copy the finished code into Webflow via the MCP server. The goal is to keep the developer-friendly VS Code workflow while leveraging Webflow for hosting, CMS, and visual editing.

## Key Constraint

Webflow does **not** accept raw HTML. Everything must be translated into Webflow's structured element/style model. This translation is where Claude Code + the Webflow MCP tools come in.

---

## Recommended Workflow

### 1. Local Development in VS Code (no changes here)

Write your pages as normal HTML/CSS/JS files. Organize by page:
```
src/
  pages/
    home.html
    about.html
    blog.html
  css/
    styles.css
    animations.css
  js/
    animations.js
    scroll-effects.js
  components/
    header.html
    footer.html
    hero.html
```

### 2. CSS → Webflow Styles Translation

Claude Code reads your CSS files and translates them into Webflow named styles via `style_tool`:

- Each CSS class → a Webflow named style
- Shorthand properties auto-expanded to longhand (`margin` → `margin-top`, `margin-right`, etc.)
- Media queries → Webflow breakpoints (`main`, `medium`, `small`, `tiny`, `large`, `xl`, `xxl`)
- CSS variables → Webflow design variables via `variable_tool`
- Combo classes (e.g., `.btn.btn-primary`) → Webflow combo classes via `parent_style_name`

### 3. HTML → Webflow Elements Translation

Claude Code reads your HTML and builds the element tree via `element_builder`:

| HTML | Webflow Element Type |
|------|---------------------|
| `<section>` | `Section` |
| `<div>` | `DivBlock` |
| `<div class="container">` | `Container` |
| `<h1>`–`<h6>` | `Heading` (with `set_heading_level`) |
| `<p>` | `Paragraph` |
| `<span>`, `<code>`, etc. | `DOM` (with `set_dom_config`) |
| `<a>` | `TextLink` or `LinkBlock` |
| `<button>` | `Button` |
| `<img>` | `Image` (upload asset first via `asset_tool`) |

- Max 3 levels deep per `element_builder` call, but we call it repeatedly to build deeper trees
- Classes on HTML elements → `set_style` referencing the named styles from step 2
- Custom `data-*` attributes → `add_or_update_attribute`
- Text content → `set_text`
- Reusable blocks (header, footer, etc.) → build once, then `transform_element_to_component` and reuse via `insert_component_instance`

### 4. JavaScript — The 2000-Char Workaround

Since animation/scroll JS exceeds the 2000-char inline limit, use a **script loader pattern**:

**Approach: GitHub Pages hosting + inline loader**

1. Keep animation/scroll JS in a GitHub repo (can be the same repo as your source code)
2. Enable GitHub Pages on the repo (serves files at `https://<user>.github.io/<repo>/`)
3. Register a small inline loader script (well under 2000 chars) via `data_scripts_tool`:
   ```js
   (function(){
     var scripts = [
       'https://<user>.github.io/<repo>/js/animations.js',
       'https://<user>.github.io/<repo>/js/scroll-effects.js'
     ];
     scripts.forEach(function(src){
       var s = document.createElement('script');
       s.src = src;
       s.defer = true;
       document.body.appendChild(s);
     });
   })();
   ```
4. Apply the loader to specific pages via `upsert_page_script` or site-wide
5. To update animations: push to GitHub → GitHub Pages auto-deploys → Webflow site picks up changes without any MCP calls

**Fallback: CDN-hosted libraries + small inline init**
- Load GSAP/ScrollTrigger/etc. from CDN (e.g., `https://cdnjs.cloudflare.com/ajax/libs/gsap/...`)
- Keep init code small enough for a separate inline script (<2000 chars)
- Larger custom logic served from GitHub Pages

### 5. CMS Content

For blog posts, portfolio items, etc.:
- Define collection schemas via `data_cms_tool > create_collection`
- Push content items programmatically from local markdown/JSON files
- Publish items via `publish_collection_items`

### 6. Images & Assets

- Upload images via `asset_tool` before building elements
- Reference uploaded asset IDs when creating `Image` elements

---

## Practical Session Workflow

A typical session would look like:

1. **Create/update styles first** — read CSS, create Webflow styles
2. **Create/update design variables** — colors, fonts, sizes
3. **Switch to target page** (or create it)
4. **Build element tree** — translate HTML structure, apply styles, set text
5. **Convert reusable sections to components**
6. **Register JS loader script** — point to externally hosted animation code
7. **Push CMS content** if applicable
8. **Take snapshots** to verify visually via `element_snapshot_tool`

---

## What Works Well

- Marketing pages, landing pages → excellent fit
- Styled component systems → maps directly to Webflow styles + components
- CMS-driven content → strong API support
- Design variables (colors, fonts) → direct mapping
- Responsive design → Webflow breakpoint system

## Limitations to Be Aware Of

- **No raw HTML paste** — every element must be constructed via the API
- **3-level depth limit per call** — deep nesting requires multiple sequential calls
- **Inline JS capped at 2000 chars** — must host larger scripts externally
- **No Webflow Interactions API** — native scroll/hover animations must be set up manually in Webflow Designer (the MCP doesn't expose the Interactions panel)
- **CSS shorthand not supported** — all properties must be longhand
- **Style names must be unique** — can't have duplicate class names
- **No "diff/sync"** — each push is constructive; there's no "update only what changed" mechanism yet

## Verification

- Use `element_snapshot_tool` after building sections to visually verify
- Use `element_tool > get_all_elements` to audit the page structure
- Preview in Webflow Designer (requires Designer to be open and connected)
- Publish and check the live site

---

## First Session Checklist

Since you have an existing Webflow site, the first time we do this:

1. **Get your site ID** — use `data_sites_tool` to list sites and identify yours
2. **Audit existing styles/components** — read what's already in Webflow to avoid conflicts
3. **Set up GitHub Pages** for your JS files (if not already)
4. **Pick one page to pilot** — translate a single page from VS Code → Webflow to validate the workflow before scaling

## Files Involved

- Your local `src/` HTML/CSS/JS files (read by Claude Code)
- Webflow site via MCP tools (written to by Claude Code)
- GitHub Pages repo for animation/scroll JS files
