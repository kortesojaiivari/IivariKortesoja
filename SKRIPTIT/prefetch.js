(function(){
  'use strict';

  // Public API
  window.Prefetch = window.Prefetch || {};

  // Check if user has Save-Data enabled or is on a slow connection
  function shouldPrefetch() {
    // Check Save-Data header (if available via navigator.connection)
    if (navigator.connection && navigator.connection.saveData) {
      return false;
    }

    // Check network type - avoid prefetching on slow connections
    if (navigator.connection) {
      const effectiveType = navigator.connection.effectiveType;
      // Only prefetch on fast connections (4g or better)
      if (effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g') {
        return false;
      }
    }

    return true;
  }

  // List of resources to prefetch for valokuvaus page
  function getValokuvausResources() {
    const resources = [
      // Header video and poster
      'valokuvaus_otsikko.mp4',
      'VALOKUVAUS/valokuvaus-poster.webp',
      
      // About section images
      'VALOKUVAUS/valokuvaaja1.webp',
      'VALOKUVAUS/valokuvaaja2.webp',
      'VALOKUVAUS/valokuvaaja3.webp',
      
      // Gallery images (first few from each sequence)
      'VALOKUVAUS/Valokuvaus1.webp',
      'VALOKUVAUS/Valokuvaus2.webp',
      'VALOKUVAUS/Valokuvaus3.webp',
      'VALOKUVAUS/Valokuvaus4.webp',
      'VALOKUVAUS/Valokuvaus5.webp',
      'VALOKUVAUS/Valokuvaus6.webp',
      'VALOKUVAUS/Valokuvaus7.webp',
      'VALOKUVAUS/Valokuvaus8.webp',
      'VALOKUVAUS/Valokuvaus9.webp',
      'VALOKUVAUS/Valokuvaus10.webp',
      
      // QR code
      'QR.webp'
    ];
    
    return resources;
  }

  // Other media resources to prefetch
  function getOtherMediaResources() {
    return [
      // Home page video
      'tst_testi_footgae.mp4',
      
      // Portfolio images
      'IivariKortesoja1.webp',
      'IivariKortesoja2.webp',
      'IivariKortesoja3.webp',
      
      // Portfolio videos and posters
      'Ruutu1.mp4',
      'Ruutu3.mp4',
      'Ruutu5.mp4',
      
      // Other media
      '2000luvunkamera.mp4',
      'linkedin.webp'
    ];
  }

  // Try to use Cache API for prefetching
  function prefetchWithCacheAPI(urls) {
    if (!('caches' in window)) {
      return Promise.reject(new Error('Cache API not available'));
    }

    const cacheName = 'prefetch-cache-v1';
    
    return caches.open(cacheName).then(function(cache) {
      // Filter out already cached items to avoid unnecessary requests
      return cache.keys().then(function(keys) {
        const cachedUrls = keys.map(function(request) { return request.url; });
        const urlsToCache = urls.filter(function(url) {
          const fullUrl = new URL(url, window.location.origin).href;
          return !cachedUrls.some(function(cachedUrl) { return cachedUrl === fullUrl; });
        });
        
        if (urlsToCache.length === 0) {
          return Promise.resolve();
        }
        
        // Use addAll for batch caching
        return cache.addAll(urlsToCache).catch(function(err) {
          console.warn('Prefetch: Cache API addAll failed, will use fallback:', err);
          return Promise.reject(err);
        });
      });
    });
  }

  // Fallback: Use Image objects for images and fetch for videos
  function prefetchWithFallback(urls) {
    const promises = urls.map(function(url) {
      // Check if it's a video
      if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov')) {
        // Use fetch for videos
        return fetch(url, { mode: 'no-cors' })
          .then(function() {
            return { status: 'fulfilled', url: url };
          })
          .catch(function(err) {
            console.warn('Prefetch: Failed to fetch video:', url, err);
            return { status: 'rejected', url: url, error: err };
          });
      } else {
        // Use Image object for images
        return new Promise(function(resolve, reject) {
          const img = new Image();
          img.onload = function() { resolve({ status: 'fulfilled', url: url, img: img }); };
          img.onerror = function(err) { 
            console.warn('Prefetch: Failed to load image:', url);
            reject(new Error('Failed to load image: ' + url)); 
          };
          img.src = url;
        }).catch(function(err) {
          return { status: 'rejected', url: url, error: err };
        });
      }
    });
    
    return Promise.allSettled ? Promise.allSettled(promises) : Promise.all(promises);
  }

  // Main prefetch function
  function prefetchResources(urls) {
    if (!shouldPrefetch()) {
      console.log('Prefetch: Skipping due to Save-Data or slow connection');
      return Promise.resolve();
    }

    if (urls.length === 0) {
      return Promise.resolve();
    }

    console.log('Prefetch: Starting prefetch for', urls.length, 'resources');

    // Try Cache API first, fall back to Image/fetch
    return prefetchWithCacheAPI(urls).catch(function() {
      console.log('Prefetch: Using fallback method');
      return prefetchWithFallback(urls);
    }).then(function() {
      console.log('Prefetch: Completed');
    });
  }

  // Schedule prefetch using requestIdleCallback or setTimeout
  function schedulePrefetch(urls) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(function() {
        prefetchResources(urls);
      }, { timeout: 2000 });
    } else {
      setTimeout(function() {
        prefetchResources(urls);
      }, 1000);
    }
  }

  // Public API: Start prefetch manually
  window.Prefetch.start = function() {
    const allResources = getValokuvausResources().concat(getOtherMediaResources());
    schedulePrefetch(allResources);
  };

  // Auto-start only from home page (indexi.html)
  function autoStart() {
    // Check if we're on indexi.html
    const currentPath = window.location.pathname;
    const isHomePage = currentPath.endsWith('indexi.html') || 
                       currentPath.endsWith('indexi') || 
                       (currentPath === '/' || currentPath.endsWith('/'));
    
    if (isHomePage) {
      console.log('Prefetch: Auto-starting from home page');
      window.Prefetch.start();
    } else {
      console.log('Prefetch: Not on home page, skipping auto-start');
    }
  }

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoStart);
  } else {
    autoStart();
  }

})();
