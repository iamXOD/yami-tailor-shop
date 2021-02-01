//Imports
import { Route, Switch } from "react-router-dom";

//UI Imports
import HomeIcon from "@material-ui/icons/Home";
import ContactIcon from "@material-ui/icons/Contacts";
import InfoIcon from "@material-ui/icons/Info";

//App Imports
import Layout from "./components/layout/Layout";
import About from "./components/About";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/user/LoginContainer";
import ActorRoute from "./components/actor/ActorRoute";

//Types
import { ReactElement } from "react";
import { DrawerMenuItem } from "./types";

export default function App(): ReactElement {

    const items: DrawerMenuItem = [
        { items: [{ label: "Home", url: "/", Icon: HomeIcon }] },
        { items: [{ label: "Actors", url: "/actors", Icon: ContactIcon }] },
        { items: [{ label: "About Us", url: "/about", Icon: InfoIcon }] }];

    return <Layout drawerItems={items}>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/actors" component={ActorRoute} />
            <Route path="/about" component={About} />
            <Route component={PageNotFound} />
        </Switch>
    </Layout>
}