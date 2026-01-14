# Modern HTML Foundation Research
## For ETS Framework - Video-Heavy LMS/Admin Apps

### Research Date: December 2025
### Target: Blue-collar workers, mobile-first, video-heavy, challenging environments

---

## 1. PERFORMANCE OPTIMIZATION

### Resource Hints (Priority Order)
```html
<!-- DNS resolution for external resources -->
<link rel="dns-prefetch" href="//cdn.example.com">

<!-- Early connection for critical resources -->
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>

<!-- Preload critical resources -->
<link rel="preload" href="app-framework.css" as="style">
<link rel="preload" href="logo.svg" as="image">

<!-- Prefetch next-page resources (low priority) -->
<link rel="prefetch" href="/next-lesson.html">
```

**For Video Apps:**
- DON'T preload videos (waste bandwidth on mobile)
- DO preload poster images
- DO preload first-frame of critical videos only

### Font Loading
```html
<!-- System fonts preferred (no web fonts = faster) -->
<!-- If custom fonts needed: -->
<link rel="preload" href="fonts/custom.woff2" as="font" type="font/woff2" crossorigin>
```

**Decision:** Stick with system fonts (faster, our plan already does this)

---

## 2. SEO & METADATA

### Essential Meta Tags
```html
<meta name="description" content="150-160 characters, include target keywords">
<meta name="keywords" content="training, lms, safety, courses"> <!-- Low value, optional -->
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://example.com/current-page">
```

### Open Graph (Facebook, LinkedIn, Slack previews)
```html
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="https://example.com/og-image.jpg">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Site Name">

<!-- Video-specific -->
<meta property="og:video" content="https://example.com/video.mp4">
<meta property="og:video:type" content="video/mp4">
<meta property="og:video:width" content="1280">
<meta property="og:video:height" content="720">
```

### Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Description">
<meta name="twitter:image" content="https://example.com/twitter-image.jpg">
```

### Structured Data (JSON-LD)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Safety Training Course",
  "description": "OSHA compliance training",
  "provider": {
    "@type": "Organization",
    "name": "Company Name"
  }
}
</script>
```

---

## 3. ACCESSIBILITY (EXPANDED - COMPLETE)

### Skip Navigation (WCAG 2.4.1 Required)
```html
<!-- Multiple skip links for complex apps -->
<a href="#main" class="visually-hidden">Skip to main content</a>
<a href="#nav" class="visually-hidden">Skip to navigation</a>
<a href="#search" class="visually-hidden">Skip to search</a>
```

**CSS for .visually-hidden:**
```css
.visually-hidden {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.visually-hidden:focus {
  position: static;
  width: auto;
  height: auto;
}
```

### Screen Reader Announcements (ARIA Live Regions)

**Status Messages (polite):**
```html
<div role="status" aria-live="polite" aria-atomic="true" class="visually-hidden">
  <!-- JS updates this for form validation, loading states -->
</div>
```

**Alerts (assertive):**
```html
<div role="alert" aria-live="assertive" aria-atomic="true" class="visually-hidden">
  <!-- JS updates for errors, critical notifications -->
</div>
```

**Progress/Loading:**
```html
<div role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" aria-label="Video loading">
  45% complete
</div>
```

### ARIA Landmarks (Comprehensive)
```html
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <!-- Primary nav -->
  </nav>
</header>

<nav role="navigation" aria-label="Breadcrumb">
  <!-- Breadcrumbs -->
</nav>

<main role="main" id="main">
  <article role="article">
    <!-- Content -->
  </article>

  <aside role="complementary" aria-label="Related content">
    <!-- Sidebar -->
  </aside>
</main>

<footer role="contentinfo">
  <!-- Footer -->
</footer>

<search role="search">
  <form role="search">
    <!-- Search form -->
  </form>
</search>
```

### Form Accessibility
```html
<form aria-label="Login form">
  <div role="group" aria-labelledby="login-heading">
    <h2 id="login-heading">Login</h2>

    <label for="username">Username</label>
    <input
      type="text"
      id="username"
      name="username"
      aria-required="true"
      aria-describedby="username-hint"
      aria-invalid="false"
    >
    <span id="username-hint" class="hint">Enter your username</span>
    <span id="username-error" role="alert" class="error"></span>
  </div>
</form>
```

