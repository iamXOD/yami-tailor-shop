//Imports
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

//UI Imports
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

//App Imports
import App from "./app";
import userReducer from "./store/reducers/user";

//Store
const store = createStore(userReducer,
    applyMiddleware(thunk));

//Render App
ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Router>
                <App />
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById("root")
);