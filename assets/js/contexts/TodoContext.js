import React, {Component, createContext} from 'react';
import axios from 'axios';
export const TodoContext = createContext(undefined, undefined);

class TodoContextProvider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todos: [],
        };

        this.readTodo();
    }

    /**
     * Create a new todo item
     */
    createTodo (event, todo) {
        event.preventDefault();

        axios.post('/api/todo/create', todo)
            .then(response => {
                console.log(response.data);

                let newTodos = [...this.state.todos];
                newTodos.push(response.data.todo);

                this.setState({
                    todos: newTodos
                });

            })
            .catch(error => console.error(error));
    }

    /**
     * Show a todo item
     */
    readTodo () {
        axios.get('/api/todo/read')
            .then(response => {
                this.setState({
                    todos: response.data
                });
            }).catch(error => {
                console.error(error);
        })
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
    deleteTodo (selectedTodo) {
        axios.delete(`/api/todo/delete/${selectedTodo.id}`)
            .then(response => {
                let todos = [...this.state.todos];

                let todo = todos.find(todo => {
                    return todo.id === selectedTodo.id
                });

                todos.splice(todos.indexOf(todo), 1);

                this.setState({
                    todos: todos
                });
            })
            .catch(error => console.error(error));
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