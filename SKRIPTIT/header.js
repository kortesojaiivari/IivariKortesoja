(function(){
  const headerHTML = `
    <header id="site-header" role="banner" aria-label="Sivun navigaatio">
      <nav>
        <a href="indexi.html">Koti</a>
        <a href="Yhteystiedot.html">Yhteystiedot</a>
        <a href="Valokuvaus.html">Valokuvaus</a>
        <a href="Puolustusvoimat.html">Puolustusvoimat</a>
      </nav>
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

    /* Tablet and below */
    @media(max-width:1024px){
      #site-header{
        padding:10px 16px;
      }
      #site-header nav a{
        margin:0 12px;
        font-size:1.05rem;
      }
    }

    /* Mobile - much thinner header */
    @media(max-width:768px){
      #site-header{
        padding:8px 12px;
        background:rgba(0,0,0,0.98);
      }
      #site-header nav{
        display:flex;
        justify-content:center;
        align-items:center;
        gap:8px;
      }
      #site-header nav a{
        margin:0 6px;
        font-size:0.95rem;
        padding:4px 8px;
      }
      #site-header nav a::after{
        bottom:-4px;
        height:1.5px;
      }
    }
    
    /* Extra small mobile - even thinner */
    @media(max-width:480px){
      #site-header{
        padding:6px 8px;
      }
      #site-header nav{
        gap:4px;
      }
      #site-header nav a{
        margin:0 4px;
        font-size:0.88rem;
        padding:3px 6px;
        letter-spacing:0;
      }
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
