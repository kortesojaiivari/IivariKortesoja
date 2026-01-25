(function(){
  // Header HTML — muokkaa linkkejä tarvittaessa
  const headerHTML = `
    <header id="site-header" role="banner">
      <nav>
        <a href="indexi.html">Koti</a>
        <a href="portfolio.html">Portfolio</a>
        <a href="yhteystiedot.html">Yhteystiedot</a>
        <a href="valokuvaus.html">Valokuvaus</a>
        <a href="puolustusvoimat.html">Puolustusvoimat</a>
      </nav>
    </header>
  `;

  // Yhteinen header-tyyli: font-weight changed to normal (400) to remove bolding
  const styleText = `
    /* Shared header styles injected by SKRIPTIT/header.js */
    #site-header{
      background:#000;
      padding:15px 20px;
      text-align:center;
      position:fixed;
      width:100%;
      top:0;
      z-index:1000;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
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
      font-weight:400; /* normal weight (not bold) */
      letter-spacing:0.2px;
    }
    /* vihreä aliiviinaus/underline efektin säilytys hoverissa */
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

    /* Responsiivisuus: pienemmillä näytöillä tiiviimpi marginaali */
    @media(max-width:768px){
      #site-header nav a{
        margin:0 10px;
        font-size:1rem;
      }
    }

    /* Lisää body-top-paddingia jotta fixed-header ei peitä sisältöä */
    .has-shared-header{
      padding-top:64px !important; /* säädä tarvittaessa; header-korkeus ~64px */
    }
    @media(max-width:768px){
      .has-shared-header{ padding-top:72px !important; }
    }
  `;

  // Inject style only once
  if (!document.getElementById('shared-header-styles')) {
    const s = document.createElement('style');
    s.id = 'shared-header-styles';
    s.textContent = styleText;
    document.head.appendChild(s);
  }

  // Inject header only once
  function injectHeader(){
    if (!document.getElementById('site-header')) {
      const container = document.createElement('div');
      container.innerHTML = headerHTML;
      // Lisää header body:n alkuun
      const first = document.body.firstChild;
      document.body.insertBefore(container.firstElementChild, first);
      // Lisää luokka body/html:lle jotta sisältö ei jää headerin alle
      document.documentElement.classList.add('has-shared-header');
      document.body.classList.add('has-shared-header');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHeader);
  } else {
    injectHeader();
  }
})();