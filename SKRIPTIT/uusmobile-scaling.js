// SKRIPTIT/uusmobile-scaling.js
// Mobiiliskaalaus: napit allekkain + lyhyemmät mobiilissa

document.addEventListener('DOMContentLoaded', () => {
    function applyMobileScaling() {
        const isMobile = window.innerWidth <= 768;
        const buttonContainer = document.getElementById('photo-button-container');
        const buttons = document.querySelectorAll('#photo-button-container .btn');

        if (isMobile) {
            // Napit allekkain mobiilissa
            if (buttonContainer) {
                buttonContainer.style.flexDirection = 'column';
                buttonContainer.style.alignItems = 'center';
            }
            // Lyhennetään nappuloita
            buttons.forEach(btn => {
                btn.style.padding = '14px 28px';
                btn.style.fontSize = '1.05rem';
                btn.style.width = 'auto';
                btn.style.minWidth = '220px';   // Tasainen leveys allekkain
            });
        } else {
            // Palautetaan desktop-tila
            if (buttonContainer) {
                buttonContainer.style.flexDirection = '';
                buttonContainer.style.alignItems = '';
            }
            buttons.forEach(btn => {
                btn.style.padding = '';
                btn.style.fontSize = '';
                btn.style.width = '';
                btn.style.minWidth = '';
            });
        }
    }

    // Suorita heti ja kuuntele koon muutosta
    applyMobileScaling();
    window.addEventListener('resize', applyMobileScaling);
});
