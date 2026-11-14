# Dakshesh Rathore — Personal Portfolio

A single-page, fast, responsive personal portfolio website built with pure semantic HTML5, CSS3, and modern vanilla JavaScript. Zero frameworks, zero dependencies, and ready for instant deployment to GitHub Pages.

---

## 🚀 Live Preview Locally

Because this website uses vanilla HTML, CSS, and JS without build tools or transpilers:
1. Open the file `index.html` directly in any web browser (Chrome, Edge, Firefox, Safari).
2. Or serve it via any simple static server:
   ```bash
   # Python 3
   python -m http.server 8000

   # or npx serve
   npx serve .
   ```
3. Visit `http://localhost:8000` in your browser.

---

## 📂 Project Structure

```text
portfolio/
├── index.html       # Semantic HTML5 markup, all 8 required sections & inline SVGs
├── style.css        # Clean CSS design system (Dark & Light theme, mobile-first responsive)
├── script.js        # Vanilla JS (< 80 lines: theme toggle, mobile drawer, copy email)
└── README.md        # Documentation and deployment guide
```

---

## 🌐 Deploying to GitHub Pages

You can deploy this site in under 2 minutes:

### Option A: Via GitHub Web Interface
1. Create a new GitHub repository named `daksheshrathore.github.io` (for a root personal domain) or `portfolio`.
2. Upload the contents of this folder (`index.html`, `style.css`, `script.js`, `README.md`) to the `main` branch.
3. In your repository on GitHub, go to **Settings** > **Pages** (in the left sidebar).
4. Under **Branch**, select `main` and root `/`, then click **Save**.
5. Your website will be live in ~60 seconds at `https://daksheshrathore.github.io`!

### Option B: Via Git Command Line
```bash
git init
git add .
git commit -m "feat: initial portfolio release"
git branch -M main
git remote add origin https://github.com/daksheshrathore/daksheshrathore.github.io.git
git push -u origin main
```

---

## 🎨 Features & Architecture

- **Semantic HTML5 & Accessibility**: Fully accessible heading structure (`h1` through `h3`), ARIA attributes, keyboard navigation support, and a "Skip to main content" link.
- **Dark & Light Mode**: Default dark theme with a clean, high-contrast light mode toggle. Respects `prefers-color-scheme` and remembers user choice in `localStorage`.
- **Zero Heavy Libraries**: Fast loading with zero external CDN dependencies. All icons are embedded SVGs.
- **Mobile-First Responsive Design**: Fluid layout tailored for mobile devices, tablets, laptops, and ultra-wide screens.
- **Copy-to-Clipboard**: Quick copy button for the email address with visual toast feedback.
- **Status Indicator**: Animated pulse badge for current work status (`Learning • Alpha`).
