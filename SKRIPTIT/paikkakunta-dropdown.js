// SKRIPTIT/paikkakunta-dropdown.js
// Tehdään paikkakuntalista globaaliksi
window.allLocations = [
  {value: "Eura", text: "Eura"},
  {value: "Eurajoki", text: "Eurajoki"},
  {value: "Harjavalta", text: "Harjavalta"},
  {value: "Huittinen", text: "Huittinen"},
  {value: "Ikaalinen", text: "Ikaalinen"},
  {value: "Kankaanpää", text: "Kankaanpää"},
  {value: "Karvia", text: "Karvia"},
  {value: "Kokemäki", text: "Kokemäki"},
  {value: "Nakkila", text: "Nakkila"},
  {value: "Noormarkku", text: "Noormarkku"},
  {value: "Parkano", text: "Parkano"},
  {value: "Pori", text: "Pori"},
  {value: "Pomarkku", text: "Pomarkku"},
  {value: "Rauma", text: "Rauma"},
  {value: "Sastamala", text: "Sastamala"},
  {value: "Seinäjoki", text: "Seinäjoki"},
  {value: "Säkylä", text: "Säkylä"},
  {value: "Tampere", text: "Tampere"},
  {value: "Ulvila", text: "Ulvila"},
  {value: "Vaasa", text: "Vaasa"},
  {value: "Ylöjärvi", text: "Ylöjärvi"},
  {value: "muu", text: "Muu Suomi (kysy tarjousta)"}
];

// Tarkistetaan onko kyseessä "pääsivu" (ei valittua paikkakuntaa)
function isMainPage() {
  const path = window.location.pathname.toLowerCase().trim();
  return path === '/' ||
         path === '/valokuvaus.html' ||
         path === '/testi.html' ||
         path === '/valokuvaus/satakunta.html' ||
         path.endsWith('/valokuvaus.html');
}

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById("paikkakunta-dropdown");
  if (!select) return;

  const currentPath = window.location.pathname.toLowerCase();
  let current = "";

  // Yritetään löytää nykyinen paikkakunta otsikosta tai polusta
  const titleMatch = document.title.match(/Valokuvaus\s+(.+?)\s*\|\s*Iivari Kortesoja/i);
  if (titleMatch) {
    current = titleMatch[1].trim();
  } else {
    const file = currentPath.split("/").pop().replace(/\.(html?)$/i, "");
    if (file && file !== "valokuvaus" && file !== "testi" && file !== "satakunta") {
      current = decodeURIComponent(file);
    }
  }

  select.innerHTML = "";

  // Jos ollaan pääsivulla → ensimmäinen vaihtoehto on "Valitse Paikkakunta"
  if (isMainPage()) {
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Valitse Paikkakunta";
    placeholder.selected = true;
    placeholder.disabled = true;
    select.appendChild(placeholder);
  }

  // Lisätään muut paikkakunnat (nykyinen paikkakunta ensimmäiseksi jos ei pääsivu)
  let ordered = window.allLocations.filter(loc => loc.value === current);
  ordered = ordered.concat(window.allLocations.filter(loc => loc.value !== current));

  ordered.forEach(loc => {
    const option = document.createElement("option");
    option.value = loc.value;
    option.textContent = loc.text;
    
    // Valitaan nykyinen paikkakunta (ei pääsivulla)
    if (!isMainPage() && loc.value === current) {
      option.selected = true;
    }
    select.appendChild(option);
  });
});

// Dropdownin vaihto-toiminto
window.handlePaikkakuntaChange = function(value) {
  if (!value) return;   // Ei tee mitään jos "Valitse Paikkakunta" valittu

  let url;
  if (value === "muu") {
    url = "https://www.iivarikortesoja.media/Valokuvaus.html";
  } else {
    url = `https://www.iivarikortesoja.media/Valokuvaus/${value}.html`;
  }
  window.location.href = url;
};
