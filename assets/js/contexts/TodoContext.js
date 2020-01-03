import React, {Component, createContext} from 'react';

export const TodoContext = createContext(undefined, undefined);

class TodoContextProvider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todos: [
                {
                    id: 1,
                    name: 'do something 1'
                },
                {
                    id: 2,
                    name: 'do something 2'
                },
            ],
        };
    }

    /**
     * Create a new todo item
     */
    createTodo (event, todo) {
        event.preventDefault();

        let newTodos = [...this.state.todos];
        newTodos.push(todo);

        this.setState({
            todos: newTodos
        });
    }

    /**
     * Show a todo item
     */
    readTodo () {

    }

    /**
     * Edit a todo item
     */
    updateTodo (updateTodo) {
        let todos = [...this.state.todos];

        let todo = todos.find(todo => {
            return todo.id === updateTodo.id
        });
        todo.name = updateTodo.name;

        this.setState({
            todos: todos
        });
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