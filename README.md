# CSS Copy Tool 🎨

> Instantly copy CSS from any element. A lightweight, free alternative to CSS Scan.

![Version](https://img.shields.io/badge/version-1.0.2-purple)
![Manifest](https://img.shields.io/badge/manifest-v3-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **🎯 Element Inspector** - Hover and click to inspect any element
- **📋 One-Click Copy** - Copy computed CSS instantly
- **🎨 Multiple Formats** - Export as CSS, Tailwind, or inline styles
- **⚡ Lightweight** - No bloat, just what you need
- **🔒 Privacy First** - No data collection, works offline

## 📸 Screenshots

| Inspector Active | Properties Panel |
|-----------------|------------------|
| ![Inspector](https://via.placeholder.com/400x300/7c3aed/ffffff?text=Inspector+Mode) | ![Panel](https://via.placeholder.com/400x300/1a1a2e/ffffff?text=CSS+Panel) |

## 🆚 CSS Copy Tool vs CSS Scan

| Feature | CSS Copy Tool | CSS Scan |
|---------|--------------|----------|
| Price | **Free** | $39+ |
| Manifest V3 | ✅ | ✅ |
| Copy CSS | ✅ | ✅ |
| Tailwind Export | ✅ | ✅ |
| Inline Styles | ✅ | ✅ |
| Dark Mode UI | ✅ | ✅ |
| Open Source | ✅ | ❌ |
| Offline Support | ✅ | ❌ |

## 🚀 Installation

### From Source (Developer Mode)

1. Clone this repository:
   ```bash
   git clone https://github.com/dlcsouza/css-copy-tool.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable **Developer mode** (toggle in top right)

4. Click **Load unpacked**

5. Select the `css-copy-tool` folder

6. The extension icon will appear in your toolbar!

### From Chrome Web Store

[Get it on the Chrome Web Store](https://chromewebstore.google.com/detail/css-copy-tool/kdaggejlblhghmjnajlmgcpblelmcepn)

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Alt + Shift + C` | Toggle Inspector On/Off |
| `Esc` | Deactivate Inspector |
| `Click` | Select element and show CSS |

> **Tip:** You can customize the shortcut in `chrome://extensions/shortcuts`

## 📤 Output Formats

### Pure CSS
```css
.element {
  color: #333333;
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 8px;
}
```

### Tailwind Classes
```
text-gray-800 text-base px-6 py-3 rounded-lg
```

### Inline Styles
```
color: #333333; font-size: 16px; padding: 12px 24px; border-radius: 8px;
```

## 🎛️ Property Categories

Choose which CSS properties to include:

- **Colors & Backgrounds** - color, background-color, gradients
- **Typography** - font-family, font-size, line-height, etc.
- **Spacing** - margin, padding
- **Borders & Radius** - border, border-radius
- **Layout** - display, position, flexbox, grid
- **Effects** - box-shadow, opacity, transform

## 🛠️ Development

```bash
# Clone the repo
git clone https://github.com/dlcsouza/css-copy-tool.git
cd css-copy-tool

# Make changes and reload extension in Chrome
# No build step required!
```

### Project Structure

```
css-copy-tool/
├── manifest.json      # Extension manifest (v3)
├── background.js      # Service worker
├── popup/
│   ├── popup.html    # Extension popup UI
│   ├── popup.css     # Popup styles
│   └── popup.js      # Popup logic
├── content/
│   ├── content.js    # Main inspector logic
│   └── content.css   # Inspector styles
├── assets/
│   └── icon-*.png    # Extension icons
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [CSS Scan](https://getcssscan.com/)
- Built with ❤️ for the web development community

---

**[⬆ Back to Top](#css-copy-tool-)**
