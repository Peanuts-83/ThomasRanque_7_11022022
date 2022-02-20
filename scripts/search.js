// ARRAY ALGORYTHME //

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
}

// SEARCH
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

        results = searchArray.filter(recipe => {
            return recipe.name.toLowerCase().includes(query)
                || recipe.description.toLowerCase().includes(query)
                || recipe.ingredients.filter(ingr => ingr.ingredient.toLowerCase().includes(query)).length >= 1;
            });

        searchResult = [...results];
        queryLength = query.length;
        displayRecipes(searchResult);
    } else {
        searchResult = [...recipes];
        queryLength = 0;
        results.innerHTML = '';
    }
}

// DISPLAY
function displayRecipes(data) {
    results.innerHTML = '';
    data.forEach(recipe => {
        let card = new Card(recipe).make();
        results.appendChild(card);
    });
}