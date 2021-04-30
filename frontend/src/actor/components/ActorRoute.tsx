//Imports
import { ReactElement } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
//App Imports
import { ErrorCard, Loading } from "../../components";
import { useGet } from "../../hooks";
import { getActors } from "../store";
import ActorContainer from "./ActorContainer";

export default function ActorRoutes(): ReactElement {
    const { url } = useRouteMatch();
    const { loading, error } = useGet("actors", getActors);

    if (loading) {
        return <Loading text={"Fetching actors data"} />;
    }
    if (error) {
        return <ErrorCard error={error} />;
    }
    return (
        <Switch>
            <Route exact path={`${url}/:id(\\d+)`} component={ActorContainer} />
            <Route path={`${url}/`} component={ActorContainer} />
        </Switch>
    );
}