### Video Accessibility
```html
<figure>
  <video
    controls
    aria-label="Safety training video: Proper lifting techniques"
    aria-describedby="video-description"
  >
    <source src="video.mp4" type="video/mp4">
    <track src="captions-en.vtt" kind="captions" srclang="en" label="English" default>
    <track src="descriptions-en.vtt" kind="descriptions" srclang="en" label="Audio descriptions">
    <track src="chapters.vtt" kind="chapters" srclang="en" label="Chapters">
  </video>
  <figcaption id="video-description">
    This video demonstrates proper lifting techniques to prevent workplace injury.
  </figcaption>
</figure>
```

### Language & Direction
```html
<html lang="en" dir="ltr">

<!-- Mixed language content -->
<p>The Spanish word for hello is <span lang="es">hola</span>.</p>

<!-- Document language changes -->
<article lang="es">
  <h2>Título en español</h2>
</article>
```

---

## 3.5 MICRODATA & STRUCTURED DATA (COMPLETE)

### Schema.org - Course (LMS Use Case)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "OSHA Safety Training",
  "description": "Comprehensive workplace safety training course",
  "provider": {
    "@type": "Organization",
    "name": "ETS Training",
    "url": "https://example.com"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online",
    "courseWorkload": "PT2H"
  },
  "video": {
    "@type": "VideoObject",
    "name": "Safety Training Module 1",
    "description": "Introduction to workplace safety",
    "thumbnailUrl": "https://example.com/thumb.jpg",
    "uploadDate": "2025-01-01",
    "duration": "PT30M",
    "contentUrl": "https://example.com/video.mp4"
  }
}
</script>
```

### Schema.org - Organization
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ETS Training",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": [
    "https://facebook.com/example",
    "https://twitter.com/example",
    "https://linkedin.com/company/example"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-555-5555",
    "contactType": "customer service"
  }
}
</script>
```

### Schema.org - VideoObject (for each video page)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Proper Lifting Techniques",
  "description": "Learn how to lift safely in the workplace",
  "thumbnailUrl": "https://example.com/thumbnails/lifting.jpg",
  "uploadDate": "2025-01-15T08:00:00+00:00",
  "duration": "PT15M30S",
  "contentUrl": "https://example.com/videos/lifting.mp4",
  "embedUrl": "https://example.com/embed/lifting",
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": "https://schema.org/WatchAction",
    "userInteractionCount": 1234
  },
  "transcript": "https://example.com/transcripts/lifting.txt"
}
</script>
```

### Schema.org - BreadcrumbList
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://example.com"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "Courses",
    "item": "https://example.com/courses"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "Safety Training",
    "item": "https://example.com/courses/safety"
  }]
}
</script>
```

### Microdata (Alternative to JSON-LD)
```html
<article itemscope itemtype="https://schema.org/Course">
  <h1 itemprop="name">OSHA Safety Training</h1>
  <p itemprop="description">Comprehensive workplace safety training</p>
  <div itemprop="provider" itemscope itemtype="https://schema.org/Organization">
    <span itemprop="name">ETS Training</span>
  </div>
  <meta itemprop="courseMode" content="online">
  <meta itemprop="educationalLevel" content="Beginner">
</article>
```

**Decision:** Use JSON-LD (easier to maintain, Google prefers it)

---

## 3.6 SEO OPTIMIZATION (COMPLETE)

### Essential Meta Tags (Expanded)
```html
<!-- Basic SEO -->
<title>Primary Keyword | Secondary Keyword | Brand Name</title>
<meta name="description" content="155-160 characters with target keywords and call to action">
<meta name="keywords" content="keyword1, keyword2, keyword3"> <!-- Optional, low value -->
<meta name="author" content="ETS Training">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<link rel="canonical" href="https://example.com/current-page">

<!-- Alternate languages -->
<link rel="alternate" hreflang="en" href="https://example.com/page">
<link rel="alternate" hreflang="es" href="https://example.com/es/page">
<link rel="alternate" hreflang="x-default" href="https://example.com/page">

<!-- Pagination -->
<link rel="prev" href="https://example.com/page/1">
<link rel="next" href="https://example.com/page/3">

<!-- Mobile alternate -->
<link rel="alternate" media="only screen and (max-width: 640px)" href="https://m.example.com/page">
```

### Open Graph (Complete)
```html
<!-- Basic -->
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="https://example.com/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Image description">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="website">
<meta property="og:site_name" content="ETS Training">
<meta property="og:locale" content="en_US">

<!-- Video-specific -->
<meta property="og:type" content="video.other">
<meta property="og:video" content="https://example.com/video.mp4">
<meta property="og:video:secure_url" content="https://example.com/video.mp4">
<meta property="og:video:type" content="video/mp4">
<meta property="og:video:width" content="1280">
<meta property="og:video:height" content="720">
<meta property="og:video:duration" content="900">

<!-- Article-specific (blog/documentation) -->
<meta property="article:published_time" content="2025-01-15T08:00:00+00:00">
<meta property="article:modified_time" content="2025-01-20T10:30:00+00:00">
<meta property="article:author" content="Author Name">
<meta property="article:section" content="Safety Training">
<meta property="article:tag" content="OSHA">
<meta property="article:tag" content="Workplace Safety">
```

