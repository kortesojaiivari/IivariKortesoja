// SKRIPTIT/buttons.js
// Hallinnoi etusivun nappuloita dynaamisesti

const actionButtons = [
    {
        text: "Valokuvaus",
        type: "link",
        url: "Valokuvaus.html"
    },
    {
        text: "Portfolio",
        type: "link",                       // siirtyy toiselle sivulle
        url: "Portfolio.html"
    }
    // Voit lisätä tähän lisää nappuloita helposti, esim:
    // {
    //     text: "Ota yhteyttä",
    //     type: "scroll",
    //     target: "#contact",
    //     smooth: true
    // },
    // {
    //     text: "Some",
    //     type: "link",
    //     url: "https://www.instagram.com/..."
    // }
];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("button-container");
    if (!container) return;

    actionButtons.forEach(buttonConfig => {
        const btn = document.createElement("a");
        btn.className = "btn";
        btn.textContent = buttonConfig.text;

        if (buttonConfig.type === "scroll" && buttonConfig.target) {
            btn.href = buttonConfig.target;
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const targetElement = document.querySelector(buttonConfig.target);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: buttonConfig.smooth ? "smooth" : "auto",
                        block: "start"
                    });
                }
            });
        } 
        else if (buttonConfig.type === "link" && buttonConfig.url) {
            btn.href = buttonConfig.url;
            if (buttonConfig.target === "_blank") {
                btn.target = "_blank";
                btn.rel = "noopener noreferrer";
            }
        }

        container.appendChild(btn);
    });
});
