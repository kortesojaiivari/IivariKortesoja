// SYKSY_service-nav.js
// Dynaaminen palvelunavigaatio yhdellä sivulla - Syksy-versio

const services = [
    {
        id: "haat",
        title: "Häät",
        buttonText: "Häät",
        description: `
            <p>Kokopäiväinen dokumentaarinen hääkuvaus on vahvin erikoisalani. Kuvaan koko hääpäivänne aamusta iltaan asti – valmistautumisesta häävalssiin.</p>
            <p>Toimitan ensimmäiset kuvat jo seuraavana päivänä ja Instagram-valmiit kuvat kuuluvat pakettiin. Laadukkaat kuvat, luonnollinen tyyli ja rento tunnelma.</p>
            <p><strong>Suositus:</strong> Kokopäiväinen paketti (8–12 h)</p>
        `,
        image: "MEDIA/IivariKortesoja valokuvaaja/häät-esimerkki.webp",
        priceTitle: "Hääpaketti (koko päivä)",
        defaultPrice: "850"
    },
    {
        id: "hautajaiset",
        title: "Hautajaiset & Siunaustilaisuudet",
        buttonText: "Hautajaiset",
        description: `
            <p>Tarjoan arvokasta ja herkkää kuvausta hautajaisiin sekä muistotilaisuuksiin. Kunnioitan tilaisuuden tunnelmaa ja tallennan hetket kauniisti ja digitaalisesti.</p>
            <p>Sopii sekä kirkkoon, krematorioon että muistotilaisuuteen. Voit valita 1–3 tunnin paketin tarpeen mukaan.</p>
        `,
        image: "MEDIA/IivariKortesoja valokuvaaja/hautajaiset-esimerkki.webp",
        priceTitle: "Siunaustilaisuus",
        defaultPrice: "290"
    },
    {
        id: "valmistujaiset",
        title: "Valmistujaiset",
        buttonText: "Valmistujaiset",
        description: `
            <p>Onnittelut valmistujaisjuhlan kunniaksi! Kuvaan sekä yksilö- että ryhmäkuvat haluamassanne ympäristössä – kotona, koululla tai ulkona luonnossa.</p>
            <p>Pakettiin kuuluu 30–50 muokattua kuvaa + lyhyt videopätkä onnitteluista.</p>
        `,
        image: "MEDIA/IivariKortesoja valokuvaaja/valmistujaiset-esimerkki.webp",
        priceTitle: "Valmistujaispaketti",
        defaultPrice: "190"
    },
    {
        id: "asuntokuvaus",
        title: "Asuntokuvaus & Kiinteistökuvaus",
        buttonText: "Asuntokuvaus",
        description: `
            <p>Laadukkaat myyntikuvat asunnoille, mökeille ja kiinteistöille. Käytän laajakulmaa sekä yksityiskohtakuvausta, jotta kohde näyttää mahdollisimman houkuttelevalta.</p>
            <p>Sisältää myös ilmakuvat dronella (tarvittaessa) ja virtuaaliesittelyn mahdollisuuden.</p>
        `,
        image: "MEDIA/IivariKortesoja valokuvaaja/asuntokuvaus-esimerkki.webp",
        priceTitle: "Asuntokuvaus (max 3h)",
        defaultPrice: "150"
    },
    {
        id: "tuntipaketit",
        title: "Tuntipaketit",
        buttonText: "Tuntipaketit",
        description: `
            <p>Joustavin vaihtoehto erilaisiin tarpeisiin: ristiäiset, syntymäpäivät, yritystapahtumat, lemmikkikuvaus tai muut tilaisuudet.</p>
            <p>Veloitan vain todellisen kuvausajan mukaan. Minimiveloitus 2 tuntia.</p>
        `,
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
            // Poista aktiivisuus kaikista
            document.querySelectorAll('.service-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Päivitä sisältö
            updateServiceContent(service);
            
            // Smooth scroll #dynamic-content -alueelle
            const dynamicSection = document.getElementById('dynamic-content');
            if (dynamicSection) {
                dynamicSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
        
        container.appendChild(btn);
    });

    // Avaa ensimmäinen palvelu automaattisesti
    if (services.length > 0) {
        updateServiceContent(services[0]);
        const firstBtn = container.querySelector('.service-btn');
        if (firstBtn) firstBtn.classList.add('active');
    }
}

function updateServiceContent(service) {
    // Otsikko
    document.getElementById('dynamic-title').textContent = service.title;

    // Kuvaus
    document.getElementById('service-description').innerHTML = service.description;

    // Kuva
    const img = document.getElementById('service-image');
    if (img) img.src = service.image;

    // Hinnoittelu
    const upperRow = document.getElementById('pricing-upper');
    const lowerRow = document.getElementById('pricing-lower');
    
    if (upperRow) upperRow.innerHTML = '';
    if (lowerRow) lowerRow.innerHTML = '';

    if (upperRow) {
        const box1 = createPricingBox("3 tuntia", "290 €", "Lyhyempi tilaisuus");
        const box2 = createPricingBox("4–6 tuntia", "450 €", "Tyypillinen pituus");
        upperRow.appendChild(box1);
        upperRow.appendChild(box2);
    }

    if (lowerRow) {
        const mainBox = createPricingBox(
            service.priceTitle, 
            service.defaultPrice + " €", 
            "Suosituin valinta",
            ["Laadukkaat muokatut kuvat", "Digitaalinen toimitus", "Nopea toimitus"]
        );
        lowerRow.appendChild(mainBox);
    }
}

function createPricingBox(title, price, desc = '', features = []) {
    let html = `<h3>${title}</h3><p class="price">${price}</p>`;
    if (desc) html += `<p class="price-desc">${desc}</p>`;
    if (features.length > 0) {
        html += '<ul class="features-list">';
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