### Twitter Cards (Complete)
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@username">
<meta name="twitter:creator" content="@username">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Description">
<meta name="twitter:image" content="https://example.com/twitter-image.jpg">
<meta name="twitter:image:alt" content="Image description">

<!-- Video player card -->
<meta name="twitter:card" content="player">
<meta name="twitter:player" content="https://example.com/embed/video">
<meta name="twitter:player:width" content="1280">
<meta name="twitter:player:height" content="720">
<meta name="twitter:player:stream" content="https://example.com/video.mp4">
<meta name="twitter:player:stream:content_type" content="video/mp4">
```

### LinkedIn-specific
```html
<meta property="og:image" content="https://example.com/linkedin-image.jpg">
<!-- Use 1200x627px for best LinkedIn results -->
```

---

## 3.7 SCREEN READER BEST PRACTICES

### Hidden Content (Choose Correct Method)

**Visually hidden, screen reader accessible:**
```css
.visually-hidden {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}
```

**Completely hidden from everyone:**
```css
.hidden {
  display: none; /* OR */
  visibility: hidden;
}
```

**Hidden from screen readers only:**
```html
<span aria-hidden="true">🎥</span> <!-- Decorative emoji -->
```

### Dynamic Content Announcements
```html
<!-- For status updates (polite, waits for pause) -->
<div role="status" aria-live="polite" aria-atomic="true" id="status-message"></div>

<!-- For errors/alerts (assertive, interrupts) -->
<div role="alert" aria-live="assertive" aria-atomic="true" id="error-message"></div>

<!-- For loading states -->
<div aria-live="polite" aria-busy="true">
  <span class="visually-hidden">Loading content, please wait</span>
  <div class="spinner" aria-hidden="true"></div>
</div>
```

### Button vs Link Semantics
```html
<!-- Navigation (goes somewhere) -->
<a href="/page">Go to page</a>

<!-- Action (does something) -->
<button type="button">Open modal</button>

<!-- Form submission -->
<button type="submit">Submit form</button>
```

### Interactive Elements
```html
<!-- Accordion -->
<button
  aria-expanded="false"
  aria-controls="panel-1"
  id="accordion-button-1"
>
  Section title
</button>
<div
  id="panel-1"
  role="region"
  aria-labelledby="accordion-button-1"
  hidden
>
  Content
</div>

<!-- Modal -->
<dialog
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Modal Title</h2>
  <p id="modal-description">Description</p>
</dialog>

<!-- Tabs -->
<div role="tablist" aria-label="Course modules">
  <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">
    Module 1
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2" tabindex="-1">
    Module 2
  </button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  Content
</div>
```

---

## 4. SECURITY

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  style-src 'self' 'unsafe-inline';
  script-src 'self';
  img-src 'self' data: https:;
  media-src 'self' https:;
  font-src 'self';
  connect-src 'self';
">
```

**For Video Apps:** Allow media-src from CDNs

### Permissions Policy
```html
<meta http-equiv="Permissions-Policy" content="
  geolocation=(),
  microphone=(),
  camera=(self),
  fullscreen=(self),
  picture-in-picture=(self)
">
```

### Referrer Policy
```html
<meta name="referrer" content="strict-origin-when-cross-origin">
```

---

## 5. PWA CAPABILITIES

### Web App Manifest
```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#0d47a1">
<meta name="theme-color" content="#212121" media="(prefers-color-scheme: dark)">
```

