function generateTemplate(name, data, basicElement) {
    const template = document.getElementById(name).innerHTML;
    const element = document.createElement(basicElement || 'div');
    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);
    return element;
}

let prefix = "https://cors-anywhere.herokuapp.com/"

function unwrap(node) {
    node.replaceWith(...node.childNodes);
}

const baseUrl = 'https://kodilla.com/pl/bootcamp-api';
const myHeaders = {
    'X-Client-Id': '3982',
    'X-Auth-Token': '4550d93a6111ff9b080166a9593dd003'
};

fetch(prefix + baseUrl + '/board', { method: 'GET', headers: myHeaders })
    .then((resp) => resp.json())
    .then((resp) => setupColumns(resp.columns));

function setupColumns(columns) {
    columns.forEach(column => {
        let col = new Column(column.id, column.name);
        board1.addColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
    cards.forEach(card => {
        let cardObj = new Card(card.id, card.name);
        col.addCard(cardObj);
    });
}