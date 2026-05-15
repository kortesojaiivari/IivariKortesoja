// SKRIPTIT/hinnat-config-new.js
// ───────────────────────────────────────────────
// Keskitetty hinnoittelu – muokkaa vain tästä!
// ───────────────────────────────────────────────
const PRICE_CONFIG = {
    // Kaikille paikkakunnille yhteinen korotus (euroa)
    globalExtra: 0,
    // Paikkakuntakohtaiset asetukset
    locations: {
        "Eura": {
            extra: 60,
            "3 tuntia": 410,
            "4-6 tuntia": 760,
            "Hääpaketti": 1300,
            "Hautajaiset / Siunaustilaisuus": 260
        },
        "Eurajoki": {
            extra: 60,
            "3 tuntia": 410,
            "4-6 tuntia": 760,
            "Hääpaketti": 1300,
            "Hautajaiset / Siunaustilaisuus": 260
        },
        "Harjavalta": {
            extra: 40,
            "3 tuntia": 390,
            "4-6 tuntia": 740,
            "Hääpaketti": 1300,
            "Hautajaiset / Siunaustilaisuus": 240
        },
        "Huittinen": {
            extra: 50,
            "3 tuntia": 400,
            "4-6 tuntia": 750,
            "Hääpaketti": 1300,
            "Hautajaiset / Siunaustilaisuus": 250
        },
        "Ikaalinen": {
            extra: 40,
            "3 tuntia": 390,
            "4-6 tuntia": 740,
            "Hääpaketti": 1300,
            "Hautajaiset / Siunaustilaisuus": 240
        },
        "Kankaanpää": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 1300,
            "Hautajaiset / Siunaustilaisuus": 200
        },
        "Karvia": {
            extra: 30,
            "3 tuntia": 380,
            "4-6 tuntia": 730,
            "Hääpaketti": 1300,
            "Hautajaiset / Siunaustilaisuus": 230
        },
        "Kokemäki": {
            extra: 50,
            "3 tuntia": 400,
            "4-6 tuntia": 750,
            "Hääpaketti": 1300,
            "Hautajaiset / Siunaustilaisuus": 250
        },
        "Nakkila": {
            extra: 40,
            "3 tuntia": 390,
            "4-6 tuntia": 740,
            "Hääpaketti": 1300,
            "Hautajaiset / Siunaustilaisuus": 240
        },
        "Noormarkku": {
            extra: 30,
            "3 tuntia": 380,
            "4-6 tuntia": 730,
            "Hääpaketti": 1300,
            "Hautajaiset / Siunaustilaisuus": 230
        },
        "Parkano": {
            extra: 40,
            "3 tuntia": 390,
            "4-6 tuntia": 740,
            "Hääpaketti": 1300,
            "Hautajaiset / Siunaustilaisuus": 240
        },
        "Pori": {
            extra: 30,
            "3 tuntia": 380,
            "4-6 tuntia": 730,
            "Hääpaketti": 1300,
            "Hautajaiset / Siunaustilaisuus": 230
        },
        "Pomarkku": {
            extra: 20,
            "3 tuntia": 370,
            "4-6 tuntia": 720,
            "Hääpaketti": 1300,
            "Hautajaiset / Siunaustilaisuus": 220
        },
        "Rauma": {
            extra: 60,
            "3 tuntia": 410,
            "4-6 tuntia": 760,
            "Hääpaketti": 1300,
            "Hautajaiset / Siunaustilaisuus": 260
        },
        "Sastamala": {
            extra: 40,
            "3 tuntia": 390,
            "4-6 tuntia": 740,
            "Hääpaketti": 1300,
            "Hautajaiset / Siunaustilaisuus": 240
        },
        "Seinäjoki": {
            extra: 100,
            "3 tuntia": 450,
            "4-6 tuntia": 800,
            "Hääpaketti": 1300,
            "Hautajaiset / Siunaustilaisuus": 300
        },
        "Säkylä": {
            extra: 60,
            "3 tuntia": 410,
            "4-6 tuntia": 760,
            "Hääpaketti": 1300,
            "Hautajaiset / Siunaustilaisuus": 260
        },
        "Tampere": {
            extra: 100,
            "3 tuntia": 450,
            "4-6 tuntia": 800,
            "Hääpaketti": 1400,
            "Hautajaiset / Siunaustilaisuus": 300
        },
        "Ulvila": {
            extra: 40,
            "3 tuntia": 390,
            "4-6 tuntia": 740,
            "Hääpaketti": 1300,
            "Hautajaiset / Siunaustilaisuus": 240
        },
        "Vaasa": {
            extra: 100,
            "3 tuntia": 450,
            "4-6 tuntia": 800,
            "Hääpaketti": 1400,
            "Hautajaiset / Siunaustilaisuus": 300
        },
        "Ylöjärvi": {
            extra: 100,
            "3 tuntia": 450,
            "4-6 tuntia": 800,
            "Hääpaketti": 1400,
            "Hautajaiset / Siunaustilaisuus": 300
        },
        // Turva-arvo
        "_default": {
            extra: 0,
            "3 tuntia": 350,
            "4-6 tuntia": 700,
            "Hääpaketti": 1300,
            "Hautajaiset / Siunaustilaisuus": 200
        }
    }
};

// Funktio, joka palauttaa lopulliset hinnat tietylle paikkakunnalle
function getPricesForLocation(locationName) {
    const loc = PRICE_CONFIG.locations[locationName] || PRICE_CONFIG.locations["_default"];
    const globalEx = PRICE_CONFIG.globalExtra || 0;
    const locEx = loc.extra || 0;
    const totalExtra = globalEx + locEx;
    return {
        "3 tuntia": (loc["3 tuntia"] || 350) + totalExtra,
        "4-6 tuntia": (loc["4-6 tuntia"] || 700) + totalExtra,
        "Hääpaketti": (loc["Hääpaketti"] || 1300) + totalExtra,
        "Hautajaiset / Siunaustilaisuus": (loc["Hautajaiset / Siunaustilaisuus"] || 200) + totalExtra
    };
}
