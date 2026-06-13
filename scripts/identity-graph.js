#!/usr/bin/env node

/**
 * Single source of truth for the site-wide identity graph.
 *
 * Defines Lewis Clegg (#lewis), the website (#website), and the practice
 * (#practice) exactly ONCE. Every page in the site references these by their
 * canonical @id; nothing else may redeclare Lewis's properties. build-projects.js
 * injects this block, byte-identical, into the <head> of every page.
 *
 * Do NOT pull any of this from CMS content. The @id strings are byte-exact,
 * case-sensitive, and include the trailing slash before the fragment. Do not
 * normalise, add, or strip anything. No em dashes anywhere.
 */

'use strict';

var SITE_URL = 'https://lewisclegg.co.uk';

// Canonical ids. These strings are the join keys for the whole identity web;
// every creator/mainEntity/publisher pointer must match LEWIS_ID byte for byte.
var LEWIS_ID = SITE_URL + '/#lewis';
var WEBSITE_ID = SITE_URL + '/#website';
var PRACTICE_ID = SITE_URL + '/#practice';

// Default social-share card for the brand/practice (the "org"). Kept as JPEG on
// purpose: og:image is read by external crawlers where JPEG/PNG render reliably,
// unlike webp. Person.image (the profile photo) stays webp.
var OG_IMAGE = SITE_URL + '/images/og-cover.jpg';

var IDENTITY_GRAPH = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': LEWIS_ID,
      'name': 'Lewis Clegg',
      'givenName': 'Lewis',
      'additionalName': 'James',
      'familyName': 'Clegg',
      'alternateName': 'Lewis James Clegg',
      'url': 'https://lewisclegg.co.uk/',
      'image': 'https://lewisclegg.co.uk/images/Lewis-Clegg-Graphic-Designer.webp',
      'jobTitle': 'Graphic and web designer',
      'email': 'hello@lewisclegg.co.uk',
      'description': 'A graphic designer based in Halifax, West Yorkshire, with expertise in branding, editorial design, and print. Experienced in creating cohesive brand identities, publication design, and visual systems for clients across the region.',
      'knowsAbout': ['Graphic Design', 'Web Design', 'Branding', 'Editorial Design', 'Print Design', 'Identity Design', 'Menu Design', 'Poster Design'],
      'worksFor': {
        '@type': 'Role',
        'roleName': 'Director',
        'worksFor': {
          '@type': 'Organization',
          '@id': 'https://hebblestone.org/#hebblestone',
          'name': 'Hebble & Stone CIC',
          'url': 'https://hebblestone.org/'
        }
      },
      'sameAs': [
        'https://www.linkedin.com/in/lewis-clegg-5aa031200/',
        'https://www.instagram.com/clegglewis/',
        'https://find-and-update.company-information.service.gov.uk/officers/6nNGACAHaBYfHbT3m67OsogczMw/appointments'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      'url': 'https://lewisclegg.co.uk/',
      'name': 'Lewis Clegg',
      'publisher': { '@id': LEWIS_ID },
      'inLanguage': 'en-GB'
    },
    {
      '@type': 'ProfessionalService',
      '@id': PRACTICE_ID,
      'name': 'Lewis Clegg, Graphic and Web Design',
      'url': 'https://lewisclegg.co.uk/',
      'image': OG_IMAGE,
      'description': 'Graphic and web design practice based in Halifax, West Yorkshire, specialising in branding, editorial design, web design, and print.',
      'founder': { '@id': LEWIS_ID },
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Halifax',
        'addressRegion': 'West Yorkshire',
        'addressCountry': 'GB'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 53.7248,
        'longitude': -1.8596
      },
      'areaServed': {
        '@type': 'Place',
        'name': 'West Yorkshire'
      },
      'priceRange': '$$',
      'knowsAbout': ['Graphic Design', 'Web Design', 'Branding', 'Editorial Design', 'Print Design', 'Identity Design', 'Menu Design', 'Poster Design']
    }
  ]
};

// The exact <script> block injected into every page. Indented two spaces so it
// sits cleanly inside <head>. Byte-identical wherever it lands.
function indentLines(str, pad) {
  return str.split('\n').map(function (line) {
    return line.length ? pad + line : line;
  }).join('\n');
}

var IDENTITY_SCRIPT = indentLines(
  '<script type="application/ld+json">\n' +
  JSON.stringify(IDENTITY_GRAPH, null, 2) + '\n' +
  '</script>',
  '  '
);

module.exports = {
  SITE_URL: SITE_URL,
  LEWIS_ID: LEWIS_ID,
  WEBSITE_ID: WEBSITE_ID,
  PRACTICE_ID: PRACTICE_ID,
  OG_IMAGE: OG_IMAGE,
  IDENTITY_GRAPH: IDENTITY_GRAPH,
  IDENTITY_SCRIPT: IDENTITY_SCRIPT
};
