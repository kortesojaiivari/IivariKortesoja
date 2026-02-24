(function (global) {
  'use strict';
  const DEFAULT_INTERVAL = 2500;
  const TRANSITION_MS = 500;
  const SAFETY_PX = 12;
  const RESIZE_DEBOUNCE_MS = 150;

  function copyFontStyles(sourceEl) {
    const cs = window.getComputedStyle(sourceEl);
    return [
      `font-style: ${cs.fontStyle}`,
      `font-variant: ${cs.fontVariant}`,
      `font-weight: ${cs.fontWeight}`,
      `font-stretch: ${cs.fontStretch}`,
      `font-size: ${cs.fontSize}`,
      `line-height: ${cs.lineHeight}`,
      `font-family: ${cs.fontFamily}`,
      `letter-spacing: ${cs.letterSpacing}`,
      `text-transform: ${cs.textTransform}`,
      `text-indent: ${cs.textIndent}`,
      `white-space: nowrap`,
    ].join('; ');
  }

  class DynamicTitle {
    constructor(element, options = {}) {
      if (!element) throw new Error('DynamicTitle: element is required');
      this.el = element;
      this.el._dynamicInstance = this;           // <-- mahdollistaa myöhemmän rebuildin
      this.interval = parseInt(options.interval || element.dataset.interval || DEFAULT_INTERVAL, 10);
      this.phrases = this._collectPhrases();
      this.current = 0;
      this.timer = null;
      this._reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this._onResizeDebounce = null;
      this._isBuilding = false;
      this._setup();
      this._start();

      this._resizeHandler = () => {
        clearTimeout(this._onResizeDebounce);
        this._onResizeDebounce = setTimeout(() => this.rebuild(), RESIZE_DEBOUNCE_MS);
      };
      window.addEventListener('resize', this._resizeHandler, { passive: true });

      this._orientationHandler = () => {
        clearTimeout(this._onResizeDebounce);
        this._onResizeDebounce = setTimeout(() => this.rebuild(), 300);
      };
      window.addEventListener('orientationchange', this._orientationHandler, { passive: true });
    }

    _collectPhrases() { /* sama kuin ennen */ 
      const childSpans = Array.from(this.el.querySelectorAll('span'));
      if (childSpans.length > 0) return childSpans.map(s => s.textContent.trim()).filter(Boolean);
      const raw = this.el.dataset.phrases;
      if (raw) {
        try { const parsed = JSON.parse(raw); if (Array.isArray(parsed)) return parsed.map(String); } catch (e) {}
        return raw.split(/\||,/).map(s => s.trim()).filter(Boolean);
      }
      const txt = this.el.textContent.trim();
      return txt ? [txt] : [];
    }

    _setup() {
      this.stop();
      // Aggressiivinen puhdistus – poistaa kaikki vanhat lapset
      while (this.el.firstChild) this.el.removeChild(this.el.firstChild);
      this.el.innerHTML = '';
      this.el.style.position = this.el.style.position || 'relative';
      this.el.style.overflow = 'visible';
      this.el.setAttribute('aria-live', 'polite');
      this.el.setAttribute('role', this.el.getAttribute('role') || 'status');
      this._buildDOM();
    }

    rebuild() {
      if (this._isBuilding) return;
      this._isBuilding = true;
      this.phrases = this._collectPhrases();
      this._cleanupSpans();
      this._setup();
      this._start();
      this._isBuilding = false;
    }

    _buildDOM() {
      if (!this.phrases || this.phrases.length === 0) return;
      let measure = null;
      try {
        measure = document.createElement('div');
        measure.style.cssText = 'position:absolute;left:-9999px;top:-9999px;visibility:hidden;white-space:nowrap;';
        measure.style.cssText += copyFontStyles(this.el);
        document.body.appendChild(measure);

        this._items = this.phrases.map(text => {
          const real = document.createElement('span');
          real.textContent = text;
          real.style.position = 'absolute';
          real.style.left = '50%';
          real.style.top = '50%';
          real.style.transform = 'translate(-50%,-50%)';
          real.style.whiteSpace = 'nowrap';
          real.style.pointerEvents = 'none';
          real.style.willChange = 'transform, opacity';
          real.style.transition = `opacity ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
          real.style.opacity = '0';
          real.style.backfaceVisibility = 'hidden';
          real.style.WebkitFontSmoothing = 'antialiased';

          const m = document.createElement('span');
          m.textContent = text;
          m.style.cssText = copyFontStyles(this.el);
          measure.appendChild(m);
          return { real, measured: m };
        });

        const heights = this._items.map(it => {
          const r = it.measured.getBoundingClientRect();
          return Math.max(0, r.height || 0);
        });
        const maxHeight = Math.max(...heights, 0) || parseFloat(window.getComputedStyle(this.el).fontSize) * 1.2;
        this._slidePx = Math.max(15, Math.round(maxHeight * 0.4));

        const minH = Math.ceil(maxHeight + this._slidePx + SAFETY_PX);
        this.el.style.minHeight = minH + 'px';

        const paddingBottom = Math.max(8, Math.round(minH * 0.08));
        const paddingTop = Math.max(4, Math.round(minH * 0.04));
        if (!this.el.style.paddingBottom) this.el.style.paddingBottom = paddingBottom + 'px';
        if (!this.el.style.paddingTop) this.el.style.paddingTop = paddingTop + 'px';

        this._items.forEach((it, i) => {
          const s = it.real;
          if (i === 0) {
            s.style.opacity = '1';
            s.style.transform = `translate(-50%,-50%) translateY(0px)`;
          } else {
            s.style.opacity = '0';
            s.style.transform = `translate(-50%,-50%) translateY(${this._slidePx}px)`;
          }
          this.el.appendChild(s);
        });

        if (this._reducedMotion) {
          this._items.forEach((it, i) => {
            it.real.style.transition = 'opacity 300ms ease';
            it.real.style.transform = 'translate(-50%,-50%)';
            it.real.style.opacity = i === 0 ? '1' : '0';
          });
        }
      } finally {
        if (measure && measure.parentNode) document.body.removeChild(measure);
      }
    }

    _start() { /* sama kuin ennen */ 
      if (!this._items || this._items.length <= 1) return;
      this.stop();
      if (this._reducedMotion) {
        this.timer = setInterval(() => {
          const prev = this.current;
          const next = (this.current + 1) % this._items.length;
          this._items[prev].real.style.opacity = '0';
          this._items[next].real.style.opacity = '1';
          this.current = next;
        }, this.interval);
        return;
      }
      this.timer = setInterval(() => this._tick(), this.interval);
    }

    _tick() { /* täysin sama kuin alkuperäisessä */ 
      const prev = this.current;
      const next = (this.current + 1) % this._items.length;
      const prevNode = this._items[prev].real;
      const nextNode = this._items[next].real;
      nextNode.style.transition = 'none';
      nextNode.style.opacity = '0';
      nextNode.style.transform = `translate(-50%,-50%) translateY(${this._slidePx}px)`;
      nextNode.offsetHeight;
      const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';
      nextNode.style.transition = `opacity ${TRANSITION_MS}ms ${easing}, transform ${TRANSITION_MS}ms ${easing}`;
      prevNode.style.transition = `opacity ${TRANSITION_MS}ms ${easing}, transform ${TRANSITION_MS}ms ${easing}`;
      requestAnimationFrame(() => {
        nextNode.style.opacity = '1';
        nextNode.style.transform = `translate(-50%,-50%) translateY(0px)`;
        prevNode.style.opacity = '0';
        prevNode.style.transform = `translate(-50%,-50%) translateY(-${this._slidePx}px)`;
      });
      setTimeout(() => {
        prevNode.style.transition = 'none';
        prevNode.style.opacity = '0';
        prevNode.style.transform = `translate(-50%,-50%) translateY(${this._slidePx}px)`;
        prevNode.offsetHeight;
        prevNode.style.transition = `opacity ${TRANSITION_MS}ms ${easing}, transform ${TRANSITION_MS}ms ${easing}`;
      }, TRANSITION_MS + 20);
      this.current = next;
    }

    stop() { if (this.timer) { clearInterval(this.timer); this.timer = null; } }
    _cleanupSpans() { if (this._items) { this._items.forEach(it => { if (it.measured && it.measured.parentNode) it.measured.parentNode.removeChild(it.measured); if (it.real && it.real.parentNode) it.real.parentNode.removeChild(it.real); }); } this._items = null; }
    destroy() { /* sama */ this.stop(); window.removeEventListener('resize', this._resizeHandler); window.removeEventListener('orientationchange', this._orientationHandler); this._cleanupSpans(); this.el.removeAttribute('aria-live'); this.el.removeAttribute('role'); this.el.style.position = ''; this.el.style.minHeight = ''; this.el.style.overflow = ''; this.el.style.paddingTop = ''; this.el.style.paddingBottom = ''; }

    static init(selectorOrNode, options = {}) { let el = selectorOrNode; if (typeof selectorOrNode === 'string') el = document.querySelector(selectorOrNode); if (!el) return null; return new DynamicTitle(el, options); }
    static initAll() { const nodes = Array.from(document.querySelectorAll('#dynamic-title, .dynamic-title, [data-dynamic-title]')); return nodes.map(n => new DynamicTitle(n)); }
  }

  // Auto-init + pakotettu rebuild täyden latauksen jälkeen (korjaa mobiilin puolilatausongelma)
  function autoInit() {
    DynamicTitle.initAll();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  // Pakotettu uudelleenrakennus kun kaikki resurssit (fontit, kuvat) ovat valmiit
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.querySelectorAll('#dynamic-title').forEach(el => {
        if (el._dynamicInstance) el._dynamicInstance.rebuild();
      });
    }, 80);
  });

  global.DynamicTitle = DynamicTitle;
})(window);
