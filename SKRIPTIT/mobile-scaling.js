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
    viewportMeta.setAttribute('content', 
      'width=device-width, initial-scale=0.9, maximum-scale=1.5, user-scalable=yes'
    );

    // Add mobile-specific body styling for better spacing
    injectMobileStyles();
  }

  // Inject mobile-specific CSS for better spacing
  function injectMobileStyles() {
    // Check if styles already injected
    if (document.getElementById('mobile-scaling-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'mobile-scaling-styles';
    style.textContent = `
      /* Mobile scaling styles - injected by SKRIPTIT/mobile-scaling.js */
      @media (max-width: 768px) {
        body {
          /* Add subtle horizontal padding on mobile for breathing room */
          padding-left: 4px !important;
          padding-right: 4px !important;
        }

        /* Ensure sections have proper spacing */
        section {
          padding-left: max(20px, env(safe-area-inset-left, 0px)) !important;
          padding-right: max(20px, env(safe-area-inset-right, 0px)) !important;
        }

        /* Respect safe areas for notched devices */
        #site-header,
        header {
          padding-left: max(20px, env(safe-area-inset-left, 0px)) !important;
          padding-right: max(20px, env(safe-area-inset-right, 0px)) !important;
        }
      }

      /* Extra small screens (phones in portrait) */
      @media (max-width: 480px) {
        body {
          padding-left: 6px !important;
          padding-right: 6px !important;
        }
      }
    `;
    
    document.head.appendChild(style);
  }

  // Re-check on orientation change or resize
  function handleOrientationChange() {
    // Debounce to avoid excessive calls
    clearTimeout(window.__mobileScalingTimeout);
    window.__mobileScalingTimeout = setTimeout(adjustMobileViewport, 200);
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
