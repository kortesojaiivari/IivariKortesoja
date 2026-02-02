// skriptit/kesakampanja-popup.js
// Konfiguraatio - muuta näitä tarpeen mukaan

const popupEnabled = true;              // true = popup tulee näkyviin, false = ei tule
const delaySeconds = 5;                // kuinka monen sekunnin kuluttua popup ilmestyy
const popupHeightVh = 33;               // kuinka iso osa sivusta (prosentteina korkeudesta)

// ÄLÄ MUOKKAA ALLA OLEVAA ellei tiedä mitä tekee

if (popupEnabled) {
    // Luodaan popup-dynaamisesti
    const popup = document.createElement('div');
    popup.id = 'kampanja-popup';
    popup.style.cssText = `
        position: fixed;
        bottom: -${popupHeightVh}vh;
        left: 0;
        width: 100%;
        height: ${popupHeightVh}vh;
        background-color: #f8f9fa;
        border-top: 3px solid #333;
        box-shadow: 0 -4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: bottom 0.6s ease-out;
        font-family: system-ui, -apple-system, sans-serif;
    `;

    popup.innerHTML = `
        <div style="text-align: center; max-width: 900px; padding: 20px; color: #111;">
            <h2 style="margin: 0 0 12px; font-size: 2.1rem; color: #d32f2f;">Kesäkampanja käynnissä!</h2>
            <p style="font-size: 1.25rem; margin: 0 0 16px;">
                Kesään mahtuu vielä muutama valokuvauskeikka vapaana – varaa pian!
            </p>
            <p style="font-size: 1.1rem; margin: 0 0 20px;">
                Ota yhteyttä: iivari@esimerkki.fi | 040 123 4567
            </p>
            <button id="suljePopup" style="
                padding: 12px 32px;
                font-size: 1.1rem;
                background-color: #333;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
            ">Sulje ilmoitus</button>
        </div>
    `;

    document.body.appendChild(popup);

    // Näytetään popup delayn jälkeen
    setTimeout(() => {
        popup.style.bottom = '0';
    }, delaySeconds * 1000);

    // Sulje-nappi
    document.getElementById('suljePopup').addEventListener('click', () => {
        popup.style.bottom = `-${popupHeightVh}vh`;
        // Vaihtoehtoisesti voisi poistaa kokonaan: popup.remove();
    });
}
