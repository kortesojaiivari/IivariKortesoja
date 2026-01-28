// SKRIPTIT/paikkakunta-overlay.js
document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'valittuPaikkakunta2026';
    if (localStorage.getItem(STORAGE_KEY)) {
        return;
    }

    const overlay = document.createElement('div');
    overlay.id = 'paikkakunta-overlay';
    overlay.innerHTML = `
        <h3>Valitse pääpaikkakunta</h3>
        <select id="paikkakunta-valinta">
            <option value="" selected disabled>Valitse...</option>
            <option value="kuopio">Kuopio & lähiseutu</option>
            <option value="helsinki">Helsinki & Uusimaa</option>
            <option value="tampere">Tampere & Pirkanmaa</option>
            <option value="jyvaskyla">Jyväskylä & Keski-Suomi</option>
            <option value="muu">Muu Suomi / koko maa</option>
        </select>
        <div class="buttons">
            <button id="btn-close">Sulje</button>
            <button id="btn-choose">Valitse</button>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('btn-close').addEventListener('click', () => {
        overlay.classList.remove('visible');
    });

    document.getElementById('btn-choose').addEventListener('click', () => {
        const val = document.getElementById('paikkakunta-valinta').value.trim();
        if (val) {
            localStorage.setItem(STORAGE_KEY, val);
            overlay.classList.remove('visible');
            console.log('Paikkakunta tallennettu:', val);
        } else {
            alert('Valitse paikkakunta listalta.');
        }
    });

    setTimeout(() => {
        overlay.classList.add('visible');
    }, 1200);
});
