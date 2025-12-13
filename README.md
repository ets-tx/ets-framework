# ETS Framework

A lightweight, classless CSS framework for modern web applications. Built on Simple.css, ETS Framework provides accessible, responsive styling using only semantic HTML.

## Features

- **Classless**: Write semantic HTML, get styled output — no classes needed
- **Accessible**: WCAG compliant with automatic light/dark mode support
- **Responsive**: Mobile-first design that works on any device
- **Lightweight**: Single CSS file, no JavaScript required
- **Modern**: CSS variables for easy customization

## Quick Start

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
    --accent: #0d47a1;
    --bg: #fff;
    --text: #212121;
}
```

## Display Modes

ETS Framework automatically adapts to user preferences:

- **Light Mode**: Default
- **Dark Mode**: Activates via `prefers-color-scheme: dark`

## Browser Support

Modern browsers with CSS variable support (Chrome, Firefox, Safari, Edge).

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
