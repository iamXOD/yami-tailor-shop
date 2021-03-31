//Imports
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as FetchProvider } from "use-http";
//App Imports
import App from "./app";
import config from "./config";
import { loadTOKEN } from "./services/storage";
import store from "./store";

//Render App
ReactDOM.render(
    <Provider store={store}>
        <FetchProvider
            url={config.API}
            options={{
                responseType: "json",
                headers: { Authorization: `Bearer ${loadTOKEN()}` },
            }}>
            <Router>
                <App />
            </Router>
        </FetchProvider>
    </Provider>,
    document.getElementById("root")
);
