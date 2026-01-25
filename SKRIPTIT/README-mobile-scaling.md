# Mobile Scaling Script

## Kuvaus / Description

**Suomeksi:**
`mobile-scaling.js` on skripti, joka parantaa verkkosivuston mobiilikokemusta. Se tunnistaa automaattisesti mobiililaitteet ja säätää viewport-asetukset optimaalisiksi mobiilikatselulle.

**English:**
`mobile-scaling.js` is a script that improves the mobile experience of the website. It automatically detects mobile devices and adjusts viewport settings for optimal mobile viewing.

## Toiminnallisuus / Features

### 1. Mobiililaitteiden tunnistus / Mobile Device Detection
Skripti tunnistaa mobiililaitteet kolmella tavalla:
- **User Agent** -tarkistus (iPhone, Android, iPad, jne.)
- **Näytön koko** (alle 768px leveys)
- **Kosketusnäyttö** -tuki

### 2. Viewport-säätö / Viewport Adjustment
Kun mobiililaite havaitaan, skripti muuttaa viewport-metatietoja:
```html
<meta name="viewport" content="width=device-width, initial-scale=0.9, maximum-scale=1.5, user-scalable=yes">
```

**Parametrit:**
- `initial-scale=0.9`: Sisältö on hieman "uloszoomattu" (90%), jolloin sivuilla on enemmän tilaa
- `maximum-scale=1.5`: Käyttäjä voi zoomata sisään tarvittaessa
- `user-scalable=yes`: Zoomaus on sallittu

### 3. Lisätyylitys / Additional Styling
Skripti lisää automaattisesti CSS-tyylit, jotka:
- Lisäävät pientä sisäistä marginaalia (padding) body-elementtiin
- Kunnioittavat "safe areas" -alueita (esim. iPhone notch)
- Varmistavat, että sisältö ei ole täysin reunasta reunaan

## Käyttöönotto / Implementation

Skripti on lisätty kaikkiin HTML-sivuihin:
```html
<script src="SKRIPTIT/mobile-scaling.js" defer></script>
```

## Päivitetyt sivut / Updated Pages

1. `index.html`
2. `indexi.html`
3. `yhteystiedot.html`
4. `valokuvaus.html`
5. `puolustusvoimat.html`
6. `Linkkipuu.html`
7. `HardcoreKristityt.html`
8. `etusivu (1).html`

## Tekniset yksityiskohdat / Technical Details

### Suoritusjärjestys / Execution Order
1. Skripti latautuu `defer`-attribuutilla, joten se suoritetaan vasta kun DOM on valmis
2. Mobiililaitteen tunnistus tapahtuu välittömästi
3. Viewport-muutokset tehdään vain mobiililaitteilla
4. Tyylitiedot injektoidaan `<head>`-osioon dynaamisesti

### Suorituskyky / Performance
- Minimaalinen vaikutus sivun latausnopeuteen
- Ei vaikuta työpöytäselaimiin
- Tapahtuu vain kerran sivun latauksen yhteydessä
- Reagoi näytön koon muutoksiin (orientaation vaihto)

## Testaus / Testing

Testaa skriptin toimintaa:
1. Avaa sivu mobiililaitteella tai käytä selaimen kehittäjätyökaluja
2. Valitse mobiililaitteen emulointi (esim. iPhone, Android)
3. Tarkista, että sisällöllä on hieman tilaa näytön reunoilla
4. Varmista, että zoomaus toimii (pinch to zoom)

## Huomioitavaa / Notes

- Skripti ei muuta mitään työpöytäselaimissa
- Alkuperäiset viewport-metatiedot säilyvät HTML-tiedostoissa
- Skripti on yhteensopiva kaikkien modernien selainten kanssa
- Toimii myös vanhemmilla mobiililaitteilla

## Versiohistoria / Version History

- **v1.0.0** (2025-01-25): Ensimmäinen versio
  - Mobiililaitteiden tunnistus
  - Viewport-säätö (initial-scale=0.9)
  - Automaattinen padding-lisäys
  - Safe area -tuki

## Lisätiedot / Additional Information

Jos haluat säätää zoom-tasoa, muokkaa `initial-scale`-arvoa:
- `0.9` = 90% zoom (nykyinen, suositeltu)
- `0.85` = 85% zoom (enemmän tilaa)
- `0.95` = 95% zoom (vähemmän tilaa)

Muutokset tehdään tiedostoon: `SKRIPTIT/mobile-scaling.js`, rivillä 50.
