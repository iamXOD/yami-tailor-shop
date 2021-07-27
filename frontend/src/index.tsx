//Imports
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
//App Imports
import App from "./app";
import { FetchProvider, QueryProvider } from "./layout";
import { UserProvider } from "./user";

//Render App
ReactDOM.render(
    <UserProvider>
        <QueryProvider>
            <FetchProvider>
                <Router>
                    <App />
                </Router>
            </FetchProvider>
        </QueryProvider>
    </UserProvider>,
    document.getElementById("root")
);
