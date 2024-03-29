import React, {Component, createContext} from 'react';
import axios from 'axios';
export const TodoContext = createContext(undefined, undefined);

class TodoContextProvider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            message: {}
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
                if (response.data.message.level === 'success') {
                    let newTodos = [...this.state.todos];
                    newTodos.push(response.data.todo);

                    this.setState({
                        todos: newTodos,
                        message: response.data.message
                    });
                } else {
                    this.setState({
                        message: response.data.message
                    });
                }
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
        axios.put(`/api/todo/update/${updateTodo.id}`, updateTodo)
            .then(response => {
                if (response.data.message.level === 'success') {
                    let todos = [...this.state.todos];

                    let todo = todos.find(todo => {
                        return todo.id === updateTodo.id
                    });
                    todo.task = response.data.todo.task;
                    todo.description = response.data.todo.description;

                    this.setState({
                        todos: todos,
                        message: response.data.message
                    });
                } else {
                    this.setState({
                        message: response.data.message
                    });
                }
            })
            .catch(error => console.error(error));
    }

    /**
     * Delete a todo item
     */
    deleteTodo (selectedTodo) {
        axios.delete(`/api/todo/delete/${selectedTodo.id}`)
            .then(response => {
                if (response.data.message.level === 'success') {
                    let todos = [...this.state.todos];

                    let todo = todos.find(todo => {
                        return todo.id === selectedTodo.id
                    });

                    todos.splice(todos.indexOf(todo), 1);

                    this.setState({
                        todos: todos,
                        message: response.data.message
                    });
                } else {
                    this.setState({
                        message: response.data.message
                    });
                }
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
                deleteTodo: this.deleteTodo.bind(this),
                setMessage: (message) => {
                    this.setState({message: message})
                }
            }}>
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}

export default TodoContextProvider;
