import React, {Fragment, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import Table from "@material-ui/core/Table";
import {TableHead, TableRow, TableCell, TableBody, TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import DeleteDialog from "./DeleteDialog";
import Typography from "@material-ui/core/Typography";

function TodoTable() {
    const context = useContext(TodoContext);

    // create todo
    const [addTodoName, setAddTodoName] = useState('');
    const [addTodoDescription, setAddTodoDescription] = useState('');

    // update todo
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodoName, setEditTodoName] = useState('');
    const [editTodoDescription, setEditTodoDescription] = useState('');

    // delete todo
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    const onCreateSubmit = event => {
        event.preventDefault();
        context.createTodo(event, { task: addTodoName, description: addTodoDescription } );
        setAddTodoName('');
        setAddTodoDescription('');
    };

    const onEditSubmit = (todoId, event) => {
        event.preventDefault();
        context.updateTodo( {id: todoId,  task: editTodoName, description: editTodoDescription } );
        setEditIsShown(false);
    };

    const clear = () => {
        setEditIsShown(false);
    }

    return (
        <Fragment>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Task</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <form onSubmit={onCreateSubmit}>
                                <TextField type="text" label="New task" value={addTodoName}
                                           onChange={event => {setAddTodoName(event.target.value)}} fullWidth={true} />
                            </form>
                        </TableCell>
                        <TableCell>
                            <form>
                                <TextField type="text" label="Description" value={addTodoDescription}
                                           onChange={event => {setAddTodoDescription(event.target.value)}} fullWidth={true} multiline={true} />
                            </form>
                        </TableCell>
                        <TableCell align="right">
                            <IconButton onClick={onCreateSubmit}>
                                <AddIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    {context.todos.slice().reverse().map((todo, index) => (
                        <TableRow key={index}>
                            <TableCell>

                                {editIsShown === todo.id ?
                                    <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                                    <TextField
                                        type="text"
                                        fullWidth={true}
                                        value={editTodoName}
                                        onChange={ event => setEditTodoName(event.target.value) }
                                    />
                                    </form>
                                    :
                                    <Typography>{todo.task}</Typography>
                                }

                            </TableCell>
                            <TableCell>

                                {editIsShown === todo.id ?
                                        <TextField
                                            type="text"
                                            fullWidth={true}
                                            multiline={true}
                                            value={editTodoDescription}
                                            onChange={ event => setEditTodoDescription(event.target.value) }
                                        />
                                    :
                                    <Typography style={{whiteSpace: 'pre-wrap'}}>{todo.description}</Typography>
                                }

                            </TableCell>
                            <TableCell align="right">

                                {editIsShown === todo.id ?
                                    <Fragment>
                                        <IconButton onClick={ onEditSubmit.bind(this, todo.id) }>
                                            <DoneIcon/>
                                        </IconButton>

                                        <IconButton onClick={ clear }>
                                            <CloseIcon/>
                                        </IconButton>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <IconButton onClick={() => {
                                            setEditIsShown(todo.id);
                                            setEditTodoName(todo.task);
                                            setEditTodoDescription(todo.description);
                                        }}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton onClick={() => {
                                            setDeleteConfirmationIsShown(true);
                                            setSelectedTodo(todo);
                                        }}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Fragment>
                                }


                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {deleteConfirmationIsShown && (
                <DeleteDialog todo={selectedTodo}
                              open={deleteConfirmationIsShown}
                              setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}/>
            )}

        </Fragment>
    );
}

export default TodoTable;
