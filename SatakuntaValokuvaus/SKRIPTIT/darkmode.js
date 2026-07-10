// Satakunta Valokuvaus - Dark Mode Script
// Erillinen skripti tumman tilan hallintaan

(function() {
    'use strict';
    
    const DARK_CLASS = 'dark-mode';
    const STORAGE_KEY = 'satakunta-dark-mode';
    
    // Luo tai hae toggle-nappi (jos ei ole HTML:ssä)
    function createToggleButton() {
        let toggle = document.getElementById('darkmode-toggle');
        if (!toggle) {
            toggle = document.createElement('button');
            toggle.id = 'darkmode-toggle';
            toggle.setAttribute('aria-label', 'Vaihda tumma/vaalea tila');
            toggle.style.cssText = `
                background: none;
                border: none;
                font-size: 1.6rem;
                cursor: pointer;
                padding: 0.4rem 0.6rem;
                border-radius: 50%;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #333;
            `;
            
            // Lisää navbarin loppuun jos löytyy
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.appendChild(toggle);
            } else {
                // Fallback: lisää bodyyn
                document.body.appendChild(toggle);
            }
        }
        return toggle;
    }
    
    function updateIcon(isDark) {
        const toggle = document.getElementById('darkmode-toggle');
        if (!toggle) return;
        
        if (isDark) {
            toggle.innerHTML = '☀️'; // Aurinko = vaihda vaaleaan
            toggle.title = 'Vaihda vaaleaan tilaan';
        } else {
            toggle.innerHTML = '🌙'; // Kuu = vaihda tummaan
            toggle.title = 'Vaihda tummaan tilaan';
        }
    }
    
    function applyDarkMode(isDark) {
        const html = document.documentElement;
        
        if (isDark) {
            html.classList.add(DARK_CLASS);
        } else {
            html.classList.remove(DARK_CLASS);
        }
        
        // Päivitä ikonit
        updateIcon(isDark);
        
        // Tallenna asetukset
        localStorage.setItem(STORAGE_KEY, isDark ? 'true' : 'false');
    }
    
    function toggleDarkMode() {
        const isCurrentlyDark = document.documentElement.classList.contains(DARK_CLASS);
        applyDarkMode(!isCurrentlyDark);
    }
    
    // Alustetaan
    function initDarkMode() {
        const toggle = createToggleButton();
        
        // Lataa tallennettu tila
        const savedMode = localStorage.getItem(STORAGE_KEY);
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        let shouldBeDark = false;
        
        if (savedMode !== null) {
            shouldBeDark = savedMode === 'true';
        } else {
            shouldBeDark = prefersDark;
        }
        
        applyDarkMode(shouldBeDark);
        
        // Klikkauskuuntelija
        toggle.addEventListener('click', toggleDarkMode);
        
        // Reagoi järjestelmän teemaan muutoksiin (jos ei tallennettu)
        if (savedMode === null && window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (localStorage.getItem(STORAGE_KEY) === null) {
                    applyDarkMode(e.matches);
                }
            });
        }
        
        console.log('%c[Satakunta Valokuvaus] Dark mode script ladattu', 'color:#888');
    }
    
    // Käynnistä kun DOM valmis
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDarkMode);
    } else {
        initDarkMode();
    }
    
    // Julkinen API
    window.SatakuntaDarkMode = {
        toggle: () => {
            const isDark = document.documentElement.classList.contains(DARK_CLASS);
            applyDarkMode(!isDark);
        },
        enable: () => applyDarkMode(true),
        disable: () => applyDarkMode(false)
    };
    
})();
