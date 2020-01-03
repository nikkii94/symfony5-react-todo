import React, {Component, createContext} from 'react';

export const TodoContext = createContext(undefined, undefined);

class TodoContextProvider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todos: [
                { name: 'do something 1' },
                { name: 'do something 2' },
                { name: 'do something 3' },
                { name: 'do something 4' },
                { name: 'do something 5' },
                { name: 'do something 6' }
            ],
        };
    }

    /**
     * Create a new todo item
     */
    createTodo () {

    }

    /**
     * Show a todo item
     */
    readTodo () {

    }

    /**
     * Edit a todo item
     */
    updateTodo () {

    }

    /**
     * Delete a todo item
     */
    deleteTodo () {

    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                // readTodo: this.readTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this)
            }}>
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}

export default TodoContextProvider;