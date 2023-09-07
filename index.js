

class App {
    constructor(state = {}) {
        this.elements = {}
        this.state = {
            ...state
        }
    }

    getElementById = (id) => {
        return document.getElementById(id)
    }

    initElementByIds = (ids) => {
        ids.forEach(id => {
            this.elements[id.name] = this.getElementById(id.id);
        })
    }

    addListeners = (listeners) => {
        listeners.map(listener => this.addEventListener(listener.type, listener.elementName, listener.callback))
    }

    addEventListener = (type, elementName, callback) => {
        this.elements[elementName].addEventListener(type, callback)
    }

    setState = (state) => {
        this.state = state
    }


    render = (elementName, textContent, plainHtml) => {
        if (plainHtml) {
            this.elements[elementName].innerHTML = plainHtml
            return;
        }
        this.elements[elementName].textContent = textContent
    }
}


const app = new App({ items: [], inputValue: '' });
app.initElementByIds([
    {
        name: 'rootDiv',
        id: 'app'
    },
    {
        name: 'todoInput',
        id: 'todo-input',

    },
    {
        name: 'addButton',
        id: 'add-button',
    },
    {
        name: 'itemsArea',
        id: 'items-area'
    }
])

const inputListener = (event) => {
    app.setState({
        ...app.state,
        inputValue: event.target.value
    })
}

const todoComponent = (content) => `<p>${content}</p>`

const addButtonListener = (event) => {
    if (app.state.inputValue) {
        app.setState({
            ...app.state,
            items: [...app.state.items, todoComponent(app.state.inputValue)]
        })
        console.log(app.state)
        app.render('itemsArea', '', app.state.items.join(''))
    }
}

const listeners = [
    {
        type: 'keyup',
        elementName: 'todoInput',
        callback: (event) => inputListener(event)
    },
    {
        type: 'click',
        elementName: 'addButton',
        callback: (event) => addButtonListener(event)
    }
]

app.addListeners(listeners)