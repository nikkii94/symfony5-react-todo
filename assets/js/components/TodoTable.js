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
import InputAdornment from '@material-ui/core/InputAdornment';

function TodoTable() {
    const context = useContext(TodoContext);

    // create todo
    const [addTodo, setAddTodo] = useState('');

    // update todo
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodo, setEditTodo] = useState('');

    return (
        <form onSubmit={event => context.createTodo(event, { name: addTodo })}>
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
                            <TextField label={"New Task"} value={addTodo} onChange={event => {setAddTodo(event.target.value)}} fullWidth={true}/>
                        </TableCell>
                        <TableCell align="right">
                            <IconButton type="submit">
                                <AddIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    {context.todos.slice().reverse().map((todo, index) => (
                        <TableRow key={index}>
                            <TableCell>

                                {editIsShown === todo.id ?
                                    <TextField
                                        fullWidth={true}
                                        value={editTodo}
                                        onChange={ event => setEditTodo(event.target.value) }
                                        InputProps={{
                                            endAdornment: <Fragment>
                                                <IconButton onClick={event => setEditIsShown(false) }>
                                                    <CloseIcon/>
                                                </IconButton>
                                                <IconButton onClick={event => {
                                                    context.updateTodo({id: todo.id, name: editTodo});
                                                    setEditIsShown(false)
                                                }}>
                                                    <DoneIcon/>
                                                </IconButton>
                                            </Fragment>
                                        }}
                                    />
                                    : todo.name
                                }

                            </TableCell>
                            <TableCell align="right">

                                <IconButton onClick={ event => {setEditIsShown(todo.id); setEditTodo(todo.name)} }>
                                    <EditIcon/>
                                </IconButton>

                                <IconButton>
                                    <DeleteIcon/>
                                </IconButton>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </form>
    );
}

export default TodoTable;