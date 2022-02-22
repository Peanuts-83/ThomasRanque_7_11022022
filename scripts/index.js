// DOM ELEMENT REQUIRED FOR INIT
const subSearch = document.querySelector('.subSearch');
const tags = document.querySelector('.tags');


// INIT BUILD HEADER
function init() {
    const subSearchValues = ['ingredients', 'appliance', 'ustensils'];
    for (let type of subSearchValues) {
        const subBtn = new BtnSubSearch(type);
        subBtn.make().forEach(btn => subSearch.append(btn));
    }
}

init();


// DOM ELEMENTS initiated after DOM BUILD
const search = document.querySelector('.mainSearch form');
const mainInput = search.querySelector('#mainSearchInput');
const submit = search.querySelector('button');
const ingredients = subSearch.querySelectorAll('.ingredients');
const appareils = subSearch.querySelectorAll('.appliance');
const ustensiles = subSearch.querySelectorAll('.ustensils');
const active = subSearch.querySelectorAll('#active');
const inactive = subSearch.querySelectorAll('#inactive');
const results = document.querySelector('main .container-row');


////////////
// SEARCH //
window.addEventListener('load', initRecipes);       // to search.js function //TODO: Ask if prealoder ok?
mainInput.addEventListener('input', searchRecipes);    // to search.js function
search.addEventListener('submit', (e) => e.preventDefault());


//////////
// TAGS //
function closeTag(e) {
    const tagBtns = [...tags.querySelectorAll('button')];
    const [container] = tagBtns.filter(btn => btn.contains(e.target));
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
    const isActive = container.id;
    const type = container.classList[container.classList.length - 1];
    const [siblingContainer] = [...subSearch.querySelectorAll(`.${type}`)].filter(elt => elt.id != isActive);

    // SWAP Active/Inactive BTN
    container.style.display = 'flex' ? 'none' : 'flex';
    siblingContainer.style.display = container.style.display == 'flex' ? 'none' : 'flex';

    // LIST TAGS IF Inactive BTN CLICKED
    if (isActive == 'inactive') {
        listTags(type);
    }
}

// TAG LIST BUILD
function listTags(type) {
    const selector = { 'ingredients': ingredients, 'appliance': appareils, 'ustensils': ustensiles };
    const [tagContainer] = [...selector[type]].filter(elt => elt.classList.contains(type) && elt.id == 'active');
    const tagResult = tagContainer.querySelector('.tag-result');

    // DISPLAY TAGS IN SUB SEARCH BTN
    let tagList = getTags(type);
    for (let tag of tagList) {
        tagResult.innerHTML += `<a href="#" class="tag ${type}">${tag}</a><br>`;
    }

    // ADD EVENTLISTENER ON EACH TAG
    tagResult.childNodes.forEach(elt => {
        if (elt.classList.contains('tag')) {
            elt.addEventListener('click', function() {addTag(type, this)});
        }
    })
}

// ADD TAG
function addTag(type, target) {
    const tag = new Tag(type, target.innerHTML).make();
    tags.appendChild(tag);
}


/////////////////
// RESULT CARD //
function displayResults() {
    for (let recipe of searchResult) {
        results.appendChild(recipe);
    }
}
