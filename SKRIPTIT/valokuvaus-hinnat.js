// SKRIPTIT/valokuvaus-hinnat.js
// Vain Valokuvaus.html: hinnat + paikkakunta samalla mallilla kuin satakuntavalokuvaus.com
// (perushinta Kankaanpäästä + matkakulut 0,65 €/km × 2). Muut sivut eivät käytä tätä.
(function () {
  const basePrices = { h1: 800, h2: 1300, h3: 300, f1: 300, f2: 600, t3: 400 };
  const distancesKm = {
    "Eura": 65, "Eurajoki": 55, "Harjavalta": 40, "Huittinen": 80, "Jämijärvi": 25,
    "Kankaanpää": 0, "Karvia": 30, "Kokemäki": 70, "Merikarvia": 60, "Nakkila": 45,
    "Pomarkku": 20, "Pori": 53, "Rauma": 100, "Siikainen": 35, "Säkylä": 75, "Ulvila": 50
  };
  const DEFAULT_CITY = "Harjavalta"; // sama oletus kuin satakuntavalokuvaus.com

  function travelFee(city) { return Math.round((distancesKm[city] || 0) * 0.65 * 2); }

  function animatePrice(el, to, duration = 680) {
    const from = parseInt(el.textContent.replace(/[^\d]/g, ''), 10);
    if (isNaN(from) || from === to) { el.textContent = to + " €"; return; }
    let t0 = null;
    function step(now) {
      if (t0 === null) t0 = now;
      const p = Math.max(0, Math.min((now - t0) / duration, 1));
      el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))) + " €";
      if (p < 1) requestAnimationFrame(step); else el.textContent = to + " €";
    }
    requestAnimationFrame(step);
  }

  function update(city, animate) {
    const fee = travelFee(city);
    Object.keys(basePrices).forEach(k => {
      const el = document.getElementById('price-' + k);
      if (!el) return;
      const v = basePrices[k] + fee;
      animate ? animatePrice(el, v) : (el.textContent = v + " €");
    });
    const txt = document.getElementById('vk-location-text');
    if (txt) txt.innerHTML = (document.documentElement.lang === 'en' ? 'Location: ' : 'Kuvauspaikka: ') + '<strong>' + city + '</strong>';
  }

  document.addEventListener('DOMContentLoaded', () => {
    const sel = document.getElementById('vk-paikkakunta');
    if (sel) {
      Object.keys(distancesKm).forEach(c => {
        const o = document.createElement('option');
        o.value = c; o.textContent = c;
        if (c === DEFAULT_CITY) o.selected = true;
        sel.appendChild(o);
      });
      sel.addEventListener('change', () => update(sel.value, true));
    }
    update(DEFAULT_CITY, false);
  });
})();
