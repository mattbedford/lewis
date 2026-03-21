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
    const header = document.getElementById('site-header');
    if (!header) return;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    header.innerHTML = `
      <nav class="nav" id="nav">
        <div class="nav__inner container">
          <a href="index.html" class="nav__logo" aria-label="Lewis Clegg — Home">LC</a>
          <div class="nav__right">
            <div class="nav__links">
              <a href="index.html#work" class="nav__link${currentPage === 'index.html' || currentPage === '' ? ' nav__link--active' : ''}">Work</a>
              <a href="about.html" class="nav__link${currentPage === 'about.html' ? ' nav__link--active' : ''}">About</a>
              <a href="#contact" class="nav__link" data-contact>Contact</a>
            </div>
            <button class="theme-toggle" aria-label="Toggle dark mode">
              <svg class="theme-toggle__sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
              <svg class="theme-toggle__moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </button>
            <button class="nav__menu-btn" aria-label="Open menu" aria-expanded="false">
              <span></span><span></span>
            </button>
          </div>
        </div>
        <div class="nav__mobile-menu">
          <a href="index.html#work" class="nav__link">Work</a>
          <a href="about.html" class="nav__link">About</a>
          <a href="#contact" class="nav__link" data-contact>Contact</a>
        </div>
      </nav>
    `;

    initNavScroll();
    initMobileMenu();
    initContactLinks();
  }

  /* ------------------------------------------
     Shared HTML: Footer
  ------------------------------------------ */
  function injectFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    footer.className = 'footer';
    footer.id = 'contact';
    footer.innerHTML = `
      <div class="footer__inner container">
        <div class="footer__grid">
          <div class="footer__col">
            <span class="footer__logo" aria-hidden="true">LC</span>
            <p>Lewis Clegg</p>
            <p>Graphic Designer</p>
          </div>
          <div class="footer__col">
            <h4>Location</h4>
            <p>Halifax</p>
            <p>United Kingdom</p>
          </div>
          <div class="footer__col">
            <h4>Get in touch</h4>
            <a href="mailto:hello@lewisclegg.com">hello@lewisclegg.com</a>
          </div>
          <div class="footer__col">
            <h4>Online</h4>
            <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div class="footer__bottom">
          <p>&copy; ${new Date().getFullYear()} Lewis Clegg. All rights reserved.</p>
        </div>
      </div>
    `;
  }

  /* ------------------------------------------
     Navigation: scroll behaviour
  ------------------------------------------ */
  function initNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    let ticking = false;
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
     Navigation: mobile menu
  ------------------------------------------ */
  function initMobileMenu() {
    const btn = document.querySelector('.nav__menu-btn');
    const nav = document.getElementById('nav');
    if (!btn || !nav) return;

    btn.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('nav--open');
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
        // Close mobile menu if open
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

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.theme-toggle');
      if (!btn) return;
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('lc-theme', next);
    });
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
      // Replace with coloured placeholder
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
    var countEl = document.getElementById('project-count');
    if (!grid) return;

    if (countEl) {
      var len = projects.length;
      countEl.textContent = '0' + len + ' Project' + (len !== 1 ? 's' : '');
    }

    projects.forEach(function (project, i) {
      var card = document.createElement('a');
      card.href = 'project.html?slug=' + project.slug;
      card.className = 'project-card reveal';

      var index = document.createElement('span');
      index.className = 'project-card__index';
      index.setAttribute('aria-hidden', 'true');
      index.textContent = '0' + (i + 1);

      var imageWrap = document.createElement('div');
      imageWrap.className = 'project-card__image-wrap';

      var img = buildImage(project.thumbnail, project.title, project.color, 'project-card__image');
      imageWrap.appendChild(img);

      var info = document.createElement('div');
      info.className = 'project-card__info';
      info.innerHTML =
        '<span class="project-card__title">' + project.title + '</span>' +
        '<span class="project-card__year">' + project.year + '</span>';

      var subtitle = document.createElement('p');
      subtitle.className = 'project-card__subtitle';
      subtitle.textContent = project.subtitle;

      var tags = document.createElement('div');
      tags.className = 'project-card__tags';
      project.tags.forEach(function (tag) {
        var t = document.createElement('span');
        t.className = 'project-card__tag';
        t.textContent = tag;
        tags.appendChild(t);
      });

      card.appendChild(index);
      card.appendChild(imageWrap);
      card.appendChild(info);
      card.appendChild(subtitle);
      card.appendChild(tags);

      grid.appendChild(card);
    });

    // Inject JSON-LD ItemList
    injectProjectsSchema(projects);

    // Init scroll reveals after cards are in DOM
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

    // Update page title
    document.title = project.title + ' — Lewis Clegg';

    // Update meta description
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', project.description.split('\n')[0]);
    }

    // Build page
    var html = '<div class="container">';
    html += '<a href="index.html#work" class="project-back">';
    html += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>';
    html += 'Selected Work</a>';

    html += '<div class="project-header">';
    html += '<h1 class="project-header__title">' + project.title + '</h1>';
    html += '<div class="project-header__meta">';
    html += '<span class="project-header__subtitle">' + project.subtitle + '</span>';
    html += '<span class="project-header__divider" aria-hidden="true">/</span>';
    html += '<span class="project-header__year">' + project.year + '</span>';
    html += '</div>';
    html += '<div class="project-header__tags">';
    project.tags.forEach(function (tag) {
      html += '<span class="project-card__tag">' + tag + '</span>';
    });
    html += '</div></div>';

    // Hero image
    html += '<div class="project-hero-image reveal" id="project-hero-img"></div>';

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
    html += '<div class="project-gallery">';
    project.images.forEach(function (imgSrc, imgIdx) {
      if (imgIdx === 0) return; // skip hero dupe
      html += '<div class="project-gallery__item reveal" data-img-src="' + imgSrc + '" data-img-color="' + (project.color || '') + '" data-img-alt="' + project.title + ' — image ' + (imgIdx + 1) + '"></div>';
    });
    html += '</div>';

    // Next project
    var nextIdx = (idx + 1) % projects.length;
    var next = projects[nextIdx];
    html += '<div class="project-next">';
    html += '<p class="project-next__label">Next Project</p>';
    html += '<a href="project.html?slug=' + next.slug + '" class="project-next__link">';
    html += '<span class="project-next__title">' + next.title + '</span>';
    html += '<p class="project-next__subtitle">' + next.subtitle + '</p>';
    html += '</a></div>';

    html += '</div>';
    content.innerHTML = html;

    // Insert hero image
    var heroWrap = document.getElementById('project-hero-img');
    if (heroWrap && project.images.length > 0) {
      heroWrap.appendChild(buildImage(project.images[0], project.title, project.color));
    }

    // Insert gallery images
    content.querySelectorAll('[data-img-src]').forEach(function (el) {
      el.appendChild(buildImage(el.dataset.imgSrc, el.dataset.imgAlt, el.dataset.imgColor));
    });

    // Inject CreativeWork schema
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
            'keywords': p.tags.join(', ')
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
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Halifax',
          'addressRegion': 'West Yorkshire',
          'addressCountry': 'GB'
        }
      },
      'keywords': project.tags.join(', ')
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

    // Determine page type and load data if needed
    var projectGrid = document.getElementById('project-grid');
    var projectContent = document.getElementById('project-content');

    if (projectGrid || projectContent) {
      loadProjects().then(function (projects) {
        if (projectGrid) renderProjectCards(projects);
        if (projectContent) renderProjectPage(projects);
      });
    } else {
      // Static pages (about, etc.) — just init reveals
      initScrollReveal();
    }
  }

  // Go
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
