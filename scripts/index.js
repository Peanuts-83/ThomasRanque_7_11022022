// DOM ELEMENTS
const search = document.querySelector('.mainSearch form');
const submit = search.querySelector('button');
const tags = document.querySelector('.tags');
const subSearch = document.querySelector('.subSearch');
const ingredients = document.querySelectorAll('.ingredients');
const appareils = document.querySelectorAll('.appareils');
const ustensiles = document.querySelectorAll('.ustensiles');
// TODO: ADD RESPONSE CARDS

// INIT BUILD HEADER
function init() {
  const subSearchValues = ['ingredients', 'appareils', 'ustensiles'];
  for (let type of subSearchValues) {
    const subBtn = new BtnSubSearch(type);
    console.log(subBtn)
    // subBtn.forEach(btn => subSearch.append(btn));
    subSearch.appendChild(subBtn.make())
  }
}

init();