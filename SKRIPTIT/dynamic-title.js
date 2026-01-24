(function (global) {
  'use strict';

  const DEFAULT_INTERVAL = 3000; // ms visible per phrase
  const TRANSITION_MS = 600; // ms for cross-fade/slide

  class DynamicTitle {
    constructor(element, options = {}) {
      if (!element) throw new Error('DynamicTitle: element is required');
      this.el = element;
      this.interval = parseInt(options.interval ?? element.dataset.interval ?? DEFAULT_INTERVAL, 10);
      this.phrases = this._collectPhrases();
      this.current = 0;
      this.timer = null;
      this._reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this._build();
      this._start();
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

    _build() {
      if (!this.phrases.length) return;

      // Prepare container
      this.el.innerHTML = '';
      this.el.style.position = this.el.style.position || 'relative';
      this.el.style.overflow = 'hidden';
      this.el.setAttribute('aria-live', 'polite');
      this.el.setAttribute('role', this.el.getAttribute('role') || 'status');

      // Create spans
      this.spans = this.phrases.map((p, i) => {
        const s = document.createElement('span');
        s.textContent = p;
        Object.assign(s.style, {
          position: 'absolute',
          left: '0',
          top: '50%',
          width: '100%',
          display: 'block',
          textAlign: 'center',
          opacity: '0',
          transform: 'translateY(30px) translateY(-50%)', // will be adjusted after measuring
          transition: `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          willChange: 'transform, opacity'
        });
        this.el.appendChild(s);
        return s;
      });

      // Measure tallest span and compute transform distance so descenders aren't clipped
      // We need the spans to be in DOM and measurable. Use getBoundingClientRect.
      const heights = this.spans.map(s => s.getBoundingClientRect().height || s.offsetHeight);
      const maxHeight = Math.max(...heights, 0) || 28;

      // transform distance in px (how much spans move up/down). Make sure it's large enough for visible movement
      this._transformPx = Math.max(18, Math.round(maxHeight * 0.5));

      // Set min-height of the container so descenders are visible during transitions
      // Add small safety padding
      const safety = 6;
      this.el.style.minHeight = (maxHeight + this._transformPx + safety) + 'px';

      // Now set initial positions with the computed transform distance
      this.spans.forEach((s, i) => {
        // remove the earlier fixed translateY and set precise values
        if (i === 0) {
          s.style.opacity = '1';
          s.style.transform = `translateY(-50%) translateY(0)`; // vertically centered
        } else {
          s.style.transform = `translateY(-50%) translateY(${this._transformPx}px)`; // below center
        }
      });

      // If reduced motion is preferred, simplify styling
      if (this._reducedMotion) {
        this.spans.forEach((s, i) => {
          s.style.transition = 'none';
          s.style.opacity = i === 0 ? '1' : '0';
        });
      }
    }

    _start() {
      if (!this.spans || this.spans.length <= 1) return;
      this.stop();

      if (this._reducedMotion) {
        // For reduced motion: only change visibility without transitions
        this.timer = setInterval(() => {
          const prev = this.current;
          const next = (this.current + 1) % this.spans.length;
          this.spans[prev].style.opacity = '0';
          this.spans[next].style.opacity = '1';
          this.current = next;
        }, this.interval);
        return;
      }

      // Normal behavior: cross-fade + slide
      this.timer = setInterval(() => this._tick(), this.interval);
    }

    _tick() {
      const prev = this.current;
      const next = (this.current + 1) % this.spans.length;

      // Start showing next (bring from below to center)
      this.spans[next].style.opacity = '1';
      this.spans[next].style.transform = `translateY(-50%) translateY(0)`;

      // Move previous up and hide
      this.spans[prev].style.opacity = '0';
      this.spans[prev].style.transform = `translateY(-50%) translateY(-${this._transformPx}px)`;

      this.current = next;
    }

    stop() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }

    destroy() {
      this.stop();
      this.el.removeAttribute('aria-live');
      this.el.removeAttribute('role');
      this.el.style.position = '';
      this.el.style.minHeight = '';
      this.el.style.overflow = '';
      this.el.textContent = this.phrases.join(' ');
    }

    static init(elementOrSelector, options = {}) {
      let el = elementOrSelector;
      if (typeof elementOrSelector === 'string') el = document.querySelector(elementOrSelector);
      if (!el) return null;
      return new DynamicTitle(el, options);
    }

    static initAll() {
      const nodes = Array.from(document.querySelectorAll('.dynamic-title, [data-dynamic-title]'));
      return nodes.map(n => new DynamicTitle(n));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      DynamicTitle.initAll();
    });
  } else {
    DynamicTitle.initAll();
  }

  global.DynamicTitle = DynamicTitle;
})(window);