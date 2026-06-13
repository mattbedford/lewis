# Lewis — Portfolio Site

A static portfolio site hosted on Cloudflare Pages, managed via Pages CMS.

## How it works

The site is built from files in this GitHub repository. When content is updated, GitHub automatically rebuilds the site and Cloudflare deploys it. You don't need to touch GitHub directly.

## Managing content

Content is managed through **Pages CMS**: [app.pagescms.org](https://app.pagescms.org)

Sign in with your GitHub account to access the dashboard, then open the **lewis** repository.

From there you can:

- **Projects** — add, edit or remove portfolio projects
- **Media** — upload and manage images

### Adding or editing a project

Each project has the following fields:

| Field | Notes |
|---|---|
| Slug | URL identifier — lowercase, hyphens only (e.g. `josh-and-joel`) |
| Title | Project name |
| Subtitle | Short description shown in listings |
| Year | Year of the project |
| Category | e.g. Branding, Print, Digital |
| Gallery Layout | Single column, two columns, or three columns |
| Featured | Whether the project appears in the featured section |
| Thumbnail | Main image used in listings |
| Fallback Colour | Hex colour shown while images load (e.g. `#3a3a3a`) |
| Description | Full project description |
| Tags | Keywords (e.g. Branding, Print, Identity) |
| Gallery Images | All images for the project gallery |
| SEO Title | Optional — leave blank to use the project title |
| SEO Description | Optional — leave blank to use the description |

Save your changes in Pages CMS and the site will update automatically within a minute or two.

## Technical overview (for developers)

- **Hosting:** Cloudflare Pages
- **Content:** JSON files in `content/projects/`
- **Images:** `images/` folder
- **Build step:** `.github/workflows/aggregate-projects.yml` runs `scripts/build-projects.js` on push to `main` (when `content/projects/**` or `scripts/**` change), generating `projects.json`, individual project pages, and `sitemap.xml`. Run it locally with `node scripts/build-projects.js`.
- **Identity graph (SEO):** Lewis, the website, and the practice are defined **once** in `scripts/identity-graph.js` (the canonical `#lewis` / `#website` / `#practice` nodes). The build injects that block, byte-identical, into every page — into the `<!-- identity-graph:start ... end -->` region of `index.html`, `about.html`, and `project.html`, and into each generated project page. Everywhere else (project schema, homepage list) references `#lewis` by id rather than re-describing him. **Do not hand-edit the marked regions** — they are overwritten on every build. To change Lewis's details, edit `scripts/identity-graph.js` and rebuild.
- **CMS config:** `.pages.yml`