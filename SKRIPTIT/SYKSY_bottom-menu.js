// SYKSY_bottom-menu.js
// Alapalkki Valokuvaus-sivulle - käyttää paikkakunta-dropdown.js:ää

const bottomMenuHTML = `
    <div id="bottom-menu" class="bottom-menu">
        <div class="bottom-menu-content">
            <nav class="bottom-service-nav">
                <a href="#" data-service="haat">Häät</a>
                <a href="#" data-service="hautajaiset">Hautajaiset</a>
                <a href="#" data-service="valmistujaiset">Valmistujaiset</a>
                <a href="#" data-service="tuntipaketit">Tuntipaketit</a>
            </nav>
            
            <div class="bottom-location">
                <span id="bottom-location-text">Paikkakunta: <strong>Muu Suomi</strong></span>
                <button id="bottom-change-location" class="bottom-change-btn">Vaihda paikkakunta</button>
            </div>
        </div>
    </div>
`;

const bottomMenuStyles = `
    .bottom-menu {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.96);
        backdrop-filter: blur(12px);
        z-index: 999;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.3);
        padding: 12px 0;
        height: 15vh;
        min-height: 85px;
        box-sizing: border-box;
    }

    .bottom-menu.shrunk {
        height: 10vh;
        min-height: 62px;
        padding: 8px 0;
    }

    .bottom-menu-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        height: 100%;
        flex-wrap: wrap;
        gap: 12px;
    }

    .bottom-service-nav a {
        color: white;
        text-decoration: none;
        margin: 0 12px;
        font-size: 1.18rem;
        font-weight: 600;
        transition: color 0.3s;
    }

    .bottom-service-nav a:hover,
    .bottom-service-nav a.active {
        color: #4ade80;
    }

    .bottom-location {
        display: flex;
        align-items: center;
        gap: 12px;
        color: white;
        font-size: 1.05rem;
        white-space: nowrap;
    }

    .bottom-change-btn {
        background: rgba(255,140,0,0.25);
        color: white;
        border: 1px solid rgba(255,160,60,0.6);
        padding: 8px 16px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.3s;
    }

    .bottom-change-btn:hover {
        background: rgba(255,140,0,0.5);
    }

    @media (max-width: 768px) {
        .bottom-menu { height: 14vh; min-height: 78px; }
        .bottom-menu.shrunk { height: 9.5vh; min-height: 58px; }
        .bottom-service-nav a { font-size: 1.05rem; margin: 0 8px; }
    }
`;

function initBottomMenu() {
    // Lisää tyylit
    if (!document.getElementById('bottom-menu-styles')) {
        const style = document.createElement('style');
        style.id = 'bottom-menu-styles';
        style.textContent = bottomMenuStyles;
        document.head.appendChild(style);
    }

    // Lisää HTML
    if (!document.getElementById('bottom-menu')) {
        const div = document.createElement('div');
        div.innerHTML = bottomMenuHTML;
        document.body.appendChild(div.firstElementChild);
    }

    const menu = document.getElementById('bottom-menu');
    const changeBtn = document.getElementById('bottom-change-location');

    // Scroll-käyttäytyminen (15% → 10%)
    let lastScrollY = window.scrollY;
    let ticking = false;

    function handleScroll() {
        const currentScroll = window.scrollY;

        if (currentScroll < 80) {
            menu.classList.remove('shrunk');
        } else if (currentScroll > lastScrollY) {
            menu.classList.add('shrunk');
        } else {
            menu.classList.remove('shrunk');
        }
        lastScrollY = currentScroll;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Vaihda paikkakunta -nappi käyttää olemassa olevaa dropdownia
    if (changeBtn) {
        changeBtn.addEventListener('click', () => {
            const selector = document.getElementById('location-selector');
            if (selector) {
                selector.style.display = (selector.style.display === 'none' || selector.style.display === '') ? 'block' : 'none';
            }
        });
    }

    // Palvelulinkit
    document.querySelectorAll('.bottom-service-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceId = link.dataset.service;
            const topBtn = document.querySelector(`.service-btn[data-service="${serviceId}"]`);
            if (topBtn) topBtn.click();
        });
    });

    // Päivitä paikkakuntateksti
    setTimeout(() => {
        if (typeof updateBottomLocationText === "function") updateBottomLocationText();
    }, 600);
}

function updateBottomLocationText() {
    const textEl = document.getElementById('bottom-location-text');
    if (!textEl) return;

    const path = window.location.pathname.toLowerCase();
    let city = "Muu Suomi";

    if (path.includes('/pori')) city = "Pori";
    else if (path.includes('/rauma')) city = "Rauma";
    else if (path.includes('/eura')) city = "Eura";
    // Lisää tarvittaessa muita

    textEl.innerHTML = `Paikkakunta: <strong>${city}</strong>`;
}

window.initBottomMenu = initBottomMenu;
