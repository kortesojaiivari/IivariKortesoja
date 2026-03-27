// SKRIPTIT/cookie-consent.js
// Yhtenäinen evästebanneri kaikille sivuille – täysin sama toiminnallisuus kuin alkuperäisessä

document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');

    // Google Analytics consent (oletuksena denied)
    if (typeof gtag === 'function') {
        gtag('consent', 'default', {
            'analytics_storage': 'denied'
        });
    }

    // Näytetään banneri 5 sekunnin viiveellä (sama kuin alkuperäisessä)
    setTimeout(() => {
        if (!localStorage.getItem('cookiesAccepted')) {
            banner.style.display = 'flex';
            // Pieni viive transitionille
            setTimeout(() => banner.classList.add('show'), 30);
        }
    }, 5000);
});

// Hyväksy-nappi
window.acceptCookies = function() {
    localStorage.setItem('cookiesAccepted', 'true');
    
    // Microsoft Clarity – suostumus annetaan
    if (typeof clarityConsent === 'function') clarityConsent(true);
    
    // Google Analytics – sallitaan
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
    }

    const banner = document.getElementById('cookie-banner');
    banner.classList.remove('show');
    setTimeout(() => { banner.style.display = 'none'; }, 700);
};

// Hylkää-nappi
window.rejectCookies = function() {
    localStorage.setItem('cookiesAccepted', 'false');
    
    // Microsoft Clarity – suostumus evätään (tärkeä lisäys, jotta seuranta ei jatku)
    if (typeof clarityConsent === 'function') clarityConsent(false);

    const banner = document.getElementById('cookie-banner');
    banner.classList.remove('show');
    setTimeout(() => { banner.style.display = 'none'; }, 700);
};
