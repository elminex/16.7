class Board {
    constructor(name) {
        this.name = name;
        this.element = generateTemplate('board-template', { name: this.name, id: this.id });
        this.columnWrapper = this.element.querySelector('.column-container');
        this.element.querySelector('.create-column').addEventListener('click', () => {
            let name = (prompt('Enter a column name') || 'New column');
            let data = new FormData();
            data.append('name', name);
            fetch(prefix + baseUrl + '/column', { method: 'POST', headers: myHeaders })
                .then(resp => resp.json)
                .then(resp => {
                    let column = new Column(resp.id, name);
                    this.addColumn(column);
                })
        });
    }
    addColumn(column) {
        this.columnWrapper.appendChild(column.element);
        initSortable(column.id);
    }
}

function initSortable(id) {
    const el = document.getElementById(id);
    let sortable = Sortable.create(el, {
        group: 'kanban',
        sort: true,
    });
}

document.querySelector('.create-board').addEventListener('click', () => {
    let name = (prompt('Enter board name') || 'New board');
    let board = new Board(name);
    document.querySelector('.board-wrapper').appendChild(board.element);
    unwrap(board.element);
});

let board1 = new Board('New board');
document.querySelector('.board-wrapper').appendChild(board1.element);
unwrap(board1.element);
