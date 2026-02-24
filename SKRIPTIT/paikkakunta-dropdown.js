const allLocations = [
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

function getCurrentLocation() {
  let current = "";
  const title = document.title;
  const match = title.match(/Valokuvaus\s+(.+?)\s*\|\s*Iivari Kortesoja/);
  if (match) {
    current = match[1].trim();
  } else {
    let path = window.location.pathname;
    let fileName = path.split("/").pop().replace(/\.(html?)$/i, "");
    current = decodeURIComponent(fileName);
  }
  return current;
}

const current = getCurrentLocation();

let orderedLocations = allLocations.filter(loc => loc.value === current);
orderedLocations = orderedLocations.concat(allLocations.filter(loc => loc.value !== current));

const select = document.getElementById("paikkakunta-dropdown");
if (select) {
  select.innerHTML = "";
  orderedLocations.forEach(loc => {
    const option = document.createElement("option");
    option.value = loc.value;
    option.textContent = loc.text;
    if (loc.value === current && current !== "") {
      option.selected = true;
    }
    select.appendChild(option);
  });
}

window.handlePaikkakuntaChange = function(value) {
  if (!value) return;
  let url;
  if (value === "muu") {
    url = "https://iivarikortesoja.media/Valokuvaus.html";
  } else {
    url = `https://iivarikortesoja.media/Valokuvaus/${value}.html`;
  }
  window.location.href = url;
};
