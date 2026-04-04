<!-- SKRIPTIT/portfolio-changer.js -->
<!-- Korjattu versio: absoluuttiset polut + alaosan cycle 5 sekuntiin -->

document.addEventListener('DOMContentLoaded', () => {
    // ──────── 1. PÄÄPORTFOLIO (vaihtuva otsikko + grid) ────────
    const categories = [
        {
            title: "TuplaKupla - Teatterikuvaus",
            media: [
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus40.webp", alt: "Teatterikuvaus 1" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus41.webp", alt: "Teatterikuvaus 2" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus42.webp", alt: "Teatterikuvaus 3" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus43.webp", alt: "Teatterikuvaus 4" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus44.webp", alt: "Teatterikuvaus 5" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus45.webp", alt: "Teatterikuvaus 6" }
            ]
        },
        {
            title: "Combat Camera",
            media: [
                { src: "/MEDIA/Puolustusvoimat/comcam/comcam37.webp", alt: "Combat 1" },
                { src: "/MEDIA/Puolustusvoimat/comcam/comcam3.webp", alt: "Combat 2" },
                { src: "/MEDIA/Puolustusvoimat/comcam/comcam25.webp", alt: "Combat 3" },
                { src: "/MEDIA/Puolustusvoimat/comcam/comcam12.webp", alt: "Combat 4" },
                { src: "/MEDIA/Puolustusvoimat/comcam/comcam8.webp", alt: "Combat 5" },
                { src: "/MEDIA/Puolustusvoimat/comcam/comcam19.webp", alt: "Combat 6" },
                { src: "/MEDIA/Puolustusvoimat/comcam/comcam44.webp", alt: "Combat 7" },
                { src: "/MEDIA/Puolustusvoimat/comcam/comcam31.webp", alt: "Combat 8" },
                { src: "/MEDIA/Puolustusvoimat/comcam/comcam50.webp", alt: "Combat 9" }
            ]
        },
        {
            title: "Laura Voutilainen - Kerran Keväällä",
            media: [
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus62.webp", alt: "Laura Voutilainen 1" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus68.webp", alt: "Laura Voutilainen 2" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus73.webp", alt: "Laura Voutilainen 3" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus54.webp", alt: "Laura Voutilainen 4" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus76.webp", alt: "Laura Voutilainen 5" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus65.webp", alt: "Laura Voutilainen 6" }
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

        if (gridElement) gridElement.style.opacity = '0';

        setTimeout(() => {
            if (isNewCategory && titleElement) {
                titleElement.textContent = category.title;
                lastDisplayedCategoryIndex = currentCategoryIndex;
            }

            const imagesToShow = category.media.slice(currentImageOffset, currentImageOffset + 3);

            if (gridElement) {
                gridElement.innerHTML = imagesToShow.map(img => `
                    <div class="group">
                        <img src="${img.src}" alt="${img.alt || ''}">
                    </div>
                `).join('');
                gridElement.style.opacity = '1';
            }

            updateDots();

            currentImageOffset += 3;
            if (currentImageOffset >= category.media.length) {
                currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
                currentImageOffset = 0;
            }
        }, 300);
    }

    if (gridElement) {
        updateDisplay();
        resetAutoCycle();
    }

    // ──────── 2. ALAOSAN STATIC GALLERY (3x2) ────────
    const staticCycles = [
        {
            media: [
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus40.webp", alt: "Valokuvaus 1" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus41.webp", alt: "Valokuvaus 2" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus42.webp", alt: "Valokuvaus 3" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus43.webp", alt: "Valokuvaus 4" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus44.webp", alt: "Valokuvaus 5" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus45.webp", alt: "Valokuvaus 6" }
            ]
        },
        {
            media: [
                { src: "/MEDIA/Puolustusvoimat/comcam/comcam37.webp", alt: "Combat 1" },
                { src: "/MEDIA/Puolustusvoimat/comcam/comcam3.webp", alt: "Combat 2" },
                { src: "/MEDIA/Puolustusvoimat/comcam/comcam25.webp", alt: "Combat 3" },
                { src: "/MEDIA/Puolustusvoimat/comcam/comcam12.webp", alt: "Combat 4" },
                { src: "/MEDIA/Puolustusvoimat/comcam/comcam8.webp", alt: "Combat 5" },
                { src: "/MEDIA/Puolustusvoimat/comcam/comcam19.webp", alt: "Combat 6" }
            ]
        },
        {
            media: [
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus70.webp", alt: "Laura 1" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus74.webp", alt: "Laura 2" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus65.webp", alt: "Laura 3" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus72.webp", alt: "Laura 4" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus56.webp", alt: "Laura 5" },
                { src: "/MEDIA/VALOKUVAUS/Valokuvaus59.webp", alt: "Laura 6" }
            ]
        }
    ];

    let currentStaticIndex = 0;
    const staticGallery = document.querySelector('.static-gallery');

    function updateStaticGallery() {
        if (!staticGallery) return;

        staticGallery.style.opacity = '0';

        setTimeout(() => {
            const cycle = staticCycles[currentStaticIndex];
            staticGallery.innerHTML = cycle.media.map(img => `
                <div class="static-item">
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `).join('');

            staticGallery.style.opacity = '1';
            currentStaticIndex = (currentStaticIndex + 1) % staticCycles.length;
        }, 300);
    }

    if (staticGallery) {
        updateStaticGallery();
        // Muutettu 7000 → 5000 ms (5 sekuntia)
        setInterval(updateStaticGallery, 5000);
    }
});