### Apple-Specific
```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="App Name">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

### Icons (All Platforms)
```html
<link rel="icon" type="image/svg+xml" href="/icon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/icon-16.png">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0d47a1">
```

---

## 6. VIEWPORT & MOBILE

### Optimal Viewport
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

**viewport-fit=cover:** Handles iPhone notch/safe areas

### Mobile-Specific
```html
<meta name="format-detection" content="telephone=no">
<meta name="mobile-web-app-capable" content="yes">
```

---

## 6.5 INSTANT.PAGE - JUST-IN-TIME PRELOADING

### What It Does
[instant.page](https://instant.page/) preloads pages right before users click them:
- **Desktop**: Preloads after 65ms hover (gives 300ms head start)
- **Mobile**: Preloads on touchstart (gives 90ms head start)
- **Result**: Pages feel instant even on 3G

### Performance Impact
- Amazon: 100ms improvement = 1% more sales
- Mozilla: 2.2s improvement = 15.4% more downloads
- Human brain perceives <100ms as instant

### Implementation
```html
<!-- Place just before </body> -->
<script src="//instant.page/5.2.0" type="module" integrity="sha384-jnZyxPjiipYXnSU0ygqeac2q7CVYMbh84q0uHVRRxEtvFPiQYbXWUorga2aqZJ0z"></script>
```

### Why Perfect for ETS Framework
- ✅ Mobile-optimized (90ms preload on touch)
- ✅ 3G-friendly (makes slow connections feel instant)
- ✅ Zero waste (only preloads HTML when user likely to click)
- ✅ Data saver aware (respects user preferences)
- ✅ Only 1KB (doesn't impact file size budget)
- ✅ Passive listeners (doesn't block main thread)
- ✅ MIT licensed

### CSP Requirements
Update Content-Security-Policy to allow:
```html
script-src 'self' 'unsafe-inline' https://instant.page;
connect-src 'self' https:;
```

### DNS Prefetch
```html
<link rel="dns-prefetch" href="//instant.page">
```

---

## 6.6 NATIVE LAZY LOADING

### What It Does
Browser-native lazy loading for images, iframes, and embeds. Zero bytes, no library needed.

### Implementation
```html
<!-- First image (above fold) - load immediately -->
<img src="hero.jpg" alt="Description" loading="eager" />

<!-- Images below fold - lazy load -->
<img src="image.jpg" alt="Description" loading="lazy" />

<!-- Iframes -->
<iframe src="embed.html" loading="lazy"></iframe>

<!-- Video (use preload attribute) -->
<video controls preload="metadata">
  <source src="video.mp4" type="video/mp4">
</video>
```

### Browser Support
- Safari 16.4+ (March 2023)
- Chrome 76+ (July 2019)
- Firefox 75+ (April 2020)
- Edge 79+ (January 2020)

**Coverage:** 95%+ global browser support (matches our baseline)

### Benefits for ETS Framework
- ✅ Zero bytes (native feature)
- ✅ Saves bandwidth (critical for 3G users)
- ✅ Defers offscreen content automatically
- ✅ Browser-optimized (better than JS libraries)
- ✅ Respects user preferences and connection speed

### Strategy
1. **First image:** `loading="eager"` (helps LCP - Largest Contentful Paint)
2. **All other images:** `loading="lazy"`
3. **All iframes/embeds:** `loading="lazy"`
4. **Videos:** `preload="metadata"` (not "auto" - saves bandwidth)

### Performance Impact
- Reduces initial page load by 50-70% (typical)
- Saves data on mobile (only loads visible content)
- Improves Core Web Vitals (LCP, CLS)

---

## 7. PERFORMANCE MONITORING

### Core Web Vitals
```html
<script>
// Performance Observer for CLS, FID, LCP
if ('PerformanceObserver' in window) {
  // Track metrics
}
</script>
```

**Decision:** Defer to Phase 7+ (needs JavaScript)

---

## 8. VIDEO-SPECIFIC OPTIMIZATIONS

### Video Element Attributes
```html
<video
  controls
  preload="metadata"
  poster="poster.jpg"
  playsinline
  disablePictureInPicture
  controlsList="nodownload"
>
  <source src="video.mp4" type="video/mp4">
  <track src="captions-en.vtt" kind="captions" srclang="en" label="English" default>
  <track src="captions-es.vtt" kind="captions" srclang="es" label="Español">
</video>
```

**Key attributes:**
- `preload="metadata"`: Only load metadata (saves bandwidth)
- `playsinline`: iOS requirement
- `controlsList`: Prevent download on mobile

---

## COMPLETE RECOMMENDED `<head>` STRUCTURE

```html
<!doctype html>
<html lang="en" dir="ltr">
<head>
  <!-- Character encoding & viewport (MUST be first) -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

  <!-- Title & Description -->
  <title>Page Title | Site Name</title>
  <meta name="description" content="150-160 character description for search results">

  <!-- Security -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline'; media-src 'self' https:; img-src 'self' data: https:;">
  <meta name="referrer" content="strict-origin-when-cross-origin">

  <!-- SEO -->
  <link rel="canonical" href="https://example.com/page">
  <meta name="robots" content="index, follow">

  <!-- Open Graph -->
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Description">
  <meta property="og:image" content="https://example.com/og-image.jpg">
  <meta property="og:url" content="https://example.com/page">
  <meta property="og:type" content="website">

  <!-- Icons & PWA -->
  <link rel="icon" type="image/svg+xml" href="/icon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#0d47a1">
  <meta name="theme-color" content="#212121" media="(prefers-color-scheme: dark)">
  <meta name="color-scheme" content="light dark">

  <!-- Apple-specific -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

  <!-- Performance hints -->
  <link rel="preload" href="app-framework.css" as="style">

  <!-- Stylesheet -->
  <link rel="stylesheet" href="app-framework.css">
