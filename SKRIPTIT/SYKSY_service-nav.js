// SYKSY_service-nav.js
// Dynaaminen palvelunavigaatio yhdellä sivulla

const services = [
    {
        id: "haat",
        title: "Häät",
        buttonText: "Häät",
        description: "Kokopäiväinen dokumentaarinen hääkuvaus. Ikuistan koko hääpäivänne alkaen aamusta valmistautumisesta aina iltaan asti. Toimitan myös Instagram-valmiit kuvat jo seuraavana päivänä.",
        image: "MEDIA/IivariKortesoja valokuvaaja/häät-esimerkki.webp",
        priceTitle: "Hääpaketti",
        defaultPrice: "850"
    },
    {
        id: "hautajaiset",
        title: "Hautajaiset & Siunaustilaisuudet",
        buttonText: "Hautajaiset",
        description: "Arvokas ja rauhallinen kuvaus hautajaisiin ja muistotilaisuuksiin. Kunnioitan tilaisuuden luonnetta ja tallennan hetket herkästi ja kauniisti.",
        image: "MEDIA/IivariKortesoja valokuvaaja/hautajaiset-esimerkki.webp",
        priceTitle: "Siunaustilaisuus",
        defaultPrice: "290"
    },
    {
        id: "valmistujaiset",
        title: "Valmistujaiset",
        buttonText: "Valmistujaiset",
        description: "Valmistujaiskuvaus kotona, juhlapaikalla tai ulkona. Sekä yksilö- että ryhmäkuvat. Mukana myös lyhyt videopätkä halutessasi.",
        image: "MEDIA/IivariKortesoja valokuvaaja/valmistujaiset-esimerkki.webp",
        priceTitle: "Valmistujaispaketti",
        defaultPrice: "190"
    },
    {
        id: "asuntokuvaus",
        title: "Asuntokuvaus & Kiinteistökuvaus",
        buttonText: "Asuntokuvaus",
        description: "Laadukkaat myyntikuvat asunnoille, mökeille ja kiinteistöille. Sisältää sekä laajakulma- että yksityiskohtakuvat. Myös virtuaaliesittely mahdollinen.",
        image: "MEDIA/IivariKortesoja valokuvaaja/asuntokuvaus-esimerkki.webp",
        priceTitle: "Asuntokuvaus",
        defaultPrice: "150"
    },
    {
        id: "muotokuvat",
        title: "Muotokuvat & Henkilökuvaus",
        buttonText: "Muotokuvat",
        description: "Yksilö- ja perhemuotokuvat studiossa tai luonnonvalossa. Myös lemmikkikuvaukset ja yritysportretit.",
        image: "MEDIA/IivariKortesoja valokuvaaja/muotokuva-esimerkki.webp",
        priceTitle: "Muotokuvaus 1 tunti",
        defaultPrice: "120"
    },
    {
        id: "tuntipaketit",
        title: "Tuntipaketit",
        buttonText: "Tuntipaketit",
        description: "Joustava tuntipohjainen kuvaus erilaisiin tilaisuuksiin. Sopii erinomaisesti lyhyempiin tapahtumiin ja kuvauksiin.",
        image: "MEDIA/IivariKortesoja valokuvaaja/tuntikuvaus-esimerkki.webp",
        priceTitle: "Tuntipaketti",
        defaultPrice: "95"
    }
];

function initServiceNavigation() {
    const container = document.getElementById('service-buttons');
    if (!container) return;

    container.innerHTML = '';

    services.forEach(service => {
        const btn = document.createElement('button');
        btn.className = 'service-btn';
        btn.textContent = service.buttonText;
        btn.dataset.service = service.id;
        
        btn.addEventListener('click', () => {
            // Poista aktiivisuus kaikista napeista
            document.querySelectorAll('.service-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Päivitä sisältö
            updateServiceContent(service);
        });
        
        container.appendChild(btn);
    });

    // Avaa ensimmäinen palvelu automaattisesti
    if (services.length > 0) {
        updateServiceContent(services[0]);
        // Aktivoi ensimmäinen nappi
        const firstBtn = container.querySelector('.service-btn');
        if (firstBtn) firstBtn.classList.add('active');
    }
}

function updateServiceContent(service) {
    // Otsikko
    document.getElementById('dynamic-title').textContent = service.title;

    // Kuvaus
    document.getElementById('service-description').innerHTML = `
        <p>${service.description}</p>
        <p style="margin-top: 20px;"><strong>Ota yhteyttä niin suunnitellaan juuri teille sopiva paketti.</strong></p>
    `;

    // Kuva
    const img = document.getElementById('service-image');
    if (img) img.src = service.image;

    // Hinnoittelu
    const upperRow = document.getElementById('pricing-upper');
    const lowerRow = document.getElementById('pricing-lower');
    
    if (upperRow) upperRow.innerHTML = '';
    if (lowerRow) lowerRow.innerHTML = '';

    // Esimerkkihinnat (voidaan laajentaa myöhemmin)
    if (upperRow) {
        const box1 = createPricingBox("3 tuntia", "290", "Lyhyempi tilaisuus");
        const box2 = createPricingBox("4–6 tuntia", "450", "Tyypillinen pituus");
        upperRow.appendChild(box1);
        upperRow.appendChild(box2);
    }

    if (lowerRow) {
        const mainBox = createPricingBox(
            service.priceTitle, 
            service.defaultPrice + " €", 
            "Suosituin paketti",
            ["Dokumentaarinen kuvaus", "Kuvat muokattuna", "Digitaalinen toimitus"]
        );
        lowerRow.appendChild(mainBox);
    }
}

function createPricingBox(title, price, desc = '', features = []) {
    let html = `<h3>${title}</h3><p class="price">${price}</p>`;
    if (desc) html += `<p>${desc}</p>`;
    if (features.length > 0) {
        html += '<ul>';
        features.forEach(f => html += `<li>${f}</li>`);
        html += '</ul>';
    }
    const box = document.createElement('div');
    box.className = 'pricing-box';
    box.innerHTML = html;
    return box;
}

// Tee funktio globaaliksi
window.initServiceNavigation = initServiceNavigation;
