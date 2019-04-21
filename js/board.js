class Board {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.element = generateTemplate('board-template', { name: this.name, id: this.id });
        this.columnWrapper = this.element.querySelector('.column-container');
        this.element.querySelector('.create-column').addEventListener('click', () => {
            let colName = (prompt('Enter a column name'));
            if (colName !== null) {
                if (!colName) {
                    colName = 'New column';
                }
                let data = new FormData();
                data.append('name', colName);
                fetch(prefix + baseUrl + '/column', { method: 'POST', headers: myHeaders, body: data })
                    .then(resp => resp.json())
                    .then(resp => {
                        let column = new Column(resp.id, colName);
                        this.addColumn(column);
                    })
            }
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
        chosenClass: "sortable-chosen",
        ghostClass: "sortable-ghost",
        dragClass: "sortable-drag",
        onAdd: function (evt) {
            let card = evt.item;
            let cardId = card.childNodes[1].id;
            let cardName = card.querySelector('.card-description').innerHTML;
            let data = {
                name: cardName,
                bootcamp_kanban_column_id: evt.to.id,
            }
            fetch(`${prefix}${baseUrl}/card/${cardId}`, { method: 'PUT', headers: myHeaders, body: JSON.stringify(data) })
        },
    });
}