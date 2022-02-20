// DOM ELEMENT REQUIRED FOR INIT
const subSearch = document.querySelector('.subSearch');
const tags = document.querySelector('.tags');


// INIT BUILD HEADER
function init() {
    const subSearchValues = ['ingredients', 'appareils', 'ustensiles'];
    for (let type of subSearchValues) {
        const subBtn = new BtnSubSearch(type);
        subBtn.make().forEach(btn => subSearch.append(btn));
    }
    // FAKE TAG
    const tag = new Tag('appareils', 'four').make();
    tags.appendChild(tag);
    const tag2 = new Tag('ingredients', 'olive de marengo').make();
    tags.appendChild(tag2);
}

init();


// DOM ELEMENTS initiated after DOM BUILD
const search = document.querySelector('.mainSearch form');
const submit = search.querySelector('button');
const ingredients = subSearch.querySelectorAll('.ingredients');
const appareils = subSearch.querySelectorAll('.appareils');
const ustensiles = subSearch.querySelectorAll('.ustensiles');
const active = subSearch.querySelectorAll('#active');
const inactive = subSearch.querySelectorAll('#inactive');
// TODO: ADD RESPONSE CARDS


////////////
// SEARCH //


//////////
// TAGS //
function closeTag(e) {
    const tagBtns = [...tags.querySelectorAll('button')];
    const [ container ] = tagBtns.filter(btn => btn.contains(e.target));
    container.remove();
}


///////////////
// SUB SEARCH //

// BTN SWAP
inactive.forEach(btn => btn.addEventListener('click', swapSubSearch));
active.forEach(btn => btn.querySelector('button').addEventListener('click', swapSubSearch));

function swapSubSearch(e) {
    // ALL BTNS INACTIVE
    [...active].forEach(elt => elt.style.display = 'none');
    [...inactive].forEach(elt => elt.style.display = 'flex');
    // ONE BTN ACTIVE
    const [container] = [...active].filter(elt => elt.contains(e.target)).length > 0
        ? [...active].filter(elt => elt.contains(e.target))
        : [...inactive].filter(elt => elt.contains(e.target));
    console.log(container)
    const isActive = container.id;
    const type = container.classList[container.classList.length - 1];
    const [siblingContainer] = [...subSearch.querySelectorAll(`.${type}`)].filter(elt => elt.id != isActive);

    container.style.display = 'flex' ? 'none' : 'flex';
    siblingContainer.style.display = container.style.display == 'flex' ? 'none' : 'flex';
}
