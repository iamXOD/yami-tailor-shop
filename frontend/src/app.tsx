//Imports
import ContactIcon from "@material-ui/icons/Contacts";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import { ReactElement } from "react";
import { Route, Switch } from "react-router-dom";
//App Imports
import About from "./components/About";
import ActorRoute from "./components/actor/ActorRoute";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { DrawerMenuItem } from "./components/layout/Drawer";
import Layout from "./components/layout/Layout";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/user/LoginContainer";

export default function App(): ReactElement {
    const items: DrawerMenuItem = [
        { items: [{ label: "Home", url: "/", Icon: HomeIcon }] },
        { items: [{ label: "Actors", url: "/actors", Icon: ContactIcon }] },
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
