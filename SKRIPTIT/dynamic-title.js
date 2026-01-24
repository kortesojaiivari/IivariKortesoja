(function (global) {
  'use strict';

  const DEFAULT_INTERVAL = 3000; // ms
  const TRANSITION_MS = 600;     // ms
  const SAFETY_PX = 8;           // extra space to avoid clipping
  const RESIZE_DEBOUNCE_MS = 200;

  function copyFontStyles(sourceEl) {
    const cs = window.getComputedStyle(sourceEl);
    // copy key font related properties so offscreen measurement matches
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
      this.interval = parseInt(options.interval || element.dataset.interval || DEFAULT_INTERVAL, 10);
      this.phrases = this._collectPhrases();
      this.current = 0;
      this.timer = null;
      this._reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this._onResizeDebounce = null;

      this._setup();
      this._start();

      // Recalculate sizes on resize (debounced)
      this._resizeHandler = () => {
        clearTimeout(this._onResizeDebounce);
        this._onResizeDebounce = setTimeout(() => this.rebuild(), RESIZE_DEBOUNCE_MS);
      };
      window.addEventListener('resize', this._resizeHandler, { passive: true });
    }

    _collectPhrases() {
      const childSpans = Array.from(this.el.querySelectorAll('span'));
      if (childSpans.length > 0) {
        return childSpans.map(s => s.textContent.trim()).filter(Boolean);
      }
      const raw = this.el.dataset.phrases;
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) return parsed.map(String);
        } catch (e) {
          return raw.split(/\||,/).map(s => s.trim()).filter(Boolean);
        }
      }
      const txt = this.el.textContent.trim();
      return txt ? [txt] : [];
    }

    _setup() {
      // clear any existing content/state
      this.stop();
      this.el.innerHTML = '';
      this.el.style.position = this.el.style.position || 'relative';
      this.el.style.overflow = 'hidden';
      this.el.setAttribute('aria-live', 'polite');
      this.el.setAttribute('role', this.el.getAttribute('role') || 'status');

      // create DOM and compute sizes
      this._buildDOM();
    }

    rebuild() {
      // Re-read phrases in case someone changed DOM (not typical)
      this.phrases = this._collectPhrases();
      // teardown nodes
      this._cleanupSpans();
      this._setup();
      this._start();
    }

    _buildDOM() {
      if (!this.phrases || this.phrases.length === 0) return;

      // Offscreen measurement div
      const measure = document.createElement('div');
      measure.style.cssText = 'position:absolute;left:-9999px;top:-9999px;visibility:hidden;white-space:nowrap;';
      // copy font styles from container to measurement context
      measure.style.cssText += copyFontStyles(this.el);
      document.body.appendChild(measure);

      // Create measured clones and real spans list
      this._items = this.phrases.map(text => {
        const real = document.createElement('span');
        real.textContent = text;
        // base styles for real spans
        real.style.position = 'absolute';
        real.style.left = '50%';
        real.style.top = '50%';
        real.style.transform = 'translate(-50%,-50%)';
        real.style.whiteSpace = 'nowrap';
        real.style.pointerEvents = 'none';
        real.style.willChange = 'transform, opacity';
        real.style.transition = `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`;
        real.style.opacity = '0';

        const m = document.createElement('span');
        m.textContent = text;
        m.style.cssText = copyFontStyles(this.el);
        measure.appendChild(m);

        return { real, measured: m };
      });

      // measure heights (measured elements are inline, getBoundingClientRect works)
      const heights = this._items.map(it => {
        const r = it.measured.getBoundingClientRect();
        return Math.max(0, r.height || 0);
      });
      const maxHeight = Math.max(...heights, 0) || parseFloat(window.getComputedStyle(this.el).fontSize) * 1.2;

      // compute slide distance: how much items move up/down relative to center
      this._slidePx = Math.max(18, Math.round(maxHeight * 0.5));

      // set minHeight to avoid clipping of descenders + movement
      const minH = Math.ceil(maxHeight + this._slidePx + SAFETY_PX);
      this.el.style.minHeight = minH + 'px';

      // give a bit extra padding if not set
      if (!this.el.style.paddingBottom) this.el.style.paddingBottom = Math.max(6, Math.round(minH * 0.06)) + 'px';
      if (!this.el.style.paddingTop) this.el.style.paddingTop = Math.max(2, Math.round(minH * 0.02)) + 'px';

      // remove measurement DOM
      document.body.removeChild(measure);

      // append real spans and set initial positions (first visible)
      this._items.forEach((it, i) => {
        const s = it.real;
        // place center for first, below for others
        if (i === 0) {
          s.style.opacity = '1';
          s.style.transform = `translate(-50%,-50%) translateY(0px)`;
        } else {
          s.style.opacity = '0';
          s.style.transform = `translate(-50%,-50%) translateY(${this._slidePx}px)`;
        }
        this.el.appendChild(s);
      });

      // If reduced motion is requested, remove transitions
      if (this._reducedMotion) {
        this._items.forEach((it, i) => {
          it.real.style.transition = 'none';
          it.real.style.opacity = i === 0 ? '1' : '0';
        });
      }
    }

    _start() {
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

      // Normal loop
      this.timer = setInterval(() => this._tick(), this.interval);
    }

    _tick() {
      const prev = this.current;
      const next = (this.current + 1) % this._items.length;
      const prevNode = this._items[prev].real;
      const nextNode = this._items[next].real;

      // Position next below instantaneously (no transition) to guarantee single direction
      nextNode.style.transition = 'none';
      nextNode.style.opacity = '0';
      nextNode.style.transform = `translate(-50%,-50%) translateY(${this._slidePx}px)`;

      // Force style flush
      // eslint-disable-next-line no-unused-expressions
      nextNode.offsetHeight;

      // Restore transitions
      nextNode.style.transition = `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`;
      prevNode.style.transition = `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`;

      // Animate: next up to center, prev up and fade out
      requestAnimationFrame(() => {
        nextNode.style.opacity = '1';
        nextNode.style.transform = `translate(-50%,-50%) translateY(0px)`;

        prevNode.style.opacity = '0';
        prevNode.style.transform = `translate(-50%,-50%) translateY(-${this._slidePx}px)`;
      });

      // After transition, reset prev immediately to below position WITHOUT transition so it's ready for future cycles.
      setTimeout(() => {
        prevNode.style.transition = 'none';
        prevNode.style.opacity = '0';
        prevNode.style.transform = `translate(-50%,-50%) translateY(${this._slidePx}px)`;
        // force reflow
        // eslint-disable-next-line no-unused-expressions
        prevNode.offsetHeight;
        // restore transition for next use
        prevNode.style.transition = `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`;
      }, TRANSITION_MS + 20);

      this.current = next;
    }

    stop() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }

    _cleanupSpans() {
      if (this._items) {
        this._items.forEach(it => {
          if (it.measured && it.measured.parentNode) it.measured.parentNode.removeChild(it.measured);
          if (it.real && it.real.parentNode) it.real.parentNode.removeChild(it.real);
        });
      }
      this._items = null;
    }

    destroy() {
      this.stop();
      window.removeEventListener('resize', this._resizeHandler);
      this._cleanupSpans();
      this.el.removeAttribute('aria-live');
      this.el.removeAttribute('role');
      this.el.style.position = '';
      this.el.style.minHeight = '';
      this.el.style.overflow = '';
      this.el.style.paddingTop = '';
      this.el.style.paddingBottom = '';
    }

    static init(selectorOrNode, options = {}) {
      let el = selectorOrNode;
      if (typeof selectorOrNode === 'string') el = document.querySelector(selectorOrNode);
      if (!el) return null;
      return new DynamicTitle(el, options);
    }

    static initAll() {
      const nodes = Array.from(document.querySelectorAll('.dynamic-title, [data-dynamic-title]'));
      return nodes.map(n => new DynamicTitle(n));
    }
  }

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => DynamicTitle.initAll());
  } else {
    DynamicTitle.initAll();
  }

  global.DynamicTitle = DynamicTitle;
})(window);
