import React, {useContext} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import Table from "@material-ui/core/Table";
import {TableHead, TableRow, TableCell, TableBody} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function TodoTable() {
    const context = useContext(TodoContext);

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Task</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {context.todos.map(todo => (
                    <TableRow>
                        <TableCell>
                            {todo.name}
                        </TableCell>
                        <TableCell align="right">
                            <IconButton>
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
    );
}

export default TodoTable;