</head>
```

---

## DECISIONS FOR ETS FRAMEWORK DEMO PAGE:

### ✅ INCLUDE NOW (Phase 0):
1. Complete viewport meta
2. Color scheme meta
3. Theme color (light/dark)
4. Basic favicon structure
5. Canonical link
6. SEO meta tags
7. Open Graph basics
8. Security headers (CSP, referrer)
9. Apple mobile web app metas
10. Preload for CSS

### ❌ DEFER (Require actual app context):
1. Structured data (JSON-LD) - app-specific
2. Manifest.json - needs icon files
3. Icon files - need design
4. Performance monitoring - needs JS (Phase 7+)
5. Service worker - PWA Phase 7+

### ⚠️ OPTIONAL (Add placeholders):
1. Open Graph image (use placeholder)
2. Description meta (use generic)
3. Twitter Cards (if social sharing important)

---

## manifest.json STRUCTURE (for reference, create in Phase 7):

```json
{
  "name": "ETS Training Portal",
  "short_name": "ETS Portal",
  "description": "Video-based safety and compliance training",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0d47a1",
  "orientation": "any",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## FINAL RECOMMENDATION (UPDATED - COMPREHENSIVE):

**Enhance index.html with EVERYTHING:**

### 1. Complete `<head>` Section:
- ✅ All SEO meta tags (description, robots, canonical)
- ✅ Open Graph (complete with video tags)
- ✅ Twitter Cards (player card for videos)
- ✅ Theme color (light/dark)
- ✅ Security headers (CSP, referrer policy, permissions policy)
- ✅ PWA meta tags (apple-mobile-web-app, manifest link)
- ✅ Icons (SVG, PNG, apple-touch)
- ✅ Performance hints (preload CSS)
- ✅ Color scheme meta

### 2. JSON-LD Structured Data:
- ✅ Organization schema
- ✅ Course schema (for LMS)
- ✅ VideoObject schema (for video pages)
- ✅ BreadcrumbList schema

### 3. Accessibility Complete:
- ✅ Skip navigation links (multiple)
- ✅ ARIA live regions (status, alert)
- ✅ Semantic HTML with ARIA labels
- ✅ Screen reader announcements structure
- ✅ Form accessibility patterns
- ✅ Video accessibility (captions, descriptions, ARIA)

### 4. Body Structure:
- ✅ Skip links (visible on focus)
- ✅ ARIA landmarks with labels
- ✅ Screen reader announcement regions
- ✅ Semantic HTML structure
- ✅ Video elements with all attributes

### 5. Supporting Files (Create Placeholders):
- ✅ Simple SVG favicon
- ✅ PNG icons (32x32, 180x180)
- ✅ manifest.json structure

**File size impact:** +4KB (~120 lines added to HTML)
**Benefit:** Production-ready, SEO-optimized, fully accessible demo

---

## IMPLEMENTATION CHECKLIST:

### Phase 0 Enhancement - Add Now:
- [ ] Update `<head>` with complete meta tags
- [ ] Add JSON-LD scripts (3 schemas minimum)
- [ ] Add skip navigation links
- [ ] Add ARIA live region containers
- [ ] Update body structure with ARIA labels
- [ ] Create .visually-hidden CSS utility
- [ ] Add video accessibility attributes
- [ ] Create simple icon files
- [ ] Create manifest.json
- [ ] Add comprehensive comments

### Acceptance Criteria:
- [ ] Lighthouse SEO score: 100
- [ ] Lighthouse Accessibility score: 100
- [ ] Screen reader tested (VoiceOver/NVDA)
- [ ] Skip links work on Tab key
- [ ] All schemas validate (Google Rich Results Test)
- [ ] Open Graph debugger passes (Facebook, LinkedIn)
- [ ] Twitter Card validator passes

---

## NEXT STEPS:

1. Implement complete HTML foundation in index.html
2. Create icon files (SVG + PNG)
3. Create manifest.json
4. Test with screen reader
5. Validate schemas
6. Commit Phase 0 enhancement
