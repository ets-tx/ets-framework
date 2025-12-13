# Changelog

All notable changes to the ETS Framework project are documented in this file.

---

## [1.0.0] - 2025-12-13

### What Is This?

ETS Framework v1.0.0 is a **truly classless CSS framework**. Write semantic HTML, get a styled application. No classes required.

This release establishes a clean foundation built on [Simple.css](https://simplecss.org/) by Kev Quirk, transformed into a production-ready framework with proper accessibility and validation.

---

## What We Changed From Simple.css

### The Big Picture

We took Simple.css and made it:
- **Truly classless** — removed all utility classes except `.visually-hidden` (required for accessibility)
- **Fully validated** — passes W3C HTML validation
- **Accessibility compliant** — WCAG AA contrast ratios, keyboard navigation, screen reader support
- **Production ready** — security headers, performance hints, PWA support

---

### Classes: Before & After

**Simple.css had these classes:**
- `.notice` — callout boxes
- `.button` — make links look like buttons
- `.current` — highlight current nav item

**ETS Framework has ONE class:**
- `.visually-hidden` — hides content visually but keeps it accessible to screen readers (required for skip links, no HTML alternative exists)

**Why remove the others?**
- `.notice` → Use `<aside>` or `<blockquote>` instead (semantic HTML)
- `.button` → If you need a button, use `<button>`. Links should look like links.
- `.current` → Use `[aria-current="page"]` attribute instead (semantic HTML)

---

### HTML Fixes

**Fixed invalid HTML:**
- Removed trailing slashes on void elements (`<meta>`, `<link>`, `<img>`, etc.) — HTML5 doesn't use them
- Changed `checked="checked"` to just `checked` (boolean attributes don't need values)
- Changed `multiple="multiple"` to just `multiple`
- Fixed `http://` links to `https://`
- Removed redundant `for` attributes when label wraps input

**Fixed deprecated elements:**
- Changed `<input type="datetime">` to `<input type="datetime-local">`
- Changed `apple-mobile-web-app-capable` to `mobile-web-app-capable`

**Fixed document structure:**
- Single `<h1>` per page (proper heading hierarchy)
- Removed redundant ARIA roles on semantic elements
- Fixed table column counts to match actual data

---

### Accessibility Improvements

**Contrast ratios (WCAG AA/AAA):**
- Regular text: 4.5:1 ratio (AA compliant)
- Code elements: 7:1 ratio (AAA compliant)
- Works in both light and dark modes

**Keyboard navigation:**
- All interactive elements are focusable
- Visible focus indicators (3px accent color outline)
- Skip links for main content and navigation
- Scrollable regions have `tabindex="0"`

**Screen readers:**
- ARIA live regions for dynamic announcements
- Proper form labeling
- Radio/checkbox groups work correctly

---

### Security Additions

**Content Security Policy:**
- Protects against XSS attacks
- Whitelist for trusted scripts (instant.page)

**Other security:**
- Referrer policy: `strict-origin-when-cross-origin`
- Documented server headers needed for production (HSTS, COOP, Permissions-Policy)

---

### Performance Additions

- Preconnect hints for external resources
- DNS prefetch for faster connections
- Explicit image dimensions prevent layout shift
- instant.page for near-instant page loads

---

### New Files

| File | Purpose |
|------|---------|
| `app-framework.css` | The main (and only) stylesheet you need |
| `manifest.json` | PWA manifest for installable web apps |
| `robots.txt` | Search engine directives |
| `icon.svg` | Framework icon |
| `legacy/` | Original Simple.css files (for reference) |

---

### What We Kept

- **CSS Custom Properties** — Easy theming via `--accent`, `--bg`, `--text`, etc.
- **Automatic dark mode** — Respects `prefers-color-scheme`
- **Responsive design** — Mobile-first, works on any screen size
- **Print styles** — Pages print cleanly
- **MIT License** — Same open license as Simple.css

---

## The Philosophy

**Classless means:**
1. You write semantic HTML (`<header>`, `<nav>`, `<main>`, `<article>`, etc.)
2. The CSS styles those elements automatically
3. No need to memorize class names or check documentation

**The only exception:**
`.visually-hidden` exists because there's no HTML element that means "hide this visually but let screen readers see it." It's an accessibility requirement, not a styling choice.

---

## Credits

- **Original**: [Simple.css](https://simplecss.org/) by Kev Quirk (MIT License)
- **This version**: ETS Framework by ETS-TX (Bryan A Counts)
- **Demo structure**: Based on [HTML5-test-page](https://github.com/cbracco/html5-test-page) by cbracco

---

## What's Next

This v1.0.0 release is the **clean foundation**. Future versions may add:
- High contrast mode for challenging environments
- Additional CSS custom properties for theming
- Video-optimized styling for LMS applications

But the core philosophy stays the same: **write semantic HTML, get a styled application.**
