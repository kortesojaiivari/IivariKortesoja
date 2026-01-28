// Lisää vaihtoehdot dropdowniin optionsData.js-tiedostosta
const dropdown = document.getElementById('paikkakunta');

// Lataa paikkakunnan vaihtoehdot
function populateDropdown(options) {
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.name;
        dropdown.appendChild(opt);
    });
}

// Täytä dropdown ja lisää tapahtumakuuntelija
if (typeof paikkakuntaOptions !== 'undefined') {
    populateDropdown(paikkakuntaOptions);

    dropdown.addEventListener('change', function () {
        const valittuSivu = this.value;
        if (valittuSivu) {
            window.location.href = valittuSivu;
        }
    });
} else {
    console.error('Paikkakuntaoptioita ei löytynyt.');
}