// paikkakunta-redirect.js
// Lopullinen versio: tallentaa paikkakunnan, redirectaa kerran pääsivulle palatessa, mutta sallii seuraavan käynnin ilman redirectiä

(function () {
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

    const COOKIE_NAME = 'valokuvausPaikkakunta';
    const BASE_URL = 'https://www.iivarikortesoja.media/Valokuvaus/';
    const currentPath = window.location.pathname.toLowerCase().trim();

    let savedPaikkakunta = getCookie(COOKIE_NAME);

    // Tarkistetaan onko kyseessä pää-Valokuvaus-sivu (ei alasivu)
    function isMainValokuvausPage() {
        return currentPath === '/valokuvaus.html' ||
               currentPath === '/valokuvaus/' ||
               currentPath.endsWith('/valokuvaus.html');
    }

    // Tallennetaan paikkakunta, jos ollaan alasivulla
    if (currentPath.includes('/valokuvaus/') && currentPath.endsWith('.html')) {
        const fileName = currentPath.split('/').pop().replace('.html', '');
        if (fileName && fileName !== 'valokuvaus' && fileName !== 'muu') {
            if (savedPaikkakunta !== fileName) {
                setCookie(COOKIE_NAME, fileName, 90); // 90 päivää
                savedPaikkakunta = fileName;
            }
        }
    }

    // Automaattinen redirect-logiikka
    if (savedPaikkakunta && savedPaikkakunta !== 'muu' && isMainValokuvausPage()) {
        
        // Tarkistetaan onko tämä "toinen kerta" (käytetään erillistä evästä)
        const hasVisitedMain = getCookie('valokuvausMainVisited');

        if (!hasVisitedMain) {
            // Ensimmäinen käynti pääsivulla → redirectataan alasivulle JA merkitään että on käyty
            setCookie('valokuvausMainVisited', 'true', 90);
            window.location.replace(BASE_URL + savedPaikkakunta + '.html');
            return;
        } else {
            // Toinen (tai seuraava) käynti pääsivulle → ei redirectiä, poistetaan väliaikainen merkki
            // (jotta seuraavalla kerralla redirect toimii taas kerran)
            document.cookie = "valokuvausMainVisited=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
    }

    // Dropdownin käsittely (yhteensopiva vanhan koodin kanssa)
    window.saveAndRedirectPaikkakunta = function(value) {
        if (!value) return;
        setCookie(COOKIE_NAME, value, 90);

        let url = value === "muu"
            ? "https://www.iivarikortesoja.media/Valokuvaus.html"
            : `https://www.iivarikortesoja.media/Valokuvaus/${value}.html`;

        window.location.href = url;
    };
})();
