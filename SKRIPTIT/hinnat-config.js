// SKRIPTIT/hinnat-config.js
// ───────────────────────────────────────────────
// Keskitetty hinnoittelu – muokkaa vain tästä!
// ───────────────────────────────────────────────

const PRICE_CONFIG = {
    // Kaikille paikkakunnille yhteinen korotus (euroa)
    // Muuta tätä jos haluat nostaa/laskea kaikkia hintoja kerralla
    globalExtra: 500,

    // Paikkakuntakohtaiset asetukset
    locations: {
        "Eura": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Eurajoki": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Harjavalta": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Huittinen": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Ikaalinen": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Kankaanpää": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Karvia": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Kokemäki": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Nakkila": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Noormarkku": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Parkano": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Pori": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Pomarkku": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Rauma": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Sastamala": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Seinäjoki": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Säkylä": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Tampere": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Ulvila": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Vaasa": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },
        "Ylöjärvi": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        },

        // Jos paikkakuntaa ei löydy listalta (turva-arvo)
        "_default": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 900
        }
    }
};

// Funktio, joka palauttaa lopulliset hinnat tietylle paikkakunnalle
function getPricesForLocation(locationName) {
    const loc = PRICE_CONFIG.locations[locationName] || PRICE_CONFIG.locations["_default"];
    const globalEx = PRICE_CONFIG.globalExtra || 0;
    const locEx    = loc.extra || 0;

    const totalExtra = globalEx + locEx;

    return {
        "3 tuntia":    (loc["3 tuntia"]   || 350) + totalExtra,
        "4-6 tuntia":  (loc["4-6 tuntia"] || 700) + totalExtra,
        "Hääpaketti":  (loc["Hääpaketti"] || 900) + totalExtra
    };
}
