// skriptit/kampanja-popup.js
// Konfiguraatio - muuta näitä tarpeen mukaan

const popupEnabled = true;              // true = popup tulee näkyviin, false = ei tule
const delaySeconds = 10;                // kuinka monen sekunnin kuluttua popup ilmestyy
const popupHeightVhDesktop = 33;        // desktop: alaosan korkeus
const popupHeightVhMobile  = 60;        // mobiili: keskellä isompi korkeus

// ÄLÄ MUOKKAA ALLA OLEVAA ellei tiedä mitä tekee

if (popupEnabled) {
    const popup = document.createElement('div');
    popup.id = 'kampanja-popup';
    
    // Alkutila
    popup.style.cssText = `
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        width: 94%;
        max-width: 700px;
        background-color: #f8f9fa;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: all 0.6s ease-out;
        opacity: 0;
        pointer-events: none;
        font-family: system-ui, -apple-system, sans-serif;
    `;

    // Mobiili vs desktop -asetukset
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
        // Mobiili: keskellä, fade + scale animaatio
        popup.style.top = '50%';
        popup.style.transform = 'translate(-50%, -50%) scale(0.8)';
        popup.style.height = 'auto';
        popup.style.maxHeight = `${popupHeightVhMobile}vh`;
        popup.style.overflowY = 'auto';
    } else {
        // Desktop: alaosasta slide-in
        popup.style.bottom = `-${popupHeightVhDesktop}vh`;
        popup.style.height = `${popupHeightVhDesktop}vh`;
        popup.style.top = 'auto';
        popup.style.transform = 'translateX(-50%)';
    }

    popup.innerHTML = `
        <div style="text-align: center; padding: 28px 20px; color: #111; width: 100%;">
            <h2 style="margin: 0 0 16px; font-size: ${isMobile ? '1.9rem' : '2.2rem'}; color: #2e7d32;">
                Kesäkampanja käynnissä!
            </h2>
            <p style="font-size: ${isMobile ? '1.15rem' : '1.3rem'}; margin: 0 0 20px; line-height: 1.45;">
                Kesään mahtuu vielä muutama valokuvauskeikka vapaana – varaa pian!
            </p>
            <p style="font-size: ${isMobile ? '1.05rem' : '1.15rem'}; margin: 0 0 24px;">
                Ota yhteyttä: iivari@esimerkki.fi | 040 123 4567
            </p>
            <button id="suljePopup" style="
                padding: 14px 40px;
                font-size: 1.15rem;
                background-color: #2e7d32;
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: background 0.2s;
            ">Sulje ilmoitus</button>
        </div>
    `;

    document.body.appendChild(popup);

    // Näytetään popup delayn jälkeen
    setTimeout(() => {
        popup.style.opacity = '1';
        popup.style.pointerEvents = 'auto';
        
        if (isMobile) {
            popup.style.transform = 'translate(-50%, -50%) scale(1)';
        } else {
            popup.style.bottom = '0';
        }
    }, delaySeconds * 1000);

    // Sulje-nappi
    document.getElementById('suljePopup').addEventListener('click', () => {
        if (isMobile) {
            popup.style.transform = 'translate(-50%, -50%) scale(0.8)';
        } else {
            popup.style.bottom = `-${popupHeightVhDesktop}vh`;
        }
        popup.style.opacity = '0';
        popup.style.pointerEvents = 'none';
        
        // Poistetaan elementti 700 ms animaation jälkeen (valinnainen)
        setTimeout(() => popup.remove(), 700);
    });

    // Päivitetään asettelua jos ikkunan kokoa muutetaan (esim. käännetään puhelin)
    window.addEventListener('resize', () => {
        const nowMobile = window.innerWidth < 768;
        if (nowMobile !== isMobile) {
            location.reload(); // yksinkertainen tapa – voi korvata dynaamisemmalla logiikalla
        }
    });
}
