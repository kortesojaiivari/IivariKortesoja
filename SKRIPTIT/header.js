(function(){
  // Kieli: /en/-polulla englanti, muuten suomi. FI/EN-vaihtaja vie vastinsivulle.
  const path = window.location.pathname;
  const isEN = /^\/en(\/|$)/.test(path);
  const PAGES = ['index.html','varaa-tuotanto.html','Valokuvaus.html','Yhteystiedot.html'];
  function counterpart(){
    let file = path.replace(/^\/en(\/|$)/,'/').replace(/^\//,'');
    if (file === '' ) file = 'index.html';
    if (file === 'keskenkotisivu.html') file = 'index.html';
    if (file === 'keskenlisatietoja.html') file = 'varaa-tuotanto.html';
    const known = PAGES.indexOf(decodeURIComponent(file)) !== -1;
    if (isEN) return '/' + (known ? file : '');
    return '/en/' + (known ? file : '');
  }
  const P = isEN ? '/en' : '';
  const L = isEN
    ? {aria:'Site navigation', home:'Home', book:'Book a production', photo:'Photography', contact:'Contact', sw:'Language'}
    : {aria:'Sivun navigaatio', home:'Koti', book:'Varaa tuotanto', photo:'Valokuvaus', contact:'Yhteystiedot', sw:'Kieli'};
  const other = counterpart();
  const headerHTML = `
    <header id="site-header" role="banner" aria-label="${L.aria}">
      <nav aria-label="${L.aria}">
        <a href="${P}/index.html">${L.home}</a>
        <a href="${P}/varaa-tuotanto.html">${L.book}</a>
        <a href="${P}/Valokuvaus.html">${L.photo}</a>
        <a href="${P}/Yhteystiedot.html">${L.contact}</a>
      </nav>
      <div class="lang-switch" role="group" aria-label="${L.sw}">
        ${isEN ? `<a href="${other}" hreflang="fi" lang="fi">FI</a>` : `<span class="on" aria-current="true">FI</span>`}
        <span class="sep" aria-hidden="true">|</span>
        ${isEN ? `<span class="on" aria-current="true">EN</span>` : `<a href="${other}" hreflang="en" lang="en">EN</a>`}
      </div>
    </header>
  `;

  const styleText = `
    /* Shared header styles injected by SKRIPTIT/header.js */
    #site-header{
      background:rgba(0,0,0,0.95);
      padding:12px 20px;
      text-align:center;
      position:fixed;
      width:100%;
      top:0;
      left:0;
      z-index:1000;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      box-sizing:border-box;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                  padding 0.3s ease,
                  background 0.3s ease;
      will-change: transform;
    }
    
    /* Hide header when scrolling down */
    #site-header.hidden{
      transform: translateY(-100%);
    }
    
    /* Show header when scrolling up */
    #site-header.visible{
      transform: translateY(0);
    }
    
    #site-header nav{
      display:inline-block;
    }
    
    #site-header nav a{
      color:#fff;
      text-decoration:none;
      margin:0 15px;
      font-size:1.15rem;
      position:relative;
      transition:color .25s ease;
      font-weight: inherit;
      letter-spacing:0.2px;
      display:inline-block;
    }
    
    /* Green underline on hover */
    #site-header nav a::after{
      content:'';
      position:absolute;
      bottom:-6px;
      left:50%;
      transform:translateX(-50%);
      width:0;
      height:2px;
      background:#4ade80;
      transition:width .28s ease;
    }
    
    #site-header nav a:hover{
      color:#4ade80;
    }
    
    #site-header nav a:hover::after{
      width:100%;
    }

    /* Tablet */
    @media(max-width:1024px){
      #site-header{
        padding:11px 18px;
      }
      #site-header nav a{
        margin:0 13px;
        font-size:1.1rem;
      }
    }

    /* Mobile - TWO ROWS for better spacing */
    @media(max-width:768px){
      #site-header{
        padding:10px 16px 12px;
        background:rgba(0,0,0,0.98);
      }
      #site-header nav{
        display:grid;
        grid-template-columns:1fr 1fr;
        grid-template-rows:auto auto;
        gap:10px 16px;
        max-width:500px;
        margin:0 auto;
      }
      #site-header nav a{
        margin:0;
        font-size:1.1rem;
        padding:10px 16px;
        min-height:46px;
        display:flex;
        align-items:center;
        justify-content:center;
        background:rgba(255,255,255,0.05);
        border-radius:8px;
        transition:all .25s ease;
      }
      #site-header nav a:hover,
      #site-header nav a:active{
        background:rgba(74,222,128,0.15);
        color:#4ade80;
      }
      #site-header nav a::after{
        display:none; /* Remove underline on mobile, use background instead */
      }
    }
    
    /* Extra small mobile - still two rows */
    @media(max-width:480px){
      #site-header{
        padding:8px 12px 10px;
      }
      #site-header nav{
        gap:8px 12px;
        max-width:100%;
      }
      #site-header nav a{
        font-size:1.05rem;
        padding:8px 12px;
        min-height:44px;
      }
    }
    
    /* Very small screens - stack vertically if needed */
    @media(max-width:360px){
      #site-header nav{
        grid-template-columns:1fr;
        gap:8px;
      }
      #site-header nav a{
        font-size:1rem;
      }
    }


    /* FI | EN -kielivalitsin */
    #site-header .lang-switch{position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:.95rem;letter-spacing:.5px;color:#777;display:flex;align-items:center;gap:6px}
    #site-header .lang-switch a{color:#bbb;text-decoration:none;padding:2px 4px;border-radius:4px;transition:color .25s ease}
    #site-header .lang-switch a:hover{color:#4ade80}
    #site-header .lang-switch .on{color:#4ade80;font-weight:700;padding:2px 4px}
    #site-header .lang-switch .sep{color:#555}
    @media(max-width:1100px){
      #site-header .lang-switch{position:static;transform:none;justify-content:center;margin-top:8px;font-size:.9rem}
    }

    /* Fallback classes */
    .has-shared-header{
      /* This class is set dynamically if content needs offset */
    }
  `;

  // Inject style once
  if (!document.getElementById('shared-header-styles')) {
    const s = document.createElement('style');
    s.id = 'shared-header-styles';
    s.textContent = styleText;
    document.head.appendChild(s);
  }

  // Scroll management variables
  let lastScrollY = 0;
  let ticking = false;
  const scrollThreshold = 10; // minimum scroll distance to trigger hide/show

  function handleScroll() {
    const headerEl = document.getElementById('site-header');
    if (!headerEl) return;

    const currentScrollY = window.pageYOffset || window.scrollY;

    // At top of page - always show
    if (currentScrollY < 10) {
      headerEl.classList.remove('hidden');
      headerEl.classList.add('visible');
      lastScrollY = currentScrollY;
      return;
    }

    // Check scroll direction
    const scrollDifference = currentScrollY - lastScrollY;

    if (Math.abs(scrollDifference) < scrollThreshold) {
      // Not scrolled enough to trigger change
      return;
    }

    if (scrollDifference > 0) {
      // Scrolling down - hide header
      headerEl.classList.add('hidden');
      headerEl.classList.remove('visible');
    } else {
      // Scrolling up - show header
      headerEl.classList.remove('hidden');
      headerEl.classList.add('visible');
    }

    lastScrollY = currentScrollY;
  }

  function requestScrollTick() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  function injectHeader(){
    if (document.getElementById('site-header')) return;

    // Insert header as first element in body
    const container = document.createElement('div');
    container.innerHTML = headerHTML;
    const headerEl = container.firstElementChild;
    document.body.insertBefore(headerEl, document.body.firstChild);

    // Initialize scroll position
    lastScrollY = window.pageYOffset || window.scrollY;

    // Start with header visible
    headerEl.classList.add('visible');

    // After header is in DOM, compute its height and decide padding
    requestAnimationFrame(() => {
      const headerRect = headerEl.getBoundingClientRect();
      const headerH = Math.ceil(headerRect.height) || 64;

      const next = headerEl.nextElementSibling;
      const shouldAddPadding = !(next && (next.id === 'home' || next.classList.contains('hero') || next.classList.contains('video-hero')));

      // Remove any previously set inline padding to avoid accumulation
      document.documentElement.style.paddingTop = '';
      document.body.style.paddingTop = '';

      if (shouldAddPadding) {
        document.documentElement.style.paddingTop = headerH + 'px';
        document.body.style.paddingTop = headerH + 'px';
        document.documentElement.classList.add('has-shared-header');
        document.body.classList.add('has-shared-header');
      } else {
        document.documentElement.classList.remove('has-shared-header');
        document.body.classList.remove('has-shared-header');
        document.documentElement.style.paddingTop = '';
        document.body.style.paddingTop = '';
      }
    });

    // Attach scroll listener
    window.addEventListener('scroll', requestScrollTick, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHeader);
  } else {
    injectHeader();
  }

  // Re-evaluate on resize (header height could change)
  window.addEventListener('resize', function(){
    const headerEl = document.getElementById('site-header');
    if (!headerEl) return;
    
    clearTimeout(window.__sharedHeaderResizeTimer);
    window.__sharedHeaderResizeTimer = setTimeout(() => {
      const headerRect = headerEl.getBoundingClientRect();
      const headerH = Math.ceil(headerRect.height) || 64;
      const next = headerEl.nextElementSibling;
      const shouldAddPadding = !(next && (next.id === 'home' || next.classList.contains('hero') || next.classList.contains('video-hero')));
      
      if (shouldAddPadding) {
        document.documentElement.style.paddingTop = headerH + 'px';
        document.body.style.paddingTop = headerH + 'px';
        document.documentElement.classList.add('has-shared-header');
        document.body.classList.add('has-shared-header');
      } else {
        document.documentElement.style.paddingTop = '';
        document.body.style.paddingTop = '';
        document.documentElement.classList.remove('has-shared-header');
        document.body.classList.remove('has-shared-header');
      }
      
      // Reset scroll tracking on resize
      lastScrollY = window.pageYOffset || window.scrollY;
    }, 120);
  }, { passive: true });

})();
