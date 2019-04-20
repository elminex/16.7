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
        });
    }
    removeCard() {
        fetch(`${prefix}${baseUrl}/card/${id}`, { method: 'DELETE', headers: myHeaders })
            .then(resp => resp.json())
            .then(resp => this.element.parentNode.removeChild(this.element));
    }
}