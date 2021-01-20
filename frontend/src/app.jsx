//Imports
import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./components/layout";
import Login from "./components/user/login";
import About from "./components/about";
import PageNotFound from "./components/page-not-found";

const App = () => {
    return <Layout>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
            <Route component={PageNotFound} />
        </Switch>
    </Layout>
}

export default App;