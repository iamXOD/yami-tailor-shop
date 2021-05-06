//Imports
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
//App Imports
import App from "./app";
import { FetchProvider } from "./layout";
import { UserProvider } from "./user";

//Render App
ReactDOM.render(
    <UserProvider>
        <FetchProvider>
            <Router>
                <App />
            </Router>
        </FetchProvider>
    </UserProvider>,
    document.getElementById("root")
);
