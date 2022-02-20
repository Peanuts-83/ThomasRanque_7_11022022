// TAGS Factory
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
        console.log(tag)
        return tag;
    }
}


//BTN SUB SEARCH Factory
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