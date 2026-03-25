// SKRIPTIT/uusi-mobile-scaling.js
// Uusi mobiiliskaalaus – portfolio 3x3 säilyy myös mobiilissa (ei turhaa liikkumistilaa)

document.addEventListener('DOMContentLoaded', () => {
    const changingGrid = document.getElementById('changing-grid');
    const staticGallery = document.querySelector('.static-gallery');

    function applyMobileScaling() {
        const isMobile = window.innerWidth <= 768;

        // Pääportfolio (#changing-grid)
        if (changingGrid) {
            if (isMobile) {
                changingGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                changingGrid.style.gap = '1.1rem';           // pienempi väli mobiilissa
            } else {
                changingGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                changingGrid.style.gap = '2.25rem';
            }
        }

        // 3x2 static-gallery
        if (staticGallery) {
            if (isMobile) {
                staticGallery.style.gridTemplateColumns = 'repeat(3, 1fr)';
                staticGallery.style.gap = '1.1rem';
            } else {
                staticGallery.style.gridTemplateColumns = 'repeat(3, 1fr)';
                staticGallery.style.gap = '2.25rem';
            }
        }
    }

    // Ensimmäinen ajo
    applyMobileScaling();

    // Päivitetään ikkunan koon muuttuessa
    window.addEventListener('resize', applyMobileScaling);
});
