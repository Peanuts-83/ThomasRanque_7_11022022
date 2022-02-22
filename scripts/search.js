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
    this.value= '';
    searchRecipes();
    console.log('THIS INIT',this.value)
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
                console.log(typeof recipe)
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
        // console.log('RES RECIPES:', searchResult);
        queryLength = query.length;
        displayRecipes(searchResult);
    } else {
        searchResult = [...recipes];
        queryLength = 0;
        displayRecipes([...recipes])
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

// GET TAGS
function getTags(type) {
    let tagList = new Set();
    for (let recipe of recipes) {
        if (recipe[type]) {
            switch(type) {
                case 'ingredients':
                    recipe[type].forEach(ingr => tagList.add(ingr.ingredient));
                    break;
                case 'appliance':
                    tagList.add(recipe[type]);
                    break;
                case 'ustensils':
                    recipe[type].forEach(ust => tagList.add(ust));
                    break;
                default:
                    console.log('Error parsing Tag list.');
            }
        }
    }
    return tagList;
}