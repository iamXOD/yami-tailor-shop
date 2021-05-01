//Imports
import {
    Contacts as ContactsIcon,
    Home as HomeIcon,
    Info as InfoIcon,
} from "@material-ui/icons";
import { ReactElement } from "react";
import { Route, Switch } from "react-router-dom";
//App Imports
import { ActorRoute, actorURL } from "./actor";
import { ProtectedRoute } from "./components";
import { About, DrawerMenuItem, Layout, PageNotFound } from "./layout";
import Login from "./user/components/LoginContainer";

export default function App(): ReactElement {
    const items: DrawerMenuItem = [
        { items: [{ label: "Home", url: "/", Icon: HomeIcon }] },
        { items: [{ label: "Actors", url: actorURL, Icon: ContactsIcon }] },
        { items: [{ label: "About Us", url: "/about", Icon: InfoIcon }] },
    ];

    return (
        <Layout drawerItems={items}>
            <Switch>
                <Route path="/login" component={Login} />
                <ProtectedRoute path="/actors" component={ActorRoute} />
                <Route path="/about" component={About} />
                <Route component={PageNotFound} />
            </Switch>
        </Layout>
    );
}
