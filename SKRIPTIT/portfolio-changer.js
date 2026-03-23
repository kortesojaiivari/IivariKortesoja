// portfolio-changer.js – LOPULLINEN VERSIO (subtitle vaihtuu VAIN kategoriavaihdossa)
document.addEventListener('DOMContentLoaded', () => {
    const categories = [
        {
            title: "TuplaKupla - Teatterikuvaus",
            media: [
                { src: "MEDIA/VALOKUVAUS/Valokuvaus40.webp", alt: "1" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus41.webp", alt: "2" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus42.webp", alt: "3" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus43.webp", alt: "4" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus44.webp", alt: "5" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus45.webp", alt: "6" }
            ]
        },
        {
            title: "Combat Camera",
            media: [
                { src: "MEDIA/Puolustusvoimat/comcam/comcam37.webp", alt: "1" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam3.webp", alt: "2" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam25.webp", alt: "3" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam12.webp", alt: "4" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam8.webp", alt: "5" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam19.webp", alt: "6" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam44.webp", alt: "7" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam31.webp", alt: "8" },
                { src: "MEDIA/Puolustusvoimat/comcam/comcam50.webp", alt: "9" }
            ]
        }
    ];

    const titleElement = document.getElementById('changing-title');
    const gridElement   = document.getElementById('changing-grid');
    const dotsContainer = document.getElementById('category-dots');

    if (!titleElement || !gridElement) return;

    let currentCategoryIndex = 0;
    let currentImageOffset   = 0;
    let previousCategory     = -1;

    // Luodaan pisteet
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
        const isNewCategory = currentCategoryIndex !== previousCategory;

        gridElement.classList.add('loading');
        gridElement.style.opacity = '0';

        // SUBTITLE VAIHTUU VAIN KUN KATEGORIA VAIHTUU
        if (isNewCategory && titleElement) {
            titleElement.classList.remove('slide-up-active');
            titleElement.classList.add('slide-up-exit');
        }

        setTimeout(() => {
            if (isNewCategory && titleElement) {
                titleElement.textContent = category.title;
                titleElement.classList.remove('slide-up-exit');
                titleElement.classList.add('slide-up-active');
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

            previousCategory = currentCategoryIndex;
        }, 280);
    }

    updateDisplay();
    setInterval(updateDisplay, 5000);
});
