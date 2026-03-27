// paikkakunta-redirect.js
// Muistaa paikkakunnan evästeeseen ja ohjaa automaattisesti pääsivulta alasivulle

(function () {
    // Eväste-funktiot
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // ────────────────────────────────────────────────
    // Päälogiikka
    // ────────────────────────────────────────────────
    const COOKIE_NAME = 'valokuvausPaikkakunta';
    const BASE_URL = 'https://www.iivarikortesoja.media/Valokuvaus/';
    const currentPath = window.location.pathname.toLowerCase();

    let savedPaikkakunta = getCookie(COOKIE_NAME);

    // Jos evästettä ei ole → yritä päätellä paikkakunta URL:sta JA allLocations-listasta
    if (!savedPaikkakunta) {
        let detected = 'muu';

        // Odotetaan hetki, että paikkakunta-dropdown.js on ehtinyt ladata allLocations
        // (käytännössä yleensä jo valmiina, mutta varmuuden vuoksi)
        setTimeout(() => {
            if (window.allLocations && Array.isArray(window.allLocations)) {
                const pathLower = currentPath.toLowerCase();

                for (const loc of window.allLocations) {
                    if (loc.value !== 'muu' && pathLower.includes(loc.value.toLowerCase())) {
                        detected = loc.value;
                        break;
                    }
                }

                if (detected !== 'muu') {
                    setCookie(COOKIE_NAME, detected, 30);
                    savedPaikkakunta = detected;
                }
            }

            // Nyt tarkistetaan uudelleenohjaus
            doRedirectIfNeeded();
        }, 300); // pieni viive varmuuden vuoksi

    } else {
        // Eväste oli jo → suoraan tarkistus
        doRedirectIfNeeded();
    }

    function doRedirectIfNeeded() {
        if (savedPaikkakunta && savedPaikkakunta !== 'muu') {
            // Ohjataan vain jos ollaan pää-Valokuvaus-sivulla
            if (
                currentPath === '/valokuvaus.html' ||
                currentPath === '/valokuvaus/' ||
                currentPath.endsWith('valokuvaus.html')
            ) {
                window.location.replace(BASE_URL + savedPaikkakunta + '.html');
            }
        }
    }

    // Dropdown-valinnan käsittely (jos halutaan käyttää samaa nimeä kuin ennen)
    window.saveAndRedirectPaikkakunta = function(value) {
        if (!value) return;
        setCookie(COOKIE_NAME, value, 30);

        let url = value === "muu"
            ? "https://www.iivarikortesoja.media/Valokuvaus.html"
            : `https://www.iivarikortesoja.media/Valokuvaus/${value}.html`;

        window.location.href = url;
    };
})();
