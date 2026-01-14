# PHASE 6: UI REDESIGN PLAN
## ETS Framework - Visual Enhancement & Polish

**Last Updated:** 2025-01-14 12:30 am
**Status:** 📋 Planning
**Purpose:** Future project plan for visual enhancement and polish (focus rings, buttons, vertical space, color system, typography)
**Branch:** `6-ui-redesign` (to be created)
**Prerequisites:** Phases 1-5 complete

---

## GOALS

Transform the functional foundation into a polished, modern app interface while maintaining:
- WCAG 2.1 AA+ compliance
- <20KB file size
- 95%+ browser support
- Mobile-first approach
- Classless architecture

---

## FOCUS ENHANCEMENTS

### Rounded Focus Rings (box-shadow method)

**Current State:**
- Standard `outline` property (rectangular)
- Works but doesn't match `border-radius: 5px` on elements
- Functional but not polished

**Planned Enhancement:**
- Use `box-shadow: 0 0 0 3px var(--accent)` for rounded focus rings
- Matches element `border-radius` perfectly
- More modern, app-like appearance

**Elements to Update:**
1. `button`, `.button` - Already have border-radius
2. `input`, `textarea`, `select` - Already have border-radius
3. `summary` - Currently using outline, update to box-shadow
4. `a` in navigation - Update for consistency
5. Form controls - Unified focus appearance

**Implementation:**
```css
/* Replace outline with box-shadow for rounded focus */
button:focus-visible,
.button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible,
summary:focus-visible {
  outline: none; /* Remove default */
  box-shadow: 0 0 0 3px var(--accent); /* Rounded ring */
  border-radius: var(--standard-border-radius); /* Match element */
}
```

**Accessibility Notes:**
- Must maintain 3px thickness (WCAG 2.4.7)
- Must maintain 2:1 contrast ratio with background
- Must use `!important` if specificity issues arise
- Keep `overflow: visible` on parents to prevent clipping
- Test with keyboard navigation thoroughly

---

## BUTTON ENHANCEMENTS

### Touch Target Optimization (32px minimum on desktop)

**User Request:**
> "Modern patterns are starting to see buttons as small as 32px on desktop to have an app-like feeling on all devices. Using :before and :after tap areas."

**Current State:**
- Touch targets optimized for mobile (48px+)
- Desktop buttons may be smaller
- No pseudo-element tap areas

**Planned Enhancement:**
- Minimum 32px visual height on desktop
- Use `::before` pseudo-element to expand tap area to 44px
- Maintains sleek visual while meeting usability
- App-like condensed appearance

**Implementation Strategy:**
```css
button,
.button {
  min-height: 32px; /* Visual height */
  position: relative;
  padding: 0.4rem 0.9rem; /* Reduced vertical */
}

button::before,
.button::before {
  content: '';
  position: absolute;
  top: -6px;
  right: -6px;
  bottom: -6px;
  left: -6px;
  /* Invisible tap area expansion */
}

@media (max-width: 720px) {
  button,
  .button {
    min-height: 44px; /* Mobile standard */
  }
}
```

---

## VERTICAL SPACE REDUCTION

**User Request:**
> "Reduce vertical space and scroll without hurting experience for older users or disabled users."

**Strategies:**
1. **Tighter line-height** - Reduce from 1.5 to 1.4 for UI text
2. **Reduced margins** - Smaller spacing between sections
3. **Condensed headings** - Less top margin on h2-h6
4. **Compact forms** - Reduced padding on inputs
5. **Smart white space** - More breathing room around important content

**Must Preserve:**
- Minimum 1.5 line-height for body text (WCAG readability)
- Minimum 44px touch targets on mobile
- Minimum 4.5:1 contrast ratios
- Clear visual hierarchy

---

## COLOR SYSTEM ENHANCEMENTS

### oklch Color Space Migration

**Deferred from Phase 4:**
- Convert all colors to `oklch()` with `@supports` fallbacks
- Use oklch.com converter for accuracy
- Ensures perceptually uniform colors across modes

### High Contrast Mode

**User Request:**
> "Light, dark, and high contrast mode. This is critical for video-based course, taken late at night, by older individuals, and in all conditions."

**Three Modes:**
1. **Light Mode** - Default
2. **Dark Mode** - `@media (prefers-color-scheme: dark)`
3. **High Contrast** - `@media (prefers-contrast: more)`

