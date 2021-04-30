//Imports
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
//App Imports
import App from "./app";
import { FetchProvider } from "./layout";
import store from "./store";

//Render App
ReactDOM.render(
    <Provider store={store}>
        <FetchProvider>
            <Router>
                <App />
            </Router>
        </FetchProvider>
    </Provider>,
    document.getElementById("root")
);
