// LOOP ALGORYTHME //

// GLOBAL VARIABLE
let recipes = [];
let searchResult = [];
let queryLength = 0;

// GET JSON DATA
function getRecipes() {
    const recipes = fetch('./assets/recipes.json')
        .then(data => data.json())
        .catch(err => console.log('Error parsing recipes:', err));
    return recipes;
}

// INIT
async function initRecipes() {
    recipes = await getRecipes();
    mainInput.value = '';
    this.value= '';
    searchRecipes();
}

/////////////////
// MAIN SEARCH //
function searchRecipes() {
    const query = this.value;
    if (query.length > 2) {
        let [searchArray, results] = [[], []];
        // CHECK FOR ERASE STRING / Keep old search OR reload all recipes
        if (queryLength > query.length) {
            searchArray = [...recipes];
        } else {
            searchArray = searchResult.length > 0 ? [...searchResult] : [...recipes];
        }

        for (let recipe of searchArray) {
            let _added = false;
            if (recipe.name.toLowerCase().includes(query)) {
                results.push(recipe);
                _added = true;
            } else if (recipe.description.toLowerCase().includes(query) && !_added) {
                results.push(recipe);
                _added = true;
            } else if (!_added) {
                for (let ingr of recipe.ingredients) {
                    if (ingr.ingredient.toLowerCase().includes(query) && !_added) {
                        results.push(recipe);
                        _added = true;
                    }
                }
            }
        }

        searchResult = [...results];
        queryLength = query.length;
        if (tags.children.length > 0) {
            filterTag();
        } else {
            displayRecipes(searchResult);
        }
        // console.log('RECIPES QTY:', recipes.length, '- SEARCH RES QTY:', searchResult.length, '- TAGS LENGTH:', tags.children.length);
    } else {
        searchResult = [...recipes];
        queryLength = 0;
        if (tags.children.length > 0) {
            filterTag();
        } else {
            displayRecipes(searchResult);
        }
    }
}

// DISPLAY
function displayRecipes(data) {
    results.innerHTML = '';
    for (let recipe of data) {
        let card = new Card(recipe).make();
        results.appendChild(card);
    }
}



////////////////
// SUB-SEARCH //

// FILTER RECIPES WITH TAG
function filterTag() {
    let baseSearch = searchResult;
    const tagsArray = [...tags.children];

    tagsArray.forEach(elt => {
        const type = elt.title;
        const value = elt.id;
        baseSearch = baseSearch.filter(recipe => {
            switch(type) {
                case 'ingredients':
                    return recipe[type].some(ingr => ingr.ingredient.toLowerCase() == value);
                    break;
                case 'appliance':
                    return recipe.appliance.toLowerCase() == value;
                case 'ustensils':
                    return recipe.ustensils.some(ust => ust.toLowerCase() == value);
                default:
                    console.log(`Error filtering with TAG ${value}.`);
            }
        })
    })
    displayRecipes(baseSearch);
}

// GET TAGS
function getTags(type) {
    let tagList = new Set();
    console.log('RECIPES QTY:', recipes.length, '- SEARCH RES QTY:', searchResult.length)

    for (let recipe of searchResult) {
        if (recipe[type]) {
            switch(type) {
                case 'ingredients':
                    recipe[type].forEach(ingr => tagList.add(ingr.ingredient.toLowerCase()));
                    break;
                case 'appliance':
                    tagList.add(recipe[type].toLowerCase());
                    break;
                case 'ustensils':
                    recipe[type].forEach(ust => tagList.add(ust.toLowerCase()));
                    break;
                default:
                    console.log('Error parsing Tag list.');
            }
        }
    }

    return [...tagList].sort((a,b) => {
        // WORDS WITHOUT ACCENTS
        const A = a.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const B = b.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        // SORT WORDS
        if (A < B) {
            return -1;
        } else if (A > B) {
            return 1;
        } else {
            return 0;
        }
    });
}