// portfolio-changer.js – KORJATTU VERSIO (subtitle vaihtuu automaattisesti)
document.addEventListener('DOMContentLoaded', () => {
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
        }
        // Lisää uusia kategorioita tähän
    ];

    const titleElement = document.getElementById('changing-title');
    const gridElement   = document.getElementById('changing-grid');
    const dotsContainer = document.getElementById('category-dots');

    if (!titleElement || !gridElement) return;

    let currentCategoryIndex = 0;
    let currentImageOffset   = 0;
    let lastShownCategory    = -1;

    // Luo pisteet
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        categories.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'category-dot';
            dot.dataset.index = i;
            dot.addEventListener('click', () => {
                currentCategoryIndex = i;
                currentImageOffset = 0;
                updateDisplay(true); // force title animation
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

    function updateDisplay(forceTitle = false) {
        const category = categories[currentCategoryIndex];
        const isNewCategory = (currentCategoryIndex !== lastShownCategory) || forceTitle;

        gridElement.classList.add('loading');
        gridElement.style.opacity = '0';

        if (isNewCategory && titleElement) {
            titleElement.classList.remove('slide-up-active');
            titleElement.classList.add('slide-up-exit');
        }

        setTimeout(() => {
            // Otsikko vaihtuu VAIN kun kategoria vaihtuu
            if (isNewCategory && titleElement) {
                titleElement.textContent = category.title;
                titleElement.classList.remove('slide-up-exit');
                titleElement.classList.add('slide-up-enter-prep');
                void titleElement.offsetWidth;
                titleElement.classList.remove('slide-up-enter-prep');
                titleElement.classList.add('slide-up-active');
            }

            // Näytetään max 3 kuvaa kerrallaan
            const imagesToShow = category.media.slice(currentImageOffset, currentImageOffset + 3);
            gridElement.innerHTML = imagesToShow.map(img =>
                `<div class="group"><img src="${img.src}" alt="${img.alt || ''}"></div>`
            ).join('');

            gridElement.style.opacity = '1';
            gridElement.classList.remove('loading');
            updateDots();

            // Siirry seuraaviin kuviin tai seuraavaan kategoriaan
            currentImageOffset += 3;
            if (currentImageOffset >= category.media.length) {
                currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
                currentImageOffset = 0;
            }

            lastShownCategory = currentCategoryIndex;
        }, 280);
    }

    // Käynnistys
    updateDisplay();
    setInterval(updateDisplay, 5000);   // 5 sekunnin automaattinen vaihto
});
