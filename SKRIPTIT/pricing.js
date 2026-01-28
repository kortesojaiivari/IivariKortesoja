// SKRIPTIT/pricing.js: Dynamically manage pricing package rendering

document.addEventListener("DOMContentLoaded", () => {
    const pricingContainer = document.querySelector("#pricing .upper-row");
    const hääPakettiContainer = document.querySelector("#pricing .lower-row");

    const pricingData = [
        {
            title: "3 tuntia",
            price: "300 €",
            description: "Esimerkiksi hautajaiset tai valmistujaisjuhlat",
        },
        {
            title: "4–6 tuntia",
            price: "400 €",
            description: "Pidempään kestävät tilaisuudet",
        },
        {
            title: "6 tuntia +",
            price: "500 €",
            description: "Esimerkiksi dokumentaarinen hääkuvaus",
        },
    ];

    const hääPakettiData = {
        title: "Hääpaketti",
        price: "700 €",
        details: [
            "Dokumentaarinen hääkuvaus koko häiden ajan",
            "Elokuvallinen häävideo tärkeimmästä päivästä",
            "Ei stressiä kuvausajasta",
            "Eniten valokuvia",
        ],
        quote: "Monet sanovat, että kuva kertoo enemmän kuin tuhat sanaa. Minä sanon, että liikkuva kuva kertoo vieläkin enemmän.",
    };

    // Function to render individual pricing boxes
    function renderPricingBox({ title, price, description }) {
        return `
            <div class="pricing-box">
                <h3>${title}</h3>
                <p class="price">${price}</p>
                <p>${description}</p>
            </div>
        `;
    }

    // Render and inject upper row pricing packages
    pricingContainer.innerHTML = pricingData.map(renderPricingBox).join("");

    // Render and inject hääpaketti information
    hääPakettiContainer.innerHTML = `
        <div class="pricing-box">
            <h3>${hääPakettiData.title}</h3>
            <p class="price">${hääPakettiData.price}</p>
            <ul>
                ${hääPakettiData.details.map(detail => `<li>${detail}</li>`).join("")}
            </ul>
            <p class="quote">${hääPakettiData.quote}</p>
        </div>
        <div class="contact-box">
            <p>Eikö mieleistä pakettia löytynyt?<br />Ota yhteyttä, niin räätälöidään juuri sinulle sopiva ratkaisu!</p>
            <a href="#final-contact" class="contact-btn">Ota yhteyttä</a>
        </div>
    `;
});