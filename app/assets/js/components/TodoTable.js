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

function TodoTable() {
    const context = useContext(TodoContext);

    // create todo
    const [addTodo, setAddTodo] = useState('');

    // update todo
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodo, setEditTodo] = useState('');

    // delete todo
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    const onCreateSubmit = event => {
        event.preventDefault();
        context.createTodo(event, { name: addTodo } );
        setAddTodo('');
    };

    const onEditSubmit = (todoId, event) => {
        event.preventDefault();
        context.updateTodo( {id: todoId,  name: editTodo } );
        setEditIsShown(false);
    };

    return (
        <Fragment>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Task</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <form onSubmit={onCreateSubmit}>
                                <TextField type="text" label={"New Task"} value={addTodo} onChange={event => {setAddTodo(event.target.value)}} fullWidth={true}/>
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
                                        autoFocus={true}
                                        value={editTodo}
                                        onChange={ event => setEditTodo(event.target.value) }
                                        InputProps={{
                                            endAdornment: <Fragment>
                                                <IconButton onClick={event => setEditIsShown(false) }>
                                                    <CloseIcon/>
                                                </IconButton>
                                                <IconButton type="submit">
                                                    <DoneIcon/>
                                                </IconButton>
                                            </Fragment>
                                        }}
                                    />
                                    </form>
                                    : todo.name
                                }

                            </TableCell>
                            <TableCell align="right">

                                <IconButton onClick={ event => {setEditIsShown(todo.id); setEditTodo(todo.name)} }>
                                    <EditIcon/>
                                </IconButton>

                                <IconButton onClick={event => { setDeleteConfirmationIsShown(true); setSelectedTodo(todo) }}>
                                    <DeleteIcon/>
                                </IconButton>

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
