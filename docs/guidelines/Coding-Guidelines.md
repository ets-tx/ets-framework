# ETS Framework Coding Guidelines
## Complete Reference for All Coding Standards & Principles

**Last Updated:** 2025-01-14 12:14 am
**Status:** ✅ Expert Approved  
**Purpose:** Single source of truth for all coding rules, principles, and standards

---

## 📋 TABLE OF CONTENTS

1. [Core Philosophy](#1-core-philosophy-classless-architecture)
2. [CSS Guidelines](#2-css-guidelines)
3. [HTML Guidelines](#3-html-guidelines)
4. [JavaScript Guidelines](#4-javascript-guidelines)
5. [Accessibility Standards](#5-accessibility-standards-wcag-21-aa)
6. [Performance Standards](#6-performance-standards)
7. [File Size Budgets](#7-file-size-budgets)
8. [Design System](#8-design-system-css-variables--tokens)
9. [Browser Support](#9-browser-support)
10. [Code Organization](#10-code-organization)
11. [Documentation Standards](#11-documentation-standards)

---

## 1. CORE PHILOSOPHY: Classless Architecture ⭐

### Principle
- Write semantic HTML (`<header>`, `<nav>`, `<main>`, `<article>`, etc.)
- CSS styles elements automatically
- **Component classes for complex UI patterns** (`.btn`, `.card`, `.badge`, `.sidebar-toggle`, `.user-popup`, etc.)
- **NO utility classes** (no `.text-center`, `.mt-4`, etc.)
- Semantic elements get styled automatically; complex components use classes

### Component Classes vs Utility Classes

**✅ Component Classes (USE THESE):**
- Complex UI patterns requiring specific styling/behavior
- Examples: `.btn`, `.card`, `.badge`, `.sidebar-toggle`, `.user-popup`, `.theme-popup`, `.nav-section`
- Multiple properties work together for a cohesive component

**❌ Utility Classes (DO NOT USE):**
- Single-purpose helpers (`.text-center`, `.mt-4`, `.p-2`, etc.)
- One property per class
- NOT part of ETS Framework architecture

### Verdict
✅ Framework uses **component classes** (not utility classes)  
✅ All new classes must be component classes, not utility classes

---

## 2. CSS GUIDELINES

### 2.1 CSS Organization
**Structure:** Base → Media → Interactive → Utilities

- **Base:** Resets, typography, basic element styles
- **Media:** Images, video, audio styling
- **Interactive:** Forms, buttons, navigation, complex components
- **Utilities:** Helper classes (`.visually-hidden`, etc.)

**Grouping:** Logical property grouping by rendering pipeline

### 2.2 CSS Variables (Design Tokens)
**Principle:** **ALL values use CSS custom properties**

- No hardcoded pixel values (except in variable definitions)
- Document any new CSS variables
- Use existing variables when possible

**Spacing System:**
- 4px base unit
- Variables: `--space-1` through `--space-16`
- No arbitrary spacing values

**Border Radius:**
- Variables: `--radius-xs`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`

**Layout Tokens:**
- `--touch-target-size: 42px` (legal minimum touch target)
- `--app-header-height: 56px` (fixed header height)
- `--sidebar-transition-duration: 300ms`
- `--section-transition-duration: 250ms`
- `--sidebar-transition-timing: cubic-bezier(0.33, 1, 0.68, 1)`
- `--section-transition-timing: cubic-bezier(0.33, 1, 0.68, 1)`

### 2.3 Performance
- GPU-accelerated animations (`transform`, `opacity`)
- Respect `prefers-reduced-motion: reduce`
- Use `will-change` hints sparingly
- No layout thrashing
- 60fps maintained

### 2.4 Code Style
- Follow existing code style
- Verbose commenting with rationale
- Consistent naming (BEM-like)
- Clear section comments

---

## 3. HTML GUIDELINES

### 3.1 Semantic HTML
- Semantic structure (`<header>`, `<nav>`, `<main>`, `<article>`, etc.)
- Proper heading hierarchy (single `<h1>` per page, no skipped levels)
- ARIA where needed (not redundant on semantic elements)
- No deprecated elements

### 3.2 Accessibility
- Use `div[role="group"]` for navigation sections (NOT `<h6>`)
- Proper form labeling
- Descriptive alt text on images
- Video/audio accessibility considerations

---

## 4. JAVASCRIPT GUIDELINES

### 4.1 File Size
- JavaScript: **≤5KB** (minified)
- Current: ~3KB, budget remaining: +2KB

### 4.2 Code Quality
- Use `localStorage` wrapper for robustness (handles errors gracefully)
- Debounce resize events
- Handle `prefers-reduced-motion` in JavaScript
- Screen reader announcements via `aria-live` regions

### 4.3 Performance
- Debounce event handlers when appropriate
- Use `requestAnimationFrame` for animations
- Minimize DOM queries (cache selectors)

---

## 5. ACCESSIBILITY STANDARDS (WCAG 2.1 AA+)

### 5.1 Keyboard Navigation
- Skip navigation links (2: main, navigation)
- Focus-visible styles (3px solid accent, 2px offset)
- All interactive elements keyboard accessible
- Logical tab order

### 5.2 Screen Reader Support
- ARIA landmarks (banner, navigation, main, contentinfo)
- ARIA labels on navigation
- ARIA live regions (status, alert)
- `.visually-hidden` utility class for screen reader-only content

### 5.3 Touch Targets
- **42px minimum** (legal minimum, works for both mobile and desktop)
- Can use `::before` pseudo-element to expand tap area to 44px on mobile if needed
- 42px is acceptable and user-preferred standard

### 5.4 Contrast Ratios
- Regular text: 4.5:1 ratio (WCAG AA minimum)
- Code elements: 7:1 ratio (WCAG AAA)

### 5.5 Motion
- Respect `prefers-reduced-motion: reduce`
- Support `prefers-color-scheme` (automatic dark mode)

---

## 6. PERFORMANCE STANDARDS

### 6.1 Animation Performance
- GPU-accelerated animations only (`transform`, `opacity`)
- No layout properties animated (no `width`, `height`, `margin` animations)
- Use `will-change` hints sparingly
- 60fps maintained

### 6.2 Optimization
- No layout thrashing
- Minimize reflows
- Use `requestAnimationFrame` for animations

---

## 7. FILE SIZE BUDGETS

### CSS
- **Target:** ≤20KB (minified)
- **Current:** 15KB
- **Budget Remaining:** +5KB

### JavaScript
- **Target:** ≤5KB (minified)
- **Current:** ~3KB
- **Budget Remaining:** +2KB

### Rules
- Be ruthless about additions
- Remove code before adding new code when possible
- Every addition must provide clear value

---

## 8. DESIGN SYSTEM: CSS Variables & Tokens

### 8.1 Color Tokens
- `--accent` (theme accent color)
- `--bg` (background color)
- `--text` (text color)
- Theme-specific variations (light/dark mode)

### 8.2 Spacing Tokens
- `--space-1` through `--space-16` (4px base unit)
- No arbitrary spacing values

### 8.3 Typography Tokens
- Font family, sizes, line heights
- System fonts only (no web fonts)

### 8.4 Layout Tokens
- `--touch-target-size: 42px`
- `--app-header-height: 56px`
- `--sidebar-transition-duration: 300ms`
- `--section-transition-duration: 250ms`

### 8.5 Border Radius Tokens
- `--radius-xs`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`

---

## 9. BROWSER SUPPORT

### Baseline
- Safari 17.4+ (iOS 17.4+)
- Chrome 76+
- Firefox 75+
- Edge 79+

### Target
- **95%+ global coverage**
- Use features with 95%+ support
- Progressive enhancement for newer features

---

## 10. CODE ORGANIZATION

### 10.1 File Structure
```
/
├── app-framework.css    # Main stylesheet (≤20KB)
├── app-framework.js     # Main JavaScript (≤5KB)
├── index.html          # Demo page
└── docs/               # Documentation
```

### 10.2 CSS Organization
- Base → Media → Interactive → Utilities
- Group related styles together
- Clear section comments
- Logical property grouping

### 10.3 Naming Conventions
- BEM-like naming for component classes
- Examples: `.user-popup-trigger`, `.nav-section-toggle`, `.sidebar-collapse-btn`
- Consistent with existing classes

---

## 11. DOCUMENTATION STANDARDS

### 11.1 Code Comments
- Verbose commenting with rationale
- Explain WHY, not just WHAT
- Document any new CSS variables
- Section headers for major blocks

### 11.2 Documentation Files
- README.md (project overview)
- CONTRIBUTING.md (quick start guide)
- CHANGELOG.md (version history)
- CODING-GUIDELINES.md (this file - complete reference)

---

## ✅ VERIFICATION CHECKLIST

Before submitting code, verify:

- [ ] Uses CSS variables (no hardcoded values except in variable definitions)
- [ ] Uses component classes (not utility classes)
- [ ] Maintains CSS organization (Base → Media → Interactive → Utilities)
- [ ] WCAG 2.1 AA+ compliant (keyboard nav, screen readers, contrast)
- [ ] Touch targets ≥42px
- [ ] GPU-accelerated animations only (`transform`, `opacity`)
- [ ] Respects `prefers-reduced-motion`
- [ ] Semantic HTML structure
- [ ] Within file size budgets (CSS ≤20KB, JS ≤5KB)
- [ ] Verbose comments with rationale
- [ ] Documents any new CSS variables
- [ ] Browser support: 95%+ coverage

---

## 📚 REFERENCE DOCUMENTS

- **PRINCIPLES-VALIDATION.md** (archived) - Detailed expert validation
- **PRINCIPLES-ALIGNMENT-UPDATES.md** (archived) - Design token updates
- **PHASE-0-AUDIT.md** (archived) - Production readiness audit
- **CONTRIBUTING.md** - Quick contributing guide

---

**Status:** ✅ Expert Approved  
**Last Review:** 2026-01-14  
**Next Review:** As needed when principles evolve
