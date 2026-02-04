// SKRIPTIT/photo-buttons.js
const photoButtons = [
    {
        text: "Varaa kuvaus",
        type: "link",
        url: "#pricing",
        smoothScroll: true
    },
    {
        text: "Hinnoittelu",
        type: "link",
        url: "#final-contact",
        smoothScroll: true
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("photo-button-container");
    if (!container) return;

    photoButtons.forEach(config => {
        const btn = document.createElement("a");
        btn.className = "btn";
        btn.textContent = config.text;

        if (config.url.startsWith("#")) {
            btn.href = config.url;
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const target = document.querySelector(config.url);
                if (target) {
                    target.scrollIntoView({
                        behavior: config.smoothScroll ? "smooth" : "auto",
                        block: "start"
                    });
                }
            });
        } else {
            btn.href = config.url;
        }

        container.appendChild(btn);
    });
});
