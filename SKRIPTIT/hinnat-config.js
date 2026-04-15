// SKRIPTIT/hinnat-config.js
// ───────────────────────────────────────────────
// Keskitetty hinnoittelu – muokkaa vain tästä!
// ───────────────────────────────────────────────

const PRICE_CONFIG = {
    // Kaikille paikkakunnille yhteinen korotus (euroa)
    // Muuta tätä jos haluat nostaa/laskea kaikkia hintoja kerralla
    globalExtra: 0,

    // Paikkakuntakohtaiset asetukset
    locations: {
        "Eura": {
            extra: 0,
            "3 tuntia": 410,
            "4-6 tuntia": 760,
            "Hääpaketti": 1300
        },
        "Eurajoki": {
            extra: 0,
            "3 tuntia": 410,
            "4-6 tuntia": 760,
            "Hääpaketti": 1300
        },
        "Harjavalta": {
            extra: 0,
            "3 tuntia": 390,
            "4-6 tuntia": 740,
            "Hääpaketti": 1300
        },
        "Huittinen": {
            extra: 0,
            "3 tuntia": 400,
            "4-6 tuntia": 750,
            "Hääpaketti": 1300
        },
        "Ikaalinen": {
            extra: 0,
            "3 tuntia": 390,
            "4-6 tuntia": 740,
            "Hääpaketti": 1300
        },
        "Kankaanpää": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 1300
        },
        "Karvia": {
            extra: 0,
            "3 tuntia": 380,
            "4-6 tuntia": 730,
            "Hääpaketti": 1300
        },
        "Kokemäki": {
            extra: 0,
            "3 tuntia": 400,
            "4-6 tuntia": 750,
            "Hääpaketti": 1300
        },
        "Nakkila": {
            extra: 0,
            "3 tuntia": 390,
            "4-6 tuntia": 740,
            "Hääpaketti": 1300
        },
        "Noormarkku": {
            extra: 0,
            "3 tuntia": 380,
            "4-6 tuntia": 730,
            "Hääpaketti": 1300
        },
        "Parkano": {
            extra: 0,
            "3 tuntia": 390,
            "4-6 tuntia": 740,
            "Hääpaketti": 1300
        },
        "Pori": {
            extra: 0,
            "3 tuntia": 380,
            "4-6 tuntia": 730,
            "Hääpaketti": 1300
        },
        "Pomarkku": {
            extra: 0,
            "3 tuntia": 370,
            "4-6 tuntia": 720,
            "Hääpaketti": 1300
        },
        "Rauma": {
            extra: 0,
            "3 tuntia": 410,
            "4-6 tuntia": 760,
            "Hääpaketti": 1300
        },
        "Sastamala": {
            extra: 0,
            "3 tuntia": 390,
            "4-6 tuntia": 740,
            "Hääpaketti": 1300
        },
        "Seinäjoki": {
            extra: 0,
            "3 tuntia": 450,
            "4-6 tuntia": 800,
            "Hääpaketti": 1300
        },
        "Säkylä": {
            extra: 0,
            "3 tuntia": 410,
            "4-6 tuntia": 760,
            "Hääpaketti": 1300
        },
        "Tampere": {
            extra: 0,
            "3 tuntia": 450,
            "4-6 tuntia": 800,
            "Hääpaketti": 1400
        },
        "Ulvila": {
            extra: 0,
            "3 tuntia": 390,
            "4-6 tuntia": 740,
            "Hääpaketti": 1300
        },
        "Vaasa": {
            extra: 0,
            "3 tuntia": 450,
            "4-6 tuntia": 800,
            "Hääpaketti": 1400
        },
        "Ylöjärvi": {
            extra: 0,
            "3 tuntia": 450,
            "4-6 tuntia": 800,
            "Hääpaketti": 1400
        },

        // Jos paikkakuntaa ei löydy listalta (turva-arvo)
        "_default": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 1300
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
        "Hääpaketti":  (loc["Hääpaketti"] || 1300) + totalExtra
    };
}
