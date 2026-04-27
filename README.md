# Gielinor Codex — OSRS Guide Library

A growing collection of in-depth Old School RuneScape guides, themed after the parchment-and-gold aesthetic of the game itself.

Live demo: deploy this to GitHub Pages and link it here.

---

## 📁 Project Structure

```
osrs-guide-library/
├── index.html                    ← Library homepage (auto-populates from registry)
├── README.md                     ← You are here
│
├── guides/
│   ├── _template.html            ← COPY THIS to start a new guide
│   └── cowhide.html              ← Full cowhide farming guide
│
├── assets/
│   ├── css/
│   │   └── theme.css             ← Shared theme (don't edit per-guide)
│   └── js/
│       ├── guides.js             ← ⭐ ADD NEW GUIDES HERE
│       └── main.js               ← Shared JS (search, lightbox, FAQ, etc.)
│
└── images/
    └── guides/
        └── cowhide-infographic.png
```

---

## ➕ Adding a New Guide

Three steps. That's it.

### Step 1 — Copy the template

```bash
cp guides/_template.html guides/your-guide-id.html
```

Pick a slug-style id: `wines-of-zamorak`, `fletching-1-99`, `barrows-runs`, etc.

### Step 2 — Register the guide

Open `assets/js/guides.js` and add an entry to the `GUIDES` array:

```js
{
  id: 'wines-of-zamorak',
  title: 'Wines of Zamorak',
  file: 'guides/wines-of-zamorak.html',
  category: 'Money Making',          // matches CATEGORY_ORDER list
  difficulty: 'Easy',                 // Easy | Medium | Hard | Elite
  membership: 'Members',              // F2P | Members | F2P/Members
  thumbEmoji: '🍷',                   // shows on the card
  description: 'Telegrab wines for ~1.5M GP/hr. Requires 33 Magic.',
  tags: ['Members', 'Easy', 'Magic'],
  requirements: '33 Magic, Mountain Daughter partial',
  profitPerHour: '~1.5M GP/hr',
  featured: false,
},
```

The homepage will pick it up automatically — no rebuilding needed.

### Step 3 — Write the content

Open your new HTML file and replace the `[REPLACE: ...]` placeholders. The template has commented examples for every supported component — tabs, callouts, image zoom, profit calculators, FAQ, etc.

---

## 🎨 Available Components

All components share the same theme. Reach for them when writing a new guide:

| Component         | When to use                           | Example                    |
|-------------------|---------------------------------------|----------------------------|
| `.panel.ornate`   | Big highlighted callout box           | About blocks, summaries    |
| `.sub-panel`      | Inline content card                   | Sub-sections, tips         |
| `.stat-chip`      | Quick number callout                  | GP/hr, requirements        |
| `.steps-list`     | Numbered walkthrough with medallions  | Walkthroughs               |
| `.callout`        | Small inline highlight                | Notes, tips, warnings      |
| `.callout.tip`    | Green-tinted tip                      | Pro tips                   |
| `.callout.warn`   | Red-tinted warning                    | Mistakes to avoid          |
| `[data-tabs]`     | Tabbed sections                       | Gear tiers, builds         |
| `.faq-item`       | Collapsible Q&A                       | FAQs                       |
| `[data-zoomable]` | Click-to-zoom image viewer            | Maps, infographics         |
| `.locations-table`| Themed comparison table               | Spots, methods             |
| `.equip-grid`     | Visual OSRS equipment slot grid       | Gear setups                |
| `.inv-grid`       | Visual inventory grid                 | Inventory layouts          |
| `.map-block`      | Stylized map placeholder              | Routes                     |

See `guides/cowhide.html` for examples of all of them.

---

## 🚀 Deploying to GitHub Pages

This is a static site — no build step needed.

### Option A — Repo root

1. Create a new GitHub repo (e.g. `gielinor-codex`)
2. Push the contents of this folder to the repo's root
3. Go to **Settings → Pages**
4. Under "Source", choose **Deploy from a branch** → `main` → `/ (root)`
5. Save. Your site will be at `https://hevynn.github.io/gielinor-codex/`

### Option B — `docs/` folder (if you prefer to keep src separate)

Move everything into a `docs/` folder, push, then choose `/docs` as the Pages source.

### Custom domain (optional)

Add a `CNAME` file with your domain inside the published folder, then point your DNS at GitHub Pages.

---

## 🔧 Local Development

Just open `index.html` in your browser — no server required for most things.

If you want a quick local server (recommended for testing relative paths):

```bash
# Python 3
python -m http.server 8000

# Or Node
npx serve

# Or VS Code Live Server extension
```

Then visit `http://localhost:8000`.

---

## 🎯 Design Conventions

- **Single-file per guide** — each guide is fully self-contained in one HTML file
- **No build step** — everything is plain HTML/CSS/JS, deploys anywhere
- **Mobile-friendly** — TOC stacks above content under 900px
- **Dark medieval theme** — Cinzel display font, EB Garamond body, gold-on-leather palette
- **Print-friendly** — guides print cleanly with `Cmd/Ctrl + P`

---

## 📜 License

Personal project. OSRS content references are for educational purposes only.
Old School RuneScape™ is a trademark of Jagex Limited.

Built by **Hevynn**.
