// SKRIPTIT/portfolio-changer.js
// Päivitetty: pääportfolio + 3x2 static-gallery molemmilla on sama fade-animaatio

document.addEventListener('DOMContentLoaded', () => {

    // ──────── 1. PÄÄPORTFOLIO (otsikolla + kategoriapisteet) ────────
    const categories = [
        {
            title: "TuplaKupla - Teatterikuvaus",
            media: [
                { src: "MEDIA/VALOKUVAUS/Valokuvaus40.webp", alt: "Teatterikuvaus 1" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus41.webp", alt: "Teatterikuvaus 2" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus42.webp", alt: "Teatterikuvaus 3" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus43.webp", alt: "Teatterikuvaus 4" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus44.webp", alt: "Teatterikuvaus 5" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus45.webp", alt: "Teatterikuvaus 6" }
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
            ]
        },
        {
            title: "Laura Voutilainen - Kerran Keväällä",
            media: [
                { src: "MEDIA/VALOKUVAUS/Valokuvaus40.webp", alt: "Laura Voutilainen 1" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus41.webp", alt: "Laura Voutilainen 2" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus42.webp", alt: "Laura Voutilainen 3" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus43.webp", alt: "Laura Voutilainen 4" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus44.webp", alt: "Laura Voutilainen 5" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam44.webp", alt: "Laura Voutilainen 6" }
            ]
        }
    ];

    const titleElement = document.getElementById('changing-title');
    const gridElement = document.getElementById('changing-grid');
    const dotsContainer = document.getElementById('category-dots');

    let currentCategoryIndex = 0;
    let currentImageOffset = 0;
    let lastDisplayedCategoryIndex = -1;
    let autoCycleInterval;

    function resetAutoCycle() {
        clearInterval(autoCycleInterval);
        autoCycleInterval = setInterval(updateDisplay, 5000);
    }

    // Kategoriapisteet
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        categories.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'category-dot';
            dot.dataset.index = i;
            dot.addEventListener('click', () => {
                currentCategoryIndex = i;
                currentImageOffset = 0;
                updateDisplay();
                resetAutoCycle();
            });
            dotsContainer.appendChild(dot);
        });
    }

    function updateDots() {
        if (!dotsContainer) return;
        dotsContainer.querySelectorAll('.category-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentCategoryIndex);
        });
    }

    function updateDisplay() {
        const category = categories[currentCategoryIndex];
        const isNewCategory = currentCategoryIndex !== lastDisplayedCategoryIndex;

        gridElement.classList.add('loading');
        gridElement.style.opacity = '0';

        if (isNewCategory && titleElement) {
            titleElement.classList.remove('slide-up-active');
            titleElement.classList.add('slide-up-exit');
        }

        setTimeout(() => {
            if (isNewCategory && titleElement) {
                titleElement.textContent = category.title;
                titleElement.classList.remove('slide-up-exit');
                titleElement.classList.add('slide-up-enter-prep');
                void titleElement.offsetWidth;
                titleElement.classList.remove('slide-up-enter-prep');
                titleElement.classList.add('slide-up-active');
                lastDisplayedCategoryIndex = currentCategoryIndex;
            }

            const imagesToShow = category.media.slice(currentImageOffset, currentImageOffset + 3);
            gridElement.innerHTML = imagesToShow.map(img =>
                `<div class="group"><img src="${img.src}" alt="${img.alt || ''}"></div>`
            ).join('');

            gridElement.style.opacity = '1';
            gridElement.classList.remove('loading');
            updateDots();

            currentImageOffset += 3;
            if (currentImageOffset >= category.media.length) {
                currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
                currentImageOffset = 0;
            }
        }, 280);
    }

    updateDisplay();
    resetAutoCycle();

    // ──────── 2. 3x2 STATIC GALLERY (automaattinen cycling + sama animaatio) ────────
    const staticCycles = [
        {
            media: [
                { src: "MEDIA/VALOKUVAUS/Valokuvaus40.webp", alt: "Valokuvaus 1" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus41.webp", alt: "Valokuvaus 2" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus42.webp", alt: "Valokuvaus 3" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus43.webp", alt: "Valokuvaus 4" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus44.webp", alt: "Valokuvaus 5" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus45.webp", alt: "Valokuvaus 6" }
            ]
        },
        {
            media: [
                { src: "MEDIA/Puolustusvoimat/comcam/comcam37.webp", alt: "Combat 1" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam3.webp", alt: "Combat 2" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam25.webp", alt: "Combat 3" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam12.webp", alt: "Combat 4" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam8.webp", alt: "Combat 5" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam19.webp", alt: "Combat 6" }
            ]
        }
        // Voit lisätä tähän uusia 6 kuvan settejä
    ];

    let currentStaticIndex = 0;
    const staticGallery = document.querySelector('.static-gallery');

    function updateStaticGallery() {
        if (!staticGallery) return;

        staticGallery.classList.add('loading');
        staticGallery.style.opacity = '0';

        setTimeout(() => {
            const cycle = staticCycles[currentStaticIndex];

            staticGallery.innerHTML = cycle.media.map(img => `
                <div class="static-item">
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `).join('');

            staticGallery.style.opacity = '1';
            staticGallery.classList.remove('loading');

            currentStaticIndex = (currentStaticIndex + 1) % staticCycles.length;
        }, 280);
    }

    if (staticGallery) {
        updateStaticGallery();                    // Ensimmäinen näyttö
        setInterval(updateStaticGallery, 6000);   // Vaihtuu 6 sekunnin välein
    }
});
