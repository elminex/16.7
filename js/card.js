class Card {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.element = generateTemplate('card-template', { name: this.name, id: this.id }, 'li');
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
        let newName = prompt('Enter a card name');
        if (newName !== null) {
            if (!newName) {
                newName = 'New card';
            }
            let data = {
                name: newName,
                bootcamp_kanban_column_id: this.element.parentNode.id
            }
            fetch(`${prefix}${baseUrl}/card/${this.id}`, { method: 'PUT', headers: myHeaders, body: JSON.stringify(data) })
                .then(resp => {
                    this.name = newName;
                    this.element.querySelector('.card-description').innerHTML = newName;
                });
        }
    }
}