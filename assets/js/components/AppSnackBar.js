import React, {Fragment, useContext} from 'react';
import {Snackbar, SnackbarContent} from "@material-ui/core";
import {TodoContext} from "../contexts/TodoContext";
import Button from "@material-ui/core/Button";

function AppSnackBar() {
    const context = useContext(TodoContext);

    return (
        <Snackbar autoHideDuration={6000} open={context.message.text !== undefined}>
            {context.message.text && (
                <SnackbarContent message={context.message.text.map((text, index) => (
                    <Fragment key={`${index} ${text}`}>
                        <span>{text}</span>
                        <br/>
                    </Fragment>
                ))} action={[
                    <Button onClick={() => { context.setMessage({}) }} key='dismiss'>Dismiss</Button>
                ]}/>
            )}
        </Snackbar>
    );
}

export default AppSnackBar;