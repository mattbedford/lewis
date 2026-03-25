/* ============================================
   Lewis Clegg — Portfolio
   main.js
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     Shared HTML: Navigation
  ------------------------------------------ */
  function injectNav() {
    var header = document.getElementById('site-header');
    if (!header) return;

    var currentPage = window.location.pathname.split('/').pop() || 'index.html';

    var skipTarget = 'work';
    if (currentPage === 'project.html') skipTarget = 'project-content';
    if (currentPage === 'about.html') skipTarget = 'about';

    header.innerHTML = '\
      <a href="#' + skipTarget + '" class="skip-link">Skip to content</a>\
      <nav class="nav" id="nav">\
        <div class="nav__inner container">\
          <a href="index.html" class="nav__logo" aria-label="Lewis Clegg — Home">\
            <img src="images/logo.webp" alt="Lewis Clegg" class="nav__logo-img">\
          </a>\
          <div class="nav__right">\
            <div class="nav__links">\
              <a href="index.html#work" class="nav__link' + (currentPage === 'index.html' || currentPage === '' ? ' nav__link--active' : '') + '">Work</a>\
              <a href="about.html" class="nav__link' + (currentPage === 'about.html' ? ' nav__link--active' : '') + '">About</a>\
              <a href="#contact" class="nav__link" data-contact>Contact</a>\
            </div>\
            <div class="nav__actions">\
              <a href="https://www.instagram.com/clegglewis/" target="_blank" rel="noopener noreferrer" class="nav__social" aria-label="Instagram">\
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">\
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>\
                  <circle cx="12" cy="12" r="5"/>\
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>\
                </svg>\
              </a>\
              <a href="https://www.linkedin.com/in/lewis-clegg-5aa031200/" target="_blank" rel="noopener noreferrer" class="nav__social" aria-label="LinkedIn">\
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">\
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>\
                  <rect x="2" y="9" width="4" height="12"/>\
                  <circle cx="4" cy="4" r="2"/>\
                </svg>\
              </a>\
              <button class="theme-toggle" aria-label="Toggle dark mode">\
                <svg class="theme-toggle__sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">\
                  <circle cx="12" cy="12" r="5"/>\
                  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>\
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>\
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>\
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>\
                </svg>\
                <svg class="theme-toggle__moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">\
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>\
                </svg>\
              </button>\
            </div>\
            <button class="nav__menu-btn" aria-label="Open menu" aria-expanded="false">\
              <span></span><span></span>\
            </button>\
          </div>\
        </div>\
        <div class="nav__mobile-menu">\
          <a href="index.html#work" class="nav__link">Work</a>\
          <a href="about.html" class="nav__link">About</a>\
          <a href="#contact" class="nav__link" data-contact>Contact</a>\
        </div>\
      </nav>';

    initNavScroll();
    initNavIndicator();
    initMobileMenu();
    initContactLinks();
  }

  /* ------------------------------------------
     Shared HTML: Footer
  ------------------------------------------ */
  function injectFooter() {
    var footer = document.getElementById('site-footer');
    if (!footer) return;

    footer.className = 'footer';
    footer.id = 'contact';
    footer.innerHTML = '\
      <div class="container">\
        <div class="footer__social">\
          <a href="https://www.instagram.com/clegglewis/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">\
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">\
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>\
              <circle cx="12" cy="12" r="5"/>\
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>\
            </svg>\
          </a>\
          <a href="https://www.linkedin.com/in/lewis-clegg-5aa031200/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">\
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">\
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>\
              <rect x="2" y="9" width="4" height="12"/>\
              <circle cx="4" cy="4" r="2"/>\
            </svg>\
          </a>\
        </div>\
        <div class="footer__nav">\
          <a href="index.html#work">Work</a>\
          <a href="about.html">About</a>\
          <a href="mailto:hello@lewisclegg.com">Contact</a>\
        </div>\
        <p class="footer__copyright">&copy; ' + new Date().getFullYear() + ' Lewis Clegg</p>\
      </div>';
  }

  /* ------------------------------------------
     Navigation: scroll behaviour
  ------------------------------------------ */
  function initNavScroll() {
    var nav = document.getElementById('nav');
    if (!nav) return;

    var ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(function () {
          nav.classList.toggle('nav--scrolled', window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------
     Navigation: sliding indicator
  ------------------------------------------ */
  function initNavIndicator() {
    var navLinks = document.querySelector('.nav__links');
    if (!navLinks) return;

    var indicator = document.createElement('span');
    indicator.className = 'nav__indicator';
    navLinks.appendChild(indicator);

    var links = navLinks.querySelectorAll('.nav__link');
    var activeLink = navLinks.querySelector('.nav__link--active');

    function moveIndicator(el) {
      var rect = el.getBoundingClientRect();
      var parentRect = navLinks.getBoundingClientRect();
      indicator.style.left = (rect.left - parentRect.left) + 'px';
      indicator.style.width = rect.width + 'px';
    }

    if (activeLink) {
      indicator.style.transition = 'none';
      indicator.classList.add('nav__indicator--active');
      moveIndicator(activeLink);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          indicator.style.transition = '';
        });
      });
    }

    links.forEach(function (link) {
      link.addEventListener('mouseenter', function () {
        moveIndicator(link);
      });
    });

    navLinks.addEventListener('mouseleave', function () {
      if (activeLink) {
        moveIndicator(activeLink);
      } else {
        indicator.classList.remove('nav__indicator--active');
      }
    });

    window.addEventListener('resize', function () {
      var target = activeLink || links[0];
      if (target) moveIndicator(target);
    });
  }

  /* ------------------------------------------
     Navigation: mobile menu
  ------------------------------------------ */
  function initMobileMenu() {
    var btn = document.querySelector('.nav__menu-btn');
    var nav = document.getElementById('nav');
    if (!btn || !nav) return;

    btn.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('nav--open');
      btn.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('.nav__mobile-menu .nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav--open');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ------------------------------------------
     Navigation: contact smooth scroll
  ------------------------------------------ */
  function initContactLinks() {
    document.querySelectorAll('[data-contact]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.getElementById('contact');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
        var nav = document.getElementById('nav');
        if (nav) nav.classList.remove('nav--open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ------------------------------------------
     Theme toggle
  ------------------------------------------ */
  function initTheme() {
    var stored = localStorage.getItem('lc-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', theme);

    setTimeout(function () {
      document.querySelectorAll('.theme-toggle').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var current = document.documentElement.getAttribute('data-theme');
          var next = current === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', next);
          localStorage.setItem('lc-theme', next);
        });
      });
    }, 0);
  }

  /* ------------------------------------------
     Load projects data
  ------------------------------------------ */
  function loadProjects() {
    return fetch('projects.json')
      .then(function (res) { return res.json(); })
      .catch(function () {
        console.warn('Could not load projects.json');
        return [];
      });
  }

  /* ------------------------------------------
     Build an image element or placeholder
  ------------------------------------------ */
  function buildImage(src, alt, color, className) {
    var img = new Image();
    img.alt = alt || '';
    img.loading = 'lazy';
    img.className = (className || '') + ' img-reveal';

    img.onload = function () {
      img.classList.add('img-reveal--visible');
    };

    img.onerror = function () {
      var placeholder = document.createElement('div');
      placeholder.className = 'project-card__placeholder' + (className ? ' ' + className : '');
      placeholder.style.backgroundColor = color || 'var(--bg-alt)';
      placeholder.textContent = alt ? alt.charAt(0) : '';
      img.replaceWith(placeholder);
    };

    img.src = src;
    return img;
  }

  /* ------------------------------------------
     Homepage: render project cards
  ------------------------------------------ */
  function renderProjectCards(projects) {
    var grid = document.getElementById('project-grid');
    if (!grid) return;

    projects.forEach(function (project) {
      var card = document.createElement('a');
      card.href = 'project.html?slug=' + project.slug;
      card.className = 'project-card reveal';

      var imageWrap = document.createElement('div');
      imageWrap.className = 'project-card__image-wrap';
      var img = buildImage(project.thumbnail, project.title, project.color, 'project-card__image');
      imageWrap.appendChild(img);

      var title = document.createElement('span');
      title.className = 'project-card__title';
      title.textContent = project.title;

      card.appendChild(imageWrap);
      card.appendChild(title);

      grid.appendChild(card);
    });

    injectProjectsSchema(projects);
    initScrollReveal();
  }

  /* ------------------------------------------
     Project page: render single project
  ------------------------------------------ */
  function renderProjectPage(projects) {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get('slug');
    var content = document.getElementById('project-content');
    if (!slug || !content) return;

    var idx = -1;
    var project = null;
    for (var i = 0; i < projects.length; i++) {
      if (projects[i].slug === slug) {
        project = projects[i];
        idx = i;
        break;
      }
    }

    if (!project) {
      content.innerHTML = '<div class="container"><p>Project not found.</p></div>';
      return;
    }

    document.title = (project.seo_title || project.title) + ' — Lewis Clegg';

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', project.seo_description || project.description.split('\n')[0]);
    }

    // Open Graph
    var ogTitle = document.querySelector('meta[property="og:title"]');
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.setAttribute('content', (project.seo_title || project.title) + ' — Lewis Clegg');
    if (ogDesc) ogDesc.setAttribute('content', project.seo_description || project.description.split('\n\n')[0]);

    var layout = project.layout || 'single';
    var html = '<div class="container">';

    html += '<a href="index.html#work" class="project-back">';
    html += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>';
    html += 'Back to Work</a>';

    html += '<div class="project-header">';
    html += '<h1 class="project-header__title">' + project.title + '</h1>';
    html += '<div class="project-header__meta">';
    html += '<span class="project-header__subtitle">' + project.subtitle + '</span>';
    html += '<span class="project-header__divider" aria-hidden="true">/</span>';
    html += '<span class="project-header__year">' + project.year + '</span>';
    html += '</div></div>';

    // Description
    var paragraphs = project.description.split('\n\n');
    html += '<div class="project-description reveal">';
    paragraphs.forEach(function (p) {
      if (p.trim()) {
        html += '<p>' + p.trim() + '</p>';
      }
    });
    html += '</div>';

    // Gallery
    html += '<div class="project-gallery project-gallery--' + layout + '">';
    project.images.forEach(function (imgSrc, imgIdx) {
      html += '<div class="project-gallery__item reveal" data-img-src="' + imgSrc + '" data-img-color="' + (project.color || '') + '" data-img-alt="' + project.title + ' — image ' + (imgIdx + 1) + '"></div>';
    });
    html += '</div>';

    // Prev / Next
    var prevIdx = (idx - 1 + projects.length) % projects.length;
    var nextIdx = (idx + 1) % projects.length;
    var prev = projects[prevIdx];
    var next = projects[nextIdx];

    html += '<div class="project-next">';
    html += '<a href="project.html?slug=' + prev.slug + '" class="project-next__link project-next__link--prev">';
    html += '<p class="project-next__label">&larr; Previous</p>';
    html += '<span class="project-next__title">' + prev.title + '</span>';
    html += '</a>';
    html += '<a href="project.html?slug=' + next.slug + '" class="project-next__link project-next__link--next">';
    html += '<p class="project-next__label">Next &rarr;</p>';
    html += '<span class="project-next__title">' + next.title + '</span>';
    html += '</a>';
    html += '</div>';

    html += '</div>';
    content.innerHTML = html;

    // Insert gallery images
    content.querySelectorAll('[data-img-src]').forEach(function (el) {
      el.appendChild(buildImage(el.dataset.imgSrc, el.dataset.imgAlt, el.dataset.imgColor));
    });

    injectProjectSchema(project);
    initScrollReveal();
  }

  /* ------------------------------------------
     JSON-LD: ItemList for homepage
  ------------------------------------------ */
  function injectProjectsSchema(projects) {
    var schema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'Selected Work by Lewis Clegg',
      'numberOfItems': projects.length,
      'itemListElement': projects.map(function (p, i) {
        return {
          '@type': 'ListItem',
          'position': i + 1,
          'item': {
            '@type': 'CreativeWork',
            'name': p.title,
            'description': p.description.split('\n\n')[0],
            'dateCreated': p.year,
            'creator': {
              '@type': 'Person',
              'name': 'Lewis Clegg'
            },
            'keywords': (p.tags || []).join(', ')
          }
        };
      })
    };

    var el = document.getElementById('projects-schema');
    if (el) {
      el.textContent = JSON.stringify(schema);
    }
  }

  /* ------------------------------------------
     JSON-LD: CreativeWork for project page
  ------------------------------------------ */
  function injectProjectSchema(project) {
    var schema = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      'name': project.title,
      'description': project.description.split('\n\n')[0],
      'dateCreated': project.year,
      'creator': {
        '@type': 'Person',
        'name': 'Lewis Clegg',
        'jobTitle': 'Graphic Designer',
        'url': 'https://lewisclegg.co.uk',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Halifax',
          'addressRegion': 'West Yorkshire',
          'addressCountry': 'GB'
        },
        'sameAs': [
          'https://www.instagram.com/clegglewis/',
          'https://www.linkedin.com/in/lewis-clegg-5aa031200/'
        ]
      },
      'keywords': (project.tags || []).join(', ')
    };

    var el = document.getElementById('project-schema');
    if (el) {
      el.textContent = JSON.stringify(schema);
    }
  }

  /* ------------------------------------------
     Scroll reveal (IntersectionObserver)
  ------------------------------------------ */
  function initScrollReveal() {
    var elements = document.querySelectorAll('.reveal:not(.reveal--visible)');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) { el.classList.add('reveal--visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ------------------------------------------
     Initialise
  ------------------------------------------ */
  function init() {
    initTheme();
    injectNav();
    injectFooter();

    var projectGrid = document.getElementById('project-grid');
    var projectContent = document.getElementById('project-content');

    if (projectGrid || projectContent) {
      loadProjects().then(function (projects) {
        if (projectGrid) renderProjectCards(projects);
        if (projectContent) renderProjectPage(projects);
      });
    } else {
      initScrollReveal();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
