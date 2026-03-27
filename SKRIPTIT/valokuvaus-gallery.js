document.addEventListener('DOMContentLoaded', () => {
    // Toimii sekä pääsivulla että kaikilla alisivuilla (/Valokuvaus/Eura.html jne.)
    const basePath = window.location.pathname.includes('/Valokuvaus/') ? '../' : '';

    // TÄSSÄ MÄÄRITETÄÄN KAIKKI KUVAT – muutos täällä vaikuttaa kaikkiin sivuihin!
    const smallSequence = [[62,40,49,1,7,13,19,25,31],[68,41,52,2,8,14,20,26,32],[73,42,51,3,9,15,21,27,33],[54,43,46,4,10,16,22,28,34],[76,44,50,5,11,17,23,29,35]];
    const largeSequence = [[1,7,13,62,75,19,25,31,45],[2,8,14,68,74,20,26,32,43],[3,9,15,73,65,21,27,33,44],[4,10,16,54,72,22,28,34,41],[5,11,17,76,56,23,29,35,42],[6,12,18,65,59,24,30,36,40]];

    // Pieni galleria (yläosa)
    const smallContainer = document.querySelector('.small-gallery');
    if (smallContainer) {
        smallContainer.innerHTML = '';
        smallSequence.forEach(boxImages => {
            const item = document.createElement('div');
            item.className = 'small-item';
            boxImages.forEach((num, idx) => {
                const img = document.createElement('img');
                img.src = `${basePath}MEDIA/VALOKUVAUS/Valokuvaus${num}.webp`;
                img.alt = `Valokuvaus ${num}`;
                if (idx === 0) img.classList.add('active');
                item.appendChild(img);
            });
            smallContainer.appendChild(item);
        });
    }

    // Iso galleria (alaosa)
    const largeContainer = document.querySelector('.large-gallery');
    if (largeContainer) {
        largeContainer.innerHTML = '';
        largeSequence.forEach(boxImages => {
            const item = document.createElement('div');
            item.className = 'large-item';
            boxImages.forEach((num, idx) => {
                const img = document.createElement('img');
                img.src = `${basePath}MEDIA/VALOKUVAUS/Valokuvaus${num}.webp`;
                img.alt = `Valokuvaus ${num}`;
                if (idx === 0) img.classList.add('active');
                item.appendChild(img);
            });
            largeContainer.appendChild(item);
        });
    }

    // Käynnistä karusellit
    document.querySelectorAll('.small-item, .large-item').forEach(box => {
        const imgs = box.querySelectorAll('img');
        if (imgs.length <= 1) return;
        let i = 0;
        const delay = box.classList.contains('small-item') ? 4000 : 5000;
        setInterval(() => {
            imgs[i].classList.remove('active');
            i = (i + 1) % imgs.length;
            imgs[i].classList.add('active');
        }, delay);
    });
});
