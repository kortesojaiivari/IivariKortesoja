// SKRIPTIT/uusmobile-scaling.js
// Mobiiliskaalaus + nappuloiden lyhentäminen Valokuvaus-sivulla

document.addEventListener('DOMContentLoaded', () => {
    function applyMobileScaling() {
        const isMobile = window.innerWidth <= 768;
        
        // Lyhennetään "Varaa kuvaus" ja muut napit mobiilissa
        const buttons = document.querySelectorAll('#photo-button-container .btn');
        buttons.forEach(btn => {
            if (isMobile) {
                btn.style.padding = '14px 24px';
                btn.style.fontSize = '1.05rem';
            } else {
                btn.style.padding = '';      // Palautetaan alkuperäinen CSS
                btn.style.fontSize = '';
            }
        });
    }

    // Suorita heti latauksen jälkeen
    applyMobileScaling();

    // Päivitä skaalaus kun ikkunan kokoa muutetaan (esim. laitteen kääntö)
    window.addEventListener('resize', applyMobileScaling);
});
