(function() {
  'use strict';

  /**
   * Mobile Scaling Script
   * 
   * Tämä skripti parantaa mobiilikokemusta lisäämällä pientä zoomia ja marginaaleja,
   * jotta sivusto ei ole täysin reunasta reunaan mobiililaitteilla.
   * 
   * The script detects mobile devices and adjusts viewport settings to provide
   * better spacing and zoom level for mobile displays.
   */

  // Configuration constants
  const VIEWPORT_SETTINGS = 'width=device-width, initial-scale=0.9, maximum-scale=1.5, user-scalable=yes';
  
  // Module-scoped timeout variable
  let resizeTimeout = null;

  // Mobile device detection
  function isMobileDevice() {
    // Check user agent
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    
    // Check screen size (mobile typically < 768px)
    const isSmallScreen = window.innerWidth <= 768;
    
    // Check touch capability
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    return mobileRegex.test(userAgent) || (isSmallScreen && hasTouch);
  }

  // Adjust viewport for mobile devices
  function adjustMobileViewport() {
    if (!isMobileDevice()) {
      return; // Not a mobile device, no adjustment needed
    }

    // Find existing viewport meta tag
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    
    if (!viewportMeta) {
      // Create viewport meta if it doesn't exist
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }

    // Adjust viewport settings for better mobile scaling
    // initial-scale=0.9 creates slight zoom out effect
    // maximum-scale=1.5 allows users to zoom in if needed
    // user-scalable=yes ensures users can zoom
    viewportMeta.setAttribute('content', VIEWPORT_SETTINGS);

    // Add mobile-specific body styling for better spacing
    injectMobileStyles();
  }

  // Inject mobile-specific CSS for better spacing
  function injectMobileStyles() {
    // Check if styles already injected
    if (document.getElementById('mobile-scaling-styles')) {
      return;
    }

    // Add mobile-device class to body for scoped styling
    document.body.classList.add('mobile-device');

    const style = document.createElement('style');
    style.id = 'mobile-scaling-styles';
    style.textContent = `
      /* Mobile scaling styles - injected by SKRIPTIT/mobile-scaling.js */
      @media (max-width: 768px) {
        /* Ensure html and body have no padding - keep full width for background elements */
        html, body.mobile-device {
          padding: 0 !important;
          margin: 0 !important;
        }

        /* Full-width elements (header, footer) should extend to viewport edges */
        body.mobile-device #site-header,
        body.mobile-device header,
        body.mobile-device footer {
          width: 100vw !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
          padding-left: max(20px, env(safe-area-inset-left, 0px)) !important;
          padding-right: max(20px, env(safe-area-inset-right, 0px)) !important;
        }

        /* Content sections get breathing room with padding */
        body.mobile-device section:not(#home) {
          padding-left: max(20px, env(safe-area-inset-left, 0px));
          padding-right: max(20px, env(safe-area-inset-right, 0px));
        }

        /* Home/hero sections should also be full width */
        body.mobile-device #home,
        body.mobile-device section#home {
          width: 100vw !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
      }

      /* Extra small screens (phones in portrait) */
      @media (max-width: 480px) {
        /* Maintain full width on small screens too */
        body.mobile-device {
          padding: 0 !important;
        }
      }
    `;
    
    document.head.appendChild(style);
  }

  // Re-check on orientation change or resize
  function handleOrientationChange() {
    // Debounce to avoid excessive calls
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(adjustMobileViewport, 200);
  }

  // Initialize mobile scaling
  function init() {
    adjustMobileViewport();
    
    // Listen for orientation changes and resizes
    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });
    window.addEventListener('resize', handleOrientationChange, { passive: true });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
