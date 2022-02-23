// LOOP ALGORYTHME //

// GLOBALS
let recipes = [];
let searchResult = [];
let queryLength = 0;
let tagLength = 0;

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
    this.value = '';
    searchRecipes();
}

/////////////////
// MAIN SEARCH //
function searchRecipes() {
    const query = this.value;
    // BEGIN FILTER RECIPES
    if (query.length > 2) {
        let [searchArray, results] = [[], []];

        // CHECK FOR ERASE STRING / Keep old search OR reload all recipes
        if (queryLength > query.length) {
            searchArray = [...recipes];
        } else {
            searchArray = searchResult.length > 0 ? [...searchResult] : [...recipes];
        }

        // SEARCH ALGO - LOOP BASED //
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
            filterByTag();
        } else {
            displayRecipes(searchResult);
        }

    } else {
        // DISPLAY ALL RECIPES
        searchResult = [...recipes];
        queryLength = 0;
        if (tags.children.length > 0) {
            filterByTag();
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

// SEARCH TAGS
function searchTags(e) {
    if (e.target.style.display != 'none') {
        const query = e.target.value;   // tag name
        const container = e.target.parentElement.parentElement;
        let type = [...container.classList];
        type = type[type.length - 1];   // ingredients || appliance || ustensils
        let list = [...container.dataset.list.split(',')];    // tagList from data-list

        // EXCLUDE TAGS !MATCHING QUERY
        let newList = query.length == 0 ? [...list] : [...list.filter(elt => elt.includes(query))];
        // EXCLUDE TAGS ALREADY CHECKED
        const checkedTags = tags.children.length == 0 ? null : tags.children;
        if (checkedTags) {
            console.log(checkedTags)
            for (let checkedTag of checkedTags) {
                newList = newList.filter(elt => !elt.includes(checkedTag.id));
            }
        }
        listTags(type, newList);
    }
}

// FILTER RECIPES WITH TAG
function filterByTag(baseSearch = searchResult) {
    const tagsArray = [...tags.children];

    tagsArray.forEach(elt => {
        const type = elt.title;
        const value = elt.id;

        // FILTER RECIPES
        baseSearch = baseSearch.filter(recipe => {
            switch (type) {
                case 'ingredients':
                    return recipe[type].some(ingr => ingr.ingredient.toLowerCase() == value);
                case 'appliance':
                    return recipe.appliance.toLowerCase() == value;
                case 'ustensils':
                    return recipe.ustensils.some(ust => ust.toLowerCase() == value);
                default:
                    console.log(`Error filtering with TAG ${value}.`);
            }
        })

        // ACTIVE TAGS TO HIDDEN LIST
        hiddenTags.push(value);
        listTags(type);
    })
    displayRecipes(baseSearch);
}

// GET TAGS
function getTags(type) {
    let tagList = new Set();
    let recipeList = searchResult.length > 0 ? searchResult : recipes;

    for (let recipe of recipeList) {
        if (recipe[type]) {
            switch (type) {
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
    // console.log('getTags() - RECIPELIST', recipeList, ' - TAGLIST', tagList)
    }

    return [...tagList].sort((a, b) => {
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