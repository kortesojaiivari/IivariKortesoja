/**
 * DynamicTitle - pieni uudelleenkäytettävä skripti "vaihtuva otsikko" -efektille.
 *
 * Käyttö:
 * 1) Voit jättää HTML:ssä olemassa olevat <span>...</span> -lauseet elementin sisään
 *    (esim. <h2 id="dynamic-title"><span>Yritys</span><span>Bändi</span>...</h2>)
 *    TAI
 *    asettaa fraasit data-atribuutilla JSON-arrayna tai pipe-/pilkulla eroteltuna:
 *    <h2 id="dynamic-title" data-phrases='["Yritys","Bändi","Järjestö"]' data-interval="3000"></h2>
 *
 * 2) Lisäät skriptin sivulle:
 *    <script src="SKRIPTIT/dynamic-title.js" defer></script>
 *
 * 3) Automaattinen initialisointi: skripti selvittää elementit joissa on luokka .dynamic-title
 *    tai data-dynamic-title attribuutti ja käynnistää ne DOMContentLoadedissa.
 *
 * 4) Manuaalinen käyttö:
 *    DynamicTitle.init(document.getElementById('dynamic-title'), { interval: 3000 });
 */

(function (global) {
  'use strict';

  const DEFAULT_INTERVAL = 3000;
  const TRANSITION_MS = 600;

  class DynamicTitle {
    constructor(element, options = {}) {
      if (!element) throw new Error('DynamicTitle: element is required');
      this.el = element;
      this.interval = parseInt(options.interval ?? element.dataset.interval ?? DEFAULT_INTERVAL, 10);
      this.phrases = this._collectPhrases();
      this.current = 0;
      this.timer = null;
      this._build();
      this._start();
    }

    // Kerää fraasit joko valmiista span:eistä tai data-phrases attribuutista
    _collectPhrases() {
      // Jos elementissä on lapsi-spanit, käytä niitä
      const childSpans = Array.from(this.el.querySelectorAll('span'));
      if (childSpans.length > 0) {
        return childSpans.map(s => s.textContent.trim()).filter(Boolean);
      }

      // Kokeile data-phrases: JSON tai pilkulla/pipe:lla erotettu
      const raw = this.el.dataset.phrases;
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) return parsed.map(String);
        } catch (e) {
          // ei JSONia -> split
          return raw.split(/\||,/).map(s => s.trim()).filter(Boolean);
        }
      }

      // Jos ei löytynyt mitään, yritä elementin textContent (yksi fraasi)
      const txt = this.el.textContent.trim();
      return txt ? [txt] : [];
    }

    // Luo span-elementit ja asettaa tyylit (inline), jotta skripti toimii ilman erikois-CSS:iä
    _build() {
      if (!this.phrases.length) return;

      // Säilytä korkeus estämään layout-hyppy
      const computedStyle = window.getComputedStyle(this.el);
      const prevHeight = this.el.getBoundingClientRect().height || null;

      // Valmistele kontti
      this.el.innerHTML = '';
      this.el.style.position = this.el.style.position || 'relative';
      this.el.setAttribute('aria-live', 'polite');
      this.el.setAttribute('role', this.el.getAttribute('role') || 'status');

      this.spans = this.phrases.map((p, i) => {
        const s = document.createElement('span');
        s.textContent = p;
        // perus-inline-tyylit (vastaa CSS-animointia)
        Object.assign(s.style, {
          position: 'absolute',
          left: '0',
          top: '0',
          width: '100%',
          display: 'block',
          textAlign: 'center',
          opacity: '0',
          transform: 'translateY(50px)',
          transition: `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        });
        if (i === 0) {
          s.style.opacity = '1';
          s.style.transform = 'translateY(0)';
        }
        this.el.appendChild(s);
        return s;
      });

      // Aseta elementin minHeight, jotta elementti ei pomppaa, kun spanit ovat absolutessa
      if (prevHeight) {
        this.el.style.minHeight = prevHeight + 'px';
      } else {
        // jos ei mitattavissa, aseta pieni min-height, mutta yleensä prevHeight riittää
        this.el.style.minHeight = this.spans[0].getBoundingClientRect().height + 'px';
      }
    }

    _start() {
      if (!this.spans || this.spans.length <= 1) return;
      this.stop();
      this.timer = setInterval(() => this._tick(), this.interval);
    }

    _tick() {
      const prev = this.current;
      const next = (this.current + 1) % this.spans.length;
      // sulje edellinen
      this.spans[prev].style.opacity = '0';
      this.spans[prev].style.transform = 'translateY(-50px)';
      // avaa seuraava (pienellä viiveellä, mutta transition hoitaa smoothin)
      this.spans[next].style.opacity = '1';
      this.spans[next].style.transform = 'translateY(0)';
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
      // Poista inline-tyylit ja aria-atribuutit
      this.el.removeAttribute('aria-live');
      this.el.removeAttribute('role');
      this.el.style.position = '';
      this.el.style.minHeight = '';
      // Palauta alkuperäiset fraasit takaisin plain-textiksi
      this.el.textContent = this.phrases.join(' ');
    }

    // Static API
    static init(elementOrSelector, options = {}) {
      let el = elementOrSelector;
      if (typeof elementOrSelector === 'string') el = document.querySelector(elementOrSelector);
      if (!el) return null;
      return new DynamicTitle(el, options);
    }

    static initAll() {
      // Etsi elementit, joissa on luokka .dynamic-title tai attribuutti data-dynamic-title
      const nodes = Array.from(document.querySelectorAll('.dynamic-title, [data-dynamic-title]'));
      return nodes.map(n => new DynamicTitle(n));
    }
  }

  // Automaattinen initialisointi DOMContentLoadedissa
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      DynamicTitle.initAll();
    });
  } else {
    // jos skripti ladattu deferillä tai body:n lopussa
    DynamicTitle.initAll();
  }

  // Alt name globalille
  global.DynamicTitle = DynamicTitle;
})(window);
