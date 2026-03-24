# Portfolio Site — Project Handoff

## Overview

A static portfolio site for a graphic designer. Minimal, image-led, typography-forward. Hosted on Cloudflare Pages, repo on GitHub, content managed via Pages CMS (no technical knowledge required from the client).

---

## Stack

- **Hosting**: Cloudflare Pages (connected to GitHub repo)
- **Images**: Stored in the GitHub repo (not R2)
- **CMS**: Pages CMS (`app.pagescms.org`) — Git-backed, no backend required
- **Languages**: Plain HTML, CSS, vanilla JS — no framework, no build step
- **Dark/Light mode**: Yes — CSS custom properties + `prefers-color-scheme` + manual toggle

---

## Repo Structure

```
/
├── .pages.yml              ← Pages CMS config
├── index.html              ← Home page (static)
├── about.html              ← About page (static)
├── project.html            ← Project template page (JS reads slug from URL, loads JSON)
├── css/
│   └── style.css
├── js/
│   └── main.js             ← Loads projects.json for index; loads single project JSON for project page
├── public/
│   └── images/
│       ├── project-slug-one/
│       │   ├── hero.webp
│       │   └── shot-2.webp
│       └── project-slug-two/
│           └── ...
└── content/
    └── projects/
        ├── project-slug-one.json
        └── project-slug-two.json
```

---

## Content Schema

Each project is a separate JSON file in `content/projects/`. Example:

```json
{
  "title": "Brand Identity — Acme Co",
  "date": "2025-03",
  "category": "Branding",
  "description": "A short blurb about the project.",
  "featured": false,
  "images": [
    "public/images/brand-identity-acme/hero.webp",
    "public/images/brand-identity-acme/shot-2.webp"
  ]
}
```

### Fields

| Field | Type | Notes |
|---|---|---|
| `title` | string | Project name |
| `date` | string | Format: YYYY-MM |
| `category` | string | e.g. Branding, Print, Web |
| `description` | string | Short paragraph |
| `featured` | boolean | Pin to top of index if true |
| `images` | array of strings | Paths relative to repo root |

---

## Pages CMS Config (`.pages.yml`)

```yaml
media:
  input: public/images
  output: /images

content:
  - name: projects
    label: Projects
    type: collection
    path: content/projects
    fields:
      - name: title
        label: Title
        type: string
        required: true
      - name: date
        label: Date
        type: date
      - name: category
        label: Category
        type: string
      - name: description
        label: Description
        type: text
      - name: featured
        label: Featured
        type: boolean
      - name: images
        label: Images
        type: image
        list: true
```

---

## Pages

### `index.html` — Work index
- Minimal nav: site name (left), Work / About / Contact (right)
- Project grid: large image cards, project title below (or overlaid), category optional
- Featured projects appear first
- JS fetches all JSON files from `content/projects/`, renders cards dynamically
- Clicking a card navigates to `project.html?slug=project-slug-one`

### `project.html` — Project template
- JS reads `?slug=` param from URL, fetches the corresponding JSON file
- Layout: project title + date at top, then full-width images stacked vertically
- Prev/Next navigation at bottom (sorted by date)
- Back to Work link in nav

### `about.html` — Static page
- Simple, hand-coded. No dynamic content needed.

---

## Design Direction

**Reference**: https://falodu-fluid-demo.squarespace.com/work

Extremely restrained. Large images do the talking. Almost no UI chrome. Key characteristics to replicate and build on:

- Full-width or near-full-width imagery
- Generous whitespace / negative space
- Minimal navigation — name as logo, 3 nav links
- Project index: image-led cards, title in clean type below
- Project page: title + year header, then images stacked full-width, no sidebars
- Prev/Next project nav at bottom

**Improvements over the reference:**

- **Dark/light mode**: CSS custom properties for all colours. Respect `prefers-color-scheme` by default, with a manual toggle (small icon, top right or bottom corner). Light mode: near-white background, near-black type. Dark mode: near-black background, near-white type. Images look great in both.
- **Typography**: Choose something with personality — the reference uses safe system-ish fonts. Pick a distinctive pairing (display font for titles, clean body font for descriptions). Google Fonts or system stack only — no paid fonts.
- **Subtle transitions**: Page loads and image reveals with tasteful CSS transitions. Nothing flashy — this is a designer's portfolio.

---

## Client Workflow (once set up)

1. Visit `app.pagescms.org`
2. Sign in with GitHub
3. Add/edit projects via form UI — no JSON, no Git knowledge needed
4. Upload images via drag-and-drop in the CMS media library
5. Save → Pages CMS commits to GitHub → Cloudflare Pages rebuilds automatically

---

## What's Already Done

- GitHub repo created
- Cloudflare Pages connected to repo
- Pages CMS connected to repo
- [x] Repo structure (folders, placeholder files)
- [x] `index.html` + JS to render project grid from JSON
- [x] `project.html` + JS to render single project from JSON
- [x] `about.html` static page
- [x] `style.css` with full dark/light mode implementation
- [x] `projects.json` with 4 projects (MAMIL, St Peter's Consort, Wheelers Review, Selected Works)
- [x] All project images converted to webp (1800px max, ~3.3MB total) — jpgs removed
- [x] SCREENSHOTS converted to `images/projects/mixed-work/` as "Selected Works" project with placeholder description
- [x] `loading="lazy"` on all images via `buildImage()` in `main.js`
- [x] Sliding yellow (#ffd000) nav underline — single indicator follows cursor between nav links
- [x] Cleaned up JS: removed webp detection/fallback code (webp-native now)

## What Needs Building

- [ ] `.pages.yml` CMS config
- [ ] Split `projects.json` into individual files in `content/projects/` for Pages CMS (requires JS update to load individual files, or a GitHub Action to aggregate)
- [ ] Review overall design direction against Falodu reference — current site has hero monogram, bg-grid, blob backgrounds, numbered indices, tags that the reference doesn't have
- [ ] Use yellow (#ffd000) as accent elsewhere — offset blocks behind black text, link hover underlines
- [ ] Use "Logo Black" only (ignore Logo White — yellow on white fails accessibility)
- [ ] Lewis's social links (LinkedIn, Instagram) — currently placeholder `#` hrefs in footer
- [ ] Test and refine on mobile
- [ ] Lewis to review and edit project descriptions via Pages CMS
