#!/usr/bin/env node

/**
 * Build script for Lewis Clegg portfolio.
 *
 * Reads individual project JSON files from content/projects/,
 * aggregates them into projects.json, and generates a static
 * HTML page for each project at projects/{slug}/index.html.
 * Also produces a sitemap.xml for crawler discoverability.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var identity = require('./identity-graph');

var ROOT = path.resolve(__dirname, '..');
var CONTENT_DIR = path.join(ROOT, 'content', 'projects');
var PROJECTS_DIR = path.join(ROOT, 'projects');
var OUT_JSON = path.join(ROOT, 'projects.json');
var OUT_SITEMAP = path.join(ROOT, 'sitemap.xml');
var SITE_URL = identity.SITE_URL;
var LEWIS_ID = identity.LEWIS_ID;
var IDENTITY_SCRIPT = identity.IDENTITY_SCRIPT;

// Static pages whose <head> carries a build-owned identity-graph region.
var STATIC_PAGES = ['index.html', 'about.html', 'project.html'];

// ---------------------------------------------------------------------------
// 1. Aggregate project JSON
// ---------------------------------------------------------------------------

var files = fs.readdirSync(CONTENT_DIR).filter(function (f) {
  return f.endsWith('.json');
});

var projects = files.map(function (f) {
  return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, f), 'utf8'));
});

projects.sort(function (a, b) {
  if (a.featured && !b.featured) return -1;
  if (!a.featured && b.featured) return 1;
  return (b.year || '').localeCompare(a.year || '');
});

fs.writeFileSync(OUT_JSON, JSON.stringify(projects, null, 2) + '\n');
console.log('Aggregated ' + projects.length + ' projects into projects.json');

// ---------------------------------------------------------------------------
// 2. Generate static HTML per project
// ---------------------------------------------------------------------------

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildProjectHtml(project, idx) {
  var prevIdx = (idx - 1 + projects.length) % projects.length;
  var nextIdx = (idx + 1) % projects.length;
  var prev = projects[prevIdx];
  var next = projects[nextIdx];

  var layout = project.layout || 'single';
  var title = escapeHtml(project.title);
  var subtitle = escapeHtml(project.subtitle || '');
  var year = escapeHtml(project.year || '');
  var seoTitle = escapeHtml(project.seo_title || project.title);
  var firstParagraph = (project.description || '').split('\n\n')[0];
  var metaDesc = escapeHtml(project.seo_description || firstParagraph);

  // Description paragraphs
  var descHtml = '';
  (project.description || '').split('\n\n').forEach(function (p) {
    p = p.trim();
    if (p) descHtml += '        <p>' + escapeHtml(p) + '</p>\n';
  });

  // Gallery images
  var galleryHtml = '';
  (project.images || []).forEach(function (imgSrc, imgIdx) {
    var alt = escapeHtml(project.title + ' \u2014 image ' + (imgIdx + 1));
    galleryHtml += '      <div class="project-gallery__item reveal">\n';
    galleryHtml += '        <img src="/' + imgSrc.replace(/^\//, '') + '" alt="' + alt + '">\n';
    galleryHtml += '      </div>\n';
  });

  // JSON-LD. The creator is a bare pointer to the canonical #lewis node
  // (defined once in the identity graph below); never an inline Person.
  var schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': project.title,
    'description': firstParagraph,
    'dateCreated': project.year,
    'creator': { '@id': LEWIS_ID },
    'keywords': (project.tags || []).join(', ')
  };

  return '<!DOCTYPE html>\n\
<html lang="en">\n\
<head>\n\
  <meta charset="UTF-8">\n\
  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n\
  <title>' + seoTitle + ' \u2014 Lewis Clegg</title>\n\
  <meta name="description" content="' + metaDesc + '">\n\
  <meta property="og:title" content="' + seoTitle + ' \u2014 Lewis Clegg">\n\
  <meta property="og:description" content="' + escapeHtml(firstParagraph) + '">\n\
  <meta property="og:url" content="' + SITE_URL + '/projects/' + project.slug + '/">\n\
  <meta property="og:type" content="article">\n\
  <meta property="og:image" content="' + identity.OG_IMAGE + '">\n\
  <meta name="twitter:card" content="summary_large_image">\n\
\n\
  <!-- Fonts -->\n\
  <link rel="preconnect" href="https://fonts.googleapis.com">\n\
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n\
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300;1,9..40,400&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet">\n\
\n\
  <!-- Styles -->\n\
  <link rel="stylesheet" href="/css/style.css">\n\
\n\
  <!-- JSON-LD: identity graph (shared, byte-identical site-wide; source: scripts/identity-graph.js) -->\n\
' + IDENTITY_SCRIPT + '\n\
\n\
  <!-- JSON-LD: this project -->\n\
  <script type="application/ld+json">\n\
  ' + JSON.stringify(schema, null, 2).split('\n').join('\n  ') + '\n\
  </script>\n\
</head>\n\
<body>\n\
\n\
  <header id="site-header"></header>\n\
\n\
  <main class="project-page" id="project-content">\n\
    <div class="container">\n\
      <a href="/#work" class="project-back">\n\
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>\n\
        Back to Work</a>\n\
\n\
      <div class="project-header">\n\
        <h1 class="project-header__title">' + title + '</h1>\n\
        <div class="project-header__meta">\n\
          <span class="project-header__subtitle">' + subtitle + '</span>\n\
          <span class="project-header__divider" aria-hidden="true">/</span>\n\
          <span class="project-header__year">' + year + '</span>\n\
        </div>\n\
      </div>\n\
\n\
      <div class="project-description reveal">\n\
' + descHtml + '\
      </div>\n\
\n\
      <div class="project-gallery project-gallery--' + layout + '">\n\
' + galleryHtml + '\
      </div>\n\
\n\
      <div class="project-next">\n\
        <a href="/projects/' + prev.slug + '/" class="project-next__link project-next__link--prev">\n\
          <p class="project-next__label">&larr; Previous</p>\n\
          <span class="project-next__title">' + escapeHtml(prev.title) + '</span>\n\
        </a>\n\
        <a href="/projects/' + next.slug + '/" class="project-next__link project-next__link--next">\n\
          <p class="project-next__label">Next &rarr;</p>\n\
          <span class="project-next__title">' + escapeHtml(next.title) + '</span>\n\
        </a>\n\
      </div>\n\
    </div>\n\
  </main>\n\
\n\
  <footer id="site-footer"></footer>\n\
\n\
  <script src="/js/main.js"></script>\n\
</body>\n\
</html>\n';
}

// Create output directories and write files
projects.forEach(function (project, idx) {
  var dir = path.join(PROJECTS_DIR, project.slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  var html = buildProjectHtml(project, idx);
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log('  Generated projects/' + project.slug + '/index.html');
});

// Prune orphaned page directories: any projects/<dir> whose slug no longer
// exists in content/. Scoped strictly to PROJECTS_DIR (the build's own output);
// it never reads or touches images/, which keep their original names even after
// a slug is renamed. This stops stale, un-stitched pages lingering on disk.
var currentSlugs = {};
projects.forEach(function (project) {
  currentSlugs[project.slug] = true;
});

fs.readdirSync(PROJECTS_DIR).forEach(function (entry) {
  var entryPath = path.join(PROJECTS_DIR, entry);
  if (!fs.statSync(entryPath).isDirectory()) return;
  if (currentSlugs[entry]) return;
  fs.rmSync(entryPath, { recursive: true, force: true });
  console.log('  Pruned orphaned page projects/' + entry + ' (no matching slug in content/)');
});

// ---------------------------------------------------------------------------
// 3. Inject the identity graph into the build-owned region of static pages
// ---------------------------------------------------------------------------
//
// The region is delimited by:
//   <!-- identity-graph:start ... -->  ...  <!-- identity-graph:end -->
// We replace whatever sits between the markers. This is idempotent: re-running
// always yields exactly one identity <script>, never an accumulated stack. If
// the markers are missing we warn and skip rather than blindly append.

function injectIdentityGraph(fileName) {
  var filePath = path.join(ROOT, fileName);
  var html = fs.readFileSync(filePath, 'utf8');

  var startTag = '<!-- identity-graph:start';
  var endTag = '<!-- identity-graph:end -->';
  var startIdx = html.indexOf(startTag);
  var endIdx = html.indexOf(endTag);

  if (startIdx === -1 || endIdx === -1) {
    console.warn('  Skipped ' + fileName + ': identity-graph markers not found');
    return;
  }

  var startCommentEnd = html.indexOf('-->', startIdx) + 3;
  var before = html.slice(0, startCommentEnd);
  var after = html.slice(endIdx);
  var region = '\n' + IDENTITY_SCRIPT + '\n  ';

  fs.writeFileSync(filePath, before + region + after);
  console.log('  Injected identity graph into ' + fileName);
}

STATIC_PAGES.forEach(injectIdentityGraph);

// ---------------------------------------------------------------------------
// 4. Generate sitemap.xml
// ---------------------------------------------------------------------------

var sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
sitemap += '  <url><loc>' + SITE_URL + '/</loc></url>\n';
sitemap += '  <url><loc>' + SITE_URL + '/about.html</loc></url>\n';
projects.forEach(function (project) {
  sitemap += '  <url><loc>' + SITE_URL + '/projects/' + project.slug + '/</loc></url>\n';
});
sitemap += '</urlset>\n';

fs.writeFileSync(OUT_SITEMAP, sitemap);
console.log('Generated sitemap.xml with ' + (projects.length + 2) + ' URLs');