---

## ANIMATION & TRANSITIONS

### Decorative Animations (WCAG-compliant)

**User Request:**
> "Animations and game-like transitions without sacrificing speed."

**Planned:**
- Subtle micro-interactions (hover, focus, active states)
- `transform` instead of layout properties (GPU-accelerated)
- Respect `prefers-reduced-motion: reduce`
- Use `will-change` hints sparingly

**Safe Animation Properties:**
- `transform` - GPU-accelerated
- `opacity` - GPU-accelerated
- `filter` (with caution) - Expensive
- `background-color` - OK for subtle effects

---

## TYPOGRAPHY ENHANCEMENTS

### Fluid Font Sizing System

**From earlier planning:**
- Use `clamp()` for fluid scaling across breakpoints
- Minimum 12px (11px if ALL CAPS)
- Base size: 14-15px (not 16px - too large for app)
- Maximum scale controlled by viewport
- Kerning optimizations (`font-kerning: normal`)
- Optical sizing (`font-optical-sizing: auto`)

**Global Scale Variable:**
```css
:root {
  --scale-factor: 1; /* Allow user scaling */
}

/* Can be adjusted by user preference later */
:root[data-scale="large"] {
  --scale-factor: 1.2;
}
```

---

## Z-INDEX SYSTEM

### 3D Positioning Strategy

**Deferred to Phase 6:**
- Implement layered z-index scale
- Focus rings: z-index 10
- Dropdowns: z-index 20
- Modals: z-index 30
- Tooltips: z-index 40
- Skip links: z-index 100

---

## ASPECT RATIO SYSTEM

### Failproof Video & Image Ratios

**Already planned:**
- `aspect-ratio` with explicit defaults (16/9, 1/1)
- `object-fit: cover` for responsive sizing
- No JavaScript required
- Works for 95% of users

---

## DESIGN PHILOSOPHY

**Shopify Horizon Principles:**
- Functional over pixel-perfect
- Progressive enhancement
- Web-native
- Lean and fast

**ETS Framework Additions:**
- App-like condensed UI
- Video-first design language
- Challenging environment optimizations
- Blue-collar demographic focus

---

## FILE SIZE TARGET

- **Current:** 15KB
- **Phase 6 Target:** <20KB (budget: +5KB)
- **Must be ruthless** about additions

---

## IMPLEMENTATION ORDER

1. **Focus system** - Rounded rings with box-shadow
2. **Button sizing** - 32px desktop, 44px mobile, pseudo-element tap areas
3. **Typography** - Fluid sizing with clamp(), global scale
4. **Vertical spacing** - Tighter margins, condensed UI
5. **Color system** - oklch migration, high contrast mode
6. **Z-index** - Layered stacking system
7. **Animations** - Micro-interactions, GPU-accelerated
8. **Final polish** - Test, refine, optimize

---

## ACCEPTANCE CRITERIA

- [ ] All focus rings match element border-radius
- [ ] Buttons: 32px min desktop, 44px min mobile
- [ ] Touch targets: 44px actual (visual + pseudo-element)
- [ ] Typography: Fluid scaling, no text below 12px (11px if CAPS)
- [ ] Vertical space: 20% reduction without hurting readability
- [ ] Colors: oklch() with fallbacks, three modes working
- [ ] Z-index: No stacking context issues
- [ ] Animations: Respect prefers-reduced-motion
- [ ] File size: Still <20KB
- [ ] WCAG 2.1 AA: Still 100% compliant
- [ ] Lighthouse: Performance 95+, Accessibility 100

---

## NOTES FROM USER

> "I actually think modern patterns are starting to see buttons as small as 32px on desktop to have a app like feeling on all devices. I think they are using :before and :after tap areas, etc. We need to research how we get a super sleek app like visual appearance while meeting usability best-practices. We need to reduce vertical space and scroll without hurting the experience for older users or disabled users."

> "The dark modes and high contrast are critical for this because it is a video based course, taken late at night, by older individuals, and in all conditions. We almost need a light, dark, and high contrast mode."

---

## DEFERRED FROM EARLIER PHASES

- Rounded focus rings (user confirmed: add to Phase 6)
- Button touch target pseudo-elements
- Vertical space reduction
- High contrast mode
- Typography fluid system implementation
- Global scale variable

---

**This phase is about POLISH, not function. Foundation first, beauty second.**





