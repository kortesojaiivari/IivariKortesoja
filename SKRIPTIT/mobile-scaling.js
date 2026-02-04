(function() {
  'use strict';

  function isMobileDevice() {
    return window.innerWidth <= 768 && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }

  function injectMobileStyles() {
    if (document.getElementById('mobile-scaling-styles')) return;
    if (!isMobileDevice()) return;

    document.body.classList.add('mobile-device');

    const style = document.createElement('style');
    style.id = 'mobile-scaling-styles';
    style.textContent = `
      @media (max-width: 768px) {
        html, body.mobile-device {
          padding: 0 !important;
          margin: 0 !important;
          width: 100%;
          overflow-x: hidden;
        }
        body.mobile-device #site-header,
        body.mobile-device header,
        body.mobile-device footer,
        body.mobile-device #home {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
          padding-left: max(16px, env(safe-area-inset-left));
          padding-right: max(16px, env(safe-area-inset-right));
        }
        body.mobile-device section:not(#home) {
          padding-left: max(16px, env(safe-area-inset-left));
          padding-right: max(16px, env(safe-area-inset-right));
        }
      }
      @media (max-width: 480px) {
        body.mobile-device {
          font-size: 15px; /* pieni lisäapu lukukokoon */
        }
      }
    `;
    document.head.appendChild(style);
  }

  function init() {
    injectMobileStyles();
    // Ei resize/ori-kuuntelijaa enää → ei nykimistä
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
