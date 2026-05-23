// SYKSY_service-nav.js
// Dynaaminen palvelunavigaatio yhdellä sivulla - Syksy-versio

const services = [
    {
        id: "haat",
        title: "Häät",
        buttonText: "Häät",
        emoji: "💒",
        description: `
            <p>Kokopäiväinen dokumentaarinen hääkuvaus on vahvin erikoisalani. Kuvaan koko hääpäivänne aamusta iltaan asti – valmistautumisesta häävalssiin.</p>
            <p>Toimitan ensimmäiset kuvat jo seuraavana päivänä ja Instagram-valmiit kuvat kuuluvat pakettiin.</p>
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
        emoji: "🕊️",
        description: `
            <p>Tarjoan arvokasta ja herkkää kuvausta hautajaisiin sekä muistotilaisuuksiin. Kunnioitan tilaisuuden tunnelmaa.</p>
            <p>Sopii sekä kirkkoon että muistotilaisuuteen. Voit valita 1–3 tunnin paketin.</p>
        `,
        image: "MEDIA/IivariKortesoja valokuvaaja/hautajaiset-esimerkki.webp",
        priceTitle: "Siunaustilaisuus",
        defaultPrice: "290"
    },
    {
        id: "valmistujaiset",
        title: "Valmistujaiset",
        buttonText: "Valmistujaiset",
        emoji: "🎓",
        description: `
            <p>Onnittelut valmistujaisjuhlan kunniaksi! Kuvaan sekä yksilö- että ryhmäkuvat haluamassanne ympäristössä.</p>
            <p>Pakettiin kuuluu 30–50 muokattua kuvaa + lyhyt videopätkä.</p>
        `,
        image: "MEDIA/IivariKortesoja valokuvaaja/valmistujaiset-esimerkki.webp",
        priceTitle: "Valmistujaispaketti",
        defaultPrice: "190"
    },
    {
        id: "asuntokuvaus",
        title: "Asuntokuvaus & Kiinteistökuvaus",
        buttonText: "Asuntokuvaus",
        emoji: "🏠",
        description: `
            <p>Laadukkaat myyntikuvat asunnoille, mökeille ja kiinteistöille. Laajakulma + yksityiskohtakuvat.</p>
            <p>Sisältää myös dronella otettuja ilmakuvia tarvittaessa.</p>
        `,
        image: "MEDIA/IivariKortesoja valokuvaaja/asuntokuvaus-esimerkki.webp",
        priceTitle: "Asuntokuvaus (max 3h)",
        defaultPrice: "150"
    },
    {
        id: "tuntipaketit",
        title: "Tuntipaketit",
        buttonText: "Tuntipaketit",
        emoji: "⏱️",
        description: `
            <p>Joustavin vaihtoehto erilaisiin tarpeisiin: ristiäiset, syntymäpäivät, yritystapahtumat tai lemmikkikuvaus.</p>
            <p>Minimiveloitus 2 tuntia.</p>
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
        btn.innerHTML = `
            <span>${service.emoji}</span>
            ${service.buttonText}
        `;
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

    // Avaa ensimmäinen automaattisesti
    if (services.length > 0) {
        updateServiceContent(services[0]);
        const firstBtn = container.querySelector('.service-btn');
        if (firstBtn) firstBtn.classList.add('active');
    }
}

// Muut funktiot (updateServiceContent, createPricingBox) pysyvät samoina kuin aiemmin
function updateServiceContent(service) { /* ... sama kuin edellisessä ... */ }
function createPricingBox(title, price, desc = '', features = []) { /* ... sama ... */ }

window.initServiceNavigation = initServiceNavigation;
