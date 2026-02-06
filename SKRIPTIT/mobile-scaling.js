(function() {
  'use strict';

  /**
   * Mobile Scaling Script - PARANNETTU VERSIO
   * 
   * Parantaa mobiilikokemusta optimoimalla näkymän, kosketusalueet ja responsiivisuuden.
   * Tukee paremmin eri laitteita ja suuntauksia.
   */

  // Configuration constants
  const VIEWPORT_SETTINGS = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover';
  const MOBILE_BREAKPOINT = 768;
  const TABLET_BREAKPOINT = 1024;
  
  // Module-scoped variables
  let resizeTimeout = null;
  let orientationTimeout = null;
  let isInitialized = false;
  let lastWidth = window.innerWidth;

  // Enhanced mobile device detection
  function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isSmallScreen = window.innerWidth <= MOBILE_BREAKPOINT;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    
    return mobileRegex.test(userAgent) || (isSmallScreen && hasTouch) || isIOS;
  }

  // Check if device is tablet
  function isTabletDevice() {
    const width = window.innerWidth;
    return width > MOBILE_BREAKPOINT && width <= TABLET_BREAKPOINT && isMobileDevice();
  }

  // Adjust viewport for mobile devices
  function adjustMobileViewport() {
    if (!isMobileDevice()) {
      return;
    }

    // Find or create viewport meta tag
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }

    // Set optimized viewport settings
    viewportMeta.setAttribute('content', VIEWPORT_SETTINGS);

    // Add device class to body
    if (!isInitialized) {
      document.body.classList.add('mobile-device');
      if (isTabletDevice()) {
        document.body.classList.add('tablet-device');
      }
      injectMobileStyles();
      isInitialized = true;
    }
  }

  // Inject enhanced mobile-specific CSS
  function injectMobileStyles() {
    if (document.getElementById('mobile-scaling-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'mobile-scaling-styles';
    style.textContent = `
      /* Mobile Scaling Styles - Enhanced Version */
      
      /* Base mobile device styles */
      html.mobile-ready {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        text-size-adjust: 100%;
      }
      
      body.mobile-device {
        -webkit-tap-highlight-color: rgba(74, 222, 128, 0.2);
        -webkit-touch-callout: none;
        touch-action: manipulation;
      }
      
      /* Safe area insets for notched devices */
      @supports (padding: env(safe-area-inset-left)) {
        body.mobile-device {
          padding-left: env(safe-area-inset-left);
          padding-right: env(safe-area-inset-right);
        }
      }
      
      /* Improved touch targets for mobile */
      body.mobile-device a,
      body.mobile-device button,
      body.mobile-device .btn,
      body.mobile-device select {
        min-height: 44px;
        min-width: 44px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      
      /* Better spacing for mobile */
      @media (max-width: 768px) {
        body.mobile-device {
          padding: 0;
          margin: 0;
        }
        
        /* Full-width elements */
        body.mobile-device #site-header,
        body.mobile-device header,
        body.mobile-device footer,
        body.mobile-device #home {
          width: 100%;
          max-width: 100vw;
          margin-left: 0;
          margin-right: 0;
        }
        
        /* Content sections with padding */
        body.mobile-device section:not(#home),
        body.mobile-device .about-section,
        body.mobile-device .small-gallery,
        body.mobile-device .large-gallery,
        body.mobile-device #pricing,
        body.mobile-device #location-selector,
        body.mobile-device #final-contact {
          padding-left: max(16px, env(safe-area-inset-left, 0px));
          padding-right: max(16px, env(safe-area-inset-right, 0px));
        }
        
        /* Dynamic title mobile optimization */
        body.mobile-device #dynamic-title {
          padding-left: max(12px, env(safe-area-inset-left, 0px));
          padding-right: max(12px, env(safe-area-inset-right, 0px));
          overflow: visible;
        }
        
        body.mobile-device #dynamic-title span {
          max-width: 90vw;
          word-wrap: break-word;
          hyphens: auto;
        }
        
        /* Improved button container for mobile */
        body.mobile-device #photo-button-container {
          padding: 0 20px;
          gap: 14px;
        }
        
        body.mobile-device #photo-button-container .btn {
          width: 100%;
          max-width: 100%;
          padding: 15px 24px;
          font-size: 1.1rem;
        }
      }
      
      /* Extra small screens */
      @media (max-width: 480px) {
        body.mobile-device section:not(#home),
        body.mobile-device .about-section,
        body.mobile-device .small-gallery,
        body.mobile-device .large-gallery,
        body.mobile-device #pricing,
        body.mobile-device #location-selector,
        body.mobile-device #final-contact {
          padding-left: max(12px, env(safe-area-inset-left, 0px));
          padding-right: max(12px, env(safe-area-inset-right, 0px));
        }
        
        body.mobile-device #dynamic-title {
          padding-left: max(8px, env(safe-area-inset-left, 0px));
          padding-right: max(8px, env(safe-area-inset-right, 0px));
        }
        
        body.mobile-device #photo-button-container {
          padding: 0 15px;
        }
      }
      
      /* Tablet-specific adjustments */
      @media (min-width: 769px) and (max-width: 1024px) {
        body.tablet-device section:not(#home),
        body.tablet-device .about-section,
        body.tablet-device #pricing,
        body.tablet-device #location-selector {
          padding-left: max(24px, env(safe-area-inset-left, 0px));
          padding-right: max(24px, env(safe-area-inset-right, 0px));
        }
      }
      
      /* Landscape orientation optimizations */
      @media (max-height: 500px) and (orientation: landscape) {
        body.mobile-device #home {
          min-height: 100vh;
        }
        
        body.mobile-device #dynamic-title {
          margin-top: 40px;
          margin-bottom: 30px;
          padding-top: 20px;
          padding-bottom: 20px;
        }
      }
      
      /* Improved scrolling on iOS */
      @supports (-webkit-overflow-scrolling: touch) {
        body.mobile-device {
          -webkit-overflow-scrolling: touch;
        }
      }
      
      /* Better font rendering on mobile */
      body.mobile-device {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }
      
      /* Prevent horizontal scroll */
      body.mobile-device {
        overflow-x: hidden;
        max-width: 100vw;
      }
      
      /* Improve form elements on mobile */
      body.mobile-device input,
      body.mobile-device select,
      body.mobile-device textarea {
        font-size: 16px !important; /* Prevents iOS zoom on focus */
      }
      
      /* Better select dropdown for mobile */
      body.mobile-device #location-selector select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path fill="%234ade80" d="M6 9L1 4h10z"/></svg>');
        background-repeat: no-repeat;
        background-position: right 16px center;
        padding-right: 40px;
      }
    `;
    
    document.head.appendChild(style);
    document.documentElement.classList.add('mobile-ready');
  }

  // Handle orientation change
  function handleOrientationChange() {
    clearTimeout(orientationTimeout);
    orientationTimeout = setTimeout(() => {
      // Update device type classes
      if (isTabletDevice()) {
        document.body.classList.add('tablet-device');
      } else {
        document.body.classList.remove('tablet-device');
      }
      
      // Re-adjust viewport if width changed significantly
      const currentWidth = window.innerWidth;
      if (Math.abs(currentWidth - lastWidth) > 100) {
        adjustMobileViewport();
        lastWidth = currentWidth;
      }
    }, 300);
  }

  // Handle resize events
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const currentWidth = window.innerWidth;
      if (Math.abs(currentWidth - lastWidth) > 50) {
        adjustMobileViewport();
        lastWidth = currentWidth;
      }
    }, 200);
  }

  // Initialize mobile scaling
  function init() {
    adjustMobileViewport();
    
    // Store initial width
    lastWidth = window.innerWidth;
    
    // Listen for orientation changes and resizes
    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Handle iOS Safari viewport height changes
    if (isMobileDevice()) {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      window.addEventListener('resize', () => {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }, { passive: true });
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Cleanup on page unload
  window.addEventListener('unload', () => {
    clearTimeout(resizeTimeout);
    clearTimeout(orientationTimeout);
  });

})();
