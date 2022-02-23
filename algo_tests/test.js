// DOM ELEMENTS
const loopSolution = document.querySelector('#loop');
const arraySolution = document.querySelector('#array');
const loopBtn = document.querySelector('#loop-btn');
const arrayBtn = document.querySelector('#array-btn');
const loopRes = document.querySelector('#res_loop');
const arrayRes = document.querySelector('#res_array');

// GLOBALS
let recipes = [];

// GET JSON DATA
function getRecipes() {
    const recipes = fetch('./recipes.json')
                    .then(data => data.json())
                    .catch(err => console.log('Error parsing recipes:', err));
    return recipes;
}


// INIT
async function init() {
    recipes = await getRecipes();
    loopSolution.oninput = search;
    arraySolution.oninput = search;
}

init();


// INIT SEARCH
function search() {
    const query = this.value.toLowerCase();
    console.log(query);
    if (query.length >= 3) {
        this.id == 'loop' ? loopAlgo(query) : arrayAlgo(query);
    }

}


///////////////////////
// FOR LOOP SOLUTION //
function loopAlgo(query) {
    if (query == 'end') {
        let res = loopTimes.reduce((sum, ms) => sum + ms, 0);
        loopRes.innerText += `TOTAL: ${res}ms.\n\n`;
        return;
    }
    console.time('OPTION 1 - LOOP');
    const start = performance.now();

    const showResults = document.querySelector('.for_loop .results');
    showResults.innerText = '';
    let results = [];
    for (let recipe of recipes) {
        let _added = false;
        if (recipe.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(query)) {
            results.push(recipe);
            // console.log('NAME', recipe.name);
            _added = true;
        }  else if (recipe.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(query) && !_added) {
            results.push(recipe);
            // console.log('DESCR', recipe.description);
            _added = true;
        } else if (!_added) {
            for (let ingr of recipe.ingredients) {
                if (ingr.ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(query) && !_added) {
                    results.push(recipe);
                    // console.log('INGR', ingr.ingredient);
                    _added = true;
                }
            }
        }
    }
    for (let recipe of results) {
        showResults.innerText += recipe.name + '\n';
    }

    const end = performance.now();
    loopRes.innerText += `${end - start}ms - ${query}\n`;
    loopTimes.push(end - start);
    console.log('nbre de réponses:', results.length);
    console.timeEnd('OPTION 1 - LOOP');
}


////////////////////
// ARRAY SOLUTION //
function arrayAlgo(query) {
    if (query == 'end') {
        let res = arrayTimes.reduce((sum, ms) => sum + ms, 0);
        arrayRes.innerText += `TOTAL: ${res}ms.\n\n`;
        return;
    }
    console.time('OPTION 2 - ARRAY');
    const start = performance.now();

    const showResults = document.querySelector('.array .results');
    showResults.innerText = '';
    let results = recipes.filter(recipe => {
        return recipe.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(query) ||
        recipe.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(query) ||
        recipe.ingredients.filter(ingr => ingr.ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(query)).length >= 1;
    });
    results.forEach(recipe => showResults.innerText += recipe.name + '\n');

    const end = performance.now();
    arrayRes.innerText += `${end - start}ms - ${query}\n`;
    arrayTimes.push(end - start);
    console.log('nbre de réponses:', results.length);
    console.timeEnd('OPTION 2 - ARRAY');
}


/////////////////////
// AUTO-TEST FUNCTIONS //
loopBtn.onclick = () => test('loop');
arrayBtn.addEventListener('click', () => test('array'));
let [loopTimes, arrayTimes] = [[], []];

function test(type) {
    console.log('TEST STARTING');
    loopTimes = [];
    arrayTimes = [];
    type == 'loop' ? loopRes.innerText = '' : arrayRes.innerText = '';

    const queries = [
        'tomate',
        'olive',
        'salade',
        'oignon',
        'boeuf',
        'poulet',
        'des',
        'les',
        'coc',
        'pat',
        'gramme',
        'blender',
        'four',
        'end'
    ];

    for (let query of queries) {
        this.value = query;
        this.id = type;
        search();
    }
}