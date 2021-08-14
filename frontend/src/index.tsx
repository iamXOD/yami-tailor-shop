//Imports
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
//App Imports
import App from "./app";
import { QueryProvider } from "./layout";
import { UserProvider } from "./user";

//Render App
ReactDOM.render(
    <UserProvider>
        <QueryProvider>
            <Router>
                <App />
            </Router>
        </QueryProvider>
    </UserProvider>,
    document.getElementById("root")
);
