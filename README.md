# ETS Framework

A lightweight, classless CSS framework optimized for modern web applications. Built for video-heavy LMS platforms and admin dashboards, ETS Framework provides accessible, performant styling without requiring CSS classes.

## Features

- **Classless**: Write semantic HTML, get a beautiful application
- **Video-Optimized**: Native support for fullscreen, picture-in-picture, and captions
- **Accessible**: WCAG AA/AAA compliant with three display modes (Light, Dark, High Contrast)
- **Mobile-First**: Optimized for blue-collar workers on job sites with challenging conditions
- **Lightweight**: Under 20KB, optimized for poor network conditions
- **No Dependencies**: Pure CSS, no JavaScript required
- **Modern**: CSS variables, logical properties, oklch colors, container queries

## Quick Start

### NPM

```bash
npm install ets-framework
```

### Local Installation

Download `app-framework.css` and include it in your HTML:

```html
<link rel="stylesheet" href="app-framework.css">
```

## Usage

Simply write semantic HTML and ETS Framework will handle the styling:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My LMS</title>
    <link rel="stylesheet" href="app-framework.css">
</head>
<body>
    <header>
        <h1>Training Portal</h1>
        <nav>
            <a href="/">Home</a>
            <a href="/courses">Courses</a>
        </nav>
    </header>

    <main>
        <article>
            <h2>Course Video</h2>
            <video controls poster="thumbnail.jpg">
                <source src="lesson.mp4" type="video/mp4">
                <track src="captions.vtt" kind="captions" srclang="en">
            </video>
        </article>
    </main>

    <footer>
        <p>© 2025 ETS-TX</p>
    </footer>
</body>
</html>
```

## Customization

Override CSS variables to customize the framework:

```css
:root {
    --color-accent: oklch(50% 0.15 250);
    --color-background: oklch(100% 0 0);
    --font-size-base: 1rem;
}
```

## Display Modes

ETS Framework automatically supports three display modes:

- **Light Mode**: Default, optimized for well-lit environments
- **Dark Mode**: Activates via `prefers-color-scheme: dark`
- **High Contrast**: Activates via `prefers-contrast: more` for challenging conditions

## Browser Support

Supports Safari 17.4+, Chrome 120+, Firefox 120+, Edge 120+ (95% global coverage)

Optimized for:
- Mobile Safari on older iOS devices
- Firefox (blue-collar demographic)
- Chrome on budget Android devices

## Files Included

- `app-framework.css` - Main framework
- `legacy/simple.css` - Original Simple.css (reference)
- `legacy/simple-v1.css` - Simple.css v1 (reference)
- `index.html` - Demo page showcasing all elements

## License

MIT License - see LICENSE file for details

## Credits

Based on [Simple.css](https://simplecss.org) by Kev Quirk

Built by ETS-TX (Bryan A Counts) for real-world, challenging work environments.
