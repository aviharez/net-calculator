# Luxury Seller Net Proceeds Calculator 
**The Skyline Collective**

[![Deployment](https://github.com/aviharez/net-calculator/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/aviharez/net-calculator/actions/workflows/deploy.yml)

A sophisticated, client-facing calculator designed for high-end real estate listing presentations. This premium tools allows agents to demonstrate projected seller proceeds in real-time with an elegant, tablet-optimized interface.

---

## Features

### Core Functionality
- **Real-time Calculations**: Instant updates as values change
- **Interactive Sliders**: Smooth, touch-optimized controls for all major inputs
- **Visual Breakdown**: Animated donut chart showing proceeds vs costs
- **Detailed Line Items**: Transparent breakdown of all deductions
- **Transfer Tax Toggle**: Quick-enable for local 1.5% transfer tax
- **Large Number Support**: Handles properties up to $25M without layout issues

### User Experience 
- **Responsive Design**: Optimized for tablets, laptops, and desktops
- **Touch-Friendly**: Larger touch targets for mobile/tablet use
- **Smooth Animation**: Sophisticated micro-interactions and transitions
- **Accessibility**: ARIA labels and keyboard navigation support

### Technical
- **Zero Dependencies**: Pure HTML/CSS/JavaScript, no framework required
- **Lightweight**: Single file under 50KB
- **Fast Loading**: Optimized animations and rendering

---

## Quick Start

### Local/Standalone Use
1. Ensure all three files (`index.html`, `styles.css`, `script.js`) are in the same folder
2. Open `index.html` in any modern web browser
3. Present to clients during listing appointments
4. Adjust values using sliders or direct input

### Embed in Website
```html
<!-- Add to your HTML page -->
<iframe
    src="https://aviharez.github.io/net-calculator/index.html"
    width="100%"
    height="1200px"
    frameborder="0"
    title="Net Proceeds Calculator">
</iframe>
```

### WebView Integration
```swift
// iOS - Swift
let webView = WKWebView()
let url = "https://aviharez.github.io/net-calculator/index.html"
webView.load(url)
```

```java
// Android - Java
WebView webView = findViewById(R.id.webview);
webView.getSettings().setJavaScriptEnabled(true);
webView.loadUrl("https://aviharez.github.io/net-calculator/index.html");
```

## Integration Guide

### File Dependencies
The calculator requires all three files to function
- **index.html**: Main structure (references styles.css and script.js)
- **styles.css**: All styling and visual design
- **script.js**: Calculator logic and interactivity

### Embedding in Existing Web Pages

#### Full Integration
To integrate into your existing website:
1. **Copy all three files** to your website directory
2. **Link the CSS** in your page's
3. **Copy the HTML** from index.html (the calculator-container div and all its content)
4. **Link the JavaScript** before your closing `</body>` tag

## Customization
All branding elements are controlled through CSS variables at the top of **styles.css**. Modify these to match your brand identity.