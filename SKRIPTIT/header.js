(function(){
  const headerHTML = `
    <header id="site-header" role="banner" aria-label="Sivun navigaatio">
      <nav>
        <a href="indexi.html">Koti</a>
        <a href="yhteystiedot.html">Yhteystiedot</a>
        <a href="Valokuvaus.html">Valokuvaus</a>
        <a href="puolustusvoimat.html">Puolustusvoimat</a>
      </nav>
    </header>
  `;

  const styleText = `
    /* Shared header styles injected by SKRIPTIT/header.js */
    #site-header{
      background:#000;
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
    }
    #site-header nav{
      display:inline-block;
    }
    /* Do not force a specific font-family or weight here — inherit from page */
    #site-header nav a{
      color:#fff;
      text-decoration:none;
      margin:0 15px;
      font-size:1.15rem;
      position:relative;
      transition:color .25s ease;
      font-weight: inherit; /* inherit sivun font-weight - palauttaa alkuperäisen fontin käytön */
      letter-spacing:0.2px;
    }
    /* vihreä alaviivaus hoverissa */
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

    @media(max-width:768px){
      #site-header nav a{
        margin:0 10px;
        font-size:1rem;
      }
    }

    /* fallback classes; these may be toggled by script */
    .has-shared-header{
      /* tämä luokka asetetaan dynaamisesti vain jos tarvitaan siirtoa sisällölle */
    }
  `;

  // Inject style once
  if (!document.getElementById('shared-header-styles')) {
    const s = document.createElement('style');
    s.id = 'shared-header-styles';
    s.textContent = styleText;
    document.head.appendChild(s);
  }

  function injectHeader(){
    if (document.getElementById('site-header')) return;

    // Insert header as first element in body
    const container = document.createElement('div');
    container.innerHTML = headerHTML;
    const headerEl = container.firstElementChild;
    document.body.insertBefore(headerEl, document.body.firstChild);

    // After header is in DOM, compute its height and decide padding
    // If the element immediately after header is the hero/video (#home), DO NOT add top padding.
    // Otherwise add padding equal to header height so content is not hidden under fixed header.
    requestAnimationFrame(() => {
      const headerRect = headerEl.getBoundingClientRect();
      const headerH = Math.ceil(headerRect.height) || 64;

      const next = headerEl.nextElementSibling;
      const shouldAddPadding = !(next && (next.id === 'home' || next.classList.contains('hero') || next.classList.contains('video-hero')));

      // Remove any previously set inline padding to avoid accumulation
      document.documentElement.style.paddingTop = '';
      document.body.style.paddingTop = '';

      if (shouldAddPadding) {
        // set padding on documentElement and body to be safe across stylesheets
        document.documentElement.style.paddingTop = headerH + 'px';
        document.body.style.paddingTop = headerH + 'px';
        // add a class for visibility if needed by other CSS
        document.documentElement.classList.add('has-shared-header');
        document.body.classList.add('has-shared-header');
      } else {
        // Ensure no extra padding remains so header sits flush with hero/video
        document.documentElement.classList.remove('has-shared-header');
        document.body.classList.remove('has-shared-header');
        document.documentElement.style.paddingTop = '';
        document.body.style.paddingTop = '';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHeader);
  } else {
    injectHeader();
  }

  // Also re-evaluate on resize (header height could change)
  window.addEventListener('resize', function(){
    const headerEl = document.getElementById('site-header');
    if (!headerEl) return;
    // debounce quick resizes
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
    }, 120);
  });
})();
