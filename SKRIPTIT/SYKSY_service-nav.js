// SYKSY_service-nav.js
// Liquid Glass -tyyli + lyhyemmät napit

const services = [
    {
        id: "haat",
        title: "Häät",
        buttonText: "Häät",
        description: `
            <p>Kokopäiväinen dokumentaarinen hääkuvaus aamusta iltaan. Ensimmäiset kuvat seuraavana päivänä.</p>
            <p><strong>Suositus:</strong> 8–12 tunnin paketti</p>
        `,
        image: "MEDIA/IivariKortesoja valokuvaaja/häät-esimerkki.webp",
        priceTitle: "Hääpaketti (koko päivä)",
        defaultPrice: "850"
    },
    {
        id: "hautajaiset",
        title: "Hautajaiset",
        buttonText: "Hautajaiset",
        description: `
            <p>Arvokas ja herkkä kuvaus hautajaisiin sekä muistotilaisuuksiin.</p>
            <p>1–3 tunnin paketti tarpeen mukaan.</p>
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
            <p>Yksilö- ja ryhmäkuvaus valmistujaisiin kotona tai ulkona.</p>
            <p>Sisältää muokatut kuvat + videopätkän.</p>
        `,
        image: "MEDIA/IivariKortesoja valokuvaaja/valmistujaiset-esimerkki.webp",
        priceTitle: "Valmistujaispaketti",
        defaultPrice: "190"
    },
    {
        id: "asuntokuvaus",
        title: "Asuntokuvaus",
        buttonText: "Asuntokuvaus",
        description: `
            <p>Laadukkaat myyntikuvat asunnoille ja kiinteistöille. Laajakulma ja dronella.</p>
        `,
        image: "MEDIA/IivariKortesoja valokuvaaja/asuntokuvaus-esimerkki.webp",
        priceTitle: "Asuntokuvaus",
        defaultPrice: "150"
    },
    {
        id: "tuntipaketit",
        title: "Tuntipaketit",
        buttonText: "Tuntipaketit",
        description: `
            <p>Joustava tuntipohjainen kuvaus kaikkiin tilaisuuksiin. Minimiveloitus 2 tuntia.</p>
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
            document.querySelectorAll('.service-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            updateServiceContent(service);
            
            const dynamicSection = document.getElementById('dynamic-content');
            if (dynamicSection) {
                dynamicSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
        
        container.appendChild(btn);
    });

    if (services.length > 0) {
        updateServiceContent(services[0]);
        const firstBtn = container.querySelector('.service-btn');
        if (firstBtn) firstBtn.classList.add('active');
    }
}

function updateServiceContent(service) {
    document.getElementById('dynamic-title').textContent = service.title;
    document.getElementById('service-description').innerHTML = service.description;

    const img = document.getElementById('service-image');
    if (img) img.src = service.image;

    const upperRow = document.getElementById('pricing-upper');
    const lowerRow = document.getElementById('pricing-lower');
    
    if (upperRow) upperRow.innerHTML = '';
    if (lowerRow) lowerRow.innerHTML = '';

    if (upperRow) {
        upperRow.appendChild(createPricingBox("3 tuntia", "290 €", "Lyhyempi tilaisuus"));
        upperRow.appendChild(createPricingBox("4–6 tuntia", "450 €", "Tyypillinen pituus"));
    }
    if (lowerRow) {
        lowerRow.appendChild(createPricingBox(
            service.priceTitle, 
            service.defaultPrice + " €", 
            "Suosituin valinta",
            ["Muokatut kuvat", "Digitaalinen toimitus"]
        ));
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

window.initServiceNavigation = initServiceNavigation;
