# Changelog

All notable changes to the ETS Framework project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-13

### Summary
Complete rewrite and modernization of the CSS framework, achieving 100% W3C HTML validation and Lighthouse accessibility compliance.

### Added
- **app-framework.css**: New main stylesheet with CSS custom properties
- **manifest.json**: PWA manifest for installable web app support
- **robots.txt**: Search engine crawler directives
- **icon.svg**: Framework icon for favicon and PWA
- **PHASE-0-AUDIT.md**: Documentation of initial audit findings
- **PHASE-6-UI-REDESIGN.md**: UI redesign planning notes
- **RESEARCH-HTML-FOUNDATION.md**: HTML best practices research
- **.stylelintrc.json**: CSS linting configuration
- Content Security Policy with instant.page script hash
- Preconnect hints for external resources (instant.page, placehold.co)
- Autocomplete attributes on form inputs (email, password)
- Explicit width/height on images for CLS prevention

### Changed
- **Renamed project** from Simple.css to ETS Framework
- **Moved legacy files** to `legacy/` folder (simple.css, simple-v1.css)
- **Color system**: New accessible colors with AAA contrast ratios (7:1 for code elements)
- **Meta tags**: Updated to HTML5 standard (removed trailing slashes on void elements)
- **Input type**: Changed deprecated `datetime` to `datetime-local`
- **Heading hierarchy**: Restructured to single H1 per page
- **apple-mobile-web-app-capable**: Changed to modern `mobile-web-app-capable`

### Removed
- Trailing slashes on all void elements (`<meta>`, `<link>`, `<img>`, `<input>`, etc.)
- Invalid `aria-disabled` on anchor elements (replaced with span elements)
- Invalid Permissions-Policy meta tag (must be HTTP header)
- Invalid Cross-Origin-Opener-Policy meta tag (must be HTTP header)
- Redundant ARIA roles on semantic elements
- Minified CSS files (simple.min.css, simple-v1.min.css)
- Duplicate package.json file

### Fixed
- **W3C Validation**: All HTML validation errors and warnings resolved
- **Table structure**: Fixed colgroup column counts to match actual columns
- **Contrast ratios**: Fixed all WCAG contrast issues
  - Code elements: 7:1 ratio (AAA)
  - Mark elements: Works in both light and dark modes
  - Text elements: 4.5:1 ratio (AA)
- **Keyboard accessibility**: Made scrollable regions focusable with tabindex
- **Form accessibility**: Proper radio button grouping, autocomplete hints
- **Figure/caption**: Removed redundant caption when figcaption present

### Security
- Content Security Policy protects against XSS attacks
- Referrer policy set to `strict-origin-when-cross-origin`
- Documented server-side headers needed for production:
  - `Strict-Transport-Security` (HSTS)
  - `Cross-Origin-Opener-Policy` (COOP)
  - `Permissions-Policy`

---

## Development History

This section documents the journey from the original Simple.css fork to v1.0.0.

### Phase 0: Initial Audit
- Forked from Simple.css by Kev Quirk
- Identified accessibility gaps and W3C validation issues
- Created audit documentation

### Phase 1-5: Core Development
- Developed new color system with CSS custom properties
- Implemented dark mode with proper contrast
- Built responsive grid and layout system
- Added form styling with accessibility focus

### Phase 6: UI Redesign & Validation
- Complete W3C HTML validation pass
- Lighthouse accessibility audit (100% score achievable)
- Security hardening with CSP
- Performance optimization with preconnect hints

### Key Decisions
1. **Classless approach**: Minimal classes, semantic HTML styling
2. **CSS Custom Properties**: Easy theming and dark mode
3. **Mobile-first**: Responsive design from small screens up
4. **Accessibility-first**: WCAG AA minimum, AAA where practical
5. **Valid HTML**: Strict W3C compliance over convenience

---

## [0.0.0] - Initial Fork

### Origin
- Forked from [Simple.css](https://simplecss.org/) by Kev Quirk
- MIT License maintained
- Original files preserved in `legacy/` folder
