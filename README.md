# ETS Framework

A lightweight CSS framework for building beautiful, modern websites quickly. Based on Simple.css, ETS Framework provides a classless CSS foundation that styles semantic HTML elements without requiring additional classes.

## Features

- **Classless**: Write semantic HTML, get a beautiful website
- **Responsive**: Mobile-first design that works everywhere
- **Dark Mode**: Automatic dark mode support based on user preferences
- **Lightweight**: Minimal footprint, maximum impact
- **No Dependencies**: Pure CSS, no JavaScript required
- **Modern**: CSS variables for easy customization

## Quick Start

### CDN

```html
<link rel="stylesheet" href="simple.css">
```

### Local Installation

Download `simple.css` or `simple.min.css` and include it in your HTML:

```html
<link rel="stylesheet" href="path/to/simple.css">
```

### NPM

```bash
npm install simpledotcss
```

## Usage

Simply write semantic HTML and ETS Framework will handle the styling:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <link rel="stylesheet" href="simple.css">
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <p>Built with ETS Framework</p>
    </header>

    <main>
        <article>
            <h2>About</h2>
            <p>This is a paragraph with beautiful styling.</p>
        </article>
    </main>

    <footer>
        <p>© 2025 My Website</p>
    </footer>
</body>
</html>
```

## Customization

Override CSS variables to customize the framework:

```css
:root {
    --accent: #your-color;
    --bg: #your-background;
    --text: #your-text-color;
}
```

## Files Included

- `simple.css` - Main stylesheet (unminified)
- `simple.min.css` - Minified version for production
- `simple-v1.css` - Version 1 (legacy support)
- `simple-v1.min.css` - Version 1 minified
- `index.html` - Demo page showcasing all elements

## Browser Support

Works on all modern evergreen browsers (Chrome, Firefox, Safari, Edge)

## License

MIT License - see LICENSE file for details

## Credits

Built on [Simple.css](https://simplecss.org) by Kev Quirk
