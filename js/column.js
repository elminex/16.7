class Column {
    constructor(id, name) {
        this.id = id;
        this.name = name || 'Unnamed column';
        this.element = generateTemplate('column-template', { name: this.name, id: this.id });
        this.element.querySelector('.column').addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-delete')) {
                this.removeColumn();
            }
            if (e.target.classList.contains('add-card')) {
                let cardName = prompt('Enter the name of the card') || 'New Card';
                e.preventDefault();
                let data = new FormData();
                data.append('name', cardName);
                data.append('bootcamp_kanban_column_id', this.id);
                fetch(prefix + baseUrl + '/card', {
                    method: 'POST',
                    headers: myHeaders,
                    body: data
                })
                    .then(resp => resp.json())
                    .then(resp => {
                        let card = new Card(resp.id, cardName);
                        this.addCard(card);
                    })
            }
            if (e.target.classList.contains('change-col-name')) {
                this.changeColName();
            }
        });
    }
    addCard(card) {
        this.element.querySelector('ul').appendChild(card.element);
    }
    removeColumn() {
        fetch(`${prefix}${baseUrl}/column/${this.id}`, { method: 'DELETE', headers: myHeaders })
            .then(resp => resp.json())
            .then(resp => this.element.parentNode.removeChild(this.element));
    }
    changeColName() {
        let newName = prompt('Enter a column name') || 'New column';
        let data = new FormData();
        data.append('name', newName);
        data.append('id', this.id);

        fetch(`${prefix}${baseUrl}/column/${this.id}`, { method: 'PUT', headers: myHeaders, body: data })
            .then(resp => resp.json())
            .then(resp => {
                this.name = newName;
                this.id = resp.id;
            });
    }
}