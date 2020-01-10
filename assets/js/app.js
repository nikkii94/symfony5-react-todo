import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TodoContextProvider from "./contexts/TodoContext";
import TodoTable from "./components/TodoTable";
import {CssBaseline} from "@material-ui/core";
import AppSnackBar from "./components/AppSnackBar";

class App extends Component {
    render() {
        return (
            <TodoContextProvider>
                <CssBaseline>
                    <TodoTable/>
                    <AppSnackBar/>
                </CssBaseline>

            </TodoContextProvider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));