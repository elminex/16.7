class Card {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.element = generateTemplate('card-template', { name: this.name }, 'li');
        this.element.querySelector('.card').addEventListener('click', (e) => {
            e.stopPropagation();
            if (e.target.classList.contains('btn-delete')) {
                this.removeCard();
            }
            if (e.target.classList.contains('change-card-name')) {
                this.changeCardName();
            }
        });
    }
    removeCard() {
        fetch(`${prefix}${baseUrl}/card/${this.id}`, { method: 'DELETE', headers: myHeaders })
            .then(resp => resp.json())
            .then(resp => this.element.parentNode.removeChild(this.element));
    }
    changeCardName() {
        let newName = prompt('Enter a card name') || 'New card';
        let data = new FormData();
        data.append('name', newName);
        data.append('id', this.id);
        data.append('bootcamp_kanban_column_id', this.element.parentNode.id);
        fetch(`${prefix}${baseUrl}/card/${this.id}`, { method: 'PUT', headers: myHeaders, body: data })
            .then(resp => resp.json())
            .then(resp => {
                this.name = newName;
                this.id = resp.id;
            });
    }
}