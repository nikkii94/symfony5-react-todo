import React, {Fragment, useContext} from 'react';
import {Snackbar, SnackbarContent} from "@material-ui/core";
import {TodoContext} from "../contexts/TodoContext";
import Button from "@material-ui/core/Button";

function AppSnackBar() {
    const context = useContext(TodoContext);

    const checkLevel = level => {
        switch (level) {
            case 'success':
                return 'green';
            case 'error':
                return 'red';
            default:
                return 'white';
        }
    };

    return (
        <Snackbar autoHideDuration={6000} open={context.message.text !== undefined}>
            {context.message.text && (
                <SnackbarContent style={{backgroundColor: checkLevel(context.message.level)}}
                     message={context.message.text}
                     action={[
                        <Button
                            onClick={() => { context.setMessage({}) }}
                            key='dismiss'
                            color='inherit'
                        >Dismiss</Button>
                    ]}/>
            )}
        </Snackbar>
    );
}

export default AppSnackBar;
