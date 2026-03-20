// portfolio-changer.js
// Käyttö: <script src="SKRIPTIT/portfolio-changer.js" defer></script>
// HTML-rakenne tarvitaan: 
// <div id="changing-title-container"><h3 id="changing-title" class="changing-title">...</h3></div>
// <div id="changing-grid"></div>

document.addEventListener('DOMContentLoaded', () => {
    // Määritä kategoriat ja niiden kuvat + otsikot täällä
    // Jokainen kategoria on oma objekti: { title: "...", media: [{src, alt}, ...] }
    const categories = [
        {
            title: "TuplaKupla - Teatterikuvaus",
            media: [
                { src: "MEDIA/VALOKUVAUS/Valokuvaus40.webp", alt: "Teatterikuvaus 1" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus41.webp", alt: "Teatterikuvaus 2" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus42.webp", alt: "Teatterikuvaus 3" }
                { src: "MEDIA/VALOKUVAUS/Valokuvaus43.webp", alt: "Teatterikuvaus 4" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus44.webp", alt: "Teatterikuvaus 5" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus45.webp", alt: "Teatterikuvaus 6" }
                // voit lisätä vaikka 10 kuvaa, ne kiertävät 3 kerrallaan
            ]
        },
        {
            title: "Combat Camera",
            media: [
                { src: "MEDIA/Puolustusvoimat/comcam/comcam37.webp", alt: "Combat 1" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam3.webp", alt: "Combat 2" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam25.webp", alt: "Combat 3" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam12.webp", alt: "Combat 4" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam8.webp", alt: "Combat 5" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam19.webp", alt: "Combat 6" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam44.webp", alt: "Combat 7" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam31.webp", alt: "Combat 8" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam50.webp", alt: "Combat 9" }
                // vaikka 9 kuvaa → käy läpi 3 kerrallaan (3 kierrosta)
            ]
        }
        // Lisää uusia kategorioita tähän taulukkoon vapaasti
        // {
        //     title: "Muotokuvaus studio",
        //     media: [ ... ]
        // }
    ];

    const titleElement = document.getElementById('changing-title');
    const gridElement  = document.getElementById('changing-grid');

    if (!titleElement || !gridElement) {
        console.warn('Portfolio-elementtiä ei löydy (changing-title tai changing-grid puuttuu)');
        return;
    }

    let currentCategoryIndex = 0;
    let currentImageOffset   = 0;

    function updateDisplay() {
        const category = categories[currentCategoryIndex];

        // Päivitetään otsikko
        titleElement.classList.remove('slide-up-active');
        titleElement.classList.add('slide-up-exit');

        // Päivitetään kuvat
        gridElement.style.opacity = '0';

        setTimeout(() => {
            // Otsikko
            titleElement.textContent = category.title;
            titleElement.classList.remove('slide-up-exit');
            titleElement.classList.add('slide-up-enter-prep');
            void titleElement.offsetWidth; // force reflow
            titleElement.classList.remove('slide-up-enter-prep');
            titleElement.classList.add('slide-up-active');

            // Kuvat – otetaan aina max 3 kerrallaan
            const imagesToShow = category.media.slice(currentImageOffset, currentImageOffset + 3);

            gridElement.innerHTML = imagesToShow.map(img =>
                `<div class="group"><img src="${img.src}" alt="${img.alt || ''}"></div>`
            ).join('');

            gridElement.style.opacity = '1';

            // Siirrytään seuraavaan offsettiin tai seuraavaan kategoriaan
            currentImageOffset += 3;
            if (currentImageOffset >= category.media.length) {
                // Kategoria loppui → seuraava kategoria ja offset nollaan
                currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
                currentImageOffset = 0;
            }
        }, 250); // animaation kesto / puoli väliä
    }

    // Aloitetaan ensimmäisestä kategoriasta
    updateDisplay();

    // Vaihdetaan 5 sekunnin välein (voit muuttaa)
    setInterval(updateDisplay, 5000);
});
