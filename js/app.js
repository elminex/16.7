function generateTemplate(name, data, basicElement) {
    const template = document.getElementById(name).innerHTML;
    const element = document.createElement(basicElement || 'div');
    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);
    return element;
}

const prefix = "https://cors-anywhere.herokuapp.com/"
const baseUrl = 'https://kodilla.com/pl/bootcamp-api';
const myHeaders = {
    'X-Client-Id': '3982',
    'X-Auth-Token': '4550d93a6111ff9b080166a9593dd003'
};

fetch(prefix + baseUrl + '/board', { method: 'GET', headers: myHeaders })
    .then((resp) => resp.json())
    .then((resp) => {
        setupBoards(resp.id, resp.name, resp.columns);

    })

function setupBoards(id, name, columns) {
    let board = new Board(id, name);
    document.querySelector('.board-wrapper').appendChild(board.element)
    setupColumns(board, columns);
}

function setupColumns(board, columns) {
    columns.forEach(column => {
        let col = new Column(column.id, column.name);
        board.addColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
    cards.forEach(card => {
        let cardObj = new Card(card.id, card.name);
        col.addCard(cardObj);
    });
}