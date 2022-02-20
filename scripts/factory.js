//////////////////
// TAGS Factory //
class Tag {
    static #idNum = 0;
    constructor(type, txt) {
        this.type = type;
        this.txt = txt;
        this.color = this.defColor();
        this.idNum = Tag.#idNum++;
    }
    defColor() {
        switch (this.type) {
            case 'ingredients':
                return 'primary';
            case 'appareils':
                return 'success';
            case 'ustensiles':
                return 'danger';
            default:
                console.log('ERROR with TAG type constructor! Define new search type or check type...');
        }
    }
    make() {
        const tag = document.createElement('button');
        tag.classList = `btn w-auto rounded d-flex align-items-center text-white bg-${this.color}`;
        tag.id = `id#${this.idNum}`;
        tag.innerHTML = `${this.txt} <span><i class="far fa-times-circle ms-2"></i></span>`;
        tag.addEventListener('click', closeTag);
        return tag;
    }
}


///////////////////////////
//BTN SUB SEARCH Factory //
class BtnSubSearch {
    constructor(type) {
        this.type = type;
        this.color = this.defColor();
    }
    defColor() {
        switch (this.type) {
            case 'ingredients':
                return 'primary';
            case 'appareils':
                return 'success';
            case 'ustensiles':
                return 'danger';
            default:
                console.log('ERROR with BTN type constructor! Define new search type or check type...');
        }
    }
    makeInactive() {
        const container = document.createElement('div');
        const btn1 = document.createElement('button');
        const btn2 = document.createElement('button');

        container.classList = `col-1 px-0 input-group ${this.type}`;
        container.id = 'inactive';
        btn1.classList = `form-control form-control-lg py-4 rounded-left border-0 text-white bg-${this.color}`;
        btn1.innerText = this.type[0].toUpperCase() + this.type.substr(1);
        btn2.classList = `input-group-text px-3 rounded-right border-0 text-white bg-${this.color}`;
        btn2.innerHTML = '<i class="fas fa-chevron-down"></i>';

        container.appendChild(btn1);
        container.appendChild(btn2);
        return container;
    }
    makeActive() {
        const container = document.createElement('div');
        const divQ = document.createElement('div');
        const input = document.createElement('input');
        const btn = document.createElement('button');
        const divR = document.createElement('div');

        container.className = `row rounded bg-${this.color} ${this.type}`;
        container.id = 'active';
        divQ.classList = `col input-group`;
        input.classList = `form-control form-control-lg py-4 rounded-left border-0 text-white bg-${this.color}`;
        input.type = 'text';
        input.name = this.type;
        input.placeholder = `Rechercher un ${this.type.substr(0, this.type.length - 1)}`;
        btn.classList = `input-group-text px-3 rounded-right border-0 text-white bg-${this.color}`;
        btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        divQ.appendChild(input);
        divQ.appendChild(btn);
        divR.classList = `row rounded-bottom border-0 text-white bg-${this.color} result`;

        container.appendChild(divQ);
        container.appendChild(divR);
        return container;
    }
    make() {
        return [this.makeInactive(), this.makeActive()];
    }
}


//////////////////
// CARD Factory //
const fakePhotos = [
    './assets/photos/jay-wennington-N_Y88TWmGwA-unsplash.jpg',
    './assets/photos/louis-hansel-shotsoflouis-qNBGVyOCY8Q-unsplash.jpg',
    './assets/photos/stil-u2Lp8tXIcjw-unsplash.jpg',
    './assets/photos/toa-heftiba-DQKerTsQwi0-unsplash.jpg'
];

class Card {
    constructor(recipe) {
        this.recipe = recipe;
        this.name = recipe.name;
        this.time = recipe.time;
        this.ingredients = recipe.ingredients;
        this.description = recipe.description;
    }
    make() {
        const card = document.createElement('div');
        const img = document.createElement('div');
        const cardBody = document.createElement('div');
        const cardTitle = document.createElement('div');
        const cardText = document.createElement('div');
        const ingrList = document.createElement('div');
        const description = document.createElement('div');

        card.classList = 'card p-0';
        img.classList = 'card-img-top';
        img.style.background = `#fff url("${this.setPhoto()}") no-repeat`;
        img.style['background-size'] = 'cover';
        cardBody.classList = 'card-body';
        cardTitle.classList = 'card-title row m-0 w-50 d-inline-flex flex-nowrap align-items-end';
        cardTitle.innerHTML = `<h4 class="p-0">${this.name}</h4>
        <h5 class="timer p-0 d-flex align-items-center justify-content-end"><i class="far fa-clock mx-2"></i> ${this.time} min</h5>`;
        cardText.classList = 'row card-text m-0 mt-3 justify-content-between';
        ingrList.classList = 'col-6 p-0 pe-2';
        ingrList.innerHTML = this.getIngredients();
        description.classList = 'col-6 p-0 ps-2 recipe';
        description.innerHTML = `<p>${this.description}</p>`;

        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardText.appendChild(ingrList);
        cardText.appendChild(description);
        return card;
    }
    setPhoto() {
        return fakePhotos[Math.floor(Math.random() * fakePhotos.length)];
    }
    getIngredients() {
        let res = '';
        for (let elt of this.ingredients) {
            res += `<p><strong>${elt.ingredient}:</strong> ${elt.quantity} ${elt.unit}</p>`;
        }
        return res;
    }
}