// SKRIPTIT/cookie-consent.js
// Evästebanneri + Google Analytics + Microsoft Clarity -suostumus

document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');

    // Google Analytics consent (oletuksena denied)
    if (typeof gtag === 'function') {
        gtag('consent', 'default', {
            'analytics_storage': 'denied'
        });
    }

    // Näytetään banneri 5 sekunnin viiveellä
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

    // Clarity
    if (typeof clarityConsent === 'function') clarityConsent(true);

    // Google Analytics
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

    const banner = document.getElementById('cookie-banner');
    banner.classList.remove('show');
    setTimeout(() => { banner.style.display = 'none'; }, 700);
};
